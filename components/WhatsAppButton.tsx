import { site } from "@/lib/data";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${site.phone}?text=${encodeURIComponent("Përshëndetje, dua një ofertë pastrimi.")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Na shkruani në WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-bold text-white shadow-lg transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      <span aria-hidden>💬</span> WhatsApp
    </a>
  );
}