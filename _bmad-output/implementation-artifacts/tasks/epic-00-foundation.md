# Epic: Fundação Técnica e Design Tokens

## US-00 [INFRA] Criar base Next.js, TypeScript e Tailwind

**Status:** review

**Descrição:** Inicializar o app da landing com Next.js App Router, TypeScript e Tailwind CSS. Esta tarefa prepara o projeto para receber os componentes e seções, sem implementar layout final ainda.

**Cenários de Uso:**
- Caminho feliz: app roda localmente com página placeholder.
- Erro esperado: conflito de pasta existente, dependência faltando ou script `dev` falhando.
- Edge cases: projeto já iniciado parcialmente; preservar arquivos existentes e adaptar em vez de sobrescrever sem leitura.
- Loading: não aplicável.
- Empty state: página inicial pode renderizar placeholder simples.

**Database:** Não se aplica.

**Arquivos a Criar / Modificar:**
- `package.json` (Criar scripts e dependências do projeto)
- `next.config.*` (Criar configuração padrão, se gerada pelo bootstrap)
- `tsconfig.json` (Criar configuração TypeScript)
- `app/layout.tsx` (Criar layout raiz inicial)
- `app/page.tsx` (Criar placeholder inicial)
- `app/globals.css` (Criar base Tailwind inicial)
- `tailwind.config.ts` (Criar configuração Tailwind inicial)

**Dependências Externas:**
- `next`
- `react`
- `react-dom`
- `typescript`
- `tailwindcss`
- `postcss`
- `autoprefixer`

**Checklist de Execução:**
- [x] Rodar bootstrap recomendado: `npx create-next-app@latest variant-media --typescript --tailwind --app --no-src-dir --import-alias "@/*"`.
- [x] Instalar dependências permitidas: `clsx`, `tailwind-merge`, `lucide-react`.
- [x] Confirmar que `npm run dev` sobe sem erro.
- [x] Confirmar que a página inicial renderiza placeholder.
- [x] Não adicionar bibliotecas de UI externas.

**Dev Agent Record:**
- Debug Log:
  - 2026-04-30: `npx create-next-app@latest variant-media --typescript --tailwind --app --no-src-dir --import-alias "@/*" --use-npm --yes` executado a partir de `/home/johny/Documentos/projetos`; falhou porque a pasta `variant-media` ja existia com arquivos BMAD/docs. Base criada manualmente no root existente para preservar arquivos.
  - 2026-04-30: smoke test escrito antes da implementacao e validado em vermelho por ausencia de `next.config.ts`.
  - 2026-04-30: `npm install` concluiu com dependencias permitidas; audit reportou 2 vulnerabilidades moderadas. `npm audit fix --force` nao foi executado por poder alterar versoes fora do escopo.
  - 2026-04-30: `npm test` passou.
  - 2026-04-30: `npm run build` passou com Next.js 16.2.4.
  - 2026-04-30: `npm run dev` subiu em `http://localhost:3001` porque a porta 3000 estava ocupada; home consultada via `curl` renderizou `Variant Media`.
- Completion Notes:
  - Criada base Next.js App Router com TypeScript, Tailwind, PostCSS e alias `@/*`.
  - Criados layout raiz, pagina placeholder e CSS global minimo, sem implementar secoes finais.
  - Adicionado smoke test sem bibliotecas extras para validar arquivos essenciais, dependencias permitidas e placeholder.

**File List:**
- `package.json`
- `package-lock.json`
- `next-env.d.ts`
- `next.config.ts`
- `tsconfig.json`
- `postcss.config.mjs`
- `tailwind.config.ts`
- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`
- `tests/smoke.mjs`
- `_bmad-output/implementation-artifacts/tasks/epic-00-foundation.md`

**Change Log:**
- 2026-04-30: Implementada US-00 [INFRA] com base Next.js, TypeScript, Tailwind, dependencias permitidas e smoke test.

---

## US-01 [INFRA] Configurar fontes, metadata base e HTML global

**Status:** review

**Descrição:** Configurar `next/font` com Inter, JetBrains Mono e Fraunces, aplicar variáveis no `<html>` e definir `lang="pt-BR"`.

**Cenários de Uso:**
- Caminho feliz: fontes carregam via `next/font` sem CLS.
- Erro esperado: import de fonte incorreto ou variável não aplicada.
- Edge cases: remover fonte não usada apenas se o design system for atualizado.
- Loading: `display: "swap"` deve evitar bloqueio visual.
- Empty state: não aplicável.

**Database:** Não se aplica.

**Arquivos a Criar / Modificar:**
- `app/layout.tsx` (Adicionar imports de fonte, variáveis e `lang="pt-BR"`)

**Dependências Externas:**
- `next/font/google`

**Checklist de Execução:**
- [x] Importar `Inter`, `JetBrains_Mono` e `Fraunces`.
- [x] Aplicar variáveis no `<html>`.
- [x] Definir `lang="pt-BR"`.
- [x] Adicionar metadata inicial coerente com o PRD.

**Dev Agent Record:**
- Debug Log:
  - 2026-04-30: smoke test ampliado antes da implementacao para exigir `Inter`, `JetBrains_Mono`, `Fraunces`, variaveis CSS, `lang="pt-BR"` e metadata de performance juridica.
  - 2026-04-30: `npm test` falhou inicialmente por ausencia de `Inter` no layout, validando o teste em vermelho.
  - 2026-04-30: `npm test` passou apos configurar fontes e metadata.
  - 2026-04-30: `npm run build` passou com Next.js 16.2.4.
  - 2026-04-30: `npm run dev` subiu em `http://localhost:3001` porque a porta 3000 estava ocupada; `curl` confirmou title e metadata com `Assessoria de performance juridica`.
- Completion Notes:
  - Configurado `next/font/google` com `Inter`, `JetBrains_Mono` e `Fraunces`, todos com `display: "swap"` e variaveis CSS.
  - Aplicadas as variaveis de fonte no `<html>` mantendo `lang="pt-BR"`.
  - Metadata inicial ajustada para posicionamento do PRD: assessoria de performance juridica para escritorios de advocacia.

**File List:**
- `app/layout.tsx`
- `tests/smoke.mjs`
- `_bmad-output/implementation-artifacts/tasks/epic-00-foundation.md`

**Change Log:**
- 2026-04-30: Implementada US-01 [INFRA] com fontes globais via `next/font`, variaveis no HTML e metadata base alinhada ao PRD.

---

## US-02 [VISUAL] Implementar tokens Tailwind e estilos globais

**Status:** review

**Descrição:** Transferir os tokens do `docs/DESIGN-SYSTEM.md` para `tailwind.config.ts` e `app/globals.css`, incluindo cores, fontes, shadows, radius, motion, classes tipográficas e reduced motion.

**Cenários de Uso:**
- Caminho feliz: classes `vm-*` e cores `vm` funcionam no app.
- Erro esperado: classe Tailwind ausente ou token divergente.
- Edge cases: valores CSS duplicados devem seguir exatamente o design system.
- Loading: não aplicável.
- Empty state: não aplicável.

**Database:** Não se aplica.

**Arquivos a Criar / Modificar:**
- `tailwind.config.ts` (Adicionar tema `vm`, fonts, shadows, easing, background grid)
- `app/globals.css` (Adicionar tokens CSS, base, typography classes e reduced motion)

**Dependências Externas:**
- Tailwind CSS

**Checklist de Execução:**
- [x] Implementar cores `vm` conforme design system.
- [x] Implementar classes `vm-display`, `vm-h1`, `vm-h2`, `vm-h3`, `vm-lead`, `vm-mono-label`, `vm-eyebrow`, `vm-underline`.
- [x] Implementar `prefers-reduced-motion`.
- [x] Confirmar que não há cores improvisadas fora dos tokens.
- [x] Confirmar que `container` máximo é `1240px`.

**Dev Agent Record:**
- Debug Log:
  - 2026-04-30: smoke test ampliado antes da implementacao para exigir tokens Tailwind, classes `vm-*`, reduced motion e container `1240px`.
  - 2026-04-30: `npm test` falhou inicialmente por variaveis de fonte ainda fora do padrao `--vm-font-*-loaded`.
  - 2026-04-30: `tailwind.config.ts` recebeu tema `vm`, fontes, shadows, easing, durations, grid, keyframes e container maximo `1240px`.
  - 2026-04-30: `app/globals.css` recebeu tokens CSS, base global, classes tipograficas e `prefers-reduced-motion`.
  - 2026-04-30: placeholder em `app/page.tsx` trocado de `neutral-*` para tokens `vm-*`.
  - 2026-04-30: `npm test` e `npm run build` passaram.
  - 2026-04-30: `npm run dev` subiu em `http://localhost:3001`; `curl` confirmou renderizacao com tokens/copy.
- Completion Notes:
  - Tokens do design system foram espelhados em Tailwind e CSS global.
  - Classes tipograficas e utilitarias principais ficaram disponiveis para as proximas secoes.
  - A pagina placeholder deixou de usar cores Tailwind genericas e passou a usar tokens `vm`.

**File List:**
- `tailwind.config.ts`
- `app/globals.css`
- `app/layout.tsx`
- `app/page.tsx`
- `tests/smoke.mjs`
- `_bmad-output/implementation-artifacts/tasks/epic-00-foundation.md`

**Change Log:**
- 2026-04-30: Implementada US-02 [VISUAL] com tokens Tailwind, estilos globais, tipografia `vm-*`, reduced motion e container de 1240px.

---

## US-03 [INFRA] Criar helpers e copy centralizada

**Status:** review

**Descrição:** Criar `lib/cn.ts` e `lib/content.ts` para centralizar composição de classes e copy oficial da landing.

**Cenários de Uso:**
- Caminho feliz: componentes consomem copy de `lib/content.ts`.
- Erro esperado: texto duplicado dentro de seções.
- Edge cases: CTAs devem ser fáceis de trocar quando houver URL real.
- Loading: não aplicável.
- Empty state: campos de prova podem indicar validação pendente sem inventar dados.

**Database:** Não se aplica.

**Arquivos a Criar / Modificar:**
- `lib/cn.ts` (Criar helper com `clsx` e `tailwind-merge`)
- `lib/content.ts` (Criar objeto `content` com copy oficial do design system)

**Dependências Externas:**
- `clsx`
- `tailwind-merge`

**Checklist de Execução:**
- [x] Criar helper `cn`.
- [x] Centralizar toda copy pública em `lib/content.ts`.
- [x] Incluir links/anchors de CTA em estrutura facilmente editável.
- [x] Usar copy acentuada no site final.
- [x] Não publicar claims não validados.

**Dev Agent Record:**
- Debug Log:
  - 2026-04-30: smoke test ampliado antes da implementacao para exigir `lib/cn.ts`, `lib/content.ts`, CTAs com anchors e copy acentuada.
  - 2026-04-30: `npm test` falhou inicialmente porque `app/page.tsx` ainda nao consumia `lib/content.ts`.
  - 2026-04-30: criado helper `cn` com `clsx` e `tailwind-merge`.
  - 2026-04-30: criada copy centralizada em `lib/content.ts` com estrutura editavel para nav, hero, secoes, FAQ e CTA final.
  - 2026-04-30: `app/page.tsx` passou a consumir `content.hero` no placeholder.
  - 2026-04-30: `npm test` e `npm run build` passaram.
- Completion Notes:
  - Helper `cn` criado para composicao de classes.
  - Copy oficial consolidada com acentos e sem claims novos alem do material aprovado no design system.
  - CTAs e navegacao foram modelados com `href` para facilitar troca futura de anchors/links.

**File List:**
- `lib/cn.ts`
- `lib/content.ts`
- `app/page.tsx`
- `tests/smoke.mjs`
- `_bmad-output/implementation-artifacts/tasks/epic-00-foundation.md`

**Change Log:**
- 2026-04-30: Implementada US-03 [INFRA] com helper `cn` e copy publica centralizada em `lib/content.ts`.
