export function DialogueExchange({ quote, response }: { quote: string; response: string }) {
  return (
    <article className="vm-dialogue-exchange border-b border-[color:var(--vm-line)] py-12 last:border-b-0">
      <style>
        {`
          .vm-dialogue-exchange:nth-child(1) { --dialogue-delay: 0ms; }
          .vm-dialogue-exchange:nth-child(2) { --dialogue-delay: 150ms; }
          .vm-dialogue-exchange:nth-child(3) { --dialogue-delay: 300ms; }

          @keyframes vm-dialogue-left {
            from { opacity: 0; transform: translateX(-12px); }
            to { opacity: 1; transform: translateX(0); }
          }

          @keyframes vm-dialogue-right {
            from { opacity: 0; transform: translateX(12px); }
            to { opacity: 1; transform: translateX(0); }
          }

          @keyframes vm-dialogue-avatar {
            0% { transform: scale(0.8); }
            60% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }

          @media (prefers-reduced-motion: no-preference) {
            .vm-dialogue-client {
              animation: vm-dialogue-left 500ms var(--vm-ease-out) both;
              animation-delay: var(--dialogue-delay);
            }

            .vm-dialogue-vm {
              animation: vm-dialogue-right 500ms var(--vm-ease-out) both;
              animation-delay: calc(var(--dialogue-delay) + 200ms);
            }

            .vm-dialogue-avatar {
              animation: vm-dialogue-avatar 400ms var(--vm-ease-out) both;
              animation-delay: var(--dialogue-delay);
            }

            .vm-dialogue-vm .vm-dialogue-avatar {
              animation-delay: calc(var(--dialogue-delay) + 200ms);
            }
          }
        `}
      </style>

      <div className="vm-dialogue-client mb-6 flex items-start gap-5">
        <Avatar label="C." />
        <p className="max-w-[32ch] font-serif text-[clamp(20px,2.4vw,30px)] font-light italic leading-[1.3] text-[color:var(--vm-ink)]">
          &ldquo;{quote}&rdquo;
        </p>
      </div>

      <div className="vm-dialogue-vm ml-auto flex max-w-[65%] flex-row-reverse items-start gap-5 max-sm:max-w-full">
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
          ? "vm-dialogue-avatar grid size-10 shrink-0 place-items-center rounded-full border border-[color:var(--vm-cyan-deep)] font-mono text-[11px] font-medium text-[color:var(--vm-cyan-deep)]"
          : "vm-dialogue-avatar grid size-10 shrink-0 place-items-center rounded-full border border-[color:var(--vm-line)] font-mono text-[11px] font-medium text-[color:var(--vm-muted-2)]"
      }
      aria-hidden
    >
      {label}
    </span>
  );
}
