import Image from "next/image";
import { ArrowUpRight, Check, Phone } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import InView from "@/components/ui/InView";
import RiseWords, { wordCount } from "@/components/ui/RiseWords";
import Magnetic from "@/components/ui/Magnetic";
import { site } from "@/lib/data";
import { messages, type Locale } from "@/lib/i18n";
import { external, whatsappQuoteUrl } from "@/lib/whatsapp";

/**
 * Closing band before the footer: gold half with the headline and actions,
 * cream half with a real Rambo employee (white studio background melts into the cream).
 */
export default function FinalCta({ locale }: { locale: Locale }) {
  const t = messages[locale].finalCta;

  return (
    <section className="grid overflow-hidden lg:grid-cols-[1.05fr_0.95fr]">
      {/* gold half */}
      <div className="relative bg-gold px-6 py-16 text-ink sm:px-10 md:py-24 lg:pl-[max(1.5rem,calc((100vw-1180px)/2))] lg:pr-14">
        <Reveal>
          <InView as="h2" className="max-w-[13ch] text-[clamp(2.6rem,6vw,5.6rem)] font-bold leading-[0.98] tracking-[-0.045em]">
            <RiseWords text={`${t.title[0]} ${t.title[1]}`} />
          </InView>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/75">{t.text}</p>
        </Reveal>

        <Reveal delay={0.08} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-6">
          <Magnetic strength={0.35}>
            <a
              href={whatsappQuoteUrl(locale)}
              {...external}
              className="group flex h-36 w-36 flex-col items-center justify-center gap-2 rounded-full bg-ink text-center font-semibold text-cream shadow-[0_20px_40px_rgba(8,19,31,0.25)] transition-colors duration-300 hover:bg-navy-soft md:h-44 md:w-44"
            >
              <ArrowUpRight size={30} className="text-gold-light transition-transform duration-500 group-hover:rotate-45" />
              <span className="px-4 text-sm leading-tight md:text-base">{t.whatsapp}</span>
            </a>
          </Magnetic>
          <a href={`tel:+${site.phone}`} className="group inline-flex items-center gap-3 text-lg font-semibold">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink/80 transition-colors group-hover:bg-ink group-hover:text-gold-light">
              <Phone size={20} aria-hidden />
            </span>
            <span>
              {t.call}
              <span className="block text-sm font-medium text-ink/65">{site.phoneDisplay}</span>
            </span>
          </a>
        </Reveal>

        <Reveal delay={0.14}>
          <ul className="mt-12 flex flex-col gap-3 border-t border-ink/15 pt-7 text-[15px] font-medium sm:flex-row sm:flex-wrap sm:gap-x-7">
            {t.points.map((point) => (
              <li key={point} className="flex items-center gap-2.5 sm:whitespace-nowrap">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-gold-light">
                  <Check size={12} strokeWidth={3} aria-hidden />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* cream half: a real Rambo employee */}
      <div className="relative h-[280px] bg-cream sm:h-[420px] lg:h-auto lg:min-h-[560px]">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(55%_50%_at_50%_50%,rgba(228,199,133,0.4),transparent_70%)]" />
        <div className="absolute inset-x-0 bottom-0 top-5 sm:top-8 md:top-12">
        <Image
          src="/team/punonjese-rambo.jpg"
          alt={t.photoAlt}
          fill
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="object-cover object-top mix-blend-multiply"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent), linear-gradient(to bottom, #000 80%, transparent)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
        </div>
      </div>
    </section>
  );
}
