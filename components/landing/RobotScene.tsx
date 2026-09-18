"use client";

import { useRef, type CSSProperties, type MouseEvent, type TouchEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, type MotionValue } from "framer-motion";
import { Bot, Sparkles, Star } from "lucide-react";
import { EASE } from "@/components/ui/motion";

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

function RobotFigure({ pupilX, pupilY }: { pupilX: MotionValue<number>; pupilY: MotionValue<number> }) {
  return (
    <svg
      role="img"
      aria-label="ربات هوشمند پلتفرم تدریس اسلامی رستادی"
      viewBox="0 0 200 230"
      fill="none"
      className="h-56 w-auto sm:h-64"
    >
      <ellipse cx="100" cy="216" rx="44" ry="8" fill="#E9D5FF" />
      <rect x="80" y="180" width="14" height="28" rx="7" fill="#7C3AED" />
      <rect x="106" y="180" width="14" height="28" rx="7" fill="#7C3AED" />
      <rect x="42" y="120" width="12" height="40" rx="6" fill="#7C3AED" />
      <g className="anim-wave">
        <rect x="146" y="120" width="12" height="40" rx="6" fill="#7C3AED" />
        <circle cx="152" cy="164" r="9" fill="#7C3AED" />
      </g>
      <rect x="58" y="112" width="84" height="74" rx="20" fill="#A855F7" />
      <rect x="92" y="100" width="16" height="14" fill="#7C3AED" />
      <circle cx="100" cy="140" r="21" fill="#FFFFFF" opacity="0.92" />
      <path
        d="M100 129l2.6 7.4 7.4 2.6-7.4 2.6-2.6 7.4-2.6-7.4-7.4-2.6 7.4-2.6z"
        fill="#A855F7"
      />
      <rect x="44" y="66" width="10" height="26" rx="5" fill="#7C3AED" />
      <rect x="146" y="66" width="10" height="26" rx="5" fill="#7C3AED" />
      <rect x="52" y="40" width="96" height="62" rx="24" fill="#A855F7" />
      <rect x="62" y="46" width="76" height="9" rx="4.5" fill="#FFFFFF" opacity="0.22" />
      <rect x="64" y="54" width="72" height="38" rx="15" fill="#2E1065" />
      <g className="anim-blink">
        <ellipse cx="86" cy="71" rx="7" ry="9" fill="#FFFFFF" />
        <ellipse cx="114" cy="71" rx="7" ry="9" fill="#FFFFFF" />
        <motion.circle cx="86" cy="73" r="3.5" fill="#2E1065" style={{ x: pupilX, y: pupilY }} />
        <motion.circle cx="114" cy="73" r="3.5" fill="#2E1065" style={{ x: pupilX, y: pupilY }} />
      </g>
      <path
        d="M92 83 Q100 89 108 83"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <line x1="100" y1="40" x2="100" y2="24" stroke="#7C3AED" strokeWidth="4" strokeLinecap="round" />
      <circle cx="100" cy="19" r="7" fill="#FACC15" className="anim-twinkle" />
    </svg>
  );
}

export default function RobotScene() {
  const reduce = useReducedMotion();
  const zoneRef = useRef<HTMLDivElement>(null);
  const rawPX = useMotionValue(0);
  const rawPY = useMotionValue(0);
  const pupilX = useSpring(rawPX, { stiffness: 180, damping: 18 });
  const pupilY = useSpring(rawPY, { stiffness: 180, damping: 18 });

  const trackPoint = (clientX: number, clientY: number) => {
    if (zoneRef.current === null) {
      return;
    }
    const rect = zoneRef.current.getBoundingClientRect();
    const dx = (clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
    rawPX.set(Math.max(-1, Math.min(1, dx)) * 3);
    rawPY.set(Math.max(-1, Math.min(1, dy)) * 2.5);
  };

  const trackEyes = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce === true) {
      return;
    }
    trackPoint(e.clientX, e.clientY);
  };

  const trackTouch = (e: TouchEvent<HTMLDivElement>) => {
    if (reduce === true) {
      return;
    }
    const touch = e.touches[0];
    if (touch === undefined) {
      return;
    }
    trackPoint(touch.clientX, touch.clientY);
  };

  const resetEyes = () => {
    rawPX.set(0);
    rawPY.set(0);
  };

  return (
    <div className="overflow-hidden rounded-[14px] border border-purple-200 bg-purple-50">
      <div className="grid items-center gap-6 p-6 sm:p-8 lg:grid-cols-[auto_1fr]">
        <div
          ref={zoneRef}
          onMouseMove={trackEyes}
          onMouseLeave={resetEyes}
          onTouchStart={trackTouch}
          onTouchMove={trackTouch}
          onTouchEnd={resetEyes}
          className="relative mx-auto w-fit"
        >
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
            <motion.div
              animate={reduce === true ? undefined : { y: [0, -9, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <RobotFigure pupilX={pupilX} pupilY={pupilY} />
            </motion.div>
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
