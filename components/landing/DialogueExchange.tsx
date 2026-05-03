import type { CSSProperties } from "react";

type DialogueExchangeProps = {
  quote: string;
  response: string;
  delay?: number;
};

export function DialogueExchange({ quote, response, delay = 0 }: DialogueExchangeProps) {
  return (
    <article className="group border-b border-[color:var(--vm-line)] py-12 last:border-b-0">
      <div
        className="dialogue-client-reveal mb-6 flex items-start gap-5"
        style={{ "--delay": `${delay}ms` } as CSSProperties}
      >
        <Avatar label="C." />
        <p className="max-w-[32ch] font-serif text-[clamp(20px,2.4vw,30px)] font-light italic leading-[1.3] text-[color:var(--vm-ink)]">
          &ldquo;{quote}&rdquo;
        </p>
      </div>

      <div
        className="dialogue-separator mx-auto my-4 h-8 w-px bg-vm-line transition-colors duration-300 ease-vm-out group-hover:bg-vm-cyan-deep"
        aria-hidden="true"
      />

      <div
        className="dialogue-vm-reveal ml-auto flex max-w-[65%] flex-row-reverse items-start gap-5 max-sm:max-w-full"
        style={{ "--delay": `${delay + 200}ms` } as CSSProperties}
      >
        <Avatar label="VM." variant="vm" />
        <p className="max-w-[36ch] text-[15px] leading-[1.55] text-[color:var(--vm-graphite)]">
          {response}
        </p>
      </div>
    </article>
  );
}

function Avatar({ label, variant = "client" }: { label: string; variant?: "client" | "vm" }) {
  return (
    <span
      className={
        variant === "vm"
          ? "grid size-10 shrink-0 place-items-center rounded-full border border-[color:var(--vm-cyan-deep)] font-mono text-[11px] font-medium text-[color:var(--vm-cyan-deep)] transition-transform duration-300 ease-vm-out group-hover:scale-105"
          : "grid size-10 shrink-0 place-items-center rounded-full border border-[color:var(--vm-line)] font-mono text-[11px] font-medium text-[color:var(--vm-muted-2)] transition-transform duration-300 ease-vm-out group-hover:scale-105"
      }
      aria-hidden
    >
      {label}
    </span>
  );
}
