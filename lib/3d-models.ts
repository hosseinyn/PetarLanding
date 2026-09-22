import { useGLTF } from "@react-three/drei";

export const QURAN_VARIANT: 1 | 2 = 1;

export const MODEL_URLS = {
  book: "/models/open-book.glb",
  quranRealistic: "/models/quran-realistic.glb",
  lantern: "/models/lantern.glb",
  robot: "/models/robot.glb",
} as const;

export const DRACO_PATH = "/draco/";

if (typeof window !== "undefined") {
  try {
    useGLTF.setDecoderPath(DRACO_PATH);
  } catch {}
}

let decoderReady = typeof window !== "undefined";

export function ensureDracoDecoder(): void {
  if (decoderReady || typeof window === "undefined") {
    return;
  }
  try {
    useGLTF.setDecoderPath(DRACO_PATH);
    decoderReady = true;
  } catch {
    decoderReady = false;
  }
}

export function preloadModels(): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    ensureDracoDecoder();
    useGLTF.preload(MODEL_URLS.book);
    useGLTF.preload(MODEL_URLS.lantern);
  } catch {
    return;
  }
}

export function preloadRobot(): void {
  if (typeof window === "undefined") {
    return;
  }
  try {
    ensureDracoDecoder();
    useGLTF.preload(MODEL_URLS.robot);
  } catch {
    return;
  }
}
