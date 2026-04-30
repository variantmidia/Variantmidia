---
project_name: "variant-media"
user_name: "Johny"
date: "2026-04-30"
sections_completed:
  - technology_stack
  - implementation_rules
  - current_state
  - continuation_point
existing_patterns_found: 12
---

# Project Context for AI Agents

Este arquivo resume o contexto operacional que outro agente precisa para continuar a landing da Variant Media sem reabrir toda a conversa.

## Technology Stack & Versions

- Projeto: landing page Next.js App Router para Variant Media.
- Linguagem: TypeScript com `strict: true`.
- Framework: Next.js 16.2.4, React 19.2.3, React DOM 19.2.3.
- Estilo: Tailwind CSS 3.4.17 com tokens customizados em `tailwind.config.ts` e `app/globals.css`.
- Fontes: `next/font/google` com Inter, JetBrains Mono e Fraunces configuradas em `app/layout.tsx`.
- Teste atual: `npm test` executa `node tests/smoke.mjs`.
- Build: `npm run build`.
- Utilitário de classe: `lib/cn.ts` com `clsx` e `tailwind-merge`.
- Ícones: `lucide-react`, usado no primitive `Button`.

## Primary Sources

Leia nesta ordem antes de continuar:

1. `index.md`
2. `_bmad-output/implementation-artifacts/tasks/index.md`
3. `_bmad-output/implementation-artifacts/tasks/epic-01-shell-components.md`
4. `_bmad-output/implementation-artifacts/tasks/epic-02-hero.md`
5. `docs/DESIGN-SYSTEM.md`
6. `_bmad-output/planning-artifacts/homepage-copy-variant-media-2026-04-30.md`
7. `_bmad-output/planning-artifacts/direcao-pos-logo-variant-media-2026-04-29.md`
8. `lib/content.ts`

## Current Implementation State

Epic 00 foundation ja estava concluida antes desta sessao.

Epic 01 foi implementado nesta sessao e esta em `review`:

- US-01: componentes base `Container`, `Section`, `Eyebrow`, `MonoLabel`.
- US-02: primitives visuais `Button` e `Card`.
- US-03: `BrandMark` e `Chevron`.
- US-04: shell global com `Header`, `Footer` e `app/page.tsx` preparado com anchors.

Arquivos principais criados ou alterados:

- `components/landing/Container.tsx`
- `components/landing/Section.tsx`
- `components/landing/Eyebrow.tsx`
- `components/landing/MonoLabel.tsx`
- `components/landing/Button.tsx`
- `components/landing/Card.tsx`
- `components/landing/BrandMark.tsx`
- `components/landing/Chevron.tsx`
- `components/landing/Header.tsx`
- `components/landing/Footer.tsx`
- `app/page.tsx`
- `tests/smoke.mjs`
- `public/logos/horizontal-light.svg`

Validacoes executadas e aprovadas:

- `npm test`
- `npm run build`

## Logo Decision

O usuario informou que os logos oficiais estao em:

- `logos/horizontal-light.svg`
- `logos/vertical-light.svg`

Decisao aplicada:

- A navegacao deve usar a logo horizontal oficial.
- A SVG foi copiada para `public/logos/horizontal-light.svg` para ser servida pelo Next.
- `components/landing/Header.tsx` usa:
  - `src="/logos/horizontal-light.svg"`
  - `alt="Variant Media"`
- Nao converter para PNG.
- Nao usar logo improvisado na nav.

`BrandMark.tsx` continua existindo como simbolo SVG inline para usos menores, especialmente footer e possiveis detalhes do layout.

## Implementation Rules

- Usar `docs/DESIGN-SYSTEM.md` como fonte de verdade de UI.
- Usar copy centralizada em `lib/content.ts`.
- Manter a linguagem publica como assessoria de performance juridica, diagnostico, gargalos, atendimento, conversao e faturamento.
- Evitar linguagem publica como `forense`, `legaltech enterprise`, `infraestrutura critica`, `plataforma enterprise` ou IA como protagonista.
- Nao criar backend, banco, auth, formulario fake ou integracoes reais nesta landing.
- Nao publicar claims sem prova, como `ROI em 45 dias` ou `mais de 300 escritorios atendidos`.
- Nao transformar a pagina em dashboard SaaS.
- Nao exagerar em dark mode, neon, 3D, blur/glassmorphism ou motion decorativo.
- Fundo claro e ciano/grafite devem dominar; paineis escuros so pontualmente.
- Cards usam borda fina e radius baixo.
- Componentes visuais ficam em `components/landing/`.
- Se uma nova section for criada, preferir `components/landing/sections/` conforme `docs/DESIGN-SYSTEM.md`, mas o shell inicial ainda esta direto em `app/page.tsx`.
- Todo novo comportamento relevante deve ampliar `tests/smoke.mjs`.
- Antes de marcar uma story como `review`, rodar `npm test` e `npm run build`.
- Ao concluir uma story, atualizar somente a secao correspondente do arquivo em `_bmad-output/implementation-artifacts/tasks/`.

## Existing Patterns

- Componentes simples usam named exports.
- Props visuais usam unions TypeScript, por exemplo `variant?: Variant`.
- Composicao de classes deve passar por `cn`.
- `Section` controla fundo e padding.
- `Container` controla largura maxima `1240px`.
- `Button` renderiza `span` para funcionar bem quando envolvido por `Link` ou `a`.
- `Header` e client component porque adiciona borda ao rolar.
- `Footer` e server component.
- SVG decorativo deve usar `aria-hidden`.
- Logo visual na nav usa arquivo oficial em `public/logos`, nao `next/image`.

## Current Page Shell

`app/page.tsx` ja tem:

- `<Header />`
- `<main>`
- anchors reais:
  - `#metodo`
  - `#gargalos`
  - `#tecnologia`
  - `#diferenciais`
  - `#faq`
  - `#cta-final`
- `<Footer />`

As secoes internas ainda estao como placeholders estruturais. O proximo passo deve substituir/expandir essas areas conforme os epics seguintes.

## Continuation Point

Proximo trabalho recomendado:

1. Abrir `_bmad-output/implementation-artifacts/tasks/epic-02-hero.md`.
2. Implementar a primeira story pendente do Epic 02.
3. Usar `docs/DESIGN-SYSTEM.md`, secao de Hero, como referencia visual.
4. Preservar o header com a logo horizontal oficial.
5. Rodar `npm test` e `npm run build`.
6. Atualizar o registro da story no arquivo do epic.

Estado de retomada em uma frase:

> Epic 01 esta pronto para review; continuar a partir do Epic 02 Hero, mantendo a logo horizontal oficial na nav e usando `lib/content.ts` como fonte de copy.
