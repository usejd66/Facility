import type { Metadata } from "next";
import { notFound } from "next/navigation";
import QuoteForm from "@/components/QuoteForm";
import { site } from "@/lib/data";
import { isLocale, locales, messages, type Locale } from "@/lib/i18n";

const h2 = "text-3xl font-bold tracking-tight md:text-5xl";

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
      languages: { sq: "/sq", en: "/en" },
    },
    openGraph: {
      title: t.metadata.title,
      description: t.metadata.description,
      url: `/${localeParam}`,
      locale: t.metadata.ogLocale,
      alternateLocale: localeParam === "sq" ? ["en_US"] : ["sq_AL"],
      type: "website",
    },
  };
}

export default async function Home({ params }: PageProps) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const t = messages[locale];

  return (
    <main>
      <section className="relative isolate flex min-h-[760px] items-end overflow-hidden text-white md:min-h-[720px]">
        <img
          src="/cleaning-hero.jpg"
          alt={locale === "sq" ? "Ekip pastrimi duke kujdesur për një shtëpi moderne" : "A cleaning professional caring for a modern home"}
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[58%_center]"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(14,33,54,.92)_0%,rgba(14,33,54,.72)_38%,rgba(14,33,54,.08)_72%,rgba(14,33,54,.18)_100%),linear-gradient(0deg,rgba(14,33,54,.24),transparent_45%)]" />
        <div className="mx-auto w-full max-w-[1280px] px-6 pb-20 md:pb-16">
          <div className="max-w-[650px]">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.12em]">{t.hero.eyebrow}</p>
            <h1 className="max-w-[620px] text-[52px] font-bold leading-[1.02] tracking-[-0.045em] md:text-[72px]">
              {t.hero.title}
            </h1>
            <p className="mt-7 max-w-[590px] text-base leading-7 text-white/90 md:text-lg">
              {t.hero.description}
            </p>
            <a href="#oferta" className="mt-8 inline-flex bg-white px-8 py-4 text-sm font-bold text-ink transition hover:bg-[#dcebd7]">
              {t.hero.cta}
            </a>
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-20 bg-white px-6 py-24 text-center md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-ink/10 px-4 py-2 text-xs font-semibold tracking-wide text-ink/75">
            <span className="h-2 w-2 rounded-full bg-aqua" aria-hidden />
            {t.about.eyebrow}
          </p>
          <h2 className="mx-auto mt-6 max-w-4xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl md:leading-[1.16]">
            {t.about.title}{" "}
            <span className="font-normal text-ink/45">{t.about.continuation}</span>
          </h2>
          <a href="#sherbimet" className="mx-auto mt-9 inline-flex items-center gap-3 rounded-full border border-ink/10 py-1 pl-5 pr-1 text-sm font-medium transition hover:border-aqua/40">
            {t.about.link}
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-aqua text-lg text-white" aria-hidden>↗</span>
          </a>
        </div>
      </section>

      <section id="sherbimet" className="scroll-mt-20 bg-[#f7f8f6] px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-aqua">{t.services.description}</p>
          <h2 className={`${h2} mt-3`}>{t.services.title}</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.services.items.map((service) => (
              <article key={service.title} className="rounded-2xl border border-ink/10 bg-white p-7 transition hover:-translate-y-1 hover:border-aqua/40">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#eef6f4] text-2xl text-aqua" aria-hidden>
                  {service.icon}
                </span>
                <h3 className="mt-6 text-lg font-bold">{service.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink/70">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="procesi" className="scroll-mt-20 bg-white py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>{t.process.title}</h2>
          <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {t.process.steps.map((step, index) => (
              <li key={step.title}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sun font-bold">{index + 1}</span>
                <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                <p className="mt-2 text-ink/70">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="cmimet" className="scroll-mt-20 bg-[#f7f8f6] px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className={h2}>{t.pricing.title}</h2>
          <p className="mt-3 max-w-2xl text-ink/70">{t.pricing.description}</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {t.pricing.packages.map((plan, index) => (
              <article key={plan.name} className={`rounded-2xl p-8 ${index === 1 ? "bg-ink text-foam ring-2 ring-sun" : "border border-ink/10 bg-white"}`}>
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className={`mt-3 text-3xl font-extrabold ${index === 1 ? "text-sun" : "text-aqua"}`}>
                  {plan.price === "custom" ? t.pricing.custom : `${t.pricing.from} ${plan.price}`}
                </p>
                <ul className="mt-6 grid gap-3 text-sm">
                  {plan.features.map((feature) => <li key={feature}>✓ {feature}</li>)}
                </ul>
                <a href="#oferta" className={`mt-8 block rounded-full px-5 py-3 text-center font-semibold ${index === 1 ? "bg-sun text-ink" : "bg-ink text-white transition hover:bg-aqua"}`}>
                  {t.pricing.request}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-24">
        <h2 className={h2}>{t.areas.title}</h2>
        <ul className="mt-8 flex flex-wrap gap-3">
          {t.areas.names.map((area) => <li key={area} className="rounded-full border border-ink/15 bg-white px-5 py-2 font-medium">{area}</li>)}
        </ul>
        <p className="mt-4 text-sm text-ink/60">{t.areas.note}</p>
      </section>

      <section id="faq" className="scroll-mt-20 bg-white py-20 md:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className={h2}>{t.faq.title}</h2>
          <div className="mt-10 divide-y divide-ink/15 border-y border-ink/15">
            {t.faq.items.map(([question, answer]) => (
              <details key={question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
                  {question}
                  <span className="text-aqua transition group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-3 text-ink/70">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="oferta" className="scroll-mt-20 bg-aqua/10 px-6 py-20 md:py-24">
        <div className="mx-auto grid max-w-6xl items-start gap-10 md:grid-cols-[.8fr_1.2fr]">
          <div className="md:sticky md:top-28">
            <p className="text-sm font-semibold uppercase tracking-wider text-aqua">{t.hero.eyebrow}</p>
            <h2 className={`${h2} mt-3`}>{t.quote.title}</h2>
            <p className="mt-4 text-ink/70">{t.quote.description}</p>
          </div>
          <QuoteForm locale={locale} />
        </div>
      </section>

      <footer className="bg-ink text-foam/80">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">
          <div>
            <p className="text-2xl font-extrabold text-foam">Rambo<span className="text-aqua">.al</span></p>
            <p className="mt-2 text-sm">{t.footer.description}</p>
          </div>
          <div className="text-sm">
            <p><a href={`tel:+${site.phone}`} className="hover:text-sun">{site.phoneDisplay}</a></p>
            <p className="mt-1"><a href={`mailto:${site.email}`} className="hover:text-sun">{site.email}</a></p>
            <p className="mt-1">{t.footer.hours}</p>
          </div>
          <div className="text-sm md:text-right">© {new Date().getFullYear()} Rambo. {t.footer.rights}</div>
        </div>
      </footer>
    </main>
  );
}
