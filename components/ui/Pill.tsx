import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PillProps {
  children: ReactNode;
  className?: string;
}

export default function Pill({ children, className = "" }: PillProps) {
  return (
    <p className={cn("inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm", className)}>
      {children}
    </p>
  );
}
