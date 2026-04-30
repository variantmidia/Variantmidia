# Epic: Confiança, Objeções, FAQ e Conversão

## US-01 [VISUAL] Implementar Diferenciais

**Descrição:** Criar seção editorial de diferenciais com lista de seis itens, separando a Variant Media de agência genérica, freelancer ou ferramenta isolada.

**Cenários de Uso:**
- Caminho feliz: visitante entende por que a abordagem é diferente.
- Erro esperado: lista vira grid decorativo genérico.
- Edge cases: cada item deve ter uma frase curta e escaneável.
- Loading: não aplicável.
- Empty state: não aplicável.

**Database:** Não se aplica.

**Arquivos a Criar / Modificar:**
- `components/landing/DifferentialItem.tsx` (Criar item editorial)
- `components/landing/sections/Differentials.tsx` (Criar seção com `id="diferenciais"`)
- `app/page.tsx` (Adicionar `<Differentials />`)
- `lib/content.ts` (Consumir lista de diferenciais)

**Dependências Externas:** Nenhuma.

**Checklist de Execução:**
- [ ] Renderizar 6 diferenciais.
- [ ] Seção tem `id="diferenciais"`.
- [ ] Lista usa divisores editoriais.
- [ ] Não usar grid pesado sem necessidade.

---

## US-02 [VISUAL] Implementar Objections e ProofPlaceholder

**Descrição:** Criar seção de objeções com três cards e um bloco de prova discreto que não inventa dados.

**Cenários de Uso:**
- Caminho feliz: visitante vê objeções comuns respondidas com franqueza.
- Erro esperado: bloco inventa prova, números ou case.
- Edge cases: quando não houver prova real, placeholder deve comunicar validação pendente de forma elegante.
- Loading: não aplicável.
- Empty state: `ProofPlaceholder` cobre ausência de prova validada.

**Database:** Não se aplica.

**Arquivos a Criar / Modificar:**
- `components/landing/ObjectionCard.tsx` (Criar card de objeção)
- `components/landing/ProofPlaceholder.tsx` (Criar bloco de prova pendente)
- `components/landing/sections/Objections.tsx` (Criar seção)
- `app/page.tsx` (Adicionar `<Objections />`)
- `lib/content.ts` (Consumir objeções e texto do placeholder)

**Dependências Externas:** Nenhuma.

**Checklist de Execução:**
- [ ] Renderizar 3 objeções.
- [ ] Usar aspas ou tratamento editorial com moderação.
- [ ] Não publicar claims sem prova.
- [ ] `ProofPlaceholder` indica que provas reais entram depois de validação.
- [ ] Seção reduz ceticismo antes do CTA final.

---

## US-03 [FUNCTIONAL] Implementar FAQ nativo

**Descrição:** Criar FAQ com `<details>` e `<summary>` nativos, sem dependência de JS custom.

**Cenários de Uso:**
- Caminho feliz: usuário abre e fecha perguntas.
- Erro esperado: componente depende de JS desnecessário ou não é acessível por teclado.
- Edge cases: múltiplas perguntas podem ficar abertas ao mesmo tempo; isso é aceitável.
- Loading: não aplicável.
- Empty state: não aplicável.

**Database:** Não se aplica.

**Arquivos a Criar / Modificar:**
- `components/landing/FAQItem.tsx` (Criar item nativo)
- `components/landing/sections/FAQ.tsx` (Criar seção com `id="faq"`)
- `app/page.tsx` (Adicionar `<FAQ />`)
- `lib/content.ts` (Consumir perguntas)

**Dependências Externas:** Nenhuma.

**Checklist de Execução:**
- [ ] FAQ usa `<details>` e `<summary>`.
- [ ] Seção tem `id="faq"`.
- [ ] Funciona sem JS custom.
- [ ] Foco e teclado funcionam nativamente.
- [ ] Textos vêm de `lib/content.ts`.

---

## US-04 [FUNCTIONAL] Implementar CTA final

**Descrição:** Criar seção final com reforço da tese, CTA principal, CTA secundário e microcopy.

**Cenários de Uso:**
- Caminho feliz: usuário chega ao final e encontra caminho claro para diagnóstico.
- Erro esperado: CTA aponta para destino inexistente sem fallback.
- Edge cases: sem URL real, CTA principal deve usar destino centralizado temporário.
- Loading: não aplicável.
- Empty state: não criar formulário fake.

**Database:** Não se aplica.

**Arquivos a Criar / Modificar:**
- `components/landing/sections/FinalCTA.tsx` (Criar seção com `id="cta-final"`)
- `app/page.tsx` (Adicionar `<FinalCTA />`)
- `lib/content.ts` (Consumir CTA final e destinos)

**Dependências Externas:**
- `next/link`
- `components/landing/Button`

**Checklist de Execução:**
- [ ] Seção tem `id="cta-final"`.
- [ ] CTA principal é `Agendar diagnóstico`.
- [ ] CTA secundário é `Falar com a equipe`.
- [ ] Microcopy aparece.
- [ ] Não há formulário fake.

