"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface ParallaxPhotoProps {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  frameClassName?: string;
  priority?: boolean;
}

export function ParallaxPhoto({ src, alt, sizes, className = "", frameClassName = "", priority = false }: ParallaxPhotoProps) {
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
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={`object-cover ${className}`.trim()} />
      </motion.div>
    </div>
  );
}
