"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, PartyPopper, Rocket, Sparkles } from "lucide-react";
import { leadImage } from "@/lib/landing-data";
import Reveal from "@/components/ui/Reveal";
import HeadlineEmoji from "@/components/ui/HeadlineEmoji";
import { EASE, ParallaxPhoto } from "@/components/ui/motion";

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

export default function LeadForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [done, setDone] = useState(false);
  const reduce = useReducedMotion();

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: { name?: string; phone?: string } = {};
    if (name.trim().length < 2) {
      next.name = "اسمت رو بنویس تا بدونیم به چی صدات کنیم.";
    }
    if (!/^09\d{9}$/.test(phone.replace(/[\s-]/g, ""))) {
      next.phone = "شماره موبایل رو درست وارد کن. مثل 09123456789";
    }
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setDone(true);
    }
  };

  return (
    <section id="lead" className="scroll-mt-24 border-t border-gray-200">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid items-stretch gap-4 lg:grid-cols-2">
          <Reveal className="h-full">
            <div className="flex h-full flex-col justify-center gap-6 rounded-[14px] border border-gray-200 bg-sky-50 p-8 sm:p-10">
              <ParallaxPhoto
                src={leadImage.src}
                alt={leadImage.alt}
                sizes="(max-width: 1024px) 100vw, 50vw"
                frameClassName="h-44 rounded-[10px] bg-sky-100"
              />
              <div>
                <p className="inline-flex w-fit items-center gap-2 rounded-full bg-sky-400 px-4 py-1.5 text-sm font-medium text-white">
                  بزن بریم
                </p>
                <h2 className="mt-4 text-3xl font-semibold leading-snug">
                  <HeadlineEmoji name="student" /> اولین تجربه ات رو
                  <br />
                  رایگان شروع کن
                </h2>
                <p className="mt-3 leading-8 text-black/60">
                  فرم رو پر کن تا لینک شروع برات پیامک بشه. کمتر از یه دقیقه
                  طول میکشه و هیچ پولی لازم نیست.
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
          <Reveal delay={100} className="h-full">
            <div className="flex h-full flex-col justify-center rounded-[14px] border border-gray-200 bg-white p-8 sm:p-10">
              <AnimatePresence mode="wait" initial={false}>
                {done ? (
                  <motion.div
                    key="done"
                    role="status"
                    initial={reduce === true ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="flex flex-col items-center gap-3 text-center"
                  >
                    <span aria-hidden="true" className="anim-pop grid size-14 place-items-center rounded-full bg-green-100">
                      <PartyPopper className="size-7 text-green-600" strokeWidth={1.8} />
                    </span>
                    <h3 className="text-2xl font-semibold"><HeadlineEmoji name="party-popper" /> تمومه، تو تو لیستی</h3>
                    <p className="max-w-sm leading-8 text-black/60">
                      {name} عزیز، لینک شروع به شماره {phone} پیامک میشه.
                      اولین تجربه ات رو انجام بده و نشان شروع رو بگیر.
                    </p>
                    <a
                      href="#experiences"
                      className="mt-2 inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[10px] border border-gray-200 bg-white px-6 py-3 font-medium transition duration-700 hover:border-sky-400 hover:text-sky-700"
                    >
                      دیدن تجربه ها
                    </a>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={submit}
                    noValidate
                    aria-label="فرم شروع رایگان"
                    exit={reduce === true ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
                      <h3 className="text-2xl font-semibold">فرم شروع رایگان</h3>
                    <p className="mt-2 text-sm leading-7 text-black/60">
                      فقط نام و شماره موبایل. همین.
                    </p>
                    <div className="mt-6 flex flex-col gap-5">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="lead-name" className="font-medium">
                          نام و نام خانوادگی
                        </label>
                        <input
                          id="lead-name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          placeholder="مثلا سارا محمدی"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          aria-invalid={errors.name !== undefined}
                          aria-describedby={errors.name !== undefined ? "lead-name-error" : undefined}
                          className="min-h-11 rounded-[10px] border border-gray-200 bg-white px-4 py-3 text-base transition duration-700 placeholder:text-black/35 hover:border-sky-400 focus:border-sky-500 focus:outline-none"
                        />
                        {errors.name !== undefined ? (
                          <p id="lead-name-error" role="alert" className="text-sm text-red-600">
                            {errors.name}
                          </p>
                        ) : null}
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="lead-phone" className="font-medium">
                          شماره موبایل
                        </label>
                        <input
                          id="lead-phone"
                          name="phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          dir="ltr"
                          placeholder="09123456789"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          aria-invalid={errors.phone !== undefined}
                          aria-describedby={errors.phone !== undefined ? "lead-phone-error" : undefined}
                          className="min-h-11 rounded-[10px] border border-gray-200 bg-white px-4 py-3 text-left text-base transition duration-700 placeholder:text-black/35 hover:border-sky-400 focus:border-sky-500 focus:outline-none"
                        />
                        {errors.phone !== undefined ? (
                          <p id="lead-phone-error" role="alert" className="text-sm text-red-600">
                            {errors.phone}
                          </p>
                        ) : null}
                      </div>
                      <motion.button
                        type="submit"
                        whileTap={reduce === true ? undefined : { scale: 0.98 }}
                        className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[10px] bg-sky-400 px-6 py-3 text-base font-medium text-white transition duration-700 hover:bg-sky-500"
                      >
                        لینک شروع رو بفرست
                      </motion.button>
                      <p className="text-center text-xs leading-6 text-black/60">
                        رایگانه و هر وقت خواستی لغو میکنی.
                      </p>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
