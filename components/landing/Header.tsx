"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/landing-data";
import Button from "@/components/ui/Button";
import { EASE } from "@/components/ui/motion";
import { LEAD_FORM_HREF } from "@/lib/site";
import { getIcon } from "@/lib/icons";

import Image from "next/image";

const sectionIds = ["concept", "experiences", "topics", "paths", "ai", "faq"];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    for (const id of sectionIds) {
      const node = document.getElementById(id);
      if (node !== null) {
        observer.observe(node);
      }
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative z-50 mx-auto mt-3 w-[calc(100%-1.5rem)] max-w-6xl">
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="rounded-full border border-gray-200 bg-white"
      >
        <div className="flex h-16 w-full items-center justify-between gap-3 px-3 sm:px-4">
          <a href="#top" className="flex items-center gap-2.5" aria-label="پلتفرم تدریس اسلامی رستادی، بازگشت به بالای صفحه">

            <Image src="/images/logo.webp" width={32} height={32} alt="فناوری های آموزشی رستادی" title="فناوری های آموزشی رستادی" />

            <span className="hidden flex-col leading-none min-[400px]:flex">
              <span className="text-lg font-semibold">پلتفرم تدریس اسلامی رستادی</span>
              <span className="text-xs text-black/60">از آیه تا زندگی</span>
            </span>
          </a>
          <nav aria-label="ناوبری اصلی" className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => {
              const Icon = getIcon(link.icon);
              const isActive = active === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-2 text-sm transition duration-700 ${
                    isActive
                      ? "bg-sky-50 text-sky-700"
                      : "text-black/60 hover:bg-sky-50 hover:text-black"
                  }`}
                >
                  <Icon className="size-4" aria-hidden="true" strokeWidth={2} />
                  {link.label}
                </a>
              );
            })}
          </nav>
          <div className="hidden lg:block">
            <Button href={LEAD_FORM_HREF} className="min-h-10 rounded-full px-5 py-2 text-sm">
              پیش ثبت نام کن
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "بستن منو" : "باز کردن منو"}
            className="grid size-11 cursor-pointer place-items-center rounded-full border border-gray-200 transition duration-700 hover:border-sky-400 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </motion.header>
      <AnimatePresence>
        {open ? (
          <motion.nav
            aria-label="ناوبری موبایل"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="mt-2 rounded-3xl border border-gray-200 bg-white px-3 pb-4 pt-2 lg:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((link) => {
                const Icon = getIcon(link.icon);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-2.5 rounded-2xl px-3 py-3 text-base transition duration-700 hover:bg-sky-50 ${
                        active === link.href ? "bg-sky-50 text-sky-700" : ""
                      }`}
                    >
                      <Icon className="size-5" aria-hidden="true" strokeWidth={2} />
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
            <div onClick={() => setOpen(false)}>
              <Button href={LEAD_FORM_HREF} className="mt-2 w-full rounded-full" ariaLabel="شروع رایگان در پلتفرم تدریس اسلامی رستادی">
                پیش ثبت نام کن
              </Button>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
