"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import { messages, type Locale } from "@/lib/i18n";

export default function Process({ locale }: { locale: Locale }) {
  const t = messages[locale].process;
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="procesi" className="scroll-mt-20 overflow-x-clip bg-paper py-24 md:py-36">
      <div className="mx-auto grid max-w-[1320px] gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading eyebrow={t.eyebrow} title={t.title} description={t.description} />
        </div>

        <ol ref={ref} className="relative grid gap-6">
          <div aria-hidden className="absolute bottom-8 left-[27px] top-8 w-px bg-ink/10" />
          <motion.div aria-hidden style={{ scaleY: lineScale }} className="absolute bottom-8 left-[27px] top-8 w-px origin-top bg-gold" />
          {t.steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex gap-6"
            >
              <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-paper font-semibold text-gold shadow-[0_0_0_8px_var(--color-paper)]">
                0{i + 1}
              </span>
              <div className="flex-1 rounded-3xl border border-ink/[0.07] bg-white p-7 shadow-[0_1px_0_rgba(8,19,31,0.04)] transition duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/5 md:p-9">
                <h3 className="text-2xl font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-ink/60">{step.description}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
