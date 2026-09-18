import type { CSSProperties } from "react";
import { Sparkles } from "lucide-react";
import { aiFeatures, aiNote } from "@/lib/landing-data";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { Stagger, StaggerItem, TiltCard } from "@/components/ui/motion";
import RobotScene from "@/components/landing/RobotScene";
import { getIcon } from "@/lib/icons";
import {
  accentHoverBorder,
  accentText,
  accentTint,
} from "@/lib/accent";
import type { Accent } from "@/types/accent";
import Section from "@/components/ui/Section";

export default function AIFuture() {
  return (
    <Section id="ai" className="border-t border-gray-200 bg-green-50">
        <Reveal>
          <SectionHeading
            accent="sky"
            sparkles
            emoji="robot"
            eyebrow="آینده پلتفرم تدریس اسلامی رستادی"
            title="هوش مصنوعی قراره چی کار کنه؟"
            text="داریم روی چیزای باحالی کار میکنیم که یادگیری قرآن رو شخصی و هوشمندتر میکنه."
          />
        </Reveal>
        <Reveal delay={80} className="mt-10">
          <RobotScene />
        </Reveal>
        <Reveal delay={120}>
          <p className="mx-auto mt-6 flex w-fit items-center gap-2 rounded-full bg-yellow-400 px-4 py-1.5 text-sm font-medium text-black">
            <Sparkles className="size-4" aria-hidden="true" />
            {aiNote}
          </p>
        </Reveal>
        <Stagger className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.09}>
          {aiFeatures.map((feature) => {
            const Icon = getIcon(feature.icon);
            const accent: Accent = feature.accent;
            return (
              <StaggerItem key={feature.title}>
                <TiltCard className="h-full" max={7}>
                <article
                  className={`relative flex h-full cursor-pointer flex-col gap-3 overflow-hidden rounded-[14px] border border-gray-200 bg-white p-6 transition duration-700 hover:-translate-y-1 ${accentHoverBorder[accent]}`}
                >
                  <span className="absolute left-4 top-4 rounded-full bg-yellow-400 px-2.5 py-1 text-xs font-medium text-black">
                    به زودی
                  </span>
                  <span aria-hidden="true" className={`grid size-12 place-items-center rounded-[10px] ${accentTint[accent]}`}>
                    <Icon className={`size-6 ${accentText[accent]}`} strokeWidth={1.8} />
                  </span>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="leading-8 text-black/60">{feature.text}</p>
                  <div className="mt-auto flex flex-col gap-2 pt-2" aria-hidden="true">
                    <span className="anim-bubble h-2.5 w-3/4 rounded-full bg-gray-100" style={{ "--bubble-delay": "0ms" } as CSSProperties} />
                    <span className="anim-bubble h-2.5 w-1/2 rounded-full bg-gray-100" style={{ "--bubble-delay": "1.2s" } as CSSProperties} />
                  </div>
                </article>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </Stagger>
    </Section>
  );
}
