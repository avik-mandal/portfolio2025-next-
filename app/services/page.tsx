'use client'
import React, { useState } from "react";
import { Code2, Palette, Zap, Rocket, Check, ArrowRight, Star, TrendingUp, Users, Clock, DollarSign, Award, X } from "lucide-react";

type Service = {
  name: string;
  desc: string;
  fullDesc: string;
  icon: React.ReactNode;
  gradient: string;
  features: string[];
  deliverables: string[];
  timeline: string;
  pricing: string;
  idealFor: string[];
};

export default function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services: Service[] = [
    {
      name: "Frontend Development",
      desc: "Pixel-perfect, responsive interfaces built with modern frameworks",
      fullDesc: "Transform your designs into lightning-fast, responsive web applications. I specialize in React and Next.js, creating interfaces that not only look beautiful but perform exceptionally across all devices.",
      icon: <Code2 className="w-8 h-8" />,
      gradient: "from-blue-500 to-cyan-400",
      features: [
        "React & Next.js development",
        "TypeScript implementation",
        "Responsive design (mobile-first)",
        "Performance optimization",
        "SEO-friendly architecture",
        "Component library creation",
        "State management (Redux, Zustand)",
        "API integration"
      ],
      deliverables: [
        "Clean, maintainable code",
        "Cross-browser compatibility",
        "Performance audit report",
        "Deployment & hosting setup",
        "Documentation",
        "2 weeks post-launch support"
      ],
      timeline: "2-6 weeks",
      pricing: "Starting at $2,500",
      idealFor: ["Startups", "SaaS products", "E-commerce sites", "Corporate websites"]
    },
    {
      name: "Full-Stack Solutions",
      desc: "End-to-end development from database to deployment",
      fullDesc: "Complete web applications built from the ground up. I handle everything from database design to frontend polish, delivering scalable solutions that grow with your business.",
      icon: <Rocket className="w-8 h-8" />,
      gradient: "from-purple-500 to-pink-400",
      features: [
        "Full application architecture",
        "Database design & optimization",
        "RESTful & GraphQL APIs",
        "Authentication & authorization",
        "Payment integration (Stripe, PayPal)",
        "Real-time features (WebSocket)",
        "Cloud deployment (AWS, Vercel)",
        "CI/CD pipeline setup"
      ],
      deliverables: [
        "Production-ready application",
        "Admin dashboard",
        "API documentation",
        "Database backup strategy",
        "Monitoring & analytics setup",
        "1 month support & maintenance"
      ],
      timeline: "6-12 weeks",
      pricing: "Starting at $8,000",
      idealFor: ["Tech startups", "MVPs", "Enterprise tools", "Mobile app backends"]
    },
    {
      name: "UI/UX Design & Development",
      desc: "Beautiful, user-centered interfaces that drive conversions",
      fullDesc: "Design and development combined for seamless execution. I create interfaces that users love, backed by data-driven decisions and conversion optimization strategies.",
      icon: <Palette className="w-8 h-8" />,
      gradient: "from-pink-500 to-rose-400",
      features: [
        "User research & personas",
        "Wireframing & prototyping",
        "Visual design (Figma)",
        "Design system creation",
        "Micro-interactions & animations",
        "Accessibility (WCAG 2.1)",
        "A/B testing setup",
        "Conversion optimization"
      ],
      deliverables: [
        "High-fidelity mockups",
        "Interactive prototypes",
        "Design system documentation",
        "Production-ready code",
        "Usability testing report",
        "Ongoing design support"
      ],
      timeline: "3-8 weeks",
      pricing: "Starting at $3,500",
      idealFor: ["Product launches", "Rebrands", "Landing pages", "Mobile apps"]
    },
    {
      name: "Performance Optimization",
      desc: "Speed up your website with proven optimization techniques",
      fullDesc: "Is your website slow? I'll analyze, identify bottlenecks, and implement optimizations that can improve load times by 50-80%. Better performance means better SEO, user experience, and conversions.",
      icon: <Zap className="w-8 h-8" />,
      gradient: "from-yellow-500 to-orange-400",
      features: [
        "Lighthouse audit & analysis",
        "Code splitting & lazy loading",
        "Image optimization",
        "CDN setup & configuration",
        "Caching strategies",
        "Bundle size reduction",
        "Critical CSS extraction",
        "Database query optimization"
      ],
      deliverables: [
        "Performance audit report",
        "Optimization implementation",
        "Before/after metrics",
        "Best practices guide",
        "Monitoring setup",
        "Quarterly check-ins"
      ],
      timeline: "1-3 weeks",
      pricing: "Starting at $1,500",
      idealFor: ["Existing websites", "E-commerce stores", "News sites", "High-traffic apps"]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Founder, TechStart",
      image: "SC",
      text: "Avik transformed our vision into a stunning, fast website. The attention to detail and performance optimization was outstanding!",
      rating: 5,
      project: "SaaS Dashboard"
    },
    {
      name: "Michael Rodriguez",
      role: "CTO, FinanceFlow",
      image: "MR",
      text: "Best developer we've worked with. Delivered on time, excellent communication, and the code quality is top-notch.",
      rating: 5,
      project: "Full-Stack Platform"
    },
    {
      name: "Emily Watson",
      role: "Marketing Director",
      image: "EW",
      text: "Our conversion rate increased by 40% after the redesign. Avik's understanding of both design and development is rare.",
      rating: 5,
      project: "E-commerce Redesign"
    }
  ];

  const process = [
    { step: 1, title: "Discovery", desc: "We discuss your goals, requirements, and vision for the project" },
    { step: 2, title: "Planning", desc: "I create a detailed roadmap with milestones and deliverables" },
    { step: 3, title: "Design", desc: "Mockups and prototypes for your review and feedback" },
    { step: 4, title: "Development", desc: "Building your project with regular updates and check-ins" },
    { step: 5, title: "Testing", desc: "Thorough QA across devices, browsers, and performance" },
    { step: 6, title: "Launch", desc: "Deployment, training, and post-launch support" }
  ];

  const stats = [
    { icon: <Users className="w-6 h-6" />, value: "50+", label: "Happy Clients" },
    { icon: <Award className="w-6 h-6" />, value: "15+", label: "Awards Won" },
    { icon: <Clock className="w-6 h-6" />, value: "98%", label: "On-Time Delivery" },
    { icon: <Star className="w-6 h-6" />, value: "5.0", label: "Average Rating" }
  ];

  return (
    <section id="services" className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-4">
            <Rocket className="w-4 h-4 text-pink-400" />
            <span className="text-sm text-pink-400 font-medium">What I Offer</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-4 text-white">
            Services &{" "}
            <span className="bg-gradient-to-r from-pink-400 via-rose-400 to-orange-400 bg-clip-text text-transparent animate-gradient">
              Solutions
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Tailored services to bring your digital vision to life
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <div key={i} className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 backdrop-blur-sm text-center group hover:scale-105 transition-all">
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${services[i]?.gradient} bg-opacity-10 mb-3 text-white`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {services.map((service, i) => (
            <div key={service.name} className="group relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 backdrop-blur-sm hover:border-pink-500/30 transition-all animate-fadeUp cursor-pointer" style={{ animationDelay: `${i * 0.1}s` }} onClick={() => setSelectedService(service)}>
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity`} />
              
              <div className="relative">
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.gradient} mb-6 text-white shadow-lg`}>
                  {service.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}>
                  {service.name}
                </h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{service.desc}</p>

                {/* Key Features */}
                <div className="space-y-2 mb-6">
                  {service.features.slice(0, 4).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                  {service.features.length > 4 && (
                    <div className="text-sm text-cyan-400 font-medium">
                      +{service.features.length - 4} more features
                    </div>
                  )}
                </div>

                {/* Pricing & Timeline */}
                <div className="flex items-center justify-between mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Starting at</div>
                    <div className="text-lg font-bold text-white">{service.pricing}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400 mb-1">Timeline</div>
                    <div className="text-sm font-semibold text-cyan-400">{service.timeline}</div>
                  </div>
                </div>

                {/* CTA */}
                <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold hover:shadow-lg hover:shadow-pink-500/30 transition-all group-hover:scale-105">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
              My <span className="text-pink-400">Process</span>
            </h3>
            <p className="text-gray-400">How I bring your project to life</p>
          </div>

          <div className="relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-500 via-rose-500 to-orange-500 rounded-full hidden md:block" />
            
            <div className="space-y-8">
              {process.map((item, i) => (
                <div key={item.step} className={`flex items-center gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`flex-1 p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 backdrop-blur-sm ${i % 2 === 0 ? "md:text-right" : ""}`}>
                    <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>

                  <div className="relative flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
                    {item.step}
                  </div>

                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
              What Clients <span className="text-pink-400">Say</span>
            </h3>
            <p className="text-gray-400">Real feedback from real projects</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <div key={i} className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/2 border border-white/10 backdrop-blur-sm hover:border-pink-500/30 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-xs text-gray-400">{testimonial.role}</div>
                  </div>
                </div>

                <div className="flex gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-3">"{testimonial.text}"</p>

                <div className="text-xs text-cyan-400 font-medium">
                  Project: {testimonial.project}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 p-12 rounded-3xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-500/30 backdrop-blur-sm text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h3>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Let's discuss your ideas and create something amazing together
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#contact" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-lg hover:shadow-lg hover:shadow-pink-500/50 transition-all hover:scale-105">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </a>
            <a href="#projects" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-white/20 text-white font-bold text-lg hover:bg-white/5 transition-all">
              View Portfolio
            </a>
          </div>
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedService(null)}>
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-white/10 p-8" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelectedService(null)} className="absolute top-6 right-6 p-2 rounded-xl hover:bg-white/10 transition-colors">
              <X className="w-6 h-6 text-gray-400" />
            </button>

            <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${selectedService.gradient} mb-6 text-white`}>
              {selectedService.icon}
            </div>

            <h3 className="text-3xl font-bold text-white mb-4">{selectedService.name}</h3>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">{selectedService.fullDesc}</p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">What's Included</h4>
                <ul className="space-y-3">
                  {selectedService.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-300">
                      <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Deliverables</h4>
                <ul className="space-y-3">
                  {selectedService.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-300">
                      <Award className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <DollarSign className="w-6 h-6 text-green-400 mb-2" />
                <div className="text-xs text-gray-400 mb-1">Investment</div>
                <div className="font-bold text-white">{selectedService.pricing}</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <Clock className="w-6 h-6 text-blue-400 mb-2" />
                <div className="text-xs text-gray-400 mb-1">Timeline</div>
                <div className="font-bold text-white">{selectedService.timeline}</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <TrendingUp className="w-6 h-6 text-purple-400 mb-2" />
                <div className="text-xs text-gray-400 mb-1">Ideal For</div>
                <div className="font-bold text-white text-sm">{selectedService.idealFor[0]}</div>
              </div>
            </div>

            <a href="#contact" className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold hover:shadow-lg hover:shadow-pink-500/30 transition-all">
              Get a Quote
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      )}

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
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-fadeUp { animation: fadeUp 0.6s ease-out forwards; }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}