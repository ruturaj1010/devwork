import React from "react";

const SkillBadge = ({ name, icon }) => (
  <div className="flex items-center gap-2 bg-zinc-900 border border-white/5 hover:border-violet-500/30 hover:bg-zinc-800/60 rounded-lg px-3 py-1.5 transition-all duration-200 hover:scale-[1.03] cursor-default group">
    <img
      src={`https://skillicons.dev/icons?i=${icon}`}
      alt={name}
      className="w-5 h-5 object-contain filter saturate-[0.8] group-hover:saturate-100 transition-all"
      onError={(e) => { e.target.style.display = 'none'; }}
    />
    <span className="text-xs md:text-sm text-zinc-300 font-medium tracking-wide">
      {name}
    </span>
  </div>
);

const SkillCategoryCard = ({ title, skills, colSpan }) => (
  <div className={`bg-zinc-800/40 border border-white/5 rounded-xl p-5 hover:border-violet-500/20 transition-colors flex flex-col backdrop-blur-sm ${colSpan}`}>
    <h4 className="text-lg font-bold text-zinc-100 font-mono border-b border-white/5 pb-2.5 mb-4 flex items-center justify-between">
      <span>{title}</span>
      <span className="text-xs text-zinc-500 font-normal">
        {skills.length} skills
      </span>
    </h4>
    
    <div className="flex flex-wrap gap-2.5">
      {skills.map((skill) => (
        <SkillBadge key={skill.name} name={skill.name} icon={skill.icon} />
      ))}
    </div>
  </div>
);

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      colSpan: "md:col-span-2",
      skills: [
        { name: "React", icon: "react" },
        { name: "Redux Toolkit", icon: "redux" },
        { name: "Tailwind CSS", icon: "tailwind" },
        { name: "Bootstrap", icon: "bootstrap" },
        { name: "HTML5", icon: "html" },
        { name: "CSS3", icon: "css" },
      ],
    },
    {
      title: "Backend",
      colSpan: "md:col-span-2",
      skills: [
        { name: "Node.js", icon: "nodejs" },
        { name: "Express.js", icon: "express" },
        { name: "Spring Boot", icon: "spring" },
      ],
    },
    {
      title: "Database",
      colSpan: "md:col-span-2",
      skills: [
        { name: "MongoDB", icon: "mongodb" },
        { name: "MySQL", icon: "mysql" },
      ],
    },
    {
      title: "Languages",
      colSpan: "md:col-span-3",
      skills: [
        { name: "JavaScript", icon: "js" },
        { name: "TypeScript", icon: "typescript" },
        { name: "Java", icon: "java" },
        { name: "Python", icon: "python" },
        { name: "C", icon: "c" },
      ],
    },
    {
      title: "Tools & Cloud",
      colSpan: "md:col-span-3",
      skills: [
        { name: "Git", icon: "git" },
        { name: "GitHub", icon: "github" },
        { name: "Postman", icon: "postman" },
        { name: "Vercel", icon: "vercel" },
        { name: "Docker", icon: "docker" },
        { name: "AWS", icon: "aws" },
        { name: "Linux", icon: "linux" },
      ],
    },
  ];

  return (
    <div id="skills" className="w-full min-h-screen py-20 px-6 flex flex-col justify-center">
      <div className="max-w-5xl mx-auto w-full z-40">
        
        <div className="flex flex-col items-start gap-2 mb-12">
          <span className="text-violet-400 font-mono text-sm tracking-widest uppercase">Expertise</span>
          <h3 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
            TECHNICAL SKILLS
          </h3>
          <div className="w-16 h-1 bg-violet-500 rounded mt-1"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {skillCategories.map((category) => (
            <SkillCategoryCard 
              key={category.title}
              title={category.title}
              skills={category.skills}
              colSpan={category.colSpan}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Skills;