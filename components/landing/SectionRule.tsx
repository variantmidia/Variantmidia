export function SectionRule({
  index,
  total,
  label,
  caption
}: {
  index: string;
  total: string;
  label: string;
  caption?: string;
}) {
  return (
    <div className="mb-[clamp(48px,6vw,64px)] flex items-center gap-6 border-b border-[color:var(--vm-ink)] pb-3">
      <span className="shrink-0 font-mono text-[11px] font-semibold leading-[1.4] tracking-[0.14em] text-[color:var(--vm-ink)]">
        {index}{" "}
        <span className="font-normal text-[color:var(--vm-muted-2)]">
          / {total}
        </span>
      </span>

      <span className="h-px flex-1 bg-[color:var(--vm-ink)] opacity-20" aria-hidden />

      <span className="shrink-0 font-mono text-[11px] font-semibold uppercase leading-[1.4] tracking-[0.14em] text-[color:var(--vm-ink)]">
        {label}
      </span>

      {caption ? (
        <>
          <span className="hidden h-3 w-px shrink-0 bg-vm-line sm:block" aria-hidden />
          <span className="hidden font-mono text-[11px] font-medium uppercase leading-[1.4] tracking-[0.14em] text-[color:var(--vm-muted-2)] sm:inline">
            {caption}
          </span>
        </>
      ) : null}
    </div>
  );
}
