import clsx from "clsx";

export default function Marquee({
  items,
  duration = 40,
  reverse = false,
  className,
  itemClassName,
  separator = "✦",
}: {
  items: readonly string[];
  duration?: number;
  reverse?: boolean;
  className?: string;
  itemClassName?: string;
  separator?: string;
}) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className={clsx("flex items-center whitespace-nowrap", itemClassName)}>
          {item}
          <span className="mx-8 text-gold md:mx-12" aria-hidden>{separator}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <div className={clsx("group flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]", className)}>
      <div
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
        style={{ "--marquee-duration": `${duration}s`, animationDirection: reverse ? "reverse" : "normal" } as React.CSSProperties}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
