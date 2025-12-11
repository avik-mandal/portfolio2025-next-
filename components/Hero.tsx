"use client";
import React, { useEffect, useRef, useState } from "react";
import { Sparkles, ArrowRight, Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Track mouse
  useEffect(() => {
    const onMove = (e: MouseEvent) =>
      setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-6 pt-20 overflow-hidden "
    >
      {/* Background Blobs */}
      <div className="absolute inset-0 -z-10 opacity-40 pointer-events-none">
        <div
          className="blob-1 absolute w-[480px] h-[480px] rounded-full blur-3xl bg-cyan-500/20"
          style={{
            left: mouse.x / 25,
            top: mouse.y / 25,
            transition: "0.2s ease-out",
          }}
        />

        <div
          className="blob-2 absolute w-[380px] h-[380px] rounded-full blur-3xl bg-purple-500/20"
          style={{
            right: mouse.x / 30,
            bottom: mouse.y / 30,
            transition: "0.2s ease-out",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-sm text-gray-300">
            Available for freelance work
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black mb-4">
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Avik
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-4">
          Frontend Developer & Designer
        </p>

        <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
          Crafting elegant digital experiences with clean code and modern UI.
          Specialized in React, Next.js & Tailwind.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="group px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
          >
            View My Work{" "}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#contact"
            className="px-8 py-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 transition-all"
          >
            Get in Touch
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-4 mt-12">
          <a
            href="https://github.com/avik-mandal"
            target="_blank"
            className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition"
          >
            <Github className="w-5 h-5 text-white" />
          </a>

          <a
            href="https://www.linkedin.com/in/avik-mandal-a901b7294"
            target="_blank"
            className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition"
          >
            <Linkedin className="w-5 h-5 text-white" />
          </a>

          <a
            href="mailto:avikmandal2022@gmail.com"
            className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition"
          >
            <Mail className="w-5 h-5 text-white" />
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-7 h-12 rounded-full border-2 border-white/10 flex items-start justify-center p-2">
          <div className="w-1 h-3 rounded-full bg-cyan-400 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
