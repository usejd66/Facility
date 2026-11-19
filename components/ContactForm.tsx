"use client";
import { useState } from "react";
import { site } from "@/lib/data";
import { messages, type Locale } from "@/lib/i18n";

export default function ContactForm({ locale }: { locale: Locale }) {
  const t = messages[locale].contact;
  const [f, setF] = useState({ name: "", reach: "", message: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setF((prev) => ({ ...prev, [k]: e.target.value }));

  function send(e: React.FormEvent) {
    e.preventDefault();
    const text = [`${t.greeting} ${f.name}.`, `${t.reachLine}: ${f.reach}`, "", f.message].join("\n");
    window.open(`https://wa.me/${site.phone}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
  }

  const field =
    "w-full border-0 border-b border-ink/15 bg-transparent px-0 py-3 text-[15px] text-ink placeholder:text-ink/45 outline-none transition-colors focus:border-gold";

  return (
    <form onSubmit={send} className="border border-ink/15 bg-white/40 p-6 md:p-7">
      <p className="text-sm font-semibold text-ink">{t.formTitle}</p>
      <div className="mt-3 grid gap-1">
        <label className="sr-only" htmlFor="c-name">{t.name}</label>
        <input id="c-name" required autoComplete="name" placeholder={t.name} value={f.name} onChange={set("name")} className={field} />
        <label className="sr-only" htmlFor="c-reach">{t.reach}</label>
        <input id="c-reach" required autoComplete="email" placeholder={t.reach} value={f.reach} onChange={set("reach")} className={field} />
        <label className="sr-only" htmlFor="c-message">{t.message}</label>
        <textarea id="c-message" required rows={4} placeholder={t.message} value={f.message} onChange={set("message")} className={`${field} resize-none`} />
      </div>
      <label className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-ink/70">
        <input type="checkbox" required className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-[var(--color-gold)]" />
        {t.consent}
      </label>
      <button className="mt-5 w-full bg-gold px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:w-1/2">
        {t.submit}
      </button>
      <p className="mt-3 text-[11px] text-ink/45">{t.note}</p>
    </form>
  );
}
