import type { CSSProperties } from "react";
import { conceptSteps, type ConceptStep } from "@/lib/landing-data";
import SectionHeading from "@/components/ui/SectionHeading";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";
import { TiltCard } from "@/components/ui/TiltCard";
import { PauseOffscreen } from "@/components/ui/PauseOffscreen";
import { getIcon } from "@/lib/icons";
import type { Accent } from "@/types/accent";
import {
  accentHoverBorder,
  accentText,
  accentTint,
} from "@/lib/accent";

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
  const Icon = getIcon(step.icon);
  const accent: Accent = cardAccents[index % cardAccents.length];
  if (featured) {
    return (
      <StaggerItem className="sm:col-span-2">
        <TiltCard className="h-full" max={5}>
          <article
            className={`petar-card relative flex h-full cursor-pointer flex-col gap-4 overflow-hidden p-6 transition duration-700 [transform-style:preserve-3d] hover:-translate-y-1 sm:p-7 card-r-lg ${accentHoverBorder[accent]}`}
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-3 left-3 text-7xl font-semibold text-black/[0.06]"
            >
              {index + 1}
            </span>
            <div className="rounded-[10px] border border-sky-200 bg-white p-4">
              <JourneyVisual />
            </div>
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className={`tilt-pop icon-r-md grid size-12 shrink-0 place-items-center ${accentTint[accent]}`}>
                <Icon className={`size-6 ${accentText[accent]}`} strokeWidth={1.8} />
              </span>
              <h3 className="text-xl font-semibold">{step.title}</h3>
            </div>
            <p className="leading-8 text-black/60">{step.text}</p>
            <p className={`icon-r-md mt-auto px-4 py-3 text-sm leading-7 ${accentTint[accent]}`}>
              <span className="font-semibold">ببین تو عمل: </span>
              {step.example}
            </p>
          </article>
        </TiltCard>
      </StaggerItem>
    );
  }
  return (
    <StaggerItem>
      <article
        className={`petar-card flex h-full flex-col gap-4 p-6 transition duration-700 card-r-sm ${accentHoverBorder[accent]}`}
      >
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className={`icon-r-sm grid size-11 shrink-0 place-items-center ${accentTint[accent]}`}>
            <Icon className={`size-5 ${accentText[accent]}`} strokeWidth={1.8} />
          </span>
          <h3 className="text-lg font-semibold">{step.title}</h3>
        </div>
        <p className="text-[15px] leading-8 text-black/60">{step.text}</p>
        <p className={`icon-r-sm mt-auto px-4 py-2.5 text-sm leading-7 ${accentTint[accent]}`}>
          <span className="font-semibold">ببین تو عمل: </span>
          {step.example}
        </p>
      </article>
    </StaggerItem>
  );
}

export default function ConceptFlow() {
  const [first, ...rest] = conceptSteps;
  return (
    <Section id="concept" pad="a" className="border-y border-gray-200 bg-sky-50">
        <Reveal>
          <SectionHeading
            accent="sky"
            sparkles
            emoji="compass"
            width="narrow"
            spacing="tight"
            eyebrow="ایده اصلی پلتفرم تدریس اسلامی رستادی"
            title="از آیه تا زندگی، تو 7 قدم"
            text="هر تجربه پلتفرم تدریس اسلامی رستادی همین راه رو میره. ببین با یه مثال واقعی، مثلا وضوی درست، هر قدم یعنی چی."
          />
        </Reveal>
        <Stagger className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
          {first !== undefined ? <StepCard step={first} index={0} featured /> : null}
          {rest.map((step, i) => (
            <StepCard key={step.title} step={step} index={i + 1} />
          ))}
        </Stagger>
    </Section>
  );
}
