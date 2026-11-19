/* Hand-drawn SVG artwork for the "Why choose us" section. */

type P = { className?: string };

/** Curved four-point sparkle centred on (x, y) with radius r. */
function spark(x: number, y: number, r: number) {
  const k = r * 0.18;
  return `M${x} ${y - r}C${x + k} ${y - k} ${x + k} ${y - k} ${x + r} ${y}C${x + k} ${y + k} ${x + k} ${y + k} ${x} ${y + r}C${x - k} ${y + k} ${x - k} ${y + k} ${x - r} ${y}C${x - k} ${y - k} ${x - k} ${y - k} ${x} ${y - r}Z`;
}

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2.6, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export function HouseCleanIcon({ className }: P) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <g {...stroke}>
        <path d="M9 31 32 12l23 19" />
        <path d="M44 21v-7h5v11" />
        <path d="M15 27v25h34V27" />
        <path d="M22 52V38h9v14" />
        <rect x="36" y="36" width="9" height="9" rx="1" />
        <path d="M40.5 36v9M36 40.5h9" />
        <path d="M11 56h42" />
      </g>
      <path d={spark(11, 13, 5.5)} fill="currentColor" />
      <path d={spark(55, 9, 3.5)} fill="currentColor" />
      <path d={spark(58, 46, 3)} fill="currentColor" />
    </svg>
  );
}

export function OfficeCleanIcon({ className }: P) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <g {...stroke}>
        {/* squeegee blade */}
        <g transform="rotate(45 31 33)">
          <rect x="17" y="29.5" width="28" height="7" rx="2" />
          <path d="M18 39.5h26" />
        </g>
        {/* handle + grip */}
        <path d="M33.5 30.5 47 17" />
        <path d="M46 18l7-7" strokeWidth="5" />
        {/* wiped streaks */}
        <path d="M9 36l13 13M7 45l8 8M15 30l3 3" />
      </g>
      <path d={spark(14, 14, 5.5)} fill="currentColor" />
      <path d={spark(26, 7, 3)} fill="currentColor" />
      <path d={spark(53, 44, 4)} fill="currentColor" />
    </svg>
  );
}

export function StoreCleanIcon({ className }: P) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden>
      <g {...stroke}>
        <g transform="rotate(28 34 34)">
          <path d="M34 4v26" />
          <rect x="28" y="30" width="12" height="5" rx="1" />
          <path d="M28 35l-4 20h20l-4-20" />
          <path d="M30.5 40l-1.5 15M34 40v15M37.5 40l1.5 15" />
        </g>
        <path d="M8 58h22" />
      </g>
      <circle cx="11" cy="51" r="1.6" fill="currentColor" />
      <circle cx="17" cy="47" r="1.2" fill="currentColor" />
      <circle cx="7" cy="45" r="1" fill="currentColor" />
      <path d={spark(13, 15, 5.5)} fill="currentColor" />
      <path d={spark(54, 40, 3.5)} fill="currentColor" />
      <path d={spark(52, 54, 2.5)} fill="currentColor" />
    </svg>
  );
}

export function BroomSparkIcon({ className }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 3l-7.5 7.5" />
        <path d="M12.5 10.5l1.5 1.5-5 7.5-4-4 7.5-5z" />
      </g>
      <path d={spark(5, 6, 3)} fill="currentColor" />
    </svg>
  );
}

export function Sparkles({ className }: P) {
  return (
    <svg viewBox="0 0 120 100" className={className} aria-hidden>
      <defs>
        <linearGradient id="why-spark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e4c785" />
          <stop offset="1" stopColor="#b8892f" />
        </linearGradient>
      </defs>
      <path d={spark(40, 58, 34)} fill="url(#why-spark)" />
      <path d={spark(88, 22, 18)} fill="url(#why-spark)" />
      <path d={spark(106, 70, 10)} fill="url(#why-spark)" />
    </svg>
  );
}

/** Line drawing: a cleaner mopping the floor next to a janitor cart. */
export function CleanerLineArt({ className }: P) {
  return (
    <svg viewBox="0 0 900 460" className={className} aria-hidden>
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* floor */}
        <path d="M0 440h600" />

        {/* ── cart ── */}
        <path d="M50 220h178" />
        <path d="M50 220c-16 0-16 30 0 30" />
        {/* bag holder */}
        <path d="M58 222l6 170h68l6-170" />
        <path d="M54 222c16-8 26 6 42-2s26 8 46 0" />
        <path d="M82 262l4 116M112 252l2 132" />
        {/* shelves */}
        <path d="M150 220v172M226 220v172M150 300h76M48 392h182" />
        {/* bucket */}
        <path d="M160 332l6 56h46l6-56z" />
        <path d="M156 332h66" />
        <path d="M166 332c6-18 40-18 46 0" />
        {/* bottles on middle shelf */}
        <path d="M166 300v-30c0-6 12-6 12 0v30" />
        <path d="M170 264v-8h14l4 4" />
        <path d="M192 300v-24h14v24" />
        <path d="M196 276v-6h6v6" />
        {/* caddy + tools */}
        <path d="M156 220v-24h66v24" />
        <path d="M170 196l-8-86" />
        <path d="M186 196l4-100" />
        <path d="M190 96c-12-10-6-26 2-32 8 8 12 22-2 32z" />
        <path d="M204 196l10-74" />
        <path d="M208 126l14-6 2 10-14 4" />
        {/* broom leaning on cart */}
        <path d="M140 222l-24-160" />
        <path d="M112 40l8 22h-14z" />
        {/* wheels */}
        <circle cx="68" cy="406" r="10" />
        <circle cx="126" cy="406" r="10" />
        <circle cx="212" cy="406" r="10" />
        <path d="M68 392v4M126 392v4M212 392v4" />

        {/* ── cleaner ── */}
        {/* head + hair */}
        <ellipse cx="395" cy="74" rx="21" ry="25" />
        <path d="M374 72c-2-24 18-34 34-28 12 5 12 18 8 28" />
        <circle cx="420" cy="54" r="10" />
        <path d="M389 98l-1 12M402 98l2 12" />
        {/* shoulders + torso */}
        <path d="M366 120c6-10 22-12 29-10 10-2 25 0 33 10" />
        <path d="M368 120l-4 78M428 122l4 76" />
        {/* apron */}
        <path d="M382 126h28v70" />
        <path d="M382 126v70" />
        <path d="M382 126l-6-14M410 126l8-14" />
        <path d="M360 198h76" />
        <path d="M362 198l-8 122h90l-8-122" />
        <path d="M384 238h28v24h-28z" />
        <path d="M436 198c8 4 10 14 6 22M436 198c10-2 16 4 18 12" />
        {/* mop handle (behind hands) */}
        <path d="M414 146 270 422" />
        {/* far arm reaching to the upper hand */}
        <path d="M426 120c14 10 20 30 14 46-6 10-20 8-34 4" />
        <path d="M420 134c8 12 10 22 4 26l-18 2" />
        <path d="M406 160c-6-2-11 2-10 7 1 5 6 7 11 5" />
        {/* near arm bent down to the lower hand */}
        <path d="M366 122c-14 18-20 44-16 60 4 14 14 28 22 38" />
        <path d="M378 138c-10 18-14 34-12 46 2 10 8 20 14 28" />
        <path d="M370 214c-5 6-1 14 7 13 8-1 9-10 3-14" />
        {/* mop head */}
        <path d="M260 414l20 12" />
        <path d="M270 424c-14 8-28 13-42 15M270 424c-7 8-12 13-17 16M270 424c0 8 1 12 2 16M270 424c8 7 14 12 19 16M270 424c-22 4-36 7-48 8" />
        {/* legs (slight stride) + shoes */}
        <path d="M374 320l-6 100M392 320l-4 100M410 320l4 100M428 320l2 100" />
        <path d="M368 420c-14 0-16 10-3 12h24l-1-12" />
        <path d="M414 420l1 12h28c10-2 8-12-4-12h-8" />
        {/* hint of a face turned toward the mop */}
        <path d="M374 76c-3 2-4 5-2 7" />
      </g>
    </svg>
  );
}
