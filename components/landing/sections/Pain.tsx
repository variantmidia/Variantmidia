import { Container } from "@/components/landing/Container";
import { PainCard } from "@/components/landing/PainCard";
import { Section } from "@/components/landing/Section";
import { content } from "@/lib/content";

export function Pain() {
  const pain = content.pain;

  return (
    <Section id="gargalos" variant="alt" padding="tight" className="border-y border-vm-line-cool">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
          <div>
            <p className="vm-eyebrow">Gargalos de receita</p>
            <h2 className="vm-h2 mt-4 max-w-[16ch]">{pain.title}</h2>
          </div>

          <p className="vm-lead max-w-[58ch] lg:pt-10">{pain.body}</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {pain.cards.map((card) => (
            <PainCard key={card.title} title={card.title} body={card.body} />
          ))}
        </div>

        <div className="mt-8 border-l-2 border-vm-cyan-deep bg-vm-surface px-5 py-5 text-[17px] font-medium leading-[1.5] text-vm-ink shadow-vm-sm sm:px-6 lg:mt-10 lg:max-w-[720px]">
          {pain.closing}
        </div>
      </Container>
    </Section>
  );
}
