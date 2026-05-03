import type { LucideIcon } from "lucide-react";

type PrincipleCardProps = {
  label?: string;
  title: string;
  body: string;
  Icon: LucideIcon;
  showConnector?: boolean;
};

export function PrincipleCard({
  label = "Princípio",
  title,
  body,
  Icon,
  showConnector = false
}: PrincipleCardProps) {
  return (
    <article className="group relative h-full overflow-hidden rounded-[12px] border border-[color:var(--vm-line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(247,250,250,0.98)_100%)] p-[28px_28px_28px_32px] transition-[transform,border-color,box-shadow,background] duration-300 ease-vm-out hover:-translate-y-0.5 hover:border-vm-cyan/60 hover:bg-white hover:shadow-[0_18px_44px_-24px_rgba(22,212,232,0.38)]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-vm-cyan/80 to-transparent opacity-0 transition-opacity duration-300 ease-vm-out group-hover:opacity-100"
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(22,212,232,0.12),transparent_40%)] opacity-0 transition-opacity duration-300 ease-vm-out group-hover:opacity-100"
      />

      {showConnector ? (
        <>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 items-center gap-1 opacity-0 transition-[opacity,transform] duration-300 ease-vm-out md:flex group-hover:translate-x-1.5 group-hover:opacity-100"
          >
            <span className="h-[2px] w-6 origin-left scale-x-0 bg-vm-cyan-deep transition-transform duration-300 ease-vm-out group-hover:scale-x-100" />
            <span className="size-3 rotate-45 border-r-2 border-t-2 border-vm-cyan-deep" />
          </span>

          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-6 top-6 z-10 flex flex-col items-center gap-1 opacity-0 transition-[opacity,transform] duration-300 ease-vm-out md:hidden group-hover:translate-y-1.5 group-hover:opacity-100"
          >
            <span className="h-6 w-[2px] origin-top scale-y-0 bg-vm-cyan-deep transition-transform duration-300 ease-vm-out group-hover:scale-y-100" />
            <span className="size-3 rotate-[135deg] border-r-2 border-t-2 border-vm-cyan-deep" />
          </span>
        </>
      ) : null}

      <span className="font-mono text-[10.5px] font-medium uppercase leading-[1.4] tracking-[0.14em] text-vm-muted-2">
        ↳ {label}
      </span>

      <h3 className="relative z-[1] vm-h3 mt-8 max-w-[15ch]">{title}</h3>
      <div
        aria-hidden="true"
        className="relative z-[1] mt-3 h-px w-10 origin-left scale-x-0 bg-vm-cyan-deep transition-transform duration-slow ease-vm-out group-hover:scale-x-100"
      />
      <p className="relative z-[1] mt-4 max-w-[28ch] text-[14.5px] leading-[1.55] text-vm-muted">{body}</p>

      <Icon
        className="absolute bottom-6 right-6 z-[1] size-8 text-vm-cyan-deep opacity-60"
        strokeWidth={1.6}
      />
    </article>
  );
}
