// components/Projects.tsx
import React from "react";
import { ExternalLink, Star } from "lucide-react";

const projects = [
  { id: 1, title: "E-Commerce Platform", desc: "Full-stack shopping experience with cart, checkout, and admin dashboard", tags: ["Next.js", "TypeScript", "Stripe"], gradient: "from-violet-600 to-indigo-600" },
  { id: 2, title: "Expense Tracker Pro", desc: "Real-time expense tracking with charts, exports, and budget planning", tags: ["React", "Node.js", "MongoDB"], gradient: "from-pink-600 to-rose-600" },
  { id: 3, title: "Social Media Dashboard", desc: "Analytics dashboard with real-time metrics and engagement tracking", tags: ["Next.js", "GraphQL", "Tailwind"], gradient: "from-cyan-600 to-blue-600" },
  { id: 4, title: "Portfolio Builder", desc: "Drag-and-drop portfolio creator with templates and hosting", tags: ["React", "Firebase", "Framer"], gradient: "from-emerald-600 to-teal-600" },
];

export default function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Projects</span></h2>
          <p className="text-gray-400 text-lg">Some of my recent work</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p) => (
            <article key={p.id} className="group relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm hover:border-cyan-500/30 transition-all overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${p.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} aria-hidden />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <Star className="w-6 h-6 text-cyan-400" />
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                </div>

                <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">{p.title}</h3>
                <p className="text-gray-400 mb-4 leading-relaxed">{p.desc}</p>

                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400">{t}</span>)}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
