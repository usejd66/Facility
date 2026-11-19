import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, MapPin } from "lucide-react";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import WhyUs from "@/components/WhyUs";
import Services from "@/components/Services";
import Faq from "@/components/Faq";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Marquee from "@/components/ui/Marquee";
import ScrollText from "@/components/ui/ScrollText";
import Counter from "@/components/ui/Counter";
import { site } from "@/lib/data";
import { isLocale, messages, type Locale } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const t = messages[localeParam];
  return {
    title: t.metadata.title,
    description: t.metadata.description,
    alternates: {
      canonical: `/${localeParam}`,
      languages: { sq: "/sq", en: "/en", "x-default": "/sq" },
    },
    openGraph: {
      title: t.metadata.title,
      description: t.metadata.description,
      url: `/${localeParam}`,
      locale: t.metadata.ogLocale,
      alternateLocale: localeParam === "sq" ? ["en_US"] : ["sq_AL"],
      type: "website",
      images: ["/hero-cleaner.jpg"],
    },
  };
}

export default async function Home({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const t = messages[locale];

  return (
    <>
      <main>
        <Hero locale={locale} />

        <Brands title={t.brands.title} />

        {/* About */}
        <section id="about" className="scroll-mt-20 bg-paper px-6 py-16 md:py-40">
          <div className="mx-auto max-w-[1100px]">
            <Reveal>
              <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                <span className="h-px w-8 bg-current" aria-hidden />
                {t.about.eyebrow}
              </p>
            </Reveal>
            <ScrollText
              text={t.about.title}
              muted={t.about.continuation}
              className="mt-6 text-[clamp(1.55rem,4.4vw,3.9rem)] md:mt-8 font-semibold leading-[1.12] tracking-[-0.03em]"
            />
            <Reveal delay={0.1} className="mt-8 md:mt-12">
              <a href="#sherbimet" className="group inline-flex items-center gap-4 rounded-full border border-ink/15 py-1.5 pl-6 pr-1.5 font-medium transition hover:border-gold">
                {t.about.link}
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-gold-light transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight size={18} />
                </span>
              </a>
            </Reveal>
          </div>

          {/* Highlights */}
          <div className="mx-auto mt-12 grid max-w-[1320px] grid-cols-2 md:mt-24 gap-px overflow-hidden rounded-[2rem] border border-ink/10 bg-ink/10 lg:grid-cols-4">
            {t.highlights.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08} className="bg-paper p-5 sm:p-7 md:p-10">
                <p className="whitespace-nowrap text-[2rem] font-semibold tracking-[-0.04em] sm:text-5xl md:text-7xl">
                  <Counter value={item.value} />
                  <span className="text-gold">{item.suffix}</span>
                </p>
                <p className="mt-2 text-[13px] leading-snug text-ink/55 sm:mt-3 sm:text-sm md:text-base">{item.label}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <WhyUs locale={locale} />

        <Services locale={locale} />

        {/* Areas */}
        <section id="zonat" className="scroll-mt-20 overflow-hidden bg-paper py-16 md:py-36">
          <div className="mx-auto max-w-[1320px] px-6">
            <SectionHeading eyebrow={t.areas.eyebrow} title={t.areas.title} description={t.areas.note} />
          </div>
          <div className="mt-8 grid gap-2 md:mt-14 md:gap-4">
            <Marquee
              items={t.areas.names}
              duration={50}
              separator="•"
              itemClassName="text-[clamp(2.5rem,6vw,5.5rem)] font-semibold tracking-[-0.04em] text-ink"
            />
            <Marquee
              items={[...t.areas.names].reverse()}
              duration={55}
              reverse
              separator="•"
              itemClassName="text-[clamp(2.5rem,6vw,5.5rem)] font-semibold tracking-[-0.04em] text-transparent [-webkit-text-stroke:1.5px_var(--color-gold)]"
            />
          </div>
          <div className="mx-auto mt-6 flex max-w-[1320px] items-center gap-2 px-6 text-sm text-ink/50 md:mt-10">
            <MapPin size={16} className="text-gold" /> {site.city}
          </div>
        </section>

        <Faq locale={locale} />

      </main>

    </>
  );
}
