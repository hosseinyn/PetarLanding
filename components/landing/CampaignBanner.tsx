import { Check } from "lucide-react";
import { campaign } from "@/lib/landing-data";
import Reveal from "@/components/ui/Reveal";
import HeadlineEmoji from "@/components/ui/HeadlineEmoji";
import Button from "@/components/ui/Button";
import Pill from "@/components/ui/Pill";
import { LEAD_FORM_HREF } from "@/lib/site";
import { ParallaxPhoto, Stagger, StaggerItem } from "@/components/ui/motion";

export default function CampaignBanner() {
  return (
    <section aria-label="کمپین فعال" className="border-t border-gray-200 bg-yellow-50">
      <div className="section-pad-a mx-auto w-full max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="petar-card grid items-stretch gap-8 p-6 sm:p-8 card-r-lg lg:grid-cols-2">
            <ParallaxPhoto
              src={campaign.image}
              alt={campaign.alt}
              sizes="(max-width: 1024px) 100vw, 50vw"
              frameClassName="h-56 bg-white border border-gray-200 icon-r-md lg:h-full lg:min-h-80"
            />
            <div className="flex flex-col items-start justify-center gap-4">
              <Pill className="border border-gray-200 bg-white text-black/60">
                <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-green-500" />
                {campaign.badge}
              </Pill>
              <h2 className="text-2xl font-semibold leading-snug sm:text-3xl">
                <HeadlineEmoji name="party-popper" /> {campaign.title}
              </h2>
              <p className="leading-8 text-black/60">{campaign.text}</p>
              <Stagger className="flex w-full flex-col gap-2.5" gap={0.07}>
                {campaign.items.map((item, i) => (
                  <StaggerItem key={item}>
                    <div className={`petar-card flex items-center gap-3 px-4 ${i % 2 === 0 ? "py-3 icon-r-md" : "py-4 card-r-sm"}`}>
                      <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-green-100">
                        <Check className="size-4 text-green-600" />
                      </span>
                      <span className="font-medium">{item}</span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
              <Button href={LEAD_FORM_HREF} className="mt-2">
                {campaign.cta}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
