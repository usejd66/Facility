import clsx from "clsx";
import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  dark = false,
  center = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={clsx("max-w-3xl", center && "mx-auto text-center")}>
      <p
        className={clsx(
          "inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em]",
          dark ? "text-gold-light" : "text-gold",
        )}
      >
        <span className="h-px w-8 bg-current" aria-hidden />
        {eyebrow}
      </p>
      <h2
        className={clsx(
          "mt-5 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] md:text-6xl",
          dark ? "text-cream" : "text-ink",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={clsx("mt-5 text-lg leading-relaxed", dark ? "text-cream/65" : "text-ink/60", center && "mx-auto max-w-2xl")}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
