"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, anchors: { offset: -72 }, autoRaf: true });
    return () => lenis.destroy();
  }, []);

  // LazyMotion + `m.*` components ship only the animation features we use (smaller JS bundle)
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}
