import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  className?: string;
  containerClassName?: string;
  pad?: "a" | "b" | "c";
  children: ReactNode;
}

const padClass = {
  a: "section-pad-a",
  b: "section-pad-b",
  c: "section-pad-c",
} as const;

const containerBase =
  "mx-auto w-full max-w-6xl px-4 sm:px-6";

export default function Section({ id, className = "", containerClassName, pad = "b", children }: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24", className)}>
      <div className={containerClassName ?? `${containerBase} ${padClass[pad]}`}>
        {children}
      </div>
    </section>
  );
}
