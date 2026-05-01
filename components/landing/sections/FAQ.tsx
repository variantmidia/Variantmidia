import { Container } from "@/components/landing/Container";
import { FAQItem } from "@/components/landing/FAQItem";
import { Section } from "@/components/landing/Section";
import { SectionRule } from "@/components/landing/SectionRule";
import { content } from "@/lib/content";

export function FAQ() {
  const { faq } = content;
  const [titleBefore, titleAfter] = faq.title.split("frequentes");

  return (
    <Section id="faq" padding="tight">
      <Container>
        <SectionRule index="07" total="08" label="FAQ" caption="Perguntas frequentes" />

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="vm-h2 mt-4 max-w-[12ch]">
              {titleBefore}
              <span className="font-serif font-normal italic">frequentes</span>
              {titleAfter}
            </h2>
          </div>

          <div>
            {faq.items.map((item) => (
              <FAQItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
