import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/lib/data";
import { messages, type Locale } from "@/lib/i18n";

export default function Footer({ locale }: { locale: Locale }) {
  const t = messages[locale];
  const home = `/${locale}`;

  const pages = [
    [t.footer.home, home],
    [t.nav.about, `${home}#about`],
    [t.footer.why, `${home}#pse-ne`],
    [t.nav.services, `${home}#sherbimet`],
    [t.nav.contact, `${home}/kontakt`],
  ] as const;

  const more = [
    ...t.services.items.map((item) => [item.title, `${home}#sherbimet`] as const),
    [t.footer.areas, `${home}#zonat`] as const,
    [t.faq.title, `${home}#faq`] as const,
  ];

  const contacts = [
    { icon: MapPin, label: site.address, href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`, external: true },
    { icon: Phone, label: site.phoneDisplay, href: `tel:+${site.phone}` },
    { icon: Mail, label: site.email, href: `mailto:${site.email}` },
  ];

  const link = "inline-block py-1.5 text-sm text-cream/85 transition-colors hover:text-gold-light";

  return (
    <footer className="bg-paper p-3 md:p-4">
      <div className="relative overflow-hidden rounded-[28px] bg-ink text-cream">
        <div className="mx-auto grid max-w-[1240px] grid-cols-2 gap-x-6 gap-y-10 px-7 pb-6 pt-12 md:px-10 md:pt-14 lg:grid-cols-[1.1fr_0.9fr_0.9fr_1.3fr] lg:gap-8">
          <a href={home} aria-label="Rambo Facility Management" className="col-span-2 self-start lg:col-span-1">
            <Image src="/rambo-logo.png" alt="Rambo Facility Management" width={1999} height={533} sizes="(min-width: 768px) 150px, 135px" className="h-9 w-auto md:h-10" />
          </a>

          <ul className="grid content-start gap-1">
            {pages.map(([label, href]) => (
              <li key={label}><a href={href} className={link}>{label}</a></li>
            ))}
          </ul>

          <ul className="grid content-start gap-1">
            {more.map(([label, href]) => (
              <li key={label}><a href={href} className={link}>{label}</a></li>
            ))}
          </ul>

          <ul className="col-span-2 grid content-start gap-4 lg:col-span-1">
            {contacts.map(({ icon: Icon, label, href, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-3.5 text-sm text-cream/85 transition-colors hover:text-gold-light"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-ink transition-transform group-hover:scale-110">
                    <Icon size={16} strokeWidth={2.4} aria-hidden />
                  </span>
                  {label}
                </a>
              </li>
            ))}
            <li className="pt-2 text-xs text-cream/60">
              © {new Date().getFullYear()} Rambo Facility Management. {t.footer.rights}
            </li>
          </ul>
        </div>

        {/* giant wordmark, cropped by the card's bottom edge */}
        <p
          aria-hidden
          className="pointer-events-none -mb-[0.2em] select-none text-center text-[clamp(6rem,29vw,27rem)] font-semibold leading-[0.8] tracking-[-0.05em] text-gold"
        >
          Rambo
        </p>
      </div>
    </footer>
  );
}
