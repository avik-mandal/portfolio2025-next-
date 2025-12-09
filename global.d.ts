// global.d.ts
// Project-wide JSX types for @react-three/fiber

import type { ThreeElements } from "@react-three/fiber";

declare global {
  namespace JSX {
    // Merge r3f element typings into global JSX so tags like
    // <mesh />, <meshPhysicalMaterial />, <ambientLight />, <group />, etc. are recognized.
    interface IntrinsicElements extends ThreeElements {}
  }
}

export {};
