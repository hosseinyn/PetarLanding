import { CalendarDays, Check } from "lucide-react";
import { campaign } from "@/lib/landing-data";
import Reveal from "@/components/ui/Reveal";
import HeadlineEmoji from "@/components/ui/HeadlineEmoji";
import Button from "@/components/ui/Button";
import { ParallaxPhoto, Stagger, StaggerItem } from "@/components/ui/motion";

export default function CampaignBanner() {
  return (
    <section aria-label="کمپین فعال" className="border-t border-gray-200 bg-yellow-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <Reveal>
          <div className="grid items-center gap-8 rounded-[14px] border border-gray-200 bg-white p-8 sm:p-10 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-[10px] bg-yellow-100">
              <ParallaxPhoto
                src={campaign.image}
                alt={campaign.alt}
                sizes="(max-width: 1024px) 100vw, 50vw"
                frameClassName="h-56 bg-yellow-100 lg:h-full lg:min-h-72"
              />
              <p className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-1.5 text-sm font-medium text-black">
                <CalendarDays className="size-4" aria-hidden="true" />
                {campaign.start} تا {campaign.end}
              </p>
            </div>
            <div className="flex flex-col items-start gap-4">
              <p className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-black/60">
                <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-green-500" />
                {campaign.badge}
              </p>
              <h2 className="text-2xl font-semibold leading-snug sm:text-3xl">
                <HeadlineEmoji name="party-popper" /> {campaign.title}
              </h2>
              <p className="leading-8 text-black/60">{campaign.text}</p>
              <Stagger className="flex w-full flex-col gap-3" gap={0.07}>
                {campaign.items.map((item) => (
                  <StaggerItem key={item}>
                    <div className="flex items-center gap-3 rounded-[10px] border border-gray-200 bg-white px-4 py-3">
                      <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-green-100">
                        <Check className="size-4 text-green-600" />
                      </span>
                      <span className="font-medium">{item}</span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
              <Button href="#lead" className="mt-2">
                {campaign.cta}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
