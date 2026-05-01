"use client";

import { cn } from "@/lib/cn";
import { useInView } from "@/lib/hooks/useInView";

type DifferentialEntryProps = {
  index: string;
  title: string;
  body: string;
  side: "left" | "right";
};

export function DifferentialEntry({ index, title, body, side }: DifferentialEntryProps) {
  const { ref, inView } = useInView<HTMLLIElement>();

  return (
    <li
      ref={ref}
      className={cn(
        "differential-entry group grid gap-8 py-[clamp(48px,7vw,96px)] lg:grid-cols-2 lg:gap-16",
        side === "left" ? "differential-entry--left" : "differential-entry--right",
        inView && "in-view"
      )}
    >
      <div
        className={cn(
          "max-w-[32rem]",
          side === "right" && "lg:order-2 lg:justify-self-end lg:text-right"
        )}
      >
        <span className="differential-entry__number block font-serif italic text-vm-cyan-deep transition-[color,filter] duration-[250ms] ease-vm-out group-hover:text-vm-cyan group-hover:drop-shadow-[0_0_12px_rgba(22,212,232,0.4)]">
          {index}
        </span>
        <h3 className="vm-h2 mt-3">{title}</h3>
      </div>

      <p
        className={cn(
          "vm-lead max-w-[40ch]",
          side === "left" && "lg:justify-self-end",
          side === "right" && "lg:order-1"
        )}
      >
        {body}
      </p>
    </li>
  );
}
