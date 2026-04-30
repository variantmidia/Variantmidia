import { Card } from "@/components/landing/Card";
import { Container } from "@/components/landing/Container";
import { Section } from "@/components/landing/Section";
import { content } from "@/lib/content";

export function Credibility() {
  const { credibility } = content;

  return (
    <Section variant="default" padding="tight" className="border-y border-vm-line">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-16">
          <div>
            <p className="vm-eyebrow">Credibilidade inicial</p>
            <h2 className="vm-h2 mt-4 max-w-[15ch]">{credibility.title}</h2>
          </div>

          <div className="max-w-prose text-[17px] leading-[1.6] text-vm-muted lg:pb-2">
            {credibility.body}
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-14">
          {credibility.cards.map((card, index) => (
            <Card
              key={card.title}
              className="grid min-h-[220px] content-between border-vm-line-cool bg-vm-surface p-6 lg:p-7"
            >
              <div className="flex items-start justify-between gap-6">
                <h3 className="vm-h3 max-w-[14ch]">{card.title}</h3>
                <span className="vm-mono-label shrink-0 text-vm-cyan-deep">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <p className="mt-8 text-[15px] leading-[1.55] text-vm-muted">{card.body}</p>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}
