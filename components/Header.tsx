'use client';
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Menu, X, Sparkles, Send } from "lucide-react";

// --- Constants ---

const MENU = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

// --- Types ---

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

interface MenuItem {
  name: string;
  href: string;
}

// --- Component ---

export default function Header(): React.ReactNode {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [active, setActive] = useState<string>("home");
  const headerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
  const navRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const sections = useMemo<string[]>(() => MENU.map((m: MenuItem) => m.href.slice(1)), []);

  // --- Utility Functions ---

  const scrollTo = useCallback((href: string): void => {
    const el = document.querySelector(href);
    if (el instanceof HTMLElement) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => setOpen(false), 300);
    }
  }, []);

  // --- Effects ---

  // 1. Scroll Spy & Scrolled State
  useEffect(() => {
    const onScroll = (): void => {
      const isScrolled = window.scrollY > 40;
      setScrolled(s => s === isScrolled ? s : isScrolled);

      const found = sections.find((id: string) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const offset = 100;
        const r = el.getBoundingClientRect();
        return r.top <= offset && r.bottom >= offset;
      });
      if (found) setActive(found);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);


  // 2. Particles Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: true });
    if (!canvas || !ctx) return;

    let width = 0;
    let height = 0;
    const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    const initParticles = (currentWidth: number, currentHeight: number): Particle[] => {
      const count = Math.min(80, Math.floor(currentWidth * 0.1));
      const particles: Particle[] = [];
      const colors = ["#3bf3ff", "#6dd5ed", "#b3e8ff", "#957fef"];
      for (let i = 0; i < count; i++) {
        const size = Math.random() * 2.5 + 0.8;
        const x = Math.random() * currentWidth;
        const y = Math.random() * currentHeight;
        const vx = (Math.random() - 0.5) * 0.25;
        const vy = (Math.random() - 0.5) * 0.25;
        const alpha = 0.3 + Math.random() * 0.65;
        const orbitRadius = 15 + Math.random() * 30;
        const angle = Math.random() * Math.PI * 2;
        const color = colors[Math.floor(Math.random() * colors.length)] || "#6dd5ed";
        particles.push({ x, y, vx, vy, size, alpha, orbitRadius, angle, color });
      }
      return particles;
    };

    const resize = (): void => {
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      width = Math.max(320, Math.floor(rect.width));
      height = Math.max(100, Math.floor(rect.height));

      canvas.width = Math.floor(width * devicePixelRatio);
      canvas.height = Math.floor(height * devicePixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      particlesRef.current = initParticles(width, height); 
    };

    resize();
    particlesRef.current = initParticles(width, height); 

    let last = performance.now();
    const frame = (now: number): void => {
      const dt = Math.min(60, now - last) / 1000;
      last = now;
      ctx.clearRect(0, 0, width, height);

      // Background gradient fill 
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "rgba(6, 22, 30, 0.02)");
      gradient.addColorStop(0.5, "rgba(10, 35, 50, 0.04)");
      gradient.addColorStop(1, "rgba(6, 22, 30, 0.02)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const centerX = width * 0.75;
      const centerY = height * 0.3;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        
        // 1. Update position
        if (i % 3 === 0) { 
          p.angle += dt * (0.25 + (i % 7) * 0.018);
          p.x = centerX + Math.cos(p.angle) * p.orbitRadius + (Math.random() - 0.5) * 5;
          p.y = centerY + Math.sin(p.angle) * (p.orbitRadius * 0.5) + (Math.random() - 0.5) * 5;
        } else { 
          p.x += p.vx * dt * 50;
          p.y += p.vy * dt * 50;
        }

        // 2. Wrap boundaries
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // 3. Mouse repulsion
        const dxMouse = p.x - mx;
        const dyMouse = p.y - my;
        const distMouse = Math.hypot(dxMouse, dyMouse);
        if (distMouse < 90) {
          const force = (90 - distMouse) / 90 * 0.7; 
          p.x += (dxMouse / (distMouse || 0.001)) * force * 9; 
          p.y += (dyMouse / (distMouse || 0.001)) * force * 9;
        }

        // 4. Draw particle
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.15, Math.min(p.alpha, 0.95));
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Enhanced glow effect
        if (i % 4 === 0) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // 5. Connect nearby particles
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j];
          const dxLine = p.x - p2.x;
          const dyLine = p.y - p2.y;
          const distLine = Math.hypot(dxLine, dyLine);
          if (distLine < 100) {
            ctx.beginPath();
            ctx.strokeStyle = p.color;
            ctx.globalAlpha = (1 - distLine / 100) * 0.15;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(frame);
    };

    rafRef.current = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // 3. Track Mouse Position 
  useEffect(() => {
    const onMove = (e: MouseEvent): void => {
      const rect = headerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    const onLeave = (): void => {
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // 4. Magnetic Hover Effect
  useEffect(() => {
    let rafId = 0;
    const ease = 0.1; 
    const MAX_DIST = 70;
    const MAX_PUSH_X = 10;
    const MAX_PUSH_Y = 8;
    
    const loop = (): void => {
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
        const strength = Math.max(0, (MAX_DIST - dist) / MAX_DIST);
        
        const dirX = dx / (dist || 0.001); 
        const dirY = dy / (dist || 0.001);
        const targetX = dirX * strength * MAX_PUSH_X;
        const targetY = dirY * strength * MAX_PUSH_Y;

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
    };

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

  // 5. Reset Magnetic Hover on Header MouseLeave
  useEffect(() => {
    const hr = headerRef.current;
    if (!hr) return;

    const onLeave = (): void => {
      Object.values(navRefs.current).forEach((el) => {
        if (!el) return;
        el.style.transition = "transform 0.3s cubic-bezier(0.2, 0.9, 0.2, 1), z-index 0.3s";
        el.style.transform = "translate3d(0, 0, 0) scale(1)";
        el.style.zIndex = "1";
        setTimeout(() => {
            el.style.transition = ""; 
            delete el.dataset.tx;
            delete el.dataset.ty;
        }, 300);
      });
    };
    
    hr.addEventListener("mouseleave", onLeave);
    return () => hr.removeEventListener("mouseleave", onLeave);
  }, []);

  // --- Handlers ---

  const handleMenuToggle = useCallback((): void => {
    setOpen((s) => !s);
  }, []);

  const handleScrollClick = useCallback((href: string) => {
    scrollTo(href);
  }, [scrollTo]);
  
  const handleLogoClick = () => handleScrollClick("#home");
  const handleContactClick = () => handleScrollClick("#contact");
  const handleNavClick = (href: string) => handleScrollClick(href);

  // --- Render ---

  return (
    <>
      <header
        className="fixed left-2 right-2 md:left-3 md:right-3 top-2 md:top-3 z-[999] will-change-transform"
        style={{
          animation: "fadeInDown 0.6s ease-out",
        }}
      >
        <div ref={headerRef} className="relative rounded-2xl">
          
          {/* Animated border glow (More intense pulse added) */}
          <div
            className="absolute inset-0 rounded-2xl opacity-80 pointer-events-none"
            aria-hidden="true"
            style={{
              background: scrolled
                ? "linear-gradient(90deg, rgba(59, 243, 255, 0.25), rgba(111, 118, 255, 0.15), rgba(59, 200, 255, 0.2))"
                : "linear-gradient(90deg, rgba(100, 200, 255, 0.15), rgba(59, 243, 255, 0.1))",
              backgroundSize: "300% 100%",
              animation: "liquid-flow 8s ease-in-out infinite, gradient-pulse 4s ease-in-out infinite", // Added gradient-pulse
              filter: "blur(24px)", // Slightly more blur
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
              aria-hidden="true"
            />

            {/* Main content - Navigation Bar */}
            <nav
              className="relative z-20 flex items-center justify-between gap-2 md:gap-4 px-3 md:px-4 py-2.5 md:py-3 rounded-2xl border transition-all duration-300"
              role="navigation"
              aria-label="Main Navigation"
              style={{
                background: scrolled
                  ? "linear-gradient(135deg, rgba(10, 14, 20, 0.98), rgba(15, 20, 28, 0.96))" // Higher opacity when scrolled
                  : "linear-gradient(135deg, rgba(10, 14, 20, 0.88), rgba(15, 20, 28, 0.82))",
                backdropFilter: "blur(18px) saturate(180%)", // Sharper blur
                borderColor: scrolled ? "rgba(59, 243, 255, 0.25)" : "rgba(255, 255, 255, 0.08)", // Sharper border
                boxShadow: scrolled
                  ? "0 10px 40px rgba(6, 182, 212, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                  : "0 6px 28px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
              }}
            >
              {/* Logo (Enhanced Holographic Glow) */}
              <button 
                type="button"
                className="flex items-center gap-2.5 group" 
                onClick={handleLogoClick}
                aria-label="Go to Home section"
              >
                <div className="relative flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-xl overflow-hidden transition-all duration-300 group-hover:scale-105"
                  style={{
                    background: "radial-gradient(circle at center, rgba(59, 243, 255, 0.2), rgba(111, 118, 255, 0.1))",
                    border: "1px solid rgba(59, 243, 255, 0.3)",
                    boxShadow: "0 4px 20px rgba(59, 243, 255, 0.3), inset 0 0 10px rgba(255, 255, 255, 0.1)", // Inner glow added
                  }}
                >
                  <span
                    className="text-white font-black text-lg md:text-xl"
                    style={{
                      animation: "textHolographicGlow 3s ease-in-out infinite", // New animation
                    }}
                  >
                    AM
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                </div>
                <div className="hidden md:flex flex-col text-left">
                  <div
                    className="text-white font-bold text-base tracking-tight leading-tight"
                    style={{
                      animation: "fadeOpacity 4s ease-in-out infinite",
                    }}
                  >
                    Avik Mandal
                  </div>
                  <div className="text-[10px] font-medium tracking-wide" style={{ color: "rgba(109, 213, 237, 0.8)" }}>
                    Frontend Developer
                  </div>
                </div>
              </button>

              {/* Desktop Nav Links */}
              <div className="hidden md:flex items-center gap-1.5" role="menubar">
                {MENU.map((item: MenuItem) => {
                  const id = item.href.slice(1);
                  const isActive = active === id;
                  return (
                    <button
                      key={item.name}
                      ref={(el: HTMLButtonElement | null) => {
                        navRefs.current[id] = el;
                      }}
                      onClick={() => handleNavClick(item.href)}
                      className="relative px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 will-change-transform group"
                      role="menuitem"
                      aria-current={isActive ? "page" : undefined}
                      style={{
                        background: isActive
                          ? "linear-gradient(135deg, rgba(59, 243, 255, 0.2), rgba(111, 118, 255, 0.15))" // Stronger active background
                          : "transparent",
                        border: isActive ? "1px solid rgba(59, 243, 255, 0.4)" : "1px solid transparent", // Stronger active border
                        color: isActive ? "rgba(59, 243, 255, 1)" : "rgba(220, 224, 230, 0.95)", // Lighter text color
                        boxShadow: isActive ? "0 4px 20px rgba(59, 243, 255, 0.3)" : "none",
                      }}
                    >
                      <span className="relative z-10 flex items-center gap-1.5">
                        {item.name}
                        {isActive && <Sparkles size={12} className="animate-pulse" aria-hidden="true" />}
                      </span>
                      {isActive && (
                        <div
                          className="absolute inset-0 rounded-full"
                          aria-hidden="true"
                          style={{
                            background: "radial-gradient(circle at 50% 50%, rgba(59, 243, 255, 0.2), transparent 70%)",
                            animation: "fadeIn 0.3s ease-out",
                          }}
                        />
                      )}
                      {!isActive && (
                        <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" aria-hidden="true" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* CTA + Mobile Menu Button */}
              <div className="flex items-center gap-2.5">
                {/* Enhanced Glassmorphism CTA Button */}
                <button
                  onClick={handleContactClick}
                  className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm transition-all duration-500 group will-change-transform hover:scale-[1.03] active:scale-95 overflow-hidden relative"
                  type="button"
                  style={{
                    // Glassmorphism effect
                    background: "rgba(255, 255, 255, 0.12)",
                    color: "#3bf3ff", // Primary color text
                    backdropFilter: "blur(10px) saturate(180%)",
                    border: "1px solid rgba(59, 243, 255, 0.5)",
                    boxShadow: "0 4px 24px rgba(59, 243, 255, 0.3), inset 0 0 10px rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <span className="relative z-10">Let&apos;s Talk</span>
                  <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  {/* Subtle hover ripple effect */}
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ mixBlendMode: 'overlay' }} />
                </button>

                <button
                  onClick={handleMenuToggle}
                  className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200 active:scale-90 will-change-transform"
                  type="button"
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-expanded={open}
                  style={{
                    background: open 
                      ? "linear-gradient(135deg, rgba(59, 243, 255, 0.2), rgba(111, 118, 255, 0.15))"
                      : "rgba(255, 255, 255, 0.05)",
                    border: open 
                      ? "1px solid rgba(59, 243, 255, 0.4)"
                      : "1px solid rgba(255, 255, 255, 0.1)",
                    color: open ? "#3bf3ff" : "white",
                  }}
                >
                  <div
                    style={{
                      transform: open ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s ease",
                    }}
                  >
                    {open ? <X size={18} /> : <Menu size={18} />}
                  </div>
                </button>
              </div>
            </nav>
          </div>
        </div>

        {/* Mobile Menu (Conditionally rendered) */}
        {open && (
          <div
            className="rounded-2xl overflow-hidden md:hidden"
            role="menu"
            style={{
              background: "linear-gradient(135deg, rgba(10, 14, 20, 0.98), rgba(15, 20, 28, 0.96))",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(59, 243, 255, 0.15)",
              boxShadow: "0 16px 56px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(59, 243, 255, 0.1) inset",
              marginTop: "8px",
              animation: "slideDown 0.3s cubic-bezier(0.2, 0.9, 0.2, 1)",
            }}
          >
            <div className="p-2">
              {MENU.map((item: MenuItem, i: number) => {
                const isActive = active === item.href.slice(1);
                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className="w-full text-left px-4 py-3 rounded-xl mb-1.5 font-semibold text-sm transition-all duration-200 flex items-center justify-between"
                    role="menuitem"
                    aria-current={isActive ? "page" : undefined}
                    style={{
                      background: isActive
                        ? "linear-gradient(135deg, rgba(59, 243, 255, 0.2), rgba(111, 118, 255, 0.15))"
                        : "transparent",
                      border: isActive ? "1px solid rgba(59, 243, 255, 0.4)" : "1px solid rgba(255, 255, 255, 0.08)", // Increased border visibility
                      color: isActive ? "rgba(59, 243, 255, 1)" : "rgba(220, 224, 230, 0.95)",
                      // New, slightly staggered mobile menu animation
                      animation: `slideInComplex 0.4s cubic-bezier(0.19, 1, 0.22, 1) ${i * 0.04}s backwards`,
                    }}
                  >
                    <span>{item.name}</span>
                    {isActive && (
                      <div style={{ animation: "scaleIn 0.3s ease-out" }}>
                        <Sparkles size={10} className="text-cyan-400" aria-hidden="true" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Global CSS Styles */}
      <style global jsx>{`
        @keyframes liquid-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes gradient-pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.95; }
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        
        /* New Mobile Menu Item Animation */
        @keyframes slideInComplex {
          0% { opacity: 0; transform: translateX(-30px) scale(0.9); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }

        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        
        /* Enhanced Holographic Text Glow */
        @keyframes textHolographicGlow {
          0%, 100% { 
            text-shadow: 
              0 0 12px rgba(59, 243, 255, 0.7), 
              0 0 2px rgba(255, 255, 255, 0.2); 
          }
          50% { 
            text-shadow: 
              0 0 25px rgba(59, 243, 255, 1), 
              0 0 5px rgba(111, 118, 255, 0.8); 
          }
        }
        @keyframes fadeOpacity {
          0%, 100% { opacity: 0.95; }
          50% { opacity: 1; }
        }
      `}</style>
    </>
  );
}