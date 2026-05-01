# Epic: Método e DiagnosticFlow

## US-01 [VISUAL] Criar DiagnosticFlow

**Status:** review

**Descrição:** Implementar o componente visual `DiagnosticFlow` com os nós Oferta, Demanda e Conversão, status controlados e aparência de diagnóstico comercial. O componente não deve parecer dashboard SaaS dominante.

**Cenários de Uso:**
- Caminho feliz: usuário entende a tríade como método visual.
- Erro esperado: componente parecer produto SaaS ou painel fake exagerado.
- Edge cases: status visuais não devem sugerir dados reais do cliente.
- Loading: não aplicável.
- Empty state: não aplicável.

**Database:** Não se aplica.

**Arquivos a Criar / Modificar:**
- `components/landing/DiagnosticFlow.tsx` (Criar componente)

**Dependências Externas:**
- `components/landing/MonoLabel`
- `@/lib/cn`

**Checklist de Execução:**
- [x] Renderizar os nós Oferta, Demanda e Conversão.
- [x] Usar status visuais apenas como linguagem ilustrativa.
- [x] Não usar dados reais ou claims numéricos sem prova.
- [x] Componente é responsivo.
- [x] Visual é modular, não dashboard pesado.

**Notas de Validação:**
- `DiagnosticFlow` foi criado em `components/landing/DiagnosticFlow.tsx` com três nós fixos: Oferta, Demanda e Conversão.
- Os status `Claro`, `Ajustar` e `Gargalo` funcionam como linguagem visual ilustrativa, sem dados reais, métricas percentuais ou promessa de resultado.
- O componente usa `MonoLabel`, `cn`, tokens `vm-*`, bordas finas, radius baixo e composição responsiva em grid.
- A cobertura smoke foi ampliada para validar existência do componente, nós, status ilustrativos e ausência de claims/dados reais.
- Validação técnica: `npm test` e `npm run build`.

**File List:**
- `components/landing/DiagnosticFlow.tsx`
- `tests/smoke.mjs`
- `_bmad-output/implementation-artifacts/tasks/epic-04-method-system.md`

**Change Log:**
- 2026-04-30: US-01 [VISUAL] implementada com componente `DiagnosticFlow`, três nós do método e cobertura smoke.

---

## US-02 [VISUAL] Implementar Method

**Status:** review

**Descrição:** Criar a seção central de método com texto, três nodes explicativos e `DiagnosticFlow`.

**Cenários de Uso:**
- Caminho feliz: método vira o bloco mais memorável depois do hero.
- Erro esperado: método parecer diagrama escolar ou texto abstrato demais.
- Edge cases: ordem visual precisa continuar clara no mobile.
- Loading: não aplicável.
- Empty state: não aplicável.

**Database:** Não se aplica.

**Arquivos a Criar / Modificar:**
- `components/landing/sections/Method.tsx` (Criar seção com `id="metodo"`)
- `app/page.tsx` (Adicionar `<Method />`)
- `lib/content.ts` (Consumir nodes e copy do método)

**Dependências Externas:**
- `components/landing/DiagnosticFlow`
- `components/landing/Eyebrow`
- `components/landing/Section`
- `components/landing/Container`

**Checklist de Execução:**
- [x] Seção tem `id="metodo"`.
- [x] H2 comunica que toda perda passa por oferta, demanda ou conversão.
- [x] Nodes explicam Oferta, Demanda e Conversão.
- [x] `DiagnosticFlow` aparece aqui.
- [x] `DiagnosticFlow` não domina o hero.

**Notas de Validação:**
- `Method` foi criado em `components/landing/sections/Method.tsx` com `Section id="metodo" variant="alt"`.
- A seção consome `content.method`, renderiza H2 com destaque em `oferta, demanda ou conversão` e lista os três nodes explicativos via `method.nodes.map`.
- `DiagnosticFlow` foi inserido apenas dentro da seção de método, mantendo o hero sem o componente.
- `app/page.tsx` agora usa `<Method />` no fluxo entre `Pain` e `Operation`.
- A cobertura smoke foi ampliada para validar existência do componente, integração na home, uso de conteúdo centralizado, presença de `DiagnosticFlow` no método e ausência no hero.
- Validação técnica: `npm test` e `npm run build`.

**File List:**
- `components/landing/sections/Method.tsx`
- `app/page.tsx`
- `tests/smoke.mjs`
- `_bmad-output/implementation-artifacts/tasks/epic-04-method-system.md`

**Change Log:**
- 2026-04-30: US-02 [VISUAL] implementada com seção `Method`, nodes do método, `DiagnosticFlow` e cobertura smoke.

---

## US-03 [POLISH] Refinar força visual do método

**Status:** review

**Descrição:** Ajustar hierarquia, espaçamento, linhas e responsividade da seção de método para que ela sustente a tese da landing.

**Cenários de Uso:**
- Caminho feliz: usuário consegue explicar a tríade depois de ver a seção.
- Erro esperado: seção fica visualmente fraca ou parecida com template.
- Edge cases: componentes devem ficar legíveis em mobile e tablet.
- Loading: não aplicável.
- Empty state: não aplicável.

**Database:** Não se aplica.

**Arquivos a Criar / Modificar:**
- `components/landing/sections/Method.tsx` (Ajustar grid e hierarquia)
- `components/landing/DiagnosticFlow.tsx` (Ajustar composição visual)

**Dependências Externas:** Nenhuma.

**Checklist de Execução:**
- [x] Método é uma das seções mais fortes da página.
- [x] Não há aparência de dashboard SaaS.
- [x] Ciano aparece como acento controlado.
- [x] A seção mantém ritmo visual com o restante da landing.

**Notas de Validação:**
- `Method` recebeu composição mais forte com gradiente claro sutil, cabeçalho em duas colunas no desktop, trilho vertical ciano controlado e nodes com marcador/hover discreto.
- `DiagnosticFlow` recebeu superfície editorial mais robusta, grid sutil, acento ciano no topo, sombra controlada e cards internos com hierarquia mais clara.
- A composição mantém a linguagem de diagnóstico sem parecer dashboard SaaS dominante e preserva a leitura em mobile/tablet.
- A cobertura smoke foi ampliada para validar os elementos estruturais de polish em `Method` e `DiagnosticFlow`.
- Validação técnica: `npm test` e `npm run build`.

**File List:**
- `components/landing/sections/Method.tsx`
- `components/landing/DiagnosticFlow.tsx`
- `tests/smoke.mjs`
- `_bmad-output/implementation-artifacts/tasks/epic-04-method-system.md`

**Change Log:**
- 2026-04-30: US-03 [POLISH] refinada com hierarquia mais forte, trilho visual do método, acento ciano controlado e `DiagnosticFlow` mais robusto.
