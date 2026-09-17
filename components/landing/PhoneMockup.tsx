"use client";

import { useRef, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  BatteryMedium,
  BellRing,
  BookOpen,
  Check,
  Flame,
  Home,
  Medal,
  Play,
  Signal,
  User,
  Wifi,
} from "lucide-react";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { EASE, TiltCard } from "@/components/ui/motion";

const bullets = [
  {
    icon: BellRing,
    title: "یادآوری روزانه",
    text: "هر صبح آیه امروز میاد سراغت، با یه پیام کوتاه.",
  },
  {
    icon: Play,
    title: "تجربه های 10 دقیقه ای",
    text: "تو مترو، تو صف نونوایی، هر جا وقت اضافه داشتی.",
  },
  {
    icon: Medal,
    title: "رشته و نشان",
    text: "پیشرفتت ذخیره میشه و نشون هات رو جمع میکنی.",
  },
];

function AppScreen() {
  return (
    <div className="flex h-full flex-col gap-2.5 bg-white p-3 text-right" dir="rtl">
      <div className="flex items-center justify-between px-1 pt-1" dir="ltr">
        <span className="text-[10px] font-semibold">9:41</span>
        <span className="flex items-center gap-1" aria-hidden="true">
          <Signal className="size-3" />
          <Wifi className="size-3" />
          <BatteryMedium className="size-3.5" />
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold">سلام سارا!</p>
          <p className="text-[9px] text-black/60">بریم تجربه امروز؟</p>
        </div>
        <span className="grid size-8 place-items-center rounded-full bg-sky-400 text-[11px] font-semibold text-white">
          س
        </span>
      </div>
      <div className="flex items-center gap-2 rounded-[10px] bg-yellow-50 p-2">
        <span aria-hidden="true" className="anim-pop grid size-7 shrink-0 place-items-center rounded-lg bg-yellow-100">
          <Flame className="size-4 text-yellow-700" />
        </span>
        <div className="flex-1">
          <p className="text-[10px] font-semibold">رشته تو: 6 روز</p>
          <div className="mt-1 flex gap-0.5" aria-hidden="true">
            {[0, 1, 2, 3, 4, 5].map((d) => (
              <span key={d} className="anim-dot size-1.5 rounded-full bg-yellow-400" style={{ "--dot-delay": `${d * 200}ms` } as CSSProperties} />
            ))}
            <span className="size-1.5 rounded-full border border-gray-200" />
          </div>
        </div>
      </div>
      <div className="rounded-[10px] border border-gray-200 p-2">
        <p className="text-[9px] text-black/60">آیه امروز</p>
        <p className="anim-swap-a mt-0.5 text-[13px] leading-6">فَاذْکُرُونِی أَذْکُرْکُمْ</p>
        <p className="anim-swap-b text-[9px] leading-5 text-black/60">من رو یاد کنید تا شما رو یاد کنم.</p>
      </div>
      <div className="rounded-[10px] bg-sky-50 p-2">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold">حفظ سوره کوثر</p>
          <span className="rounded-full bg-sky-400 px-2 py-0.5 text-[8px] font-medium text-white">ادامه بده</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white" aria-hidden="true">
          <motion.span
            initial={{ width: "5%" }}
            whileInView={{ width: "68%" }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
            className="block h-full rounded-full bg-sky-400"
          />
        </div>
      </div>
      <div className="mt-auto flex items-center justify-around border-t border-gray-200 pt-2" aria-hidden="true">
        <Home className="size-4 text-sky-500" />
        <BookOpen className="size-4 text-black/30" />
        <Medal className="size-4 text-black/30" />
        <User className="size-4 text-black/30" />
      </div>
    </div>
  );
}

export default function PhoneMockup() {
  const reduce = useReducedMotion();
  const visualRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ["start end", "end start"],
  });
  const drift = useTransform(scrollYProgress, [0, 1], [28, -28]);

  return (
    <section id="app" aria-label="اپلیکیشن موبایل پلتفرم تدریس اسلامی رستادی" className="scroll-mt-24 overflow-hidden border-t border-gray-200 bg-green-50">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
        <Reveal>
          <SectionHeading
            accent="green"
            sparkles
            emoji="mobile-phone"
            align="start"
            eyebrow="اپلیکیشن پلتفرم تدریس اسلامی رستادی"
            title="پلتفرم تدریس اسلامی رستادی تو جیبته"
            text="قرآن و احکام، همیشه همراهت. گوشی رو بردار و روزی 10 دقیقه یاد بگیر."
          />
          <ul className="mt-8 flex flex-col gap-4">
            {bullets.map((b, i) => (
              <Reveal key={b.title} delay={i * 70}>
                <li className="flex items-start gap-3 rounded-[14px] border border-gray-200 bg-white p-4">
                  <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-[10px] bg-green-50">
                    <b.icon className="size-5 text-green-600" strokeWidth={1.8} />
                  </span>
                  <span>
                    <span className="block font-semibold">{b.title}</span>
                    <span className="block text-sm leading-7 text-black/60">{b.text}</span>
                  </span>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={120}>
            <div className="mt-8 flex items-center gap-3">
              <Button href="#lead">
                رایگان شروع کن
              </Button>
              <span className="inline-flex items-center gap-1.5 text-sm text-black/60">
                <Check className="size-4 text-green-600" aria-hidden="true" />
                بدون نصب، تو مرورگر
              </span>
            </div>
          </Reveal>
        </Reveal>
        <motion.div
          ref={visualRef}
          initial={reduce === true ? false : { opacity: 0, y: 48, rotate: 2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="relative mx-auto w-fit"
          aria-hidden="true"
        >
        <motion.div style={reduce === true ? undefined : { y: drift }}>
          <span className="anim-float absolute -right-6 top-16 z-10 hidden rounded-[10px] border border-gray-200 bg-white px-3 py-2 text-xs font-medium sm:block">
            نشان کوثر گرفتی!
          </span>
          <span className="anim-float absolute -left-8 bottom-24 z-10 hidden rounded-[10px] border border-gray-200 bg-white px-3 py-2 text-xs font-medium sm:block" style={{ animationDelay: "1.6s" }}>
            آفرین، 6 روز پشت سر هم
          </span>
          <TiltCard max={10} className="relative">
            <div className="relative w-[270px] rounded-[3rem] bg-black p-2.5 sm:w-[300px]">
              <span className="absolute -left-[2px] top-20 h-10 w-[3px] rounded-full bg-black" />
              <span className="absolute -left-[2px] top-32 h-14 w-[3px] rounded-full bg-black" />
              <span className="absolute -right-[2px] top-24 h-16 w-[3px] rounded-full bg-black" />
              <div className="relative h-[560px] overflow-hidden rounded-[2.5rem] bg-white sm:h-[600px]">
                <span className="absolute left-1/2 top-2.5 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />
                <AppScreen />
              </div>
            </div>
          </TiltCard>
        </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
