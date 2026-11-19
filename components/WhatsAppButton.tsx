"use client";
import { useState } from "react";
import { AnimatePresence, m, useMotionValueEvent, useScroll } from "motion/react";
import { Phone } from "lucide-react";
import { site } from "@/lib/data";
import { messages, type Locale } from "@/lib/i18n";

/** Official WhatsApp glyph (Simple Icons, CC0). */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967c-.273-.099-.471-.148-.67.15c-.197.297-.767.966-.94 1.164c-.173.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.018-.458.13-.606c.134-.133.298-.347.446-.52s.198-.298.298-.497c.099-.198.05-.371-.025-.52s-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51a13 13 0 0 0-.57-.01c-.198 0-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074s2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625c.712.227 1.36.195 1.871.118c.571-.085 1.758-.719 2.006-1.413s.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214l-3.741.982l.998-3.648l-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884c2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.9 11.9 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413" />
    </svg>
  );
}

/** Floating contact buttons: call (phones only — desktop has the number in the header) above WhatsApp. */
export default function WhatsAppButton({ locale }: { locale: Locale }) {
  const t = messages[locale];
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 500));

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className="floating-contact fixed bottom-5 right-5 z-50 flex flex-col items-center gap-3 md:items-end"
        >
          <m.a
            href={`tel:+${site.phone}`}
            aria-label={`${t.nav.phone} ${site.phoneDisplay}`}
            whileTap={{ scale: 0.92 }}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-gold text-ink shadow-lg shadow-ink/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink lg:hidden"
          >
            <Phone size={20} strokeWidth={2.2} aria-hidden />
          </m.a>
          <m.a
            href={`https://wa.me/${site.phone}?text=${encodeURIComponent(t.whatsapp.message)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.whatsapp.label}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            className="relative flex h-14 items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 font-semibold text-white shadow-xl shadow-[#25D366]/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:px-5"
          >
            <span aria-hidden className="absolute inset-0 -z-10 animate-ping-slow rounded-full bg-[#25D366] opacity-40" />
            <WhatsAppIcon className="h-[26px] w-[26px]" />
            <span className="hidden md:inline">WhatsApp</span>
          </m.a>
        </m.div>
      )}
    </AnimatePresence>
  );
}
