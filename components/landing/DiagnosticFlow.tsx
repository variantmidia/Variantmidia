import { MonoLabel } from "@/components/landing/MonoLabel";
import { cn } from "@/lib/cn";

type Status = "ok" | "warn" | "crit";

const nodes: Array<{
  num: string;
  title: string;
  body: string;
  status: Status;
  statusLabel: string;
}> = [
  {
    num: "01",
    title: "Oferta",
    body: "Posicionamento e proposta de valor",
    status: "ok",
    statusLabel: "Claro"
  },
  {
    num: "02",
    title: "Demanda",
    body: "Origem, qualificação e intenção dos leads",
    status: "warn",
    statusLabel: "Ajustar"
  },
  {
    num: "03",
    title: "Conversão",
    body: "Atendimento, follow-up e fechamento",
    status: "crit",
    statusLabel: "Gargalo"
  }
];

const statusColor: Record<Status, string> = {
  ok: "text-vm-ok",
  warn: "text-vm-warn",
  crit: "text-vm-crit"
};

type DiagnosticFlowProps = {
  showFooter?: boolean;
  className?: string;
  activeIndex?: number | null;
  getNodeRef?: (index: number) => (node: HTMLDivElement | null) => void;
};

export function DiagnosticFlow({
  activeIndex = null,
  getNodeRef,
  showFooter = true,
  className
}: DiagnosticFlowProps) {
  return (
    <aside
      aria-label="Diagnóstico — Oferta, Demanda, Conversão"
      className={cn(
        "relative overflow-hidden rounded-sm border border-vm-line bg-[linear-gradient(145deg,var(--vm-surface)_0%,var(--vm-bg-alt)_100%)] p-5 shadow-[0_24px_70px_rgba(16,24,32,0.12)] sm:p-6 lg:p-8",
        className
      )}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-vm-cyan" aria-hidden />
      <div
        className="vm-grid pointer-events-none absolute inset-0 opacity-[0.28]"
        aria-hidden
      />

      <header className="relative mb-6 flex flex-col gap-3 border-b border-vm-line pb-5 sm:flex-row sm:items-center sm:justify-between">
        <MonoLabel className="text-vm-cyan-deep">Diagnóstico · Escritório jurídico</MonoLabel>
        <span className="inline-flex w-fit items-center gap-2 rounded-pill bg-vm-cyan/10 px-3 py-1 vm-mono-label text-vm-ink">
          <span
            className="size-1.5 rounded-full bg-vm-cyan-deep animate-vm-pulse shadow-[0_0_0_3px_rgba(22,212,232,0.22)]"
            aria-hidden
          />
          Em análise
        </span>
      </header>

      <ol className="relative grid gap-3" role="list">
        {nodes.map((node, index) => (
          <li key={node.num}>
            <div
              ref={getNodeRef?.(index)}
              className={cn(
                "grid grid-cols-[36px_1fr] gap-3 rounded-sm border border-vm-line-cool bg-white/82 p-4 shadow-[0_10px_30px_rgba(16,24,32,0.045)] transition duration-default ease-vm-ease hover:-translate-y-px hover:border-vm-cyan/45 sm:grid-cols-[36px_1fr_auto] sm:items-center",
                activeIndex === index &&
                  "border-[color:var(--vm-cyan)] shadow-[0_0_0_4px_rgba(22,212,232,0.12)] duration-[250ms]"
              )}
            >
              <span className="grid size-9 place-items-center rounded-sm border border-vm-line bg-white font-mono text-xs font-semibold text-vm-ink">
                {node.num}
              </span>
              <div className="min-w-0">
                <strong className="block text-[14px] font-semibold leading-tight text-vm-ink">
                  {node.title}
                </strong>
                <span className="mt-1 block text-[12.5px] leading-[1.45] text-vm-muted">
                  {node.body}
                </span>
              </div>
              <span
                className={cn(
                  "col-start-2 font-mono text-[10.5px] uppercase tracking-[0.1em] sm:col-start-auto",
                  statusColor[node.status]
                )}
              >
                {node.statusLabel}
              </span>
            </div>
            {index < nodes.length - 1 ? (
              <div
                className="mx-4 my-1 h-px bg-gradient-to-r from-transparent via-vm-line to-transparent"
                aria-hidden
              />
            ) : null}
          </li>
        ))}
      </ol>

      {showFooter ? (
        <footer className="relative mt-6 border-t border-vm-line pt-4 text-[12.5px] leading-[1.5] text-vm-muted">
          Status visual ilustrativo para organizar a conversa sobre onde investigar primeiro.
        </footer>
      ) : null}
    </aside>
  );
}
