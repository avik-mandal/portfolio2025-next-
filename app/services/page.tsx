'use client';
import React from "react";

const services = [
  {
    name: "Frontend Development",
    desc: "Pixel-perfect, responsive interfaces built with modern frameworks",
    icon: "🎨",
  },
  {
    name: "Full-Stack Solutions",
    desc: "End-to-end development from database to deployment",
    icon: "⚡",
  },
  {
    name: "UI/UX Design",
    desc: "User-centered design with focus on usability and conversion",
    icon: "✨",
  },
  {
    name: "Performance Optimization",
    desc: "Boost your website's speed with caching, code splitting & lazy loading",
    icon: "🚀",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative py-28 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            What I{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Offer
            </span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            Services tailored to your goals
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <div
              key={s.name}
              role="button"
              tabIndex={0}
              aria-label={s.name}
              className={`group p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-md
                hover:border-cyan-400/40 hover:shadow-xl hover:shadow-cyan-500/10
                transition-all duration-300 text-center focus:outline-none focus:ring-4 focus:ring-cyan-500/20
                animate-fadeUp`}
              style={{ animationDelay: `${i * 0.12}s` }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") (e.target as HTMLElement).click?.();
              }}
            >
              <div
                className="inline-flex items-center justify-center mx-auto w-16 h-16 rounded-full mb-4 text-4xl
                  bg-gradient-to-tr from-white/3 to-white/6
                  group-hover:scale-110 transition-transform duration-300"
                aria-hidden
              >
                <span className="leading-none">{s.icon}</span>
              </div>

              <h3 className="text-xl font-semibold text-white mb-2">{s.name}</h3>

              <p className="text-gray-300 text-sm leading-relaxed">{s.desc}</p>

              {/* subtle hover accent */}
              <div className="mt-4 h-1 w-16 mx-auto rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>

      {/* tiny fade-up animation (safe in TSX) */}
      <style>
        {`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(14px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeUp { animation: fadeUp 0.56s ease-out forwards; }
        `}
      </style>
    </section>
  );
}
