// components/Footer.tsx
import React from "react";
import { Code, Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative py-12 px-6 border-t border-white/10 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur" />
              <div className="relative bg-black p-2 rounded-lg border border-cyan-500/50">
                <Code className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Avik Mandal</span>
          </div>

          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} All rights reserved.</p>

          <div className="flex items-center gap-4">
            <a href="https://github.com/avik-mandal" target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-white/5"><Github className="w-5 h-5" /></a>
            <a href="https://www.linkedin.com/in/avik-mandal-a901b7294" target="_blank" rel="noreferrer" className="p-2 rounded-lg hover:bg-white/5"><Linkedin className="w-5 h-5" /></a>
            <a href="mailto:avikmandal2022@gmail.com" className="p-2 rounded-lg hover:bg-white/5"><Mail className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
