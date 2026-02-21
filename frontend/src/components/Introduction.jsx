import React from "react";

const Introduction = () => {
  return (
    <div id="home" className="w-full h-full md:flex items-center bg-amber-400 sm:min-h-screen px-6 py-24 md:px-16">
      <div className="max-w-4xl mx-auto flex flex-col-reverse md:flex-row justify-center items-center gap-10">
        <div className="w-full md:w-3/5 flex flex-col justify-center gap-4 text-center md:text-left">
          <p className="text-purple-400 font-medium tracking-wide">
            Hi there, I'm
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-zinc-700 leading-tight">
            Ruturaj Nikam
          </h1>
          <h2 className="text-xl md:text-3xl font-semibold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Full-Stack Developer
          </h2>
          <p className="text-zinc-500 text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
            I build clean, scalable, and user-focused web applications by
            transforming ideas into performant digital products. Passionate
            about thoughtful UX, efficient architecture, and real-world impact.
          </p>
        </div>

        <div className="w-full md:w-2/5 flex justify-center">
          <div className="w-56 h-56 md:w-72 md:h-72 rounded-full p-2 bg-amber-200 shadow-xl shadow-amber-400/50">
            <img
              className="w-full h-full rounded-full object-cover"
              src="Home.png"
              alt="Ruturaj Nikam profile photo"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
