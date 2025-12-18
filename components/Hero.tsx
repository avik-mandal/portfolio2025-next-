"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Sparkles,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  Code2,
  Zap,
  Heart,
} from "lucide-react";

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);

  /* ------------------------------
     Reduced Motion & Device Checks
  ------------------------------ */
  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  const isDesktop = useMemo(
    () => typeof window !== "undefined" && window.innerWidth >= 768,
    []
  );

  /* ------------------------------
     Mouse Tracking (Desktop Only)
  ------------------------------ */
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isDesktop || prefersReducedMotion) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setMouse({ x: e.clientX, y: e.clientY });
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [isDesktop, prefersReducedMotion]);

  /* ------------------------------
     Typing Animation (Optimized)
  ------------------------------ */
  const roles = useMemo(
    () => ["Frontend Developer", "UI/UX Designer", "React Specialist", "Problem Solver"],
    []
  );

  const [typedText, setTypedText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedText(roles[0]);
      return;
    }

    const full = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (typedText.length < full.length) {
      timeout = setTimeout(
        () => setTypedText(full.slice(0, typedText.length + 1)),
        90
      );
    } else {
      timeout = setTimeout(() => {
        setTypedText("");
        setRoleIndex((i) => (i + 1) % roles.length);
      }, 1800);
    }

    return () => clearTimeout(timeout);
  }, [typedText, roleIndex, roles, prefersReducedMotion]);

  /* ------------------------------
     Stats
  ------------------------------ */
  const stats = [
    { icon: <Code2 className="w-5 h-5" />, value: "50+", label: "Projects" },
    { icon: <Zap className="w-5 h-5" />, value: "3+", label: "Years" },
    { icon: <Heart className="w-5 h-5" />, value: "15+", label: "Clients" },
  ];

  return (
    <section
      id="home"
      ref={heroRef}
      aria-label="Hero section"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-24 overflow-hidden"
    >
      {/* ================= Background Effects ================= */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Blob 1 */}
        <div
          aria-hidden
          className="absolute w-[520px] h-[520px] rounded-full blur-3xl opacity-30 transition-transform duration-300"
          style={{
            background:
              "radial-gradient(circle, rgba(59,243,255,0.35), transparent 70%)",
            transform: prefersReducedMotion
              ? "translate(10%, 10%)"
              : `translate(${mouse.x / 35}px, ${mouse.y / 35}px)`,
          }}
        />

        {/* Blob 2 */}
        <div
          aria-hidden
          className="absolute right-0 bottom-0 w-[460px] h-[460px] rounded-full blur-3xl opacity-25 transition-transform duration-300"
          style={{
            background:
              "radial-gradient(circle, rgba(147,51,234,0.3), transparent 70%)",
            transform: prefersReducedMotion
              ? "translate(-10%, -10%)"
              : `translate(${-mouse.x / 45}px, ${-mouse.y / 45}px)`,
          }}
        />
      </div>

      {/* ================= Main Content ================= */}
      <div className="w-full max-w-6xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-sm font-medium text-cyan-300">
            Available for freelance work
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 text-white">
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Avik Mandal
          </span>
        </h1>

        {/* Animated Role */}
        <div className="h-10 md:h-12 mb-4">
          <p
            className="text-xl md:text-2xl font-bold text-gray-300"
            aria-live="polite"
          >
            {typedText}
            {!prefersReducedMotion && (
              <span className="inline-block w-0.5 h-6 md:h-8 bg-cyan-400 ml-1 animate-pulse" />
            )}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-base md:text-lg px-4">
          Crafting elegant digital experiences with clean code and modern UI.
          Specialized in React, Next.js & Tailwind CSS.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-cyan-500/30 transition-all"
            >
              <div className="text-cyan-400">{stat.icon}</div>
              <div className="text-left">
                <div className="text-lg font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <a
            href="#projects"
            className="group px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform"
          >
            View My Work
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#contact"
            className="px-8 py-4 rounded-xl border border-white/20 bg-white/5 hover:border-cyan-500/50 transition-all text-white font-semibold"
          >
            Get in Touch
          </a>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-3 mb-8">
          <a
            href="https://github.com/avik-mandal"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-cyan-500/50 transition"
          >
            <Github className="w-5 h-5 text-gray-400 hover:text-cyan-400" />
          </a>

          <a
            href="https://www.linkedin.com/in/avik-mandal-a901b7294"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-blue-500/50 transition"
          >
            <Linkedin className="w-5 h-5 text-gray-400 hover:text-blue-400" />
          </a>

          <a
            href="mailto:avikmandal2022@gmail.com"
            aria-label="Email"
            className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-purple-500/50 transition"
          >
            <Mail className="w-5 h-5 text-gray-400 hover:text-purple-400" />
          </a>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap justify-center gap-2">
          {["React", "Next.js", "TypeScript", "Tailwind", "Node.js"].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:text-cyan-400 hover:border-cyan-500/30 transition"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      {!prefersReducedMotion && (
        <div
          aria-hidden
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <div className="w-6 h-10 rounded-full border-2 border-cyan-500/30 flex justify-center p-2 bg-white/5 backdrop-blur-sm">
            <div className="w-1 h-3 rounded-full bg-cyan-400" />
          </div>
        </div>
      )}
    </section>
  );
}
