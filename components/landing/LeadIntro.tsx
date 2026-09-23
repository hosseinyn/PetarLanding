import { BadgeCheck, Rocket, Sparkles } from "lucide-react";
import { leadImage } from "@/lib/landing-data";
import Reveal from "@/components/ui/Reveal";
import Pill from "@/components/ui/Pill";
import HeadlineEmoji from "@/components/ui/HeadlineEmoji";
import { ParallaxPhoto } from "@/components/ui/ParallaxPhoto";

const benefits = [
  {
    icon: Rocket,
    title: "شروع رایگان",
    text: "چند تجربه اول کاملا رایگانه. بدون پرداخت و بدون تعهد.",
  },
  {
    icon: Sparkles,
    title: "قدم به قدم",
    text: "از آیه شروع میکنی و قدم به قدم به زندگی خودت میرسی.",
  },
  {
    icon: BadgeCheck,
    title: "محتوای بررسی شده",
    text: "همه تجربه ها رو تیم پلتفرم تدریس اسلامی رستادی طراحی و تایید کرده. خیالت راحت.",
  },
];

export default function LeadIntro() {
  return (
    <Reveal className="h-full">
      <div className="flex h-full flex-col justify-center gap-6 border border-gray-200 bg-sky-50 p-6 sm:p-8 card-r-lg">
        <ParallaxPhoto
          src={leadImage.src}
          alt={leadImage.alt}
          sizes="(max-width: 1024px) 100vw, 50vw"
          frameClassName="h-44 rounded-[10px] bg-sky-100"
        />
        <div>
          <Pill className="w-fit bg-sky-400 font-medium text-white">
            بزن بریم
          </Pill>
          <h2 className="mt-4 text-3xl font-semibold leading-snug">
            <HeadlineEmoji name="student" /> اولین تجربه ات رو
            <br />
            پیش ثبت نام کن
          </h2>
          <p className="mt-3 leading-8 text-black/60">
            فرم رو پر کن تا جزو اولین نفرهایی باشی که پتار رو تجربه
            میکنن. کمتر از دو دقیقه طول میکشه.
          </p>
        </div>
        <ul className="flex flex-col gap-5">
          {benefits.map((b) => (
            <li key={b.title} className="flex items-start gap-3">
              <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-[10px] border border-gray-200 bg-white">
                <b.icon className="size-5 text-sky-600" strokeWidth={1.8} />
              </span>
              <span>
                <span className="block font-semibold">{b.title}</span>
                <span className="block text-sm leading-7 text-black/60">{b.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
