import { MonoLabel } from "@/components/landing/MonoLabel";
import { cn } from "@/lib/cn";

const STAGES = [
  {
    id: "01",
    title: "Triagem inicial",
    body: "Contexto, urgência e aderência antes da próxima conversa"
  },
  {
    id: "02",
    title: "Follow-up",
    body: "Ritmo de retorno para manter a oportunidade organizada"
  },
  {
    id: "03",
    title: "Resumo e contexto",
    body: "Histórico enxuto para a equipe conduzir a próxima etapa"
  }
];

const signals = ["Contexto", "Prioridade", "Próxima etapa"];

export function TechPanel({ className }: { className?: string }) {
  return (
    <aside
      aria-label="Painel de operação e atendimento"
      className={cn(
        "relative w-full min-w-0 overflow-hidden rounded-lg border border-vm-panel-line bg-gradient-to-b from-vm-panel-2/90 to-vm-panel p-4 text-vm-panel-text shadow-[0_30px_80px_-36px_rgba(0,0,0,0.72)] sm:p-6 lg:max-w-[620px]",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(22,212,232,0.14),transparent_34%),linear-gradient(to_bottom,rgba(255,255,255,0.04),transparent)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-vm-cyan/70" aria-hidden />

      <header className="relative mb-5 flex min-w-0 flex-col gap-3 border-b border-vm-panel-line pb-4 sm:flex-row sm:items-center sm:justify-between">
        <MonoLabel className="text-vm-panel-muted">
          Bastidor · <strong className="font-semibold text-white">Atendimento inteligente</strong>
        </MonoLabel>
        <span className="inline-flex w-fit max-w-full items-center gap-2 break-words font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-vm-cyan sm:text-[10.5px] sm:tracking-[0.14em]">
          <span
            className="size-1.5 shrink-0 rounded-full bg-vm-cyan shadow-[0_0_0_3px_rgba(22,212,232,0.14)] animate-vm-pulse motion-reduce:animate-none"
            aria-hidden
          />
          Apoio ao atendimento
        </span>
      </header>

      <ol className="relative grid gap-2.5" role="list">
        {STAGES.map((stage) => (
          <li
            key={stage.id}
            className="grid min-w-0 grid-cols-[28px_minmax(0,1fr)] gap-3 rounded-sm border border-vm-panel-line bg-white/[0.035] p-3.5 transition duration-default ease-vm-ease hover:border-vm-cyan/35 hover:bg-vm-cyan/[0.04] motion-reduce:transition-none sm:grid-cols-[32px_minmax(0,1fr)_72px] sm:items-center lg:grid-cols-[32px_minmax(0,1fr)_88px]"
          >
            <span className="font-mono text-[10.5px] font-medium tracking-[0.14em] text-white/60">
              {stage.id}
            </span>
            <div className="min-w-0">
              <strong className="block text-[13.5px] font-medium leading-tight text-white">
                {stage.title}
              </strong>
              <span className="mt-1 block text-xs leading-[1.55] text-vm-panel-muted">
                {stage.body}
              </span>
            </div>
            <div
              className="col-start-2 hidden h-px bg-gradient-to-r from-vm-cyan/70 to-transparent sm:col-start-auto sm:block"
              aria-hidden
            />
          </li>
        ))}
      </ol>

      <footer className="relative mt-5 border-t border-vm-panel-line pt-4">
        <div className="grid gap-2 sm:grid-cols-3">
          {signals.map((signal) => (
            <span
              key={signal}
              className="min-w-0 rounded-sm border border-vm-panel-line bg-white/[0.035] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.08em] text-vm-panel-muted sm:tracking-[0.12em]"
            >
              {signal}
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs leading-[1.5] text-vm-panel-muted">
          Sinais visuais ilustrativos para organizar atendimento, não para exibir dados reais.
        </p>
      </footer>
    </aside>
  );
}
