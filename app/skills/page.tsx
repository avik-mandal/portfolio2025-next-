// src/app/skills/page.tsx
"use client";



const skills = [
  { name: "React", level: "Advanced" },
  { name: "Next.js", level: "Advanced" },
  { name: "TypeScript", level: "Intermediate" },
  { name: "Tailwind CSS", level: "Advanced" },
  { name: "GraphQL / REST", level: "Intermediate" },
  { name: "Node / Express", level: "Intermediate" },
];

export default function SkillsPage() {
  return (
    <>

      <main className="min-h-screen bg-black text-white pt-24">
        <section className="max-w-[1100px] mx-auto px-6 py-20">
          <h2 className="text-3xl font-bold mb-6">Skills</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {skills.map((s) => (
              <div key={s.name} className="p-4 rounded-lg bg-white/5 border border-white/6">
                <h3 className="font-semibold text-lg">{s.name}</h3>
                <p className="text-sm text-white/70 mt-1">{s.level}</p>

                <div className="mt-3 h-2 bg-white/6 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan-400`}
                    style={{ width: s.level === "Advanced" ? "90%" : s.level === "Intermediate" ? "65%" : "35%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

    </>
  );
}
