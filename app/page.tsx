"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Typed from "../components/Typed";

export default function Home() {
  return (
    <section className="min-h-screen w-full bg-black text-white flex items-center py-20 px-6">
      <div className="max-w-[1100px] mx-auto w-full text-center">

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 tracking-wide">
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
            Avik
          </span>{" "}
          — Frontend Developer
        </h1>

        {/* Typed Component */}
        <div className="text-lg sm:text-xl md:text-2xl font-medium text-sky-300">
          <Typed />
        </div>

        {/* Subtitle */}
        <p className="text-white/70 mt-3 text-sm sm:text-base max-w-[600px] mx-auto">
          Crafting elegant solutions & immersive user experiences with clean,
          modern UI.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/projects"
            className="px-6 py-3 rounded-md bg-gradient-to-r from-sky-600 to-cyan-400 text-white font-semibold shadow hover:opacity-90 transition-all flex items-center gap-2"
          >
            View Projects
            <ArrowRight className="h-4 w-4" />
          </Link>

          <Link
            href="/contact"
            className="px-6 py-3 rounded-md border border-white/40 text-white font-semibold hover:bg-white/10 transition-all"
          >
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
