"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { MotionConfig, motion, useScroll, useSpring } from "motion/react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, anchors: { offset: -72 }, autoRaf: true });
    return () => lenis.destroy();
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        aria-hidden
        style={{ scaleX }}
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-gold-light via-gold to-gold-light"
      />
      {children}
    </MotionConfig>
  );
}
