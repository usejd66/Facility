import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

const brands: { name: string; src: string; w: number; h: number; className?: string }[] = [
  { name: "Kärcher", src: "/brands/karcher.svg", w: 160, h: 40 },
  { name: "Vileda", src: "/brands/vileda.svg", w: 140, h: 48 },
  { name: "Ecolab", src: "/brands/ecolab.svg", w: 140, h: 32 },
  { name: "3M", src: "/brands/3m.svg", w: 90, h: 48, className: "max-h-5 md:max-h-8" },
  { name: "Henkel", src: "/brands/henkel.svg", w: 120, h: 56 },
  { name: "Domestos", src: "/brands/domestos.png", w: 70, h: 62 },
  { name: "Ajax", src: "/brands/ajax.svg", w: 100, h: 50 },
];

export default function Brands({ title }: { title: string }) {
  return (
    <section aria-label={title} className="border-y border-ink/[0.07] bg-white">
      <div className="mx-auto max-w-[1320px] px-6 py-8 md:py-10">
        <p className="text-center text-[13px] font-medium text-ink/65 md:text-sm">{title}</p>
        <Reveal>
          <ul className="mt-5 flex md:mt-7 flex-wrap items-center justify-center lg:grid lg:grid-cols-7">
            {brands.map((brand) => (
              <li
                key={brand.name}
                className="flex h-14 w-1/4 items-center justify-center border-ink/[0.07] px-2.5 md:h-20 md:px-4 lg:w-auto lg:border-l lg:first:border-l-0"
              >
                <Image
                  src={brand.src}
                  alt={brand.name}
                  width={brand.w}
                  height={brand.h}
                  className={`h-auto w-auto max-w-full object-contain ${brand.className ?? "max-h-7 md:max-h-11"} opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0`}
                />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
