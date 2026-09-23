"use client";

import { useEffect, useState, type FormEvent } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BadgeCheck, ChevronDown, PartyPopper, Plus, Rocket, Sparkles, Star, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { leadImage } from "@/lib/landing-data";
import Reveal from "@/components/ui/Reveal";
import Pill from "@/components/ui/Pill";
import HeadlineEmoji from "@/components/ui/HeadlineEmoji";
import { EASE } from "@/lib/motion";
import { ParallaxPhoto } from "@/components/ui/ParallaxPhoto";

const Confetti = dynamic(() => import("react-confetti"), { ssr: false });
const ToastContainer = dynamic(
  () => import("react-toastify").then((m) => m.ToastContainer),
  { ssr: false }
);

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

import type { Friend, LeadFormErrors, LeadFormValues } from "@/types/lead";

import {
  ABOUT_MAX_LENGTH,
  FULL_NAME_MAX_LENGTH,
  MAX_FRIENDS,
  MESSAGE_MAX_LENGTH,
  SCHOOL_NAME_MAX_LENGTH,
  freeTimeActivityOptions,
  gradeOptions,
  gradePayloadLabels,
  normalizePhone,
  normalizeText,
  roleOptions,
  traitOptions,
  validateAboutYourself,
  validateCompetitionRating,
  validateFreeTimeActivities,
  validateFullName,
  validateGrade,
  validateLeadForm,
  validateMessage,
  validatePhone,
  validateRole,
  validateSchoolName,
  validateTraits,
} from "@/lib/validators/lead";

const fieldIds: Record<keyof LeadFormValues, string> = {
  fullName: "lead-name",
  role: "lead-role",
  grade: "lead-grade",
  schoolName: "lead-school",
  phone: "lead-phone",
  message: "lead-message",
  traits: "lead-traits",
  competitionRating: "lead-competition",
  freeTimeActivities: "lead-activities",
  aboutYourself: "lead-about",
  friends: "lead-friends",
};

const inputClassName =
  "min-h-11 rounded-[10px] border border-gray-200 bg-white px-4 py-3 text-base outline-none transition duration-700 placeholder:text-black/35 hover:border-sky-400 focus:border-sky-500 focus:outline-none";

const errorInputClassName = "border-red-400 hover:border-red-400 focus:border-red-500";

const tagPalettes = [
  { idle: "border-sky-200 bg-sky-50 text-sky-800 hover:border-sky-400", active: "border-sky-500 bg-sky-100 font-medium text-sky-900" },
  { idle: "border-amber-200 bg-amber-50 text-amber-800 hover:border-amber-400", active: "border-amber-500 bg-amber-100 font-medium text-amber-900" },
  { idle: "border-emerald-200 bg-emerald-50 text-emerald-800 hover:border-emerald-400", active: "border-emerald-500 bg-emerald-100 font-medium text-emerald-900" },
  { idle: "border-rose-200 bg-rose-50 text-rose-800 hover:border-rose-400", active: "border-rose-500 bg-rose-100 font-medium text-rose-900" },
  { idle: "border-violet-200 bg-violet-50 text-violet-800 hover:border-violet-400", active: "border-violet-500 bg-violet-100 font-medium text-violet-900" },
  { idle: "border-orange-200 bg-orange-50 text-orange-800 hover:border-orange-400", active: "border-orange-500 bg-orange-100 font-medium text-orange-900" },
  { idle: "border-teal-200 bg-teal-50 text-teal-800 hover:border-teal-400", active: "border-teal-500 bg-teal-100 font-medium text-teal-900" },
  { idle: "border-indigo-200 bg-indigo-50 text-indigo-800 hover:border-indigo-400", active: "border-indigo-500 bg-indigo-100 font-medium text-indigo-900" },
  { idle: "border-pink-200 bg-pink-50 text-pink-800 hover:border-pink-400", active: "border-pink-500 bg-pink-100 font-medium text-pink-900" },
  { idle: "border-lime-200 bg-lime-50 text-lime-800 hover:border-lime-400", active: "border-lime-500 bg-lime-100 font-medium text-lime-900" },
  { idle: "border-cyan-200 bg-cyan-50 text-cyan-800 hover:border-cyan-400", active: "border-cyan-500 bg-cyan-100 font-medium text-cyan-900" },
  { idle: "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-800 hover:border-fuchsia-400", active: "border-fuchsia-500 bg-fuchsia-100 font-medium text-fuchsia-900" },
];

export default function LeadForm() {
  const [values, setValues] = useState<LeadFormValues>({
    fullName: "",
    role: "",
    grade: "none",
    schoolName: "",
    phone: "",
    message: "",
    traits: [],
    competitionRating: "",
    freeTimeActivities: [],
    aboutYourself: "",
    friends: [],
  });
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showFriends, setShowFriends] = useState(false);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
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

  const update = (key: keyof LeadFormValues, value: string | number | string[] | Friend[]) => {
    setValues((prev) => ({ ...prev, [key]: value }) as LeadFormValues);
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

  const addFriend = () => {
    if (values.friends.length >= MAX_FRIENDS) {
      return;
    }
    setValues((prev) => ({
      ...prev,
      friends: [...prev.friends, { fullName: "", schoolName: "" }],
    }));
    setErrors((prev) => {
      if (prev.friends === undefined && prev.friendItems === undefined) {
        return prev;
      }
      const next = { ...prev };
      delete next.friends;
      return next;
    });
  };

  const updateFriend = (index: number, key: keyof Friend, value: string) => {
    setValues((prev) => ({
      ...prev,
      friends: prev.friends.map((f, i) => (i === index ? { ...f, [key]: value } : f)),
    }));
    setErrors((prev) => {
      if (prev.friendItems === undefined) {
        return prev;
      }
      const nextItems = [...prev.friendItems];
      const current = nextItems[index];
      if (current === undefined) {
        return prev;
      }
      const updated = { ...current };
      delete updated[key];
      if (Object.keys(updated).length === 0) {
        nextItems.splice(index, 1);
      } else {
        nextItems[index] = updated;
      }
      const next = { ...prev };
      if (nextItems.some((item) => item.fullName !== undefined || item.schoolName !== undefined)) {
        next.friendItems = nextItems;
      } else {
        delete next.friendItems;
      }
      return next;
    });
  };

  const removeFriend = (index: number) => {
    setValues((prev) => ({
      ...prev,
      friends: prev.friends.filter((_, i) => i !== index),
    }));
    setErrors((prev) => {
      if (prev.friendItems === undefined && prev.friends === undefined) {
        return prev;
      }
      const next = { ...prev };
      delete next.friends;
      if (next.friendItems !== undefined) {
        const nextItems = next.friendItems.filter((_, i) => i !== index);
        if (nextItems.some((item) => item.fullName !== undefined || item.schoolName !== undefined)) {
          next.friendItems = nextItems;
        } else {
          delete next.friendItems;
        }
      }
      return next;
    });
  };

  const toggleMulti = (key: "traits" | "freeTimeActivities", option: string) => {
    const current = values[key];
    update(
      key,
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option]
    );
  };

  const blurField = (key: keyof LeadFormValues) => {
    if (key === "friends") {
      return;
    }
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
    } else if (key === "message") {
      error = validateMessage(values.message);
    } else if (key === "traits") {
      error = validateTraits(values.traits);
    } else if (key === "competitionRating") {
      error = validateCompetitionRating(values.competitionRating);
    } else if (key === "freeTimeActivities") {
      error = validateFreeTimeActivities(values.freeTimeActivities);
    } else {
      error = validateAboutYourself(values.aboutYourself);
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

  const blurFriend = (index: number, key: keyof Friend) => {
    const friend = values.friends[index];
    if (friend === undefined) {
      return;
    }
    const error =
      key === "fullName"
        ? validateFullName(friend.fullName)
        : validateSchoolName(friend.schoolName);
    setErrors((prev) => {
      const next = { ...prev };
      const items: { fullName?: string; schoolName?: string }[] = [...(next.friendItems ?? [])];
      while (items.length <= index) {
        items.push({});
      }
      const current = items[index] ?? {};
      const updated = { ...current };
      if (error === undefined) {
        delete updated[key];
      } else {
        updated[key] = error;
      }
      items[index] = updated;
      if (items.some((item) => item.fullName !== undefined || item.schoolName !== undefined)) {
        next.friendItems = items;
      } else {
        delete next.friendItems;
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
      "traits",
      "competitionRating",
      "freeTimeActivities",
      "aboutYourself",
      "friends",
    ];
    for (const key of order) {
      if (next[key] !== undefined) {
        document.getElementById(fieldIds[key])?.focus();
        break;
      }
    }
    if (next.friendItems !== undefined) {
      const index = next.friendItems.findIndex(
        (item) => item.fullName !== undefined || item.schoolName !== undefined
      );
      if (index >= 0) {
        const item = next.friendItems[index];
        const target =
          item?.fullName !== undefined
            ? document.getElementById(`lead-friend-${index}-name`)
            : document.getElementById(`lead-friend-${index}-school`);
        target?.focus();
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
      const moreError =
        next.traits !== undefined ||
        next.competitionRating !== undefined ||
        next.freeTimeActivities !== undefined ||
        next.aboutYourself !== undefined;
      const friendsError =
        next.friends !== undefined || next.friendItems !== undefined;
      if (friendsError && !showFriends) {
        setShowFriends(true);
      }
      if (moreError && !showMore) {
        setShowMore(true);
        setTimeout(() => focusFirstError(next), 350);
      } else if (friendsError && !showFriends) {
        setTimeout(() => focusFirstError(next), 350);
      } else {
        focusFirstError(next);
      }
      return;
    }
    const normalizedName = normalizeText(values.fullName);
    const normalizedSchool = normalizeText(values.schoolName);
    const normalizedPhone = normalizePhone(values.phone);
    const normalizedFriends = values.friends.map((f) => ({
      fullName: normalizeText(f.fullName),
      schoolName: normalizeText(f.schoolName),
    }));
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
          traits: values.traits,
          competitionRating: values.competitionRating,
          freeTimeActivities: values.freeTimeActivities,
          aboutYourself: values.aboutYourself.trim(),
          friends: normalizedFriends,
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
        traits: values.traits,
        competitionRating: values.competitionRating,
        freeTimeActivities: values.freeTimeActivities,
        aboutYourself: values.aboutYourself.trim(),
        friends: normalizedFriends,
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
  const aboutCount = values.aboutYourself.trim().length;
  const activeRating =
    hoverRating ?? (values.competitionRating === "" ? 0 : values.competitionRating);

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
                        {values.fullName} عزیز، پیش ثبت نامت ثبت شد. به شماره {values.phone} خبرت میکنیم.
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
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.target as HTMLElement | null)?.tagName === "INPUT") {
                        e.preventDefault();
                      }
                    }}
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
                        <label htmlFor="lead-name" className="flex flex-wrap items-center gap-1 font-medium">
                          نام و نام خانوادگی
                          <span aria-hidden="true" className="text-red-500">*</span>
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
                          required
                          aria-required="true"
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
                          <label htmlFor="lead-role" className="flex flex-wrap items-center gap-1 font-medium">
                            نقش تو
                            <span aria-hidden="true" className="text-red-500">*</span>
                          </label>
                          <select
                            id="lead-role"
                            name="role"
                            value={values.role}
                            onChange={(e) => update("role", e.target.value)}
                            onBlur={() => blurField("role")}
                            required
                            aria-required="true"
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
                        <label htmlFor="lead-school" className="flex flex-wrap items-center gap-1 font-medium">
                          نام مدرسه
                          <span aria-hidden="true" className="text-red-500">*</span>
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
                          required
                          aria-required="true"
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
                          <span aria-hidden="true" className="text-red-500">*</span>
                          <span className="text-xs font-normal text-black/60">
                            از شماره موبایل شما برای اطلاع رسانی پتار و مسابقات استفاده میکنیم
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
                          required
                          aria-required="true"
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
                            از شماره موبایل شما برای اطلاع رسانی پتار و مسابقات استفاده میکنیم
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
                      <div className="flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => setShowMore((s) => !s)}
                          aria-expanded={showMore}
                          aria-controls="lead-more"
                          className="inline-flex min-h-11 w-full cursor-pointer items-center justify-between gap-2 rounded-[10px] border border-gray-200 bg-sky-50 px-4 py-3 text-sm font-medium transition duration-700 hover:border-sky-400 hover:text-sky-700 focus:outline-none"
                        >
                          <span className="flex flex-col items-start gap-1 text-right">
                            <span>اگر میخوای درباره خودت بیشتر بهمون بگی</span>
                            <span className="text-xs font-normal text-black/60">
                              اگر اینارو پر کنی، در آینده پتار امتیاز ویژه داری
                            </span>
                          </span>
                          <motion.span
                            aria-hidden="true"
                            animate={{ rotate: showMore ? 180 : 0 }}
                            transition={{ duration: 0.25, ease: EASE }}
                            className="grid shrink-0 place-items-center"
                          >
                            <ChevronDown className="size-5" strokeWidth={1.8} />
                          </motion.span>
                        </button>
                        <AnimatePresence initial={false}>
                          {showMore ? (
                            <motion.div
                              key="lead-more-panel"
                              id="lead-more"
                              initial={reduce === true ? { opacity: 0 } : { opacity: 0, height: 0 }}
                              animate={reduce === true ? { opacity: 1 } : { opacity: 1, height: "auto" }}
                              exit={reduce === true ? { opacity: 0 } : { opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: EASE }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-5 pt-4">
                                <div className="flex flex-col gap-2">
                                  <span id="lead-traits-label" className="flex flex-wrap items-center gap-2 font-medium">
                                    صفات خودت
                                    <span className="text-xs font-normal text-black/60">
                                      اختیاری، چند تا میتونی انتخاب کنی
                                    </span>
                                  </span>
                                  <div
                                    id="lead-traits"
                                    role="group"
                                    aria-labelledby="lead-traits-label"
                                    tabIndex={-1}
                                    className="flex flex-wrap gap-2 outline-none"
                                  >
                                    {traitOptions.map((t, i) => {
                                      const selected = values.traits.includes(t);
                                      const palette = tagPalettes[i % tagPalettes.length];
                                      return (
                                        <button
                                          key={t}
                                          type="button"
                                          role="checkbox"
                                          aria-checked={selected}
                                          onClick={() => toggleMulti("traits", t)}
                                          className={`min-h-9 cursor-pointer rounded-full border px-4 py-1.5 text-sm outline-none transition duration-300 focus:outline-none ${selected ? palette.active : palette.idle}`}
                                        >
                                          {t}
                                        </button>
                                      );
                                    })}
                                  </div>
                                  {errors.traits !== undefined ? (
                                    <p role="alert" className="text-sm text-red-600">
                                      {errors.traits}
                                    </p>
                                  ) : null}
                                </div>
                                <div className="flex flex-col gap-2">
                                  <span id="lead-competition-label" className="flex flex-wrap items-center gap-2 font-medium">
                                    چقدر دوست داری به رقابت و مسابقه بیای؟
                                    <span className="text-xs font-normal text-black/60">
                                      اختیاری
                                    </span>
                                  </span>
                                  <div
                                    id="lead-competition"
                                    role="radiogroup"
                                    aria-labelledby="lead-competition-label"
                                    dir="ltr"
                                    tabIndex={-1}
                                    className="flex items-center justify-center gap-1 outline-none"
                                  >
                                    {[1, 2, 3, 4].map((n) => {
                                      const active = activeRating >= n;
                                      return (
                                        <button
                                          key={n}
                                          type="button"
                                          role="radio"
                                          aria-checked={values.competitionRating === n}
                                          aria-label={`${n} ستاره`}
                                          onClick={() => update("competitionRating", values.competitionRating === n ? "" : n)}
                                          onMouseEnter={() => setHoverRating(n)}
                                          onMouseLeave={() => setHoverRating(null)}
                                          onFocus={() => setHoverRating(n)}
                                          onBlur={() => setHoverRating(null)}
                                          className="cursor-pointer rounded p-1 outline-none transition duration-300 focus:outline-none"
                                        >
                                          <Star
                                            aria-hidden="true"
                                            className={`size-7 transition duration-300 ${active ? "fill-amber-400 text-amber-400" : "fill-transparent text-gray-300"}`}
                                            strokeWidth={1.8}
                                          />
                                        </button>
                                      );
                                    })}
                                  </div>
                                  {errors.competitionRating !== undefined ? (
                                    <p role="alert" className="text-sm text-red-600">
                                      {errors.competitionRating}
                                    </p>
                                  ) : null}
                                </div>
                                <div className="flex flex-col gap-2">
                                  <span id="lead-activities-label" className="flex flex-wrap items-center gap-2 font-medium">
                                    زمان خالیت رو چیکار میکنی؟
                                    <span className="text-xs font-normal text-black/60">
                                      اختیاری، چند تا میتونی انتخاب کنی
                                    </span>
                                  </span>
                                  <div
                                    id="lead-activities"
                                    role="group"
                                    aria-labelledby="lead-activities-label"
                                    tabIndex={-1}
                                    className="flex flex-wrap gap-2 outline-none"
                                  >
                                    {freeTimeActivityOptions.map((a, i) => {
                                      const selected = values.freeTimeActivities.includes(a);
                                      const palette = tagPalettes[i % tagPalettes.length];
                                      return (
                                        <button
                                          key={a}
                                          type="button"
                                          role="checkbox"
                                          aria-checked={selected}
                                          onClick={() => toggleMulti("freeTimeActivities", a)}
                                          className={`min-h-9 cursor-pointer rounded-full border px-4 py-1.5 text-sm outline-none transition duration-300 focus:outline-none ${selected ? palette.active : palette.idle}`}
                                        >
                                          {a}
                                        </button>
                                      );
                                    })}
                                  </div>
                                  {errors.freeTimeActivities !== undefined ? (
                                    <p role="alert" className="text-sm text-red-600">
                                      {errors.freeTimeActivities}
                                    </p>
                                  ) : null}
                                </div>
                                <div className="flex flex-col gap-2">
                                  <label htmlFor="lead-about" className="flex flex-wrap items-center gap-2 font-medium">
                                    هرچی دوست داری درباره خودت به ما بگو.
                                    <span className="text-xs font-normal text-black/60">
                                      اختیاری
                                    </span>
                                  </label>
                                  <textarea
                                    id="lead-about"
                                    name="aboutYourself"
                                    rows={3}
                                    maxLength={ABOUT_MAX_LENGTH}
                                    placeholder="مثلا علاقه هات، اخلاقت، یا هر چیزی که دوست داری بدونیم..."
                                    value={values.aboutYourself}
                                    onChange={(e) => update("aboutYourself", e.target.value)}
                                    onBlur={() => blurField("aboutYourself")}
                                    aria-invalid={errors.aboutYourself !== undefined}
                                    aria-describedby={errors.aboutYourself !== undefined ? "lead-about-error" : "lead-about-count"}
                                    className={`${inputClassName} resize-none leading-7 ${errors.aboutYourself !== undefined ? errorInputClassName : ""}`}
                                  />
                                  {errors.aboutYourself !== undefined ? (
                                    <p id="lead-about-error" role="alert" className="text-sm text-red-600">
                                      {errors.aboutYourself}
                                    </p>
                                  ) : (
                                    <p id="lead-about-count" className="text-xs leading-6 text-black/60">
                                      {aboutCount}/{ABOUT_MAX_LENGTH}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          type="button"
                          onClick={() => setShowFriends((s) => !s)}
                          aria-expanded={showFriends}
                          aria-controls="lead-friends"
                          className="inline-flex min-h-11 w-full cursor-pointer items-center justify-between gap-2 rounded-[10px] border border-gray-200 bg-sky-50 px-4 py-3 text-sm font-medium transition duration-700 hover:border-sky-400 hover:text-sky-700 focus:outline-none"
                        >
                          <span className="flex flex-col items-start gap-1 text-right">
                            <span>اگر مسابقه برگزار کردیم، دوست داری با کی تیم بشی؟</span>
                            <span className="text-xs font-normal text-black/60">
                              اختیاریه. اگه خواستی هم تیمی هات رو معرفی کن
                            </span>
                          </span>
                          <motion.span
                            aria-hidden="true"
                            animate={{ rotate: showFriends ? 180 : 0 }}
                            transition={{ duration: 0.25, ease: EASE }}
                            className="grid shrink-0 place-items-center"
                          >
                            <ChevronDown className="size-5" strokeWidth={1.8} />
                          </motion.span>
                        </button>
                        <AnimatePresence initial={false}>
                          {showFriends ? (
                            <motion.div
                              key="lead-friends-panel"
                              id="lead-friends"
                              initial={reduce === true ? { opacity: 0 } : { opacity: 0, height: 0 }}
                              animate={reduce === true ? { opacity: 1 } : { opacity: 1, height: "auto" }}
                              exit={reduce === true ? { opacity: 0 } : { opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: EASE }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-4 pt-4">
                                <p className="text-sm leading-7 text-black/60">
                                  هم تیمی تو میتونه هرکسی باشه، دوست، فامیل یا هرچی. اصلا مدرسه یا پایه مهم نیست، فقط دانش آموز بین هفتم تا دوازدهم باشه. حتی میتونه کاملا از یه شهر دیگه باشه، ولی شهرشو در اسم مدرسه بنویس
                                </p>
                                {values.friends.length === 0 ? (
                                  <p className="rounded-[10px] border border-dashed border-gray-200 bg-gray-50 px-4 py-3 text-sm leading-7 text-black/60">
                                    هنوز کسی رو اضافه نکردی. اگه دوست داری با دکمه زیر یه هم تیمی اضافه کن، اگه نه همینجوری ثبت کن.
                                  </p>
                                ) : (
                                  <div className="flex flex-col gap-3">
                                    {values.friends.map((friend, index) => {
                                      const itemError = errors.friendItems?.[index];
                                      return (
                                        <div
                                          key={index}
                                          className="flex flex-col gap-3 rounded-[10px] border border-gray-200 bg-gray-50/60 p-4"
                                        >
                                          <div className="flex items-center justify-between gap-2">
                                            <span className="text-sm font-medium">هم تیمی {index + 1}</span>
                                            <button
                                              type="button"
                                              onClick={() => removeFriend(index)}
                                              aria-label={`حذف هم تیمی ${index + 1}`}
                                              className="inline-flex min-h-9 cursor-pointer items-center gap-1 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-black/60 transition duration-300 hover:border-red-300 hover:text-red-600 focus:outline-none"
                                            >
                                              <Trash2 className="size-4" strokeWidth={1.8} />
                                              حذف
                                            </button>
                                          </div>
                                          <div className="flex flex-col gap-2">
                                            <label htmlFor={`lead-friend-${index}-name`} className="text-sm font-medium">
                                              نام و نام خانوادگی
                                            </label>
                                            <input
                                              id={`lead-friend-${index}-name`}
                                              name={`friends[${index}].fullName`}
                                              type="text"
                                              autoComplete="off"
                                              maxLength={FULL_NAME_MAX_LENGTH}
                                              placeholder="مثلا حسین حسینی"
                                              value={friend.fullName}
                                              onChange={(e) => updateFriend(index, "fullName", e.target.value)}
                                              onBlur={() => blurFriend(index, "fullName")}
                                              aria-invalid={itemError?.fullName !== undefined}
                                              aria-describedby={itemError?.fullName !== undefined ? `lead-friend-${index}-name-error` : undefined}
                                              className={`${inputClassName} ${itemError?.fullName !== undefined ? errorInputClassName : ""}`}
                                            />
                                            {itemError?.fullName !== undefined ? (
                                              <p id={`lead-friend-${index}-name-error`} role="alert" className="text-sm text-red-600">
                                                {itemError.fullName}
                                              </p>
                                            ) : null}
                                          </div>
                                          <div className="flex flex-col gap-2">
                                            <label htmlFor={`lead-friend-${index}-school`} className="text-sm font-medium">
                                              نام مدرسه
                                            </label>
                                            <input
                                              id={`lead-friend-${index}-school`}
                                              name={`friends[${index}].schoolName`}
                                              type="text"
                                              autoComplete="off"
                                              maxLength={SCHOOL_NAME_MAX_LENGTH}
                                              placeholder="مثلا دبیرستان نمونه تهران"
                                              value={friend.schoolName}
                                              onChange={(e) => updateFriend(index, "schoolName", e.target.value)}
                                              onBlur={() => blurFriend(index, "schoolName")}
                                              aria-invalid={itemError?.schoolName !== undefined}
                                              aria-describedby={itemError?.schoolName !== undefined ? `lead-friend-${index}-school-error` : undefined}
                                              className={`${inputClassName} ${itemError?.schoolName !== undefined ? errorInputClassName : ""}`}
                                            />
                                            {itemError?.schoolName !== undefined ? (
                                              <p id={`lead-friend-${index}-school-error`} role="alert" className="text-sm text-red-600">
                                                {itemError.schoolName}
                                              </p>
                                            ) : null}
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                )}
                                {errors.friends !== undefined ? (
                                  <p role="alert" className="text-sm text-red-600">
                                    {errors.friends}
                                  </p>
                                ) : null}
                                {values.friends.length >= MAX_FRIENDS ? (
                                  <p className="text-sm leading-7 text-black/60">
                                    به حداکثر 14 هم تیمی رسیدی.
                                  </p>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={addFriend}
                                    className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-dashed border-sky-300 bg-white px-4 py-2.5 text-sm font-medium text-sky-700 transition duration-300 hover:border-sky-500 hover:bg-sky-50 focus:outline-none"
                                  >
                                    <Plus className="size-5" strokeWidth={1.8} />
                                    افزودن هم تیمی
                                    <span className="text-xs font-normal text-black/50">
                                      {values.friends.length}/{MAX_FRIENDS}
                                    </span>
                                  </button>
                                )}
                              </div>
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
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
