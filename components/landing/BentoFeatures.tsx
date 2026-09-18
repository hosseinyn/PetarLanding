import type { CSSProperties } from "react";
import { Check, Flame, Medal, Star } from "lucide-react";
import { bentoFeatures, type BentoFeature } from "@/lib/landing-data";
import SectionHeading from "@/components/ui/SectionHeading";
import HeadlineEmoji from "@/components/ui/HeadlineEmoji";
import Reveal from "@/components/ui/Reveal";
import { Stagger, StaggerItem, PauseOffscreen } from "@/components/ui/motion";
import { getIcon } from "@/lib/icons";
import {
  accentHoverBorder,
  accentText,
  accentTint,
} from "@/lib/accent";
import type { Accent } from "@/types/accent";
import Section from "@/components/ui/Section";

function JourneyScene() {
  const nodes = ["آیه", "مفهوم", "فعالیت", "زندگی"];
  return (
    <div className="flex flex-col gap-3" aria-hidden="true">
      <PauseOffscreen className="relative h-6 rounded-full bg-white">
        <span className="anim-travel block h-6 w-6 rounded-full bg-sky-400" />
      </PauseOffscreen>
      <div className="flex justify-between gap-1">
        {nodes.map((n, i) => (
          <span
            key={n}
            style={{ "--node-delay": `${i * 450}ms` } as CSSProperties}
            className="anim-node rounded-full border border-sky-200 bg-white px-2.5 py-1 text-xs"
          >
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}

function QuizScene() {
  const options = ["الف", "ب", "ج"];
  return (
    <div className="flex flex-col gap-2" aria-hidden="true">
      {options.map((o, i) => (
        <span
          key={o}
          className={`flex items-center justify-between rounded-[10px] border px-3 py-2 text-sm ${
            i === 1 ? "border-green-500 bg-white font-medium" : "border-gray-200 bg-white"
          }`}
        >
          گزینه {o}
          {i === 1 ? (
            <svg viewBox="0 0 24 24" fill="none" className="size-4" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12.5l5 5L20 6.5" className="anim-draw" />
            </svg>
          ) : null}
        </span>
      ))}
    </div>
  );
}

function StreakScene() {
  return (
    <div className="flex items-center gap-3" aria-hidden="true">
      <span className="anim-pop grid size-11 shrink-0 place-items-center rounded-[10px] bg-yellow-100">
        <Flame className="size-5 text-yellow-700" />
      </span>
      <div className="flex flex-1 gap-1.5">
        {[0, 1, 2, 3, 4, 5, 6].map((d) => (
          <span
            key={d}
            style={{ "--dot-delay": `${d * 220}ms` } as CSSProperties}
            className="anim-dot size-3.5 flex-1 rounded-full bg-yellow-400"
          />
        ))}
      </div>
    </div>
  );
}

function BadgeScene() {
  return (
    <div className="flex items-center justify-center gap-3 py-1" aria-hidden="true">
      <Star style={{ "--twinkle-delay": "0ms" } as CSSProperties} className="anim-twinkle size-4 text-yellow-500" fill="currentColor" />
      <span className="anim-pop grid size-14 place-items-center rounded-full bg-sky-100">
        <Medal className="size-7 text-sky-600" />
      </span>
      <Star style={{ "--twinkle-delay": "900ms" } as CSSProperties} className="anim-twinkle size-4 text-yellow-500" fill="currentColor" />
    </div>
  );
}

function ChatScene() {
  return (
    <div className="flex flex-col gap-2" aria-hidden="true">
      <span style={{ "--bubble-delay": "0ms" } as CSSProperties} className="anim-bubble w-fit max-w-full rounded-[10px] rounded-br-sm border border-gray-200 bg-white px-3 py-2 text-sm">
        تو سفری و وقت نمازه، چیکار میکنی؟
      </span>
      <span style={{ "--bubble-delay": "1.4s" } as CSSProperties} className="anim-bubble w-fit max-w-full self-end rounded-[10px] rounded-bl-sm bg-green-500 px-3 py-2 text-sm text-white">
        نماز شکسته میخونم
      </span>
      <span style={{ "--bubble-delay": "2.8s" } as CSSProperties} className="anim-bubble flex w-fit items-center gap-1.5 rounded-[10px] border border-gray-200 bg-white px-3 py-2 text-sm">
        <Check className="size-4 text-green-600" />
        وصل شد به نماز مسافر
      </span>
    </div>
  );
}

function VerseScene() {
  return (
    <div className="grid" aria-hidden="true">
      <p className="anim-swap-a col-start-1 row-start-1 text-lg leading-9">
        وَقُولُوا لِلنَّاسِ حُسْنًا
      </p>
      <p className="anim-swap-b col-start-1 row-start-1 text-sm leading-8 text-black/60">
        و با مردم به نیکی حرف بزنید. (بقره، 83)
      </p>
    </div>
  );
}

function Scene({ name }: { name: BentoFeature["scene"] }) {
  if (name === "journey") {
    return <JourneyScene />;
  }
  if (name === "quiz") {
    return <QuizScene />;
  }
  if (name === "streak") {
    return <StreakScene />;
  }
  if (name === "badge") {
    return <BadgeScene />;
  }
  if (name === "chat") {
    return <ChatScene />;
  }
  return <VerseScene />;
}

function FeatureCard({ feature }: { feature: BentoFeature }) {
  const Icon = getIcon(feature.icon);
  const accent: Accent = feature.accent;
  const full = feature.full === true;
  return (
    <StaggerItem className={full ? "sm:col-span-2 lg:col-span-3" : feature.span === true ? "sm:col-span-2" : ""}>
      <article
        className={`flex h-full cursor-pointer flex-col gap-4 rounded-[14px] border border-gray-200 bg-white p-6 transition duration-700 hover:-translate-y-1 ${accentHoverBorder[accent]} ${full ? "sm:flex-row sm:items-center sm:gap-6" : ""}`}
      >
        <div className={`rounded-[10px] p-4 ${accentTint[accent]} ${full ? "sm:flex-1" : ""}`}>
          <Scene name={feature.scene} />
        </div>
        <div className={`flex items-start gap-3 ${full ? "sm:flex-1" : ""}`}>
          <span aria-hidden="true" className={`grid size-11 shrink-0 place-items-center rounded-[10px] ${accentTint[accent]}`}>
            <Icon className={`size-5 ${accentText[accent]}`} strokeWidth={1.8} />
          </span>
          <div className="flex flex-col gap-1.5">
            <h3 className="text-lg font-semibold"><HeadlineEmoji name={feature.emoji} /> {feature.title}</h3>
            <p className="leading-8 text-black/60">{feature.text}</p>
          </div>
        </div>
      </article>
    </StaggerItem>
  );
}

export default function BentoFeatures() {
  return (
    <Section id="features">
        <Reveal>
          <SectionHeading
            accent="green"
            emoji="rocket"
            eyebrow="چرا پلتفرم تدریس اسلامی رستادی باحاله"
            title="یادگیری که شبیه بازیه"
            text="هر کارت یه تیکه از تجربه پلتفرم تدریس اسلامی رستادیه. ببین چطور آیه، بازی و احکام به هم وصل میشن."
          />
        </Reveal>
        <Stagger className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.09}>
          {bentoFeatures.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </Stagger>
    </Section>
  );
}
