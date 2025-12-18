"use client";

import React, { useEffect, useRef } from "react";

type MagneticPhotoProps = {
  src: string;
  alt: string;
  className?: string;
};

export default function MagneticPhoto({
  src,
  alt,
  className = "",
}: MagneticPhotoProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  /* ---------------------------
     Magnetic Hover Effect
  --------------------------- */
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const strength = 18;

    const onMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      wrapper.style.transform = `
        translate(${x / strength}px, ${y / strength}px)
      `;
    };

    const reset = () => {
      wrapper.style.transform = "translate(0, 0)";
    };

    wrapper.addEventListener("mousemove", onMove);
    wrapper.addEventListener("mouseleave", reset);

    return () => {
      wrapper.removeEventListener("mousemove", onMove);
      wrapper.removeEventListener("mouseleave", reset);
    };
  }, []);

  /* ---------------------------
     Subtle Scroll Parallax
  --------------------------- */
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = img.getBoundingClientRect();
        const offset = rect.top * 0.08;
        img.style.transform = `translateY(${offset}px)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`relative group transition-transform duration-300 ${className}`}
    >
      {/* ✨ Animated Liquid Border */}
      <div
        aria-hidden
        className="absolute -inset-3 rounded-3xl blur-2xl opacity-70"
        style={{
          background:
            "linear-gradient(90deg, rgba(59,243,255,0.35), rgba(111,118,255,0.25), rgba(59,243,255,0.35))",
          backgroundSize: "300% 100%",
          animation: "liquid-flow 8s ease-in-out infinite",
        }}
      />

      {/* Image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        className="
          relative
          w-full
          h-full
          object-cover
          rounded-3xl
          border border-white/10
          shadow-2xl
          transition-transform duration-300
          group-hover:scale-[1.03]
        "
      />

      {/* Glass reflection */}
      <div
        aria-hidden
        className="
          absolute inset-0 rounded-3xl
          bg-gradient-to-t
          from-black/25
          via-transparent
          to-white/10
          pointer-events-none
        "
      />

      {/* CSS */}
      <style jsx>{`
        @keyframes liquid-flow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
