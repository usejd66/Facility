"use client";
import { useState } from "react";
import clsx from "clsx";
import { AnimatePresence, m } from "motion/react";
import { Minus, Plus } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/lib/data";
import { messages, type Locale } from "@/lib/i18n";

/** Two overlapping speech bubbles, the front one with a "?" (white on the card). */
function QuestionBubbles({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 112 104" className={className} aria-hidden>
      {/* back bubble */}
      <path d="M70 34c19 0 34 13 34 30 0 7-3 14-8 19l4 15-16-8c-4 2-9 3-14 3-19 0-34-13-34-29s15-30 34-30z" fill="#fff" />
      {/* gap ring so the front bubble reads on top */}
      <path d="M44 6C22 6 5 21 5 40c0 8 3 15 8 21L8 78l19-8c5 2 11 3 17 3 22 0 39-15 39-33S66 6 44 6z" fill="none" stroke="#112a40" strokeWidth="7" />
      {/* front bubble */}
      <path d="M44 6C22 6 5 21 5 40c0 8 3 15 8 21L8 78l19-8c5 2 11 3 17 3 22 0 39-15 39-33S66 6 44 6z" fill="#fff" />
      <text x="44" y="54" textAnchor="middle" fontSize="40" fontWeight="800" fontFamily="system-ui, sans-serif" fill="#112a40">?</text>
    </svg>
  );
}

export default function Faq({ locale }: { locale: Locale }) {
  const t = messages[locale].faq;
  const wa = messages[locale].whatsapp;
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

        <div className="mt-8 grid gap-5 md:mt-10 lg:grid-cols-[0.42fr_1fr] lg:gap-10">
          {/* contact card */}
          <Reveal className="order-last h-full lg:order-none">
            <div className="relative flex h-full lg:min-h-[360px] flex-col items-center justify-center overflow-hidden rounded-3xl bg-[radial-gradient(130%_75%_at_100%_105%,rgba(212,168,77,0.95)_0%,rgba(196,151,59,0.45)_35%,transparent_65%),linear-gradient(165deg,#0e2033_0%,#16374f_100%)] px-7 py-9 text-center text-white shadow-[0_20px_50px_rgba(8,19,31,0.18)]">
              {/* faint sparkle watermark */}
              <svg viewBox="0 0 24 24" aria-hidden className="pointer-events-none absolute bottom-6 left-1/2 h-56 w-56 -translate-x-1/2 text-white/[0.07]">
                <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" fill="currentColor" />
              </svg>
              <QuestionBubbles className="relative h-[72px] w-[72px]" />
              <h3 className="relative mt-auto pt-6 text-2xl lg:pt-8 font-medium leading-tight tracking-tight">{t.contactTitle}</h3>
              <p className="relative mt-3 max-w-[300px] text-[13px] leading-relaxed text-white/85">{t.contactText}</p>
              <a
                href={`https://wa.me/${site.phone}?text=${encodeURIComponent(wa.message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="relative mt-6 w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink shadow-lg transition hover:bg-cream"
              >
                {t.contactButton}
              </a>
            </div>
          </Reveal>

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
