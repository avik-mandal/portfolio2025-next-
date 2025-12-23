"use client";

import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Mail,
  Briefcase,
  Award,
  Code2,
  Clock,
  Coffee,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Tabs,
  
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ---------------- Animations ---------------- */
const journeyVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" },
  }),
};

/* ---------------- Magnetic Photo ---------------- */
function MagneticPhoto({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const strength = 16;

    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      el.style.transform = `translate(${x / strength}px, ${y / strength}px)`;
    };

    const reset = () => {
      el.style.transform = "translate(0,0)";
    };

    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", reset);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className="relative mx-auto w-[260px] md:w-[320px] aspect-[3/4] rounded-3xl"
    >
      {/* Animated liquid border (like header) */}
      <div
        aria-hidden
        className="absolute -inset-3 rounded-3xl blur-2xl opacity-70"
        style={{
          background:
            "linear-gradient(90deg, rgba(59,243,255,.35), rgba(111,118,255,.25), rgba(59,243,255,.35))",
          backgroundSize: "300% 100%",
          animation: "liquidBorder 8s ease infinite",
        }}
      />

      <img
        src={src}
        alt="Avik Mandal"
        className="relative w-full h-full object-cover rounded-3xl border border-white/10 shadow-2xl"
      />
    </motion.div>
  );
}

export default function AboutPage() {
  /* ---------------- Data ---------------- */
  const achievements = [
    { icon: Code2, value: "20+", label: "Projects" },
    { icon: Clock, value: "1+ Year", label: "Experience" },
    { icon: Award, value: "NCC A, B & C", label: "Certificates", ncc: true },
    { icon: Coffee, value: "Daily", label: "Learning" },
  ];

  const journey = [
    {
      year: "2018",
      title: "Class 10",
      story:
        "Completed secondary education at Kharagpur Silver Jubilee High School, building early interest in computers.",
    },
    {
      year: "2020",
      title: "Class 12",
      story:
        "Graduated under WBCHSE board with focus on analytical thinking and academics.",
    },
    {
      year: "2021",
      title: "BCA",
      story:
        "Started Bachelor of Computer Applications at Kharagpur College (Vidyasagar University).",
    },
    {
      year: "2022",
      title: "MCA & NCC",
      story:
        "Pursued MCA while serving as NCC Senior Under Officer (SUO), earning A, B & C certificates.",
      highlight: true,
    },
    {
      year: "2023",
      title: "Internship",
      story:
        "Worked as a Web Development Intern at Maity Innovations Pvt. Ltd.",
    },
    {
      year: "2024",
      title: "Web Developer",
      story:
        "Built production-grade React applications and modern UI systems.",
    },
    {
      year: "2025",
      title: "Present",
      story:
        "Focused on Docker, PostgreSQL, deployments, and scalable architectures.",
    },
  ];

  const skills = {
    Frontend: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind"],
    Backend: ["Node.js", "PHP", "Laravel"],
    Database: ["MongoDB", "PostgreSQL"],
    DevOps: ["Docker", "Vercel", "Netlify"],
    Tools: ["Git", "Postman", "VS Code", "Figma"],
  };

  return (
    <section id="about" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto space-y-20">

        {/* ---------- HEADER ---------- */}
        <div className="mb-12">
          <SectionHeading
            title="About"
            highlight="Me"
            subtitle="Frontend Web Developer • MCA Graduate • NCC Certified"
            headingLevel="h1"
            highlightColor="cyan"
            titleSize="lg"
          />
        </div>

        {/* ---------- PHOTO + STORY ---------- */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <MagneticPhoto src="/images/about-casual.jpg" />

          <div className="space-y-6 text-gray-300">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              Discipline-driven development journey
            </h3>

            <p>
              I’m an MCA graduate and NCC-certified frontend developer with a
              strong foundation in academics, leadership, and real-world
              engineering.
            </p>

            <p>
              NCC training shaped my discipline, responsibility, and teamwork —
              qualities I now apply while building scalable, performance-focused
              web applications.
            </p>

            <div className="flex items-center gap-3">
              {/* NCC GLOW BADGE */}
              <span className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-400/50 bg-cyan-500/10 text-cyan-300 font-semibold">
                NCC SUO • A, B & C
                <span className="absolute inset-0 rounded-full blur-md bg-cyan-400/40 animate-pulse" />
              </span>
            </div>
          </div>
        </div>

        {/* ---------- ACHIEVEMENTS ---------- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {achievements.map((a, i) => {
            const Icon = a.icon;
            return (
              <Card
                key={i}
                className="bg-white/5 border-white/10 backdrop-blur-xl hover:-translate-y-1 transition-all"
              >
                <CardContent className="p-6 text-center space-y-3">
                  <div className="mx-auto w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                    <Icon className="text-cyan-400" size={20} />
                  </div>
                  <div className="text-3xl font-bold text-white">{a.value}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide">
                    {a.label}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* ---------- TABS ---------- */}
        <Tabs defaultValue="journey">
          <TabsList className="grid grid-cols-3 bg-white/5 rounded-2xl p-1">
            <TabsTrigger value="journey">Journey</TabsTrigger>
            <TabsTrigger value="story">Story</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>

          {/* JOURNEY — TIMELINE STORY HYBRID */}
          <TabsContent value="journey">
            <div className="relative mt-8 space-y-6">
              <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />

              {journey.map((j, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={journeyVariants}
                  className="relative pl-16"
                >
                  <div
                    className={`absolute left-[22px] top-6 w-3 h-3 rounded-full ${
                      j.highlight
                        ? "bg-cyan-400 shadow-[0_0_16px_rgba(59,243,255,0.9)]"
                        : "bg-white/40"
                    }`}
                  />

                  <Card className="bg-white/5 border-white/10 rounded-2xl">
                    <CardContent className="p-6 space-y-1">
                      <Badge>{j.year}</Badge>
                      <h4 className="text-white font-semibold">{j.title}</h4>
                      <p className="text-gray-400 text-sm">{j.story}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* STORY */}
          <TabsContent value="story">
            <Card className="bg-white/5 border-white/10 rounded-3xl">
              <CardContent className="p-8 text-gray-300 leading-relaxed space-y-4">
                <p>
                  My journey blends academics, NCC discipline, and real-world
                  development experience.
                </p>
                <p>
                  From BCA to MCA and professional frontend development, I focus
                  on clean UI, performance, and scalable architecture.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SKILLS */}
          <TabsContent value="skills">
            <Card className="bg-white/5 border-white/10 rounded-3xl">
              <CardContent className="p-8 space-y-6">
                {Object.entries(skills).map(([group, list]) => (
                  <div key={group}>
                    <h4 className="text-cyan-400 font-semibold mb-3">
                      {group}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {list.map((skill) => (
                        <Badge key={skill} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* ---------- CTA ---------- */}
        <div className="flex justify-center gap-4">
          <Button size="lg" className="gap-2">
            <Mail size={16} /> Hire Me
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <Briefcase size={16} /> Projects
          </Button>
        </div>
      </div>

      {/* CSS */}
      <style jsx>{`
        @keyframes liquidBorder {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}
