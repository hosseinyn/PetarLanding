"use client";

import {
  MotionConfig,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, type MouseEvent, type ReactNode, type TouchEvent } from "react";

export const EASE: [number, number, number, number] = [0.21, 0.47, 0.32, 0.98];

export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

const container: Variants = {
  hidden: {},
  visible: (gap: number = 0.08) => ({
    transition: { staggerChildren: gap, delayChildren: 0.1 },
  }),
};

const item: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98, rotateX: -10, transformPerspective: 800 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transformPerspective: 800,
    transition: { duration: 0.55, ease: EASE },
  },
};

interface StaggerProps {
  children: ReactNode;
  className?: string;
  gap?: number;
}

export function Stagger({ children, className = "", gap = 0.08 }: StaggerProps) {
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={gap}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  max?: number;
}

export function TiltCard({ children, className = "", max = 8 }: TiltCardProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(rawY, [0, 1], [max, -max]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(rawX, [0, 1], [-max, max]), {
    stiffness: 200,
    damping: 20,
  });

  const pointTo = (clientX: number, clientY: number) => {
    if (ref.current === null) {
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    rawX.set(Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)));
    rawY.set(Math.max(0, Math.min(1, (clientY - rect.top) / rect.height)));
  };

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce === true) {
      return;
    }
    pointTo(e.clientX, e.clientY);
  };

  const onTouch = (e: TouchEvent<HTMLDivElement>) => {
    if (reduce === true) {
      return;
    }
    const touch = e.touches[0];
    if (touch === undefined) {
      return;
    }
    pointTo(touch.clientX, touch.clientY);
  };

  const onLeave = () => {
    rawX.set(0.5);
    rawY.set(0.5);
  };

  if (reduce === true) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={className} style={{ perspective: 900 }}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onTouchStart={onTouch}
        onTouchMove={onTouch}
        onTouchEnd={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileTap={{ scale: 0.98 }}
        className="h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

interface ParallaxPhotoProps {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  frameClassName?: string;
}export function ParallaxPhoto({ src, alt, sizes, className = "", frameClassName = "" }: ParallaxPhotoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useSpring(useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]), {
    stiffness: 120,
    damping: 26,
  });

  return (
    <div ref={ref} className={`overflow-hidden ${frameClassName}`.trim()}>
      <motion.div style={{ y }} className="relative -top-[10%] h-[120%] w-full">
        <Image src={src} alt={alt} fill sizes={sizes} className={`object-cover ${className}`.trim()} />
      </motion.div>
    </div>
  );
}

export function PauseOffscreen({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (node === null) {
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-live");
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.target.classList.toggle("is-live", entry.isIntersecting);
        }
      },
      { rootMargin: "120px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`pause-offscreen ${className}`.trim()}>
      {children}
    </div>
  );
}
