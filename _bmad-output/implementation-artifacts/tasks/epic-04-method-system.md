# Epic: Método e DiagnosticFlow

## US-01 [VISUAL] Criar DiagnosticFlow

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
- [ ] Renderizar os nós Oferta, Demanda e Conversão.
- [ ] Usar status visuais apenas como linguagem ilustrativa.
- [ ] Não usar dados reais ou claims numéricos sem prova.
- [ ] Componente é responsivo.
- [ ] Visual é modular, não dashboard pesado.

---

## US-02 [VISUAL] Implementar Method

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
- [ ] Seção tem `id="metodo"`.
- [ ] H2 comunica que toda perda passa por oferta, demanda ou conversão.
- [ ] Nodes explicam Oferta, Demanda e Conversão.
- [ ] `DiagnosticFlow` aparece aqui.
- [ ] `DiagnosticFlow` não domina o hero.

---

## US-03 [POLISH] Refinar força visual do método

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
- [ ] Método é uma das seções mais fortes da página.
- [ ] Não há aparência de dashboard SaaS.
- [ ] Ciano aparece como acento controlado.
- [ ] A seção mantém ritmo visual com o restante da landing.

