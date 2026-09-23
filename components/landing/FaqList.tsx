"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { FAQ } from "@/types/landing";
import Reveal from "@/components/ui/Reveal";
import { EASE } from "@/lib/motion";

export default function FaqList({ items }: { items: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <div className="mt-8 flex flex-col gap-2.5">
      {items.map((faq, i) => {
        const isOpen = open === i;
        return (
          <Reveal key={faq.question} delay={i * 40}>
            <div
              className={`overflow-hidden border bg-white transition duration-700 card-r-md ${
                isOpen ? "border-sky-300" : "border-gray-200"
              }`}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${i}`}
                className="flex min-h-11 w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-start font-medium transition duration-700 hover:text-sky-700"
              >
                <span>{faq.question}</span>
                <motion.span
                  aria-hidden="true"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="grid shrink-0 place-items-center"
                >
                  <ChevronDown className="size-5" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    id={`faq-panel-${i}`}
                    role="region"
                    initial={reduce === true ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    animate={reduce === true ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                    exit={reduce === true ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    <p className="px-5 pb-5 leading-8 text-black/60">{faq.answer}</p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
