"use client";
import { useState } from "react";
import { site } from "@/lib/data";

const links = [
  ["Home", "#"],
  ["Services", "#sherbimet"],
  ["How It Works", "#procesi"],
  ["Pricing", "#cmimet"],
  ["Reviews", "#vleresime"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="absolute inset-x-0 top-0 z-40 text-white">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-6">
        <a href="#" className="text-2xl font-extrabold tracking-tight">
          <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#9ad86a] align-middle"></span>
          CLEANFY
        </a>
        <nav className="hidden items-center gap-9 text-sm font-semibold md:flex">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="transition hover:text-[#b9d6af]">{l}</a>
          ))}
          <a href={`tel:+${site.phone}`} className="ml-8">{site.phoneDisplay}</a>
          <a href="#oferta" className="border border-white/70 px-6 py-4 font-bold transition hover:bg-white hover:text-ink">
            Book a Cleaning
          </a>
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
        <nav className="grid gap-1 border-t border-white/15 bg-[#0e2136]/95 px-6 pb-4 md:hidden">
          {links.map(([l, h]) => (
            <a key={h} href={h} onClick={() => setOpen(false)} className="py-3 font-medium">{l}</a>
          ))}
          <a href={`tel:+${site.phone}`} className="mt-2 rounded-full bg-sun px-4 py-3 text-center font-bold">Telefono: {site.phoneDisplay}</a>
        </nav>
      )}
    </header>
  );
}