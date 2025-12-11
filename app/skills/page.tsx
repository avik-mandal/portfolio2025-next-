import React from "react";

const skills = [
  { name: "React", level: 90, color: "from-blue-500 to-cyan-400" },
  { name: "Next.js", level: 88, color: "from-purple-500 to-pink-400" },
  { name: "TypeScript", level: 75, color: "from-indigo-500 to-blue-400" },
  { name: "Tailwind CSS", level: 92, color: "from-teal-500 to-emerald-400" },
  { name: "Node.js", level: 70, color: "from-green-500 to-lime-400" },
  { name: "GraphQL", level: 65, color: "from-pink-500 to-rose-400" },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-28 px-6 "
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            My{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            Technologies I use to build modern web applications
          </p>
        </div>

        {/* Skill Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((s, i) => (
            <div
              key={s.name}
              className="group p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md 
              hover:border-cyan-400/40 hover:shadow-lg hover:shadow-cyan-500/10 
              transition-all duration-300 animate-fadeUp"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">{s.name}</h3>
                <span className="text-sm text-cyan-400 font-medium">
                  {s.level}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${s.color} rounded-full transition-all duration-[1500ms]`}
                  style={{ width: `${s.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @keyframes fadeUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeUp {
            animation: fadeUp 0.6s ease-out forwards;
          }
        `}
      </style>
    </section>
  );
}
