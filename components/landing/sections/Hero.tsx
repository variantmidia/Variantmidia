import Link from "next/link";

import { Button } from "@/components/landing/Button";
import { Chevron } from "@/components/landing/Chevron";
import { Container } from "@/components/landing/Container";
import { MonoLabel } from "@/components/landing/MonoLabel";
import { Section } from "@/components/landing/Section";
import { content } from "@/lib/content";

export function Hero() {
  const { hero } = content;
  const [line3Start, line3End] = hero.title.line3.split(" ");

  return (
    <Section
      variant="alt"
      padding="tight"
      className="min-h-[calc(100svh-28px)] overflow-hidden py-0 lg:min-h-[calc(100svh-40px)]"
    >
      <Chevron className="pointer-events-none absolute right-[-80vw] top-[-22vw] block h-[160vw] w-[160vw] origin-center rotate-[10deg] opacity-[0.14] sm:right-[-68vw] sm:top-[-18vw] sm:h-[150vw] sm:w-[150vw] lg:hidden" />
      <Chevron tone="strong" className="pointer-events-none absolute right-[-28vw] top-[-34vw] hidden h-[105vw] w-[105vw] origin-center rotate-[10deg] opacity-[0.78] lg:block xl:right-[-25vw]" />

      <Container className="relative flex min-h-[calc(100svh-28px)] items-center pb-8 pt-28 sm:pb-10 sm:pt-32 lg:min-h-[calc(100svh-40px)] lg:pb-12 lg:pt-28 xl:pb-14">
        <div className="relative z-base w-full max-w-[820px] text-left">
          <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <p className="vm-eyebrow">{hero.eyebrow}</p>
            <MonoLabel className="min-w-0 max-w-full whitespace-normal text-vm-muted-3">
              {hero.rule}
            </MonoLabel>
          </div>

          <h1 className="vm-display mt-6 max-w-[800px] text-left text-[38px] font-medium leading-[1.04] tracking-[0] max-[360px]:text-[34px] sm:mt-7 sm:text-[52px] lg:text-[70px]">
            <span className="strike">{hero.title.strike}</span>
            <span className="block">{hero.title.line2}</span>
            <span className="block light">
              <span className="block sm:inline">{line3Start}</span>
              <span className="block sm:inline sm:before:content-['\00a0']">{line3End}</span>
            </span>
            <span className="block accent">{hero.title.accent}</span>
          </h1>

          <p className="vm-lead mt-5 max-w-[52ch] text-left sm:mt-6">{hero.sub}</p>

          <div className="mt-7 flex min-w-0 flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
            <Link href={hero.cta.primary.href} className="inline-flex w-full min-w-0 sm:w-auto">
              <Button size="lg" pill withArrow className="w-full min-w-0 whitespace-nowrap sm:w-auto">
                {hero.cta.primary.label}
              </Button>
            </Link>
            <Link href={hero.cta.secondary.href} className="inline-flex w-full min-w-0 sm:w-auto">
              <Button variant="ghost" size="lg" className="w-full min-w-0 whitespace-nowrap sm:w-auto">
                {hero.cta.secondary.label}
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
