import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/cn";

type BenefitTileProps = {
  index: string;
  title: string;
  body: string;
  featured: boolean;
  className?: string;
  animation?: string;
  visualModule?: boolean;
  hideCopy?: boolean;
  children?: ReactNode;
};

export function BenefitTile({
  index,
  title,
  body,
  featured,
  className,
  animation,
  visualModule = false,
  hideCopy = false,
  children
}: BenefitTileProps) {
  const delay = Math.max(Number.parseInt(index, 10) - 1, 0) * 80;

  return (
    <article
      className={cn(
        animation ?? "data-reveal",
        "group relative overflow-hidden rounded-sm transition-colors duration-300 ease-vm-out",
        visualModule
          ? "min-h-[220px] overflow-visible lg:min-h-0"
          : cn(
              "border p-6 shadow-vm-sm sm:p-7 lg:min-h-0",
              featured
                ? "min-h-[540px] border-vm-panel-line bg-vm-panel text-vm-panel-text hover:border-vm-cyan/40 lg:min-h-0 lg:p-8"
                : "min-h-[220px] border-vm-line bg-vm-surface hover:border-vm-cyan/50"
            ),
        className
      )}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
    >
      <div className="flex h-full min-h-[inherit] flex-col">
        {!hideCopy && (
          <span className={cn("relative z-10 font-mono text-[11px] font-semibold uppercase leading-[1.4] tracking-[0.14em]", featured ? "text-vm-cyan" : "text-vm-cyan-deep")}>
            {index}
          </span>
        )}

        {!hideCopy && (
          <div className={cn("relative z-10 mt-10 max-w-[22ch]", featured && "lg:mt-16 lg:max-w-[28ch]", visualModule && "mb-8")}>
            <h3 className={cn("vm-h3", featured && "text-[clamp(28px,4vw,44px)] leading-[1.02] text-white")}>{title}</h3>
            <div
              aria-hidden="true"
              className={cn("mt-4 h-px w-12 origin-left scale-x-0 transition-transform duration-slow ease-vm-out group-hover:scale-x-100", featured ? "bg-vm-cyan" : "bg-vm-cyan-deep")}
            />
            <p className={cn("mt-5 max-w-[34ch] text-[15px] leading-[1.55]", featured ? "text-vm-panel-muted" : "text-vm-muted")}>{body}</p>
          </div>
        )}

        {children}
      </div>
    </article>
  );
}
