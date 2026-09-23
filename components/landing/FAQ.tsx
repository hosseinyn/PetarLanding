import { faqs } from "@/lib/landing-data";
import SectionHeading from "@/components/ui/SectionHeading";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import FaqList from "@/components/landing/FaqList";

export default function FAQ() {
  return (
    <Section id="faq" className="border-t border-gray-200" containerClassName="mx-auto w-full max-w-2xl px-4 section-pad-b sm:px-6">
        <Reveal>
          <SectionHeading
            accent="sky"
            emoji="thinking-face"
            width="narrow"
            spacing="tight"
            eyebrow="سوالات پرتکرار"
            title="بپرس، جوابش اینجاست"
            text="اگه جوابت رو پیدا نکردی، تو فرم شروع بنویس تا خبرت کنیم."
          />
        </Reveal>
        <FaqList items={faqs} />
    </Section>
  );
}
