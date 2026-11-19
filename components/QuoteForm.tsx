"use client";
import { useState } from "react";
import { site } from "@/lib/data";

export default function QuoteForm() {
  const [f, setF] = useState({ name: "", service: "Pastrim shtëpie", area: "", size: "", note: "" });
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF({ ...f, [k]: e.target.value });

  function send(e: React.FormEvent) {
    e.preventDefault();
    const text = [
      `Përshëndetje, jam ${f.name}.`,
      `Shërbimi: ${f.service}`,
      `Zona: ${f.area}`,
      f.size && `Metrazhi: ${f.size} m²`,
      f.note && `Detaje: ${f.note}`,
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/${site.phone}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
  }

  const field =
    "w-full rounded-lg border border-ink/20 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-aqua";

  return (
    <form onSubmit={send} className="grid gap-4 rounded-2xl border border-ink/10 bg-white p-6 shadow-sm md:p-8">
      <h3 className="text-xl font-bold">Kërko ofertë falas</h3>
      <label className="grid gap-1 text-sm font-medium">Emri
        <input required value={f.name} onChange={set("name")} className={field} autoComplete="name" />
      </label>
      <label className="grid gap-1 text-sm font-medium">Shërbimi
        <select value={f.service} onChange={set("service")} className={field}>
          <option>Pastrim shtëpie</option>
          <option>Pastrim zyre</option>
          <option>Pastrim pas ndërtimit</option>
          <option>Pastrim i thellë</option>
        </select>
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1 text-sm font-medium">Zona
          <input required value={f.area} onChange={set("area")} className={field} placeholder="p.sh. Blloku" />
        </label>
        <label className="grid gap-1 text-sm font-medium">Metrazhi (m²)
          <input inputMode="numeric" value={f.size} onChange={set("size")} className={field} />
        </label>
      </div>
      <label className="grid gap-1 text-sm font-medium">Detaje
        <textarea rows={3} value={f.note} onChange={set("note")} className={field} placeholder="Data, kërkesa të veçanta" />
      </label>
      <button className="rounded-lg bg-ink px-6 py-3 font-semibold text-white transition hover:bg-aqua focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sun">
        Dërgo në WhatsApp
      </button>
      <p className="text-xs text-ink/60">Përgjigjemi brenda një ore gjatë orarit të punës.</p>
    </form>
  );
}