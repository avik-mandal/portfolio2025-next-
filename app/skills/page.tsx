'use client';
import React, { useState, useEffect } from "react";
import { Code2, Palette, Database, Wrench, Zap, Award, TrendingUp, Star } from "lucide-react";

type Skill = {
  name: string;
  level: number;
  color: string;
  category: string;
  projects: number;
  experience: string;
};

export default function Skills() {
  const [filter, setFilter] = useState<string>("all");
  const [animatedLevels, setAnimatedLevels] = useState<Record<string, number>>({});

  const skills: Skill[] = [
    { name: "React", level: 95, color: "from-blue-500 to-cyan-400", category: "frontend", projects: 40, experience: "3 years" },
    { name: "Next.js", level: 92, color: "from-purple-500 to-pink-400", category: "frontend", projects: 25, experience: "2 years" },
    { name: "TypeScript", level: 88, color: "from-indigo-500 to-blue-400", category: "frontend", projects: 35, experience: "2 years" },
    { name: "Tailwind CSS", level: 96, color: "from-teal-500 to-emerald-400", category: "frontend", projects: 45, experience: "3 years" },
    { name: "JavaScript (ES6+)", level: 93, color: "from-yellow-500 to-orange-400", category: "frontend", projects: 50, experience: "3 years" },
    { name: "HTML5 & CSS3", level: 97, color: "from-orange-500 to-red-400", category: "frontend", projects: 50, experience: "3 years" },
    { name: "Node.js", level: 82, color: "from-green-500 to-lime-400", category: "backend", projects: 20, experience: "2 years" },
    { name: "Express.js", level: 80, color: "from-emerald-500 to-teal-400", category: "backend", projects: 18, experience: "2 years" },
    { name: "MongoDB", level: 78, color: "from-green-600 to-emerald-500", category: "backend", projects: 15, experience: "1.5 years" },
    { name: "PostgreSQL", level: 75, color: "from-blue-600 to-indigo-500", category: "backend", projects: 12, experience: "1.5 years" },
    { name: "REST APIs", level: 85, color: "from-cyan-500 to-blue-500", category: "backend", projects: 30, experience: "2 years" },
    { name: "GraphQL", level: 72, color: "from-pink-500 to-rose-400", category: "backend", projects: 10, experience: "1 year" },
    { name: "Figma", level: 86, color: "from-purple-500 to-violet-400", category: "design", projects: 30, experience: "2 years" },
    { name: "Responsive Design", level: 94, color: "from-fuchsia-500 to-pink-400", category: "design", projects: 48, experience: "3 years" },
    { name: "UI/UX Principles", level: 84, color: "from-rose-500 to-pink-400", category: "design", projects: 35, experience: "2 years" },
    { name: "Framer Motion", level: 88, color: "from-violet-500 to-purple-400", category: "design", projects: 22, experience: "1.5 years" },
    { name: "Git & GitHub", level: 91, color: "from-gray-600 to-gray-400", category: "tools", projects: 50, experience: "3 years" },
    { name: "VS Code", level: 95, color: "from-blue-600 to-cyan-500", category: "tools", projects: 50, experience: "3 years" },
    { name: "Webpack", level: 76, color: "from-sky-500 to-blue-400", category: "tools", projects: 18, experience: "1.5 years" },
    { name: "Vite", level: 85, color: "from-purple-600 to-fuchsia-500", category: "tools", projects: 25, experience: "1 year" },
  ];

  const categories = [
    { id: "all", label: "All Skills", icon: <Star className="w-4 h-4" />, count: skills.length },
    { id: "frontend", label: "Frontend", icon: <Code2 className="w-4 h-4" />, count: skills.filter(s => s.category === "frontend").length },
    { id: "backend", label: "Backend", icon: <Database className="w-4 h-4" />, count: skills.filter(s => s.category === "backend").length },
    { id: "design", label: "Design", icon: <Palette className="w-4 h-4" />, count: skills.filter(s => s.category === "design").length },
    { id: "tools", label: "Tools", icon: <Wrench className="w-4 h-4" />, count: skills.filter(s => s.category === "tools").length },
  ];

  const stats = [
    { icon: <Code2 className="w-6 h-6" />, value: "20+", label: "Technologies", color: "from-cyan-500 to-blue-500" },
    { icon: <Award className="w-6 h-6" />, value: "50+", label: "Projects Built", color: "from-purple-500 to-pink-500" },
    { icon: <TrendingUp className="w-6 h-6" />, value: "3+", label: "Years Experience", color: "from-emerald-500 to-teal-500" },
    { icon: <Zap className="w-6 h-6" />, value: "100%", label: "Passion", color: "from-orange-500 to-red-500" },
  ];

  const filteredSkills = filter === "all" ? skills : skills.filter(s => s.category === filter);

  // Animate progress bars on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      const levels: Record<string, number> = {};
      skills.forEach(skill => {
        levels[skill.name] = skill.level;
      });
      setAnimatedLevels(levels);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="skills" className="relative py-32 px-6 overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-4">
            <Zap className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-400 font-medium">My Arsenal</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4 text-white">
            Technical{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
              Skills
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            A comprehensive toolkit honed through real-world projects and continuous learning
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="group relative p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 backdrop-blur-sm hover:border-purple-500/30 transition-all hover:scale-105" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
              <div className="relative text-center">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10 mb-3 text-white`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-xs text-gray-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setFilter(cat.id)} className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all ${filter === cat.id ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 scale-105" : "bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-purple-500/30"}`}>
              {cat.icon}
              {cat.label}
              <span className={`px-2 py-0.5 rounded-full text-xs ${filter === cat.id ? "bg-white/20" : "bg-white/10"}`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredSkills.map((skill, i) => (
            <div key={skill.name} className="group p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 backdrop-blur-sm hover:border-purple-500/30 transition-all animate-fadeUp" style={{ animationDelay: `${i * 0.05}s` }}>
              {/* Skill Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r ${skill.color} text-white`}>
                      {skill.level}%
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {skill.projects} projects
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {skill.experience}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                <div className={`absolute inset-y-0 left-0 bg-gradient-to-r ${skill.color} rounded-full transition-all duration-[1500ms] ease-out`} style={{ width: `${animatedLevels[skill.name] || 0}%` }}>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-shimmer" />
                </div>
              </div>

              {/* Milestone indicators */}
              <div className="flex justify-between mt-2">
                {[25, 50, 75, 100].map((milestone) => (
                  <div key={milestone} className={`text-xs transition-all ${skill.level >= milestone ? "text-purple-400 font-semibold" : "text-gray-600"}`}>
                    {milestone}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Learning Section */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 backdrop-blur-sm">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0 p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-3">Currently Learning</h3>
              <p className="text-gray-300 mb-4">I'm always expanding my skillset. Here's what I'm focusing on right now:</p>
              <div className="flex flex-wrap gap-3">
                {["Three.js", "WebGL", "AI Integration", "Web3", "Docker", "Kubernetes"].map((tech) => (
                  <span key={tech} className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-all">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Certifications & Achievements */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 backdrop-blur-sm text-center">
            <div className="inline-flex p-4 rounded-full bg-yellow-500/10 mb-4">
              <Award className="w-8 h-8 text-yellow-400" />
            </div>
            <h4 className="text-white font-semibold mb-2">React Advanced</h4>
            <p className="text-gray-400 text-sm">Meta Certification • 2024</p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 backdrop-blur-sm text-center">
            <div className="inline-flex p-4 rounded-full bg-blue-500/10 mb-4">
              <Award className="w-8 h-8 text-blue-400" />
            </div>
            <h4 className="text-white font-semibold mb-2">Web Performance</h4>
            <p className="text-gray-400 text-sm">Google Certification • 2023</p>
          </div>
          <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 backdrop-blur-sm text-center">
            <div className="inline-flex p-4 rounded-full bg-green-500/10 mb-4">
              <Award className="w-8 h-8 text-green-400" />
            </div>
            <h4 className="text-white font-semibold mb-2">Accessibility Expert</h4>
            <p className="text-gray-400 text-sm">W3C Certification • 2024</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-fadeUp {
          animation: fadeUp 0.6s ease-out forwards;
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}