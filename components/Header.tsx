// components/Header.tsx
"use client";

import React, { useEffect, useMemo, useState, useCallback, Suspense } from "react";
import dynamic from "next/dynamic";
import { Menu, X, Code } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

// dynamic import of the 3D folded A (no SSR)
const ThreeFoldedA = dynamic(() => import("./ThreeFoldedA"), { ssr: false });

const MENU = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Services", href: "#services" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  const sections = useMemo(() => ["home", "about", "skills", "projects", "services", "contact"], []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          const found = sections.find((id) => {
            const el = document.getElementById(id);
            if (!el) return false;
            const r = el.getBoundingClientRect();
            return r.top <= 140 && r.bottom >= 140;
          });
          if (found) setActive(found);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  const scrollTo = useCallback((href: string) => {
    const target = document.querySelector(href);
    if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    }
  }, []);

  const headerVariants: Variants = {
    initial: { y: -12, opacity: 0 },
    enter: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 130, damping: 18 } as any },
  };

  const menuItem: Variants = {
    hidden: { y: -6, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.header
      initial="initial"
      animate="enter"
      variants={headerVariants}
      className={`fixed inset-x-4 top-4 z-50 pointer-events-auto`}
      aria-label="Primary navigation"
    >
      <div
        className={`mx-auto max-w-6xl flex items-center justify-between gap-6 px-4 py-3 rounded-2xl transition-all duration-300
          ${scrolled
            ? "bg-gradient-to-r from-slate-900/90 via-slate-800/82 to-slate-900/90 border border-white/7 shadow-lg"
            : "bg-gradient-to-r from-slate-900/66 via-slate-800/58 to-slate-900/66 border border-white/4"}`
        }
      >
        {/* Logo + Title */}
        <button
          onClick={() => scrollTo("#home")}
          className="flex items-center gap-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/25 p-1 group"
          aria-label="Go to home"
        >
          <div className="relative">
            <div className="absolute -inset-1 rounded-xl blur-sm bg-gradient-to-r from-cyan-500/6 to-blue-500/6 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 w-16 h-16 flex items-center justify-center rounded-xl bg-white/4 border border-white/6">
              {/* 3D folded A (dynamically loaded) */}
              <Suspense fallback={<div className="w-12 h-12 flex items-center justify-center"><Code className="w-5 h-5 text-cyan-300 animate-pulse" /></div>}>
                <ThreeFoldedA className="w-14 h-14" />
              </Suspense>
            </div>
          </div>

          <motion.div
            className="flex flex-col leading-tight"
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.08, duration: 0.36 }}
          >
            <span className="text-white text-lg font-semibold tracking-tight">Avik Mandal</span>
            <span className="text-xs text-slate-300">Frontend Developer</span>
          </motion.div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          <motion.ul
            className="flex items-center gap-2"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
          >
            {MENU.map((item) => {
              const isActive = active === item.href.slice(1);
              return (
                <motion.li key={item.name} variants={menuItem} className="relative">
                  <button
                    onClick={() => scrollTo(item.href)}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative z-10 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      isActive ? "text-cyan-800" : "text-slate-300 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full"
                        style={{ background: "linear-gradient(90deg,#c8f3ff,#9fe6ff)" }}
                        transition={{ type: "spring", stiffness: 350, damping: 30 } as any}
                      />
                    )}
                    <span className={`relative ${isActive ? "font-semibold" : ""}`}>{item.name}</span>
                  </button>
                </motion.li>
              );
            })}
          </motion.ul>

          <motion.button
            onClick={() => scrollTo("#contact")}
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="ml-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black text-sm font-semibold"
          >
            Let's Talk
          </motion.button>
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <motion.button
            onClick={() => setOpen((s) => !s)}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-md bg-white/6 hover:bg-white/8"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 6 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 } as any}
            className="md:hidden mt-3 mx-4"
          >
            <div className="rounded-2xl bg-slate-900/88 backdrop-blur-md border border-white/6 p-4">
              <motion.ul initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.06 } } }}>
                {MENU.map((item) => (
                  <motion.li key={item.name} variants={menuItem} className="mb-2 last:mb-0">
                    <button
                      onClick={() => scrollTo(item.href)}
                      className={`w-full text-left px-4 py-3 rounded-lg font-medium transition ${
                        active === item.href.slice(1) ? "bg-white/6 text-cyan-300" : "text-slate-200 hover:bg-white/6"
                      }`}
                    >
                      {item.name}
                    </button>
                  </motion.li>
                ))}
                <motion.li variants={menuItem} className="mt-3">
                  <button onClick={() => scrollTo("#contact")} className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-semibold">
                    Let's Talk
                  </button>
                </motion.li>
              </motion.ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
