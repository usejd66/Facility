import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { BroomSparkIcon } from "@/components/WhyIllustrations";
import { messages, type Locale } from "@/lib/i18n";
import { external, whatsappQuoteUrl } from "@/lib/whatsapp";

const photos = {
  office: { src: "/services/office.jpg", alt: { sq: "Pastrim i tavolinës së punës në zyrë", en: "Cleaning an office desk" } },
  hotel: { src: "/services/hotel.jpg", alt: { sq: "Pastruese duke rregulluar shtratin në një dhomë hoteli", en: "Housekeepers making a bed in a hotel room" } },
  commercial: { src: "/services/commercial.jpg", alt: { sq: "Pastrim i xhamave në një ambient tregtar", en: "Cleaning glass in a commercial space" } },
  home: { src: "/services/home.jpg", alt: { sq: "Pastrim i tavolinës në një banesë private", en: "Wiping a table in a private home" } },
} as const;

export default function Services({ locale }: { locale: Locale }) {
  const t = messages[locale].services;
  const [a, b, c, d] = t.title;

  return (
    <section id="sherbimet" className="relative isolate scroll-mt-20 overflow-hidden px-6 py-16 md:py-32">
      {/* black-and-white background photo, washed out like the reference */}
      <Image src="/services/bg.jpg" alt="" fill sizes="100vw" className="-z-20 object-cover object-[70%_40%] grayscale" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(242,242,240,0.94)_0%,rgba(242,242,240,0.86)_50%,rgba(242,242,240,0.72)_100%)]" />

      <div className="mx-auto max-w-[1180px]">
        <Reveal>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ink">
            <BroomSparkIcon className="h-5 w-5 text-gold" />
            {t.eyebrow}
          </p>
          <h2 className="mt-5 text-[clamp(2.2rem,4.4vw,3.6rem)] font-bold leading-[1.04] tracking-[-0.03em] text-ink">
            {a} <span className="text-gold">{b}</span>
            <br className="hidden sm:block" /> <span className="text-gold">{c}</span> {d}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
        <div className="-mx-6 mt-8 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:mx-0 sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 [&::-webkit-scrollbar]:hidden">
          {t.items.map((item) => {
            const photo = photos[item.image];
            return (
              <div key={item.title} className="h-full w-[80%] shrink-0 snap-start sm:w-auto">
                <article className="group flex h-full flex-col rounded-2xl bg-white p-2.5 shadow-[0_10px_30px_rgba(8,19,31,0.06)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(8,19,31,0.12)]">
                  <div className="relative">
                    <div className="relative aspect-[16/10.5] overflow-hidden rounded-xl">
                      <Image
                        src={photo.src}
                        alt={photo.alt[locale]}
                        fill
                        sizes="(min-width: 1024px) 280px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <a
                      href={whatsappQuoteUrl(locale)}
                      {...external}
                      aria-label={`${t.cta} ${item.title.toLowerCase()}`}
                      className="absolute -bottom-5 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-gold text-ink ring-4 ring-white transition-colors duration-300 hover:bg-ink hover:text-gold-light"
                    >
                      <ArrowRight size={18} strokeWidth={2.4} className="transition-transform duration-300 group-hover:-rotate-45" />
                    </a>
                  </div>
                  <div className="flex flex-1 flex-col px-3.5 pb-5 pt-7">
                    <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>
                    <p className="mt-4 border-t border-ink/10 pt-4 text-sm leading-relaxed text-ink/60">{item.description}</p>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
        </Reveal>
      </div>
    </section>
  );
}
