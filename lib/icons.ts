import {
  BarChart3,
  BookOpen,
  Brain,
  Compass,
  Flame,
  Gamepad2,
  Heart,
  Landmark,
  Languages,
  LayoutGrid,
  Leaf,
  Map,
  Medal,
  MessageCircleQuestion,
  MessagesSquare,
  Moon,
  Route,
  Scale,
  ScrollText,
  Sparkles,
  Sun,
  Users,
  type LucideIcon,
} from "lucide-react";

export const icons = {
  route: Route,
  brain: Brain,
  languages: Languages,
  sun: Sun,
  users: Users,
  chart: BarChart3,
  book: BookOpen,
  heart: Heart,
  sparkles: Sparkles,
  quiz: Gamepad2,
  flame: Flame,
  medal: Medal,
  chat: MessagesSquare,
  verse: ScrollText,
  moon: Moon,
  leaf: Leaf,
  grid: LayoutGrid,
  map: Map,
  help: MessageCircleQuestion,
  scale: Scale,
  landmark: Landmark,
  compass: Compass,
};

export type IconName = keyof typeof icons;

export function getIcon(name: IconName): LucideIcon {
  return icons[name] ?? Sparkles;
}
