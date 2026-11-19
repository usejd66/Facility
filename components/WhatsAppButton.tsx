"use client";
import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { MessageCircle } from "lucide-react";
import { site } from "@/lib/data";
import { messages, type Locale } from "@/lib/i18n";

export default function WhatsAppButton({ locale }: { locale: Locale }) {
  const t = messages[locale].whatsapp;
  const [visible, setVisible] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > 500));

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={`https://wa.me/${site.phone}?text=${encodeURIComponent(t.message)}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.label}
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="group fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] p-4 font-semibold text-white shadow-xl shadow-[#25D366]/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:px-5 md:py-3.5"
        >
          <span aria-hidden className="absolute inset-0 -z-10 animate-ping-slow rounded-full bg-[#25D366] opacity-40" />
          <MessageCircle size={22} aria-hidden />
          <span className="hidden md:inline">WhatsApp</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
