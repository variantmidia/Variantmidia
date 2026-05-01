"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/cn";
import { useCountUp } from "@/lib/hooks/useCountUp";
import { useInView } from "@/lib/hooks/useInView";

type MiniStatProps = {
  arrow: "up" | "down";
  value: string;
  label: string;
  accent?: boolean;
};

export function MiniStat({ arrow, value, label, accent = true }: MiniStatProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const animatedValue = useCountUp(value, 900, inView);

  return (
    <div
      ref={ref}
      className="flex items-baseline gap-3 border-b border-white/[0.06] pb-[14px]"
    >
      <style>
        {`
          @keyframes vm-ministat-bounce {
            0% { transform: translateY(4px) scale(0.92); opacity: 0; }
            60% { transform: translateY(-2px) scale(1.04); opacity: 1; }
            100% { transform: translateY(0) scale(1); opacity: 1; }
          }

          @media (prefers-reduced-motion: no-preference) {
            .vm-ministat-arrow {
              animation: vm-ministat-bounce 520ms var(--vm-ease-out) both;
            }
          }
        `}
      </style>

      <span
        className={cn(
          "vm-ministat-arrow inline-flex size-5 shrink-0 translate-y-[-2px] items-center justify-center",
          accent ? "text-[color:var(--vm-cyan)]" : "text-white/50"
        )}
        aria-hidden
      >
        <Arrow direction={arrow} />
      </span>

      <span className="font-mono text-[clamp(28px,4vw,44px)] font-medium leading-none tracking-[-0.03em] text-white">
        {animatedValue}
      </span>

      <span className="min-w-0 text-[14px] leading-[1.4] text-white/60">{label}</span>
    </div>
  );
}

function Arrow({ direction }: { direction: "up" | "down" }) {
  const Icon = direction === "up" ? ArrowUpRight : ArrowDownRight;

  return <Icon className="size-[18px]" strokeWidth={1.6} />;
}
