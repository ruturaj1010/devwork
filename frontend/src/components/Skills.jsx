import React from "react";
import Particles from "../partials/Particles";

const Skills = () => {
  const skills = [
    { name: "HTML", icon: "html" },
    { name: "CSS", icon: "css" },
    { name: "JavaScript", icon: "js" },
    { name: "React", icon: "react" },
    { name: "Redux", icon: "redux" },
    { name: "Tailwind", icon: "tailwind" },
    { name: "NodeJS", icon: "nodejs" },
    { name: "Express", icon: "express" },
    { name: "MongoDB", icon: "mongodb" },
    { name: "Git", icon: "git" },
    { name: "Java", icon: "java" },
    { name: "Python", icon: "python" },
    { name: "C", icon: "c" },
    { name: "MySQL", icon: "mysql" },
    { name: "Redis", icon: "redis" },
    { name: "Bootstrap", icon: "bootstrap" },
    { name: "Linux", icon: "linux" },
    { name: "Postman", icon: "postman" },
    { name: "Vercel", icon: "vercel" },
    { name: "AWS", icon: "aws" },
    { name: "Docker", icon: "docker" },
  ];

  return (
    <div id="skills" className="w-full h-full md:min-h-screen relative">
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

      <h3 className="text-3xl font-bold text-white text-center py-16">
        SKILLS
      </h3>

      <div className="w-full flex justify-center items-center relative z-20 py-10">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-12">
          {skills.map(({ name, icon }) => (
            <div key={name} className="relative group flex flex-col items-center">
            
              <div className="bg-white rounded-xl p-2 shadow-md hover:scale-110 transition-transform">
                <img
                  src={`https://skillicons.dev/icons?i=${icon}`}
                  alt={name}
                  className="w-10 h-10 object-contain"
                />
              </div>

              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-semibold rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;