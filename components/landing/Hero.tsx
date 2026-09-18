"use client";

import { useRef, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Flame, Gamepad2, Medal, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";
import HeroHeadline from "@/components/landing/HeroHeadline";
import { EASE } from "@/components/ui/motion";
import { LEAD_FORM_HREF } from "@/lib/site";

const entrance = {
  hidden: { opacity: 0, y: 32 },
  visible: (d: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: d, ease: EASE },
  }),
};

export default function Hero() {
  const reduce = useReducedMotion();
  const visualRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ["start end", "end start"],
  });
  const floatY = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute -top-10 right-[8%] size-40 rounded-full bg-sky-100" />
        <span className="absolute top-40 left-[4%] hidden size-28 rounded-full bg-green-100 sm:block" />
        <span className="absolute bottom-10 right-[38%] hidden size-16 rounded-full bg-yellow-100 lg:block" />
      </div>
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pb-16 pt-10 sm:px-6 sm:pt-14 lg:grid-cols-2 lg:gap-8 lg:pb-24 lg:pt-16">
        <motion.div
          initial={reduce === true ? false : "hidden"}
          animate="visible"
          className="flex flex-col items-start gap-6"
        >
          <motion.p variants={entrance} custom={0} className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-black/60">
            <span aria-hidden="true" className="inline-block size-1.5 rounded-full bg-green-500" />
            آموزش قرآن و دینی، به سبک تو
          </motion.p>
          <motion.h1 variants={entrance} custom={0.1} className="text-4xl font-semibold leading-tight sm:text-5xl sm:leading-tight">
            <HeroHeadline />
          </motion.h1>
          <motion.p variants={entrance} custom={0.2} className="max-w-lg text-lg leading-9 text-black/60">
            پلتفرم تدریس اسلامی رستادی قرآن، احکام و معارف شیعه رو با تجربه های کوتاه و باحال یادت
            میده: سناریو واقعی، بازی و سوال. هر تجربه فقط 10 دقیقه طول میکشه
            و آخرش یه چیز واقعی یاد گرفتی.
          </motion.p>
          <motion.div variants={entrance} custom={0.3} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <motion.div whileTap={reduce === true ? undefined : { scale: 0.97 }}>
              <Button href={LEAD_FORM_HREF} className="w-full sm:w-auto">
                رایگان شروع کن
              </Button>
            </motion.div>
            <motion.div whileTap={reduce === true ? undefined : { scale: 0.97 }}>
              <Button href="#experiences" variant="secondary" className="w-full sm:w-auto">
                یه تجربه رو ببین
              </Button>
            </motion.div>
          </motion.div>
          <motion.ul variants={entrance} custom={0.4} className="flex flex-wrap items-center gap-2 text-sm">
            <li className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-black/60">
              شروع رایگان
            </li>
            <li className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-black/60">
              هر تجربه 10 دقیقه
            </li>
            <li className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-black/60">
              محتوای تایید شده
            </li>
          </motion.ul>
        </motion.div>
        <motion.div
          ref={visualRef}
          initial={reduce === true ? false : { opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease: EASE }}
          style={reduce === true ? undefined : { y: floatY }}
        >
          <div className="grid grid-cols-2 gap-4" aria-label="پیش نمایش تجربه یادگیری در پلتفرم تدریس اسلامی رستادی">
            <motion.div whileHover={reduce === true ? undefined : { y: -4 }} transition={{ duration: 0.3 }} className="anim-float col-span-2 rounded-[14px] border border-sky-200 bg-sky-50 p-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="grid size-11 place-items-center rounded-[10px] bg-sky-400 text-white">
                    <Gamepad2 className="size-5" />
                  </span>
                  <div>
                    <p className="font-semibold">سناریو امروز: نماز تو سفر</p>
                    <p className="text-sm text-black/60">تو مسافری و وقت نمازه، چیکار میکنی؟</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <span className="flex-1 rounded-[10px] border border-gray-200 bg-white px-3 py-2 text-center text-sm">
                  کامل میخونم
                </span>
                <span className="flex-1 rounded-[10px] border border-green-500 bg-white px-3 py-2 text-center text-sm font-medium">
                  شکسته میخونم
                </span>
              </div>
            </motion.div>
            <motion.div whileHover={reduce === true ? undefined : { y: -4 }} transition={{ duration: 0.3 }} className="rounded-[14px] border border-gray-200 bg-white p-5">
              <span aria-hidden="true" className="anim-pop grid size-11 place-items-center rounded-[10px] bg-yellow-100">
                <Flame className="size-5 text-yellow-700" />
              </span>
              <p className="mt-3 font-semibold">رشته تو: 6 روز</p>
              <p className="mt-1 text-sm text-black/60">فردا هم بیا، نشکنه</p>
              <div className="mt-3 flex gap-1" aria-hidden="true">
                {[0, 1, 2, 3, 4, 5].map((d) => (
                  <span
                    key={d}
                    style={{ "--dot-delay": `${d * 200}ms` } as CSSProperties}
                    className="anim-dot size-3 rounded-full bg-yellow-400"
                  />
                ))}
                <span className="size-3 rounded-full border border-gray-200" />
              </div>
            </motion.div>
            <motion.div whileHover={reduce === true ? undefined : { y: -4 }} transition={{ duration: 0.3 }} className="rounded-[14px] border border-gray-200 bg-white p-5">
              <span aria-hidden="true" className="anim-pop grid size-11 place-items-center rounded-[10px] bg-green-100" style={{ animationDelay: "1.2s" }}>
                <Medal className="size-5 text-green-600" />
              </span>
              <p className="mt-3 font-semibold">نشان سوره کوثر</p>
              <p className="mt-1 text-sm text-black/60">تازه گرفتیش، آفرین</p>
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs text-green-600">
                <Sparkles className="size-3.5" aria-hidden="true" />
                3 نشان از 12
              </span>
            </motion.div>
            <motion.div whileHover={reduce === true ? undefined : { y: -4 }} transition={{ duration: 0.3 }} className="col-span-2 rounded-[14px] border border-gray-200 bg-white p-5">
              <div className="flex items-center justify-between gap-4">
                <p className="font-semibold">آیه امروز</p>
                <span className="rounded-full bg-yellow-400 px-3 py-1 text-xs font-medium text-black">
                  کمتر از یک دقیقه
                </span>
              </div>
              <p className="anim-swap-a mt-3 text-xl leading-10">
                فَاذْکُرُونِی أَذْکُرْکُمْ وَاشْکُرُوا لِی وَلَا تَکْفُرُونِ
              </p>
              <p className="anim-swap-b mt-1 text-sm leading-7 text-black/60">
                پس من رو یاد کنید تا شما رو یاد کنم. (بقره، 152)
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
