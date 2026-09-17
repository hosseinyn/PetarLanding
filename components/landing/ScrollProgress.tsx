"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });

  if (reduce === true) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX: smooth, transformOrigin: "right" }}
      className="fixed inset-x-0 top-0 z-[60] h-1 bg-sky-400"
    />
  );
}
