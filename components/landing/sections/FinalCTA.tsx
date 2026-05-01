import Link from "next/link";

import { Button } from "@/components/landing/Button";
import { Container } from "@/components/landing/Container";
import { Section } from "@/components/landing/Section";
import { SectionRule } from "@/components/landing/SectionRule";
import { content } from "@/lib/content";

export function FinalCTA() {
  const { finalCTA } = content;

  return (
    <Section id="cta-final" variant="default" padding="tight" className="border-t border-vm-line">
      <Container>
        <SectionRule
          index="08"
          total="08"
          label="Próximo passo"
          caption="Diagnóstico antes da estratégia"
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div>
            <h2 className="vm-h2 mt-4 max-w-3xl">{finalCTA.title}</h2>
            <p className="mt-5 max-w-[54ch] text-[16px] leading-[1.55] text-vm-muted">{finalCTA.body}</p>
          </div>

          <div className="flex flex-col items-start gap-3 sm:flex-row lg:flex-col lg:items-stretch">
            <Link className="inline-flex" href={finalCTA.cta.primary.href}>
              <Button size="lg" variant="cyan" withArrow>
                {finalCTA.cta.primary.label}
              </Button>
            </Link>
            <Link className="inline-flex" href={finalCTA.cta.secondary.href}>
              <Button size="lg" variant="ghost">
                {finalCTA.cta.secondary.label}
              </Button>
            </Link>
          </div>
        </div>

        <p className="mt-8 border-t border-vm-line pt-5 text-[13.5px] leading-[1.5] text-vm-muted">
          {finalCTA.micro}
        </p>
      </Container>
    </Section>
  );
}
