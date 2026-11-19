import type { Metadata } from "next";
import { notFound } from "next/navigation";
import clsx from "clsx";
import { ArrowUpRight, Building2, Check, Clock, HardHat, House, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Process from "@/components/Process";
import Faq from "@/components/Faq";
import QuoteForm from "@/components/QuoteForm";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import Marquee from "@/components/ui/Marquee";
import SpotlightCard from "@/components/ui/SpotlightCard";
import ScrollText from "@/components/ui/ScrollText";
import Counter from "@/components/ui/Counter";
import Magnetic from "@/components/ui/Magnetic";
import { site } from "@/lib/data";
import { isLocale, messages, type Locale } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };

const serviceIcons = { home: House, office: Building2, construction: HardHat, deep: Sparkles } as const;

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
        <section id="about" className="scroll-mt-20 bg-paper px-6 py-28 md:py-40">
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
              className="mt-8 text-[clamp(1.9rem,4.4vw,3.9rem)] font-semibold leading-[1.12] tracking-[-0.03em]"
            />
            <Reveal delay={0.1} className="mt-12">
              <a href="#sherbimet" className="group inline-flex items-center gap-4 rounded-full border border-ink/15 py-1.5 pl-6 pr-1.5 font-medium transition hover:border-gold">
                {t.about.link}
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-gold-light transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight size={18} />
                </span>
              </a>
            </Reveal>
          </div>

          {/* Highlights */}
          <div className="mx-auto mt-24 grid max-w-[1320px] grid-cols-2 gap-px overflow-hidden rounded-[2rem] border border-ink/10 bg-ink/10 lg:grid-cols-4">
            {t.highlights.map((item, i) => (
              <Reveal key={item.label} delay={i * 0.08} className="bg-paper p-7 md:p-10">
                <p className="text-5xl font-semibold tracking-[-0.04em] md:text-7xl">
                  <Counter value={item.value} />
                  <span className="text-gold">{item.suffix}</span>
                </p>
                <p className="mt-3 text-sm text-ink/55 md:text-base">{item.label}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Services — bento */}
        <section id="sherbimet" className="grain relative scroll-mt-20 overflow-hidden bg-ink px-6 py-28 text-cream md:py-36">
          <div aria-hidden className="pointer-events-none absolute -right-40 top-0 h-[520px] w-[520px] rounded-full bg-gold/10 blur-[120px]" />
          <div className="relative mx-auto max-w-[1320px]">
            <div className="flex flex-wrap items-end justify-between gap-8">
              <SectionHeading eyebrow={t.services.eyebrow} title={t.services.title} description={t.services.description} dark />
            </div>
            <div className="mt-16 grid gap-4 md:grid-cols-6">
              {t.services.items.map((service, i) => {
                const Icon = serviceIcons[service.icon];
                const wide = i === 0 || i === 3;
                return (
                  <Reveal key={service.title} delay={i * 0.08} className={clsx(wide ? "md:col-span-4" : "md:col-span-2")}>
                    <SpotlightCard className="h-full rounded-[2rem] border border-cream/10 bg-navy/60 transition-colors duration-500 hover:border-gold/40">
                      <article className="flex h-full min-h-[300px] flex-col p-8 md:p-10">
                        <div className="flex items-start justify-between">
                          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/15 text-gold-light ring-1 ring-gold/30">
                            <Icon size={26} strokeWidth={1.6} />
                          </span>
                          <span className="text-sm font-medium text-cream/30">0{i + 1}</span>
                        </div>
                        <div className="mt-auto pt-12">
                          <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">{service.title}</h3>
                          <p className="mt-3 max-w-md leading-relaxed text-cream/60">{service.description}</p>
                        </div>
                      </article>
                    </SpotlightCard>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <Process locale={locale} />

        {/* Pricing */}
        <section id="cmimet" className="scroll-mt-20 bg-cream px-6 py-28 md:py-36">
          <div className="mx-auto max-w-[1320px]">
            <SectionHeading eyebrow={t.pricing.eyebrow} title={t.pricing.title} description={t.pricing.description} center />
            <div className="mt-16 grid items-stretch gap-5 lg:grid-cols-3">
              {t.pricing.packages.map((plan, i) => {
                const featured = i === 1;
                return (
                  <Reveal key={plan.name} delay={i * 0.1} className={clsx(featured && "lg:-my-4")}>
                    <SpotlightCard
                      color={featured ? "rgba(228,199,133,0.22)" : "rgba(196,151,59,0.14)"}
                      className={clsx(
                        "h-full rounded-[2rem] transition duration-500 hover:-translate-y-1",
                        featured ? "grain bg-ink text-cream shadow-2xl shadow-ink/30 ring-1 ring-gold/50" : "border border-ink/10 bg-white",
                      )}
                    >
                      <article className="flex h-full flex-col p-8 md:p-10">
                        <div className="flex items-center justify-between gap-4">
                          <h3 className="text-xl font-semibold">{plan.name}</h3>
                          {featured && (
                            <span className="rounded-full bg-gold px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ink">{t.pricing.popular}</span>
                          )}
                        </div>
                        <p className="mt-8">
                          {plan.price === "custom" ? (
                            <span className="text-4xl font-semibold tracking-tight">{t.pricing.custom}</span>
                          ) : (
                            <>
                              <span className={clsx("block text-sm", featured ? "text-cream/50" : "text-ink/50")}>{t.pricing.from}</span>
                              <span className={clsx("text-5xl font-semibold tracking-[-0.04em]", featured && "text-gold-gradient")}>{plan.price}</span>
                            </>
                          )}
                        </p>
                        <ul className={clsx("mt-8 grid gap-4 border-t pt-8 text-sm", featured ? "border-cream/10" : "border-ink/10")}>
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-3">
                              <span className={clsx("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full", featured ? "bg-gold text-ink" : "bg-ink/5 text-gold")}>
                                <Check size={12} strokeWidth={3} />
                              </span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                        <a
                          href="#oferta"
                          className={clsx(
                            "group mt-10 flex items-center justify-between rounded-full py-1.5 pl-6 pr-1.5 font-semibold transition",
                            featured ? "bg-gold text-ink hover:bg-gold-light" : "bg-ink text-cream hover:bg-navy-soft",
                          )}
                        >
                          {t.pricing.request}
                          <span className={clsx("flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-500 group-hover:rotate-45", featured ? "bg-ink text-gold-light" : "bg-gold text-ink")}>
                            <ArrowUpRight size={18} />
                          </span>
                        </a>
                      </article>
                    </SpotlightCard>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Areas */}
        <section className="overflow-hidden bg-paper py-28 md:py-36">
          <div className="mx-auto max-w-[1320px] px-6">
            <SectionHeading eyebrow={t.areas.eyebrow} title={t.areas.title} description={t.areas.note} />
          </div>
          <div className="mt-14 grid gap-4">
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
          <div className="mx-auto mt-10 flex max-w-[1320px] items-center gap-2 px-6 text-sm text-ink/50">
            <MapPin size={16} className="text-gold" /> {site.city}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="scroll-mt-20 bg-cream px-6 py-28 md:py-36">
          <div className="mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionHeading eyebrow={t.faq.eyebrow} title={t.faq.title} />
              <Reveal delay={0.1} className="mt-8">
                <a href={`https://wa.me/${site.phone}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-gold underline-offset-4 hover:underline">
                  {t.whatsapp.label} <ArrowUpRight size={16} />
                </a>
              </Reveal>
            </div>
            <Faq locale={locale} />
          </div>
        </section>

        {/* Quote */}
        <section id="oferta" className="grain relative scroll-mt-20 overflow-hidden bg-ink px-6 py-28 text-cream md:py-36">
          <div aria-hidden className="pointer-events-none absolute -left-40 bottom-0 h-[560px] w-[560px] rounded-full bg-gold/10 blur-[140px]" />
          <div className="relative mx-auto grid max-w-[1320px] items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
            <div className="lg:sticky lg:top-32">
              <SectionHeading eyebrow={t.quote.eyebrow} title={t.quote.title} description={t.quote.description} dark />
              <Reveal delay={0.15}>
                <ul className="mt-10 grid gap-4 text-cream/75">
                  <li>
                    <a href={`tel:+${site.phone}`} className="flex items-center gap-4 transition hover:text-gold-light">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/15"><Phone size={18} /></span>
                      {site.phoneDisplay}
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${site.email}`} className="flex items-center gap-4 transition hover:text-gold-light">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/15"><Mail size={18} /></span>
                      {site.email}
                    </a>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/15"><Clock size={18} /></span>
                    {t.footer.hours}
                  </li>
                </ul>
              </Reveal>
            </div>
            <QuoteForm locale={locale} />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative overflow-hidden bg-ink text-cream">
        <div className="mx-auto max-w-[1320px] px-6">
          <div className="flex flex-col items-start justify-between gap-10 border-t border-cream/10 py-20 md:flex-row md:items-end">
            <Reveal>
              <h2 className="max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-6xl">{t.footer.cta}</h2>
            </Reveal>
            <Magnetic>
              <a href="#oferta" className="group flex h-40 w-40 flex-col items-center justify-center gap-2 rounded-full bg-gold text-center font-semibold text-ink transition-colors hover:bg-gold-light md:h-48 md:w-48">
                <ArrowUpRight size={28} className="transition-transform duration-500 group-hover:rotate-45" />
                <span className="px-6 text-sm">{t.footer.ctaButton}</span>
              </a>
            </Magnetic>
          </div>

          <div className="grid gap-10 border-t border-cream/10 py-14 text-sm md:grid-cols-4">
            <div className="md:col-span-2">
              <p className="text-2xl font-semibold">Rambo<span className="text-gold">.al</span></p>
              <p className="mt-3 max-w-sm text-cream/55">{t.footer.description}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{t.footer.navigate}</p>
              <ul className="mt-4 grid gap-2 text-cream/70">
                {[
                  [t.nav.services, "#sherbimet"],
                  [t.nav.process, "#procesi"],
                  [t.nav.pricing, "#cmimet"],
                  [t.nav.faq, "#faq"],
                ].map(([label, href]) => (
                  <li key={href}><a href={href} className="transition hover:text-gold-light">{label}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{t.footer.contact}</p>
              <ul className="mt-4 grid gap-2 text-cream/70">
                <li><a href={`tel:+${site.phone}`} className="transition hover:text-gold-light">{site.phoneDisplay}</a></li>
                <li><a href={`mailto:${site.email}`} className="transition hover:text-gold-light">{site.email}</a></li>
                <li>{t.footer.hours}</li>
              </ul>
            </div>
          </div>
        </div>

        <p aria-hidden className="pointer-events-none select-none text-center text-[24vw] font-bold leading-[0.75] tracking-[-0.06em] text-cream/[0.04]">
          RAMBO
        </p>
        <div className="mx-auto flex max-w-[1320px] flex-wrap justify-between gap-2 px-6 py-6 text-xs text-cream/40">
          <span>© {new Date().getFullYear()} Rambo Facility Management. {t.footer.rights}</span>
          <span>{site.city}, Shqipëri</span>
        </div>
      </footer>
    </>
  );
}
