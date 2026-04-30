# Epic: IA Humanizada e Painel Operacional

## US-01 [VISUAL] Criar TechPanel

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
- [ ] Painel usa fundo dark do design system.
- [ ] Renderiza Triagem inicial, Follow-up e Resumo/contexto.
- [ ] Usa indicadores discretos.
- [ ] Não comunica dados reais.
- [ ] Não parece produto de chatbot.

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
- [ ] Seção tem `id="tecnologia"`.
- [ ] É a única seção dark da landing além do footer.
- [ ] Título diz que tecnologia apoia atendimento.
- [ ] Copy evita hype.
- [ ] Contraste em fundo dark é adequado.

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
- [ ] Texto dark passa contraste AA.
- [ ] Painel não estoura em mobile.
- [ ] A seção não vira dark mode dominante.
- [ ] Motion respeita `prefers-reduced-motion`.

