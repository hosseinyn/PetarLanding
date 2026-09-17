"use client";

import { Emoji } from "react-apple-emojis";

interface HeadlineEmojiProps {
  name: string;
  eager?: boolean;
}

export default function HeadlineEmoji({ name, eager = false }: HeadlineEmojiProps) {
  return (
    <Emoji
      name={name}
      alt=""
      aria-hidden="true"
      draggable={false}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      style={{ width: "1em", height: "1em" }}
      className="inline-block shrink-0 align-[-0.15em]"
    />
  );
}
