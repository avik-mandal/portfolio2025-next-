"use client";

import React from "react";
import Typewriter from "typewriter-effect";

export default function Typed() {
  return (
    <div className="text-lg sm:text-xl md:text-2xl font-bold text-sky-400">
      <Typewriter
        options={{
          strings: [
            "Frontend Developer",
            "Designer",
            "Freelancer",
            "MERN Stack Developer",
            "Problem Solver",
          ],
          autoStart: true,
          loop: true,
          delay: 70,
          deleteSpeed: 20,
        }}
      />
    </div>
  );
}
