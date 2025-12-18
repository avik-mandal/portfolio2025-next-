"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Palette,
  Wrench,
  TrendingUp,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

/* ------------------ Animation ------------------ */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" },
  }),
};

export default function Skills() {
  const skills = {
    Frontend: [
      "HTML",
      "CSS",
      "JavaScript (ES6+)",
      "React",
      "Next.js",
      "Tailwind CSS",
    ],
    Backend: ["Node.js", "PHP", "Laravel"],
    Database: ["MongoDB", "PostgreSQL"],
    UIUX: ["Responsive Design", "UI/UX Basics", "Framer Motion"],
    Tools: ["Git & GitHub", "VS Code", "Postman", "Docker"],
  };

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* HEADER */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white">
            Technical <span className="text-purple-400">Skills</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Technologies I actively use while building real-world web applications
          </p>
        </div>

        {/* SKILL GROUPS */}
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(skills).map(([group, items], i) => (
            <motion.div
              key={group}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-xl rounded-3xl h-full">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    {group === "Frontend" && <Code2 className="text-purple-400" />}
                    {group === "Backend" && <Database className="text-purple-400" />}
                    {group === "UIUX" && <Palette className="text-purple-400" />}
                    {group === "Tools" && <Wrench className="text-purple-400" />}
                    {group === "Database" && <TrendingUp className="text-purple-400" />}

                    <h3 className="text-lg font-semibold text-white">
                      {group === "UIUX" ? "UI / UX" : group}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="border-white/20 text-gray-300 hover:border-purple-400/60 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* LEARNING */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 rounded-3xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-3">
                Currently Learning
              </h3>
              <p className="text-gray-300 mb-4">
                Continuously improving backend scalability and deployment workflows.
              </p>
              <div className="flex flex-wrap gap-3">
                {["Docker", "PostgreSQL Optimization", "System Design"].map(
                  (tech) => (
                    <Badge
                      key={tech}
                      className="bg-white/10 text-white border-white/20"
                    >
                      {tech}
                    </Badge>
                  )
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
