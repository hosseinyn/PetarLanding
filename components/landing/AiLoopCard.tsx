import type { CSSProperties } from "react";
import { PauseOffscreen } from "@/components/ui/PauseOffscreen";

const steps = [
  "میفهمه کجای راهی",
  "قدم بعدی رو میچینه",
  "کوییز مخصوص تو میسازه",
];

export default function AiLoopCard() {
  return (
    <div className="border border-gray-200 bg-white card-r-md">
      <PauseOffscreen className="flex flex-wrap items-center justify-center gap-2 px-4 py-5 sm:gap-3 sm:py-4">
        {steps.map((s, i) => (
          <span
            key={s}
            style={{ "--loop-delay": `${i * 2000}ms` } as CSSProperties}
            className="anim-loop inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium sm:text-[15px]"
          >
            <span
              aria-hidden="true"
              style={{ "--loop-delay": `${i * 2000}ms` } as CSSProperties}
              className="anim-loop-dot inline-block size-1.5 rounded-full bg-gray-200"
            />
            {s}
          </span>
        ))}
      </PauseOffscreen>
    </div>
  );
}
