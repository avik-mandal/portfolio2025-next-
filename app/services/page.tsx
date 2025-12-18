"use client";

import { useState } from "react";
import {
  Code2,
  Palette,
  Zap,
  Rocket,
  Check,
  ArrowRight,
  Users,
  Clock,
  X,
} from "lucide-react";

type Service = {
  name: string;
  desc: string;
  fullDesc: string;
  icon: React.ReactNode;
  gradient: string;
  features: string[];
  deliverables: string[];
  timeline: string;
};

export default function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services: Service[] = [
    {
      name: "Frontend Development",
      desc: "Modern, responsive, and performance-focused web interfaces",
      fullDesc:
        "I build clean and responsive frontend applications using React and Next.js. My focus is on performance, accessibility, and maintainable code that scales as your product grows.",
      icon: <Code2 className="w-8 h-8" />,
      gradient: "from-blue-500 to-cyan-400",
      features: [
        "React & Next.js development",
        "Responsive (mobile-first) UI",
        "Reusable component architecture",
        "API integration",
        "Basic SEO optimization",
      ],
      deliverables: [
        "Production-ready frontend",
        "Clean, documented code",
        "Responsive layouts",
        "Deployment support",
      ],
      timeline: "2–4 weeks",
    },
    {
      name: "Web Application Development",
      desc: "Complete web solutions for startups and small businesses",
      fullDesc:
        "End-to-end web applications built with modern tools. Ideal for portfolios, dashboards, internal tools, and startup MVPs.",
      icon: <Rocket className="w-8 h-8" />,
      gradient: "from-purple-500 to-pink-400",
      features: [
        "Frontend + basic backend",
        "Authentication (basic)",
        "Database integration",
        "REST API usage",
        "Deployment setup",
      ],
      deliverables: [
        "Functional web application",
        "Admin-ready structure",
        "Deployment guide",
      ],
      timeline: "4–8 weeks",
    },
    {
      name: "UI Enhancement & Redesign",
      desc: "Improve design, UX, and performance of existing websites",
      fullDesc:
        "Already have a website? I can redesign your UI, improve responsiveness, and enhance overall user experience without rebuilding everything from scratch.",
      icon: <Palette className="w-8 h-8" />,
      gradient: "from-pink-500 to-rose-400",
      features: [
        "UI cleanup & redesign",
        "Responsive fixes",
        "Animation enhancements",
        "Accessibility improvements",
      ],
      deliverables: [
        "Improved UI/UX",
        "Optimized layouts",
        "Updated styles & animations",
      ],
      timeline: "1–3 weeks",
    },
    {
      name: "Performance Optimization",
      desc: "Make your website faster and smoother",
      fullDesc:
        "I analyze frontend performance issues and apply optimizations to improve loading speed, responsiveness, and user experience.",
      icon: <Zap className="w-8 h-8" />,
      gradient: "from-yellow-500 to-orange-400",
      features: [
        "Performance audit",
        "Code optimization",
        "Image optimization",
        "Lighthouse improvements",
      ],
      deliverables: [
        "Performance report",
        "Optimized frontend",
        "Before/after metrics",
      ],
      timeline: "1–2 weeks",
    },
  ];

  const process = [
    { step: 1, title: "Discussion", desc: "Understanding your goals and requirements" },
    { step: 2, title: "Planning", desc: "Choosing the right approach and stack" },
    { step: 3, title: "Design", desc: "UI planning and feedback iteration" },
    { step: 4, title: "Development", desc: "Building with regular updates" },
    { step: 5, title: "Testing", desc: "Cross-device & browser testing" },
    { step: 6, title: "Delivery", desc: "Deployment and final handover" },
  ];

  return (
    <section id="services" className="py-24 px-6 ">
      <div className="max-w-7xl mx-auto space-y-20">

        {/* HEADER */}
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
            Services
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Practical, focused services tailored for real-world projects
          </p>
        </div>

        {/* SERVICES */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <div
              key={service.name}
              onClick={() => setSelectedService(service)}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm hover:border-pink-500/30 transition-all cursor-pointer"
            >
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.gradient} text-white mb-6`}>
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                {service.name}
              </h3>
              <p className="text-gray-400 mb-6">{service.desc}</p>
              <button className="inline-flex items-center gap-2 text-pink-400 font-semibold">
                Learn More <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* PROCESS */}
        <div>
          <h3 className="text-3xl font-bold text-white text-center mb-10">
            My Process
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {process.map((p) => (
              <div key={p.step} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-pink-400 font-bold mb-2">Step {p.step}</div>
                <h4 className="text-white font-semibold mb-1">{p.title}</h4>
                <p className="text-gray-400 text-sm">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedService(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-3xl w-full bg-gray-900 rounded-3xl p-8 border border-white/10"
          >
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 text-gray-400"
            >
              <X />
            </button>

            <h3 className="text-3xl font-bold text-white mb-4">
              {selectedService.name}
            </h3>
            <p className="text-gray-300 mb-6">
              {selectedService.fullDesc}
            </p>

            <h4 className="text-lg font-semibold text-white mb-3">
              What’s Included
            </h4>
            <ul className="space-y-2 mb-6">
              {selectedService.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-300">
                  <Check className="w-4 h-4 text-green-400" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              Timeline:{" "}
              <span className="text-white font-semibold">
                {selectedService.timeline}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
