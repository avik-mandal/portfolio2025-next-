import React from "react";
import { Mail, Briefcase, Cpu } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="relative py-24 px-6 ">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-white">
            About{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Me
            </span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg">Get to know me better</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Left: Portrait / Intro */}
          <div className="rounded-2xl p-6 bg-gradient-to-br from-white/3 to-white/2 border border-white/6 backdrop-blur-sm shadow-lg">
            <div className="flex flex-col items-center text-center gap-4">
              {/* simple inline SVG avatar (keeps it dependency free) */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 p-1 shadow-inner">
                <div className="w-full h-full rounded-full bg-black/60 flex items-center justify-center">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="currentColor" className="text-gray-200" />
                    <path d="M4 20c0-3.31 2.69-6 6-6h4c3.31 0 6 2.69 6 6v1H4v-1z" fill="currentColor" className="text-gray-500" />
                  </svg>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white">Hi, I'm Avik</h3>
              <p className="text-gray-300 max-w-xl">
                I'm a frontend developer focused on crafting clean, accessible, and high-performance web interfaces using React,
                Next.js and Tailwind. I care about UX, performance and shipping delightful details.
              </p>

              <div className="flex gap-3 mt-3">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md hover:scale-105 transition-transform"
                  aria-label="Contact Avik"
                >
                  <Mail className="w-4 h-4" />
                  Contact
                </a>

                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-gray-200 hover:bg-white/5 transition"
                  aria-label="View projects"
                >
                  <Briefcase className="w-4 h-4" />
                  Projects
                </a>
              </div>
            </div>
          </div>

          {/* Right: Cards & Skills */}
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <article className="p-6 rounded-2xl bg-gradient-to-br from-white/3 to-white/2 border border-white/6 backdrop-blur-sm hover:translate-y-[-4px] transition-transform">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-white/5">
                    <Cpu className="w-5 h-5 text-cyan-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Who I Am</h4>
                    <p className="text-gray-300 text-sm leading-relaxed mt-1">
                      Frontend developer transforming ideas into polished UI. I emphasize performance, accessibility and maintainable code.
                    </p>
                  </div>
                </div>
              </article>

              <article className="p-6 rounded-2xl bg-gradient-to-br from-white/3 to-white/2 border border-white/6 backdrop-blur-sm hover:translate-y-[-4px] transition-transform">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-white/5">
                    <Briefcase className="w-5 h-5 text-blue-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">What I Do</h4>
                    <p className="text-gray-300 text-sm leading-relaxed mt-1">
                      Build responsive web apps, component libraries and interfaces that scale — from prototypes to production.
                    </p>
                  </div>
                </div>
              </article>
            </div>

            {/* Skills */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/3 to-white/2 border border-white/6 backdrop-blur-sm">
              <h4 className="text-white font-semibold mb-3">Skills</h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "TailwindCSS",
                  "Vite / Webpack",
                  "Component Design",
                  "Accessibility (a11y)",
                  "Performance"
                ].map((s) => (
                  <span key={s} className="text-sm px-3 py-1 rounded-full bg-white/4 border border-white/6 text-gray-200">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-white/4 text-center">
                <div className="text-2xl font-bold text-white">+50</div>
                <div className="text-xs text-gray-300">Projects</div>
              </div>
              <div className="p-4 rounded-xl bg-white/4 text-center">
                <div className="text-2xl font-bold text-white">3+</div>
                <div className="text-xs text-gray-300">Years Experience</div>
              </div>
              <div className="p-4 rounded-xl bg-white/4 text-center">
                <div className="text-2xl font-bold text-white">7</div>
                <div className="text-xs text-gray-300">Credit Cards (lol)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
