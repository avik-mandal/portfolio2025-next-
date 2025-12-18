'use client';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Menu, X, Sparkles, Send } from "lucide-react";

/* =========================
   CONSTANTS
========================= */

const MENU = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

/* =========================
   TYPES
========================= */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  orbitRadius: number;
  angle: number;
  color: string;
}

/* =========================
   COMPONENT
========================= */

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [progress, setProgress] = useState(0);

  const headerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const navRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const sections = useMemo(() => MENU.map(m => m.href.slice(1)), []);

  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  /* =========================
     SCROLL + ACTIVE SECTION
  ========================= */

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const found = sections.find(id => {
        const el = document.getElementById(id);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top <= 120 && r.bottom >= 120;
      });

      if (found) setActive(found);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  /* =========================
     SECTION PROGRESS BAR
  ========================= */

  useEffect(() => {
    const updateProgress = () => {
      const section = document.getElementById(active);
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      const visible = Math.min(vh, Math.max(0, vh - rect.top));
      const percent = Math.min(100, Math.max(0, (visible / rect.height) * 100));
      setProgress(percent);
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, [active]);

  /* =========================
     PARTICLE CANVAS (OPTIMIZED)
  ========================= */

  useEffect(() => {
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;

    const init = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      const colors = ["#3bf3ff", "#6dd5ed", "#957fef"];
      particlesRef.current = Array.from({ length: 50 }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.6 + 0.3,
        orbitRadius: Math.random() * 30 + 10,
        angle: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of particlesRef.current) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.y < 0) p.y = h;
        if (p.x > w) p.x = 0;
        if (p.y > h) p.y = 0;

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(frame);
    };

    init();
    rafRef.current = requestAnimationFrame(frame);

    const onVisibility = () => {
      if (document.hidden && rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      } else {
        rafRef.current = requestAnimationFrame(frame);
      }
    };

    window.addEventListener("resize", init);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", init);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [prefersReducedMotion]);

  /* =========================
     HANDLERS
  ========================= */

  const scrollTo = useCallback((href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  }, []);

  /* =========================
     RENDER
  ========================= */

  return (
    <header
      ref={headerRef}
      className="fixed top-3 left-3 right-3 z-[999]"
      style={{ willChange: "transform" }}
    >
      {/* SECTION PROGRESS BAR */}
      <div className="absolute top-0 left-0 right-0 h-[2px] overflow-hidden rounded-t-2xl">
        <div
          className="h-full transition-[width] duration-200"
          style={{
            width: `${progress}%`,
            background:
              "linear-gradient(90deg, rgba(59,243,255,0.9), rgba(111,118,255,0.9))",
            boxShadow: "0 0 12px rgba(59,243,255,0.6)",
          }}
        />
      </div>

      <div
        className="relative rounded-2xl border px-4 py-3 flex items-center justify-between"
        style={{
          background: scrolled
            ? "rgba(10,14,20,0.96)"
            : "rgba(10,14,20,0.85)",
          backdropFilter: "blur(14px)",
          borderColor: "rgba(255,255,255,0.08)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        {/* CANVAS */}
        <canvas
          ref={canvasRef}
          aria-hidden
          role="presentation"
          className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl"
        />

        {/* LOGO */}
        <button
          onClick={() => scrollTo("#home")}
          className="font-black text-white text-lg tracking-tight"
        >
          Avik Mandal
        </button>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-2">
          {MENU.map(item => {
            const id = item.href.slice(1);
            const isActive = active === id;
            return (
              <button
                key={id}
                ref={el => {
                  navRefs.current[id] = el;
                }}
                onClick={() => scrollTo(item.href)}
                aria-current={isActive ? "page" : undefined}
                className="px-4 py-2 rounded-full text-sm font-semibold transition"
                style={{
                  color: isActive ? "#3bf3ff" : "#e5e7eb",
                  background: isActive
                    ? "rgba(59,243,255,0.15)"
                    : "transparent",
                }}
              >
                {item.name}
                {isActive && <Sparkles size={12} className="inline ml-1" />}
              </button>
            );
          })}
        </nav>

        {/* CTA + MOBILE */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scrollTo("#contact")}
            className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold"
            style={{
              color: "#3bf3ff",
              border: "1px solid rgba(59,243,255,0.4)",
            }}
          >
            Let’s Talk <Send size={14} />
          </button>

          <button
            onClick={() => setOpen(s => !s)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-xl"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="mt-2 rounded-2xl overflow-hidden bg-black/95 border border-white/10 md:hidden">
          {MENU.map(item => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="block w-full text-left px-4 py-3 text-sm text-white"
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
