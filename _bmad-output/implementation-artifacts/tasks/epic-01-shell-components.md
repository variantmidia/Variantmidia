# Epic: Shell, Componentes Base e Estrutura Global

## US-01 [VISUAL] Criar componentes base de layout

**Status:** review

**Descrição:** Implementar os wrappers reutilizáveis da landing: `Container`, `Section`, `Eyebrow` e `MonoLabel`, seguindo o design system.

**Cenários de Uso:**
- Caminho feliz: seções usam padding, largura e variantes de fundo consistentes.
- Erro esperado: espaçamentos divergentes entre seções.
- Edge cases: `Section` precisa aceitar `id` para anchors internos.
- Loading: não aplicável.
- Empty state: componentes devem renderizar children sem conteúdo extra.

**Database:** Não se aplica.

**Arquivos a Criar / Modificar:**
- `components/landing/Container.tsx` (Criar wrapper de largura)
- `components/landing/Section.tsx` (Criar wrapper com variantes `default`, `alt`, `dark`)
- `components/landing/Eyebrow.tsx` (Criar label com marcador ciano)
- `components/landing/MonoLabel.tsx` (Criar label mono sem marcador)

**Dependências Externas:**
- `@/lib/cn`

**Checklist de Execução:**
- [x] `Container` usa max width `1240px`.
- [x] `Section` aceita `variant`, `padding`, `id` e `className`.
- [x] `Eyebrow` usa marcador quadrado ciano.
- [x] Labels seguem mono uppercase com tracking definido.

**Dev Agent Record**

**Debug Log**
- 2026-04-30 14:03: RED executado com `npm test`; falhou por ausência de `components/landing/Container.tsx`, validando cobertura inicial da US-01.
- 2026-04-30 14:03: GREEN/REFACTOR executado com `npm test` e `npm run build`; ambos passaram.

**Completion Notes**
- Implementados `Container`, `Section`, `Eyebrow` e `MonoLabel` como React Server Components simples, alinhados aos exemplos do `docs/DESIGN-SYSTEM.md`.
- `Section` cobre variantes `default`, `alt`, `dark`, padding `default`/`tight`, `id` para anchors e composição por `className`.
- Smoke test ampliado para travar arquivos, props e classes essenciais da US-01.

**File List**
- `components/landing/Container.tsx`
- `components/landing/Section.tsx`
- `components/landing/Eyebrow.tsx`
- `components/landing/MonoLabel.tsx`
- `tests/smoke.mjs`

**Change Log**
- 2026-04-30: Criados componentes base de layout da landing e testes smoke correspondentes.

---

## US-02 [VISUAL] Criar Button e Card primitives

**Status:** review

**Descrição:** Implementar `Button` e `Card` como primitives visuais da landing. Sem lógica de formulário ou submissão.

**Cenários de Uso:**
- Caminho feliz: CTAs e cards têm aparência consistente.
- Erro esperado: botão fora do token, radius exagerado ou hover pesado.
- Edge cases: `Button` deve funcionar quando envolvido por `Link`.
- Loading: não haverá estado loading nesta versão.
- Empty state: não aplicável.

**Database:** Não se aplica.

**Arquivos a Criar / Modificar:**
- `components/landing/Button.tsx` (Criar variants `primary`, `ghost`, `cyan`; sizes; `pill`; `withArrow`)
- `components/landing/Card.tsx` (Criar variants `default`, `alt`, `dark`)

**Dependências Externas:**
- `lucide-react`
- `@/lib/cn`

**Checklist de Execução:**
- [x] `primary` é CTA principal.
- [x] `ghost` é CTA secundário.
- [x] `cyan` é uso raro, no máximo hero.
- [x] Hover usa `transform` e `shadow`, sem animação de largura/altura.
- [x] Cards têm radius baixo e borda fina.

**Dev Agent Record**

**Debug Log**
- 2026-04-30 14:18: Smoke test ampliado para validar presença de `Button`, `Card`, variants, sizes, `pill`, `withArrow`, classes de hover e bordas/radius.
- 2026-04-30 14:18: GREEN/REFACTOR executado com `npm test` e `npm run build`; ambos passaram.

**Completion Notes**
- Implementado `Button` como primitive visual compatível com uso dentro de `Link`, renderizando `span`, com variants `primary`, `ghost`, `cyan`, sizes `sm`/`md`/`lg`, `pill` e `withArrow`.
- Implementado `Card` com variants `default`, `alt`, `dark`, radius baixo, borda fina e shadow discreta conforme design system.

**File List**
- `components/landing/Button.tsx`
- `components/landing/Card.tsx`
- `tests/smoke.mjs`

**Change Log**
- 2026-04-30: Criados primitives visuais `Button` e `Card` e cobertura smoke correspondente.

---

## US-03 [VISUAL] Criar componentes de marca e decoração

**Status:** review

**Descrição:** Implementar `BrandMark` e `Chevron` para identidade visual da landing, usando SVG inline.

**Cenários de Uso:**
- Caminho feliz: logo e chevron renderizam sem asset externo.
- Erro esperado: chevron compete com texto no mobile.
- Edge cases: `BrandMark` precisa ter variante clara para footer.
- Loading: não aplicável.
- Empty state: não aplicável.

**Database:** Não se aplica.

**Arquivos a Criar / Modificar:**
- `components/landing/BrandMark.tsx` (Criar SVG inline da marca)
- `components/landing/Chevron.tsx` (Criar ornamento do hero)

**Dependências Externas:** Nenhuma.

**Checklist de Execução:**
- [x] Logo é SVG inline ou asset oficial exportado.
- [x] `BrandMark` aceita variante `ink` e `white`.
- [x] Chevron usa ciano com opacidade controlada.
- [x] Chevron é `aria-hidden`.
- [x] Nenhum PNG improvisado é usado como logo.

**Dev Agent Record**

**Debug Log**
- 2026-04-30 14:24: Smoke test ampliado para validar presença de `BrandMark`, `Chevron`, SVG inline, variantes `ink`/`white`, ciano e `aria-hidden`.
- 2026-04-30 14:24: GREEN/REFACTOR executado com `npm test` e `npm run build`; ambos passaram.

**Completion Notes**
- Implementado `BrandMark` como SVG inline, com símbolo em grafite/preto ou branco conforme variant e centro em ciano `#16D4E8`.
- Implementado `Chevron` decorativo do hero com gradiente ciano de opacidade controlada e `aria-hidden`.
- Teste smoke bloqueia uso de PNG/JPG/`next/image` no `BrandMark`.

**File List**
- `components/landing/BrandMark.tsx`
- `components/landing/Chevron.tsx`
- `tests/smoke.mjs`

**Change Log**
- 2026-04-30: Criados componentes SVG inline de marca e decoração e cobertura smoke correspondente.

---

## US-04 [VISUAL] Criar Header e Footer

**Status:** review

**Descrição:** Implementar shell global da landing com header sticky, navegação interna, CTA e footer dark.

**Cenários de Uso:**
- Caminho feliz: usuário navega por anchors e encontra CTA.
- Erro esperado: anchor inexistente ou CTA quebrado.
- Edge cases: mobile precisa manter leitura e não esmagar navegação.
- Loading: não aplicável.
- Empty state: se não houver URL real de agenda, CTA aponta para `#cta-final`.

**Database:** Não se aplica.

**Arquivos a Criar / Modificar:**
- `components/landing/Header.tsx` (Criar header sticky com navegação)
- `components/landing/Footer.tsx` (Criar footer dark)
- `app/page.tsx` (Preparar shell inicial com Header, main e Footer)

**Dependências Externas:**
- `next/link`
- `@/components/landing/Button`
- `@/components/landing/BrandMark`

**Checklist de Execução:**
- [x] Header tem links `#metodo`, `#gargalos`, `#tecnologia`, `#diferenciais`, `#faq`.
- [x] Header mostra CTA `Agendar diagnóstico`.
- [x] Header adiciona borda ao rolar.
- [x] Footer usa fundo dark e contraste AA.
- [x] Wordmark usa `variant` bold e `midia` extralight.

**Dev Agent Record**

**Debug Log**
- 2026-04-30 14:31: Copiada SVG oficial `logos/horizontal-light.svg` para `public/logos/horizontal-light.svg` para uso no navegador.
- 2026-04-30 14:31: Smoke test ampliado para validar `Header`, `Footer`, anchors internos, CTA, logo horizontal oficial e footer dark.
- 2026-04-30 14:31: GREEN/REFACTOR executado com `npm test` e `npm run build`; ambos passaram.

**Completion Notes**
- Implementado `Header` sticky com links vindos de `content.nav`, CTA `Agendar diagnóstico` e borda ativada por scroll.
- Header usa a logo horizontal oficial em SVG (`/logos/horizontal-light.svg`) na navegação, conforme ajuste solicitado.
- Implementado `Footer` escuro com `BrandMark` branco, wordmark com `variant` bold e `midia` extralight.
- `app/page.tsx` passou a usar `Header`, `main` e `Footer`, com anchors reais para navegação interna.

**File List**
- `components/landing/Header.tsx`
- `components/landing/Footer.tsx`
- `app/page.tsx`
- `public/logos/horizontal-light.svg`
- `tests/smoke.mjs`

**Change Log**
- 2026-04-30: Criado shell global da landing com header, footer e logo horizontal oficial na navegação.
