export default function Projects() {
  const projects = [
    { id: '1', title: 'Expense Tracker', desc: 'Next + Tailwind + TypeScript', url: '#' },
    { id: '2', title: 'Streamer Dashboard', desc: 'Dashboard for streaming analytics', url: '#' },
    { id: '3', title: 'Portfolio Website', desc: 'This site — built with Next.js', url: '#' }
  ];

  return (
    <section id="projects" className="py-12">
      <h2 className="text-2xl font-bold">Projects</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {projects.map(p => (
          <a key={p.id} href={p.url} className="block p-4 border rounded-lg hover:shadow">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{p.desc}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
