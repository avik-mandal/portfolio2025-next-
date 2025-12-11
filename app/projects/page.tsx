// components/Projects.tsx
'use client';
import React, { useEffect, useRef, useState } from "react";
import { ExternalLink, Star, X, ArrowLeft, ArrowRight } from "lucide-react";

type Project = {
  id: number;
  title: string;
  desc: string;
  tags: string[];
  gradient: string;
  demo?: string;
  repo?: string;
  screenshots?: string[];
  stack?: string[];
};

const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    desc: "Full-stack shopping experience with cart, checkout, and admin dashboard",
    tags: ["Next.js", "TypeScript", "Stripe"],
    gradient: "from-violet-600 to-indigo-600",
    demo: "https://source.unsplash.com/1600x900/?ecommerce,store",
    repo: "https://github.com/your-user/ecommerce",
    screenshots: [
      "https://source.unsplash.com/1600x900/?ecommerce,product",
      "https://source.unsplash.com/1600x900/?shopping,cart",
    ],
    stack: ["Next.js", "TypeScript", "TailwindCSS", "Stripe"],
  },
  {
    id: 2,
    title: "Expense Tracker Pro",
    desc: "Real-time expense tracking with charts, exports, and budget planning",
    tags: ["React", "Node.js", "MongoDB"],
    gradient: "from-pink-600 to-rose-600",
    demo: "https://source.unsplash.com/1600x900/?finance,expense,charts",
    repo: "https://github.com/your-user/expense-tracker",
    screenshots: [
      "https://source.unsplash.com/1600x900/?finance,charts",
      "https://source.unsplash.com/1600x900/?dashboard,analytics",
    ],
    stack: ["React", "Node.js", "MongoDB", "Chart.js"],
  },
  {
    id: 3,
    title: "Social Media Dashboard",
    desc: "Analytics dashboard with real-time metrics and engagement tracking",
    tags: ["Next.js", "GraphQL", "Tailwind"],
    gradient: "from-cyan-600 to-blue-600",
    demo: "https://source.unsplash.com/1600x900/?analytics,dashboard,metrics",
    repo: "https://github.com/your-user/social-dashboard",
    screenshots: [
      "https://source.unsplash.com/1600x900/?analytics,dashboard",
      "https://source.unsplash.com/1600x900/?social,media,analytics",
    ],
    stack: ["Next.js", "GraphQL", "TailwindCSS", "Socket.IO"],
  },
  {
    id: 4,
    title: "Portfolio Builder",
    desc: "Drag-and-drop portfolio creator with templates and hosting",
    tags: ["React", "Firebase", "Framer"],
    gradient: "from-emerald-600 to-teal-600",
    demo: "https://source.unsplash.com/1600x900/?portfolio,design,website",
    repo: "https://github.com/your-user/portfolio-builder",
    screenshots: [
      "https://source.unsplash.com/1600x900/?design,portfolio",
      "https://source.unsplash.com/1600x900/?website,templates",
    ],
    stack: ["React", "Firebase", "Framer Motion", "Cloud Storage"],
  },
];

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null);
  const [sIndex, setSIndex] = useState(0);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [tab, setTab] = useState<"preview" | "screenshots">("preview");
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [enterAnimate, setEnterAnimate] = useState(false);
  const lastActiveRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  // open modal
  const openModal = (p: Project, fromEl?: HTMLElement | null) => {
    lastActiveRef.current = fromEl ?? null;
    setSIndex(0);
    setIframeLoaded(false);
    setTab("preview");
    setActive(p);
    // start enter animation on next tick
    requestAnimationFrame(() => setEnterAnimate(true));
    // lock body scroll
    document.documentElement.classList.add("overflow-hidden");
  };

  // close modal
  const closeModal = () => {
    // reverse animation quickly
    setEnterAnimate(false);
    // small timeout to allow exit transition
    setTimeout(() => {
      setActive(null);
      setSIndex(0);
      setIframeLoaded(false);
      setTab("preview");
      setGalleryOpen(false);
      if (lastActiveRef.current) lastActiveRef.current.focus();
    }, 220);
    document.documentElement.classList.remove("overflow-hidden");
  };

  // keyboard handlers (escape, arrows)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!active) return;
      if (e.key === "Escape") {
        if (galleryOpen) setGalleryOpen(false);
        else closeModal();
      }
      if (e.key === "ArrowRight") {
        if (galleryOpen) setGalleryIndex((i) => i + 1);
        else setSIndex((i) => Math.min(i + 1, (active.screenshots?.length ?? 1) - 1));
      }
      if (e.key === "ArrowLeft") {
        if (galleryOpen) setGalleryIndex((i) => i - 1);
        else setSIndex((i) => Math.max(i - 1, 0));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, galleryOpen]);

  // focus trap (simple)
  useEffect(() => {
    if (!active || !modalRef.current) return;
    const focusable = modalRef.current.querySelectorAll<HTMLElement>(
      'a[href], button, textarea, input, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (document.activeElement === last && !e.shiftKey) {
        e.preventDefault();
        first.focus();
      } else if (document.activeElement === first && e.shiftKey) {
        e.preventDefault();
        last.focus();
      }
    };
    first.focus();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [active]);

  // gallery loop bounds
  useEffect(() => {
    if (!active || !galleryOpen) return;
    const len = active.screenshots?.length ?? 1;
    if (galleryIndex < 0) setGalleryIndex(len - 1);
    if (galleryIndex >= len) setGalleryIndex(0);
  }, [galleryIndex, galleryOpen, active]);

  // touch handlers for gallery swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.touches[0].clientX - touchStartX.current;
    if (dx > 60) {
      setGalleryIndex((i) => i - 1);
      touchStartX.current = null;
    } else if (dx < -60) {
      setGalleryIndex((i) => i + 1);
      touchStartX.current = null;
    }
  };

  return (
    <section id="projects" className="relative py-28 px-6 ">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Featured{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-gray-400 text-base">Some of my recent work — click to explore</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((p, idx) => (
            <article
              key={p.id}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === "Enter") openModal(p, e.currentTarget as HTMLElement);
              }}
              onDoubleClick={(e) => openModal(p, e.currentTarget as HTMLElement)}
              className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/2 p-6 backdrop-blur-md transition-transform transform
                hover:-translate-y-2 hover:scale-[1.01] hover:shadow-2xl hover:shadow-cyan-700/10
                focus:outline-none focus:ring-4 focus:ring-cyan-500/30"
              aria-labelledby={`proj-${p.id}-title`}
            >
              <div
                aria-hidden
                className={`absolute inset-0 -z-10 bg-gradient-to-br ${p.gradient} opacity-0 group-hover:opacity-10 group-focus:opacity-12 transition-opacity duration-300 motion-reduce:transition-none`}
              />

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-white/5">
                    <Star className="w-5 h-5 text-cyan-300" aria-hidden />
                  </div>
                  <div className="text-sm text-gray-300">Featured</div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(p, e.currentTarget as HTMLElement);
                    }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/6 text-sm text-gray-200 hover:bg-white/6 transition"
                    aria-label={`Open ${p.title} preview`}
                  >
                    <span>View</span>
                    <ExternalLink className="w-4 h-4 text-gray-200" />
                  </button>

                  <a
                    href={p.repo ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/6 text-sm text-gray-200 hover:bg-white/6 transition"
                    aria-label={`Open repository for ${p.title}`}
                  >
                    <span>Source</span>
                  </a>
                </div>
              </div>

              <h3
                id={`proj-${p.id}-title`}
                className="text-xl md:text-2xl font-semibold text-white mb-2 transition-colors group-hover:text-cyan-300"
              >
                {p.title}
              </h3>

              <p className="text-gray-300 mb-4 leading-relaxed">{p.desc}</p>

              <div className="flex flex-wrap items-center gap-3">
                {p.tags.map((t) => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full bg-white/4 border border-white/6 text-gray-200">
                    {t}
                  </span>
                ))}
              </div>

              <div className="absolute right-4 bottom-4 text-xs text-gray-500">
                <span className="hidden md:inline">{`Project ${idx + 1} of ${projects.length}`}</span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} preview`}
          className="fixed inset-0 z-40 flex items-end sm:items-center justify-center p-0 sm:p-6"
          onMouseDown={(e) => {
            // click on overlay (outside modal) closes modal
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          {/* overlay */}
          <div className={`absolute inset-0 bg-black/65 backdrop-blur-sm transition-opacity ${enterAnimate ? "opacity-100" : "opacity-0"}`} />

          {/* container */}
          <div
            ref={modalRef}
            // mobile bottom-sheet (anchored bottom) and centered modal on sm+
            className={`relative z-10 w-full sm:mx-auto sm:max-w-5xl bg-black
              shadow-2xl border border-white/6
              ${enterAnimate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
              transition-all duration-220 ease-out
              rounded-t-2xl sm:rounded-2xl
              max-h-[90vh] sm:max-h-[85vh] overflow-y-auto
            `}
            // stop propagation so overlay click won't close when interacting inside
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* STICKY HEADER INSIDE MODAL */}
            <div className="sticky top-0 z-20 bg-black/60 backdrop-blur-sm border-b border-white/6 px-4 py-3 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-white">{active.title}</h3>
                <p className="text-sm text-gray-300">{active.desc}</p>
              </div>

              <div className="flex items-center gap-2">
                {/* Tabs sticky in header */}
                <div className="inline-flex rounded-md bg-white/3 p-1">
                  <button
                    onClick={() => { setTab("preview"); setIframeLoaded(false); }}
                    className={`px-3 py-1.5 text-sm rounded-md ${tab === "preview" ? "bg-white/6 text-white" : "text-gray-300"}`}
                    aria-pressed={tab === "preview"}
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => setTab("screenshots")}
                    className={`px-3 py-1.5 text-sm rounded-md ${tab === "screenshots" ? "bg-white/6 text-white" : "text-gray-300"}`}
                    aria-pressed={tab === "screenshots"}
                  >
                    Screenshots
                  </button>
                </div>

                {active.demo && (
                  <a href={active.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/6 text-sm text-gray-200 hover:bg-white/6 transition">
                    Open live <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                {active.repo && (
                  <a href={active.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/6 text-sm text-gray-200 hover:bg-white/6 transition">
                    View repo
                  </a>
                )}

                <button onClick={closeModal} className="p-2 rounded-md hover:bg-white/5 transition" aria-label="Close preview">
                  <X className="w-5 h-5 text-gray-200" />
                </button>
              </div>
            </div>

            {/* BODY */}
            <div className="grid md:grid-cols-3 gap-4 p-4">
              <div className="md:col-span-2 flex flex-col gap-3">
                {/* Preview tab: lazy iframe */}
                {tab === "preview" && (
                  <div className="w-full h-[420px] bg-black/40 rounded-md overflow-hidden border border-white/6 flex items-center justify-center">
                    {!iframeLoaded ? (
                      <div className="flex flex-col items-center gap-3">
                        <p className="text-gray-300">{active.demo ? "Preview is lazy-loaded." : "No live demo available."}</p>
                        {active.demo ? (
                          <div className="flex gap-2">
                            <button
                              onClick={() => setIframeLoaded(true)}
                              className="px-4 py-2 rounded-md bg-cyan-500 text-black"
                            >
                              Load live preview
                            </button>
                            <a href={active.demo} target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-md border border-white/6 text-gray-200">
                              Open in new tab
                            </a>
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <iframe
                        title={`${active.title} live demo`}
                        src={active.demo}
                        className="w-full h-full"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                      />
                    )}
                  </div>
                )}

                {/* Screenshots tab */}
                {tab === "screenshots" && (
                  <div className="w-full flex flex-col gap-3">
                    <div className="w-full h-[420px] bg-black/30 rounded-md overflow-hidden border border-white/6 flex items-center justify-center">
                      <img
                        src={active.screenshots?.[sIndex] ?? `https://via.placeholder.com/1600x900?text=${encodeURIComponent(active.title)}`}
                        alt={`${active.title} screenshot ${sIndex + 1}`}
                        className="w-full h-full object-cover"
                        style={{ cursor: "zoom-in" }}
                        onClick={() => { setGalleryOpen(true); setGalleryIndex(sIndex); }}
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <button onClick={() => setSIndex((i) => Math.max(i - 1, 0))} className="p-2 rounded-md bg-white/5 hover:bg-white/6 transition" aria-label="Prev screenshot">
                        <ArrowLeft className="w-4 h-4" />
                      </button>

                      <div className="flex-1 overflow-x-auto hide-scrollbar">
                        <div className="flex gap-2">
                          {(active.screenshots ?? [active.screenshots?.[0]]).map((src, i) => (
                            <button key={i} onClick={() => setSIndex(i)} className={`rounded-md overflow-hidden border ${i === sIndex ? "border-cyan-400" : "border-white/6"}`}>
                              <img src={src} alt={`thumb-${i}`} className="w-48 h-24 object-cover" />
                            </button>
                          ))}
                        </div>
                      </div>

                      <button onClick={() => setSIndex((i) => Math.min(i + 1, (active.screenshots?.length ?? 1) - 1))} className="p-2 rounded-md bg-white/5 hover:bg-white/6 transition" aria-label="Next screenshot">
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* details column */}
              <aside className="md:col-span-1 p-4 rounded-md bg-white/2 border border-white/6">
                <h4 className="text-sm uppercase text-gray-300 tracking-wide mb-2">Tech Stack</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {(active.stack ?? active.tags).map((s) => (
                    <span key={s} className="text-xs px-2 py-1 rounded bg-white/4 text-gray-200">{s}</span>
                  ))}
                </div>

                <h4 className="text-sm uppercase text-gray-300 tracking-wide mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {active.tags.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded bg-white/4 text-gray-200">{t}</span>
                  ))}
                </div>

                <div className="text-sm text-gray-400">
                  <div className="mb-3">
                    <strong className="text-white">Description</strong>
                    <p className="mt-1 text-sm">{active.desc}</p>
                  </div>

                  <div className="mt-3">
                    <button
                      onClick={() => { if (active.demo) window.open(active.demo, "_blank", "noopener,noreferrer"); }}
                      className={`w-full inline-flex justify-center items-center gap-2 px-3 py-2 rounded-md ${active.demo ? "bg-cyan-500 text-black" : "bg-white/5 text-gray-300 cursor-not-allowed"}`}
                      disabled={!active.demo}
                    >
                      Open Live <ExternalLink className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => { if (active.repo) window.open(active.repo, "_blank", "noopener,noreferrer"); }}
                      className="w-full mt-3 inline-flex justify-center items-center gap-2 px-3 py-2 rounded-md border border-white/6 text-gray-200"
                    >
                      View Repo
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen gallery / lightbox */}
      {galleryOpen && active && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onTouchStart={onTouchStart} onTouchMove={onTouchMove}>
          <button className="absolute top-6 right-6 p-2 rounded-md bg-white/5" onClick={() => setGalleryOpen(false)} aria-label="Close gallery">
            <X className="w-5 h-5 text-white" />
          </button>

          <button className="absolute left-6 top-1/2 -translate-y-1/2 p-2 rounded-md bg-white/5" onClick={() => setGalleryIndex((i) => i - 1)} aria-label="Prev">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>

          <div className="max-w-6xl w-full h-full flex items-center justify-center">
            <img
              src={active.screenshots?.[galleryIndex] ?? `https://via.placeholder.com/1600x900?text=${encodeURIComponent(active.title)}`}
              alt={`${active.title} fullscreen ${galleryIndex + 1}`}
              className="max-h-[90vh] object-contain"
              draggable={false}
              onClick={() => setGalleryIndex((i) => (i + 1) % (active.screenshots?.length ?? 1))}
            />
          </div>

          <button className="absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-md bg-white/5" onClick={() => setGalleryIndex((i) => i + 1)} aria-label="Next">
            <ArrowRight className="w-6 h-6 text-white" />
          </button>
        </div>
      )}
    </section>
  );
}
