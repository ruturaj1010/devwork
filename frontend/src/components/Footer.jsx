import React from "react";
import { Github, Linkedin } from "lucide-react";
import { SiLeetcode } from "react-icons/si";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="w-full border-t border-white/5 py-8 mt-12 z-40 relative">
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center gap-3 text-zinc-500 text-sm font-mono px-4 text-center">
        <div className="flex items-center gap-4 text-zinc-400">
          <a
            href="https://github.com/ruturaj1010"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-violet-400 transition-colors duration-200"
            aria-label="GitHub Profile"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/ruturaj-nikam-10oc101028ru"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-violet-400 transition-colors duration-200"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={18} />
          </a>
          <a
            href="https://leetcode.com/u/rutu_10/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-violet-400 transition-colors duration-200"
            aria-label="LeetCode Profile"
          >
            <SiLeetcode size={18} />
          </a>
        </div>
        <p className="text-zinc-400 font-medium">
          Made with ❤️ by <span className="text-zinc-300 font-semibold">Ruturaj Nikam</span>
        </p>
        <p className="text-[11px] text-zinc-600">
          &copy; {currentYear} Ruturaj Nikam. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;