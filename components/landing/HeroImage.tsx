import { Scale } from "lucide-react";

import { cn } from "@/lib/cn";

export function HeroImage({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-sm",
        className
      )}
    >
      {/* Placeholder: replace src with actual hero photo */}
      <div className="aspect-[4/5] w-full bg-gradient-to-br from-vm-ink via-vm-panel to-vm-ink lg:aspect-[3/4]">
        <div className="grid h-full w-full place-items-center text-vm-cyan opacity-[0.08]" aria-hidden="true">
          <Scale className="size-40" strokeWidth={1.2} />
        </div>
      </div>

      {/* Cyan gradient overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-transparent via-vm-cyan/[0.08] to-vm-cyan/[0.15]"
        aria-hidden="true"
      />

      {/* Top edge line */}
      <div
        className="absolute inset-x-0 top-0 h-px bg-vm-cyan/50"
        aria-hidden="true"
      />

      {/* Label overlay */}
      <div className="absolute bottom-6 left-6 right-6">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-vm-cyan/70">
          Performance jurídica com diagnóstico
        </span>
      </div>
    </div>
  );
}
