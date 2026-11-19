"use client";
import Image from "next/image";
import { useState } from "react";
import { site } from "@/lib/data";
import { messages, type Locale } from "@/lib/i18n";

const links = (locale: Locale) => [
  [messages[locale].nav.about, "#about"],
  [messages[locale].nav.services, "#sherbimet"],
  [messages[locale].nav.process, "#procesi"],
  [messages[locale].nav.pricing, "#cmimet"],
  [messages[locale].nav.faq, "#faq"],
];

export default function Header({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const t = messages[locale].nav;
  const otherLocale = locale === "sq" ? "en" : "sq";
  const languageLabel = locale === "sq" ? "EN" : "SQ";

  return (
    <header className="absolute inset-x-0 top-0 z-40 text-white">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-6">
        <a href="#" aria-label="Rambo Facility Management" className="shrink-0">
          <Image
            src="/rambo-logo.png"
            alt="Rambo Facility Management"
            width={1999}
            height={533}
            priority
            className="h-10 w-auto md:h-12"
          />
        </a>
        <nav className="hidden items-center gap-6 text-sm font-semibold lg:flex">
          {links(locale).map(([label, href]) => (
            <a key={href} href={href} className="transition hover:text-[#b9d6af]">{label}</a>
          ))}
          <a href={`tel:+${site.phone}`} className="ml-2 whitespace-nowrap">{site.phoneDisplay}</a>
          <a href={`/${otherLocale}`} lang={otherLocale} aria-label={t.language} className="rounded-full border border-white/40 px-3 py-2 text-xs font-bold tracking-wide transition hover:bg-white/10">
            {languageLabel}
          </a>
          <a href="#oferta" className="whitespace-nowrap border border-white/70 px-5 py-3 font-bold transition hover:bg-white hover:text-ink">
            {t.book}
          </a>
        </nav>
        <button
          aria-label={open ? t.close : t.menu}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="rounded-lg border border-white/50 px-3 py-2 lg:hidden"
        >
          {open ? t.close : "☰"}
        </button>
      </div>
      {open && (
        <nav className="grid gap-1 border-t border-white/15 bg-[#0e2136]/95 px-6 pb-4 lg:hidden">
          {links(locale).map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="py-3 font-medium">{label}</a>
          ))}
          <div className="mt-2 flex items-center justify-between gap-4">
            <a href={`tel:+${site.phone}`} className="py-3 font-bold">{t.phone}: {site.phoneDisplay}</a>
            <a href={`/${otherLocale}`} lang={otherLocale} aria-label={t.language} className="rounded-full border border-white/40 px-4 py-2 text-sm font-bold">
              {languageLabel}
            </a>
          </div>
          <a href="#oferta" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-sun px-4 py-3 text-center font-bold text-ink">
            {t.book}
          </a>
        </nav>
      )}
    </header>
  );
}