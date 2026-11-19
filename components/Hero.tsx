"use client";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";
import { messages, type Locale } from "@/lib/i18n";
import { external, whatsappQuoteUrl } from "@/lib/whatsapp";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero({ locale }: { locale: Locale }) {
  const t = messages[locale].hero;
  const words = t.title.split(" ");
  const split = Math.ceil(words.length / 2);

  return (
    <section className="relative isolate overflow-hidden bg-cream">
      {/* soft brand glow */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_75%_40%,rgba(228,199,133,0.35),transparent_70%)]" />

      <div className="mx-auto grid max-w-[1320px] items-center gap-2 px-6 pt-24 lg:min-h-[100svh] lg:grid-cols-[1.15fr_0.85fr] lg:gap-6 lg:pt-20">
        <div className="relative z-10 pt-6 lg:py-0">
          <h1 className="text-[clamp(2.75rem,5.2vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-ink">
            {words.map((word, i) => (
              <span key={i} className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className={`inline-block ${i >= split ? "text-gold" : ""}`}
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.06, ease }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease }}
            className="mt-5 max-w-[460px] text-base leading-relaxed text-ink/65 sm:text-lg"
          >
            {t.description}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7, ease }} className="mt-7 sm:mt-9">
            <Magnetic>
              <a
                href={whatsappQuoteUrl(locale)}
                {...external}
                className="group inline-flex items-center gap-3 rounded-full bg-gold py-2 pl-7 pr-2 font-semibold text-ink transition-colors hover:bg-gold-light"
              >
                {t.cta}
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-gold-light transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight size={20} />
                </span>
              </a>
            </Magnetic>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease }}
          className="relative -mx-6 h-[360px] self-end sm:h-[480px] lg:mx-0 lg:h-[88svh]"
        >
          {/* mix-blend-multiply melts the photo's white studio background into the cream hero */}
          <Image
            src="/hero-cleaner.jpg"
            alt={locale === "sq" ? "Punonjëse pastrimi e buzëqeshur me produkte pastrimi" : "Smiling cleaner holding a basket of cleaning products"}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-[50%_15%] mix-blend-multiply"
            style={{
              maskImage:
                "linear-gradient(to right, transparent, #000 18%, #000 82%, transparent), linear-gradient(to bottom, transparent, #000 12%, #000 78%, transparent)",
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
