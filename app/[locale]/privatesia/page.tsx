import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/lib/data";
import { isLocale, messages, type Locale } from "@/lib/i18n";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = messages[locale].privacy;
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: {
      canonical: `/${locale}/privatesia`,
      languages: { sq: "/sq/privatesia", en: "/en/privatesia", "x-default": "/sq/privatesia" },
    },
  };
}

/** Replace {email} / {phone} placeholders with clickable links. */
function withContacts(text: string) {
  return text.split(/(\{email\}|\{phone\})/).map((part, i) => {
    if (part === "{email}")
      return (
        <a key={i} href={`mailto:${site.email}`} className="font-medium text-ink underline decoration-gold decoration-2 underline-offset-4">
          {site.email}
        </a>
      );
    if (part === "{phone}")
      return (
        <a key={i} href={`tel:+${site.phone}`} className="font-medium text-ink underline decoration-gold decoration-2 underline-offset-4">
          {site.phoneDisplay}
        </a>
      );
    return part;
  });
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale: Locale = localeParam;
  const all = messages[locale];
  const t = all.privacy;

  return (
    <main className="bg-paper px-6 pb-20 pt-32 md:pb-28 md:pt-40">
      <article className="mx-auto max-w-[760px]">
        <nav aria-label="Breadcrumb" className="hero-fade text-sm text-ink/50">
          <a href={`/${locale}`} className="transition-colors hover:text-ink">{all.nav.home}</a>
          <span className="mx-2" aria-hidden>/</span>
          <span aria-current="page" className="text-ink">{t.title}</span>
        </nav>
        <h1 className="hero-fade mt-6 text-[clamp(2.4rem,5vw,3.8rem)] font-bold leading-[1.02] tracking-[-0.035em] text-ink" style={{ animationDelay: "0.06s" }}>
          {t.title}
        </h1>
        <p className="hero-fade mt-4 text-sm font-medium text-gold" style={{ animationDelay: "0.1s" }}>{t.updated}</p>
        <p className="hero-fade mt-8 text-lg leading-relaxed text-ink/70" style={{ animationDelay: "0.14s" }}>{t.intro}</p>

        <div className="mt-12 divide-y divide-ink/10 border-y border-ink/10">
          {t.sections.map((sec, i) => (
            <section key={sec.h} className="grid gap-3 py-8 md:grid-cols-[2.5rem_1fr] md:gap-6">
              <span className="text-sm font-semibold tabular-nums text-gold md:pt-1">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-ink md:text-2xl">{sec.h}</h2>
                {sec.p.map((para, j) => (
                  <p key={j} className="mt-3 leading-relaxed text-ink/70">{withContacts(para)}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
