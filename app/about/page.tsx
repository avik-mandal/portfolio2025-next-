"use client";

import { motion } from "framer-motion";
import {
  Mail,
  Briefcase,
  Award,
  Cpu,
  Code2,
  Clock,
  Coffee,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

/* ---------------- Animation ---------------- */
const journeyVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.55, ease: "easeOut" },
  }),
};

export default function AboutPage() {
  const achievements = [
    { icon: Code2, value: "20+", label: "Projects" },
    { icon: Clock, value: "1+ Year", label: "Experience" },
    { icon: Award, value: "NCC A, B & C", label: "Certificates" },
    { icon: Coffee, value: "Daily", label: "Learning" },
  ];

  const journey = [
    { year: "2018", title: "Class 10", desc: "Kharagpur Silver Jubilee High School" },
    { year: "2020", title: "Class 12", desc: "WBCHSE Board" },
    { year: "2021", title: "BCA", desc: "Kharagpur College (Vidyasagar University)" },
    { year: "2022", title: "MCA & NCC", desc: "NCC SUO • A, B & C Certificates" },
    { year: "2023", title: "Internship", desc: "Maity Innovations Pvt. Ltd." },
    { year: "2024", title: "Web Developer", desc: "React & Production Apps" },
    { year: "2025", title: "Present", desc: "Docker, PostgreSQL, Deployment" },
  ];

  const skills = {
    Frontend: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind"],
    Backend: ["Node.js", "PHP", "Laravel"],
    Database: ["MongoDB", "PostgreSQL"],
    DevOps: ["Docker", "Vercel", "Netlify"],
    Tools: ["Git", "Postman", "VS Code", "Figma"],
  };

  return (
    <section className="relative py-24 px-6 ">
      <div className="max-w-7xl mx-auto space-y-20">

        {/* ---------- HEADER ---------- */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white">
            About <span className="text-cyan-400">Me</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Frontend Web Developer • MCA Graduate • NCC Certified
          </p>
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
        <Tabs defaultValue="story" className="w-full">
          <TabsList className="grid grid-cols-3 bg-white/5 rounded-2xl p-1">
            <TabsTrigger value="story">Story</TabsTrigger>
            <TabsTrigger value="journey">Journey</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
          </TabsList>

          {/* STORY */}
          <TabsContent value="story">
            <Card className="bg-white/5 border-white/10 rounded-3xl">
              <CardContent className="p-8 space-y-4 text-gray-300 leading-relaxed">
                <p>
                  I started my academic journey with a BCA, followed by an MCA,
                  building strong fundamentals in computer applications and web development.
                </p>
                <p>
                  Alongside academics, I served in the National Cadet Corps (NCC)
                  as a Senior Under Officer, completing A, B & C certificates.
                  NCC shaped my discipline, leadership, and teamwork mindset.
                </p>
                <p>
                  Professionally, I began as a Web Development Intern and now
                  work as a Web Developer at Maity Innovations Pvt. Ltd.,
                  focusing on React and modern frontend practices.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* JOURNEY */}
          <TabsContent value="journey">
            <div className="space-y-5 mt-6">
              {journey.map((j, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={journeyVariants}
                >
                  <Card className="bg-white/5 border-white/10 rounded-2xl">
                    <CardContent className="p-6 flex gap-6">
                      <Badge className="h-fit text-sm">{j.year}</Badge>
                      <div>
                        <h4 className="text-white font-semibold">{j.title}</h4>
                        <p className="text-gray-400 text-sm">{j.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
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
                        <Badge
                          key={skill}
                          variant="outline"
                          className="border-white/20"
                        >
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
    </section>
  );
}
