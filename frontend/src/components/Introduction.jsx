import React from "react";
import Particles from "../partials/Particles";
import BlurText from "../partials/BlurText";

const Introduction = () => {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };
  return (
    <div
      id="home"
      className="w-full h-full md:flex items-center relative sm:min-h-screen px-6 py-46 md:px-16"
    >
      <div className="w-full h-full absolute left-0 top-0">
        <Particles
          particleColors={["#ffffff"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      <div className="max-w-4xl mx-auto flex flex-col-reverse md:flex-row justify-center items-center gap-10">
        <div className="w-full md:w-3/5 flex flex-col justify-center gap-4 text-center md:text-left">
          <p className="text-zinc-100 text-2xl font-semibold tracking-wide">
            Hi there, I'm
          </p>
          <div className="flex justify-center sm:justify-start items-center">
            <BlurText
              text="Ruturaj Nikam"
              delay={200}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-3xl md:text-5xl font-bold text-zinc-100 leading-tight"
            />
          </div>
          <h2 className="text-xl md:text-3xl font-semibold text-cyan-200 bg-clip-text ">
            Full-Stack Developer
          </h2>
          <p className="text-zinc-200 text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
            I build clean, scalable, and user-focused web applications by
            transforming ideas into performant digital products. Passionate
            about thoughtful UX, efficient architecture, and real-world impact.
          </p>
        </div>

        <div className="w-full md:w-2/5 flex justify-center">
          <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-sky-200 p-1 shadow-lg shadow-sky-300/50 z-20">
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
