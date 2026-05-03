"use client";

import type { CSSProperties } from "react";

import { Container } from "@/components/landing/Container";
import { DifferentialEntry } from "@/components/landing/DifferentialEntry";
import { Section } from "@/components/landing/Section";
import { SectionRule } from "@/components/landing/SectionRule";
import { content } from "@/lib/content";
import { useScrollProgress } from "@/lib/hooks/useScrollProgress";
import {
  BriefcaseBusiness,
  Gauge,
  Handshake,
  ScanSearch,
  ShieldCheck,
  Waypoints
} from "lucide-react";

export function Differentials() {
  const { differentials } = content;
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  const sides = ["left", "right", "left", "right", "left", "right"] as const;
  const icons = [
    ShieldCheck,
    ScanSearch,
    Waypoints,
    Handshake,
    Gauge,
    BriefcaseBusiness
  ] as const;

  return (
    <Section
      id="diferenciais"
      variant="dark"
      padding="tight"
      className="border-y border-vm-panel-line bg-[linear-gradient(180deg,var(--vm-panel-2)_0%,var(--vm-panel)_100%)]"
    >
      <Container>
        <div
          className="[--vm-graphite:var(--vm-panel-text)] [--vm-ink:var(--vm-panel-text)] [--vm-line:var(--vm-panel-line)] [--vm-muted:var(--vm-panel-muted)] [--vm-muted-2:rgba(213,222,230,0.68)]"
        >
          <SectionRule
            index="05"
            total="08"
            label="DIFERENCIAIS"
            caption="Por que nos diferenciamos"
          />

          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-16">
            <h2 className="vm-h2 mt-4 max-w-[20ch]">
              Por que isso é diferente de contratar uma{" "}
              <em className="font-serif font-normal italic">agência genérica</em>.
            </h2>

            <p className="vm-lead max-w-[58ch]">
              Estratégia jurídica precisa de diagnóstico, leitura comercial e tecnologia aplicada
              ao ponto certo da operação.
            </p>
          </div>

          <div ref={ref} className="relative mt-6 lg:mt-12">
            <span
              aria-hidden="true"
              className="differentials-scroll-line hidden lg:block"
              data-scroll-line
              style={{ "--scroll-progress": progress } as CSSProperties}
            />
            <span
              aria-hidden="true"
              className="differentials-scroll-arrow hidden lg:block"
              style={{ "--scroll-progress": progress } as CSSProperties}
            />

            <ol className="relative z-10 grid" role="list">
              {differentials.items.map((item, index) => (
                <DifferentialEntry
                  key={item.title}
                  index={String(index + 1).padStart(2, "0")}
                  title={item.title}
                  body={item.body}
                  side={sides[index]}
                  Icon={icons[index]}
                />
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </Section>
  );
}
