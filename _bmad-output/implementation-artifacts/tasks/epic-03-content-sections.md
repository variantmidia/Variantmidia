# Epic: Seções de Conteúdo Claro

## US-01 [VISUAL] Implementar Credibility

**Descrição:** Criar seção de credibilidade inicial com título, texto e três cards: diagnóstico antes da prescrição, especialização em advocacia e foco em faturamento.

**Cenários de Uso:**
- Caminho feliz: visitante entende que a Variant Media não vende pacote antes de diagnosticar.
- Erro esperado: cards viram blocos genéricos sem hierarquia.
- Edge cases: textos devem permanecer curtos e escaneáveis no mobile.
- Loading: não aplicável.
- Empty state: não aplicável.

**Database:** Não se aplica.

**Arquivos a Criar / Modificar:**
- `components/landing/sections/Credibility.tsx` (Criar seção)
- `app/page.tsx` (Adicionar `<Credibility />`)
- `lib/content.ts` (Consumir copy oficial)

**Dependências Externas:**
- `components/landing/Section`
- `components/landing/Container`
- `components/landing/Card`

**Checklist de Execução:**
- [x] Renderizar 3 cards claros.
- [x] Não usar claims numéricos.
- [x] Copy vem de `lib/content.ts`.
- [x] Seção usa fundo conforme ritmo do design system.

**Notas de Validação:**
- `Credibility` foi extraída para `components/landing/sections/Credibility.tsx`, removendo a implementação inline de `app/page.tsx`.
- A seção consome `content.credibility` diretamente de `lib/content.ts`.
- Após revisão visual, a seção deixou de reutilizar o placeholder antigo e passou a ter composição própria: cabeçalho editorial, texto de enquadramento separado e três cards numerados.
- Copy de enquadramento alinhada ao documento de homepage com a frase `Isso não se resolve com mais post, mais clique ou mais promessa.`
- O anchor `#gargalos` foi mantido temporariamente na seção para preservar a navegação até a US-02, quando ele deve migrar para `Pain`.
- Validação visual com Playwright/Chrome em 390x844 e 1440x900.
- Validação técnica: `npm test` e `npm run build`.

**File List:**
- `components/landing/sections/Credibility.tsx`
- `app/page.tsx`
- `tests/smoke.mjs`
- `_bmad-output/implementation-artifacts/tasks/epic-03-content-sections.md`

**Change Log:**
- 2026-04-30: US-01 [VISUAL] implementada com seção `Credibility` modular, 3 cards e cobertura smoke.
- 2026-04-30: US-01 [VISUAL] revisada para substituir o placeholder antigo por layout próprio com cards numerados.

---

## US-02 [VISUAL] Implementar Pain com anchor `#gargalos`

**Descrição:** Criar seção de dor principal com id `gargalos`, quatro cards de dor e frase de fechamento.

**Cenários de Uso:**
- Caminho feliz: visitante reconhece os gargalos de receita no improviso comercial.
- Erro esperado: tom parecer alarmista ou agência agressiva.
- Edge cases: anchor do menu deve chegar corretamente na seção.
- Loading: não aplicável.
- Empty state: não aplicável.

**Database:** Não se aplica.

**Arquivos a Criar / Modificar:**
- `components/landing/PainCard.tsx` (Criar card de dor)
- `components/landing/sections/Pain.tsx` (Criar seção com `id="gargalos"`)
- `app/page.tsx` (Adicionar `<Pain />`)
- `lib/content.ts` (Consumir cards e fechamento)

**Dependências Externas:**
- `components/landing/Card`
- `components/landing/Section`
- `components/landing/Container`

**Checklist de Execução:**
- [x] Seção tem `id="gargalos"`.
- [x] Renderizar 4 cards de dor.
- [x] Usar fundo `alt`.
- [x] Fechamento aparece isolado e legível.

**Notas de Validação:**
- `PainCard` foi criado em `components/landing/PainCard.tsx` como variação do primitive `Card`, com título, corpo curto e acento ciano.
- `Pain` foi criado em `components/landing/sections/Pain.tsx` com `id="gargalos"`, `variant="alt"`, quatro cards vindos de `content.pain.cards` e fechamento isolado.
- O anchor `#gargalos` foi removido de `Credibility`, mantendo a navegação apontando para a seção de dor correta.
- `app/page.tsx` passou a renderizar `<Pain />` entre `Credibility` e `Método`, preservando a ordem prevista no design system.
- Validação técnica: `npm test` e `npm run build`.

**File List:**
- `components/landing/PainCard.tsx`
- `components/landing/sections/Pain.tsx`
- `components/landing/sections/Credibility.tsx`
- `app/page.tsx`
- `tests/smoke.mjs`
- `_bmad-output/implementation-artifacts/tasks/epic-03-content-sections.md`

**Change Log:**
- 2026-04-30: US-02 [VISUAL] implementada com seção `Pain`, anchor `#gargalos`, 4 cards de dor, fechamento isolado e cobertura smoke.

---

## US-03 [VISUAL] Implementar Operation

**Descrição:** Criar seção "O que muda na operação" com cinco benefícios numerados, mostrando resultado prático sem promessa garantida.

**Cenários de Uso:**
- Caminho feliz: visitante entende o ganho prático de clareza, velocidade e controle.
- Erro esperado: benefícios parecem promessas absolutas.
- Edge cases: cinco cards precisam quebrar bem entre desktop e mobile.
- Loading: não aplicável.
- Empty state: não aplicável.

**Database:** Não se aplica.

**Arquivos a Criar / Modificar:**
- `components/landing/BenefitCard.tsx` (Criar card numerado)
- `components/landing/sections/Operation.tsx` (Criar seção)
- `app/page.tsx` (Adicionar `<Operation />`)
- `lib/content.ts` (Consumir benefícios)

**Dependências Externas:**
- `components/landing/Card`
- `components/landing/MonoLabel`

**Checklist de Execução:**
- [ ] Renderizar 5 benefícios.
- [ ] Numerar benefícios de `01` a `05`.
- [ ] Não prometer resultado garantido.
- [ ] Layout é escaneável no mobile.
