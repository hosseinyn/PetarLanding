"use client";

import { useEffect, useMemo, useRef } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import { useReducedMotion } from "framer-motion";
import AiLoop from "@/remotion/AiLoop";
import {
  notifyPlaying,
  registerPlayback,
  type PlaybackHandle,
} from "@/lib/remotion-playback";

const FPS = 30;
const DURATION = 120;

export function AiPoster() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-2 bg-white px-4">
      {["میفهمه کجای راهی", "قدم بعدی رو میچینه", "کوییز مخصوص تو میسازه"].map(
        (s) => (
          <span
            key={s}
            className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-black/60"
          >
            {s}
          </span>
        )
      )}
    </div>
  );
}

export default function AiPlayer() {
  const reduce = useReducedMotion();
  const ref = useRef<PlayerRef>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputProps = useMemo(() => ({}), []);
  const handle = useMemo<PlaybackHandle>(
    () => ({
      pause: () => {
        ref.current?.pause();
      },
    }),
    []
  );

  useEffect(() => registerPlayback(handle), [handle]);

  useEffect(() => {
    const player = ref.current;
    if (player === null) {
      return;
    }
    const onPlay = () => notifyPlaying(handle);
    player.addEventListener("play", onPlay);
    return () => {
      player.removeEventListener("play", onPlay);
    };
  }, [handle]);

  useEffect(() => {
    const el = wrapRef.current;
    if (el === null || typeof IntersectionObserver === "undefined") {
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry === undefined) {
          return;
        }
        if (entry.isIntersecting) {
          notifyPlaying(handle);
          void ref.current?.play();
        } else {
          ref.current?.pause();
        }
      },
      { rootMargin: "120px" }
    );
    io.observe(el);
    const onVis = () => {
      if (document.hidden) {
        ref.current?.pause();
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [handle]);

  if (reduce === true) {
    return <AiPoster />;
  }

  return (
    <div ref={wrapRef} className="h-full w-full">
      <Player
        ref={ref}
        component={AiLoop}
        inputProps={inputProps}
        durationInFrames={DURATION}
        compositionWidth={1200}
        compositionHeight={180}
        fps={FPS}
        controls={false}
        loop
        autoPlay
        clickToPlay={false}
        allowFullscreen={false}
        doubleClickToFullscreen={false}
        acknowledgeRemotionLicense
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
