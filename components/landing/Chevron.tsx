type ChevronTone = "default" | "strong";

const toneStyles: Record<
  ChevronTone,
  {
    start: string;
    end: string;
    strokeTop: string;
    strokeBottom: string;
  }
> = {
  default: {
    start: "0.22",
    end: "0.03",
    strokeTop: "rgba(22,212,232,0.35)",
    strokeBottom: "rgba(22,212,232,0.18)"
  },
  strong: {
    start: "0.42",
    end: "0.12",
    strokeTop: "rgba(22,212,232,0.58)",
    strokeBottom: "rgba(22,212,232,0.34)"
  }
};

export function Chevron({ className, tone = "default" }: { className?: string; tone?: ChevronTone }) {
  const style = toneStyles[tone];
  const gradientId = `vm-chev-grad-${tone}`;

  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 600 600" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#16D4E8" stopOpacity={style.start} />
            <stop offset="100%" stopColor="#16D4E8" stopOpacity={style.end} />
          </linearGradient>
        </defs>
        <path d="M 60 80 L 300 320 L 540 80 L 540 200 L 300 440 L 60 200 Z" fill={`url(#${gradientId})`} />
        <path d="M 60 80 L 300 320 L 540 80" stroke={style.strokeTop} strokeWidth="1.5" fill="none" />
        <path d="M 60 200 L 300 440 L 540 200" stroke={style.strokeBottom} strokeWidth="1" fill="none" />
      </svg>
    </div>
  );
}
