import React, { useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import SectionHeading from "./SectionHeading";

const Project = () => {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const projects = [
    {
      id: 1,
      src: "/leaveease.png",
      characterSrc: "/easeleave-character.svg",
      alt: "EaseLeave Employee Leave Management System",
      title: "EaseLeave — Employee Leave Management System",
      description:
        "Full-stack employee leave management platform with role-based access, leave applications, approvals, analytics, profile management, and secure cloud-based file storage.",
      tags: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "IMAP",
        "TailwindCSS",
        "JWT",
        "Cloudinary",
      ],
      githubUrl: "https://github.com/ruturaj1010/EmailLeaveSystem",
      liveUrl: "https://www.easeleave.codingcell.me/",
    },
    {
      id: 2,
      src: "/sakshiparlour.png",
      characterSrc: "/sakshi-parlour-character.svg",
      alt: "Sakshi Ladies Beauty Parlour",
      title: "Sakshi Ladies Beauty Parlour",
      description:
        "Full-stack beauty parlour platform featuring salon services, bridal offerings, customer interactions, and responsive appointment-focused experiences.",
      tags: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "TailwindCSS",
        "Vite",
      ],
      githubUrl: "https://github.com/ruturaj1010/business-parlor",
      liveUrl: "https://www.sakshiparlor.codingcell.me/",
    },
    {
      id: 3,
      src: "/uberProj.png",
      characterSrc: "/uber-character.svg",
      alt: "Uber Clone",
      title: "Ride Sharing App Like Uber",
      description:
        "A full-stack web application replicating core Uber functionalities. Features real-time driver tracking, interactive route visualization, and JWT-based authentication. Developed using React, Node.js, Socket.io, TailwindCSS, and MongoDB.",
      tags: [
        "React.js",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Socket.io",
        "Redis",
        "JWT",
        "Maps API",
      ],
      githubUrl: "https://github.com/ruturaj1010/UberClone",
      liveUrl: "https://liveriding.vercel.app/",
    },
    {
      id: 4,
      src: "/movieMore.png",
      characterSrc: "/movies-character.svg",
      alt: "Movies+More",
      title: "Movies+More",
      description:
        "An interactive movie database and search portal. Integrates with the TMDB REST API for dynamic data fetching, and uses Redux Toolkit for seamless global state management. Built with modular, reusable UI components and client-side filtering.",
      tags: [
        "React.js",
        "Redux Toolkit",
        "JavaScript",
        "TMDB API",
        "REST API",
        "TailwindCSS",
      ],
      githubUrl:
        "https://github.com/ruturaj1010/MovieWebsiteFront-end",
      liveUrl:
        "https://movie-website-front-end.vercel.app/",
    },
    {
      id: 5,
      src: "/refokus.png",
      characterSrc: "/refokus-character.svg",
      alt: "Refokus Clone",
      title: "Refokus Design Agency Clone",
      description:
        "A visually stunning front-end clone of the Refokus agency website. Showcases advanced interactions, smooth micro-animations, and custom transitions using Framer Motion. Focused on responsive layouts and modern, eye-catching design patterns.",
      tags: [
        "React.js",
        "JavaScript",
        "TailwindCSS",
        "Framer Motion",
        "Responsive Design",
      ],
      githubUrl:
        "https://github.com/ruturaj1010/Refokuss-Clone-ReactJs",
      liveUrl:
        "https://refokuss-clone-react-js.vercel.app/",
    },
  ];

  const currentProject = projects[activeProjectIndex];

  return (
    <div id="projects" className="w-full py-12 md:py-16 px-6 relative z-40">
      <div className="max-w-5xl mx-auto w-full">
        <SectionHeading
          category="My Works"
          title="PROJECTS"
          count={projects.length}
        />

        <div className="bg-zinc-850/40 border border-white/10 rounded-2xl p-4 sm:p-6 md:p-8 backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

            {/* Left Side: Compact Project Index Navigation */}
            <div className="lg:col-span-4 flex flex-col gap-3 w-full">
              <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1 hidden lg:block">
                Select Project ({activeProjectIndex + 1}/{projects.length})
              </span>

              <div className="flex lg:flex-col gap-3.5 overflow-x-auto custom-scrollbar pb-2 lg:pb-0 w-full pt-4 lg:pt-6">
                {projects.map((project, index) => {
                  const isActive = index === activeProjectIndex;
                  return (
                    <div key={project.id} className="relative shrink-0 lg:w-full">
                      {/* Character Mascot anchored directly above the active project button */}
                      {isActive && project.characterSrc && (
                        <div className="absolute -top-9 right-2 z-30 pointer-events-none hidden lg:block transition-all duration-300 animate-fadeIn">
                          <img
                            key={`char-${project.id}`}
                            src={project.characterSrc}
                            alt=""
                            aria-hidden="true"
                            className="w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                          />
                        </div>
                      )}

                      <button
                        onClick={() => setActiveProjectIndex(index)}
                        aria-current={isActive ? "true" : undefined}
                        aria-label={`View ${project.title}`}
                        className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl border text-left font-mono transition-all duration-200 w-full cursor-pointer ${
                          isActive
                            ? "bg-violet-950/50 border-violet-500/40 text-violet-300 shadow-md shadow-violet-950/40"
                            : "bg-zinc-900/60 border-white/5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 hover:border-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className={`text-xs font-bold ${isActive ? "text-violet-400" : "text-zinc-500"}`}>
                            0{index + 1}
                          </span>
                          <span className="text-xs md:text-sm font-semibold truncate">
                            {project.title.split(" — ")[0]}
                          </span>
                        </div>

                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)] shrink-0 hidden sm:inline-block" />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side: Active Project Display (with comfortable spacing from sidebar) */}
            <div className="lg:col-span-8 flex flex-col gap-5 w-full items-start text-left lg:pl-4">
              
              {/* Mobile-only Mascot */}
              {currentProject.characterSrc && (
                <div className="flex justify-center lg:hidden my-1 pointer-events-none w-full">
                  <img
                    key={`char-mobile-${currentProject.id}`}
                    src={currentProject.characterSrc}
                    alt=""
                    aria-hidden="true"
                    className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
                  />
                </div>
              )}

              {/* Extended Screenshot Image */}
              <div className="w-full max-w-[340px] sm:max-w-[420px] md:max-w-[540px] lg:max-w-[660px] group relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-500 opacity-0 blur-lg group-hover:opacity-20 transition duration-500" />

                <div className="relative aspect-[16/8] w-full overflow-hidden rounded-xl bg-zinc-900 border border-white/10 shadow-xl">
                  <a
                    href={currentProject.liveUrl || currentProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      key={currentProject.id}
                      src={currentProject.src}
                      alt={currentProject.alt}
                      className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-[1.02] filter saturate-[0.95] group-hover:saturate-100"
                    />
                  </a>
                </div>
              </div>

              {/* Active Project Info */}
              <div key={`info-${currentProject.id}`} className="flex flex-col gap-3.5 items-start text-left w-full max-w-[660px]">
                
                {/* Project Title Line with Action Buttons aligned to the right margin */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 w-full">
                  <h4 className="text-xl md:text-2xl font-bold text-zinc-100 hover:text-violet-400 transition-colors">
                    <a
                      href={currentProject.liveUrl || currentProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {currentProject.title}
                    </a>
                  </h4>

                  <div className="flex items-center gap-2.5 shrink-0">
                    {currentProject.githubUrl && (
                      <a
                        href={currentProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-violet-400/40 text-zinc-300 hover:text-violet-400 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 shadow-sm"
                      >
                        <Github size={13} />
                        Code Base
                      </a>
                    )}

                    {currentProject.liveUrl && (
                      <a
                        href={currentProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-violet-500 hover:bg-violet-600 text-zinc-950 font-bold rounded-lg text-xs font-mono tracking-wider transition-all duration-200 shadow-md shadow-violet-500/20 hover:shadow-violet-500/35"
                      >
                        <ExternalLink size={13} />
                        Live
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-zinc-300 text-sm leading-relaxed">
                  {currentProject.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-1">
                  {currentProject.tags.slice(0, 6).map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-mono text-zinc-300 border border-white/10 rounded px-2.5 py-1 bg-zinc-900/80 hover:border-violet-500/30 transition-colors shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Project;