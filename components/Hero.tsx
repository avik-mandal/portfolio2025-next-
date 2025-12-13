"use client";
import React, { useEffect, useRef, useState } from "react";
import { Sparkles, ArrowRight, Github, Linkedin, Mail, Code2, Zap, Heart } from "lucide-react";

export default function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [typedText, setTypedText] = useState("");
  const [currentRole, setCurrentRole] = useState(0);
  
  const roles = [
    "Frontend Developer",
    "UI/UX Designer", 
    "React Specialist",
    "Problem Solver"
  ];

  // Track mouse
  useEffect(() => {
    const onMove = (e: MouseEvent) =>
      setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Typing animation
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentText = roles[currentRole];
    
    if (typedText.length < currentText.length) {
      timeout = setTimeout(() => {
        setTypedText(currentText.slice(0, typedText.length + 1));
      }, 100);
    } else {
      timeout = setTimeout(() => {
        setTypedText("");
        setCurrentRole((prev) => (prev + 1) % roles.length);
      }, 2000);
    }
    
    return () => clearTimeout(timeout);
  }, [typedText, currentRole, roles]);

  const stats = [
    { icon: <Code2 className="w-5 h-5" />, value: "50+", label: "Projects" },
    { icon: <Zap className="w-5 h-5" />, value: "3+", label: "Years" },
    { icon: <Heart className="w-5 h-5" />, value: "15+", label: "Clients" },
  ];

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 py-20 overflow-hidden "
    >
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Animated Blobs */}
        <div
          className="absolute w-96 h-96 md:w-[600px] md:h-[600px] rounded-full blur-3xl opacity-30"
          style={{
            background: "radial-gradient(circle, rgba(59, 243, 255, 0.3), transparent 70%)",
            left: `${Math.max(0, 10 + mouse.x / 40)}px`,
            top: `${Math.max(0, 10 + mouse.y / 40)}px`,
            transition: "all 0.3s ease-out",
          }}
        />

        <div
          className="absolute w-80 h-80 md:w-[500px] md:h-[500px] rounded-full blur-3xl opacity-25"
          style={{
            background: "radial-gradient(circle, rgba(147, 51, 234, 0.25), transparent 70%)",
            right: `${Math.max(0, 10 + mouse.x / 50)}px`,
            bottom: `${Math.max(0, 20 + mouse.y / 50)}px`,
            transition: "all 0.3s ease-out",
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 " />
      </div>

      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          <span className="text-sm font-medium text-cyan-300">
            Available for freelance work
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 text-white">
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            Avik Mandal
          </span>
        </h1>

        {/* Animated Role */}
        <div className="h-10 md:h-12 mb-4">
          <p className="text-xl md:text-2xl font-bold text-gray-300">
            {typedText}
            <span className="inline-block w-0.5 h-6 md:h-8 bg-cyan-400 ml-1 animate-pulse" />
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-400 max-w-2xl mx-auto mb-8 text-base md:text-lg px-4">
          Crafting elegant digital experiences with clean code and modern UI.
          Specialized in React, Next.js & Tailwind CSS.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-500/30 transition-all"
            >
              <div className="text-cyan-400">
                {stat.icon}
              </div>
              <div className="text-left">
                <div className="text-lg font-bold text-white">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <a
            href="#projects"
            className="w-full sm:w-auto group px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center gap-2 shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all text-white font-semibold"
          >
            View My Work
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 hover:border-cyan-500/50 transition-all backdrop-blur-sm text-white font-semibold"
          >
            Get in Touch
          </a>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <a
            href="https://github.com/avik-mandal"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-cyan-500/50 transition-all hover:scale-110"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5 text-gray-400 hover:text-cyan-400 transition-colors" />
          </a>

          <a
            href="https://www.linkedin.com/in/avik-mandal-a901b7294"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-blue-500/50 transition-all hover:scale-110"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5 text-gray-400 hover:text-blue-400 transition-colors" />
          </a>

          <a
            href="mailto:avikmandal2022@gmail.com"
            className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-purple-500/50 transition-all hover:scale-110"
            aria-label="Email"
          >
            <Mail className="w-5 h-5 text-gray-400 hover:text-purple-400 transition-colors" />
          </a>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap items-center justify-center gap-2 px-4">
          {["React", "Next.js", "TypeScript", "Tailwind", "Node.js"].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:border-cyan-500/30 hover:text-cyan-400 transition-all"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-cyan-500/30 flex items-start justify-center p-2 bg-white/5 backdrop-blur-sm">
          <div className="w-1 h-3 rounded-full bg-cyan-400 animate-pulse" />
        </div>
      </div>
    </section>
  );
}