import React from "react";

const SectionHeading = ({ category, title, count, description }) => {
  return (
    <div className="flex flex-col items-start gap-2 mb-12">
      {category && (
        <span className="text-violet-400 font-mono text-xs md:text-sm tracking-[0.2em] uppercase font-semibold">
          {category}
        </span>
      )}
      <div className="flex items-center gap-4 flex-wrap">
        <h3 className="text-3xl md:text-4xl font-bold text-white tracking-wide uppercase">
          {title}
        </h3>
        {count !== undefined && count !== null && (
          <span className="text-xs text-zinc-400 font-mono border border-white/10 rounded-full px-3 py-0.5 bg-zinc-900/60 shadow-inner">
            {count} Total
          </span>
        )}
      </div>
      {description && (
        <p className="text-zinc-400 text-sm md:text-base max-w-xl mt-1 leading-relaxed">
          {description}
        </p>
      )}
      <div className="w-16 h-1 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full mt-1.5 shadow-sm shadow-violet-500/20"></div>
    </div>
  );
};

export default SectionHeading;
