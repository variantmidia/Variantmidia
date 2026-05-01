import { Container } from "@/components/landing/Container";
import { DialogueExchange } from "@/components/landing/DialogueExchange";
import { ProofPlaceholder } from "@/components/landing/ProofPlaceholder";
import { Section } from "@/components/landing/Section";
import { SectionRule } from "@/components/landing/SectionRule";
import { content } from "@/lib/content";

export function Objections() {
  const { objections } = content;
  const [titleBefore, titleAfter] = objections.title.split("três coisas");

  return (
    <Section padding="tight" className="border-y border-vm-line">
      <Container>
        <div className="mx-auto max-w-[880px]">
          <SectionRule index="06" total="08" label="OBJEÇÕES" caption="Antes de confiar" />

          <h2 className="vm-h2 mt-4 max-w-[18ch]">
            {titleBefore}
            <span className="font-serif font-normal italic">três coisas</span>
            {titleAfter}
          </h2>

          <div className="mt-10 lg:mt-14">
            {objections.items.map((item) => (
              <DialogueExchange
                key={item.objection}
                quote={item.objection}
                response={item.response}
              />
            ))}
          </div>

          <ProofPlaceholder />
        </div>
      </Container>
    </Section>
  );
}
