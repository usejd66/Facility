"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}

/** Words light up one by one as the paragraph scrolls through the viewport. */
export default function ScrollText({ text, muted, className }: { text: string; muted?: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const main = text.split(" ");
  const rest = muted ? muted.split(" ") : [];
  const total = main.length + rest.length;

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{`${text} ${muted ?? ""}`}</span>
      <span aria-hidden>
        {main.map((w, i) => (
          <Word key={`m${i}`} progress={scrollYProgress} range={[i / total, (i + 1) / total]}>{w}</Word>
        ))}
        {rest.map((w, i) => {
          const k = main.length + i;
          return (
            <span key={`r${i}`} className="text-gold">
              <Word progress={scrollYProgress} range={[k / total, (k + 1) / total]}>{w}</Word>
            </span>
          );
        })}
      </span>
    </p>
  );
}
