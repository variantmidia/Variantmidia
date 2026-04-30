---
title: "Validacao: PRD vs Planejamento Claude"
type: validation
status: reviewed-and-applied
created: "2026-04-30"
updated: "2026-04-30"
project: "variant-media"
skill: "spec-writer"
validated_prd: "_bmad-output/planning-artifacts/prd.md"
reference_documents:
  - "docs/DESIGN-SYSTEM.md"
  - "docs/HANDOFF.md"
---

# Validacao: PRD vs Planejamento Claude

## Veredito

O PRD cobre o planejamento do Claude em nivel suficiente para iniciar execucao por fases.

Ele esta bem alinhado em estrategia, estrutura da landing, stack, componentes principais, copy, guardrails, acessibilidade, performance e ordem de implementacao. O PRD nao precisa ser refeito.

O que faltava nao era escopo estrutural. Eram ajustes de precisao para deixar a execucao menos ambigua, principalmente em tres pontos:

- anchors e navegacao
- componentes e arquivos citados no Design System, mas nao obrigatorios no PRD
- checklist visual final do Claude, que esta mais granular que o DoD atual

Esses ajustes foram aplicados ao PRD apos esta validacao.

## Resultado geral

| Area validada | Status | Leitura |
|---|---|---|
| Posicionamento | Coberto | PRD preserva assessoria pratica de performance juridica |
| Estrutura da landing | Coberto | Ordem de secoes bate com Claude |
| Stack tecnica | Coberto | Next.js App Router, Tailwind, TypeScript |
| Design system | Coberto | Tokens e componentes principais estao exigidos |
| Copy oficial | Coberto | PRD referencia `lib/content.ts` e docs de copy |
| Componentes | Quase coberto | Falta explicitar alguns auxiliares/opcionais |
| Comportamentos | Parcialmente coberto | Acoes principais cobertas; estados visuais de QA podem ficar mais precisos |
| Acessibilidade | Coberto | AA, headings, focus, reduced motion |
| Performance | Coberto | Sem JS pesado, fontes via `next/font`, SVG inline |
| Bootstrap | Parcialmente coberto | PRD manda bootstrap, mas nao replica comandos do Claude |
| QA visual | Parcialmente coberto | DoD existe, mas checklist visual do Claude e mais especifico |

## Cobertura Estrategica

### O que o Claude planejou

- Landing institucional/comercial single page.
- Marca como assessoria premium de performance juridica.
- Evitar legaltech enterprise, SaaS, agencia de trafego e infoproduto.
- Foco em diagnostico, faturamento, previsibilidade e conversao.
- IA como apoio operacional, nao protagonista.

### Como o PRD cobre

O PRD cobre bem estes pontos nas secoes:

- `1. Resumo`
- `2. Decisao Estrategica`
- `3. Objetivos`
- `4. Publico`
- `14. Guardrails`
- `15. Metricas de Sucesso`

### Validacao

A cobertura estrategica esta correta.

O PRD manteve o ajuste mais importante: sair do excesso enterprise/forense e usar linguagem de assessoria pratica. Isso bate com o `HANDOFF.md`.

## Cobertura da Estrutura da Landing

### Planejado pelo Claude

1. Hero
2. Credibilidade inicial
3. Dor principal
4. Metodo `Oferta -> Demanda -> Conversao`
5. O que muda na operacao
6. IA humanizada e atendimento
7. Diferenciais
8. Prova e objeções
9. FAQ
10. CTA final
11. Footer

### Coberto pelo PRD

O PRD cobre a mesma ordem em `10. Estrutura da Pagina` e detalha cada bloco em `11. Requisitos Por Secao`.

### Validacao

Cobertura correta.

O PRD ainda adiciona `Header`, o que e necessario para implementacao e tambem foi previsto no Design System.

## Cobertura de Componentes

### Componentes cobertos pelo PRD

- `Container`
- `Section`
- `Button`
- `Header`
- `Footer`
- `BrandMark`
- `Card`
- `PainCard`
- `BenefitCard`
- `DifferentialItem`
- `DiagnosticFlow`
- `TechPanel`
- `FAQItem`
- `Eyebrow`
- `MonoLabel`
- `Chevron`
- componentes de secao: `Hero`, `Credibility`, `Pain`, `Method`, `Operation`, `AISection`, `Differentials`, `Objections`, `FAQ`, `FinalCTA`

### Componentes do Claude que nao estao totalmente obrigatorios no PRD

- `ObjectionCard` aparece na arquitetura e em fase, mas nao na lista de componentes base obrigatorios.
- `ProofPlaceholder` aparece como opcional no PRD, mas nao entra na arquitetura tecnica final.
- `MethodNode` aparece como interno, mas nao esta listado na arquitetura tecnica como arquivo separado. Isso esta ok se for funcao interna.
- `CTASection` e `ProcessPanel` aparecem no `HANDOFF.md` como recomendações antigas, mas foram substituidos por `FinalCTA` e `TechPanel` no Design System.

### Validacao

Quase coberto.

O unico ajuste recomendado e tornar `ObjectionCard` explicitamente obrigatorio e decidir se `ProofPlaceholder` existira como componente real ou apenas bloco dentro de `Objections`.

## Cobertura de Comportamentos

### Comportamentos cobertos

- Navegacao interna por anchors.
- Header sticky com mudanca de borda ao scroll.
- CTAs centralizados e facilmente substituiveis.
- FAQ nativo com `<details>` e `<summary>`.
- Motion leve via CSS.
- `prefers-reduced-motion`.
- Sem formulario fake.
- Sem claims sem prova.

### Comportamentos menos especificos no PRD

- O PRD diz que o header e sticky, mas nao exige explicitamente o comportamento `window.scrollY > 8` planejado no `Header`.
- O PRD diz que o FAQ usa `<details>`, mas nao exige os estados visuais `group-open`, rotação do icone e border.
- O PRD cobre motion leve, mas nao traz os tempos exatos do Design System: `150ms`, `250ms`, `400ms`.
- O PRD nao replica o checklist visual do Claude sobre `strike`, `pill`, chevron, uso unico de dark section e wordmark.

### Validacao

Parcialmente coberto, mas suficiente para comecar.

Para execucao fina, vale adicionar ao PRD um anexo de QA visual ou simplesmente tratar `docs/DESIGN-SYSTEM.md` como requisito obrigatorio durante implementacao.

## Cobertura Tecnica

### Planejado pelo Claude

- Next.js App Router.
- Tailwind CSS.
- TypeScript.
- `next/font`.
- `clsx`, `tailwind-merge`, `lucide-react`.
- Sem shadcn, headlessui, Framer Motion ou libs pesadas.
- Estrutura em `components/landing`.
- `lib/content.ts`.
- SVG inline.

### Coberto pelo PRD

O PRD cobre tudo isso em:

- `8. Requisitos Nao Funcionais`
- `9. Design System Obrigatorio`
- `12. Arquitetura Tecnica`
- `13. Execucao Secao por Secao`

### Lacuna pequena

O Claude incluiu comandos concretos de bootstrap:

```bash
npx create-next-app@latest variant-media --typescript --tailwind --app --no-src-dir --import-alias "@/*"
npm i clsx tailwind-merge lucide-react
```

O PRD exige bootstrap, mas nao explicita os comandos. Isso nao bloqueia, mas pode gerar variacao se outro agente iniciar o projeto.

## Cobertura de Copy

### Validacao

Coberto.

O PRD aponta para `lib/content.ts`, para `homepage-copy-variant-media-2026-04-30.md` e para a copy oficial no `DESIGN-SYSTEM.md`.

Ponto de atencao:

O PRD usa textos sem acento em varios pontos por padrao de artefato, enquanto `DESIGN-SYSTEM.md` e `HANDOFF.md` estao em PT-BR acentuado. Para o site final, usar a copy acentuada do `DESIGN-SYSTEM.md`.

## Cobertura de QA e Aprovação

### Coberto pelo PRD

- Build validado.
- Lint, se configurado.
- Mobile e desktop revisados.
- Contraste e foco visivel.
- Sem claims nao validados.
- Design system aplicado.

### Mais detalhado no Claude

O Claude tambem pede checagens especificas:

- Hero com `vm-display` e strike em `Mais marketing`.
- Chevron no canto direito, reduzido/escondido se quebrar mobile.
- CTA primario do hero com `pill={true}`.
- Eyebrow com quadrado ciano.
- `DiagnosticFlow` no metodo, nao no hero.
- Apenas uma secao dark alem do footer.
- Sem roxo/rosa.
- Sem 3D, neon de borda ou glassmorphism.
- Wordmark `variant` bold e `midia` extralight.
- Logo SVG inline.

### Validacao

O DoD do PRD esta bom para uma revisao geral, mas fraco para uma revisao visual rigorosa. Recomendo adicionar esse checklist ao PRD antes de quebrar em tasks.

## Lacunas Reais Encontradas

### 1. Anchor `#diagnostico` esta ambigua

O PRD lista `#diagnostico` na navegacao, mas nao define qual secao recebe esse id.

Recomendacao:

Definir `#diagnostico` como alias da secao `Metodo` ou criar id na secao de `Dor Principal`/`Metodo`.

Minha recomendacao: usar `#metodo` para metodo e trocar o item `Diagnostico` do menu por `Gargalos` apontando para `#dor` ou remover o link extra.

### 2. `ObjectionCard` nao esta na lista de componentes obrigatorios

Ele aparece depois, mas nao entra na lista base.

Recomendacao:

Adicionar `ObjectionCard` em `9. Design System Obrigatorio`.

### 3. `ProofPlaceholder` precisa de decisao

O PRD diz que pode ser opcional, mas nao define arquivo nem comportamento.

Recomendacao:

Decidir agora:

- ou criar `ProofPlaceholder.tsx` como componente real;
- ou remover o nome e tratar como bloco interno de `Objections`.

Minha recomendacao: criar `ProofPlaceholder.tsx`, porque o bloco de prova e uma decisao importante para evitar claims falsos.

### 4. Checklist visual do Claude nao entrou inteiro no PRD

Nao bloqueia a implementacao, mas pode prejudicar revisao.

Recomendacao:

Adicionar uma secao `QA Visual Obrigatorio` no PRD com o checklist do Design System.

### 5. Comandos de bootstrap nao estao no PRD

Nao bloqueia, mas facilita execucao por agentes.

Recomendacao:

Adicionar comandos do Design System na Fase 0.

## Rubber Duck da Landing

### Por que essa pagina existe?

Ela existe para fazer um socio de escritorio entender que o problema dele pode nao ser "mais marketing", mas falta de diagnostico sobre onde a receita esta travando.

### O usuario chega aqui querendo

Entender se a Variant Media realmente conhece o mercado juridico, se nao e mais uma agencia generica e se vale agendar um diagnostico.

### O que pode dar errado

- A pagina parecer SaaS, legaltech ou agencia de trafego.
- O metodo ficar abstrato demais.
- A IA parecer hype.
- O CTA nao ter destino real.
- Claims fortes entrarem sem prova.
- O mobile perder impacto.

## Rubric Spec-Writer: Pagina e Componentes

### Page: Landing Page Variant Media

#### Componentes Principais

- Header
  - Rubber duck: existe para manter navegacao e CTA disponiveis sem tirar foco da tese.
- Hero
  - Rubber duck: existe para comunicar a tese em ate 5 segundos e levar ao diagnostico.
- Credibility
  - Rubber duck: existe para mostrar que a empresa diagnostica antes de vender pacote.
- Pain
  - Rubber duck: existe para fazer o visitante reconhecer os gargalos comerciais reais.
- Method
  - Rubber duck: existe para transformar `Oferta -> Demanda -> Conversao` em metodo memoravel.
- Operation
  - Rubber duck: existe para traduzir o metodo em ganhos praticos para o escritorio.
- AISection
  - Rubber duck: existe para posicionar IA como bastidor operacional.
- Differentials
  - Rubber duck: existe para separar a Variant Media de agencia generica.
- Objections
  - Rubber duck: existe para reduzir ceticismo antes da conversao.
- FAQ
  - Rubber duck: existe para responder perguntas previsiveis sem alongar a pagina.
- FinalCTA
  - Rubber duck: existe para retomar a tese e conduzir ao diagnostico.
- Footer
  - Rubber duck: existe para encerrar com marca, posicionamento e links basicos.

#### Comportamentos

- Cliques no menu rolam para secoes internas.
- CTA principal leva ao destino configuravel de diagnostico ou, temporariamente, ao CTA final.
- CTA secundario do hero rola para o metodo.
- FAQ abre e fecha com comportamento nativo.
- Header responde ao scroll com borda.
- Hover de cards e botoes usa microinteracao curta.
- Motion e reduzida quando o usuario pede `prefers-reduced-motion`.

## Recomendacao Final

Pode seguir para `task-breakdown` e quebrar a implementacao em issues.

Patch aplicado no PRD:

1. `ObjectionCard` como componente obrigatorio.
2. decisao sobre `ProofPlaceholder`.
3. checklist `QA Visual Obrigatorio`.
4. comandos de bootstrap na Fase 0.
5. resolucao do anchor `#diagnostico`.

Esses ajustes nao mudam estrategia nem escopo. Eles reduzem ambiguidade para execucao por agente.
