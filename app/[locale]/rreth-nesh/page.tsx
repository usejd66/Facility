import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight, HeartHandshake, MapPin, Quote, ReceiptText, ShieldCheck, Sparkles } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import { site } from "@/lib/data";
import { isLocale, messages, type Locale } from "@/lib/i18n";
import { external, whatsappQuoteUrl } from "@/lib/whatsapp";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = messages[locale].aboutPage;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: `/${locale}/rreth-nesh`,
      languages: { sq: "/sq/rreth-nesh", en: "/en/rreth-nesh", "x-default": "/sq/rreth-nesh" },
    },
    openGraph: { title: t.metaTitle, description: t.metaDescription, url: `/${locale}/rreth-nesh`, type: "website", images: ["/about/team-wide.jpg"] },
  };
}

const valueIcons = [ShieldCheck, Sparkles, ReceiptText, HeartHandshake];

/** One bento tile: rounded block that fades in on scroll and lifts slightly on hover. */
function Tile({ className = "", delay = 0, children }: { className?: string; delay?: number; children: React.ReactNode }) {
  return (
    <Reveal delay={delay} className={`group relative overflow-hidden rounded-[26px] transition-transform duration-500 hover:-translate-y-1 ${className}`}>
      {children}
    </Reveal>
  );
}

function StatTile({ value, suffix, label, className, delay }: { value: string; suffix: string; label: string; className: string; delay: number }) {
  return (
    <Tile delay={delay} className={`flex flex-col justify-between p-6 md:p-7 ${className}`}>
      <p className="whitespace-nowrap text-[clamp(1.9rem,9vw,2.5rem)] font-semibold leading-none tracking-[-0.05em] md:text-6xl">
        <Counter value={value} />
        <span className="text-gold">{suffix}</span>
      </p>
      <p className="mt-6 max-w-[16ch] text-sm leading-snug opacity-70">{label}</p>
    </Tile>
  );
}

export default async function AboutPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const all = messages[locale];
  const t = all.aboutPage;
  const [a, b, c] = t.title;
  const h = all.highlights;

  return (
    <main className="bg-paper px-4 pb-20 pt-28 md:px-6 md:pb-28 md:pt-36">
      <div className="mx-auto max-w-[1180px]">
        {/* ── heading ── */}
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <nav aria-label="Breadcrumb" className="hero-fade text-sm text-ink/50">
              <a href={`/${locale}`} className="transition-colors hover:text-ink">{all.nav.home}</a>
              <span className="mx-2" aria-hidden>/</span>
              <span aria-current="page" className="text-ink">{t.breadcrumb}</span>
            </nav>
            <h1
              className="hero-fade mt-5 text-[clamp(2.4rem,5.2vw,4.6rem)] font-semibold leading-[1] tracking-[-0.04em] text-ink"
              style={{ animationDelay: "0.06s" }}
            >
              {a} <span className="text-gold">{b}</span> {c}
            </h1>
          </div>
          <p className="hero-fade text-lg leading-relaxed text-ink/65 md:col-span-5 md:pb-2" style={{ animationDelay: "0.14s" }}>
            {t.lead}
          </p>
        </div>

        {/* ── bento grid ── */}
        <div className="mt-10 grid auto-rows-[minmax(170px,auto)] grid-cols-2 gap-3 md:mt-14 md:gap-4 lg:grid-cols-4 lg:auto-rows-[210px]">
          {/* big photo */}
          <Tile className="col-span-2 row-span-2 min-h-[340px] lg:col-start-1 lg:row-start-1">
            <Image src="/about/team-wide.jpg" alt={t.photoAlt} fill priority sizes="(min-width: 1024px) 590px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
            <p className="absolute inset-x-6 bottom-6 flex items-center gap-2 text-sm font-medium text-cream">
              <MapPin size={16} className="text-gold-light" aria-hidden />
              Rambo Facility Management · {site.city}
            </p>
          </Tile>

          {/* stats */}
          <StatTile {...h[0]} className="bg-ink text-cream lg:col-start-3 lg:row-start-1" delay={0.05} />
          <StatTile {...h[1]} className="bg-gold-light text-ink lg:col-start-4 lg:row-start-1" delay={0.1} />

          {/* philosophy quote */}
          <Tile delay={0.1} className="col-span-2 flex flex-col justify-between bg-navy p-7 text-cream md:p-8 lg:col-start-3 lg:row-start-2">
            <Quote size={30} className="text-gold" aria-hidden />
            <p className="mt-4 text-xl font-medium leading-snug tracking-tight md:text-2xl">
              {t.philosophy} <span className="text-cream/60">{t.philosophyMuted}</span>
            </p>
          </Tile>

          {/* who we are */}
          <Tile className="col-span-2 flex flex-col justify-between bg-white p-7 ring-1 ring-ink/[0.06] md:p-8 lg:col-start-1 lg:row-start-3">
            <p className="text-sm font-semibold text-gold">{t.whoLabel}</p>
            <p className="mt-4 text-lg font-medium leading-snug text-ink md:text-xl">{t.who[0]}</p>
          </Tile>

          {/* second photo */}
          <Tile delay={0.05} className="col-span-2 min-h-[220px] lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:row-start-3">
            <Image src="/why-supplies.jpg" alt="" fill sizes="(min-width: 1024px) 290px, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
          </Tile>

          {/* values */}
          <Tile delay={0.1} className="col-span-2 flex flex-col bg-cream p-6 ring-1 ring-ink/[0.06] md:p-7 lg:col-span-1 lg:col-start-4 lg:row-span-2 lg:row-start-3">
            <p className="text-sm font-semibold text-gold">{t.valuesLabel}</p>
            <ul className="mt-5 grid flex-1 content-between gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {t.values.map((v, i) => {
                const Icon = valueIcons[i];
                return (
                  <li key={v.title} className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-light text-ink">
                      <Icon size={17} strokeWidth={2} aria-hidden />
                    </span>
                    <div>
                      <p className="font-semibold leading-tight text-ink">{v.title}</p>
                      <p className="mt-0.5 text-[13px] leading-snug text-ink/60">{v.description}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Tile>

          {/* more stats */}
          <StatTile {...h[2]} className="bg-white text-ink ring-1 ring-ink/[0.06] lg:col-start-1 lg:row-start-4" delay={0.05} />
          <StatTile {...h[3]} className="bg-ink text-cream lg:col-start-2 lg:row-start-4" delay={0.1} />

          {/* mission */}
          <Tile className="col-span-2 flex flex-col justify-between bg-[radial-gradient(120%_120%_at_100%_100%,rgba(212,168,77,0.9)_0%,rgba(196,151,59,0.4)_40%,transparent_70%),linear-gradient(160deg,#0e2033,#16374f)] p-7 text-cream md:p-8 lg:col-start-1 lg:row-start-5">
            <p className="text-sm font-semibold text-gold-light">{t.missionLabel}</p>
            <p className="mt-4 text-xl font-medium leading-snug tracking-tight md:text-2xl">{t.mission}</p>
          </Tile>

          {/* areas */}
          <Tile delay={0.05} className="col-span-2 flex flex-col justify-between bg-white p-7 ring-1 ring-ink/[0.06] md:p-8 lg:col-start-3 lg:row-start-5">
            <p className="text-sm font-semibold text-gold">{t.areasLabel}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {all.areas.names.map((area) => (
                <li key={area} className="rounded-full bg-[#f3f4f2] px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-gold-light">
                  {area}
                </li>
              ))}
            </ul>
          </Tile>

          {/* call to action */}
          <Tile className="col-span-2 flex flex-col items-start justify-between gap-6 bg-gold p-7 text-ink md:flex-row md:items-center md:p-10 lg:col-span-4 lg:row-start-6">
            <h2 className="max-w-xl text-[clamp(1.8rem,3.4vw,3rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
              {t.ctaTitle[0]} {t.ctaTitle[1]}
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={whatsappQuoteUrl(locale)}
                {...external}
                className="group/btn inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 font-semibold text-cream transition-colors hover:bg-navy-soft"
              >
                {t.ctaWhatsapp}
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-ink transition-transform duration-500 group-hover/btn:rotate-45">
                  <ArrowUpRight size={18} />
                </span>
              </a>
              <a href={`/${locale}/kontakt`} className="font-semibold underline decoration-ink/30 underline-offset-[6px] transition-colors hover:decoration-ink">
                {t.ctaContact}
              </a>
            </div>
          </Tile>
        </div>
      </div>
    </main>
  );
}
