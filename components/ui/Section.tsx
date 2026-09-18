import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}

const containerClass =
  "mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24";

export default function Section({ id, className = "", containerClassName, children }: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-24", className)}>
      <div className={containerClassName ?? containerClass}>
        {children}
      </div>
    </section>
  );
}
