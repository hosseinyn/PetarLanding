"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE } from "@/components/ui/motion";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}

export default function Reveal({ children, delay = 0, className = "", y = 28 }: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce === true) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, rotateX: -8, transformPerspective: 700 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, transformPerspective: 700 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: delay / 1000, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
