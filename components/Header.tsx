'use client';
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MENU = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  orbitRadius?: number;
  angle?: number;
  color?: string;
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const headerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const navRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const sections = useMemo(() => MENU.map((m) => m.href.slice(1)), []);

  // Scroll spy
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const found = sections.find((id) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const r = el.getBoundingClientRect();
        return r.top <= 140 && r.bottom >= 140;
      });
      if (found) setActive(found);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  const scrollTo = useCallback((href: string) => {
    const el = document.querySelector(href);
    if (el instanceof HTMLElement) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    }
  }, []);

  // Particles canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(320, Math.floor(rect.width));
      height = Math.max(100, Math.floor(rect.height));
      canvas.width = Math.floor(width * devicePixelRatio);
      canvas.height = Math.floor(height * devicePixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    }

    function initParticles() {
      const count = Math.min(70, Math.floor(width * 0.09));
      const particles: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 2.5 + 0.8;
        const x = Math.random() * width;
        const y = Math.random() * height;
        const vx = (Math.random() - 0.5) * 0.25;
        const vy = (Math.random() - 0.5) * 0.25;
        const alpha = 0.3 + Math.random() * 0.65;
        const orbitRadius = 15 + Math.random() * 30;
        const angle = Math.random() * Math.PI * 2;
        const color = Math.random() > 0.6 ? "#3bf3ff" : "#6dd5ed";
        particles.push({ x, y, vx, vy, size, alpha, orbitRadius, angle, color });
      }
      particlesRef.current = particles;
    }

    resize();
    initParticles();

    let last = performance.now();
    function frame(now: number) {
      const dt = Math.min(60, now - last) / 1000;
      last = now;
      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "rgba(6, 22, 30, 0.02)");
      gradient.addColorStop(0.5, "rgba(10, 35, 50, 0.04)");
      gradient.addColorStop(1, "rgba(6, 22, 30, 0.02)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const centerX = width * 0.75;
      const centerY = height * 0.3;

      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];

        if (p.orbitRadius && p.angle !== undefined && i % 3 === 0) {
          p.angle += dt * (0.25 + (i % 7) * 0.018);
          p.x = centerX + Math.cos(p.angle) * p.orbitRadius + (Math.random() - 0.5) * 5;
          p.y = centerY + Math.sin(p.angle) * (p.orbitRadius * 0.5) + (Math.random() - 0.5) * 5;
        } else {
          p.x += p.vx * dt * 50;
          p.y += p.vy * dt * 50;
        }

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90) {
          const force = (90 - dist) / 90 * 0.7;
          p.x += (dx / (dist + 0.001)) * force * 9;
          p.y += (dy / (dist + 0.001)) * force * 9;
        }

        ctx.beginPath();
        ctx.fillStyle = p.color || "#6dd5ed";
        ctx.globalAlpha = Math.max(0.15, Math.min(p.alpha, 0.95));
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Enhanced glow effect
        if (i % 4 === 0) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color || "#6dd5ed";
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Connect nearby particles
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j];
          const dx2 = p.x - p2.x;
          const dy2 = p.y - p2.y;
          const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
          if (dist2 < 100) {
            ctx.beginPath();
            ctx.strokeStyle = p.color || "#6dd5ed";
            ctx.globalAlpha = (1 - dist2 / 100) * 0.15;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(frame);
    }

    rafRef.current = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Track mouse position
  useEffect(() => {
    function onMove(e: MouseEvent) {
      const rect = headerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    }
    function onLeave() {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Magnetic hover
  useEffect(() => {
    let rafId = 0;
    const ease = 0.15;

    function loop() {
      rafId = requestAnimationFrame(loop);
      const rect = headerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      Object.entries(navRefs.current).forEach(([, el]) => {
        if (!el) return;
        const btnRect = el.getBoundingClientRect();
        const cx = btnRect.left + btnRect.width / 2 - rect.left;
        const cy = btnRect.top + btnRect.height / 2 - rect.top;
        const dx = mx - cx;
        const dy = my - cy;
        const dist = Math.hypot(dx, dy);
        const max = 70;
        const strength = Math.max(0, (max - dist) / max);
        const translateX = (dx / (dist + 0.001)) * strength * 10;
        const translateY = (dy / (dist + 0.001)) * strength * 8;

        const targetX = strength > 0.02 ? translateX : 0;
        const targetY = strength > 0.02 ? translateY : 0;

        const prevX = parseFloat(el.dataset.tx || "0") || 0;
        const prevY = parseFloat(el.dataset.ty || "0") || 0;
        const nx = prevX + (targetX - prevX) * ease;
        const ny = prevY + (targetY - prevY) * ease;
        
        const scale = 1 + strength * 0.08;
        el.style.transform = `translate3d(${nx}px, ${ny}px, 0) scale(${scale})`;
        el.dataset.tx = nx.toString();
        el.dataset.ty = ny.toString();
        el.style.zIndex = (Math.round(strength * 10) + 1).toString();
      });
    }

    rafId = requestAnimationFrame(loop);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      Object.values(navRefs.current).forEach((el) => {
        if (el) {
          el.style.transform = "";
          el.style.zIndex = "";
          delete el.dataset.tx;
          delete el.dataset.ty;
        }
      });
    };
  }, []);

  // Reset on leave
  useEffect(() => {
    function onLeave() {
      Object.values(navRefs.current).forEach((el) => {
        if (!el) return;
        el.style.transform = "";
        el.style.transition = "transform 0.3s cubic-bezier(0.2, 0.9, 0.2, 1)";
        delete el.dataset.tx;
        delete el.dataset.ty;
      });
    }
    const hr = headerRef.current;
    hr?.addEventListener("mouseleave", onLeave);
    return () => hr?.removeEventListener("mouseleave", onLeave);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed left-2 right-2 md:left-3 md:right-3 top-2 md:top-3 z-[999]"
      >
        <div ref={headerRef} className="relative rounded-2xl">
          {/* Animated border glow */}
          <div
            className="absolute inset-0 rounded-2xl opacity-80"
            style={{
              background: scrolled
                ? "linear-gradient(90deg, rgba(59, 243, 255, 0.18), rgba(111, 118, 255, 0.1), rgba(59, 200, 255, 0.15))"
                : "linear-gradient(90deg, rgba(100, 200, 255, 0.1), rgba(59, 243, 255, 0.05))",
              backgroundSize: "300% 100%",
              animation: "liquid-flow 8s ease-in-out infinite",
              filter: "blur(20px)",
              padding: "2px",
            }}
          />

          {/* Content container */}
          <div className="relative z-10">
            {/* Particle canvas */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full rounded-2xl pointer-events-none"
              style={{ mixBlendMode: "screen", zIndex: 1 }}
            />

            {/* Main content */}
            <div
              className="relative z-20 flex items-center justify-between gap-2 md:gap-4 px-3 md:px-4 py-2.5 md:py-3 rounded-2xl border transition-all duration-300"
              style={{
                background: scrolled
                  ? "linear-gradient(135deg, rgba(10, 14, 20, 0.96), rgba(15, 20, 28, 0.94))"
                  : "linear-gradient(135deg, rgba(10, 14, 20, 0.88), rgba(15, 20, 28, 0.82))",
                backdropFilter: "blur(14px) saturate(150%)",
                borderColor: scrolled ? "rgba(59, 243, 255, 0.18)" : "rgba(255, 255, 255, 0.06)",
                boxShadow: scrolled
                  ? "0 10px 40px rgba(6, 182, 212, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.06)"
                  : "0 6px 28px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.04)",
              }}
            >
              {/* Logo */}
              <div className="flex items-center gap-2.5 cursor-pointer group" onClick={() => scrollTo("#home")}>
                <div className="relative flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-105"
                  style={{
                    background: "linear-gradient(135deg, rgba(59, 243, 255, 0.15), rgba(111, 118, 255, 0.1))",
                    border: "1px solid rgba(59, 243, 255, 0.2)",
                    boxShadow: "0 4px 16px rgba(59, 243, 255, 0.15)",
                  }}
                >
                  <motion.span
                    className="text-white font-black text-lg md:text-xl"
                    animate={{ 
                      textShadow: [
                        "0 0 10px rgba(59, 243, 255, 0.5)",
                        "0 0 20px rgba(59, 243, 255, 0.8)",
                        "0 0 10px rgba(59, 243, 255, 0.5)",
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    AM
                  </motion.span>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="hidden md:flex flex-col">
                  <motion.div
                    className="text-white font-bold text-base tracking-tight leading-tight"
                    animate={{ opacity: [0.9, 1, 0.9] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    Avik Mandal
                  </motion.div>
                  <div className="text-[10px] font-medium tracking-wide" style={{ color: "rgba(109, 213, 237, 0.65)" }}>
                    Frontend Developer
                  </div>
                </div>
              </div>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-1.5">
                {MENU.map((item) => {
                  const id = item.href.slice(1);
                  const isActive = active === id;
                  return (
                    <button
                      key={item.name}
                      ref={(el) => (navRefs.current[id] = el)}
                      onClick={() => scrollTo(item.href)}
                      className="relative px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 will-change-transform group"
                      style={{
                        background: isActive
                          ? "linear-gradient(135deg, rgba(59, 243, 255, 0.14), rgba(111, 118, 255, 0.1))"
                          : "transparent",
                        border: isActive ? "1px solid rgba(59, 243, 255, 0.25)" : "1px solid transparent",
                        color: isActive ? "rgba(59, 243, 255, 1)" : "rgba(209, 213, 219, 0.9)",
                        boxShadow: isActive ? "0 4px 20px rgba(59, 243, 255, 0.2)" : "none",
                      }}
                    >
                      <span className="relative z-10 flex items-center gap-1.5">
                        {item.name}
                        {isActive && <Sparkles size={12} className="animate-pulse" />}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: "radial-gradient(circle at 50% 50%, rgba(59, 243, 255, 0.1), transparent 70%)",
                          }}
                          transition={{ type: "spring", stiffness: 350, damping: 35 }}
                        />
                      )}
                      {!isActive && (
                        <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* CTA + Mobile Menu */}
              <div className="flex items-center gap-2.5">
                <motion.button
                  onClick={() => scrollTo("#contact")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm transition-all duration-300 group"
                  style={{
                    background: "linear-gradient(135deg, #3bf3ff, #2193b0)",
                    color: "#001a1f",
                    boxShadow: "0 6px 24px rgba(59, 243, 255, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.35)",
                  }}
                >
                  <span>Let's Talk</span>
                  <Sparkles size={14} className="group-hover:rotate-12 transition-transform" />
                </motion.button>

                <motion.button
                  onClick={() => setOpen((s) => !s)}
                  whileTap={{ scale: 0.9 }}
                  className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200"
                  style={{
                    background: open 
                      ? "linear-gradient(135deg, rgba(59, 243, 255, 0.15), rgba(111, 118, 255, 0.1))"
                      : "rgba(255, 255, 255, 0.05)",
                    border: open 
                      ? "1px solid rgba(59, 243, 255, 0.3)"
                      : "1px solid rgba(255, 255, 255, 0.1)",
                    color: open ? "#3bf3ff" : "white",
                  }}
                  aria-label="Toggle menu"
                >
                  <motion.div
                    initial={false}
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {open ? <X size={18} /> : <Menu size={18} />}
                  </motion.div>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 8, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(10, 14, 20, 0.98), rgba(15, 20, 28, 0.96))",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(59, 243, 255, 0.15)",
                boxShadow: "0 16px 56px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(59, 243, 255, 0.1) inset",
              }}
            >
              <div className="p-2">
                {MENU.map((item, i) => {
                  const isActive = active === item.href.slice(1);
                  return (
                    <motion.button
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => scrollTo(item.href)}
                      className="w-full text-left px-4 py-3 rounded-xl mb-1.5 font-semibold text-sm transition-all duration-200 flex items-center justify-between"
                      style={{
                        background: isActive
                          ? "linear-gradient(135deg, rgba(59, 243, 255, 0.14), rgba(111, 118, 255, 0.1))"
                          : "transparent",
                        border: isActive ? "1px solid rgba(59, 243, 255, 0.25)" : "1px solid rgba(255, 255, 255, 0.04)",
                        color: isActive ? "rgba(59, 243, 255, 1)" : "rgba(209, 213, 219, 0.9)",
                      }}
                    >
                      <span>{item.name}</span>
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        >
                          <Sparkles size={14} className="text-cyan-400" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <style>{`
        @keyframes liquid-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

      {/* Demo sections for scroll spy */}
      <div className="pt-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {sections.map((id) => (
          <section
            key={id}
            id={id}
            className="min-h-screen flex items-center justify-center"
            style={{
              background: `radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(59, 243, 255, 0.05), transparent 50%)`,
            }}
          >
            <div className="text-center">
              <h2 className="text-5xl md:text-7xl font-black mb-4" style={{
                background: "linear-gradient(135deg, #3bf3ff, #6dd5ed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </h2>
              <p className="text-gray-400 text-lg">Section content goes here</p>
            </div>
          </section>
        ))}
      </div>
    </>
  );
}