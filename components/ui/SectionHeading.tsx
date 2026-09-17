import type { CSSProperties } from "react";
import { Star } from "lucide-react";
import type { Accent } from "@/components/landing/accent";
import { accentDot } from "@/components/landing/accent";
import HeadlineEmoji from "@/components/ui/HeadlineEmoji";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "center" | "start";
  accent?: Accent;
  sparkles?: boolean;
  emoji?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  text = "",
  align = "center",
  accent = "sky",
  sparkles = false,
  emoji = "",
}: SectionHeadingProps) {
  const alignClasses =
    align === "center" ? "items-center text-center" : "items-start text-start";
  return (
    <div className={`flex flex-col gap-3 ${alignClasses}`}>
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
      <h2 className="max-w-2xl text-2xl font-semibold leading-snug sm:text-3xl">
        {emoji !== "" ? (
          <>
            <HeadlineEmoji name={emoji} />{" "}
          </>
        ) : null}
        {title}
      </h2>
      {text !== "" ? (
        <p className="max-w-2xl leading-8 text-black/60">{text}</p>
      ) : null}
    </div>
  );
}
