# Epic: Hero e Primeira Dobra

## US-01 [VISUAL] Implementar Hero estático

**Status:** review

**Descrição:** Criar a seção Hero com fundo claro, tipografia gigante, mensagem principal, subheadline, CTAs e chevron decorativo. Sem lógica além de anchors.

**Cenários de Uso:**
- Caminho feliz: visitante entende a tese em até 5 segundos.
- Erro esperado: headline quebra mal no mobile ou chevron compete com texto.
- Edge cases: telas pequenas devem reduzir ou esconder o chevron se necessário.
- Loading: não aplicável.
- Empty state: não aplicável.

**Database:** Não se aplica.

**Arquivos a Criar / Modificar:**
- `components/landing/sections/Hero.tsx` (Criar seção Hero)
- `app/page.tsx` (Adicionar `<Hero />`)

**Dependências Externas:**
- `next/link`
- `components/landing/Section`
- `components/landing/Container`
- `components/landing/Button`
- `components/landing/MonoLabel`
- `components/landing/Chevron`
- `lib/content.ts`

**Checklist de Execução:**
- [x] Hero usa `vm-display` ou classe equivalente.
- [x] H1 usa tratamento `strike` em `Mais marketing`.
- [x] Hero comunica que mais marketing não resolve sem diagnosticar gargalo.
- [x] Subheadline vem de `lib/content.ts`.
- [x] Chevron é decorativo e não compete com texto.

### Dev Agent Record

**Implementation Plan:**
- Criar `components/landing/sections/Hero.tsx` usando `Section`, `Container`, `Button`, `MonoLabel`, `Chevron` e copy de `lib/content.ts`.
- Substituir o placeholder da primeira dobra em `app/page.tsx` por `<Hero />`.
- Ampliar `tests/smoke.mjs` para cobrir a existência e os contratos mínimos do Hero.

**Debug Log:**
- RED: `npm test` falhou por ausência de `components/landing/sections/Hero.tsx`.
- GREEN: `npm test` passou após criar o Hero e ajustar o smoke test para a nova estrutura.
- Validação final: `npm test` e `npm run build` passaram.
- Revisão visual: escala, espaçamento e chevron do Hero foram ajustados após validação em navegador local.

**Completion Notes:**
- Hero estático implementado com fundo claro/frio, H1 em `vm-display`, strike em `Mais marketing`, subheadline centralizada em `lib/content.ts`, CTAs com anchors já definidos e chevron decorativo isolado atrás do conteúdo no desktop.
- Responsividade inicial considerada na composição: CTA em largura total no mobile, chevron oculto abaixo de `lg` e H1 com escala controlada por breakpoint para evitar estouro e primeira dobra pesada.

**File List:**
- `components/landing/sections/Hero.tsx`
- `app/page.tsx`
- `tests/smoke.mjs`

**Change Log:**
- 2026-04-30: Implementada US-01 do Epic 02 e adicionada cobertura smoke para o Hero.
- 2026-04-30: Ajustada composição visual do Hero para reduzir espaço morto, excesso de escala e competição do chevron.

---

## US-02 [FUNCTIONAL] Conectar CTAs do Hero aos anchors

**Status:** review

**Descrição:** Configurar os CTAs do hero para navegar internamente até o CTA final e a seção de método.

**Cenários de Uso:**
- Caminho feliz: clique em `Agendar diagnóstico` rola para `#cta-final`.
- Caminho feliz: clique em `Entender o método` rola para `#metodo`.
- Erro esperado: anchor ausente não move a página.
- Edge cases: navegação deve funcionar sem formulário ou backend.
- Loading: não aplicável.

**Database:** Não se aplica.

**Arquivos a Criar / Modificar:**
- `components/landing/sections/Hero.tsx` (Configurar links)
- `lib/content.ts` (Centralizar hrefs dos CTAs, se adotado)

**Dependências Externas:**
- `next/link`

**Checklist de Execução:**
- [x] CTA principal aponta para destino configurável ou `#cta-final`.
- [x] CTA secundário aponta para `#metodo`.
- [x] Botão principal usa `pill={true}`.
- [x] Não criar formulário fake.

### Dev Agent Record

**Implementation Plan:**
- Validar que os CTAs do Hero usam `next/link` e os hrefs centralizados em `lib/content.ts`.
- Reforçar `tests/smoke.mjs` para cobrir os destinos dos CTAs e impedir introdução de formulário/backend fake.
- Executar `npm test` e `npm run build` antes de marcar a story para review.

**Debug Log:**
- A implementação funcional dos links já estava presente no Hero após a US-01.
- A cobertura do smoke test foi ampliada para exigir `Link href={hero.cta.primary.href}`, `Link href={hero.cta.secondary.href}`, hrefs `#cta-final`/`#metodo` em `lib/content.ts` e ausência de `<form`, `onSubmit` ou `fetch(` no Hero.
- Validação final: `npm test` e `npm run build` passaram.

**Completion Notes:**
- CTA principal do Hero navega para `#cta-final` via conteúdo centralizado.
- CTA secundário do Hero navega para `#metodo` via conteúdo centralizado.
- Botão principal mantém `pill` e `withArrow`.
- Nenhum formulário fake, backend ou chamada de rede foi criado.

**File List:**
- `components/landing/sections/Hero.tsx`
- `lib/content.ts`
- `tests/smoke.mjs`

**Change Log:**
- 2026-04-30: US-02 validada e cobertura smoke adicionada para os contratos funcionais dos CTAs do Hero.

---

## US-03 [POLISH] Validar primeira dobra em mobile e desktop

**Descrição:** Ajustar responsividade da primeira dobra para manter impacto visual sem sobreposição de elementos.

**Cenários de Uso:**
- Caminho feliz: hero fica forte no desktop e legível no mobile.
- Erro esperado: H1 estoura largura, CTA quebra de forma ruim ou chevron cobre texto.
- Edge cases: telas estreitas, zoom de navegador e fonte carregando.
- Loading: fontes via `next/font` devem minimizar layout shift.
- Empty state: não aplicável.

**Database:** Não se aplica.

**Arquivos a Criar / Modificar:**
- `components/landing/sections/Hero.tsx` (Ajustar classes responsivas)
- `app/globals.css` (Ajustar classes tipográficas apenas se necessário)

**Dependências Externas:** Nenhuma.

**Checklist de Execução:**
- [x] H1 não estoura container.
- [x] CTAs têm boa área de toque no mobile.
- [x] Chevron reduz opacidade ou some se prejudicar leitura.
- [x] `prefers-reduced-motion` não afeta leitura.

**Notas de Validação:**
- Viewports medidos em Chrome headless: 320x740, 390x844, 768x1024 e 1440x900.
- H1 ficou contido no container em todos os viewports testados.
- CTAs mantiveram 56px de altura no mobile.
- Primeira dobra passou a deixar a seção seguinte visível: ~6px em 320px, 28px em 390px/tablet e 40px em desktop.
- Chevron mobile corrigido para opacidade real de `0.14`; desktop mantido como fundo visual com `0.78`.
- Revalidação 2026-04-30: corrigido overflow em 320/390px quebrando `hero.title.line3` em duas linhas no mobile, permitindo wrap do `MonoLabel` e garantindo CTAs contidos no container.
- Revalidação 2026-04-30: header em 768px deixou de sobrepor logo; navegação completa passa a abrir só em `lg`, mantendo menu mobile em tablet.
- Validação final desta rodada: screenshots Playwright/Chrome em 320x740, 390x844, 768x1024 e 1440x900; `npm test`; `npm run build`.

**File List:**
- `components/landing/sections/Hero.tsx`
- `components/landing/Header.tsx`
- `tests/smoke.mjs`
- `_bmad-output/implementation-artifacts/tasks/epic-02-hero.md`

**Change Log:**
- 2026-04-30: US-03 [POLISH] validada com ajustes responsivos no Hero e medição visual em mobile/tablet/desktop.
- 2026-04-30: US-03 [POLISH] revalidada; corrigido overflow mobile do Hero e sobreposição do Header em tablet.
