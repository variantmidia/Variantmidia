import type { LucideIcon } from "lucide-react";

type PrincipleCardProps = {
  label?: string;
  title: string;
  body: string;
  Icon: LucideIcon;
};

export function PrincipleCard({
  label = "Princípio",
  title,
  body,
  Icon
}: PrincipleCardProps) {
  return (
    <article className="group relative h-full overflow-hidden rounded-[12px] border border-[color:var(--vm-line)] bg-[color:var(--vm-surface)] p-[28px_28px_28px_32px]">
      <span
        aria-hidden="true"
        className="absolute left-0 top-4 bottom-4 w-[2px] bg-[color:var(--vm-cyan)] transition-all duration-300 ease-vm-out group-hover:top-0 group-hover:bottom-0"
      />

      <span className="font-mono text-[10.5px] font-medium uppercase leading-[1.4] tracking-[0.14em] text-vm-muted-2">
        ↳ {label}
      </span>

      <h3 className="vm-h3 mt-8 max-w-[15ch]">{title}</h3>
      <p className="mt-4 max-w-[28ch] text-[14.5px] leading-[1.55] text-vm-muted">{body}</p>

      <Icon
        className="absolute bottom-6 right-6 size-8 text-vm-cyan-deep opacity-60"
        strokeWidth={1.6}
      />
    </article>
  );
}
