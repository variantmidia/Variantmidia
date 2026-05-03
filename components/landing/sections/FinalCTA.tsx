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
              <Button size="lg" variant="cyan" withArrow className="vm-cta-breathe">
                {finalCTA.cta.primary.label}
              </Button>
            </Link>
            <Link className="inline-flex" href={finalCTA.cta.secondary.href}>
              <Button size="lg" variant="ghost">
                {finalCTA.cta.secondary.label}
              </Button>
            </Link>
            <p className="mt-2 inline-flex items-center gap-2 text-[13.5px] leading-[1.5] text-vm-muted lg:mt-1">
              <InstagramGlyph className="size-4 shrink-0 text-vm-cyan-deep" />
              <span>
                Siga-nos no Instagram:{" "}
                <Link
                  href="https://instagram.com/variantmidia"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-vm-cyan-deep transition-colors duration-200 ease-vm-out hover:text-vm-cyan"
                >
                  @variantmidia
                </Link>
              </span>
            </p>
          </div>
        </div>

        <p className="mt-8 border-t border-vm-line pt-5 text-[13.5px] leading-[1.5] text-vm-muted">
          {finalCTA.micro}
        </p>
      </Container>
    </Section>
  );
}

function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.9" />
      <circle cx="17.2" cy="6.8" r="1.15" fill="currentColor" />
    </svg>
  );
}
