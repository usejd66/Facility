import { site, steps, packages, testimonials, areas, faq } from "@/lib/data";

const h2 = "text-3xl font-bold tracking-tight md:text-5xl";

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="relative isolate flex min-h-[760px] items-end overflow-hidden text-white md:min-h-[720px]">
        <img
          src="/cleaning-hero.jpg"
          alt="Profesionale duke pastruar një shtëpi moderne"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-[58%_center]"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(14,33,54,.92)_0%,rgba(14,33,54,.72)_38%,rgba(14,33,54,.08)_72%,rgba(14,33,54,.18)_100%),linear-gradient(0deg,rgba(14,33,54,.24),transparent_45%)]"></div>
        <div className="mx-auto w-full max-w-[1280px] px-6 pb-20 md:pb-16">
          <div className="max-w-[650px]">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.12em]">Home Cleaning</p>
            <h1 className="max-w-[620px] text-[52px] font-bold leading-[1.02] tracking-[-0.045em] md:text-[72px]">
              Make Your Space Feel Fresh and New Again
            </h1>
            <p className="mt-7 max-w-[590px] text-base leading-7 text-white/90 md:text-lg">
              Reliable cleaning for homes, offices, and commercial spaces — handled by professional teams who show up, follow the details, and leave things properly clean.
            </p>
            <a
              href="#oferta"
              className="mt-8 inline-flex bg-white px-8 py-4 text-sm font-bold text-ink transition hover:bg-[#dcebd7]"
            >
              Get a Free Quote
            </a>
            <p className="mt-16 text-sm font-medium">
              <span className="mr-2 text-[#ffb703] tracking-[0.12em]">★★★★★</span>
              <strong>4.9</strong> from 500+ customers
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="scroll-mt-20 bg-white px-6 py-24 text-center md:py-28">
        <div className="mx-auto max-w-5xl">
          <p className="mx-auto inline-flex items-center gap-2 rounded-full border border-ink/10 px-4 py-2 text-xs font-semibold tracking-wide text-ink/75">
            <span className="h-2 w-2 rounded-full bg-aqua" aria-hidden />
            ABOUT US
          </p>
          <h2 className="mx-auto mt-6 max-w-4xl text-3xl font-semibold leading-tight tracking-tight md:text-5xl md:leading-[1.16]">
            At Rambo, we combine professional cleaning with reliable, high-quality solutions{" "}
            <span className="font-normal text-ink/45">
              that transform everyday spaces into fresh, comfortable places with ease.
            </span>
          </h2>
          <a
            href="#procesi"
            className="mx-auto mt-9 inline-flex items-center gap-3 rounded-full border border-ink/10 py-1 pl-5 pr-1 text-sm font-medium transition hover:border-aqua/40"
          >
            More About Us
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-aqua text-lg text-white" aria-hidden>
              ↗
            </span>
          </a>
        </div>
      </section>

      {/* PROCESI */}
      <section id="procesi" className="scroll-mt-20 bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>Si punojmë</h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.t}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sun font-bold">{i + 1}</span>
                <h3 className="mt-4 text-lg font-bold">{s.t}</h3>
                <p className="mt-2 text-ink/70">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CMIMET */}
      <section id="cmimet" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
        <h2 className={h2}>Paketa dhe çmime</h2>
        <p className="mt-3 text-ink/70">Çmimet janë orientuese për apartament 1+1. Oferta finale varet nga metrazhi.</p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {packages.map((p) => (
            <div key={p.n} className={`rounded-2xl p-8 ${p.hot ? "bg-ink text-foam ring-4 ring-sun" : "border border-ink/10 bg-white"}`}>
              <h3 className="text-xl font-bold">{p.n}</h3>
              <p className={`mt-2 text-3xl font-extrabold ${p.hot ? "text-sun" : "text-aqua"}`}>{p.p}</p>
              <ul className="mt-6 grid gap-2 text-sm">
                {p.f.map((x) => <li key={x}>✓ {x}</li>)}
              </ul>
              <a href="#oferta" className={`mt-8 block rounded-full px-5 py-3 text-center font-semibold ${p.hot ? "bg-sun text-ink" : "bg-ink text-white hover:bg-aqua"}`}>
                Kërko ofertë
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* VLERESIME */}
      <section id="vleresime" className="scroll-mt-20 bg-ink py-20 text-foam">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className={h2}>Çfarë thonë klientët</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.n} className="rounded-2xl bg-foam/10 p-8">
                <blockquote className="text-lg">“{t.q}”</blockquote>
                <figcaption className="mt-6 text-sm text-foam/70">
                  <strong className="text-sun">{t.n}</strong>, {t.r}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ZONAT */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className={h2}>Zonat ku punojmë</h2>
        <ul className="mt-8 flex flex-wrap gap-3">
          {areas.map((a) => (
            <li key={a} className="rounded-full border border-ink/20 bg-white px-5 py-2 font-medium">{a}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-ink/60">Nuk e shihni zonën tuaj? Na shkruani, shpesh mund të vijmë.</p>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 bg-white py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className={h2}>Pyetje të shpeshta</h2>
          <div className="mt-10 divide-y divide-ink/15 border-y border-ink/15">
            {faq.map(([q, a]) => (
              <details key={q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
                  {q}
                  <span className="text-aqua transition group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-3 text-ink/70">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="oferta" className="scroll-mt-20 bg-aqua py-16 text-ink">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6">
          <h2 className="max-w-xl text-3xl font-bold md:text-4xl">Gati për një shtëpi ose zyrë që shkëlqen?</h2>
          <a href="#oferta" className="rounded-full bg-ink px-8 py-4 font-semibold text-white hover:bg-white hover:text-ink">Merr ofertë falas</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink text-foam/80">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-3">
          <div>
            <p className="text-2xl font-extrabold text-foam">rambo<span className="text-aqua">.al</span></p>
            <p className="mt-2 text-sm">Pastrim profesional në {site.city}.</p>
          </div>
          <div className="text-sm">
            <p><a href={`tel:+${site.phone}`} className="hover:text-sun">{site.phoneDisplay}</a></p>
            <p className="mt-1"><a href={`mailto:${site.email}`} className="hover:text-sun">{site.email}</a></p>
            <p className="mt-1">{site.hours}</p>
          </div>
          <div className="text-sm md:text-right">© {new Date().getFullYear()} Rambo. Të gjitha të drejtat e rezervuara.</div>
        </div>
      </footer>
    </main>
  );
}