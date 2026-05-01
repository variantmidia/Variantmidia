---
project_name: "variant-media"
user_name: "Johny"
date: "2026-04-30"
sections_completed:
  - technology_stack
  - primary_sources
  - current_state
  - logo_decisions
  - implementation_rules
  - existing_patterns
  - continuation_point
existing_patterns_found: 22
current_epic_completed: "epic-07-polish-qa"
next_epic: "external-review"
---

# Project Context for AI Agents

Este arquivo resume o estado operacional atual da landing da Variant Media para outro agente continuar sem reabrir toda a conversa.

## Technology Stack & Versions

- Projeto: landing page Next.js App Router para Variant Media.
- Linguagem: TypeScript com `strict: true`.
- Framework: Next.js 16.2.4, React 19.2.3, React DOM 19.2.3.
- Estilo: Tailwind CSS 3.4.17 com tokens customizados em `tailwind.config.ts` e `app/globals.css`.
- Fontes: `next/font/google` com Inter, JetBrains Mono e Fraunces configuradas em `app/layout.tsx`.
- Teste atual: `npm test` executa `node tests/smoke.mjs`.
- Build: `npm run build`.
- Utilitário de classe: `lib/cn.ts` com `clsx` e `tailwind-merge`.
- Ícones: `lucide-react`, usado em `Button` e no menu mobile do `Header`.
- Hidratação: `app/layout.tsx` usa `suppressHydrationWarning` no `<body>` para tolerar atributos injetados por extensões, como `cz-shortcut-listen`.

## Primary Sources

Leia nesta ordem antes de continuar:

1. `_bmad-output/implementation-artifacts/tasks/index.md`
2. `_bmad-output/implementation-artifacts/tasks/epic-07-polish-qa.md`
3. `docs/DESIGN-SYSTEM.md`
4. `_bmad-output/planning-artifacts/homepage-copy-variant-media-2026-04-30.md`
5. `_bmad-output/planning-artifacts/direcao-pos-logo-variant-media-2026-04-29.md`
6. `lib/content.ts`
7. `app/page.tsx`
8. `tests/smoke.mjs`

## Current Implementation State

A landing ja esta implementada ate o Epic 06.

Epics concluidos nesta linha de trabalho:

- Epic 00 Foundation: base Next/Tailwind, tokens, fontes e conteudo central.
- Epic 01 Shell Components: `Container`, `Section`, `Eyebrow`, `MonoLabel`, `Button`, `Card`, `BrandMark`, `Chevron`, `Header` e `Footer`.
- Epic 02 Hero: hero principal com CTA, tipografia do design system e chevron.
- Epic 03 Content Sections: `Credibility`, `Pain`, `Operation`, `PainCard` e `BenefitCard`.
- Epic 04 Method System: `Method` e `DiagnosticFlow`.
- Epic 05 AI Section: `AISection` e `TechPanel`, unica faixa dark da landing alem do footer.
- Epic 06 Trust Conversion: `Differentials`, `Objections`, `ProofPlaceholder`, `FAQ` nativo e `FinalCTA`.
- Epic 07 Polish/QA: metadata/OG, acessibilidade, QA visual obrigatório e validação técnica final.

`app/page.tsx` agora e apenas composicao de secoes:

- `<Header />`
- `<Hero />`
- `<Credibility />`
- `<Pain />`
- `<Method />`
- `<Operation />`
- `<AISection />`
- `<Differentials />`
- `<Objections />`
- `<FAQ />`
- `<FinalCTA />`
- `<Footer />`

Anchors reais existentes:

- `#metodo`
- `#gargalos`
- `#tecnologia`
- `#diferenciais`
- `#faq`
- `#cta-final`

## Current Files Of Interest

Componentes base:

- `components/landing/Container.tsx`
- `components/landing/Section.tsx`
- `components/landing/Eyebrow.tsx`
- `components/landing/MonoLabel.tsx`
- `components/landing/Button.tsx`
- `components/landing/Card.tsx`
- `components/landing/BrandMark.tsx`
- `components/landing/Chevron.tsx`

Shell:

- `components/landing/Header.tsx`
- `components/landing/Footer.tsx`
- `app/layout.tsx`
- `app/page.tsx`

Secoes:

- `components/landing/sections/Hero.tsx`
- `components/landing/sections/Credibility.tsx`
- `components/landing/sections/Pain.tsx`
- `components/landing/sections/Method.tsx`
- `components/landing/sections/Operation.tsx`
- `components/landing/sections/AISection.tsx`
- `components/landing/sections/Differentials.tsx`
- `components/landing/sections/Objections.tsx`
- `components/landing/sections/FAQ.tsx`
- `components/landing/sections/FinalCTA.tsx`

Componentes de secao:

- `components/landing/PainCard.tsx`
- `components/landing/BenefitCard.tsx`
- `components/landing/DiagnosticFlow.tsx`
- `components/landing/TechPanel.tsx`
- `components/landing/DifferentialItem.tsx`
- `components/landing/ObjectionCard.tsx`
- `components/landing/ProofPlaceholder.tsx`
- `components/landing/FAQItem.tsx`

Conteudo e validacao:

- `lib/content.ts`
- `tests/smoke.mjs`

## Logo Decisions

Assets oficiais locais:

- `logos/horizontal-light.svg`
- `logos/vertical-light.svg`
- `Variant Media/horizontal-dark.svg`
- `Variant Media/vertical-dark.svg`

Assets publicados pelo Next:

- `public/logos/horizontal-light.svg`
- `public/logos/horizontal-dark.svg`

Decisoes aplicadas:

- `Header` usa a logo horizontal light oficial:
  - `src="/logos/horizontal-light.svg"`
  - `alt="Variant Media"`
- `Footer` usa a logo horizontal dark oficial:
  - `src="/logos/horizontal-dark.svg"`
  - `alt="Variant Media"`
- Nao converter logos para PNG.
- Nao usar texto improvisado de marca no footer.
- `BrandMark.tsx` continua existindo como simbolo inline para usos pontuais, mas nao substitui as logos horizontais oficiais.

## Implementation Rules

- Usar `docs/DESIGN-SYSTEM.md` como fonte de verdade de UI.
- Usar copy centralizada em `lib/content.ts`.
- Manter a linguagem publica como assessoria de performance juridica, diagnostico, gargalos, atendimento, conversao e faturamento.
- Evitar linguagem publica como `forense`, `legaltech enterprise`, `infraestrutura critica`, `plataforma enterprise` ou IA como protagonista.
- Nao criar backend, banco, auth, formulario fake ou integracoes reais nesta landing.
- Nao publicar claims sem prova, como `ROI em 45 dias`, `mais de 300 escritorios atendidos`, cases inventados ou estatisticas decorativas.
- Nao transformar a pagina em dashboard SaaS.
- Nao exagerar em dark mode, neon, 3D, blur/glassmorphism ou motion decorativo.
- Fundo claro e ciano/grafite devem dominar; paineis escuros so pontualmente.
- A unica secao dark da landing, alem do footer, e `AISection` em `#tecnologia`.
- Cards usam borda fina e radius baixo.
- Componentes visuais ficam em `components/landing/`.
- Secoes ficam em `components/landing/sections/`.
- Todo novo comportamento relevante deve ampliar `tests/smoke.mjs`.
- Antes de marcar uma story/US como concluida, rodar `npm test` e `npm run build`.
- Ao concluir uma US, atualizar somente a secao correspondente do arquivo em `_bmad-output/implementation-artifacts/tasks/`.

## Existing Patterns

- Componentes simples usam named exports.
- Props visuais usam unions TypeScript, por exemplo `variant?: Variant`.
- Composicao de classes deve passar por `cn`.
- `Section` controla fundo e padding.
- `Container` controla largura maxima `1240px`.
- `Button` renderiza `span` para funcionar bem quando envolvido por `Link` ou `a`.
- `Header` e client component porque controla menu mobile e estado de scroll.
- `Footer` e server component.
- `FAQItem` usa `<details>` e `<summary>` nativos, sem `"use client"`.
- `FinalCTA` usa `next/link` e `Button`, sem formulario.
- `ProofPlaceholder` existe para segurar a ausencia de prova validada sem inventar claim.
- `TechPanel` deve parecer bastidor operacional, nao dashboard ou produto SaaS.
- Motion deve respeitar `prefers-reduced-motion`; ha regra global e classes `motion-reduce` no painel.
- SVG decorativo deve usar `aria-hidden`.
- Logos oficiais em layout usam arquivos em `public/logos`, nao `next/image`.
- `tests/smoke.mjs` valida estrutura, tokens, conteudo centralizado, ausencia de claims proibidos e uso correto das logos.

## Validation Status

Validacoes executadas e aprovadas no estado atual:

- `npm test`
- `npm run build`

Servidor de desenvolvimento observado na sessao:

- `http://localhost:3001`

## Continuation Point

Proximo trabalho recomendado:

1. Enviar este pacote para revisão externa no Claude.
2. Pedir revisão focada em regressões visuais, coerência com posicionamento, responsividade e claims sem prova.
3. Preservar a composicao atual por secoes e a centralizacao de copy em `lib/content.ts`.
4. Preservar `Header` com `horizontal-light.svg`, `Footer` com `horizontal-dark.svg` e a primeira dobra conforme aprovada pelo usuário.
5. Se houver ajustes, alterar arquivos pontuais e rodar `npm test` e `npm run build`.

Estado de retomada em uma frase:

> Landing implementada e validada ate Epic 07; proximo passo e revisão externa, mantendo logos oficiais, copy centralizada, Hero/Header aprovados e a regra de nao publicar claims sem prova.
