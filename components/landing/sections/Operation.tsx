"use client";

import { BenefitTile } from "@/components/landing/BenefitTile";
import { Container } from "@/components/landing/Container";
import { Section } from "@/components/landing/Section";
import { SectionRule } from "@/components/landing/SectionRule";
import { TriageChatAnimation } from "@/components/landing/TriageChatAnimation";
import { cn } from "@/lib/cn";
import { content } from "@/lib/content";
import { useInView } from "@/lib/hooks/useInView";

export function Operation() {
  const { operation, method } = content;
  const { ref, inView } = useInView<HTMLDivElement>();

  const tileConfig = [
    {
      featured: true,
      className: "lg:col-span-2 lg:row-span-2",
      animation: "tile-scale-up"
    },
    {
      featured: false,
      className: "lg:col-span-1 lg:row-span-2",
      animation: "tile-slide-right"
    },
    {
      featured: false,
      className: "lg:col-span-1 lg:row-span-1",
      animation: "tile-flip-in"
    },
    {
      featured: false,
      className: "lg:col-span-1 lg:row-span-1",
      animation: "tile-slide-up"
    },
    {
      featured: false,
      className: "lg:col-span-1 lg:row-span-1",
      animation: "tile-blur-in"
    }
  ] as const;

  return (
    <Section id="operacao" padding="tight" className="border-b border-vm-line">
      <Container>
        <SectionRule
          index="04"
          total="08"
          label="OPERAÇÃO"
          caption="Método e bastidor no mesmo fluxo"
        />

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-end lg:gap-16">
          <div>
            <p className="font-mono text-[10.5px] font-semibold uppercase leading-[1.4] tracking-[0.14em] text-vm-cyan-deep">
              Método
            </p>
            <h2 className="vm-h2 mt-4 max-w-[17ch]">{method.title}</h2>
          </div>

          <p className="vm-lead max-w-[62ch]">{method.body}</p>
        </div>

        <div className="mt-10 rounded-sm border border-vm-line bg-vm-surface p-4 shadow-vm-sm sm:p-5 lg:mt-12">
          <div className="grid gap-3 md:grid-cols-3">
            {method.nodes.map((node) => (
              <article
                key={node.num}
                className="group relative min-h-[220px] overflow-hidden rounded-sm border border-vm-line-cool bg-vm-bg-alt p-6 transition-colors duration-300 ease-vm-out hover:border-vm-cyan/55 hover:bg-white sm:p-7"
              >
                <span className="font-mono text-[11px] font-semibold tracking-[0.14em] text-vm-cyan-deep">
                  {node.num}
                </span>
                <h3 className="mt-8 text-[24px] font-semibold leading-[1.12] tracking-[0] text-vm-ink">
                  {node.title}
                </h3>
                <div
                  className="mt-4 h-px w-12 origin-left scale-x-75 bg-vm-cyan-deep transition-transform duration-slow ease-vm-out group-hover:scale-x-100"
                  aria-hidden="true"
                />
                <p className="mt-5 max-w-[34ch] text-[15px] leading-[1.6] text-vm-muted">
                  {node.body}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div
          ref={ref}
          className={cn(
            "mt-6 grid grid-cols-1 gap-3 lg:mt-8 lg:min-h-[560px] lg:grid-cols-3 lg:grid-rows-3",
            inView && "in-view"
          )}
        >
          {operation.benefits.map((benefit, index) => {
            const config = tileConfig[index];

            return (
              <BenefitTile
                key={benefit.index}
                index={benefit.index}
                title={benefit.title}
                body={benefit.body}
                featured={config.featured}
                animation={config.animation}
                className={config.className}
              >
                {index === 1 && <TriageChatAnimation />}
              </BenefitTile>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
