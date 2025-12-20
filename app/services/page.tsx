"use client";

import React, { useState } from "react";
import {
  Code2,
  Palette,
  Zap,
  Rocket,
  Check,
  ArrowRight,
  Clock,
  X,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

type Service = {
  name: string;
  desc: string;
  icon: React.ReactNode;
  gradient: string;
  features: string[];
  timeline: string;
};

export default function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services: Service[] = [
    {
      name: "Frontend Development",
      desc: "Modern, responsive web interfaces with React & Next.js",
      icon: <Code2 className="w-7 h-7" />,
      gradient: "from-blue-500 to-cyan-400",
      features: [
        "React & Next.js development",
        "Responsive mobile-first UI",
        "Component architecture",
        "API integration",
        "SEO optimization",
      ],
      timeline: "2–4 weeks",
    },
    {
      name: "Web Applications",
      desc: "Complete solutions for startups and businesses",
      icon: <Rocket className="w-7 h-7" />,
      gradient: "from-purple-500 to-pink-400",
      features: [
        "Frontend + backend",
        "Authentication system",
        "Database integration",
        "Admin dashboard",
        "Deployment setup",
      ],
      timeline: "4–8 weeks",
    },
    {
      name: "UI/UX Redesign",
      desc: "Improve design and user experience",
      icon: <Palette className="w-7 h-7" />,
      gradient: "from-pink-500 to-rose-400",
      features: [
        "UI cleanup & redesign",
        "Responsive fixes",
        "Animation enhancements",
        "Accessibility improvements",
        "Style guide creation",
      ],
      timeline: "1–3 weeks",
    },
    {
      name: "Performance Boost",
      desc: "Make your website faster and smoother",
      icon: <Zap className="w-7 h-7" />,
      gradient: "from-yellow-500 to-orange-400",
      features: [
        "Performance audit",
        "Code optimization",
        "Image optimization",
        "Lighthouse improvements",
        "Bundle size reduction",
      ],
      timeline: "1–2 weeks",
    },
  ];

  return (
    <section id="services" className="relative py-20 px-4 sm:px-6 ">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <SectionHeading
            title="What I"
            highlight="Offer"
            subtitle="Services tailored to your needs"
            titleSize="md"
            highlightColor="gradient-pink"
          />
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <div
              key={service.name}
              onClick={() => setSelectedService(service)}
              className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-pink-500/30 transition-all cursor-pointer hover:scale-105"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.gradient} text-white mb-4 group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                {service.name}
              </h3>
              <p className="text-gray-400 text-sm mb-4">{service.desc}</p>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-pink-400 font-semibold">Learn more</span>
                <ArrowRight className="w-4 h-4 text-pink-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedService(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full bg-gray-900 rounded-2xl p-6 border border-white/10"
          >
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>

            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${selectedService.gradient} text-white mb-4`}>
              {selectedService.icon}
            </div>

            <h3 className="text-2xl font-bold text-white mb-3">
              {selectedService.name}
            </h3>
            <p className="text-gray-400 mb-6">{selectedService.desc}</p>

            <h4 className="text-sm font-semibold text-white mb-3 uppercase tracking-wide">
              What&apos;s Included
            </h4>
            <ul className="space-y-2 mb-6">
              {selectedService.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                  <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10 mb-6">
              <Clock className="w-4 h-4 text-pink-400" />
              <span className="text-sm text-gray-400">Timeline:</span>
              <span className="text-sm font-semibold text-white">{selectedService.timeline}</span>
            </div>

            <a
              href="#contact"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold hover:shadow-lg hover:shadow-pink-500/30 transition-all"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </section>
  );
}