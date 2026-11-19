"use client";
import { useState } from "react";
import { site } from "@/lib/data";

const links = [
  ["Shërbimet", "#sherbimet"],
  ["Si punojmë", "#procesi"],
  ["Çmimet", "#cmimet"],
  ["Vlerësime", "#vleresime"],
  ["FAQ", "#faq"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-foam/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="text-2xl font-extrabold tracking-tight">
          rambo<span className="text-aqua">.al</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="hover:text-aqua">{l}</a>
          ))}
          <a href={`tel:+${site.phone}`} className="rounded-full bg-sun px-4 py-2 font-bold">{site.phoneDisplay}</a>
        </nav>
        <button
          aria-label="Hap menunë"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="rounded-lg border border-ink/20 px-3 py-2 md:hidden"
        >
          {open ? "Mbyll" : "Menu"}
        </button>
      </div>
      {open && (
        <nav className="grid gap-1 border-t border-ink/10 px-6 pb-4 md:hidden">
          {links.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="py-3 font-medium">{l}</a>
          ))}
          <a href={`tel:+${site.phone}`} className="mt-2 rounded-full bg-sun px-4 py-3 text-center font-bold">Telefono: {site.phoneDisplay}</a>
        </nav>
      )}
    </header>
  );
}