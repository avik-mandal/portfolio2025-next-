// src/app/about/page.tsx
"use client";


export default function AboutPage() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-b from-black via-[#050617] to-black text-white pt-24">
        <section className="max-w-[1000px] mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold mb-4">About me</h2>
          <p className="text-white/75 leading-relaxed mb-6">
            I'm Avik — a frontend developer focused on building beautiful, usable
            interfaces. I enjoy turning complex UX problems into clean, performant solutions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/3 p-6 rounded-xl border border-white/6">
              <h3 className="font-semibold mb-2">Experience</h3>
              <p className="text-white/70">Frontend development with React, Next.js, Tailwind and a bit of Node/Express.</p>
            </div>

            <div className="bg-white/3 p-6 rounded-xl border border-white/6">
              <h3 className="font-semibold mb-2">Interests</h3>
              <p className="text-white/70">UI/UX, animations, performance, and creating polished web apps.</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
