"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { EASE } from "@/lib/motion";

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
