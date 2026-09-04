import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { SiLeetcode } from "react-icons/si";

const LEETCODE_USERNAME = "rutu_10";
const LEETCODE_PROFILE_URL = `https://leetcode.com/u/${LEETCODE_USERNAME}/`;
const API_BASE_URL = "https://leetcode-api-pied.vercel.app";

const ContributionCell = ({ date, count, level }) => {
  const getColorClass = (lvl) => {
    switch (lvl) {
      case 0:
        return "bg-zinc-800/60 border border-white/[0.02]";
      case 1:
        return "bg-amber-900/60 hover:bg-amber-950 border border-amber-900/10";
      case 2:
        return "bg-amber-700/60 hover:bg-amber-800 border border-amber-700/10";
      case 3:
        return "bg-amber-500/80 hover:bg-amber-600 border border-amber-500/10";
      case 4:
        return "bg-amber-300 hover:bg-amber-400 border border-amber-300/10";
      default:
        return "bg-zinc-800/60";
    }
  };

  return (
    <div
      className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-[2px] transition-colors duration-150 cursor-crosshair ${getColorClass(
        level
      )}`}
      title={`${count} submissions on ${date}`}
      aria-label={`${count} submissions on ${date}`}
    />
  );
};

const fetchWithTimeout = async (url, timeout = 7000) => {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
};

const getLevel = (count) => {
  if (count <= 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const processCalendarData = (calendarResponse) => {
  const calendar =
    calendarResponse?.calendar ||
    calendarResponse?.data?.calendar ||
    calendarResponse?.userCalendar ||
    calendarResponse?.data?.userCalendar ||
    calendarResponse;

  const rawCalendar =
    calendar?.submissionCalendar ||
    calendar?.dailyContributions ||
    calendarResponse?.submissionCalendar ||
    calendarResponse?.data?.submissionCalendar ||
    {};

  const dateCounts = {};

  if (Array.isArray(rawCalendar)) {
    rawCalendar.forEach((item) => {
      if (!item?.date) return;

      const date = String(item.date).slice(0, 10);
      const count = Number(item.count) || 0;

      dateCounts[date] = (dateCounts[date] || 0) + count;
    });
  } else if (rawCalendar && typeof rawCalendar === "object") {
    Object.entries(rawCalendar).forEach(([timestamp, value]) => {
      const numericTimestamp = Number(timestamp);

      if (!Number.isFinite(numericTimestamp)) return;

      const date = new Date(numericTimestamp * 1000);
      const dateString = formatDate(date);
      const count = Number(value) || 0;

      dateCounts[dateString] =
        (dateCounts[dateString] || 0) + count;
    });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const startDate = new Date(today);
  startDate.setFullYear(startDate.getFullYear() - 1);

  while (startDate.getDay() !== 0) {
    startDate.setDate(startDate.getDate() - 1);
  }

  const endDate = new Date(today);

  while (endDate.getDay() !== 6) {
    endDate.setDate(endDate.getDate() + 1);
  }

  const days = [];
  let total = 0;

  const cursor = new Date(startDate);

  while (cursor <= endDate) {
    const date = formatDate(cursor);
    const count = dateCounts[date] || 0;

    total += count;

    days.push({
      date,
      count,
      level: getLevel(count),
    });

    cursor.setDate(cursor.getDate() + 1);
  }

  return {
    days,
    total,
  };
};

const extractStats = (profileResponse) => {
  const profile =
    profileResponse?.user ||
    profileResponse?.data?.user ||
    profileResponse?.data ||
    profileResponse;

  const submitStats =
    profile?.submitStatsGlobal ||
    profile?.submitStats ||
    profile?.submissionStats ||
    {};

  const submissions =
    submitStats?.acSubmissionNum ||
    profile?.acSubmissionNum ||
    [];

  const getDifficultyCount = (difficulty) => {
    const item = submissions.find(
      (entry) =>
        String(entry?.difficulty).toLowerCase() ===
        difficulty.toLowerCase()
    );

    return Number(item?.count) || 0;
  };

  const easySolved =
    Number(profile?.easySolved) ||
    getDifficultyCount("Easy");

  const mediumSolved =
    Number(profile?.mediumSolved) ||
    getDifficultyCount("Medium");

  const hardSolved =
    Number(profile?.hardSolved) ||
    getDifficultyCount("Hard");

  const allSolved =
    Number(profile?.totalSolved) ||
    Number(
      submissions.find(
        (entry) =>
          String(entry?.difficulty).toLowerCase() === "all"
      )?.count
    ) ||
    easySolved + mediumSolved + hardSolved;

  return {
    totalSolved: allSolved,
    easySolved,
    mediumSolved,
    hardSolved,
    ranking:
      profile?.ranking ??
      profile?.globalRanking ??
      profile?.rank ??
      null,
  };
};

const LeetcodeContributions = () => {
  const [contributions, setContributions] = useState([]);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const scrollContainerRef = useRef(null);

  useLayoutEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft =
        scrollContainerRef.current.scrollWidth;
    }
  }, [contributions]);

  useEffect(() => {
    let mounted = true;

    const loadLeetCodeData = async () => {
      setLoading(true);
      setError(false);

      try {
        const [profileResponse, calendarResponse] =
          await Promise.all([
            fetchWithTimeout(
              `${API_BASE_URL}/user/${LEETCODE_USERNAME}`
            ),
            fetchWithTimeout(
              `${API_BASE_URL}/user/${LEETCODE_USERNAME}/calendar`
            ),
          ]);

        if (!mounted) return;

        const parsedStats = extractStats(profileResponse);
        const parsedCalendar =
          processCalendarData(calendarResponse);

        setStats(parsedStats);
        setContributions(parsedCalendar.days);
        setTotalSubmissions(parsedCalendar.total);
      } catch (err) {
        console.error("LeetCode API error:", err);

        if (!mounted) return;

        setError(true);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadLeetCodeData();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div id="leetcode" className="w-full">
      <div className="w-full bg-zinc-900/30 border border-white/10 rounded-xl p-4 md:p-5 flex flex-col gap-3.5">
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_auto_1fr] items-start lg:items-center gap-3.5 w-full">
          <div className="flex items-center justify-between w-full lg:w-auto justify-self-start">
            <div className="flex items-center gap-2 mr-1">
              <SiLeetcode className="text-amber-400 text-lg shrink-0" />

              <div className="flex flex-col">
                <h4 className="text-base md:text-lg font-bold text-white font-mono tracking-wide leading-none">
                  LEETCODE
                </h4>

                <span className="text-[10px] font-mono text-zinc-400 mt-1">
                  Problem Solving & DSA
                </span>
              </div>
            </div>

            <a
              href={LEETCODE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-amber-400 border border-white/10 hover:border-amber-400/40 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 shadow-sm"
            >
              <span>View Profile</span>
              <ExternalLink size={12} />
            </a>
          </div>

          {stats && (
            <div className="justify-self-center flex flex-wrap items-center justify-start lg:justify-center gap-2 w-full lg:w-auto">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900/80 border border-white/5">
                <span className="text-zinc-400 text-[11px] font-mono">
                  Solved
                </span>
                <span className="text-white font-bold text-xs md:text-sm font-mono">
                  {stats.totalSolved}
                </span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-950/25 border border-emerald-500/20">
                <span className="text-emerald-400/90 text-[11px] font-mono">
                  Easy
                </span>
                <span className="text-emerald-300 font-bold text-xs md:text-sm font-mono">
                  {stats.easySolved}
                </span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-950/25 border border-amber-500/20">
                <span className="text-amber-400/90 text-[11px] font-mono">
                  Medium
                </span>
                <span className="text-amber-300 font-bold text-xs md:text-sm font-mono">
                  {stats.mediumSolved}
                </span>
              </div>

              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-rose-950/25 border border-rose-500/20">
                <span className="text-rose-400/90 text-[11px] font-mono">
                  Hard
                </span>
                <span className="text-rose-300 font-bold text-xs md:text-sm font-mono">
                  {stats.hardSolved}
                </span>
              </div>

              {stats.ranking !== null && (
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900/80 border border-white/5">
                  <span className="text-zinc-400 text-[11px] font-mono">
                    Rank
                  </span>
                  <span className="text-zinc-200 font-medium text-xs md:text-sm font-mono">
                    {typeof stats.ranking === "number"
                      ? `#${stats.ranking.toLocaleString()}`
                      : stats.ranking}
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="hidden lg:flex justify-self-end">
            <a
              href={LEETCODE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-amber-400 border border-white/10 hover:border-amber-400/40 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 shrink-0 shadow-sm"
            >
              <span>View Profile</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-[11px] font-mono text-zinc-400">
            <span>
              Activity · 365 days
              {totalSubmissions > 0
                ? ` · ${totalSubmissions.toLocaleString()} submissions`
                : ""}
            </span>

            <div className="flex items-center gap-1.5 text-zinc-500 text-[10px]">
              <span>Less</span>
              <span className="w-2 h-2 rounded-[1px] bg-zinc-800/60 border border-white/[0.02]" />
              <span className="w-2 h-2 rounded-[1px] bg-amber-900/60 border border-amber-900/10" />
              <span className="w-2 h-2 rounded-[1px] bg-amber-700/60 border border-amber-700/10" />
              <span className="w-2 h-2 rounded-[1px] bg-amber-500/80 border border-amber-500/10" />
              <span className="w-2 h-2 rounded-[1px] bg-amber-300 border border-amber-300/10" />
              <span>More</span>
            </div>
          </div>

          <div
            ref={scrollContainerRef}
            className="w-full bg-zinc-900/50 border border-white/5 rounded-lg p-2.5 sm:p-3 overflow-x-auto custom-scrollbar flex items-center justify-start"
          >
            {loading ? (
              <div className="w-full flex flex-col items-center justify-center py-4 gap-2 animate-pulse">
                <div className="h-3 bg-zinc-800 rounded w-3/4" />
                <div className="h-3 bg-zinc-800 rounded w-1/2" />
              </div>
            ) : error || contributions.length === 0 ? (
              <div className="w-full py-4 text-center text-xs font-mono text-zinc-500 flex flex-col items-center gap-1.5">
                <span>
                  Unable to load LeetCode activity.
                </span>

                <a
                  href={LEETCODE_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline inline-flex items-center gap-1"
                >
                  View profile on LeetCode
                  <ExternalLink size={10} />
                </a>
              </div>
            ) : (
              <div className="grid grid-flow-col grid-rows-7 gap-[2px] sm:gap-[3px] select-none w-max">
                {contributions.map((day) => (
                  <ContributionCell
                    key={day.date}
                    date={day.date}
                    count={day.count}
                    level={day.level}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeetcodeContributions;