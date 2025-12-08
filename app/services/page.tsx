// src/app/services/page.tsx
"use client";



const services = [
  { name: "Frontend Development", desc: "React, Next.js, Tailwind — pixel-perfect UIs." },
  { name: "Performance Optimization", desc: "Improve load times, reduce bundle size." },
  { name: "UI/UX Design", desc: "Design to code, interaction design and prototyping." },
];

export default function ServicesPage() {
  return (
    <>

      <main className="min-h-screen bg-black text-white pt-24">
        <section className="max-w-[1000px] mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold mb-6">Services</h2>

          <div className="grid gap-6 md:grid-cols-3">
            {services.map((s) => (
              <div key={s.name} className="p-6 rounded-xl bg-white/4 border border-white/6">
                <h3 className="font-semibold text-lg">{s.name}</h3>
                <p className="text-white/70 mt-2">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

    </>
  );
}
