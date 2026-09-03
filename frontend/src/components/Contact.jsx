import React, { useState } from "react";
import { Mail, Copy, Check, ArrowUpRight } from "lucide-react";
import { SiGithub, SiLinkedin, SiLeetcode, SiX } from "react-icons/si";

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const copyEmail = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText("ruturajnikam1010@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:ruturajnikam1010@gmail.com";
  };

  return (
    <div id="contact" className="w-full py-20 px-6 relative z-40 flex flex-col justify-between min-h-[65vh] scroll-mt-24">
      <div className="max-w-3xl mx-auto w-full flex flex-col items-center justify-center flex-grow text-center">

        <span className="text-violet-400 font-mono text-xs tracking-[0.2em] uppercase mb-4">
          Get in Touch
        </span>

        <h3 className="text-3xl md:text-4xl font-bold text-white tracking-wide uppercase mb-6">
          CONNECT WITH ME
        </h3>

        <p className="text-zinc-400 text-sm md:text-base max-sm:px-4 max-w-sm leading-relaxed mb-10">
          Have a project or opportunity? I'm always open to discussing new ideas.
        </p>

        <div
          onClick={handleEmailClick}
          className="group relative flex items-center justify-between gap-6 pl-6 pr-3 py-2.5 bg-zinc-900/30 border border-white/10 hover:border-violet-500/30 rounded-full cursor-pointer transition-all duration-300 backdrop-blur-md shadow-2xl hover:shadow-[0_0_30px_rgba(139,92,246,0.05)] w-full max-w-md hover:scale-[1.01]"
        >
          <div className="flex items-center gap-3">
            <Mail size={16} className="text-violet-400 transition-transform duration-300 group-hover:scale-110" />
            <span className="text-zinc-200 font-mono text-sm md:text-base tracking-wide select-all font-medium">
              ruturajnikam1010@gmail.com
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyEmail}
              className="p-2.5 rounded-full bg-zinc-950/60 border border-white/5 text-zinc-400 hover:text-white hover:border-violet-400 transition-all duration-200 focus:outline-none"
              title="Copy email address"
            >
              {copied ? (
                <Check size={14} className="text-emerald-400" />
              ) : (
                <Copy size={14} />
              )}
            </button>
            <div className="p-2.5 rounded-full bg-violet-500 text-zinc-950 transition-all duration-300 group-hover:bg-violet-600">
              <ArrowUpRight size={14} />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-8 flex-wrap justify-center">
          <a
            href="https://www.linkedin.com/in/ruturajnikam"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-zinc-300 hover:text-[#258cfb] transition-colors duration-200 text-xs font-mono"
          >
            <SiLinkedin size={13} className="text-[#0a66c2] group-hover:text-[#258cfb] transition-colors duration-200" />
            <span>LinkedIn</span>
          </a>
          <span className="text-zinc-700 text-xs font-mono">•</span>
          <a
            href="https://github.com/ruturaj1010"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors duration-200 text-xs font-mono"
          >
            <SiGithub size={13} className="text-zinc-100 group-hover:text-white transition-colors duration-200" />
            <span>GitHub</span>
          </a>
          <span className="text-zinc-700 text-xs font-mono">•</span>
          <a
            href="https://leetcode.com/u/rutu_10/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-zinc-300 hover:text-[#ffb74d] transition-colors duration-200 text-xs font-mono"
          >
            <SiLeetcode size={13} className="text-[#ffa116] group-hover:text-[#ffb74d] transition-colors duration-200" />
            <span>LeetCode</span>
          </a>
          <span className="text-zinc-700 text-xs font-mono">•</span>
          <a
            href="https://x.com/thecodingcell"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors duration-200 text-xs font-mono"
          >
            <SiX size={13} className="text-zinc-100 group-hover:text-white transition-colors duration-200" />
            <span>X</span>
          </a>
        </div>

        <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 flex items-center gap-2.5 px-4.5 py-3 bg-zinc-950 border border-emerald-500/30 text-emerald-400 rounded-full text-sm font-mono shadow-2xl shadow-emerald-950/20 backdrop-blur-md ${copied ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95 pointer-events-none"
          }`}>
          <Check size={16} className="text-emerald-400" />
          <span>Email copied!</span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
