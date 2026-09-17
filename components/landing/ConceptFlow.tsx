import type { CSSProperties } from "react";
import { Sparkles } from "lucide-react";
import { conceptSteps, type ConceptStep } from "@/lib/landing-data";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { Stagger, StaggerItem, TiltCard, PauseOffscreen } from "@/components/ui/motion";
import { icons } from "@/components/landing/icons";
import type { Accent } from "@/components/landing/accent";
import {
  accentHoverBorder,
  accentText,
  accentTint,
} from "@/components/landing/accent";

const cardAccents: Accent[] = ["sky", "green", "yellow", "sky", "green", "yellow", "sky"];

function JourneyVisual() {
  const nodes = ["آیه", "ترجمه", "مفهوم", "مثال", "سناریو", "فعالیت", "تامل"];
  return (
    <div className="flex flex-col gap-4" aria-hidden="true">
      <PauseOffscreen className="relative flex h-8 items-center rounded-full border border-sky-200 bg-white px-1">
        <span className="anim-travel block h-6 w-6 rounded-full bg-sky-400" />
      </PauseOffscreen>
      <div className="flex flex-wrap gap-1.5">
        {nodes.map((n, i) => (
          <span
            key={n}
            style={{ "--node-delay": `${i * 350}ms` } as CSSProperties}
            className="anim-node rounded-full border border-sky-200 bg-white px-3 py-1 text-xs font-medium"
          >
            {n}
          </span>
        ))}
      </div>
    </div>
  );
}

function StepCard({ step, index, featured = false }: { step: ConceptStep; index: number; featured?: boolean }) {
  const Icon = icons[step.icon] ?? Sparkles;
  const accent: Accent = cardAccents[index % cardAccents.length] as Accent;
  return (
    <StaggerItem className={featured ? "sm:col-span-2" : ""}>
      <TiltCard className="h-full" max={featured ? 5 : 7}>
        <article
          className={`relative flex h-full cursor-pointer flex-col gap-4 overflow-hidden rounded-[14px] border border-gray-200 bg-white p-6 transition duration-700 [transform-style:preserve-3d] hover:-translate-y-1 sm:p-7 ${accentHoverBorder[accent]}`}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-3 left-3 text-7xl font-semibold text-black/[0.06]"
          >
            {index + 1}
          </span>
          {featured ? (
            <div className={`rounded-[10px] border border-sky-200 bg-white p-4`}>
              <JourneyVisual />
            </div>
          ) : null}
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className={`tilt-pop grid size-12 shrink-0 place-items-center rounded-[10px] ${accentTint[accent]}`}>
              <Icon className={`size-6 ${accentText[accent]}`} strokeWidth={1.8} />
            </span>
            <h3 className="text-xl font-semibold">{step.title}</h3>
          </div>
          <p className="leading-8 text-black/60">{step.text}</p>
          <p className={`mt-auto rounded-[10px] px-4 py-3 text-sm leading-7 ${accentTint[accent]}`}>
            <span className="font-semibold">ببین تو عمل: </span>
            {step.example}
          </p>
        </article>
      </TiltCard>
    </StaggerItem>
  );
}

export default function ConceptFlow() {
  const [first, ...rest] = conceptSteps;
  return (
    <section id="concept" className="scroll-mt-24 border-y border-gray-200 bg-sky-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <Reveal>
          <SectionHeading
            accent="sky"
            sparkles
            emoji="compass"
            eyebrow="ایده اصلی پلتفرم تدریس اسلامی رستادی"
            title="از آیه تا زندگی، تو 7 قدم"
            text="هر تجربه پلتفرم تدریس اسلامی رستادی همین راه رو میره. ببین با یه مثال واقعی، مثلا وضوی درست، هر قدم یعنی چی."
          />
        </Reveal>
        <Stagger className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
          {first !== undefined ? <StepCard step={first} index={0} featured /> : null}
          {rest.map((step, i) => (
            <StepCard key={step.title} step={step} index={i + 1} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
