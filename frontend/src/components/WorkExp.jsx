import React from "react";
import { Briefcase, Calendar, MapPin, Award } from "lucide-react";

const WorkExp = () => {
  const experiences = [
    {
      id: 1,
      role: "Lead Technical Coordinator (MLSA)",
      company: "Microsoft Learn Student Ambassadors",
      date: "Jul 2025 – Apr 2026",
      location: "India",
      points: [
        "Led full-stack development workshops, mentoring 200+ students on Git, deployment, and software engineering practices.",
        "Coordinated AI-focused hackathons, promoting collaboration and open-source contributions.",
      ],
    },
    {
      id: 2,
      role: "Frontend Developer Intern",
      company: "Mirasung Technologies",
      date: "Oct 2024",
      location: "Remote",
      points: [
        "Migrated legacy UI components to a modular React architecture, reducing code redundancy by 20%.",
        "Delivered 5+ production features within Agile sprints and improved Lighthouse performance scores by 25%.",
      ],
    },
  ];

  return (
    <div id="experience" className="w-full py-20 px-6 relative z-40">
      <div className="max-w-4xl mx-auto w-full">
        
        <div className="flex flex-col items-start gap-2 mb-16">
          <span className="text-violet-400 font-mono text-sm tracking-widest uppercase">Career Journey</span>
          <h3 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
            WORK EXPERIENCE
          </h3>
          <div className="w-16 h-1 bg-violet-500 rounded mt-1"></div>
        </div>

        <div className="relative pl-8 md:pl-12">
          <div className="absolute left-[7px] md:left-[11px] top-1.5 bottom-1.5 w-[2px] -translate-x-1/2 bg-zinc-800" />

          <div className="flex flex-col gap-12">
            {experiences.map((exp) => (
              <div key={exp.id} className="relative">
                
                <div className="absolute left-[-25px] md:left-[-37px] -translate-x-1/2 top-1.5 w-3.5 h-3.5 rounded-full bg-zinc-900 border-2 border-violet-400 z-10 flex items-center justify-center shadow-[0_0_8px_rgba(167,139,250,0.5)]" />
                
                <div className="bg-zinc-850/40 border border-white/5 hover:border-violet-500/20 rounded-2xl p-6 backdrop-blur-sm transition-all duration-350 hover:scale-[1.005] shadow-xl group">
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-white/5 pb-4 mb-4">
                    <div>
                      <h4 className="text-xl font-bold text-zinc-100 flex items-center gap-2 group-hover:text-violet-400 transition-colors">
                        <Briefcase size={18} className="text-violet-400 shrink-0" />
                        {exp.role}
                      </h4>
                      <p className="text-zinc-400 font-medium text-sm mt-1">
                        {exp.company}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-zinc-500">
                      <span className="flex items-center gap-1 bg-zinc-900/60 border border-white/5 px-2.5 py-1 rounded">
                        <Calendar size={12} className="text-violet-400/60" />
                        {exp.date}
                      </span>
                      {exp.location && (
                        <span className="flex items-center gap-1 bg-zinc-900/60 border border-white/5 px-2.5 py-1 rounded">
                          <MapPin size={12} className="text-violet-400/60" />
                          {exp.location}
                        </span>
                      )}
                    </div>
                  </div>

                  <ul className="flex flex-col gap-3">
                    {exp.points.map((point, index) => (
                      <li 
                        key={index}
                        className="text-zinc-300 text-sm leading-relaxed flex items-start gap-2.5"
                      >
                        <Award size={14} className="text-violet-500/80 mt-1 shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};

export default WorkExp;
