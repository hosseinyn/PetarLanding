"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import HeadlineEmoji from "@/components/ui/HeadlineEmoji";

const LINE_1 = "قرآن رو بخون،";
const LINE_2 = "بفهم، زندگی کن";

export default function HeroHeadline() {
  const reduce = useReducedMotion();
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (reduce === true) {
      return;
    }
    const start = window.setTimeout(() => setCount(0), 700);
    return () => window.clearTimeout(start);
  }, [reduce]);

  useEffect(() => {
    if (count === null || count >= LINE_1.length + LINE_2.length) {
      return;
    }
    const speed = count < LINE_1.length ? 70 : 60;
    const tick = window.setTimeout(() => {
      setCount((c) => (c === null ? null : c + 1));
    }, speed);
    return () => window.clearTimeout(tick);
  }, [count]);

  if (count === null) {
    return (
      <>
        <HeadlineEmoji name="open-book" eager /> {LINE_1}
        <br />
        <HeadlineEmoji name="sparkles" eager /> {LINE_2}
      </>
    );
  }

  const first = LINE_1.slice(0, Math.min(count, LINE_1.length));
  const second = count > LINE_1.length ? LINE_2.slice(0, count - LINE_1.length) : "";
  const done = count >= LINE_1.length + LINE_2.length;

  return (
    <>
      <span className="block">
        <HeadlineEmoji name="open-book" eager /> {first}
        {done ? null : count <= LINE_1.length ? (
          <span aria-hidden="true" className="anim-caret ms-1 inline-block h-[0.9em] w-[3px] rounded-full bg-sky-500 align-middle" />
        ) : null}
      </span>
      <span className="block">
        <HeadlineEmoji name="sparkles" eager /> {second}
        {done || count > LINE_1.length ? (
          <span aria-hidden="true" className="anim-caret ms-1 inline-block h-[0.9em] w-[3px] rounded-full bg-sky-500 align-middle" />
        ) : null}
      </span>
    </>
  );
}
