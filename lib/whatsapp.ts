import { site } from "@/lib/data";
import { messages, type Locale } from "@/lib/i18n";

/** WhatsApp chat link with a pre-filled "I'd like a quote" message in the visitor's language. */
export function whatsappQuoteUrl(locale: Locale) {
  return `https://wa.me/${site.phone}?text=${encodeURIComponent(messages[locale].whatsapp.message)}`;
}

/** Props for links that open WhatsApp in a new tab. */
export const external = { target: "_blank", rel: "noopener noreferrer" } as const;
