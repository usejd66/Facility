"use client";
import { useState } from "react";
import clsx from "clsx";
import { AnimatePresence, m } from "motion/react";
import { Minus, Plus } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { messages, type Locale } from "@/lib/i18n";

export default function Faq({ locale }: { locale: Locale }) {
  const t = messages[locale].faq;
  const [active, setActive] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 bg-white px-6 py-16 md:py-24">
      <div className="mx-auto max-w-[1120px]">
        <Reveal className="text-center">
          <h2 className="text-[clamp(1.8rem,3vw,2.6rem)] font-semibold tracking-[-0.03em] text-navy">{t.title}</h2>
          <p className="mx-auto mt-3 max-w-[460px] text-sm leading-relaxed text-ink/60">
            {t.description.split("\n").map((line, i) => (
              <span key={i}>
                {i > 0 && <br className="hidden md:block" />} {line}
              </span>
            ))}
          </p>
        </Reveal>

        <div className="mx-auto mt-8 max-w-[860px] md:mt-10">

          {/* accordion */}
          <div className="grid content-start gap-3">
            {t.items.map(([question, answer], i) => {
              const isOpen = active === i;
              return (
                <Reveal key={question} delay={i * 0.04}>
                  <div className={clsx("rounded-2xl transition-colors duration-300", isOpen ? "bg-[#f4efe2]" : "bg-[#f3f4f2] hover:bg-[#eceeeb]")}>
                    <h3>
                      <button
                        id={`faq-q-${i}`}
                        aria-expanded={isOpen}
                        aria-controls={`faq-a-${i}`}
                        onClick={() => setActive(isOpen ? null : i)}
                        className="flex w-full items-center justify-between gap-5 px-5 py-4 text-left md:px-6 md:py-[18px]"
                      >
                        <span className={clsx("text-base tracking-tight text-ink md:text-[17px]", isOpen ? "font-semibold" : "font-medium")}>{question}</span>
                        {isOpen ? (
                          <Minus size={20} strokeWidth={1.8} className="shrink-0 text-ink" aria-hidden />
                        ) : (
                          <Plus size={20} strokeWidth={1.8} className="shrink-0 text-ink" aria-hidden />
                        )}
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <m.div
                          id={`faq-a-${i}`}
                          role="region"
                          aria-labelledby={`faq-q-${i}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-[720px] px-5 pb-5 text-sm md:px-6 leading-relaxed text-ink/65">{answer}</p>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
