export type Accent = "sky" | "green" | "yellow";

export const accentDot: Record<Accent, string> = {
  sky: "bg-sky-400",
  green: "bg-green-500",
  yellow: "bg-yellow-400",
};

export const accentTint: Record<Accent, string> = {
  sky: "bg-sky-50",
  green: "bg-green-50",
  yellow: "bg-yellow-50",
};

export const accentRing: Record<Accent, string> = {
  sky: "border-sky-200",
  green: "border-green-200",
  yellow: "border-yellow-200",
};

export const accentHoverBorder: Record<Accent, string> = {
  sky: "hover:border-sky-300",
  green: "hover:border-green-300",
  yellow: "hover:border-yellow-300",
};

export const accentText: Record<Accent, string> = {
  sky: "text-sky-600",
  green: "text-green-600",
  yellow: "text-yellow-700",
};

export const accentSolid: Record<Accent, string> = {
  sky: "bg-sky-400",
  green: "bg-green-500",
  yellow: "bg-yellow-400",
};
