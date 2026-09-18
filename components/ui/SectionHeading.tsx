import type { CSSProperties } from "react";
import { Star } from "lucide-react";
import type { Accent } from "@/types/accent";
import { accentDot } from "@/lib/accent";
import HeadlineEmoji from "@/components/ui/HeadlineEmoji";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "center" | "start";
  accent?: Accent;
  sparkles?: boolean;
  emoji?: string;
  width?: "default" | "narrow";
  spacing?: "default" | "tight";
}

export default function SectionHeading({
  eyebrow,
  title,
  text = "",
  align = "center",
  accent = "sky",
  sparkles = false,
  emoji = "",
  width = "default",
  spacing = "default",
}: SectionHeadingProps) {
  const alignClasses =
    align === "center" ? "items-center text-center" : "items-start text-start";
  const gapClass = spacing === "tight" ? "gap-2" : "gap-3";
  const textWidth = width === "narrow" ? "max-w-xl" : "max-w-2xl";
  return (
    <div className={`flex flex-col ${gapClass} ${alignClasses}`}>
      <span className="relative inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-black/60">
        {sparkles ? (
          <>
            <Star
              aria-hidden="true"
              style={{ "--twinkle-delay": "0ms" } as CSSProperties}
              className="anim-twinkle absolute -right-2 -top-2 size-4 text-yellow-500"
              fill="currentColor"
            />
            <Star
              aria-hidden="true"
              style={{ "--twinkle-delay": "800ms" } as CSSProperties}
              className="anim-twinkle absolute -left-2 -top-1 size-3 text-sky-400"
              fill="currentColor"
            />
          </>
        ) : null}
        <span aria-hidden="true" className={`inline-block size-1.5 rounded-full ${accentDot[accent]}`} />
        {eyebrow}
      </span>
      <h2 className={`${textWidth} text-2xl font-semibold leading-snug sm:text-3xl`}>
        {emoji !== "" ? (
          <>
            <HeadlineEmoji name={emoji} />{" "}
          </>
        ) : null}
        {title}
      </h2>
      {text !== "" ? (
        <p className={`${textWidth} leading-8 text-black/60`}>{text}</p>
      ) : null}
    </div>
  );
}
