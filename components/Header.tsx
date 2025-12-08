// src/components/Header.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Mail, Code } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menu = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Skills", href: "/skills" },
    { name: "Projects", href: "/projects" },
    { name: "Services", href: "/services" },
    { name: "Resume", href: "/resume" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md bg-white/60 dark:bg-slate-900/60 shadow-md border-b" : "bg-transparent"
      }`}
      aria-label="Main header"
    >
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <span className="flex items-center justify-center rounded-md p-1 bg-gradient-to-tr from-sky-600 to-cyan-400 shadow-sm">
              <Code className="h-6 w-6 text-white" />
            </span>
            <span className="font-semibold text-sky-700 dark:text-sky-300 tracking-wide">
              Avik Mandal
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {menu.map((m) => {
              const isActive =
                m.href === "/" ? pathname === "/" : pathname?.startsWith(m.href.replace("#", ""));
              return (
                <Link key={m.name} href={m.href} className="relative">
                  <span
                    className={`text-sm font-medium py-1 px-1 transition-colors duration-200 ${
                      isActive ? "text-sky-600 dark:text-sky-300" : "text-slate-700 dark:text-slate-200/90 hover:text-sky-500"
                    }`}
                  >
                    {m.name}
                    {/* animated underline */}
                    <span
                      className={`block h-[2px] bg-sky-500 rounded-full mt-1 transform origin-left transition-all duration-300 ${
                        isActive ? "scale-x-100" : "scale-x-0"
                      }`}
                      aria-hidden
                    />
                  </span>
                </Link>
              );
            })}

            {/* CTA */}
            <Link
              href="/#contact"
              className="ml-2 inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-sky-600 to-cyan-400 px-3 py-1.5 text-sm font-semibold text-white shadow hover:scale-[1.02] transition-transform"
            >
              <Mail className="h-4 w-4" />
              Contact
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen((s) => !s)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="rounded-md p-2 inline-flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-x-4 top-16 z-40 transform-gpu transition-all duration-300 ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="mx-auto w-[calc(100%-2rem)] rounded-xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/30 dark:border-slate-700/40 shadow-lg overflow-hidden">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="rounded-md p-1 bg-gradient-to-tr from-sky-600 to-cyan-400">
                  <Code className="h-5 w-5 text-white" />
                </div>
                <span className="font-semibold text-sky-700 dark:text-sky-300">Avik Mandal</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="rounded-md p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <X className="h-5 w-5 text-slate-700 dark:text-slate-200" />
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              {menu.map((m) => {
                const isActive =
                  m.href === "/" ? pathname === "/" : pathname?.startsWith(m.href.replace("#", ""));
                return (
                  <Link
                    key={m.name}
                    href={m.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-md px-3 py-2 text-sm font-medium transition ${
                      isActive ? "bg-sky-50 dark:bg-slate-800 text-sky-600 dark:text-sky-300" : "text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    {m.name}
                  </Link>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-slate-200/40 dark:border-slate-700/40 mt-3">
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 bg-gradient-to-r from-sky-600 to-cyan-400 text-white font-semibold shadow"
              >
                <Mail className="h-4 w-4" />
                Contact
              </Link>
            </div>

            <div className="mt-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="block">Built with ♥ — premium tailwind header</span>
            </div>
          </div>
        </div>
      </div>

      {/* backdrop when open */}
      <div
        className={`md:hidden fixed inset-0 z-30 bg-black/30 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden
      />
    </header>
  );
}
