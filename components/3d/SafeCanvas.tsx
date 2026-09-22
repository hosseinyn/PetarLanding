"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";

interface SafeCanvasProps {
  children: ReactNode;
  className?: string;
  fallback?: ReactNode;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
}

function hasWebGL(): boolean {
  if (typeof document === "undefined") {
    return false;
  }
  try {
    const el = document.createElement("canvas");
    return el.getContext("webgl2") !== null || el.getContext("webgl") !== null;
  } catch {
    return false;
  }
}

function prefersReduced(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function isMobileDevice(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }
  return (
    /iPhone|iPad|Android/i.test(navigator.userAgent) || window.innerWidth < 640
  );
}

export default function SafeCanvas({
  children,
  className = "",
  fallback = null,
  cameraPosition = [0, 0, 8],
  cameraFov = 35,
}: SafeCanvasProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted] = useState(() => typeof window !== "undefined");
  const [supported] = useState(() => hasWebGL());
  const [reduced] = useState(() => prefersReduced());
  const [mobile] = useState(() => isMobileDevice());
  const [visible, setVisible] = useState(
    () => typeof IntersectionObserver === "undefined"
  );

  useEffect(() => {
    const el = ref.current;
    if (el === null || typeof IntersectionObserver === "undefined") {
      return;
    }
    let timer: number | undefined;
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry === undefined) {
          return;
        }
        window.clearTimeout(timer);
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          timer = window.setTimeout(() => setVisible(false), 200);
        }
      },
      { rootMargin: "160px" }
    );
    io.observe(el);
    return () => {
      window.clearTimeout(timer);
      io.disconnect();
    };
  }, []);

  const ready = mounted && visible && supported && !reduced;

  return (
    <div ref={ref} dir="ltr" aria-hidden="true" className={className}>
      {ready ? (
        <Canvas
          shadows={false}
          dpr={mobile ? 1 : [1, 1.5]}
          gl={{
            antialias: !mobile,
            alpha: true,
            stencil: false,
            depth: true,
            powerPreference: "low-power",
          }}
          camera={{ position: cameraPosition, fov: cameraFov }}
          performance={{ min: 0.5 }}
        >
          {children}
        </Canvas>
      ) : (
        fallback
      )}
    </div>
  );
}
