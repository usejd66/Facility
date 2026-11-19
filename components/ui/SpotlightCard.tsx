"use client";
import clsx from "clsx";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";

/** Card with a soft gold light that follows the cursor. */
export default function SpotlightCard({
  children,
  className,
  color = "rgba(196,151,59,0.18)",
}: {
  children: React.ReactNode;
  className?: string;
  color?: string;
}) {
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const background = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, ${color}, transparent 70%)`;

  return (
    <div
      className={clsx("group relative overflow-hidden", className)}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - r.left);
        my.set(e.clientY - r.top);
      }}
      onPointerLeave={() => {
        mx.set(-400);
        my.set(-400);
      }}
    >
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background }} />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
