"use client";

import { Suspense, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Float, ContactShadows, Sparkles } from "@react-three/drei";
import { CanvasTexture } from "three";
import type { Group, PointLight, Sprite } from "three";
import SafeCanvas from "@/components/3d/SafeCanvas";
import { HeroFallback } from "@/components/3d/Fallbacks";
import { COLORS } from "@/lib/3d-config";
import ModelQuran from "@/components/3d/ModelQuran";
import ModelLantern from "@/components/3d/ModelLantern";

function Duo() {
  const ref = useRef<Group>(null);
  const viewport = useThree((s) => s.viewport);
  const wide = viewport.width >= 6;
  const halfW = viewport.width / 2;
  const quranScale = wide ? 1.8 : 1.0;
  const lanternScale = wide ? 1.15 : 0.65;
  const quranX = wide ? Math.min(1.7, halfW - 1.2) : halfW * 0.58;
  const quranY = wide ? -1.35 : 1.35;
  const lanternX = wide ? Math.min(2.5, halfW - 1.0) : -halfW * 0.58;
  const lanternY = wide ? 1.6 : 2.2;

  useFrame((state, delta) => {
    if (ref.current === null) {
      return;
    }
    const t = state.clock.elapsedTime;
    const k = Math.min(1, delta * 1.8);
    const tx = state.pointer.x * 0.25;
    const ty = state.pointer.y * 0.18;
    const cx = Math.max(-0.4, Math.min(0.4, tx));
    const cy = Math.max(-0.3, Math.min(0.3, ty));
    ref.current.position.x += (cx - ref.current.position.x) * k;
    ref.current.position.y +=
      (cy + Math.sin(t * 0.4) * 0.05 - ref.current.position.y) * k;
    ref.current.rotation.y = Math.sin(t * 0.09) * 0.12;
  });

  return (
    <group ref={ref}>
      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.9}>
        <group position={[quranX, quranY, -0.8]} rotation={[0, 0.4, 0]}>
          <Suspense fallback={null}>
            <group scale={quranScale}>
              <ModelQuran />
            </group>
          </Suspense>
        </group>
      </Float>
      <Float
        speed={1.2}
        rotationIntensity={0.35}
        floatIntensity={1}
      >
        <group position={[lanternX, lanternY, -1.2]} rotation={[0, -0.4, 0]}>
          <Suspense fallback={null}>
            <group scale={lanternScale}>
              <ModelLantern />
            </group>
          </Suspense>
        </group>
      </Float>
      <LanternLight x={lanternX} y={lanternY} />
      <LanternGlow x={lanternX} y={lanternY} />
      <ContactShadows
        position={[quranX, quranY - 0.9, -1.4]}
        opacity={0.45}
        scale={3.2}
        blur={2.2}
        far={3}
        resolution={256}
        color="#FACC15"
      />
      <ContactShadows
        position={[lanternX, lanternY - 1, -1.8]}
        opacity={0.4}
        scale={2.4}
        blur={2.2}
        far={3}
        resolution={256}
        color="#FACC15"
      />
    </group>
  );
}

function LanternGlow({ x, y }: { x: number; y: number }) {
  const ref = useRef<Sprite>(null);
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (ctx !== null) {
      const glow = ctx.createRadialGradient(128, 128, 8, 128, 128, 128);
      glow.addColorStop(0, "rgba(255, 208, 140, 0.9)");
      glow.addColorStop(0.35, "rgba(255, 192, 112, 0.45)");
      glow.addColorStop(0.7, "rgba(255, 186, 105, 0.16)");
      glow.addColorStop(1, "rgba(255, 186, 105, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, 256, 256);
    }
    return new CanvasTexture(canvas);
  }, []);
  useFrame((state) => {
    if (ref.current === null) {
      return;
    }
    const t = state.clock.elapsedTime;
    const s = 3.9 + Math.sin(t * 1.6) * 0.14;
    ref.current.scale.set(s, s, 1);
  });
  return (
    <sprite ref={ref} position={[x, y, -1.9]}>
      <spriteMaterial
        map={texture}
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </sprite>
  );
}

function LanternLight({ x, y }: { x: number; y: number }) {
  const ref = useRef<PointLight>(null);
  useFrame((state) => {
    if (ref.current === null) {
      return;
    }
    const t = state.clock.elapsedTime;
    ref.current.intensity =
      11 + Math.sin(t * 7.3) * 0.6 + Math.sin(t * 13.7) * 0.4;
  });
  return (
    <pointLight
      ref={ref}
      position={[x, y, 0.6]}
      color="#FFC98A"
      intensity={11}
      distance={7.5}
      decay={2}
    />
  );
}

function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.95} />
      <hemisphereLight args={[COLORS.white, COLORS.skySoft, 0.7]} />
      <directionalLight position={[4, 6, 6]} intensity={1.15} />
      <Duo />
      <Sparkles
        count={40}
        scale={[8, 5, 3]}
        size={2.4}
        speed={0.2}
        opacity={0.5}
        color={COLORS.sky}
      />
    </>
  );
}

export default function Hero3D() {
  return (
    <SafeCanvas
      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden"
      fallback={<HeroFallback />}
      cameraPosition={[0, 0, 8]}
      cameraFov={36}
    >
      <HeroScene />
    </SafeCanvas>
  );
}

