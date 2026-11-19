"use client";
import { useState } from "react";
import clsx from "clsx";
import { motion } from "motion/react";
import { ArrowUpRight, Building2, HardHat, House, Sparkles } from "lucide-react";
import { site } from "@/lib/data";
import { messages, type Locale } from "@/lib/i18n";

const serviceIcons = [House, Building2, HardHat, Sparkles];

export default function QuoteForm({ locale }: { locale: Locale }) {
  const t = messages[locale].quote;
  const [f, setF] = useState<{ name: string; service: string; area: string; size: string; note: string }>({
    name: "",
    service: t.services[0],
    area: "",
    size: "",
    note: "",
  });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF((previous) => ({ ...previous, [k]: e.target.value }));

  function send(e: React.FormEvent) {
    e.preventDefault();
    const text = [
      t.greeting(f.name),
      `${t.serviceLine}: ${f.service}`,
      `${t.areaLine}: ${f.area}`,
      f.size && `${t.sizeLine}: ${f.size} m²`,
      f.note && `${t.detailsLine}: ${f.note}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`https://wa.me/${site.phone}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  const field =
    "peer w-full rounded-2xl border border-cream/15 bg-cream/[0.04] px-5 pb-3 pt-7 text-cream placeholder-transparent outline-none transition focus:border-gold focus:bg-cream/[0.07]";
  const label =
    "pointer-events-none absolute left-5 top-2.5 text-xs font-medium text-cream/50 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-focus:top-2.5 peer-focus:text-xs peer-focus:text-gold-light";

  return (
    <motion.form
      onSubmit={send}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="grid gap-4 rounded-[2rem] border border-cream/10 bg-navy/80 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl md:p-10"
    >
      <fieldset>
        <legend className="mb-3 text-sm font-medium text-cream/60">{t.service}</legend>
        <div className="grid grid-cols-2 gap-3">
          {t.services.map((service, i) => {
            const Icon = serviceIcons[i] ?? Sparkles;
            const checked = f.service === service;
            return (
              <label
                key={service}
                className={clsx(
                  "flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-4 text-sm font-medium transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold",
                  checked ? "border-gold bg-gold/15 text-cream" : "border-cream/10 text-cream/70 hover:border-cream/30",
                )}
              >
                <input type="radio" name="service" value={service} checked={checked} onChange={set("service")} className="sr-only" />
                <Icon size={18} className={checked ? "text-gold-light" : "text-cream/40"} />
                {service}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="relative">
        <input id="q-name" required value={f.name} onChange={set("name")} className={field} placeholder={t.name} autoComplete="name" />
        <label htmlFor="q-name" className={label}>{t.name}</label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="relative">
          <input id="q-area" required value={f.area} onChange={set("area")} className={field} placeholder={t.areaPlaceholder} />
          <label htmlFor="q-area" className={label}>{t.area}</label>
        </div>
        <div className="relative">
          <input id="q-size" inputMode="numeric" pattern="[0-9]*" value={f.size} onChange={set("size")} className={field} placeholder={t.size} />
          <label htmlFor="q-size" className={label}>{t.size}</label>
        </div>
      </div>

      <div className="relative">
        <textarea id="q-note" rows={3} value={f.note} onChange={set("note")} className={clsx(field, "resize-none")} placeholder={t.detailsPlaceholder} />
        <label htmlFor="q-note" className={label}>{t.details}</label>
      </div>

      <button className="group mt-2 flex items-center justify-between rounded-full bg-gold py-2 pl-7 pr-2 font-semibold text-ink transition hover:bg-gold-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold">
        {t.send}
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-gold-light transition-transform duration-500 group-hover:rotate-45">
          <ArrowUpRight size={20} />
        </span>
      </button>
      <p className="text-center text-xs text-cream/45">{t.response}</p>
    </motion.form>
  );
}
