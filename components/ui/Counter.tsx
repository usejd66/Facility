"use client";
import { useEffect, useRef } from "react";
import { animate, useInView } from "motion/react";

/** Counts up to a number when it scrolls into view. Ranges like "24–48" animate both ends. */
export default function Counter({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const parts = value.split("–").map(Number);
    if (parts.some(Number.isNaN)) return;
    const node = ref.current;
    const controls = animate(0, 1, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (t) => {
        node.textContent = parts.map((n) => Math.round(n * t)).join("–");
      },
    });
    return () => controls.stop();
  }, [inView, value]);

  return <span ref={ref} className={className}>{value}</span>;
}
