// src/components/Footer.tsx
"use client";

import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";
import { GrMail } from "react-icons/gr";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-br from-[#0c0f11] to-[#050607] text-white py-10 px-6 mt-20 border-t border-white/10">
      <div className="max-w-[1300px] mx-auto flex flex-wrap items-start justify-between gap-10">

        {/* Left Section */}
        <div>
          <h2 className="text-xl font-bold tracking-wide">Avik Mandal</h2>
          <p className="text-white/70 mt-1">
            Frontend Developer & MERN Stack Enthusiast.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-4">
            <a
              href="https://github.com/avik-mandal"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-sky-400 transition text-xl"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/avik-mandal-a901b7294"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-sky-400 transition text-xl"
            >
              <FaLinkedin />
            </a>

            <a
              href="mailto:avikmandal2022@gmail.com"
              className="text-white hover:text-sky-400 transition text-xl"
            >
              <GrMail />
            </a>
          </div>
        </div>

        {/* Right Section */}
        <div className="self-center text-sm text-white/70">
          © {new Date().getFullYear()} Avik Mandal. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
