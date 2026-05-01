import { Container } from "@/components/landing/Container";
import { Section } from "@/components/landing/Section";
import { SectionRule } from "@/components/landing/SectionRule";
import { content } from "@/lib/content";

export function Pain() {
  const pain = content.pain;
  const statuses = ["RECORRENTE", "CRÍTICO", "COMUM", "SINTOMA"] as const;
  const [closingLead, closingRest] = pain.closing.split(", ");

  return (
    <Section id="gargalos" variant="dark" padding="tight" className="overflow-hidden border-y border-vm-panel-line bg-vm-panel">
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/images/documentos-foto-adv.webp"
          alt=""
          className="h-full w-full object-cover object-center opacity-70"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,12,17,0.98)_0%,rgba(8,12,17,0.9)_38%,rgba(8,12,17,0.66)_68%,rgba(8,12,17,0.86)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_48%,rgba(22,212,232,0.18),transparent_34%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-vm-panel to-transparent" />
      </div>

      <Container className="relative z-base">
        <div className="[--vm-graphite:var(--vm-panel-text)] [--vm-ink:var(--vm-panel-text)] [--vm-line:var(--vm-panel-line)] [--vm-muted:var(--vm-panel-muted)] [--vm-muted-2:rgba(213,222,230,0.68)] [--vm-surface:rgba(255,255,255,0.035)]">
          <SectionRule index="03" total="08" label="DOR" caption="Onde a receita vaza" />

          <div className="max-w-[720px]">
            <h2 className="vm-h2 mt-4 max-w-[15ch]">{pain.title}</h2>

            <p className="vm-lead mt-8 max-w-[58ch]">{pain.body}</p>
          </div>

          <ol className="mt-12 border-t border-[color:var(--vm-line)]" role="list">
            {pain.cards.map((card, index) => (
              <li
                key={card.title}
                className="group -mx-4 grid gap-5 border-b border-[color:var(--vm-line)] px-4 py-7 backdrop-blur-[1px] transition-colors duration-300 ease-vm-out hover:bg-white/[0.055] sm:grid-cols-[72px_minmax(0,1fr)_auto] sm:gap-8 lg:py-8"
              >
                <span className="font-mono text-[11px] font-semibold leading-[1.4] tracking-[0.14em] text-vm-cyan">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-baseline">
                    <h3 className="text-[18px] font-semibold leading-[1.25] text-[color:var(--vm-ink)] transition-colors duration-300 ease-vm-out group-hover:text-white">
                      {card.title}
                    </h3>
                    <span className="vm-pain-status font-mono text-[10.5px] font-semibold uppercase leading-[1.4] tracking-[0.14em] text-[color:var(--vm-muted-2)] transition-colors duration-300 ease-vm-out group-hover:text-vm-crit">
                      [{statuses[index]}]
                    </span>
                  </div>

                  <p className="mt-5 max-w-[52ch] text-[15px] leading-[1.6] text-[color:var(--vm-muted)]">
                    {card.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-14 border-t border-vm-cyan/35 pt-8 lg:mt-[72px] lg:pt-10">
            <p className="relative max-w-[760px] text-balance pl-8 text-[clamp(22px,2.4vw,32px)] font-medium leading-[1.24] tracking-[0] text-white">
              <span className="absolute left-0 top-[0.22em] h-[calc(100%-0.28em)] w-px bg-vm-cyan" aria-hidden />
              <span className="absolute left-[-3px] top-[0.25em] size-[7px] bg-vm-cyan shadow-[0_0_18px_rgba(22,212,232,0.65)]" aria-hidden />
              <span className="font-serif italic font-normal text-vm-cyan">{closingLead},</span>{" "}
              {closingRest}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
