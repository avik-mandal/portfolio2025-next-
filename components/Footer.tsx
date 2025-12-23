// components/Footer.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skillss" },
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services1" },
  { id: "contact", label: "Contact1" },
];

export default function Footer() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  /* ---------------- Scroll Sync ---------------- */
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
      setScrolled(scrollTop > 40);

      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= 120 && r.bottom >= 120) {
          setActive(s.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------------- Magnetic Button ---------------- */
  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const onMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      btn.style.transform = `translate(${dx * 0.15}px, ${dy * 0.15}px)`;
    };

    const reset = () => {
      btn.style.transform = "translate(0,0)";
    };

    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", reset);
    return () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <footer
      className="relative mt-24 px-4 sm:px-6 pb-6"
      role="contentinfo"
      aria-label="Site footer"
    >
      {/* ---------- Scroll Progress Bar ---------- */}
      <div className="absolute left-0 right-0 -top-3 h-[3px] bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-[width]"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* ---------- Glass Container (Header Style) ---------- */}
      <div
        className="relative max-w-6xl mx-auto rounded-2xl border backdrop-blur-xl"
        style={{
          background: scrolled
            ? "linear-gradient(135deg, rgba(10,14,20,0.97), rgba(15,20,28,0.95))"
            : "linear-gradient(135deg, rgba(10,14,20,0.9), rgba(15,20,28,0.88))",
          borderColor: scrolled
            ? "rgba(59,243,255,0.35)"
            : "rgba(255,255,255,0.1)",
          boxShadow: scrolled
            ? "0 12px 42px rgba(6,182,212,0.25)"
            : "0 6px 28px rgba(0,0,0,0.4)",
        }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-6 py-6">

          {/* ---------- Brand ---------- */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center
              bg-gradient-to-br from-cyan-400/30 to-blue-400/20
              border border-cyan-400/40 shadow-lg shadow-cyan-400/30"
            >
              <span className="text-white font-black text-lg">AM</span>
            </div>

            <div>
              <div className="text-white font-bold">Avik Mandal</div>
              <div className="text-xs text-cyan-300">Frontend Developer</div>
            </div>
          </div>

          {/* ---------- Active Section Dots ---------- */}
          <nav aria-label="Active section indicator" className="flex gap-3">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() =>
                  document
                    .getElementById(s.id)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                aria-label={s.label}
                className={`w-2.5 h-2.5 rounded-full transition-all
                  ${active === s.id
                    ? "bg-cyan-400 scale-125 shadow-[0_0_10px_rgba(59,243,255,0.9)]"
                    : "bg-white/20 hover:bg-cyan-400/60"}
                `}
              />
            ))}
          </nav>

          {/* ---------- Social + Back to Top ---------- */}
          <div className="flex items-center gap-3">
            {[
              { href: "https://github.com/avik-mandal", icon: <Github /> },
              {
                href: "https://www.linkedin.com/in/avik-mandal-a901b7294",
                icon: <Linkedin />,
              },
              { href: "mailto:avikmandal2022@gmail.com", icon: <Mail /> },
            ].map((i, idx) => (
              <a
                key={idx}
                href={i.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-white/5 border border-white/10
                  text-gray-300 hover:text-cyan-400 hover:bg-white/10
                  transition-all hover:scale-110"
              >
                {i.icon}
              </a>
            ))}

            {/* Back to top */}
            <button
              ref={btnRef}
              onClick={() =>
                window.scrollTo({ top: 0, behavior: "smooth" })
              }
              aria-label="Back to top"
              className="ml-2 p-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500
                text-black shadow-lg hover:scale-110 transition-all"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ---------- Footer Note ---------- */}
      <p className="mt-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Avik Mandal — Built with precision & passion
      </p>
    </footer>
  );
}
