import { Plus } from "lucide-react";

export function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details className="group border-t border-vm-line-cool py-5 last:border-b">
      <summary className="group/summary flex cursor-pointer list-none items-start justify-between gap-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vm-cyan [&::-webkit-details-marker]:hidden">
        <div className="min-w-0">
          <h3 className="text-[17px] font-semibold leading-[1.35] text-vm-ink transition-colors duration-default ease-vm-ease group-hover/summary:text-vm-ink-2">
            {question}
          </h3>
          <span
            className="mt-2 block font-mono text-[11px] font-medium leading-none tracking-[0.14em] text-vm-cyan-deep opacity-0 transition-opacity duration-default ease-vm-ease group-hover/summary:opacity-50 group-open:opacity-0"
            aria-hidden
          >
            ...
          </span>
        </div>

        <span
          aria-hidden="true"
          className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[color:var(--vm-cyan-tint)] text-vm-cyan-deep transition-[transform,background-color,color] duration-[240ms] ease-vm-out group-hover/summary:scale-110 group-open:rotate-45 group-open:bg-vm-cyan group-open:text-white"
        >
          <Plus className="size-4" strokeWidth={1.8} />
        </span>
      </summary>

      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-[350ms] ease-vm-out group-open:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <p className="answer mt-4 max-w-prose border-l-[3px] border-vm-cyan pl-6 text-[15px] leading-[1.6] text-vm-muted">
            {answer}
          </p>
        </div>
      </div>
    </details>
  );
}
