// components/Skills.tsx
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
    <section id="skills" className="relative py-32 px-6 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">My <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Skills</span></h2>
          <p className="text-gray-400 text-lg">Technologies I work with</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((s) => (
            <div key={s.name} className="group p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm hover:border-cyan-500/30 transition-all">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{s.name}</h3>
                <span className="text-sm text-cyan-400">{s.level}%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${s.color} rounded-full transition-all duration-1000 ease-out`} style={{ width: `${s.level}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
