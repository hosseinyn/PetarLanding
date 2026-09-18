"use client";

import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import type { Group } from "three";
import SafeCanvas from "@/components/3d/SafeCanvas";
import { RobotFallback } from "@/components/3d/Fallbacks";
import { COLORS, PERF } from "@/lib/3d-config";
import ModelRobot from "@/components/3d/ModelRobot";

function Greeter() {
  const ref = useRef<Group>(null);
  useFrame((state, delta) => {
    if (ref.current === null) {
      return;
    }
    const t = state.clock.elapsedTime;
    const k = Math.min(1, delta * 3);
    const tx = state.pointer.x * 0.22;
    ref.current.rotation.y += (tx + Math.sin(t * 0.4) * 0.08 - ref.current.rotation.y) * k;
    ref.current.position.y += (Math.sin(t * 1.1) * 0.05 - ref.current.position.y) * k;
  });
  return (
    <group ref={ref} position={[0, -1.05, 0]}>
      <Suspense fallback={null}>
        <ModelRobot />
      </Suspense>
    </group>
  );
}

function RobotScene() {
  return (
    <>
      <ambientLight intensity={0.95} />
      <hemisphereLight args={[COLORS.white, COLORS.purpleSoft, 0.7]} />
      <directionalLight position={[3, 5, 5]} intensity={1.1} />
      <Float speed={1.6} rotationIntensity={0.2} floatIntensity={0.9}>
        <Greeter />
      </Float>
      <mesh position={[0, -1.35, -0.3]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.85, 32]} />
        <meshBasicMaterial
          color={COLORS.purpleSoft}
          transparent
          opacity={0.9}
        />
      </mesh>
      <Sparkles
        count={PERF.sparklesRobot}
        scale={[4.5, 3.5, 2]}
        size={2.4}
        speed={0.25}
        opacity={0.55}
        color={COLORS.purple}
      />
    </>
  );
}

export default function Robot3D() {
  return (
    <SafeCanvas
      className="h-56 w-full overflow-hidden sm:h-64"
      fallback={<RobotFallback />}
      cameraPosition={[0, 0.1, 6.4]}
      cameraFov={32}
    >
      <RobotScene />
    </SafeCanvas>
  );
}
