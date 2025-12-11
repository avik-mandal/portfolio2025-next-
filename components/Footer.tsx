// components/Footer.tsx
import React from "react";
import { Code, Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative py-12 px-6 bg-black border-t border-white/10 overflow-hidden">

      {/* Soft animated gradient glow background */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[70%] h-[200px] bg-gradient-to-r from-cyan-500/30 to-blue-500/30 blur-[120px] animate-pulse" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Brand + Logo */}
          <div className="flex items-center gap-4 group">
            <div className="relative transition-transform duration-300 group-hover:scale-110">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur-md opacity-70 group-hover:opacity-100 transition" />

              <div className="relative bg-black p-3 rounded-lg border border-cyan-500/40 shadow-lg shadow-cyan-500/10">
                <Code className="w-6 h-6 text-cyan-400 drop-shadow-[0_0_6px_rgba(0,255,255,0.6)]" />
              </div>
            </div>

            <span className="font-bold text-2xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent tracking-wide drop-shadow">
              Avik Mandal
            </span>
          </div>

          {/* Rights Text */}
          <p className="text-gray-400 text-sm tracking-wide">
            © {new Date().getFullYear()} | Designed & Developed by Avik Mandal
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-5">
            <a
              href="https://github.com/avik-mandal"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-lg bg-white/5 hover:bg-cyan-500/20 transition-all duration-300 hover:scale-110 shadow-md shadow-cyan-500/10"
            >
              <Github className="w-5 h-5 text-gray-300" />
            </a>

            <a
              href="https://www.linkedin.com/in/avik-mandal-a901b7294"
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-lg bg-white/5 hover:bg-blue-500/20 transition-all duration-300 hover:scale-110 shadow-md shadow-blue-500/10"
            >
              <Linkedin className="w-5 h-5 text-gray-300" />
            </a>

            <a
              href="mailto:avikmandal2022@gmail.com"
              className="p-3 rounded-lg bg-white/5 hover:bg-cyan-400/20 transition-all duration-300 hover:scale-110 shadow-md shadow-cyan-400/10"
            >
              <Mail className="w-5 h-5 text-gray-300" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
