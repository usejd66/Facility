"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Marks its wrapper with data-inview="true" the first time it scrolls into view.
 * All the actual animation lives in CSS (see globals.css), so this stays tiny.
 */
export default function InView({
  as: Tag = "div",
  className,
  children,
  margin = "0px 0px -12% 0px",
}: {
  as?: "div" | "section" | "h1" | "h2" | "span";
  className?: string;
  children: React.ReactNode;
  margin?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    <Tag ref={ref as any} data-inview={seen ? "true" : undefined} className={className}>
      {children}
    </Tag>
  );
}
