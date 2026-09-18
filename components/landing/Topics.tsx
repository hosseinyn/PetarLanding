import { topics } from "@/lib/landing-data";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { Stagger, StaggerItem, TiltCard } from "@/components/ui/motion";
import { getIcon } from "@/lib/icons";
import { accentHoverBorder, accentText, accentTint } from "@/lib/accent";
import { LEAD_FORM_HREF } from "@/lib/site";
import Section from "@/components/ui/Section";

export default function Topics() {
  return (
    <Section id="topics" className="border-t border-gray-200 bg-green-50">
        <Reveal>
          <SectionHeading
            accent="green"
            sparkles
            emoji="books"
            eyebrow="موضوعات منتخب"
            title="دوست داری چی یاد بگیری؟"
            text="از روخونی قرآن تا احکام و تاریخ اسلام. هر موضوع چند تا تجربه کوتاه داره."
          />
        </Reveal>
        <Stagger className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6" gap={0.06}>
          {topics.map((topic) => {
            const Icon = getIcon(topic.icon);
            return (
              <StaggerItem key={topic.title} className="h-full">
                <TiltCard className="h-full" max={10}>
                <a
                  href={LEAD_FORM_HREF}
                  className={`flex h-full cursor-pointer flex-col items-center gap-2 rounded-[14px] border border-gray-200 bg-white p-5 text-center transition duration-700 [transform-style:preserve-3d] hover:scale-105 ${accentHoverBorder[topic.accent]}`}
                >
                  <span aria-hidden="true" className={`tilt-pop grid size-12 place-items-center rounded-[10px] ${accentTint[topic.accent]}`}>
                    <Icon className={`size-6 ${accentText[topic.accent]}`} strokeWidth={1.8} />
                  </span>
                  <span className="font-semibold">{topic.title}</span>
                  <span className="text-xs text-black/60">{topic.count}</span>
                </a>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </Stagger>
    </Section>
  );
}
