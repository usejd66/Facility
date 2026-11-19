import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { BroomSparkIcon, CleanerLineArt, HouseCleanIcon, OfficeCleanIcon, Sparkles, StoreCleanIcon } from "@/components/WhyIllustrations";
import { messages, type Locale } from "@/lib/i18n";

const icons = { house: HouseCleanIcon, office: OfficeCleanIcon, store: StoreCleanIcon } as const;

export default function WhyUs({ locale }: { locale: Locale }) {
  const t = messages[locale].why;
  const [a, b, c, d] = t.title;

  return (
    <section id="pse-ne" className="relative scroll-mt-20 overflow-hidden bg-paper px-6 pb-16 pt-4 md:pb-36 md:pt-8">
      {/* line drawing, top-left, bleeding off the edge like the reference */}
      <CleanerLineArt className="pointer-events-none absolute left-0 top-4 hidden w-[40vw] max-w-[820px] text-ink/[0.16] xl:block" />

      <div className="relative mx-auto max-w-[1180px]">
        <Sparkles className="absolute -right-2 top-16 hidden w-28 md:block lg:w-36" />

        <Reveal className="relative mx-auto max-w-3xl text-center">
          <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ink">
            <BroomSparkIcon className="h-5 w-5 text-gold" />
            {t.eyebrow}
          </p>
          <h2 className="mt-6 text-[clamp(2.5rem,5.4vw,4.6rem)] font-bold leading-[1.02] tracking-[-0.035em] text-ink">
            {a} <span className="text-gold">{b}</span>
            <br className="hidden sm:block" /> <span className="text-gold">{c}</span> {d}
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] leading-relaxed text-ink/60 md:mt-7">{t.description}</p>
        </Reveal>

        <div className="mt-10 grid items-center gap-10 md:mt-16 lg:mt-20 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
          <ul className="divide-y divide-ink/10">
            {t.items.map((item, i) => {
              const Icon = icons[item.icon];
              return (
                <li key={item.title} className="py-7 first:pt-0 last:pb-0">
                  <Reveal delay={i * 0.08} className="flex items-start gap-5">
                    <span className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-full bg-gold-light text-ink">
                      <Icon className="h-[50px] w-[50px]" />
                    </span>
                    <div className="pt-1">
                      <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>
                      <p className="mt-1.5 leading-relaxed text-ink/60">{item.description}</p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>

          <div className="grid grid-cols-2 gap-4">
            <Reveal className="relative aspect-[19/20] overflow-hidden rounded-3xl">
              <Image src="/why-supplies.jpg" alt={t.imageAlts[0]} fill sizes="(min-width: 1024px) 340px, 50vw" className="object-cover object-[40%_50%]" />
            </Reveal>
            <Reveal delay={0.1} className="relative aspect-[19/20] overflow-hidden rounded-3xl">
              <Image src="/why-team.jpg" alt={t.imageAlts[1]} fill sizes="(min-width: 1024px) 340px, 50vw" className="object-cover object-[50%_62%]" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
