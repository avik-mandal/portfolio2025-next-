// components/Hero.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Sparkles, ArrowRight, Github, Linkedin, Mail } from "lucide-react";

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 960, y: 540 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const safeW = typeof window !== "undefined" ? window.innerWidth : 1920;
  const safeH = typeof window !== "undefined" ? window.innerHeight : 1080;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="fixed inset-0 opacity-30 pointer-events-none -z-10">
        <div style={{ left: `${mouse.x / 20}px`, top: `${mouse.y / 20}px`, transition: "all 0.25s ease-out" }} className="absolute w-96 h-96 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full blur-3xl" />
        <div style={{ right: `${((safeW - mouse.x) - 0) / 25}px`, bottom: `${((safeH - mouse.y) - 0) / 25}px`, transition: "all 0.25s ease-out" }} className="absolute w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-6">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-sm text-gray-400">Available for freelance work</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
          Hi, I'm <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">Avik</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 mb-4">Frontend Developer & Designer</p>

        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-10">Crafting elegant digital experiences with clean code and modern design. Specializing in React, Next.js, and everything web.</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#projects" className="group px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center gap-2">View My Work <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></a>
          <a href="#contact" className="px-8 py-4 rounded-xl border border-white/20 hover:bg-white/5 transition-all">Get in Touch</a>
        </div>

        <div className="flex items-center justify-center gap-4 mt-12">
          <a href="https://github.com/avik-mandal" target="_blank" rel="noreferrer" className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/avik-mandal-a901b7294" target="_blank" rel="noreferrer" className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="mailto:avikmandal2022@gmail.com" className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10">
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2">
          <div className="w-1 h-3 rounded-full bg-cyan-400 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
