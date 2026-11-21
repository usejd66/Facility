/**
 * Splits text into words that slide up out of a mask when the nearest
 * [data-inview] parent becomes visible. `start` offsets the stagger so
 * several RiseWords inside one heading animate as one sequence.
 */
export default function RiseWords({ text, start = 0, className = "" }: { text: string; start?: number; className?: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={i} className="rise-mask">
          <span className={`rise-word ${className}`} style={{ animationDelay: `${(start + i) * 0.055}s` }}>
            {word}
          </span>{" "}
        </span>
      ))}
    </>
  );
}

export const wordCount = (text: string) => text.split(" ").length;
