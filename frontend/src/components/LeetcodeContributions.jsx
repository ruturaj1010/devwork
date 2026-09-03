import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { ExternalLink } from "lucide-react";
import { SiLeetcode } from "react-icons/si";

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

const LeetcodeContributions = () => {
  const [contributions, setContributions] = useState([]);
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [stats, setStats] = useState(null);
  const [loadingChart, setLoadingChart] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const scrollContainerRef = useRef(null);

  useLayoutEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft =
        scrollContainerRef.current.scrollWidth;
    }
  }, [contributions]);

  const processCalendarData = (submissionCalendar) => {
    let map = {};

    try {
      map =
        typeof submissionCalendar === "string"
          ? JSON.parse(submissionCalendar)
          : submissionCalendar || {};
    } catch {
      map = {};
    }

    const dateCounts = {};

    for (const [timestamp, count] of Object.entries(map)) {
      const d = new Date(parseInt(timestamp, 10) * 1000);
      const dateStr = d.toISOString().split("T")[0];
      dateCounts[dateStr] = (dateCounts[dateStr] || 0) + count;
    }

    const today = new Date();
    const oneYearAgo = new Date(today);
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    while (oneYearAgo.getDay() !== 0) {
      oneYearAgo.setDate(oneYearAgo.getDate() - 1);
    }

    const currentDayOfWeek = today.getDay();
    const daysUntilSaturday = 6 - currentDayOfWeek;
    const endOfWeek = new Date(today);

    endOfWeek.setDate(today.getDate() + daysUntilSaturday);

    const days = [];
    let sum = 0;
    const cursor = new Date(oneYearAgo);

    while (cursor <= endOfWeek) {
      const dateStr = cursor.toISOString().split("T")[0];
      const count = dateCounts[dateStr] || 0;

      sum += count;

      let level = 0;

      if (count > 0 && count <= 2) level = 1;
      else if (count > 2 && count <= 5) level = 2;
      else if (count > 5 && count <= 10) level = 3;
      else if (count > 10) level = 4;

      days.push({
        date: dateStr,
        count,
        level,
      });

      cursor.setDate(cursor.getDate() + 1);
    }

    return { days, sum };
  };

  useEffect(() => {
    let isMounted = true;

    fetch("https://leetcode-api-faisalshohag.vercel.app/rutu_10")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load LeetCode stats");
        }

        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;

        if (data) {
          if (data.totalSolved !== undefined) {
            setStats({
              totalSolved: data.totalSolved,
              easySolved: data.easySolved ?? 0,
              mediumSolved: data.mediumSolved ?? 0,
              hardSolved: data.hardSolved ?? 0,
              ranking: data.ranking,
            });
          }

          if (data.submissionCalendar) {
            const { days, sum } = processCalendarData(
              data.submissionCalendar
            );

            setContributions(days);
            setTotalSubmissions(sum);
          }
        }

        setLoadingChart(false);
      })
      .catch((err) => {
        console.error("LeetCode API error:", err);

        if (!isMounted) return;

        setLoadError(true);
        setLoadingChart(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div id="leetcode" className="w-full">
      <div className="w-full bg-zinc-900/30 border border-white/10 rounded-xl p-4 md:p-5 flex flex-col gap-3.5">
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_auto_1fr] items-start lg:items-center gap-3.5 w-full">
          {/* Left: Brand */}
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

            {/* Mobile View Profile Button */}
            <a
              href="https://leetcode.com/u/rutu_10/"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-amber-400 border border-white/10 hover:border-amber-400/40 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 shadow-sm"
            >
              <span>View Profile</span>
              <ExternalLink size={12} />
            </a>
          </div>

          {/* Center: Statistics */}
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

              {stats.ranking && (
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900/80 border border-white/5">
                  <span className="text-zinc-400 text-[11px] font-mono">
                    Rank
                  </span>
                  <span className="text-zinc-200 font-medium text-xs md:text-sm font-mono">
                    #{stats.ranking.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Right: Desktop View Profile Button */}
          <div className="hidden lg:flex justify-self-end">
            <a
              href="https://leetcode.com/u/rutu_10/"
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
            <span>Activity · 365 days</span>

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
            {loadingChart ? (
              <div className="w-full flex flex-col items-center justify-center py-4 gap-2 animate-pulse">
                <div className="h-3 bg-zinc-800 rounded w-3/4"></div>
                <div className="h-3 bg-zinc-800 rounded w-1/2"></div>
              </div>
            ) : loadError && contributions.length === 0 ? (
              <div className="w-full py-4 text-center text-xs font-mono text-zinc-500 flex flex-col items-center gap-1.5">
                <span>Unable to load LeetCode activity.</span>

                <a
                  href="https://leetcode.com/u/rutu_10/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:underline inline-flex items-center gap-1"
                >
                  View profile on LeetCode <ExternalLink size={10} />
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