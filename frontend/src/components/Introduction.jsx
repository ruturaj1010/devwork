import React from "react";
import BlurText from "../partials/BlurText";
import { FileText } from "lucide-react";
import { SiGithub, SiLinkedin, SiLeetcode, SiX } from "react-icons/si";

const Introduction = () => {
  return (
    <div
      id="home"
      className="w-full min-h-screen flex items-center px-6 py-20 lg:py-0 scroll-mt-24"
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
              Java Full Stack Developer
            </h2>
            <div className="text-zinc-400 text-xs md:text-sm font-mono flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="px-2 py-0.5 rounded bg-zinc-800/80 border border-white/5 text-violet-300">Java</span>
              <span className="text-zinc-600">•</span>
              <span className="px-2 py-0.5 rounded bg-zinc-800/80 border border-white/5 text-violet-300">Spring Boot</span>
              <span className="text-zinc-600">•</span>
              <span className="px-2 py-0.5 rounded bg-zinc-800/80 border border-white/5 text-violet-300">React</span>
              <span className="text-zinc-600">•</span>
              <span className="px-2 py-0.5 rounded bg-zinc-800/80 border border-white/5 text-violet-300">PostgreSQL</span>
              <span className="text-zinc-600">•</span>
              <span className="px-2 py-0.5 rounded bg-zinc-800/80 border border-white/5 text-violet-300">REST APIs</span>
              <span className="text-zinc-600">•</span>
              <span className="px-2 py-0.5 rounded bg-zinc-800/80 border border-white/5 text-violet-300">Node.js</span>
              <span className="text-zinc-600">•</span>
              <span className="px-2 py-0.5 rounded bg-zinc-800/80 border border-white/5 text-violet-300">MongoDB</span>
            </div>
          </div>

          <p className="text-zinc-300 text-base md:text-lg leading-relaxed max-w-xl mt-2">
            Java Full Stack Developer building scalable, high-performance web applications with Java, Spring Boot, React, and PostgreSQL. Focused on clean architecture, robust APIs, and thoughtful user experiences.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4">
            <a
              href="/RuturajNikamCV.pdf"
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
                className="group p-2.5 rounded-lg bg-zinc-800 border border-white/10 hover:border-zinc-500 hover:bg-zinc-700/80 text-zinc-100 transition-all duration-200"
                aria-label="GitHub Profile"
              >
                <SiGithub size={18} className="transition-colors duration-200 group-hover:text-white" />
              </a>
              <a
                href="https://www.linkedin.com/in/ruturajnikam"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2.5 rounded-lg bg-zinc-800 border border-white/10 hover:border-[#0a66c2]/50 hover:shadow-[0_0_12px_rgba(10,102,194,0.3)] transition-all duration-200"
                aria-label="LinkedIn Profile"
              >
                <SiLinkedin size={18} className="text-[#0a66c2] transition-colors duration-200 group-hover:text-[#258cfb]" />
              </a>
              <a
                href="https://leetcode.com/u/rutu_10/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2.5 rounded-lg bg-zinc-800 border border-white/10 hover:border-[#ffa116]/50 hover:shadow-[0_0_12px_rgba(255,161,22,0.3)] transition-all duration-200"
                aria-label="LeetCode Profile"
              >
                <SiLeetcode size={18} className="text-[#ffa116] transition-colors duration-200 group-hover:text-[#ffb74d]" />
              </a>
              <a
                href="https://x.com/thecodingcell"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-2.5 rounded-lg bg-zinc-800 border border-white/10 hover:border-zinc-500 hover:bg-zinc-700/80 transition-all duration-200"
                aria-label="X Profile"
              >
                <SiX size={18} className="text-zinc-200 transition-colors duration-200 group-hover:text-white" />
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
