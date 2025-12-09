// global.d.ts
// Put at the repo root or in src/ so TS picks it up automatically.

import type { ThreeElements } from "@react-three/fiber";

declare global {
  namespace JSX {
    // Merge R3F's ThreeElements into global JSX.IntrinsicElements
    interface IntrinsicElements extends ThreeElements {}
  }
}

export {};
