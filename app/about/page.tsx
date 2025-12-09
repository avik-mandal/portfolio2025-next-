// components/About.tsx
import React from "react";

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Me</span></h2>
          <p className="text-gray-400 text-lg">Get to know me better</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm hover:border-cyan-500/30 transition-all">
            <div className="text-4xl mb-4">👨‍💻</div>
            <h3 className="text-2xl font-bold mb-4">Who I Am</h3>
            <p className="text-gray-400 leading-relaxed">
              I'm a passionate frontend developer who loves turning complex problems into simple, beautiful interfaces.
              With expertise in React, Next.js, and modern web technologies, I create experiences that users love.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 backdrop-blur-sm hover:border-cyan-500/30 transition-all">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold mb-4">What I Do</h3>
            <p className="text-gray-400 leading-relaxed">
              I specialize in building responsive web applications with clean code and modern design.
              From concept to deployment, I handle the entire development process with attention to detail and performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
