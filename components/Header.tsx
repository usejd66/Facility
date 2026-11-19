"use client";
import Image from "next/image";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { site } from "@/lib/data";
import { messages, type Locale } from "@/lib/i18n";
import { external, whatsappQuoteUrl } from "@/lib/whatsapp";

export default function Header({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [section, setSection] = useState<string | null>(null);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
    // scroll-spy: the section crossing the 40% line of the screen is the active one
    const line = window.innerHeight * 0.4;
    let current: string | null = null;
    for (const id of ["top", "about", "pse-ne", "sherbimet"]) {
      const r = document.getElementById(id)?.getBoundingClientRect();
      if (r && r.top <= line && r.bottom > line) current = id;
    }
    setSection(current);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    // lets other fixed UI (the floating call/WhatsApp buttons) hide while the menu is open
    document.documentElement.toggleAttribute("data-menu-open", open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const pathname = usePathname() ?? `/${locale}`;
  const home = `/${locale}`;
  // On the home page keep plain "#id" anchors (smooth scroll); elsewhere link back to the home page sections.
  const base = pathname === home ? "" : home;
  const t = messages[locale].nav;
  const onContact = pathname === `${home}/kontakt`;
  const links = [
    { label: t.home, href: base ? home : "#top", active: !base && section === "top" },
    { label: t.about, href: `${base}#about`, active: !base && section === "about" },
    { label: t.why, href: `${base}#pse-ne`, active: !base && section === "pse-ne" },
    { label: t.services, href: `${base}#sherbimet`, active: !base && section === "sherbimet" },
    { label: t.contact, href: `${home}/kontakt`, active: onContact },
  ];
  const otherLocale = locale === "sq" ? "en" : "sq";
  const otherPath = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), `/${otherLocale}`);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 text-ink md:px-6">
        <div
          className={clsx(
            "mx-auto flex h-16 max-w-[1320px] items-center justify-between rounded-2xl px-4 transition-all duration-300 md:h-[68px] md:px-5",
            scrolled || open ? "border border-ink/[0.06] bg-white/85 shadow-[0_8px_30px_rgba(8,19,31,0.08)] backdrop-blur-xl" : "border border-transparent",
          )}
        >
          <a href={home} aria-label="Rambo Facility Management" className="shrink-0">
            <Image src="/rambo-logo-dark.png" alt="Rambo Facility Management" width={1999} height={533} priority sizes="(min-width: 768px) 135px, 120px" className="h-8 w-auto md:h-9" />
          </a>

          <nav className="hidden items-center gap-8 text-[15px] font-medium lg:flex">
            {links.map(({ label, href, active }) => (
              <a
                key={href}
                href={href}
                aria-current={active ? (onContact ? "page" : "true") : undefined}
                className={clsx("group relative py-2 transition-colors hover:text-ink", active ? "text-ink" : "text-ink/70")}
              >
                {label}
                <span
                  className={clsx(
                    "absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-gold transition-transform duration-300 group-hover:scale-x-100",
                    active ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a href={`tel:+${site.phone}`} className="flex items-center gap-2 text-[15px] font-medium text-ink/70 transition-colors hover:text-ink">
              <Phone size={16} className="text-gold" aria-hidden /> {site.phoneDisplay}
            </a>
            <span className="h-5 w-px bg-ink/15" aria-hidden />
            <a href={otherPath} lang={otherLocale} title={t.language} className="text-sm font-semibold text-ink/70 transition-colors hover:text-ink">
              {otherLocale.toUpperCase()}
              <span className="sr-only"> – {t.language}</span>
            </a>
            <a href={whatsappQuoteUrl(locale)} {...external} className="group flex items-center gap-2 rounded-full bg-ink py-2.5 pl-5 pr-4 text-sm font-semibold text-cream transition-colors hover:bg-navy-soft">
              {t.book}
              <ArrowUpRight size={16} className="text-gold-light transition-transform duration-300 group-hover:rotate-45" />
            </a>
          </div>

          <button
            aria-label={open ? t.close : t.menu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
            className="-mr-1 flex h-11 w-11 items-center justify-center rounded-xl text-ink transition-colors hover:bg-ink/5 lg:hidden"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col bg-cream px-6 pb-8 pt-28 text-ink lg:hidden"
          >
            <nav className="grid">
              {links.map(({ label, href, active }, i) => (
                <m.a
                  key={href}
                  href={href}
                  aria-current={active ? "true" : undefined}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }}
                  className={clsx("flex items-center justify-between border-b border-ink/10 py-4 text-2xl font-semibold tracking-tight", active && "text-gold")}
                >
                  {label}
                </m.a>
              ))}
            </nav>
            <div className="mt-auto grid gap-4">
              <div className="flex items-center justify-between">
                <a href={`tel:+${site.phone}`} className="flex items-center gap-2 font-semibold">
                  <Phone size={18} className="text-gold" aria-hidden /> {site.phoneDisplay}
                </a>
                <a href={otherPath} lang={otherLocale} title={t.language} className="rounded-full border border-ink/20 px-4 py-2 text-sm font-bold">
                  {otherLocale.toUpperCase()}
                  <span className="sr-only"> – {t.language}</span>
                </a>
              </div>
              <a href={whatsappQuoteUrl(locale)} {...external} onClick={() => setOpen(false)} className="rounded-full bg-ink px-6 py-4 text-center font-semibold text-cream">
                {t.book}
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
