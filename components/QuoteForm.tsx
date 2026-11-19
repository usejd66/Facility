"use client";
import { useState } from "react";
import { site } from "@/lib/data";
import { messages, type Locale } from "@/lib/i18n";

export default function QuoteForm({ locale }: { locale: Locale }) {
  const t = messages[locale].quote;
  const [f, setF] = useState({ name: "", service: t.services[0], area: "", size: "", note: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF((previous) => ({ ...previous, [k]: e.target.value }));

  function send(e: React.FormEvent) {
    e.preventDefault();
    const text = [
      t.greeting(f.name),
      `${t.serviceLine}: ${f.service}`,
      `${t.areaLine}: ${f.area}`,
      f.size && `${t.sizeLine}: ${f.size} m²`,
      f.note && `${t.detailsLine}: ${f.note}`,
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/${site.phone}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  const field =
    "w-full rounded-lg border border-ink/20 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-aqua";

  return (
    <form onSubmit={send} className="grid gap-4 rounded-2xl border border-ink/10 bg-white p-6 shadow-sm md:p-8">
      <label className="grid gap-1 text-sm font-medium">{t.name}
        <input required value={f.name} onChange={set("name")} className={field} autoComplete="name" />
      </label>
      <label className="grid gap-1 text-sm font-medium">{t.service}
        <select value={f.service} onChange={set("service")} className={field}>
          {t.services.map((service) => <option key={service}>{service}</option>)}
        </select>
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium">{t.area}
          <input required value={f.area} onChange={set("area")} className={field} placeholder={t.areaPlaceholder} />
        </label>
        <label className="grid gap-1 text-sm font-medium">{t.size}
          <input inputMode="numeric" value={f.size} onChange={set("size")} className={field} />
        </label>
      </div>
      <label className="grid gap-1 text-sm font-medium">{t.details}
        <textarea rows={3} value={f.note} onChange={set("note")} className={field} placeholder={t.detailsPlaceholder} />
      </label>
      <button className="rounded-lg bg-ink px-6 py-3 font-semibold text-white transition hover:bg-aqua focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun">
        {t.send}
      </button>
      <p className="text-xs text-ink/60">{t.response}</p>
    </form>
  );
}