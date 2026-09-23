"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Bot, Sparkles, Star } from "lucide-react";
import { EASE } from "@/lib/motion";
import { preloadRobot } from "@/lib/3d-models";
import { RobotFallback } from "@/components/3d/Fallbacks";

const Robot3D = dynamic(() => import("@/components/3d/Robot3D"), {
  ssr: false,
  loading: () => <RobotFallback />,
});

export default function RobotView() {
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = rootRef.current;
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
          if (entry.isIntersecting) {
            preloadRobot();
          }
        }
      },
      { rootMargin: "240px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className="pause-offscreen relative mx-auto w-fit">
      <p className="mx-auto mb-2 flex w-fit items-center gap-1.5 rounded-full bg-purple-600 px-3 py-1 text-xs font-medium text-white">
        <Bot className="size-3.5" aria-hidden="true" />
        دستیار هوشمند پتار
      </p>
      <motion.div
        initial={reduce === true ? false : { opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="w-[240px] sm:w-[280px]">
          <Robot3D />
        </div>
      </motion.div>
      <Star
        aria-hidden="true"
        style={{ "--twinkle-delay": "0ms" } as CSSProperties}
        className="anim-twinkle absolute right-2 top-14 size-5 text-purple-400"
        fill="currentColor"
      />
      <Star
        aria-hidden="true"
        style={{ "--twinkle-delay": "1.1s" } as CSSProperties}
        className="anim-twinkle absolute left-0 top-32 size-4 text-yellow-500"
        fill="currentColor"
      />
      <Sparkles
        aria-hidden="true"
        style={{ "--twinkle-delay": "600ms" } as CSSProperties}
        className="anim-twinkle absolute bottom-16 right-0 size-5 text-purple-500"
      />
    </div>
  );
}
