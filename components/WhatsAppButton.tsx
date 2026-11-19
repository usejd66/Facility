import { site } from "@/lib/data";
import { messages, type Locale } from "@/lib/i18n";

export default function WhatsAppButton({ locale }: { locale: Locale }) {
  const t = messages[locale].whatsapp;

  return (
    <a
      href={`https://wa.me/${site.phone}?text=${encodeURIComponent(t.message)}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.label}
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-bold text-white shadow-lg transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      <span aria-hidden>💬</span> WhatsApp
    </a>
  );
}