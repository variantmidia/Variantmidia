import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/landing/Footer";

const diagnosis = [
  {
    label: "01",
    title: "Falta de leitura do funil",
    body:
      "Hoje o escritório ainda não enxerga com clareza de onde o contato veio, quantos leads são realmente qualificados e quantos viram cliente."
  },
  {
    label: "02",
    title: "Atendimento e triagem manuais",
    body:
      "Parte da perda acontece entre o primeiro contato e a reunião: demora de resposta, curiosos demais, pouco critério de qualificação e follow-up irregular."
  },
  {
    label: "03",
    title: "Crescimento sem processo previsível",
    body:
      "O nome do escritório ajuda, mas ainda falta um modelo operacional que transforme demanda em agenda e agenda em contrato com mais consistência."
  }
] as const;

const deliverables = [
  "Diagnóstico inicial da operação comercial e de captação.",
  "Definição da tese principal de aquisição para o escritório, priorizando canais com maior intenção de compra.",
  "Estruturação do funil de acompanhamento: lead, qualificado, reunião, proposta e fechamento.",
  "Implantação ou ajuste de CRM para leitura real do que entra, do que trava e do que fecha.",
  "Camada de atendimento e pré-triagem com IA no WhatsApp quando fizer sentido para o volume e a rotina do escritório.",
  "Ritual de acompanhamento e relatório para que a decisão não fique no escuro nem dependa de promessa de fornecedor."
] as const;

const responsibilities = [
  "Definir um responsável interno para centralizar retorno, aprovações e prioridades.",
  "Compartilhar feedback sobre lead qualificado, reuniões realizadas e contratos fechados.",
  "Reservar janela mínima para materiais, gravações ou ajustes de atendimento quando o plano exigir.",
  "Alinhar rapidamente pontos operacionais que travem a execução, para que o projeto não repita o erro da agência anterior."
] as const;

const roadmap = [
  {
    phase: "Fase 1",
    title: "Clareza e estrutura",
    body:
      "Mapeamento do funil atual, definição de critério de lead qualificado, desenho operacional e prioridades de curto prazo."
  },
  {
    phase: "Fase 2",
    title: "Ativação e leitura",
    body:
      "Entrada do canal principal, rotina de acompanhamento, critério de resposta e organização do que precisa ser medido toda semana."
  },
  {
    phase: "Fase 3",
    title: "Conversão e velocidade",
    body:
      "Ajustes de atendimento, triagem, follow-up e operação comercial para aumentar a taxa de reunião e de contrato."
  },
  {
    phase: "Fase 4",
    title: "Escala com critério",
    body:
      "Expandir o que provar resultado, sem abrir novos vazamentos nem inflar investimento antes da hora."
  }
] as const;

const references = [
  {
    title: "Dra. Débora Borges",
    kind: "Prova social validada",
    href: "",
    body:
      '"Sou advogada trabalhista e implementei uma IA de atendimento no WhatsApp pela Variantmidia... a ferramenta realiza triagem, follow-up, agenda reuniões automaticamente e me devolveu tempo para outras demandas."',
    note: "Case de atendimento, triagem e agendamento via WhatsApp."
  },
  {
    title: "Wagner Valadão Advocacia",
    kind: "Referência de execução",
    href: "https://advogadowagnervaladao.com.br/",
    body:
      "Site trabalhista e previdenciário com prova social, CTA direto para WhatsApp, áreas de atuação claras e estrutura pensada para conversão.",
    note: "Referência pública de posicionamento e captação."
  },
  {
    title: "Gioia & Associados",
    kind: "Referência de autoridade",
    href: "https://www.gioiaeassociados.com.br/",
    body:
      "Presença institucional mais robusta, com áreas de atuação, equipe, história, depoimentos e argumentação de confiança bem organizada.",
    note: "Referência pública de credibilidade e estrutura."
  },
  {
    title: "Leandro Azevedo Advogado",
    kind: "Referência de urgência e WhatsApp",
    href: "https://leandroazevedoadvogado.com/",
    body:
      "Landing orientada a resposta rápida, CTA forte para WhatsApp e uso de reviews como gatilho de confiança antes do contato.",
    note: "Referência pública de conversão e urgência."
  }
] as const;

const investment = [
  { label: "Mensalidade de operação", value: "R$ 3.000 / mês" },
  { label: "Verba recomendada de mídia", value: "R$ 1.200 a R$ 1.500 / mês" },
  { label: "Investimento inicial estimado", value: "R$ 4.200 a R$ 4.500 / mês" }
] as const;

export const metadata: Metadata = {
  title: "Proposta | Saraiva & Amaral Sociedade de Advogados",
  description:
    "Proposta executiva da Variantmidia para Saraiva & Amaral Sociedade de Advogados, baseada na reunião de 25/06/2026."
};

function SectionRule({
  index,
  label,
  title,
  body
}: {
  index: string;
  label: string;
  title: string;
  body?: string;
}) {
  return (
    <section className="border-t border-vm-line pt-7 sm:pt-9">
      <div className="mb-5 flex items-center gap-4">
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-vm-muted-2">
          {index}
        </span>
        <div className="h-px flex-1 bg-vm-ink" />
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-vm-muted-2">
          {label}
        </span>
      </div>
      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,0.38fr)] lg:gap-10">
        <h2 className="vm-h2 max-w-[18ch]">{title}</h2>
        {body ? <p className="vm-lead max-w-[56ch] text-vm-muted">{body}</p> : <div />}
      </div>
    </section>
  );
}

export default function SaraivaAmaralProposalPage() {
  return (
    <>
      <main className="min-h-screen bg-vm-bg text-vm-graphite">
        <div className="sticky top-0 z-[60] border-b border-vm-line-cool/80 bg-vm-bg-alt/88 backdrop-blur-2xl">
          <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-5 px-5 py-4 sm:px-6 lg:px-8 xl:px-12">
            <Link href="/" aria-label="Variantmidia - início" className="inline-flex items-center">
              <img
                src="/logos/horizontal-light.svg"
                alt="Variantmidia"
                width="1899"
                height="336"
                className="h-8 w-auto max-w-[168px] sm:max-w-[190px]"
              />
            </Link>

            <div className="hidden items-center gap-3 md:flex">
              <span className="rounded-pill border border-vm-line-cool bg-white/70 px-3 py-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-vm-muted-2">
                Proposta executiva
              </span>
              <span className="rounded-pill bg-vm-cyan/12 px-3 py-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-vm-cyan-deep">
                Retorno combinado até 29/06
              </span>
            </div>
          </div>
        </div>

        <section className="relative overflow-hidden border-b border-vm-line-cool bg-[radial-gradient(circle_at_top_left,rgba(22,212,232,.16),transparent_26%),linear-gradient(180deg,rgba(255,255,255,.65),rgba(242,244,241,.94))]">
          <div className="mx-auto grid w-full max-w-[1240px] gap-14 px-5 py-16 sm:px-6 lg:grid-cols-[minmax(0,0.64fr)_minmax(320px,0.36fr)] lg:gap-10 lg:px-8 lg:py-24 xl:px-12">
            <div>
              <div className="mb-6 flex flex-wrap gap-3">
                <span className="rounded-pill border border-vm-line-cool bg-white/75 px-3 py-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-vm-muted-2">
                  Saraiva & Amaral Sociedade de Advogados
                </span>
                <span className="rounded-pill bg-vm-cyan/12 px-3 py-2 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-vm-cyan-deep">
                  Reunião-base: 25/06/2026
                </span>
              </div>

              <p className="vm-eyebrow">Descrição comercial com escopo, responsabilidade e investimento</p>
              <h1 className="vm-display mt-6 max-w-[10ch]">
                O problema não é captar mais.
                <br />
                <em className="font-serif font-light italic text-vm-cyan-deep">
                  É converter com mais critério.
                </em>
              </h1>
              <p className="vm-lead mt-8 max-w-[62ch] text-vm-muted">
                Esta proposta foi montada com base no que vocês pediram na reunião: um material claro, escrito,
                que mostre exatamente o que entra, o que o escritório precisa sustentar do lado de dentro e
                como o investimento se divide entre operação e mídia.
              </p>
            </div>

            <aside className="self-start rounded-[20px] border border-white/70 bg-white/82 p-6 shadow-vm lg:p-7">
              <div className="flex items-center justify-between gap-3 border-b border-vm-line pb-4">
                <div>
                  <div className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-vm-muted-2">
                    Documento VM-SARAIVA-0625
                  </div>
                  <p className="mt-2 text-[14px] leading-[1.55] text-vm-muted">
                    Preparado por Matheus, com base no diagnóstico e na conversa de decisão.
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-vm-cyan/14 shadow-[inset_0_0_0_1px_rgba(22,212,232,.22)]" />
              </div>

              <div className="mt-6 space-y-4">
                <div className="rounded-[16px] border border-vm-line bg-vm-bg-alt/85 p-4">
                  <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-vm-muted-2">
                    O que ficou claro na reunião
                  </div>
                  <p className="mt-3 text-[14px] leading-[1.6] text-vm-muted">
                    A entrega fez sentido. O bloqueio não foi falta de valor percebido; foi necessidade de
                    clareza operacional, alinhamento interno e leitura do impacto total entre serviço e mídia.
                  </p>
                </div>

                <div className="rounded-[16px] border border-vm-line bg-vm-panel p-5 text-vm-panel-text shadow-vm-shadow-cyan">
                  <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-vm-cyan">
                    Recomendação central
                  </div>
                  <p className="mt-3 text-[15px] leading-[1.65] text-vm-panel-muted">
                    Estruturar um sistema que junte captação, leitura de funil, triagem e acompanhamento,
                    para o escritório parar de depender de tentativa e erro e passar a decidir com critério.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-16 px-5 py-14 sm:px-6 lg:px-8 lg:py-20 xl:px-12">
          <SectionRule
            index="01"
            label="Leitura do caso"
            title="O que entendemos do momento atual do escritório."
            body="Vocês já têm reputação, experiência e uma base real de atendimento. O que falta hoje não é nome de mercado. É previsibilidade para transformar demanda em contrato com mais método."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {diagnosis.map((item) => (
              <article
                key={item.label}
                className="rounded-[18px] border border-vm-line bg-white/78 p-5 shadow-vm-sm transition-transform duration-default ease-vm-ease hover:-translate-y-1 hover:shadow-vm"
              >
                <div className="mb-5 inline-flex rounded-pill bg-vm-cyan/12 px-3 py-1.5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-vm-cyan-deep">
                  {item.label}
                </div>
                <h3 className="vm-h3 max-w-[15ch]">{item.title}</h3>
                <p className="mt-4 text-[15px] leading-[1.65] text-vm-muted">{item.body}</p>
              </article>
            ))}
          </div>

          <SectionRule
            index="02"
            label="Escopo recomendado"
            title="O que entra no trabalho da Variantmidia."
            body="A proposta não é vender campanha isolada. É estruturar um motor de aquisição e conversão que faça sentido para o tipo de escritório, para a rotina de vocês e para a meta de crescimento."
          />

          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.58fr)_minmax(0,0.42fr)]">
            <div className="rounded-[22px] border border-vm-line bg-white p-6 shadow-vm lg:p-7">
              <div className="mb-5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-vm-muted-2">
                Entregas previstas
              </div>
              <div className="space-y-3">
                {deliverables.map((item, index) => (
                  <div
                    key={item}
                    className="grid gap-3 border-t border-vm-line-cool pt-3 first:border-t-0 first:pt-0 sm:grid-cols-[42px_minmax(0,1fr)]"
                  >
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-vm-cyan-deep">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[15px] leading-[1.65] text-vm-muted">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[22px] border border-white/10 bg-vm-panel p-6 text-vm-panel-text shadow-vm lg:p-7">
              <div className="mb-5 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-vm-cyan">
                Observação importante
              </div>
              <h3 className="vm-h3 max-w-[18ch] text-white">
                Se o orçamento pesar, o desenho pode ser faseado sem matar a tese principal.
              </h3>
              <p className="mt-4 text-[15px] leading-[1.68] text-vm-panel-muted">
                Isso significa começar pelo que trava mais hoje e evoluir para uma operação mais completa
                conforme o escritório ganhar clareza, ritmo e retorno. O objetivo não é inflar escopo. É
                corrigir o gargalo certo primeiro.
              </p>
              <div className="mt-6 grid gap-3">
                {roadmap.map((step) => (
                  <div key={step.phase} className="rounded-[16px] border border-vm-panel-line bg-white/[0.03] p-4">
                    <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-vm-cyan">
                      {step.phase}
                    </div>
                    <h4 className="mt-2 text-[17px] font-semibold text-white">{step.title}</h4>
                    <p className="mt-2 text-[14px] leading-[1.6] text-vm-panel-muted">{step.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <SectionRule
            index="03"
            label="Contrapartida do escritório"
            title="O que precisa acontecer do lado de vocês para a execução funcionar."
            body="Esse foi um dos pontos mais importantes da reunião. O projeto precisa ter espaço operacional interno para não repetir a frustração com fornecedor anterior."
          />

          <div className="grid gap-4 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]">
            <div className="rounded-[18px] border border-vm-line bg-vm-bg-alt/88 p-5">
              <div className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-vm-muted-2">
                Em linguagem direta
              </div>
              <p className="mt-3 text-[15px] leading-[1.68] text-vm-muted">
                O projeto melhora muito quando o escritório consegue devolver feedback, aprovar ajustes
                com agilidade e manter um dono interno para as prioridades. Sem isso, a execução perde
                ritmo e volta a depender de improviso.
              </p>
            </div>

            <div className="rounded-[18px] border border-vm-line bg-white p-5 shadow-vm-sm">
              <div className="space-y-3">
                {responsibilities.map((item, index) => (
                  <div
                    key={item}
                    className="grid gap-3 border-t border-vm-line-cool pt-3 first:border-t-0 first:pt-0 sm:grid-cols-[44px_minmax(0,1fr)]"
                  >
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-vm-cyan-deep">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[15px] leading-[1.65] text-vm-muted">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <SectionRule
            index="04"
            label="Referências"
            title="Provas e casos para reduzir risco antes da decisão."
            body="Como combinado, este bloco serve para vocês enxergarem tanto prova social real quanto referências públicas de execução e posicionamento."
          />

          <div className="grid gap-4 md:grid-cols-2">
            {references.map((item, index) => (
              <article
                key={item.title}
                className={`rounded-[20px] border p-5 ${
                  index === 0
                    ? "border-white/10 bg-vm-panel text-vm-panel-text shadow-vm-shadow-cyan"
                    : "border-vm-line bg-white/82 text-vm-graphite shadow-vm-sm"
                }`}
              >
                <div
                  className={`font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] ${
                    index === 0 ? "text-vm-cyan" : "text-vm-muted-2"
                  }`}
                >
                  {item.kind}
                </div>
                <h3 className={`mt-3 text-[24px] leading-[1.05] tracking-[-0.03em] ${index === 0 ? "text-white" : "text-vm-ink"}`}>
                  {item.title}
                </h3>
                <p className={`mt-4 text-[15px] leading-[1.68] ${index === 0 ? "text-vm-panel-muted" : "text-vm-muted"}`}>
                  {item.body}
                </p>
                <p className={`mt-4 text-[13.5px] leading-[1.55] ${index === 0 ? "text-white/72" : "text-vm-muted-2"}`}>
                  {item.note}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`mt-5 inline-flex items-center gap-2 rounded-pill px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] transition ${
                      index === 0
                        ? "border border-white/14 bg-white/8 text-white hover:border-white/24 hover:bg-white/12"
                        : "border border-vm-line-cool bg-vm-bg-alt text-vm-ink hover:border-vm-ink/15 hover:bg-white"
                    }`}
                  >
                    Abrir referência
                  </a>
                ) : null}
              </article>
            ))}
          </div>

          <SectionRule
            index="05"
            label="Investimento"
            title="Como o investimento se divide."
            body="Aqui está a estrutura financeira alinhada com o que foi apresentado na reunião: serviço separado de mídia, para que a decisão fique clara e comparável internamente."
          />

          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.56fr)_minmax(0,0.44fr)]">
            <div className="rounded-[22px] border border-vm-line bg-white p-6 shadow-vm lg:p-7">
              <div className="space-y-3">
                {investment.map((item, index) => (
                  <div
                    key={item.label}
                    className={`flex items-end justify-between gap-6 border-t border-vm-line-cool py-4 ${
                      index === 0 ? "border-t-0 pt-0" : ""
                    }`}
                  >
                    <div>
                      <div className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.12em] text-vm-muted-2">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                      <p className="mt-2 text-[15px] leading-[1.55] text-vm-muted">{item.label}</p>
                    </div>
                    <strong className="text-right text-[28px] leading-none tracking-[-0.04em] text-vm-ink">
                      {item.value}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-[18px] border border-vm-cyan/20 bg-vm-cyan/10 p-4">
                <p className="text-[14px] leading-[1.62] text-vm-graphite">
                  <strong>Importante:</strong> a verba de mídia é investida diretamente nas plataformas. Se alguma
                  ferramenta ou integração adicional for realmente necessária para o desenho final, isso é alinhado
                  antes da ativação.
                </p>
              </div>
            </div>

            <div className="rounded-[22px] border border-white/10 bg-vm-panel p-6 text-vm-panel-text shadow-vm lg:p-7">
              <div className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-vm-cyan">
                Leitura comercial
              </div>
              <h3 className="vm-h3 mt-4 max-w-[15ch] text-white">
                O preço não foi o único tema da reunião.
              </h3>
              <p className="mt-4 text-[15px] leading-[1.68] text-vm-panel-muted">
                O escritório também pediu clareza sobre escopo, carga operacional e o que precisará sustentar do
                lado de dentro. Por isso esta página existe: para transformar percepção em leitura concreta antes
                da decisão.
              </p>

              <div className="mt-6 rounded-[18px] border border-vm-panel-line bg-white/[0.03] p-4">
                <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-vm-cyan">
                  Próximo passo combinado
                </div>
                <p className="mt-3 text-[15px] leading-[1.65] text-vm-panel-muted">
                  Revisão interna, retorno de <strong className="text-white">sim ou não até 29/06/2026</strong> e,
                  se o bloqueio restante for apenas faixa de investimento, alinhamento de viabilidade ou faseamento.
                </p>
              </div>
            </div>
          </div>

          <section className="rounded-[28px] border border-vm-line-cool bg-[linear-gradient(135deg,rgba(255,255,255,.9),rgba(247,250,250,.92))] p-6 shadow-vm lg:p-8">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.66fr)_minmax(0,0.34fr)] lg:items-end">
              <div>
                <div className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-vm-muted-2">
                  Fechamento
                </div>
                <h2 className="mt-3 text-[clamp(34px,5.6vw,64px)] font-semibold leading-[1.02] tracking-[-0.04em] text-vm-ink">
                  Se fizer sentido para vocês, o próximo passo não é mais uma reunião longa.
                  <br />
                  <span className="text-vm-cyan-deep">É uma decisão clara.</span>
                </h2>
                <p className="mt-5 max-w-[62ch] text-[16px] leading-[1.7] text-vm-muted">
                  Esta proposta já responde o que foi pedido: o que está incluso, o que depende do escritório,
                  quais referências sustentam a confiança e como o investimento se separa entre operação e mídia.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <a
                  href="https://wa.me/5511912112227?text=Matheus%2C%20analisamos%20a%20proposta%20da%20Saraiva%20%26%20Amaral%20e%20queremos%20avancar."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-pill bg-vm-ink px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-white transition hover:-translate-y-0.5 hover:shadow-vm-cta-h"
                >
                  Confirmar interesse
                </a>
                <a
                  href="https://wa.me/5511912112227?text=Matheus%2C%20analisamos%20a%20proposta%20da%20Saraiva%20%26%20Amaral%20e%20queremos%20ajustar%20a%20viabilidade."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-pill border border-vm-line-cool bg-white px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.08em] text-vm-ink transition hover:border-vm-ink/15 hover:bg-vm-bg-alt"
                >
                  Ajustar viabilidade
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
