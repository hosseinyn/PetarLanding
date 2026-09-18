"use client";

import { useEffect, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, PartyPopper, Rocket, Sparkles } from "lucide-react";
import Confetti from "react-confetti";
import { ToastContainer, toast } from "react-toastify";
import { leadImage } from "@/lib/landing-data";
import Reveal from "@/components/ui/Reveal";
import Pill from "@/components/ui/Pill";
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

import type { LeadFormErrors, LeadFormValues } from "@/types/lead";

import {
  FULL_NAME_MAX_LENGTH,
  MESSAGE_MAX_LENGTH,
  SCHOOL_NAME_MAX_LENGTH,
  gradeOptions,
  gradePayloadLabels,
  normalizePhone,
  normalizeText,
  roleOptions,
  validateFullName,
  validateGrade,
  validateLeadForm,
  validateMessage,
  validatePhone,
  validateRole,
  validateSchoolName,
} from "@/lib/validators/lead";

const fieldIds: Record<keyof LeadFormValues, string> = {
  fullName: "lead-name",
  role: "lead-role",
  grade: "lead-grade",
  schoolName: "lead-school",
  phone: "lead-phone",
  message: "lead-message",
};

const inputClassName =
  "min-h-11 rounded-[10px] border border-gray-200 bg-white px-4 py-3 text-base outline-none transition duration-700 placeholder:text-black/35 hover:border-sky-400 focus:border-sky-500 focus:outline-none";

const errorInputClassName = "border-red-400 hover:border-red-400 focus:border-red-500";

export default function LeadForm() {
  const [values, setValues] = useState<LeadFormValues>({
    fullName: "",
    role: "",
    grade: "none",
    schoolName: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const sync = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  useEffect(() => {
    if (!celebrate) {
      return;
    }
    const timer = setTimeout(() => setCelebrate(false), 4000);
    return () => clearTimeout(timer);
  }, [celebrate]);

  const update = (key: keyof LeadFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (prev[key] === undefined) {
        return prev;
      }
      const next = { ...prev };
      delete next[key];
      if (key === "role") {
        delete next.grade;
      }
      return next;
    });
  };

  const validateAll = (v: LeadFormValues): LeadFormErrors => {
    return validateLeadForm(v);
  };

  const blurField = (key: keyof LeadFormValues) => {
    let error: string | undefined;
    if (key === "fullName") {
      error = validateFullName(values.fullName);
    } else if (key === "role") {
      error = validateRole(values.role);
    } else if (key === "grade") {
      error = validateGrade(values.grade, values.role);
    } else if (key === "schoolName") {
      error = validateSchoolName(values.schoolName);
    } else if (key === "phone") {
      error = validatePhone(values.phone);
    } else {
      error = validateMessage(values.message);
    }
    setErrors((prev) => {
      const next = { ...prev };
      if (error === undefined) {
        delete next[key];
      } else {
        next[key] = error;
      }
      return next;
    });
  };

  const focusFirstError = (next: LeadFormErrors) => {
    const order: (keyof LeadFormValues)[] = [
      "fullName",
      "role",
      "grade",
      "schoolName",
      "phone",
      "message",
    ];
    for (const key of order) {
      if (next[key] !== undefined) {
        document.getElementById(fieldIds[key])?.focus();
        break;
      }
    }
  };

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) {
      return;
    }
    const next = validateAll(values);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      focusFirstError(next);
      return;
    }
    const normalizedName = normalizeText(values.fullName);
    const normalizedSchool = normalizeText(values.schoolName);
    const normalizedPhone =
      values.phone.trim() === "" ? "" : normalizePhone(values.phone);
    const roleLabel =
      roleOptions.find((o) => o.value === values.role)?.label ?? values.role;
    const gradeLabel = gradePayloadLabels[values.grade] ?? values.grade;
    setSubmitting(true);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: normalizedName,
          role: roleLabel,
          grade: gradeLabel,
          schoolName: normalizedSchool,
          phone: normalizedPhone,
          message: values.message.trim(),
        }),
      });
      let data: { success?: boolean; error?: string } = {};
      try {
        data = (await response.json()) as {
          success?: boolean;
          error?: string;
        };
      } catch {
        data = {};
      }
      if (!response.ok || data.success !== true) {
        throw new Error(
          typeof data.error === "string" && data.error.length > 0
            ? data.error
            : "مشکلی پیش اومد. یه بار دیگه امتحان کن."
        );
      }
      setValues({
        fullName: normalizedName,
        role: values.role,
        grade: values.grade,
        schoolName: normalizedSchool,
        phone: normalizedPhone,
        message: values.message.trim(),
      });
      setDone(true);
      if (reduce !== true) {
        setCelebrate(true);
      }
      toast.success(
        `${normalizedName} عزیز، پیش ثبت نامت ثبت شد. به زودی خبرت میکنیم.`
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "مشکلی پیش اومد. یه بار دیگه امتحان کن."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const selectedRoleLabel =
    roleOptions.find((o) => o.value === values.role)?.label ?? "";
  const selectedGradeLabel =
    gradeOptions.find((o) => o.value === values.grade)?.label ?? "";
  const messageCount = values.message.trim().length;

  return (
    <section id="lead" className="scroll-mt-24 border-t border-gray-200">
      <ToastContainer position="top-right" autoClose={5000} closeOnClick pauseOnHover rtl theme="light" />
      {celebrate && windowSize.width > 0 ? (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100]">
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={250}
            recycle
          />
        </div>
      ) : null}
      <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="grid items-stretch gap-5 lg:grid-cols-2">
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
                  رایگان شروع کن
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
          <Reveal delay={100} className="h-full">
            <div className="flex h-full flex-col justify-center border border-gray-200 bg-white p-8 sm:p-10 card-r-md">
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
                      {values.fullName} عزیز، پیش ثبت نامت ثبت شد.
                      {values.phone !== ""
                        ? ` به شماره ${values.phone} خبرت میکنیم.`
                        : " به زودی خبرت میکنیم."}
                    </p>
                    {selectedRoleLabel !== "" ? (
                      <p className="rounded-[10px] border border-gray-200 bg-white px-4 py-3 text-sm leading-7 text-black/60">
                        نقش: {selectedRoleLabel}
                        {values.grade !== "none" ? ` | پایه: ${selectedGradeLabel}` : null} | مدرسه: {values.schoolName}
                      </p>
                    ) : null}
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
                    aria-label="فرم پیش ثبت نام"
                    exit={reduce === true ? { opacity: 0 } : { opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: EASE }}
                  >
                      <h3 className="text-2xl font-semibold">فرم پیش ثبت نام</h3>
                    <p className="mt-2 text-sm leading-7 text-black/60">
                      چند تا سوال کوتاه. کمتر از دو دقیقه طول میکشه.
                    </p>
                    <div className="mt-6 flex flex-col gap-5">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="lead-name" className="font-medium">
                          نام و نام خانوادگی
                        </label>
                        <input
                          id="lead-name"
                          name="fullName"
                          type="text"
                          autoComplete="name"
                          maxLength={FULL_NAME_MAX_LENGTH}
                          placeholder="مثلا سارا محمدی"
                          value={values.fullName}
                          onChange={(e) => update("fullName", e.target.value)}
                          onBlur={() => blurField("fullName")}
                          aria-invalid={errors.fullName !== undefined}
                          aria-describedby={errors.fullName !== undefined ? "lead-name-error" : undefined}
                          className={`${inputClassName} ${errors.fullName !== undefined ? errorInputClassName : ""}`}
                        />
                        {errors.fullName !== undefined ? (
                          <p id="lead-name-error" role="alert" className="text-sm text-red-600">
                            {errors.fullName}
                          </p>
                        ) : null}
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="lead-role" className="font-medium">
                            نقش تو
                          </label>
                          <select
                            id="lead-role"
                            name="role"
                            value={values.role}
                            onChange={(e) => update("role", e.target.value)}
                            onBlur={() => blurField("role")}
                            aria-invalid={errors.role !== undefined}
                            aria-describedby={errors.role !== undefined ? "lead-role-error" : undefined}
                            className={`${inputClassName} cursor-pointer ${values.role === "" ? "text-black/35" : ""} ${errors.role !== undefined ? errorInputClassName : ""}`}
                          >
                            <option value="">انتخاب کن...</option>
                            {roleOptions.map((o) => (
                              <option key={o.value} value={o.value}>
                                {o.label}
                              </option>
                            ))}
                          </select>
                          {errors.role !== undefined ? (
                            <p id="lead-role-error" role="alert" className="text-sm text-red-600">
                              {errors.role}
                            </p>
                          ) : null}
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="lead-grade" className="font-medium">
                            پایه تحصیلی
                          </label>
                          <select
                            id="lead-grade"
                            name="grade"
                            value={values.grade}
                            onChange={(e) => update("grade", e.target.value)}
                            onBlur={() => blurField("grade")}
                            aria-invalid={errors.grade !== undefined}
                            aria-describedby={errors.grade !== undefined ? "lead-grade-error" : "lead-grade-hint"}
                            className={`${inputClassName} cursor-pointer ${errors.grade !== undefined ? errorInputClassName : ""}`}
                          >
                            {gradeOptions.map((o) => (
                              <option key={o.value} value={o.value}>
                                {o.label}
                              </option>
                            ))}
                          </select>
                          {errors.grade !== undefined ? (
                            <p id="lead-grade-error" role="alert" className="text-sm text-red-600">
                              {errors.grade}
                            </p>
                          ) : (
                            <p id="lead-grade-hint" className="text-xs leading-6 text-black/60">
                              اختیاریه. اگه دانش آموز نیستی همون هیچکدام بمونه.
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="lead-school" className="font-medium">
                          نام مدرسه
                        </label>
                        <input
                          id="lead-school"
                          name="schoolName"
                          type="text"
                          autoComplete="organization"
                          maxLength={SCHOOL_NAME_MAX_LENGTH}
                          placeholder="مثلا دبیرستان فرزانگان"
                          value={values.schoolName}
                          onChange={(e) => update("schoolName", e.target.value)}
                          onBlur={() => blurField("schoolName")}
                          aria-invalid={errors.schoolName !== undefined}
                          aria-describedby={errors.schoolName !== undefined ? "lead-school-error" : undefined}
                          className={`${inputClassName} ${errors.schoolName !== undefined ? errorInputClassName : ""}`}
                        />
                        {errors.schoolName !== undefined ? (
                          <p id="lead-school-error" role="alert" className="text-sm text-red-600">
                            {errors.schoolName}
                          </p>
                        ) : null}
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="lead-phone" className="flex flex-wrap items-center gap-2 font-medium">
                          شماره موبایل
                          <span className="text-xs font-normal text-black/60">
                            اختیاری ولی پیشنهاد میشه
                          </span>
                        </label>
                        <input
                          id="lead-phone"
                          name="phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          dir="ltr"
                          maxLength={17}
                          placeholder="09123456789"
                          value={values.phone}
                          onChange={(e) => update("phone", e.target.value)}
                          onBlur={() => blurField("phone")}
                          aria-invalid={errors.phone !== undefined}
                          aria-describedby={errors.phone !== undefined ? "lead-phone-error" : "lead-phone-hint"}
                          className={`${inputClassName} text-left ${errors.phone !== undefined ? errorInputClassName : ""}`}
                        />
                        {errors.phone !== undefined ? (
                          <p id="lead-phone-error" role="alert" className="text-sm text-red-600">
                            {errors.phone}
                          </p>
                        ) : (
                          <p id="lead-phone-hint" className="text-xs leading-6 text-black/60">
                            اگه بنویسی خبرهای پتار زودتر بهت میرسه.
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="lead-message" className="flex flex-wrap items-center gap-2 font-medium">
                          پیام یا درخواست
                          <span className="text-xs font-normal text-black/60">
                            اختیاری
                          </span>
                        </label>
                        <textarea
                          id="lead-message"
                          name="message"
                          rows={4}
                          maxLength={MESSAGE_MAX_LENGTH}
                          placeholder="هر حرف یا پیشنهادی برای پتار داری اینجا بنویس..."
                          value={values.message}
                          onChange={(e) => update("message", e.target.value)}
                          onBlur={() => blurField("message")}
                          aria-invalid={errors.message !== undefined}
                          aria-describedby={errors.message !== undefined ? "lead-message-error" : "lead-message-count"}
                          className={`${inputClassName} resize-none leading-7 ${errors.message !== undefined ? errorInputClassName : ""}`}
                        />
                        {errors.message !== undefined ? (
                          <p id="lead-message-error" role="alert" className="text-sm text-red-600">
                            {errors.message}
                          </p>
                        ) : (
                          <p id="lead-message-count" className="text-xs leading-6 text-black/60">
                            {messageCount}/{MESSAGE_MAX_LENGTH}
                          </p>
                        )}
                      </div>
                      <motion.button
                        type="submit"
                        disabled={submitting}
                        aria-disabled={submitting}
                        whileTap={reduce === true || submitting ? undefined : { scale: 0.98 }}
                        className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[10px] bg-sky-400 px-6 py-3 text-base font-medium text-white outline-none transition duration-700 hover:bg-sky-500 focus:outline-none disabled:cursor-wait disabled:opacity-60 disabled:hover:bg-sky-400"
                      >
                        {submitting ? "داریم ثبت میکنیم..." : "پیش ثبت نام رو ثبت کن"}
                      </motion.button>
                      <p className="text-center text-xs leading-6 text-black/60">
                        پیش ثبت نام رایگانه و هیچ تعهدی نداره.
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
