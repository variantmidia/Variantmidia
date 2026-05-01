import { cn } from "@/lib/cn";

type ChevronTone = "default" | "strong";
type ChevronSize = "sm" | "md" | "lg" | "xl";
type ChevronPosition = "right" | "left" | "center" | "bottom-right";

const sizeStyles: Record<ChevronSize, string> = {
  sm: "h-[240px] w-[240px]",
  md: "h-[380px] w-[380px]",
  lg: "h-[560px] w-[560px]",
  xl: "h-[720px] w-[720px]"
};

const positionStyles: Record<ChevronPosition, string> = {
  right: "absolute right-[-140px] top-1/2 -translate-y-1/2",
  left: "absolute left-[-140px] top-1/2 -translate-y-1/2",
  center: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
  "bottom-right": "absolute bottom-[-120px] right-[-120px]"
};

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

export function Chevron({
  className,
  tone = "default",
  size = "lg",
  position = "right",
  opacity,
  animated = false
}: {
  className?: string;
  tone?: ChevronTone;
  size?: ChevronSize;
  position?: ChevronPosition;
  opacity?: number;
  animated?: boolean;
}) {
  const style = toneStyles[tone];
  const gradientId = `vm-chev-grad-${tone}`;
  const hasOpacityClass = /\bopacity-(?:\[|[0-9])/.test(className ?? "");
  const hasPositionClass = /\b(?:inset|top|right|bottom|left)-/.test(className ?? "");
  const hasSizeClass = /\b[hw]-/.test(className ?? "");
  const resolvedOpacity = Math.min(1, Math.max(0, opacity ?? 0.9));

  const topLength = 700;
  const bottomLength = 700;

  return (
    <div
      className={cn(
        "pointer-events-none",
        !hasSizeClass && sizeStyles[size],
        !hasPositionClass && positionStyles[position],
        className
      )}
      style={opacity !== undefined || !hasOpacityClass ? { opacity: resolvedOpacity } : undefined}
      aria-hidden="true"
    >
      <svg viewBox="0 0 600 600" className={cn("h-full w-full", animated && "vm-chevron-fade")} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#16D4E8" stopOpacity={style.start} />
            <stop offset="100%" stopColor="#16D4E8" stopOpacity={style.end} />
          </linearGradient>
          {animated ? (
            <linearGradient id={`${gradientId}-trail`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#16D4E8" stopOpacity="0" />
              <stop offset="42%" stopColor="#16D4E8" stopOpacity="0.15" />
              <stop offset="62%" stopColor="#16D4E8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#16D4E8" stopOpacity="0" />
            </linearGradient>
          ) : null}
        </defs>
        <path d="M 60 80 L 300 320 L 540 80 L 540 200 L 300 440 L 60 200 Z" fill={`url(#${gradientId})`} className={animated ? "vm-chevron-fill" : undefined} />
        <path
          d="M 60 80 L 300 320 L 540 80"
          stroke={style.strokeTop}
          strokeWidth="1.5"
          fill="none"
          strokeDasharray={animated ? topLength : undefined}
          strokeDashoffset={animated ? 0 : undefined}
          className={animated ? "vm-chevron-stroke-top" : undefined}
        />
        <path
          d="M 60 200 L 300 440 L 540 200"
          stroke={style.strokeBottom}
          strokeWidth="1"
          fill="none"
          strokeDasharray={animated ? bottomLength : undefined}
          strokeDashoffset={animated ? 0 : undefined}
          className={animated ? "vm-chevron-stroke-bottom" : undefined}
        />
        {animated ? (
          <>
            <path
              d="M 60 80 L 300 320 L 540 80"
              stroke={`url(#${gradientId}-trail)`}
              strokeWidth="3"
              fill="none"
              strokeDasharray="92 608"
              strokeLinecap="round"
              className="vm-chevron-trail vm-chevron-trail-top"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M 60 200 L 300 440 L 540 200"
              stroke={`url(#${gradientId}-trail)`}
              strokeWidth="2.4"
              fill="none"
              strokeDasharray="78 622"
              strokeLinecap="round"
              className="vm-chevron-trail vm-chevron-trail-bottom"
              vectorEffect="non-scaling-stroke"
            />
          </>
        ) : null}
      </svg>
    </div>
  );
}
