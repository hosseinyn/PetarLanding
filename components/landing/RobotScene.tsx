import type { CSSProperties } from "react";
import RobotView from "@/components/landing/RobotView";
import { PauseOffscreen } from "@/components/ui/PauseOffscreen";

const bubbles = [
  {
    from: "student",
    text: "این آیه رو نفهمیدم، یعنی چی؟",
    delay: "0ms",
  },
  {
    from: "robot",
    text: "باشه! بذار با یه مثال ساده بگم...",
    delay: "1.6s",
  },
  {
    from: "student",
    text: "آهان، حالا گرفتم!",
    delay: "3.2s",
  },
];

export default function RobotScene() {
  return (
    <div className="overflow-hidden rounded-[14px] border border-purple-200 bg-purple-50">
      <div className="grid items-center gap-6 p-6 sm:p-8 lg:grid-cols-[auto_1fr]">
        <RobotView />
        <PauseOffscreen
          className="flex flex-col gap-2.5"
          ariaLabel="گفتگوی دانش آموز با ربات پلتفرم تدریس اسلامی رستادی"
        >
          {bubbles.map((b) =>
            b.from === "robot" ? (
              <p
                key={b.text}
                style={{ "--bubble-delay": b.delay } as CSSProperties}
                className="anim-bubble w-fit max-w-full self-start rounded-[10px] rounded-br-sm bg-purple-600 px-4 py-2.5 text-sm leading-7 text-white"
              >
                {b.text}
              </p>
            ) : (
              <p
                key={b.text}
                style={{ "--bubble-delay": b.delay } as CSSProperties}
                className="anim-bubble w-fit max-w-full self-end rounded-[10px] rounded-bl-sm border border-gray-200 bg-white px-4 py-2.5 text-sm leading-7"
              >
                {b.text}
              </p>
            )
          )}
          <p className="mt-1 flex items-center gap-1.5 self-end text-xs text-black/60">
            <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-green-500" />
            آنلاینه و آماده جوابه
          </p>
        </PauseOffscreen>
      </div>
    </div>
  );
}
