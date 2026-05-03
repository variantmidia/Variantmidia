"use client";

import { BenefitTile } from "@/components/landing/BenefitTile";
import { Container } from "@/components/landing/Container";
import { PredictabilityViz } from "@/components/landing/PredictabilityViz";
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
            {method.nodes.map((node, index) => (
              <article
                key={node.num}
                className="group relative min-h-[220px] overflow-hidden rounded-sm border border-vm-line-cool bg-[linear-gradient(180deg,rgba(247,250,250,0.98)_0%,rgba(255,255,255,0.96)_100%)] p-6 transition-[transform,border-color,background-color,box-shadow] duration-300 ease-vm-out hover:-translate-y-0.5 hover:border-vm-cyan/55 hover:bg-white hover:shadow-[0_18px_44px_-24px_rgba(22,212,232,0.38)] sm:p-7"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-vm-cyan/80 to-transparent opacity-0 transition-opacity duration-300 ease-vm-out group-hover:opacity-100"
                />

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(22,212,232,0.12),transparent_40%)] opacity-0 transition-opacity duration-300 ease-vm-out group-hover:opacity-100"
                />

                {index < method.nodes.length - 1 ? (
                  <>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 items-center gap-1 opacity-0 transition-[opacity,transform] duration-300 ease-vm-out md:flex group-hover:translate-x-1.5 group-hover:opacity-100"
                    >
                      <span className="h-[2px] w-6 origin-left scale-x-0 bg-vm-cyan-deep transition-transform duration-300 ease-vm-out group-hover:scale-x-100" />
                      <span className="size-3 rotate-45 border-r-2 border-t-2 border-vm-cyan-deep" />
                    </span>

                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute right-6 top-6 z-10 flex flex-col items-center gap-1 opacity-0 transition-[opacity,transform] duration-300 ease-vm-out md:hidden group-hover:translate-y-1.5 group-hover:opacity-100"
                    >
                      <span className="h-6 w-[2px] origin-top scale-y-0 bg-vm-cyan-deep transition-transform duration-300 ease-vm-out group-hover:scale-y-100" />
                      <span className="size-3 rotate-[135deg] border-r-2 border-t-2 border-vm-cyan-deep" />
                    </span>
                  </>
                ) : null}

                <span className="relative z-[1] font-mono text-[11px] font-semibold tracking-[0.14em] text-vm-cyan-deep">
                  {node.num}
                </span>
                <h3 className="relative z-[1] mt-8 text-[24px] font-semibold leading-[1.12] tracking-[0] text-vm-ink">
                  {node.title}
                </h3>
                <div
                  className="relative z-[1] mt-4 h-px w-12 origin-left scale-x-75 bg-vm-cyan-deep transition-transform duration-slow ease-vm-out group-hover:scale-x-100"
                  aria-hidden="true"
                />
                <p className="relative z-[1] mt-5 max-w-[34ch] text-[15px] leading-[1.6] text-vm-muted">
                  {node.body}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div
          ref={ref}
          className={cn(
            "mt-6 grid grid-cols-1 gap-3 lg:mt-8 lg:min-h-[470px] lg:grid-cols-3 lg:grid-rows-2",
            inView && "in-view"
          )}
        >
          {operation.benefits.slice(0, 2).map((benefit, index) => {
            const config = tileConfig[index];

            return (
              <BenefitTile
                key={benefit.index}
                index={benefit.index}
                title={benefit.title}
                body={benefit.body}
                featured={config.featured}
                animation={config.animation}
                visualModule={index === 1}
                hideCopy={index === 1}
                className={config.className}
              >
                {index === 0 && <PredictabilityViz />}
                {index === 1 && <TriageChatAnimation />}
              </BenefitTile>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
