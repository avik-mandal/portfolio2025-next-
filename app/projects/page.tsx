// src/app/projects/page.tsx
"use client";


import Link from "next/link";

const projects = [
  { id: 1, title: "Portfolio UI", desc: "Responsive portfolio built with Next.js & Tailwind", href: "/projects/portfolio" },
  { id: 2, title: "Expense Tracker", desc: "Full-stack tracker with charts and exports", href: "/projects/expense-tracker" },
  { id: 3, title: "E-commerce UI", desc: "Shop UI + cart interactions", href: "/projects/shop-ui" },
];

export default function ProjectsPage() {
  return (
    <>

      <main className="min-h-screen bg-black text-white pt-24">
        <section className="max-w-[1200px] mx-auto px-6 py-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Projects</h2>
            <p className="text-white/70">Selected work & demos</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <article key={p.id} className="rounded-xl p-6 bg-white/4 border border-white/6 hover:scale-[1.02] transition">
                <h3 className="font-semibold text-lg">{p.title}</h3>
                <p className="text-white/70 mt-2">{p.desc}</p>

                <div className="mt-4">
                  <Link href={p.href} className="text-sm inline-block px-3 py-2 rounded-md bg-slate-800/60 text-sky-300">
                    View
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

    </>
  );
}
