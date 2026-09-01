import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="w-full border-t border-white/5 py-8 mt-12 z-40 relative">
      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center gap-2 text-zinc-500 text-sm font-mono px-4 text-center">
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