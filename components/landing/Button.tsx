import { ArrowRight } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "cyan";
type Size = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "border border-vm-ink bg-vm-ink text-white shadow-vm-cta hover:border-vm-ink-2 hover:bg-vm-ink-2 hover:shadow-vm-cta-h",
  ghost:
    "border border-vm-line-cool bg-transparent text-vm-ink hover:border-vm-ink hover:bg-white hover:shadow-vm",
  cyan:
    "border border-vm-cyan bg-vm-cyan text-vm-ink shadow-vm-cyan hover:border-vm-cyan-deep hover:bg-vm-cyan-deep hover:shadow-vm-cyan"
};

const sizeClasses: Record<Size, string> = {
  sm: "min-h-10 px-4 text-[13px]",
  md: "min-h-12 px-5 text-sm",
  lg: "min-h-14 px-6 text-[15px]"
};

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  pill = true,
  withArrow = false,
  ...props
}: {
  children: ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
  pill?: boolean;
  withArrow?: boolean;
} & HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center justify-center gap-2 font-medium leading-none transition duration-fast ease-vm-ease hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vm-cyan",
        pill ? "rounded-pill" : "rounded-sm",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
      {withArrow ? <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={1.8} /> : null}
    </span>
  );
}
