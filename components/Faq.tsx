"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { messages, type Locale } from "@/lib/i18n";

export default function Faq({ locale }: { locale: Locale }) {
  const items = messages[locale].faq.items;
  const [active, setActive] = useState<number | null>(0);

  return (
    <div className="grid gap-3">
      {items.map(([question, answer], i) => {
        const isOpen = active === i;
        return (
          <div
            key={question}
            className={`rounded-3xl border transition-colors duration-500 ${isOpen ? "border-gold/40 bg-white shadow-xl shadow-ink/5" : "border-ink/10 bg-white/50 hover:bg-white"}`}
          >
            <h3>
              <button
                id={`faq-q-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-a-${i}`}
                onClick={() => setActive(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left text-lg font-semibold tracking-tight md:px-8 md:text-xl"
              >
                {question}
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.35 }}
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${isOpen ? "bg-gold text-ink" : "bg-ink/5 text-ink"}`}
                  aria-hidden
                >
                  <Plus size={18} />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-a-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-7 leading-relaxed text-ink/60 md:px-8">{answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
