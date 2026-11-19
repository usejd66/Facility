import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import MapEmbed from "@/components/MapEmbed";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/lib/data";
import { isLocale, messages, type Locale } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = messages[locale].contact;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: `/${locale}/kontakt`,
      languages: { sq: "/sq/kontakt", en: "/en/kontakt", "x-default": "/sq/kontakt" },
    },
    openGraph: { title: t.metaTitle, description: t.metaDescription, url: `/${locale}/kontakt`, type: "website" },
  };
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
      <path d="M14 8h3V4h-3c-2.8 0-4 1.8-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8.5c0-.3.2-.5.5-.5Z" fill="currentColor" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden fill="none" stroke="currentColor" strokeWidth="2.2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

const lineLink = "group inline-flex items-center gap-2 text-lg font-semibold text-ink transition-colors hover:text-gold md:text-xl";

export default async function ContactPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const t = messages[locale].contact;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`;
  const socials = [
    { href: site.social.facebook, label: "Facebook", icon: <FacebookIcon /> },
    { href: site.social.instagram, label: "Instagram", icon: <InstagramIcon /> },
  ].filter((s) => s.href);

  return (
    <main className="bg-cream px-6 pb-16 pt-28 md:pb-24 md:pt-40">
      <div className="mx-auto max-w-[1180px]">
        <h1 className="hero-fade text-[clamp(2.75rem,7vw,5.25rem)] font-bold uppercase leading-none tracking-[-0.03em] text-ink">{t.title}</h1>

        <div className="mt-10 grid gap-12 md:mt-14 md:grid-cols-2 md:gap-16">
          <div className="hero-fade" style={{ animationDelay: "0.1s" }}>
            <p className="max-w-sm text-sm font-medium leading-relaxed text-ink/80">{t.intro}</p>

            <div className="mt-8">
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={lineLink}>
                {site.address}
                <ArrowRight size={20} className="text-gold transition-transform group-hover:translate-x-1" aria-hidden />
              </a>
              <p className="mt-1 text-sm text-ink/70">{t.hours}</p>
            </div>

            <div className="mt-8 grid gap-4">
              <a href={`tel:+${site.phone}`} className={lineLink}>
                +{site.phone}
                <ArrowRight size={20} className="text-gold transition-transform group-hover:translate-x-1" aria-hidden />
              </a>
              <a href={`mailto:${site.email}`} className={lineLink}>
                {site.email}
                <ArrowRight size={20} className="text-gold transition-transform group-hover:translate-x-1" aria-hidden />
              </a>
            </div>

            {socials.length > 0 && (
              <div className="mt-10 flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center bg-ink/[0.07] text-ink transition-colors hover:bg-gold"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="hero-fade" style={{ animationDelay: "0.2s" }}>
            <ContactForm locale={locale} />
          </div>
        </div>

        <Reveal className="mt-16 md:mt-32">
          <h2 className="text-[clamp(2.5rem,6.5vw,5rem)] font-bold uppercase leading-none tracking-[-0.03em] text-ink">{t.findTitle}</h2>
        </Reveal>

        <Reveal className="relative mt-8 h-[340px] overflow-hidden bg-ink/5 md:h-[440px]">
          <MapEmbed title={t.mapTitle} src={`https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&z=13&output=embed`} />
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 left-[72px] hidden bg-gold sm:block px-3 py-2 text-xs font-semibold text-ink shadow-md transition-colors hover:bg-gold-light"
          >
            {t.openMaps}
          </a>
        </Reveal>

        <div className="mt-3 grid grid-cols-3 gap-3">
          {["/services/office.jpg", "/services/hotel.jpg", "/services/home.jpg"].map((src) => (
            <div key={src} className="relative h-28 overflow-hidden sm:h-40 md:h-52">
              <Image src={src} alt="" fill sizes="33vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
