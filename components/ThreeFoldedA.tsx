// components/ThreeFoldedA.tsx
"use client";

import React, { useRef, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { ThreeElements } from "@react-three/fiber";

type Props = { className?: string; dpr?: number | [number, number] };

/**
 * TS: ensure react-three-fiber JSX elements are recognized.
 * If you have a global.d.ts already, you can remove this block.
 */
declare global {
  namespace JSX {
    // merge r3f's element typings so <ambientLight />, <mesh /> etc. are valid
    interface IntrinsicElements extends ThreeElements {}
  }
}
export {}; // keep as module

function FoldedAMesh(props: { hovered: boolean }) {
  const ref = useRef<THREE.Mesh | null>(null);

  // Create A shape using Shape and extrude
  const shape = React.useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(50, 8);
    s.lineTo(82, 78);
    s.lineTo(68, 78);
    s.lineTo(60, 60);
    s.lineTo(40, 60);
    s.lineTo(32, 78);
    s.lineTo(18, 78);
    s.lineTo(50, 8);

    // crossbar hole
    const hole = new THREE.Path();
    hole.moveTo(36, 52);
    hole.lineTo(64, 52);
    hole.lineTo(64, 58);
    hole.lineTo(36, 58);
    hole.closePath();
    s.holes.push(hole);
    return s;
  }, []);

  const geom = React.useMemo(() => {
    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 6,
      bevelEnabled: true,
      bevelThickness: 0.9,
      bevelSize: 0.9,
      bevelSegments: 4,
      steps: 1,
    } as any;

    const g = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    g.computeBoundingBox();
    g.computeVertexNormals();
    // center geometry
    if (g.boundingBox) {
      const cx = (g.boundingBox.max.x + g.boundingBox.min.x) / 2;
      const cy = (g.boundingBox.max.y + g.boundingBox.min.y) / 2;
      const cz = (g.boundingBox.max.z + g.boundingBox.min.z) / 2;
      g.translate(-cx, -cy, -cz);
    }
    return g;
  }, [shape]);

  // animate: slow rotation + bob + hover tilt (adjusted for flipped orientation)
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.18 * delta; // slow spin
    const t = state.clock.getElapsedTime();
    ref.current.position.y = Math.sin(t * 0.8) * 0.08;
    // hover tilt: when hovered tilt forward (positive) because group is flipped
    ref.current.rotation.x = props.hovered
      ? THREE.MathUtils.lerp(ref.current.rotation.x, 0.08, 0.12)
      : THREE.MathUtils.lerp(ref.current.rotation.x, 0, 0.08);
  });

  return (
    <mesh ref={ref} geometry={geom} castShadow receiveShadow>
      <meshPhysicalMaterial
        color={"#c9d6e2"}
        metalness={0.96}
        roughness={0.16}
        clearcoat={0.8}
        clearcoatRoughness={0.03}
        reflectivity={0.9}
        envMapIntensity={1.2}
        thickness={0.5}
      />
    </mesh>
  );
}

/** Main component: Canvas wrapper + mobile fallback */
export default function ThreeFoldedA({ className = "w-20 h-20", dpr = [1, 1.4] }: Props) {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mm = typeof window !== "undefined" && window.matchMedia ? window.matchMedia("(max-width: 640px)").matches : false;
    setIsMobile(mm);
    const onResize = () => setIsMobile(window.matchMedia("(max-width: 640px)").matches);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Mobile fallback SVG
  if (!mounted || isMobile) {
    return (
      <div className={className + " flex items-center justify-center"} aria-hidden>
        <svg viewBox="0 0 100 100" className="w-full h-full" role="img" aria-label="A logo">
          <defs>
            <linearGradient id="Astatic" x1="0" x2="1">
              <stop offset="0%" stopColor="#eef6fb" />
              <stop offset="100%" stopColor="#9fb0bd" />
            </linearGradient>
          </defs>
          <rect x="32" y="20" width="10" height="60" rx="3" transform="rotate(-14 37 50)" fill="url(#Astatic)" />
          <rect x="58" y="20" width="10" height="60" rx="3" transform="rotate(14 63 50)" fill="url(#Astatic)" />
          <rect x="38" y="48" width="24" height="10" rx="3" fill="url(#Astatic)" />
        </svg>
      </div>
    );
  }

  return (
    <div
      className={className + " rounded-lg overflow-hidden"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="img"
      aria-label="3D folded A logo"
      style={{ cursor: "pointer" }}
    >
      <Canvas dpr={dpr} camera={{ position: [0, 0, 28], fov: 35 }} shadows>
        <Suspense fallback={null}>
          <Environment preset="studio" />
        </Suspense>

        {/* lights tuned for metallic highlights */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 10]} intensity={1.0} />
        <directionalLight position={[-6, -4, 10]} intensity={0.4} />

        {/* flipped vertically so top becomes bottom */}
        <group scale={[0.28, 0.28, 0.28]} rotation={[Math.PI, 0, 0]}>
          <FoldedAMesh hovered={hovered} />
        </group>

        {/* controls only to aid dev; disabled rotate/zoom for users */}
        <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}
