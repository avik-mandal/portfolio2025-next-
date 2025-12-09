// components/Services.tsx
import React from "react";

const services = [
  { name: "Frontend Development", desc: "Pixel-perfect, responsive interfaces built with modern frameworks", icon: "🎨" },
  { name: "Full-Stack Solutions", desc: "End-to-end development from database to deployment", icon: "⚡" },
  { name: "UI/UX Design", desc: "User-centered design with focus on conversion and engagement", icon: "✨" },
  { name: "Performance Optimization", desc: "Speed up your site with code splitting and lazy loading", icon: "🚀" },
];

export default function Services() {
  return (
    <section id="services" className="relative py-32 px-6 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">What I <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Offer</span></h2>
          <p className="text-gray-400 text-lg">Services tailored to your needs</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <div key={s.name} className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm hover:border-cyan-500/30 transition-all text-center group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{s.icon}</div>
              <h3 className="text-xl font-bold mb-3">{s.name}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
