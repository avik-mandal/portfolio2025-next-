// src/app/resume/page.tsx
"use client";

import Link from "next/link";
import { ArrowDownToLine, Eye, FileText, CheckCircle } from "lucide-react";

export default function ResumePage() {
  return (
    <main className="min-h-screen pt-24 pb-24 text-white">
      <section className="max-w-4xl mx-auto px-6">
        {/* ---------------- Header ---------------- */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-cyan-500/10 border border-cyan-500/20 backdrop-blur-sm">
            <FileText className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-cyan-300">
              Resume
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            My <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Resume</span>
          </h1>

          <p className="text-white/70 max-w-xl mx-auto">
            Download my resume as a PDF or view a clean, web-friendly version
            designed for recruiters and ATS systems.
          </p>
        </div>

        {/* ---------------- Actions ---------------- */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <a
            href="/resume.pdf"
            download
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl
              bg-gradient-to-r from-cyan-500 to-blue-500
              text-white font-semibold shadow-lg
              hover:shadow-cyan-500/40 hover:scale-105 transition-all"
          >
            Download PDF
            <ArrowDownToLine className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
          </a>

          <Link
            href="/resume/view"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl
              border border-white/20 bg-white/5 backdrop-blur-sm
              text-white/90 font-semibold
              hover:border-cyan-500/50 hover:bg-white/10 transition-all"
          >
            View Online
            <Eye className="w-5 h-5" />
          </Link>
        </div>

        {/* ---------------- Highlights ---------------- */}
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-sm p-8">
          <h2 className="text-xl font-semibold mb-4">
            Quick Highlights
          </h2>

          <ul className="space-y-3 text-white/80">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5" />
              Frontend Developer specializing in <strong>React, Next.js & TypeScript</strong>
            </li>

            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5" />
              Strong focus on <strong>UI/UX, animations, and accessibility</strong>
            </li>

            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5" />
              Experience building <strong>responsive, high-performance web apps</strong>
            </li>

            <li className="flex items-start gap-2">
              <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5" />
              Comfortable with <strong>SEO, Lighthouse optimization & modern tooling</strong>
            </li>
          </ul>
        </div>

        {/* ---------------- ATS Note ---------------- */}
        <div className="mt-10 text-center text-sm text-white/50">
          Tip: The PDF version is optimized for ATS systems and recruiter parsing.
        </div>
      </section>
    </main>
  );
}
