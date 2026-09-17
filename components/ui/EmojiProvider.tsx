"use client";

import { EmojiProvider as AppleEmojiProvider } from "react-apple-emojis";
import type { ReactNode } from "react";
import emojiData from "@/lib/emoji-data.json";

export default function EmojiProvider({ children }: { children: ReactNode }) {
  return <AppleEmojiProvider data={emojiData}>{children}</AppleEmojiProvider>;
}
