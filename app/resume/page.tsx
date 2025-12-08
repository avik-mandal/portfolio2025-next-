// src/app/resume/page.tsx
"use client";


import Link from "next/link";

export default function ResumePage() {
  return (
    <>
      
      <main className="min-h-screen bg-black text-white pt-24">
        <section className="max-w-[800px] mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl font-bold mb-4">Resume</h2>
          <p className="text-white/70 mb-6">Download my resume (PDF) or view a web-friendly version below.</p>

          <div className="flex items-center justify-center gap-4">
            <a
              href="/resume.pdf"
              download
              className="px-6 py-3 rounded-md bg-gradient-to-r from-sky-600 to-cyan-400 text-white font-semibold"
            >
              Download PDF
            </a>

            <Link href="/resume/view" className="px-6 py-3 rounded-md border border-white/20 text-white/90">
              View online
            </Link>
          </div>

          <div className="mt-10 text-left bg-white/3 p-6 rounded-lg border border-white/6">
            <h3 className="font-semibold">Quick highlights</h3>
            <ul className="list-disc list-inside mt-3 text-white/75">
              <li>Frontend development — React / Next.js / TypeScript</li>
              <li>UI design & interactions</li>
              <li>Performance & accessibility</li>
            </ul>
          </div>
        </section>
      </main>

    </>
  );
}
