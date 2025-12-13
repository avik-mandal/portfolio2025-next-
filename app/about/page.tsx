'use client';
import React, { useState } from "react";
import { Mail, Briefcase, Cpu, Award, Code2, Zap, Heart, Coffee, Clock, Target, Sparkles, Download } from "lucide-react";

export default function About() {
  const [activeTab, setActiveTab] = useState<"story" | "values" | "journey">("story");

  const achievements = [
    { icon: <Code2 className="w-5 h-5" />, value: "50+", label: "Projects Completed", color: "from-cyan-500 to-blue-500" },
    { icon: <Clock className="w-5 h-5" />, value: "3+", label: "Years Experience", color: "from-purple-500 to-pink-500" },
    { icon: <Award className="w-5 h-5" />, value: "15+", label: "Happy Clients", color: "from-emerald-500 to-teal-500" },
    { icon: <Coffee className="w-5 h-5" />, value: "∞", label: "Cups of Coffee", color: "from-orange-500 to-red-500" },
  ];

  const values = [
    { icon: <Heart className="w-5 h-5 text-rose-400" />, title: "Passion-Driven", desc: "I pour my heart into every project, treating each line of code as a craft." },
    { icon: <Zap className="w-5 h-5 text-yellow-400" />, title: "Fast & Efficient", desc: "Performance isn't just a metric—it's a commitment to exceptional user experience." },
    { icon: <Target className="w-5 h-5 text-blue-400" />, title: "Goal-Oriented", desc: "Every feature serves a purpose. I build with intention and measurable outcomes." },
    { icon: <Sparkles className="w-5 h-5 text-purple-400" />, title: "Pixel Perfect", desc: "Details matter. From spacing to animations, everything is intentionally crafted." },
  ];

  const journey = [
    { year: "2022", title: "Started Journey", desc: "Began learning web development, fell in love with React", color: "bg-cyan-500" },
    { year: "2023", title: "First Clients", desc: "Delivered 20+ freelance projects, mastered Next.js & TypeScript", color: "bg-blue-500" },
    { year: "2024", title: "Full Stack", desc: "Expanded to full-stack development, launched 10+ production apps", color: "bg-purple-500" },
    { year: "2025", title: "Current", desc: "Building scalable solutions, mentoring juniors, exploring AI integration", color: "bg-pink-500" },
  ];

  const expertise = [
    { category: "Frontend", skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP"] },
    { category: "Backend", skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "REST APIs", "GraphQL"] },
    { category: "Tools", skills: ["Git", "Docker", "Webpack", "Vite", "Figma", "VS Code"] },
    { category: "Soft Skills", skills: ["Communication", "Problem Solving", "Team Collaboration", "Time Management"] },
  ];

  return (
    <section id="about" className="relative py-32 px-6 overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-400 font-medium">Get to know me</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4 text-white">
            About{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              Me
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Frontend developer crafting beautiful, performant web experiences that users love
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* Left: Enhanced Profile Card */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-3xl p-8 bg-gradient-to-br from-white/5 to-white/2 border border-white/10 backdrop-blur-xl shadow-2xl">
              <div className="flex flex-col items-center text-center gap-6">
                {/* Enhanced Avatar with glow effect */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-blue-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                  <div className="relative w-40 h-40 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-500 p-1.5 shadow-2xl">
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center overflow-hidden">
                      <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" fill="currentColor" className="text-cyan-400" />
                        <path d="M4 20c0-3.31 2.69-6 6-6h4c3.31 0 6 2.69 6 6v1H4v-1z" fill="currentColor" className="text-cyan-600" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-tr from-emerald-500 to-teal-500 rounded-full flex items-center justify-center border-4 border-gray-900">
                    <span className="text-xl">👋</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-white mb-2">Avik Mandal</h3>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="text-sm text-cyan-300 font-medium">Available for work</span>
                  </div>
                </div>

                <p className="text-gray-300 text-base leading-relaxed">
                  Passionate frontend developer with a keen eye for design and a drive for creating 
                  exceptional digital experiences. I specialize in React, Next.js, and modern web technologies.
                </p>

                <div className="flex flex-wrap gap-3 w-full justify-center">
                  <a href="#contact" className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg hover:shadow-cyan-500/50 hover:scale-105 transition-all">
                    <Mail className="w-4 h-4" />
                    Hire Me
                  </a>
                  <a href="#projects" className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-white/20 text-gray-200 hover:bg-white/5 hover:border-cyan-500/50 transition-all">
                    <Briefcase className="w-4 h-4" />
                    Portfolio
                  </a>
                </div>

                <button className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-200 hover:bg-white/10 transition-all">
                  <Download className="w-4 h-4" />
                  Download Resume
                </button>

                {/* Social Links */}
                <div className="flex gap-3 pt-4">
                  {["GitHub", "LinkedIn", "Twitter", "Email"].map((social) => (
                    <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-500/50 transition-all hover:scale-110">
                      <span className="text-xs font-semibold text-gray-300">{social[0]}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Detailed Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Achievements Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map((item, i) => (
                <div key={i} className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 backdrop-blur-sm hover:border-cyan-500/30 transition-all hover:scale-105" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
                  <div className="relative">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.color} bg-opacity-10 mb-3`}>
                      {item.icon}
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">{item.value}</div>
                    <div className="text-xs text-gray-400 leading-tight">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tabbed Content */}
            <div className="rounded-3xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 backdrop-blur-sm overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-white/10 bg-black/20">
                {(["story", "values", "journey"] as const).map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 px-6 py-4 font-semibold text-sm transition-all relative ${activeTab === tab ? "text-cyan-400" : "text-gray-400 hover:text-gray-300"}`}>
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    {activeTab === tab && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500" />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {activeTab === "story" && (
                  <div className="space-y-6 animate-fadeIn">
                    <h3 className="text-2xl font-bold text-white">My Story</h3>
                    <div className="space-y-4 text-gray-300 leading-relaxed">
                      <p>
                        My journey into web development started three years ago when I stumbled upon a beautiful website 
                        and thought, "I want to build that." What began as curiosity quickly turned into an obsession.
                      </p>
                      <p>
                        I spent countless nights learning HTML, CSS, and JavaScript. The moment I created my first 
                        interactive button, I was hooked. Since then, I've built over 50 projects, from simple landing 
                        pages to complex full-stack applications.
                      </p>
                      <p>
                        Today, I specialize in React and Next.js, creating performant, accessible, and beautiful web 
                        experiences. I believe great code is not just functional—it's elegant, maintainable, and solves 
                        real problems for real people.
                      </p>
                      <div className="flex flex-wrap gap-3 mt-6">
                        <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium">Self-taught</span>
                        <span className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium">Problem Solver</span>
                        <span className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-sm font-medium">Fast Learner</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "values" && (
                  <div className="space-y-6 animate-fadeIn">
                    <h3 className="text-2xl font-bold text-white">Core Values</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {values.map((value, i) => (
                        <div key={i} className="p-6 rounded-2xl bg-white/3 border border-white/10 hover:border-cyan-500/30 transition-all">
                          <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-white/5">{value.icon}</div>
                            <div>
                              <h4 className="font-semibold text-white mb-2">{value.title}</h4>
                              <p className="text-sm text-gray-400 leading-relaxed">{value.desc}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "journey" && (
                  <div className="space-y-6 animate-fadeIn">
                    <h3 className="text-2xl font-bold text-white">My Journey</h3>
                    <div className="relative">
                      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500" />
                      <div className="space-y-8">
                        {journey.map((item, i) => (
                          <div key={i} className="relative pl-20">
                            <div className={`absolute left-0 w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center font-bold text-white shadow-lg`}>
                              {item.year}
                            </div>
                            <div className="p-6 rounded-2xl bg-white/3 border border-white/10 hover:border-cyan-500/30 transition-all">
                              <h4 className="font-semibold text-white text-lg mb-2">{item.title}</h4>
                              <p className="text-gray-400 text-sm">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Expertise Grid */}
            <div className="rounded-3xl p-8 bg-gradient-to-br from-white/5 to-white/2 border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <Cpu className="w-6 h-6 text-cyan-400" />
                <h3 className="text-2xl font-bold text-white">Technical Expertise</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {expertise.map((cat, i) => (
                  <div key={i} className="space-y-3">
                    <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide">{cat.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill) => (
                        <span key={skill} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-sm hover:border-cyan-500/30 hover:bg-white/10 transition-all cursor-default">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}