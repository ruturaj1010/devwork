import React from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const WorkExp = () => {
  const experiences = [
    {
      id: 1,
      role: "Lead Technical Coordinator (MLSA)",
      company: "Microsoft Learn Student Ambassadors",
      date: "Jul 2025 – April 2026",
      location: "",
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
    <div id="experience" className="w-full h-full py-10">
      <h1 className="text-3xl font-bold text-center text-white py-16">
        WORK EXPERIENCE
      </h1>

      <div className="relative max-w-3xl mx-auto px-6">
        <div className="absolute sm:left-1/2 top-0 bottom-0 w-px bg-white/10 sm:-translate-x-1/2" />

        <div className="flex flex-col gap-10">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`relative flex flex-col sm:flex-row items-start gap-4 sm:gap-0 ${
                index % 2 === 0 ? "" : "sm:flex-row-reverse"
              }`}
            >
              <div className="absolute left-0 sm:left-1/2 top-0.4 w-3.5 h-3.5 rounded-full bg-sky-400 border-2 border-zinc-900 sm:-translate-x-1/2 z-10" />

              <div className="hidden sm:block w-1/2" />

              <div className="w-full sm:w-1/2 pl-8 sm:pl-0">
                <div
                  className={`bg-zinc-800 border border-white/10 hover:border-white/30 rounded-lg p-5 transition-all duration-200 ${
                    index % 2 === 0 ? "sm:ml-8" : "sm:mr-8"
                  }`}
                >
                  <div className="flex items-center gap-2 text-white font-semibold text-base">
                    <Briefcase size={15} className="text-sky-300" />
                    {exp.role}
                  </div>

                  <p className="text-white/70 text-sm font-medium mt-1">
                    {exp.company}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 mt-2 mb-3">
                    <span className="flex items-center gap-1 text-[11px] font-mono text-white/50 border border-white/10 rounded px-2 py-0.5 bg-zinc-800">
                      <Calendar size={11} />
                      {exp.date}
                    </span>
                    {exp.location == "" ? null : (
                      <span className="flex items-center gap-1 text-[11px] font-mono text-white/50 border border-white/10 rounded px-2 py-0.5 bg-zinc-800">
                        <MapPin size={11} />
                        {exp.location}
                      </span>
                    )}
                  </div>

                  <ul className="flex flex-col gap-1.5">
                    {exp.points.map((point, i) => (
                      <li
                        key={i}
                        className="text-white/60 text-xs leading-snug list-disc list-inside marker:text-sky-300"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkExp;
