"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { EASE } from "@/lib/motion";

export function PhoneVisual({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const visualRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ["start end", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], [28, -28]);

  return (
    <motion.div
      ref={visualRef}
      initial={reduce === true ? false : { opacity: 0, y: 48, rotate: 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative mx-auto w-fit"
      aria-hidden="true"
    >
      <motion.div style={reduce === true ? undefined : { y: drift }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

export function PhoneProgress() {
  return (
    <motion.span
      initial={{ width: "5%" }}
      whileInView={{ width: "68%" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
      className="block h-full rounded-full bg-sky-400"
    />
  );
}
