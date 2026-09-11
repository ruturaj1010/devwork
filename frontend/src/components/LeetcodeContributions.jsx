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

const calculateCurrentStreak = (dateCounts, fallbackStreak) => {
  if (!dateCounts || typeof dateCounts !== "object") {
    return Number.isFinite(Number(fallbackStreak)) ? Number(fallbackStreak) : 0;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayStr = formatDate(today);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = formatDate(yesterday);

  let cursorDate = null;
  if ((dateCounts[todayStr] || 0) > 0) {
    cursorDate = new Date(today);
  } else if ((dateCounts[yesterdayStr] || 0) > 0) {
    cursorDate = new Date(yesterday);
  } else {
    // Check UTC date boundaries if local timezone differs from UTC
    const utcNow = new Date();
    const utcTodayStr = utcNow.toISOString().slice(0, 10);
    utcNow.setUTCDate(utcNow.getUTCDate() - 1);
    const utcYesterdayStr = utcNow.toISOString().slice(0, 10);

    if ((dateCounts[utcTodayStr] || 0) > 0) {
      cursorDate = new Date(today);
    } else if ((dateCounts[utcYesterdayStr] || 0) > 0) {
      cursorDate = new Date(yesterday);
    }
  }

  if (!cursorDate) {
    return Number.isFinite(Number(fallbackStreak)) ? Number(fallbackStreak) : 0;
  }

  let streak = 0;
  while (cursorDate) {
    const dStr = formatDate(cursorDate);
    if ((dateCounts[dStr] || 0) > 0) {
      streak++;
      cursorDate.setDate(cursorDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak > 0
    ? streak
    : Number.isFinite(Number(fallbackStreak))
      ? Number(fallbackStreak)
      : 0;
};

const extractBadges = (badgesResponse) => {
  if (!badgesResponse) return [];

  const rawBadges =
    badgesResponse?.badges ||
    badgesResponse?.data?.badges ||
    badgesResponse?.user?.badges ||
    badgesResponse?.data?.user?.badges ||
    (Array.isArray(badgesResponse) ? badgesResponse : []);

  if (!Array.isArray(rawBadges)) return [];

  return rawBadges
    .map((item, index) => {
      if (!item || typeof item !== "object") return null;

      const name = item.name || "";
      const displayName = item.displayName || "";
      const shortName = item.shortName || "";
      const hoverText = item.hoverText || "";
      let icon = item.icon || item.medal?.config?.iconGif || "";

      if (icon && icon.startsWith("/")) {
        icon = `https://leetcode.com${icon}`;
      }

      const label =
        displayName || shortName || name || hoverText || `Badge ${index + 1}`;
      const tooltip = hoverText || displayName || shortName || name || label;

      return {
        id: item.id || `${name}-${index}`,
        name: label,
        tooltip,
        icon,
      };
    })
    .filter(Boolean);
};

const processCalendarData = (calendarResponse) => {
  const calendar =
    calendarResponse?.calendar ||
    calendarResponse?.data?.calendar ||
    calendarResponse?.userCalendar ||
    calendarResponse?.data?.userCalendar ||
    calendarResponse;

  let rawCalendar =
    calendar?.submissionCalendar ||
    calendar?.dailyContributions ||
    calendarResponse?.submissionCalendar ||
    calendarResponse?.data?.submissionCalendar ||
    {};

  if (typeof rawCalendar === "string") {
    try {
      rawCalendar = JSON.parse(rawCalendar);
    } catch {
      rawCalendar = {};
    }
  }

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

  const fallbackStreak =
    calendarResponse?.streak ?? calendar?.streak ?? null;
  const currentStreak = calculateCurrentStreak(dateCounts, fallbackStreak);

  return {
    days,
    total,
    currentStreak,
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
    profileResponse?.submitStats ||
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

  const ranking =
    profile?.profile?.ranking ??
    profileResponse?.profile?.ranking ??
    profile?.ranking ??
    profile?.globalRanking ??
    profile?.rank ??
    profileResponse?.ranking ??
    null;

  return {
    totalSolved: allSolved,
    easySolved,
    mediumSolved,
    hardSolved,
    ranking,
  };
};

const LeetcodeContributions = () => {
  const [contributions, setContributions] = useState([]);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [stats, setStats] = useState(null);
  const [streak, setStreak] = useState(null);
  const [badges, setBadges] = useState([]);
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
        const [profileResponse, calendarResponse, badgesResponse] =
          await Promise.all([
            fetchWithTimeout(
              `${API_BASE_URL}/user/${LEETCODE_USERNAME}`
            ),
            fetchWithTimeout(
              `${API_BASE_URL}/user/${LEETCODE_USERNAME}/calendar`
            ),
            fetchWithTimeout(
              `${API_BASE_URL}/user/${LEETCODE_USERNAME}/badges`
            ).catch((badgeErr) => {
              console.warn("LeetCode Badges API error:", badgeErr);
              return null;
            }),
          ]);

        if (!mounted) return;

        const parsedStats = extractStats(profileResponse);
        const parsedCalendar = processCalendarData(calendarResponse);
        const parsedBadges = extractBadges(badgesResponse);

        setStats(parsedStats);
        setContributions(parsedCalendar.days);
        setTotalSubmissions(parsedCalendar.total);
        setStreak(parsedCalendar.currentStreak);
        setBadges(parsedBadges);
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

              {streak !== null && (
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-orange-950/25 border border-orange-500/20">
                  <span className="text-orange-400/90 text-[11px] font-mono">
                    🔥 Streak
                  </span>
                  <span className="text-orange-300 font-bold text-xs md:text-sm font-mono">
                    {streak} {streak === 1 ? "day" : "days"}
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

        <div
          className={`grid grid-cols-1 ${badges && badges.length > 0
            ? "lg:grid-cols-[auto_1fr]"
            : "grid-cols-1"
            } gap-3.5 items-stretch`}
        >
          {/* Left: 365-day Contribution Heatmap */}
          <div className="flex flex-col gap-2 min-w-0">
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
              className="w-full lg:w-fit max-w-full h-full bg-zinc-900/50 border border-white/5 rounded-lg p-2.5 sm:p-3 overflow-x-auto custom-scrollbar flex items-center justify-start"
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

          {/* Right: Badges */}
          {badges && badges.length > 0 && (
            <div className="flex flex-col gap-2 min-w-0 flex-1">
              <div className="flex items-center text-[11px] font-mono text-zinc-400">
                <span>Badges · {badges.length} earned</span>
              </div>

              <div className="w-full h-full min-h-[58px] bg-zinc-900/50 border border-white/5 rounded-lg p-2 sm:p-2.5 flex flex-wrap items-center gap-2">
                {badges.map((badge, idx) => (
                  <div
                    key={badge.id || badge.name || idx}
                    title={badge.tooltip || badge.name}
                    aria-label={badge.tooltip || badge.name}
                    className="group relative w-12 h-12 flex items-center justify-center rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-white/5 hover:border-amber-400/40 transition-all duration-200 cursor-pointer shadow-sm"
                  >
                    {badge.icon ? (
                      <img
                        src={badge.icon}
                        alt={badge.name}
                        className="w-8 h-8 sm:w-9 sm:h-9 object-contain transition-transform duration-200 group-hover:scale-110 drop-shadow"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <span className="text-lg">🏆</span>
                    )}

                    {/* Badge name appears ONLY on hover */}
                    <div
                      className="
                        pointer-events-none
                        absolute
                        -top-9
                        left-1/2
                        -translate-x-1/2
                        opacity-0
                        group-hover:opacity-100
                        transition-opacity
                        duration-150
                        z-20
                        whitespace-nowrap
                        bg-zinc-950
                        text-zinc-200
                        text-[11px]
                        font-mono
                        px-2
                        py-1
                        rounded
                        border
                        border-white/10
                        shadow-lg
                      "
                    >
                      {badge.name}
                    </div>
                  </div>
                ))}
                
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeetcodeContributions;