import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Github, ExternalLink } from "lucide-react";

const GITHUB_USERNAME = "ruturaj1010";
const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;
const GITHUB_ACHIEVEMENTS_URL = `${GITHUB_PROFILE_URL}?tab=achievements`;

// Verified GitHub achievements earned by the user
const DEFAULT_GITHUB_BADGES = [
  {
    id: "pull-shark",
    name: "Pull Shark",
    tooltip: "Pull Shark",
    icon: "https://github.githubassets.com/assets/pull-shark-default-498c279a747d.png",
  },
  {
    id: "quickdraw",
    name: "Quickdraw",
    tooltip: "Quickdraw",
    icon: "https://github.githubassets.com/assets/quickdraw-default-39c6aec8ff89.png",
  },
  {
    id: "yolo",
    name: "YOLO",
    tooltip: "YOLO",
    icon: "https://github.githubassets.com/assets/yolo-default-be0bbff04951.png",
  },
];

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
  const [badges, setBadges] = useState(DEFAULT_GITHUB_BADGES);

  const scrollContainerRef = useRef(null);

  useLayoutEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft =
        scrollContainerRef.current.scrollWidth;
    }
  }, [contributions]);

  useEffect(() => {
    let isMounted = true;

    // 1. Fetch contribution calendar data
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load contributions JSON");
        }
        return res.json();
      })
      .then((data) => {
        if (!isMounted) return;

        if (data && data.contributions) {
          const sorted = [...data.contributions].sort((a, b) =>
            a.date.localeCompare(b.date)
          );

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

          const filtered = sorted.filter(
            (day) =>
              day.date >= oneYearAgoStr && day.date <= endOfWeekStr
          );

          setContributions(filtered);

          if (data.total) {
            const total = Object.values(data.total).reduce(
              (a, b) => a + b,
              0
            );

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

    // 2. Fetch live achievements dynamically if accessible
    const fetchLiveAchievements = async () => {
      try {
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
          GITHUB_ACHIEVEMENTS_URL
        )}`;
        const res = await fetch(proxyUrl);
        if (!res.ok) return;

        const data = await res.json();
        const html = data?.contents;
        if (!html || typeof html !== "string") return;

        const regex = /alt="Achievement: ([^"]+)"[^>]*src="([^"]+)"/g;
        let match;
        const parsedBadges = [];

        while ((match = regex.exec(html)) !== null) {
          const name = match[1];
          const icon = match[2];

          if (!parsedBadges.some((b) => b.name === name)) {
            parsedBadges.push({
              id: name.toLowerCase().replace(/\s+/g, "-"),
              name,
              tooltip: name,
              icon,
            });
          }
        }

        if (parsedBadges.length > 0 && isMounted) {
          setBadges(parsedBadges);
        }
      } catch {
        // Silently preserve verified DEFAULT_GITHUB_BADGES if proxy is unavailable
      }
    };

    fetchLiveAchievements();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div id="github" className="w-full">
      <div className="w-full bg-zinc-900/30 border border-white/10 rounded-xl p-4 md:p-5 flex flex-col gap-3.5">
        {/* Top bar: Brand + Stats + View Profile */}
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_auto_1fr] items-start lg:items-center gap-3.5 w-full">
          {/* Left: Brand */}
          <div className="flex items-center justify-between w-full lg:w-auto justify-self-start">
            <div className="flex items-center gap-2 mr-1">
              <Github className="text-violet-400 text-lg shrink-0" />

              <h4 className="text-base md:text-xl font-bold text-white font-mono tracking-wide leading-none">
                GITHUB
              </h4>
            </div>

            {/* Mobile View Profile Button */}
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="lg:hidden inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-violet-400 border border-white/10 hover:border-violet-400/40 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 shadow-sm"
            >
              <span>View Profile</span>
              <ExternalLink size={12} />
            </a>
          </div>

          {/* Center: Statistics */}
          {totalContributions !== null && (
            <div className="justify-self-center flex flex-wrap items-center justify-start lg:justify-center gap-2 w-full lg:w-auto">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900/80 border border-white/5">
                <span className="text-zinc-400 text-[11px] font-mono">
                  Total Contributions
                </span>
                <span className="text-white font-bold text-xs md:text-sm font-mono">
                  {totalContributions}
                </span>
              </div>

              {yearlyContributions !== null && (
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-violet-950/25 border border-violet-500/20">
                  <span className="text-violet-400/90 text-[11px] font-mono">
                    This Year
                  </span>
                  <span className="text-violet-300 font-bold text-xs md:text-sm font-mono">
                    {yearlyContributions}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900/80 border border-white/5">
                <span className="text-zinc-400 text-[11px] font-mono">
                  Status
                </span>
                <span className="text-emerald-400 font-medium text-xs md:text-sm font-mono flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Active Contributor
                </span>
              </div>
            </div>
          )}

          {/* Right: Desktop View Profile Button */}
          <div className="hidden lg:flex justify-self-end">
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-violet-400 border border-white/10 hover:border-violet-400/40 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 shrink-0 shadow-sm"
            >
              <span>View Profile</span>
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Content Layout: Heatmap (Left) + GitHub Badges (Right) */}
        <div
          className={`grid grid-cols-1 ${badges && badges.length > 0 ? "lg:grid-cols-[auto_1fr]" : "grid-cols-1"
            } gap-3.5 items-stretch`}
        >
          {/* Left: 365-day Contribution Heatmap */}
          <div className="flex flex-col gap-2 min-w-0">
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
              className="w-full lg:w-fit max-w-full h-full bg-zinc-900/50 border border-white/5 rounded-lg p-2.5 sm:p-3 overflow-x-auto custom-scrollbar flex items-center justify-start"
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
                    href={GITHUB_PROFILE_URL}
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

          {/* Right: GitHub Badges */}
          {badges && badges.length > 0 && (
            <div className="flex flex-col gap-2 min-w-0 flex-1">
              <div className="flex items-center text-[11px] font-mono text-zinc-400">
                <span>GitHub Badges · {badges.length} earned</span>
              </div>

              <div className="w-full h-full min-h-[58px] bg-zinc-900/50 border border-white/5 rounded-lg p-2 sm:p-2.5 flex flex-wrap items-center gap-2">
                {badges.map((badge, idx) => (
                  <a
                    key={badge.id || badge.name || idx}
                    href={GITHUB_ACHIEVEMENTS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={badge.tooltip || badge.name}
                    aria-label={badge.tooltip || badge.name}
                    className="group relative w-12 h-12 flex items-center justify-center rounded-lg bg-zinc-900/80 hover:bg-zinc-800 border border-white/5 hover:border-violet-400/40 transition-all duration-200 cursor-pointer shadow-sm"
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
                      <span className="text-lg">🏅</span>
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
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GithubContributions;