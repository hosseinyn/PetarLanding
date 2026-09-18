"use client";

import dynamic from "next/dynamic";
import { AiPoster } from "@/components/remotion/AiPlayer";

const AiPlayer = dynamic(() => import("@/components/remotion/AiPlayer"), {
  ssr: false,
  loading: () => <AiPoster />,
});

export default function AiLoopCard() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-[14px] border border-gray-200 bg-white"
    >
      <div className="h-24 w-full sm:h-28">
        <AiPlayer />
      </div>
    </div>
  );
}
