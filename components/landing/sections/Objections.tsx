"use client";

import { Container } from "@/components/landing/Container";
import { GoogleReviewsTicker } from "@/components/landing/GoogleReviewsTicker";
import { Section } from "@/components/landing/Section";
import { SectionRule } from "@/components/landing/SectionRule";
import { cn } from "@/lib/cn";
import { content } from "@/lib/content";
import { useInView } from "@/lib/hooks/useInView";
import Image from "next/image";
import type { CSSProperties } from "react";

export function Objections() {
  const { objections } = content;
  const [titleBefore, titleAfter] = objections.title.split("três coisas");
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <Section padding="tight" className="overflow-x-hidden border-y border-vm-line">
      <Container>
        <SectionRule index="06" total="08" label="OBJEÇÕES" caption="Antes de confiar" />

        <h2 className="vm-h2 mt-4 max-w-[28ch]">
          {titleBefore}
          <span className="font-serif font-normal italic">três coisas</span>
          {titleAfter}
        </h2>

        {/* 2-col layout: cards left, gavel right */}
        <div
          ref={ref}
          className="mt-8 grid grid-cols-1 items-start gap-x-12 sm:grid-cols-2 lg:gap-x-20"
        >
          {/* Left: all 3 cards stacked — order-2 on mobile (appears after hammer) */}
          <div className="order-2 flex flex-col gap-4 sm:order-1 lg:gap-5">
            {objections.items.map((item, index) => (
              <ObjectionCard
                key={item.objection}
                objection={item.objection}
                response={item.response}
                delay={index * 130}
                inView={inView}
                showConnector={index < objections.items.length - 1}
              />
            ))}
          </div>

          {/* Right: gavel, handle off-canvas to the right — order-1 on mobile (appears after title) */}
          <div
            className={cn(
              "relative order-1 flex h-[260px] items-end overflow-visible sm:order-2 sm:h-auto",
              "opacity-0 transition-opacity duration-700 ease-vm-out",
              inView && "opacity-100"
            )}
            style={{ transitionDelay: "390ms" } as CSSProperties}
          >
            <Image
              src="/images/martelo-sem-fundo.webp"
              alt="Martelo de juiz"
              width={1200}
              height={900}
              className="w-[220%] max-w-none"
              style={{
                filter:
                  "drop-shadow(0 48px 40px rgba(0,0,0,0.38)) drop-shadow(0 80px 80px rgba(0,0,0,0.18))"
              }}
              sizes="80vw"
            />
          </div>
        </div>

        <GoogleReviewsTicker reviews={content.credibility.googleReviews} />
      </Container>
    </Section>
  );
}

function ObjectionCard({
  objection,
  response,
  delay,
  inView,
  showConnector,
}: {
  objection: string;
  response: string;
  delay: number;
  inView: boolean;
  showConnector: boolean;
}) {
  return (
    <article
      className={cn(
        "group relative overflow-hidden rounded-sm border border-vm-line bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(247,250,250,0.98)_100%)] p-7 shadow-vm-sm",
        "hover:border-vm-cyan/55 hover:bg-white hover:shadow-[0_18px_44px_-24px_rgba(22,212,232,0.38)]",
        "translate-y-3 opacity-0 transition-all duration-500 ease-vm-out",
        inView && "translate-y-0 opacity-100",
        inView && "hover:-translate-y-0.5"
      )}
      style={{ transitionDelay: `${delay}ms` } as CSSProperties}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-vm-cyan/80 to-transparent opacity-0 transition-opacity duration-300 ease-vm-out group-hover:opacity-100"
      />

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(22,212,232,0.12),transparent_40%)] opacity-0 transition-opacity duration-300 ease-vm-out group-hover:opacity-100"
      />

      {showConnector ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-7 top-7 z-10 flex flex-col items-center gap-1 opacity-0 transition-[opacity,transform] duration-300 ease-vm-out group-hover:translate-y-1.5 group-hover:opacity-100"
        >
          <span className="h-6 w-[2px] origin-top scale-y-0 bg-vm-cyan-deep transition-transform duration-300 ease-vm-out group-hover:scale-y-100" />
          <span className="size-3 rotate-[135deg] border-r-2 border-t-2 border-vm-cyan-deep" />
        </span>
      ) : null}

      <span className="relative z-[1] font-mono text-[10.5px] font-medium uppercase tracking-[0.14em] text-vm-cyan-deep">
        Objeção
      </span>

      <p className="relative z-[1] mt-4 font-serif text-[clamp(15px,1.4vw,19px)] font-light italic leading-[1.4] text-vm-ink">
        &ldquo;{objection}&rdquo;
      </p>

      <div className="relative z-[1] my-4 h-px bg-vm-line" aria-hidden="true" />

      <p className="relative z-[1] text-[13.5px] leading-[1.65] text-vm-muted">{response}</p>
    </article>
  );
}
