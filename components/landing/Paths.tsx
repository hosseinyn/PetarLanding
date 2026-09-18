import { ArrowLeft, Footprints } from "lucide-react";
import { paths } from "@/lib/landing-data";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { Stagger, StaggerItem, TiltCard } from "@/components/ui/motion";
import { getIcon } from "@/lib/icons";
import { accentHoverBorder, accentText, accentTint } from "@/lib/accent";
import { LEAD_FORM_HREF } from "@/lib/site";
import Section from "@/components/ui/Section";

export default function Paths() {
  return (
    <Section id="paths" className="border-t border-gray-200">
        <Reveal>
          <SectionHeading
            accent="yellow"
            sparkles
            emoji="world-map"
            eyebrow="مسیرهای یادگیری"
            title="قدم به قدم، تا تهش برو"
            text="چند تا تجربه پشت سر هم یه مسیر میسازه. آخر هر مسیر یه فعالیت جمع بندی و یه نشان داره."
          />
        </Reveal>
        <Stagger className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3" gap={0.1}>
          {paths.map((path) => {
            const Icon = getIcon(path.icon);
            return (
              <StaggerItem key={path.title} className="h-full">
                <TiltCard className="h-full" max={7}>
                <article
                  className={`flex h-full cursor-pointer flex-col gap-3 rounded-[14px] border border-gray-200 bg-white p-6 transition duration-700 [transform-style:preserve-3d] hover:-translate-y-1 ${accentHoverBorder[path.accent]}`}
                >
                  <span aria-hidden="true" className={`tilt-pop grid size-12 place-items-center rounded-[10px] ${accentTint[path.accent]}`}>
                    <Icon className={`size-6 ${accentText[path.accent]}`} strokeWidth={1.8} />
                  </span>
                  <p className="inline-flex w-fit rounded-full border border-gray-200 px-3 py-1 text-xs text-black/60">
                    {path.level}
                  </p>
                  <h3 className="text-xl font-semibold">{path.title}</h3>
                  <p className="flex-1 leading-8 text-black/60">{path.text}</p>
                  <p className="inline-flex items-center gap-1.5 border-t border-gray-200 pt-4 text-sm text-black/60">
                    <Footprints className="size-4" aria-hidden="true" />
                    {path.lessons}
                  </p>
                </article>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </Stagger>
        <Reveal delay={100}>
          <div className="mt-8 flex justify-center">
            <Button href={LEAD_FORM_HREF} variant="secondary">
              مسیرم رو رایگان شروع کن
              <ArrowLeft className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </Reveal>
    </Section>
  );
}
