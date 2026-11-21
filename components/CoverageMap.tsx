import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { BroomSparkIcon } from "@/components/WhyIllustrations";
import { albaniaCities, albaniaMap } from "@/lib/albaniaMap";
import { messages, type Locale } from "@/lib/i18n";
import { external, whatsappQuoteUrl } from "@/lib/whatsapp";

/** "Where we work": a short statement + stats, next to a map of Albania with a gold dot on every city we serve. */
export default function CoverageMap({ locale }: { locale: Locale }) {
  const t = messages[locale].areas;
  // names are listed in the same order as albaniaCities
  const cities = albaniaCities.map((c, i) => ({ ...c, name: t.names[i] }));

  return (
    <section id="zonat" className="scroll-mt-20 overflow-hidden bg-paper px-6 py-16 md:py-28">
      <div className="mx-auto grid max-w-[1180px] items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        {/* statement + stats */}
        <Reveal>
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ink">
            <BroomSparkIcon className="h-5 w-5 text-gold" />
            {t.eyebrow}
          </p>
          <h2 className="mt-5 text-[clamp(2.2rem,4.4vw,3.8rem)] font-bold leading-[1.04] tracking-[-0.035em] text-ink">
            {t.statement[0]} <span className="text-gold">{t.statement[1]}</span>
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/65">{t.description}</p>

          <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-ink/10 pt-7">
            {t.stats.map((st) => (
              <div key={st.label}>
                <dt className="sr-only">{st.label}</dt>
                <dd className="text-4xl font-semibold leading-none tracking-[-0.04em] text-ink md:text-5xl">{st.value}</dd>
                <dd className="mt-2 text-sm leading-snug text-ink/55">{st.label}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 text-ink/60">
            {t.note}{" "}
            <a href={whatsappQuoteUrl(locale)} {...external} className="inline-flex items-center gap-1 font-semibold text-ink underline decoration-gold decoration-2 underline-offset-4">
              WhatsApp <ArrowUpRight size={15} aria-hidden />
            </a>
          </p>
        </Reveal>

        {/* map */}
        <Reveal delay={0.1} className="relative mx-auto w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[520px]">
          <div aria-hidden className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(228,199,133,0.35),transparent_70%)]" />
          <svg viewBox={`0 0 ${albaniaMap.width} ${albaniaMap.height}`} className="relative h-auto w-full" role="img" aria-label={`${t.title}: ${t.names.join(", ")}`}>
            <path d={albaniaMap.path} fill="#ffffff" stroke="#08131f" strokeOpacity="0.18" strokeWidth="1.5" strokeLinejoin="round" />
            {cities.map((c, i) => {
              const hq = "hq" in c && c.hq;
              const left = c.label.startsWith("left");
              const dy = c.label === "left-below" ? 16 : 0;
              return (
                <g key={c.key} className="hero-fade" style={{ animationDelay: `${0.2 + i * 0.12}s` }}>
                  {hq && (
                    <circle cx={c.x} cy={c.y} r="9" fill="#c4973b" opacity="0.45" className="animate-ping-slow [transform-box:fill-box] [transform-origin:center]" />
                  )}
                  <circle cx={c.x} cy={c.y} r={hq ? 9 : 6.5} fill={hq ? "#08131f" : "#c4973b"} stroke="#ffffff" strokeWidth="2.5" />
                  {hq && <circle cx={c.x} cy={c.y} r="3.2" fill="#e4c785" />}
                  <text
                    x={left ? c.x - 14 : c.x + 16}
                    y={c.y + 5 + dy}
                    textAnchor={left ? "end" : "start"}
                    className="fill-ink"
                    style={{ fontSize: hq ? 19 : 16, fontWeight: hq ? 700 : 600 }}
                  >
                    {c.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </Reveal>
      </div>
    </section>
  );
}
