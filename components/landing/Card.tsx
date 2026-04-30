import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";

type Variant = "default" | "alt" | "dark";

const variantClasses: Record<Variant, string> = {
  default: "border border-vm-line bg-vm-surface text-vm-graphite shadow-vm-sm",
  alt: "border border-vm-line-cool bg-vm-bg-alt text-vm-graphite shadow-vm-sm",
  dark: "border border-white/10 bg-vm-panel-2 text-vm-panel-text shadow-vm-sm"
};

export function Card({
  children,
  className,
  variant = "default",
  ...props
}: {
  children: ReactNode;
  className?: string;
  variant?: Variant;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("rounded-sm p-5 sm:p-6", variantClasses[variant], className)} {...props}>
      {children}
    </div>
  );
}
