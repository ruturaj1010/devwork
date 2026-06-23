import React from "react";
import BlurText from "../partials/BlurText";
import { Github, Linkedin, FileText } from "lucide-react";

const Introduction = () => {
  return (
    <div
      id="home"
      className="w-full min-h-screen flex items-center px-6 py-20 lg:py-0"
    >
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        <div className="lg:col-span-7 flex flex-col items-start text-left gap-5 z-40">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Open to Opportunities
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-zinc-400 text-lg font-mono tracking-wide">
              Hi there, I'm
            </p>
            <div className="flex items-center">
              <BlurText
                text="Ruturaj Nikam"
                delay={200}
                animateBy="words"
                direction="top"
                className="text-4xl md:text-6xl font-bold text-zinc-100 leading-tight tracking-wider"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-2xl md:text-3xl font-semibold text-violet-400 tracking-wide font-mono">
              Full-Stack Developer
            </h2>
            <div className="text-zinc-400 text-xs md:text-sm font-mono flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="px-2 py-0.5 rounded bg-zinc-800/80 border border-white/5 text-violet-300">React</span>
              <span className="text-zinc-600">•</span>
              <span className="px-2 py-0.5 rounded bg-zinc-800/80 border border-white/5 text-violet-300">Node.js</span>
              <span className="text-zinc-600">•</span>
              <span className="px-2 py-0.5 rounded bg-zinc-800/80 border border-white/5 text-violet-300">Java</span>
              <span className="text-zinc-600">•</span>
              <span className="px-2 py-0.5 rounded bg-zinc-800/80 border border-white/5 text-violet-300">MongoDB</span>
            </div>
          </div>

          <p className="text-zinc-300 text-base md:text-lg leading-relaxed max-w-xl mt-2">
            Building performant web applications with thoughtful UX, scalable server-side systems, and clean architecture. Focused on solving real-world challenges with high-impact software.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4">
            <a
              href="/Ruturaj_Nikam_8600598191.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-500 hover:bg-violet-600 text-zinc-950 font-bold rounded-lg transition-all duration-200 shadow-lg shadow-violet-500/20 text-sm font-mono tracking-wide"
            >
              <FileText size={16} />
              View Resume
            </a>

            <div className="flex items-center gap-2">
              <a
                href="https://github.com/ruturaj1010"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-zinc-800 border border-white/10 hover:border-violet-400 hover:text-violet-400 text-zinc-300 transition-all duration-200"
                aria-label="GitHub Profile"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/ruturaj-nikam-10oc101028ru"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-zinc-800 border border-white/10 hover:border-violet-400 hover:text-violet-400 text-zinc-300 transition-all duration-200"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

        </div>

        <div className="lg:col-span-5 flex justify-center lg:justify-end z-40">
          <div className="relative w-80">
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden">

              <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-700">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>

              <img
                src="/Home.png"
                alt="Ruturaj"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Introduction;
