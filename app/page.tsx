import { content } from "@/lib/content";
import { Button } from "@/components/landing/Button";
import { Container } from "@/components/landing/Container";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Section } from "@/components/landing/Section";
import { Credibility } from "@/components/landing/sections/Credibility";
import { Hero } from "@/components/landing/sections/Hero";
import { Pain } from "@/components/landing/sections/Pain";

export default function Home() {
  const { method, ai, differentials, faq, finalCTA } = content;

  return (
    <>
      <Header />
      <main className="bg-vm-bg text-vm-graphite">
        <Hero />
        <Credibility />
        <Pain />

        <Section id="metodo" padding="tight">
          <Container>
            <p className="vm-eyebrow">{method.eyebrow}</p>
            <h2 className="vm-h2 mt-4 max-w-3xl">{method.title}</h2>
            <p className="vm-lead mt-5">{method.body}</p>
          </Container>
        </Section>

        <Section id="tecnologia" variant="dark" padding="tight">
          <Container>
            <p className="vm-eyebrow text-vm-panel-muted">{ai.eyebrow}</p>
            <h2 className="vm-h2 mt-4 max-w-3xl text-white">{ai.title}</h2>
            <p className="vm-lead mt-5 text-vm-panel-text">{ai.body}</p>
          </Container>
        </Section>

        <Section id="diferenciais" variant="alt" padding="tight">
          <Container>
            <h2 className="vm-h2 max-w-3xl">{differentials.title}</h2>
          </Container>
        </Section>

        <Section id="faq" padding="tight">
          <Container>
            <h2 className="vm-h2">{faq.title}</h2>
          </Container>
        </Section>

        <Section id="cta-final" variant="alt" padding="tight">
          <Container>
            <h2 className="vm-h2 max-w-3xl">{finalCTA.title}</h2>
            <p className="vm-lead mt-5">{finalCTA.body}</p>
            <a className="mt-8 inline-flex" href={finalCTA.cta.primary.href}>
              <Button withArrow>{finalCTA.cta.primary.label}</Button>
            </a>
          </Container>
        </Section>
      </main>
      <Footer />
    </>
  );
}
