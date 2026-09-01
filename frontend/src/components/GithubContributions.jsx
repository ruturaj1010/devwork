import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Github, ExternalLink } from "lucide-react";

const ContributionCell = ({ date, count, level }) => {
  const getColorClass = (lvl) => {
    switch (lvl) {
      case 0:
        return "bg-zinc-800/60 border border-white/[0.02]";
      case 1:
        return "bg-violet-950/90 hover:bg-violet-900 border border-violet-900/20";
      case 2:
        return "bg-violet-800/80 hover:bg-violet-700 border border-violet-700/20";
      case 3:
        return "bg-violet-600 hover:bg-violet-500 border border-violet-500/20";
      case 4:
        return "bg-violet-400 hover:bg-violet-300 border border-violet-300/20";
      default:
        return "bg-zinc-800/60";
    }
  };

  return (
    <div
      className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-[2px] transition-colors duration-150 cursor-crosshair ${getColorClass(
        level
      )}`}
      title={`${count} contributions on ${date}`}
      aria-label={`${count} contributions on ${date}`}
    />
  );
};

const GithubContributions = () => {
  const [contributions, setContributions] = useState([]);
  const [totalContributions, setTotalContributions] = useState(null);
  const [yearlyContributions, setYearlyContributions] = useState(null);
  const [loadingChart, setLoadingChart] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const scrollContainerRef = useRef(null);

  useLayoutEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, [contributions]);

  useEffect(() => {
    let isMounted = true;

    fetch("https://github-contributions-api.jogruber.de/v4/ruturaj1010")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load contributions JSON");
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;

        if (data && data.contributions) {
          const sorted = [...data.contributions].sort((a, b) => a.date.localeCompare(b.date));
          
          // Past 365 days slice
          const today = new Date();
          const oneYearAgo = new Date(today);
          oneYearAgo.setFullYear(today.getFullYear() - 1);

          while (oneYearAgo.getDay() !== 0) {
            oneYearAgo.setDate(oneYearAgo.getDate() - 1);
          }
          const oneYearAgoStr = oneYearAgo.toISOString().split("T")[0];

          const currentDayOfWeek = today.getDay();
          const daysUntilSaturday = 6 - currentDayOfWeek;
          const endOfWeek = new Date(today);
          endOfWeek.setDate(today.getDate() + daysUntilSaturday);
          const endOfWeekStr = endOfWeek.toISOString().split("T")[0];

          const filtered = sorted.filter((day) => day.date >= oneYearAgoStr && day.date <= endOfWeekStr);
          
          setContributions(filtered);

          if (data.total) {
            const total = Object.values(data.total).reduce((a, b) => a + b, 0);
            setTotalContributions(total);

            const currentYear = today.getFullYear().toString();
            if (data.total[currentYear] !== undefined) {
              setYearlyContributions(data.total[currentYear]);
            }
          }
        }
        setLoadingChart(false);
      })
      .catch((err) => {
        console.error("GitHub API error:", err);
        if (!isMounted) return;
        setLoadError(true);
        setLoadingChart(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div id="github" className="w-full">
      <div className="w-full bg-zinc-900/30 border border-white/10 rounded-xl p-4 md:p-5 flex flex-col gap-3.5">
        
        {/* Compact Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <Github className="text-violet-400 text-lg shrink-0" />
              <h4 className="text-base md:text-lg font-bold text-white font-mono tracking-wide">
                GITHUB
              </h4>
            </div>
            <span className="text-xs font-mono text-zinc-400">
              Open Source & Repositories
            </span>
          </div>

          <a
            href="https://github.com/ruturaj1010"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-violet-400 border border-white/10 hover:border-violet-400/40 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 self-start sm:self-auto shrink-0 shadow-sm"
          >
            <span>View Profile</span>
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Compact Statistics Row */}
        {totalContributions !== null && (
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-white/5">
              <span className="text-zinc-400 text-[11px] font-mono">Total Contributions</span>
              <span className="text-white font-bold text-xs md:text-sm font-mono">
                {totalContributions}
              </span>
            </div>

            {yearlyContributions !== null && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-violet-950/25 border border-violet-500/20">
                <span className="text-violet-400/90 text-[11px] font-mono">This Year</span>
                <span className="text-violet-300 font-bold text-xs md:text-sm font-mono">
                  {yearlyContributions}
                </span>
              </div>
            )}

            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-white/5">
              <span className="text-zinc-400 text-[11px] font-mono">Status</span>
              <span className="text-emerald-400 font-medium text-xs md:text-sm font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Active Contributor
              </span>
            </div>
          </div>
        )}

        {/* Heatmap Section */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-[11px] font-mono text-zinc-400">
            <span>Activity · 365 days</span>

            <div className="flex items-center gap-1.5 text-zinc-500 text-[10px]">
              <span>Less</span>
              <span className="w-2 h-2 rounded-[1px] bg-zinc-800/60 border border-white/[0.02]" />
              <span className="w-2 h-2 rounded-[1px] bg-violet-950/90 border border-violet-900/20" />
              <span className="w-2 h-2 rounded-[1px] bg-violet-800/80 border border-violet-700/20" />
              <span className="w-2 h-2 rounded-[1px] bg-violet-600 border border-violet-500/20" />
              <span className="w-2 h-2 rounded-[1px] bg-violet-400 border border-violet-300/20" />
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
                <span>Unable to load GitHub activity.</span>
                <a
                  href="https://github.com/ruturaj1010"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-violet-400 hover:underline inline-flex items-center gap-1"
                >
                  View profile on GitHub <ExternalLink size={10} />
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

export default GithubContributions;
