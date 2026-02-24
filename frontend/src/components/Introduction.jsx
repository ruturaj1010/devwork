import React from "react";
import BlurText from "../partials/BlurText";

const Introduction = () => {
  return (
    <div
      id="home"
      className="w-full h-full md:flex items-center sm:min-h-screen px-6 py-42 md:px-16"
    >
      <div className="max-w-4xl mx-auto flex flex-col-reverse lg:flex-row justify-center items-center gap-10">
        <div className="w-full md:w-3/5 flex flex-col justify-center gap-2 text-center lg:text-left">
          <p className="text-zinc-100 text-2xl font-semibold tracking-wide">
            Hi there, I'm
          </p>
          <div className="flex justify-center lg:justify-start items-center">
            <BlurText
              text="Ruturaj Nikam"
              delay={200}
              animateBy="words"
              direction="top"
              className="text-3xl md:text-5xl font-bold text-zinc-100 leading-tight tracking-wider"
            />
          </div>
          <h2 className="text-xl md:text-3xl font-semibold text-cyan-200 bg-clip-text ">
            Full-Stack Developer
          </h2>
          <h5 className="text-zinc-300 text-base font-medium md:text-lg leading-relaxed max-w-xl mt-5 mx-auto md:mx-0">
            Clean code. Thoughtful UX. Real impact
          </h5>
          <p className="text-zinc-300 text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
            Building performant web applications with thoughtful UX and clean
            architecture.
          </p>
        </div>

        <div className="w-full md:w-2/5 flex justify-center">
          <div className="w-56 h-56 lg:w-72 lg:h-72 rounded-full bg-sky-200 p-1 shadow-lg shadow-sky-300/50 z-20">
            <img
              className="w-full h-full rounded-full object-cover object-center pointer-events-none select-none"
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
