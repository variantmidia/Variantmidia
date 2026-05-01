"use client";

import type { CSSProperties } from "react";

import { Container } from "@/components/landing/Container";
import { PrincipleCard } from "@/components/landing/PrincipleCard";
import { Section } from "@/components/landing/Section";
import { SectionRule } from "@/components/landing/SectionRule";
import { cn } from "@/lib/cn";
import { content } from "@/lib/content";
import { useInView } from "@/lib/hooks/useInView";
import { Scale, SearchCheck, TrendingUp } from "lucide-react";

export function Credibility() {
  const { credibility } = content;
  const { ref, inView } = useInView<HTMLDivElement>();
  const icons = [SearchCheck, Scale, TrendingUp] as const;

  return (
    <Section
      variant="default"
      padding="tight"
      className="border-y border-vm-line"
    >
      <Container>
        <div
          ref={ref}
          className={cn(
            inView && "in-view"
          )}
        >
          <SectionRule
            index="02"
            total="08"
            label="CREDIBILIDADE"
            caption="Antes da prescrição"
          />

          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
            <h2
              className="credibility-reveal vm-h2 mt-4 max-w-[18ch] lg:col-span-7"
              style={{ "--delay": "0ms" } as CSSProperties}
            >
              Não vendemos marketing por pacote.
              <br />
              <em className="font-serif font-light italic">Primeiro entendemos</em> o que está
              impedindo seu escritório de crescer.
            </h2>

            <p
              className="credibility-reveal vm-lead max-w-[58ch] lg:col-span-5 lg:pb-2"
              style={{ "--delay": "200ms" } as CSSProperties}
            >
              {credibility.body}
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-3">
            {credibility.cards.map((card, index) => (
              <div
                key={card.title}
                className="credibility-card-reveal"
                style={{ "--delay": `${index * 120}ms` } as CSSProperties}
              >
                <PrincipleCard
                  title={card.title}
                  body={card.body}
                  Icon={icons[index]}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
