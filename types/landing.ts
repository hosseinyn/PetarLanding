import type { Accent } from "@/types/accent";
import type { IconName } from "@/lib/icons";

export interface NavLink {
  href: string;
  label: string;
  icon: IconName;
}

export interface ConceptStep {
  emoji: string;
  title: string;
  text: string;
  icon: IconName;
  example: string;
}

export interface BentoFeature {
  emoji: string;
  icon: IconName;
  accent: Accent;
  title: string;
  text: string;
  scene: "journey" | "quiz" | "streak" | "badge" | "chat" | "verse";
  span?: boolean;
}

export interface Experience {
  emoji: string;
  topic: string;
  title: string;
  text: string;
  ref: string;
  activity: string;
  duration: string;
  accent: Accent;
  image: string;
  alt: string;
}

export interface Topic {
  emoji: string;
  icon: IconName;
  title: string;
  count: string;
  accent: Accent;
}

export interface Path {
  emoji: string;
  icon: IconName;
  title: string;
  text: string;
  level: string;
  lessons: string;
  accent: Accent;
}

export interface Campaign {
  badge: string;
  title: string;
  text: string;
  items: string[];
  cta: string;
  image: string;
  alt: string;
}

export interface FAQ {
  emoji: string;
  question: string;
  answer: string;
}

export interface AiFeature {
  emoji: string;
  icon: IconName;
  title: string;
  text: string;
  accent: Accent;
}
