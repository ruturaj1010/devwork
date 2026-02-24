import React, { useRef } from "react";
import { motion } from "framer-motion";
import TiltedCard from "../partials/TiltedCard";
import { Github, ExternalLink } from "lucide-react";

const Project = () => {
  const containerRef = useRef(null);

  const projects = [
    {
      id: 1,
      src: "https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58",
      alt: "Project Alpha",
      caption: "Project Alpha",
      title: "Project Alpha",
      description: "A full-stack web app with real-time features.",
      tags: ["React", "Node.js", "Socket.io"],
      githubUrl: "https://github.com/yourusername/project-alpha",
      liveUrl: "https://project-alpha.vercel.app",
    },
    {
      id: 2,
      src: "https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58",
      alt: "Project Beta",
      caption: "Project Beta",
      title: "Project Beta",
      description: "An AI-powered dashboard for analytics.",
      tags: ["Python", "FastAPI", "TailwindCSS"],
      githubUrl: "https://github.com/yourusername/project-beta",
      liveUrl: null, // no live link — button won't render
    },
    {
      id: 3,
      src: "https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58",
      alt: "Project Gamma",
      caption: "Project Gamma",
      title: "Project Gamma",
      description: "Mobile-first e-commerce storefront.",
      tags: ["Next.js", "Stripe", "MongoDB"],
      githubUrl: null, // private repo — button won't render
      liveUrl: "https://project-gamma.vercel.app",
    },
    {
      id: 4,
      src: "https://i.scdn.co/image/ab67616d0000b273d9985092cd88bffd97653b58",
      alt: "Project Delta",
      caption: "Project Delta",
      title: "Project Delta",
      description: "CLI tool for automating deployments.",
      tags: ["Go", "Docker", "CI/CD"],
      githubUrl: "https://github.com/yourusername/project-delta",
      liveUrl: null,
    },
  ];

  return (
    <div id="projects" className="w-full h-full">

      <div className="flex items-center justify-center gap-4 py-14">
        <h1 className="text-3xl font-bold text-center text-white">PROJECTS</h1>
        <span className="text-sm text-white/40 font-mono border border-white/20 rounded-full px-3 py-1">
          {projects.length}
        </span>
      </div>

      <p className="text-center text-white/30 text-xs mb-4 font-mono tracking-widest uppercase select-none">
        ← drag to explore →
      </p>

      <div
        ref={containerRef}
        className="w-full overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ height: "420px" }}
      >
        <motion.div
          className="flex items-center gap-6 h-full w-max px-6 select-none"
          drag="x"
          dragConstraints={containerRef}
          dragElastic={0.1}
          dragTransition={{ power: 0.2, timeConstant: 250 }}
          whileTap={{ cursor: "grabbing" }}
          onDragStart={(e) => e.preventDefault()}
        >
          {projects.map((proj) => (
            <div key={proj.id} className="select-none flex flex-col gap-2">

              <TiltedCard
                imageSrc={proj.src}
                altText={proj.alt}
                captionText={proj.caption}
                containerHeight="250px"
                containerWidth="350px"
                imageHeight="250px"
                imageWidth="350px"
                rotateAmplitude={12}
                scaleOnHover={1.05}
                showMobileWarning={true}
                showTooltip
                displayOverlayContent
                overlayContent={
                  <p className="tilted-card-demo-text ml-5 mt-3">
                    {proj.title}
                  </p>
                }
              />

              <div
                className="flex flex-col gap-2 px-1"
                style={{ width: "350px" }}
              >
                <p className="text-white/60 text-xs leading-snug line-clamp-2">
                  {proj.description}
                </p>

                <div className="flex flex-wrap gap-1">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono text-white/50 border border-white/10 rounded px-2 py-0.5 bg-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 mt-1">
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white border border-white/10 hover:border-white/30 rounded-md px-3 py-1.5 bg-white/5 hover:bg-white/10 transition-all duration-200"
                    >
                      <Github size={13} />
                      GitHub
                    </a>
                  )}
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white border border-white/10 hover:border-white/30 rounded-md px-3 py-1.5 bg-white/5 hover:bg-white/10 transition-all duration-200"
                    >
                      <ExternalLink size={13} />
                      Live
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        #projects img {
          -webkit-user-drag: none;
          user-drag: none;
        }
        #projects * {
          user-select: none;
          -webkit-user-select: none;
        }
        #projects a {
          user-select: none;
          -webkit-user-drag: none;
        }
      `}</style>
    </div>
  );
};

export default Project;