import { Plus } from "lucide-react";

export function ProofPlaceholder() {
  return (
    <aside className="mt-16 rounded-lg border border-dashed border-[color:var(--vm-cyan)] bg-[linear-gradient(180deg,rgba(22,212,232,0.05),transparent)] px-[clamp(48px,6vw,80px)] py-[clamp(48px,6vw,80px)] text-center">
      <div className="mx-auto grid size-10 place-items-center text-vm-cyan-deep" aria-hidden>
        <Plus className="size-10" strokeWidth={1.5} />
      </div>
      <h3 className="mt-4 text-[18px] font-medium leading-[1.35] text-[color:var(--vm-ink)]">
        Espaço reservado para depoimentos validados
      </h3>
      <p className="mx-auto mt-2 max-w-[48ch] text-[14px] leading-[1.6] text-vm-muted">
        Cases reais e feedbacks de clientes entram aqui apenas quando houver lastro confirmado.
        Sem inflar números.
      </p>
    </aside>
  );
}
