import React from "react";
import { Github, ExternalLink } from "lucide-react";

const Project = () => {
  const projects = [
    {
      id: 1,
      src: "/uberProj.png",
      alt: "Uber Clone",
      title: "Uber Ride-Sharing App",
      description: "A full-stack web application replicating core Uber functionalities. Features real-time driver tracking, interactive route visualization, and JWT-based authentication. Developed using React, Node.js, Socket.io, TailwindCSS, and MongoDB.",
      tags: ["React", "Node.js", "Socket.io", "TailwindCSS", "MongoDB"],
      githubUrl: "https://github.com/ruturaj1010/UberClone",
      liveUrl: "https://project-alpha.vercel.app",
      featured: true,
    },
    {
      id: 2,
      src: "/movieMore.png",
      alt: "Movies+More",
      title: "Movies+More",
      description: "An interactive movie database and search portal. Integrates with the TMDB REST API for dynamic data fetching, and uses Redux Toolkit for seamless global state management. Built with modular, reusable UI components and client-side filtering.",
      tags: ["React.js", "Redux Toolkit", "TailwindCSS", "REST API"],
      githubUrl: "https://github.com/ruturaj1010/MovieWebsiteFront-end",
      liveUrl: "https://movie-website-front-end.vercel.app/",
      featured: true,
    },
    {
      id: 3,
      src: "/refokus.png",
      alt: "Refokus Clone",
      title: "Refokus Design Agency Clone",
      description: "A visually stunning front-end clone of the Refokus agency website. Showcases advanced interactions, smooth micro-animations, and custom transitions using Framer Motion. Focused on responsive layouts and modern, eye-catching design patterns.",
      tags: ["React.js", "TailwindCSS", "Framer Motion"],
      githubUrl: "https://github.com/ruturaj1010/Refokuss-Clone-ReactJs",
      liveUrl: "https://refokuss-clone-react-js.vercel.app/",
      featured: true,
    },
  ];

  return (
    <div id="projects" className="w-full py-20 px-6 relative z-40">
      <div className="max-w-5xl mx-auto w-full">
        
        <div className="flex flex-col items-start gap-2 mb-16">
          <span className="text-violet-400 font-mono text-sm tracking-widest uppercase">My Works</span>
          <div className="flex items-center gap-4">
            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
              FEATURED PROJECTS
            </h3>
            <span className="text-xs text-zinc-400 font-mono border border-white/10 rounded-full px-2.5 py-0.5 bg-zinc-800/40">
              {projects.length} Total
            </span>
          </div>
          <div className="w-16 h-1 bg-violet-500 rounded mt-1"></div>
        </div>

        <div className="flex flex-col gap-24">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={project.id}
                className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 w-full ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                
                <div className="w-full lg:w-1/2 group relative">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-violet-500 to-indigo-500 opacity-0 blur-lg group-hover:opacity-20 transition duration-500"></div>
                  
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-zinc-800 border border-white/10 shadow-xl transition-all duration-300 group-hover:border-violet-500/20 group-hover:scale-[1.01]">
                    <a
                      href={project.liveUrl || project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img 
                        src={project.src} 
                        alt={project.alt} 
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                      />
                    </a>
                  </div>
                </div>

                <div className="w-full lg:w-1/2 flex flex-col gap-4 items-start text-left">
                  
                  {project.featured && (
                    <span className="text-[10px] font-mono font-bold tracking-wider text-violet-400 uppercase bg-violet-950/40 border border-violet-500/20 px-2.5 py-1 rounded">
                      Featured Project
                    </span>
                  )}

                  <h4 className="text-2xl md:text-3xl font-bold text-zinc-100 hover:text-violet-400 transition-colors">
                    <a href={project.liveUrl || project.githubUrl} target="_blank" rel="noopener noreferrer">
                      {project.title}
                    </a>
                  </h4>

                  <p className="text-zinc-300 text-sm md:text-base leading-relaxed bg-zinc-850/30 border border-white/5 rounded-xl p-4 md:p-5 backdrop-blur-sm shadow-md">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-[11px] font-mono text-zinc-400 border border-white/5 rounded px-2.5 py-1 bg-zinc-900/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 mt-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-violet-400/40 text-zinc-300 hover:text-violet-400 rounded-lg text-xs font-mono tracking-wider transition-all duration-200"
                      >
                        <Github size={14} />
                        Code Base
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-violet-500 hover:bg-violet-600 text-zinc-950 font-bold rounded-lg text-xs font-mono tracking-wider transition-all duration-200 shadow-md shadow-violet-500/10"
                      >
                        <ExternalLink size={14} />
                        Live Demo
                      </a>
                    )}
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};

export default Project;