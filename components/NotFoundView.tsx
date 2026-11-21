"use client";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { messages, type Locale } from "@/lib/i18n";
import { external, whatsappQuoteUrl } from "@/lib/whatsapp";

/** Branded 404. not-found pages get no params, so the language is read from the URL. */
export default function NotFoundView() {
  const pathname = usePathname() ?? "";
  const locale: Locale = pathname.startsWith("/en") ? "en" : "sq";
  const t = messages[locale].notFound;

  return (
    <main className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-cream px-6 pb-20 pt-32">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_45%,rgba(228,199,133,0.35),transparent_70%)]" />
      <div className="mx-auto w-full max-w-[760px] text-center">
        <p
          aria-hidden
          className="hero-fade select-none text-[clamp(7rem,26vw,15rem)] font-bold leading-none tracking-[-0.06em] text-transparent [-webkit-text-stroke:2px_var(--color-gold)]"
        >
          404
        </p>
        <h1 className="hero-fade mt-2 text-[clamp(2rem,4.6vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.035em] text-ink" style={{ animationDelay: "0.08s" }}>
          {t.title}
        </h1>
        <p className="hero-fade mx-auto mt-5 max-w-md text-lg leading-relaxed text-ink/65" style={{ animationDelay: "0.14s" }}>
          {t.text}
        </p>
        <div className="hero-fade mt-9 flex flex-wrap items-center justify-center gap-3" style={{ animationDelay: "0.2s" }}>
          <a
            href={`/${locale}`}
            className="group inline-flex items-center gap-3 rounded-full bg-gold py-2 pl-6 pr-2 font-semibold text-ink transition-colors hover:bg-gold-light"
          >
            {t.home}
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-gold-light transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight size={18} />
            </span>
          </a>
          <a
            href={whatsappQuoteUrl(locale)}
            {...external}
            className="inline-flex items-center rounded-full border border-ink/20 px-6 py-3 font-semibold text-ink transition-colors hover:border-ink"
          >
            {t.whatsapp}
          </a>
        </div>
      </div>
    </main>
  );
}
