# Epic: IA Humanizada e Painel Operacional

## US-01 [VISUAL] Criar TechPanel

**Status:** review  
**Story:** [epic-05-us-01-techpanel.md](../stories/epic-05-us-01-techpanel.md)

**Descrição:** Implementar `TechPanel` como painel escuro pontual da seção de IA, com triagem inicial, follow-up e resumo/contexto. O painel deve parecer bastidor operacional, não produto de chatbot.

**Cenários de Uso:**
- Caminho feliz: visitante entende tecnologia como apoio ao atendimento.
- Erro esperado: painel parecer SaaS, dashboard real ou chatbot como produto principal.
- Edge cases: indicadores visuais são ilustrativos e não devem ser tratados como métricas reais.
- Loading: não aplicável.
- Empty state: não aplicável.

**Database:** Não se aplica.

**Arquivos a Criar / Modificar:**
- `components/landing/TechPanel.tsx` (Criar painel dark)

**Dependências Externas:**
- `components/landing/MonoLabel`
- `@/lib/cn`

**Checklist de Execução:**
- [x] Painel usa fundo dark do design system.
- [x] Renderiza Triagem inicial, Follow-up e Resumo/contexto.
- [x] Usa indicadores discretos.
- [x] Não comunica dados reais.
- [x] Não parece produto de chatbot.

**Notas de Validação:**
- `TechPanel` foi criado em `components/landing/TechPanel.tsx` com `<aside>`, `MonoLabel`, `cn` e header de bastidor operacional.
- `TechPanel` foi integrado na seção dark `#tecnologia` existente em `app/page.tsx`, para a mudança aparecer na landing nesta mesma sessão.
- O painel renderiza os três estágios previstos: `Triagem inicial`, `Follow-up` e `Resumo e contexto`.
- Os indicadores são sinais ilustrativos, sem números de conversão, tempo médio, lead qualificado, status ao vivo ou qualquer dado real.
- A cobertura smoke foi ampliada para validar existência do componente, tokens dark, textos obrigatórios e ausência de métricas reais.
- Validação técnica: `npm test` e `npm run build`.

**File List:**
- `components/landing/TechPanel.tsx`
- `app/page.tsx`
- `tests/smoke.mjs`
- `_bmad-output/implementation-artifacts/tasks/epic-05-ai-section.md`
- `_bmad-output/implementation-artifacts/stories/epic-05-us-01-techpanel.md`

**Change Log:**
- 2026-04-30: US-01 [VISUAL] implementada com `TechPanel` dark, estágios operacionais, integração na seção `#tecnologia` e cobertura smoke.

---

## US-02 [VISUAL] Implementar AISection

**Descrição:** Criar a única seção dark da landing, além do footer, para explicar tecnologia com critério e IA como apoio operacional.

**Cenários de Uso:**
- Caminho feliz: usuário entende que IA melhora triagem, follow-up e organização.
- Erro esperado: IA vira protagonista ou hype.
- Edge cases: contraste precisa ser AA em fundo dark.
- Loading: não aplicável.
- Empty state: não aplicável.

**Database:** Não se aplica.

**Arquivos a Criar / Modificar:**
- `components/landing/sections/AISection.tsx` (Criar seção com `id="tecnologia"`)
- `app/page.tsx` (Adicionar `<AISection />`)
- `lib/content.ts` (Consumir copy de IA)

**Dependências Externas:**
- `components/landing/TechPanel`
- `components/landing/Section`
- `components/landing/Container`

**Checklist de Execução:**
- [x] Seção tem `id="tecnologia"`.
- [x] É a única seção dark da landing além do footer.
- [x] Título diz que tecnologia apoia atendimento.
- [x] Copy evita hype.
- [x] Contraste em fundo dark é adequado.

**Notas de Validação:**
- `AISection` foi criada em `components/landing/sections/AISection.tsx` e concentra a seção `#tecnologia`.
- `app/page.tsx` passou a renderizar apenas `<AISection />`, sem bloco dark inline.
- A copy vem de `lib/content.ts`, incluindo os três blocos práticos de IA: triagem inicial, follow-up e resumo/contexto.
- `TechPanel` foi mantido como apoio visual da landing, mas sem linguagem de dashboard/SaaS: removeu `Ao vivo`, barras de progresso e pseudo-métrica.
- A seção dark continua sendo pontual na landing; fora dela, apenas o footer usa fundo dark.

---

## US-03 [POLISH] Ajustar contraste e responsividade da seção dark

**Descrição:** Revisar a seção de IA em mobile, tablet e desktop, garantindo legibilidade, contraste e integração visual com o restante da página.

**Cenários de Uso:**
- Caminho feliz: seção dark dá ritmo sem pesar a página.
- Erro esperado: painel dark domina a landing ou fica ilegível.
- Edge cases: barras e mini indicadores não devem espremer texto em mobile.
- Loading: não aplicável.
- Empty state: não aplicável.

**Database:** Não se aplica.

**Arquivos a Criar / Modificar:**
- `components/landing/sections/AISection.tsx` (Ajustar layout responsivo)
- `components/landing/TechPanel.tsx` (Ajustar responsividade interna)

**Dependências Externas:** Nenhuma.

**Checklist de Execução:**
- [x] Texto dark passa contraste AA.
- [x] Painel não estoura em mobile.
- [x] A seção não vira dark mode dominante.
- [x] Motion respeita `prefers-reduced-motion`.

**Notas de Validação:**
- O token `--vm-panel-muted` foi elevado para melhorar contraste de textos secundários no fundo dark.
- `AISection` ganhou contenção de overflow, grid responsivo com `minmax(0,...)`, blocos em 3 colunas no tablet e volta para coluna no desktop junto do painel.
- `TechPanel` recebeu `w-full`, `min-w-0`, limite de largura em desktop, colunas responsivas e redução de tracking em textos monoespaçados no mobile.
- Animação e transições do painel agora usam `motion-reduce:animate-none` e `motion-reduce:transition-none`, além da regra global de `prefers-reduced-motion`.
- A seção segue sendo uma única faixa dark pontual da landing, com borda sutil e sem ampliar o dark mode para outras seções.
