# Task Breakdown - Variant Media Landing

Fonte principal: `_bmad-output/planning-artifacts/prd.md`

## Ordem de execução

1. **[epic-00-foundation.md](./epic-00-foundation.md)** - Bootstrap, Tailwind, fontes, tokens e conteúdo central.
2. **[epic-01-shell-components.md](./epic-01-shell-components.md)** - Componentes base, header e footer.
3. **[epic-02-hero.md](./epic-02-hero.md)** - Hero, chevron e primeira dobra.
4. **[epic-03-content-sections.md](./epic-03-content-sections.md)** - Credibilidade, dor e operação.
5. **[epic-04-method-system.md](./epic-04-method-system.md)** - Método e DiagnosticFlow.
6. **[epic-05-ai-section.md](./epic-05-ai-section.md)** - Seção dark de IA e TechPanel.
7. **[epic-06-trust-conversion.md](./epic-06-trust-conversion.md)** - Diferenciais, objeções, prova, FAQ e CTA final.
8. **[epic-07-polish-qa.md](./epic-07-polish-qa.md)** - SEO, acessibilidade, responsividade, build e revisão visual.

## Regras globais

- Não criar backend, banco, auth ou integrações reais nesta versão.
- Não criar formulário fake.
- Não publicar claims como `ROI em 45 dias` ou `mais de 300 escritórios atendidos`.
- Usar `docs/DESIGN-SYSTEM.md` como fonte de verdade de UI.
- Usar copy centralizada em `lib/content.ts`.
- Construir visual primeiro, funcionalidade leve depois, e QA por último.

## Stories prontas para implementação direta

- **Epic 05 / US-01 [VISUAL] Criar TechPanel:** [epic-05-us-01-techpanel.md](../stories/epic-05-us-01-techpanel.md)
