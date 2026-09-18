export const COLORS = {
  sky: "#38BDF8",
  skySoft: "#E0F2FE",
  skyPale: "#F0F9FF",
  green: "#22C55E",
  greenSoft: "#DCFCE7",
  yellow: "#FACC15",
  yellowSoft: "#FEF9C3",
  white: "#FFFFFF",
  ink: "#0F172A",
  purple: "#A855F7",
  purpleDeep: "#7C3AED",
  purpleSoft: "#F3E8FF",
} as const;

export const PERF = {
  mobileDpr: 1 as const,
  desktopDprMin: 1 as const,
  desktopDprMax: 1.5 as const,
  minPerformance: 0.5 as const,
  sparklesHero: 56,
  sparklesDivider: 36,
  sparklesRobot: 24,
} as const;

export function isMobileViewport(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }
  return (
    /iPhone|iPad|Android/i.test(navigator.userAgent) || window.innerWidth < 640
  );
}
