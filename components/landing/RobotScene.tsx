"use client";

import dynamic from "next/dynamic";
import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Bot, Sparkles, Star } from "lucide-react";
import { EASE } from "@/components/ui/motion";
import { RobotFallback } from "@/components/3d/Fallbacks";

const Robot3D = dynamic(() => import("@/components/3d/Robot3D"), {
  ssr: false,
  loading: () => <RobotFallback />,
});

const bubbles = [
  {
    from: "student",
    text: "این آیه رو نفهمیدم، یعنی چی؟",
    delay: "0ms",
  },
  {
    from: "robot",
    text: "باشه! بذار با یه مثال ساده بگم...",
    delay: "1.6s",
  },
  {
    from: "student",
    text: "آهان، حالا گرفتم!",
    delay: "3.2s",
  },
];

export default function RobotScene() {
  const reduce = useReducedMotion();

  return (
    <div className="overflow-hidden rounded-[14px] border border-purple-200 bg-purple-50">
      <div className="grid items-center gap-6 p-6 sm:p-8 lg:grid-cols-[auto_1fr]">
        <div className="relative mx-auto w-fit">
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
        <div className="flex flex-col gap-2.5" aria-label="گفتگوی دانش آموز با ربات پلتفرم تدریس اسلامی رستادی">
          {bubbles.map((b) =>
            b.from === "robot" ? (
              <p
                key={b.text}
                style={{ "--bubble-delay": b.delay } as CSSProperties}
                className="anim-bubble w-fit max-w-full self-start rounded-[10px] rounded-br-sm bg-purple-600 px-4 py-2.5 text-sm leading-7 text-white"
              >
                {b.text}
              </p>
            ) : (
              <p
                key={b.text}
                style={{ "--bubble-delay": b.delay } as CSSProperties}
                className="anim-bubble w-fit max-w-full self-end rounded-[10px] rounded-bl-sm border border-gray-200 bg-white px-4 py-2.5 text-sm leading-7"
              >
                {b.text}
              </p>
            )
          )}
          <p className="mt-1 flex items-center gap-1.5 self-end text-xs text-black/60">
            <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-green-500" />
            آنلاینه و آماده جوابه
          </p>
        </div>
      </div>
    </div>
  );
}
