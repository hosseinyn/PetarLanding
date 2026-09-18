import { ArrowLeft, Clock } from "lucide-react";
import { experiences } from "@/lib/landing-data";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { ParallaxPhoto, Stagger, StaggerItem, TiltCard } from "@/components/ui/motion";
import { accentHoverBorder, accentText, accentTint } from "@/lib/accent";
import { LEAD_FORM_HREF } from "@/lib/site";
import Section from "@/components/ui/Section";

export default function Experiences() {
  return (
    <Section id="experiences" className="border-t border-gray-200">
        <Reveal>
          <SectionHeading
            accent="sky"
            emoji="joystick"
            eyebrow="تجربه های پیشنهادی"
            title="اولین تجربه ات رو انتخاب کن"
            text="هر تجربه با یه آیه شروع میشه و با یه فعالیت واقعی تموم میشه. ببین کدوم به حال و هوای تو نزدیک تره."
          />
        </Reveal>
        <Stagger className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2" gap={0.1}>
          {experiences.map((exp) => (
            <StaggerItem key={exp.title} className="h-full">
              <TiltCard className="h-full" max={7}>
              <article
                className={`group flex h-full cursor-pointer flex-col overflow-hidden rounded-[14px] border border-gray-200 bg-white transition duration-700 hover:-translate-y-1 ${accentHoverBorder[exp.accent]}`}
              >
                <div className="relative">
                  <ParallaxPhoto
                    src={exp.image}
                    alt={exp.alt}
                    sizes="(max-width: 640px) 100vw, 50vw"
                    frameClassName="h-44 bg-sky-50"
                    className="transition duration-700 group-hover:scale-105"
                  />
                  <span className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-medium ${accentTint[exp.accent]} ${accentText[exp.accent]}`}>
                    {exp.topic}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-gray-200 px-3 py-1 text-xs text-black/60">
                      {exp.ref}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold">{exp.title}</h3>
                  <p className="flex-1 leading-8 text-black/60">{exp.text}</p>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-sm">
                    <span className="text-black/60">{exp.activity}</span>
                    <span className="inline-flex items-center gap-1.5 text-black/60">
                      <Clock className="size-4" aria-hidden="true" />
                      {exp.duration}
                    </span>
                  </div>
                </div>
              </article>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
        <Reveal delay={100}>
          <div className="mt-8 flex justify-center">
            <Button href={LEAD_FORM_HREF} variant="secondary">
              این تجربه ها رو رایگان شروع کن
              <ArrowLeft className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </Reveal>
    </Section>
  );
}
