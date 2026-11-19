"use client";
import { useEffect, useRef, useState } from "react";

/** Google Maps iframe that is only created when the visitor scrolls near it (keeps the page fast). */
export default function MapEmbed({ src, title }: { src: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      {show && <iframe title={title} src={src} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full w-full border-0 grayscale" />}
    </div>
  );
}
