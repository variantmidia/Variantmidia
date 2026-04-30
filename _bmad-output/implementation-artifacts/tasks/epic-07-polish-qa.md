# Epic: Polish, QA Visual, SEO e Build

## US-01 [POLISH] Configurar SEO e metadata

**Descrição:** Implementar metadados básicos da landing: title, description, Open Graph e idioma.

**Cenários de Uso:**
- Caminho feliz: página tem title e description corretos.
- Erro esperado: metadata antiga, genérica ou desalinhada com copy calibrada.
- Edge cases: `og.png` pode ficar como placeholder futuro, sem bloquear build.
- Loading: não aplicável.
- Empty state: não aplicável.

**Database:** Não se aplica.

**Arquivos a Criar / Modificar:**
- `app/layout.tsx` (Adicionar metadata global e `lang="pt-BR"`)
- `app/page.tsx` (Adicionar metadata da página, se arquitetura exigir)
- `public/og.png` (Opcional/futuro; não bloquear primeira entrega)

**Dependências Externas:** Nenhuma.

**Checklist de Execução:**
- [ ] Title: `Variant Media | Assessoria de performance jurídica`.
- [ ] Description alinhada ao PRD.
- [ ] `lang="pt-BR"` configurado.
- [ ] OG não quebra caso imagem ainda não exista.

---

## US-02 [POLISH] Revisar acessibilidade

**Descrição:** Validar semântica, headings, foco, contraste e comportamento do FAQ.

**Cenários de Uso:**
- Caminho feliz: página pode ser navegada por teclado e lida por tecnologias assistivas.
- Erro esperado: heading fora de ordem, foco invisível ou contraste insuficiente.
- Edge cases: SVGs decorativos devem estar `aria-hidden`.
- Loading: não aplicável.
- Empty state: não aplicável.

**Database:** Não se aplica.

**Arquivos a Criar / Modificar:**
- `app/globals.css` (Ajustar focus visible se necessário)
- `components/landing/Header.tsx` (Validar `aria-label`)
- `components/landing/FAQItem.tsx` (Validar summary nativo)
- `components/landing/BrandMark.tsx` e `Chevron.tsx` (Validar aria)
- `components/landing/sections/*.tsx` (Validar heading order)

**Dependências Externas:** Nenhuma.

**Checklist de Execução:**
- [ ] H1 único no hero.
- [ ] H2 em seções.
- [ ] H3 em cards/listas.
- [ ] Foco visível.
- [ ] Contraste AA.
- [ ] FAQ funciona por teclado.
- [ ] Elementos decorativos usam `aria-hidden`.

---

## US-03 [POLISH] Executar QA visual obrigatório

**Descrição:** Validar os critérios finos do PRD e do design system antes de considerar a landing pronta para revisão.

**Cenários de Uso:**
- Caminho feliz: landing parece premium, clara e fiel ao design system.
- Erro esperado: aparência de SaaS, agência, infoproduto ou excesso de dashboard.
- Edge cases: mobile pode exigir ocultar ou reduzir chevron.
- Loading: não aplicável.
- Empty state: não aplicável.

**Database:** Não se aplica.

**Arquivos a Criar / Modificar:**
- `components/landing/sections/Hero.tsx` (Ajustes de hero)
- `components/landing/sections/Method.tsx` (Ajustes de método)
- `components/landing/sections/AISection.tsx` (Ajustes dark section)
- `components/landing/Header.tsx` e `Footer.tsx` (Ajustes finais)
- `app/globals.css` (Ajustes mínimos de tokens/classes)

**Dependências Externas:** Nenhuma.

**Checklist de Execução:**
- [ ] Hero usa `vm-display`.
- [ ] Hero usa `strike` em `Mais marketing`.
- [ ] CTA primário do hero usa pill.
- [ ] Eyebrow usa marcador quadrado ciano.
- [ ] `DiagnosticFlow` aparece no método.
- [ ] Existe apenas uma seção dark além do footer.
- [ ] Ciano não preenche fundo grande.
- [ ] Não há roxo/rosa estrutural.
- [ ] Não há 3D decorativo, neon de borda ou glassmorphism.
- [ ] Wordmark segue bold/extralight.
- [ ] Nenhum claim sem prova aparece.

---

## US-04 [POLISH] Rodar lint, build e revisão responsiva

**Descrição:** Validar tecnicamente a landing antes de primeira revisão.

**Cenários de Uso:**
- Caminho feliz: `lint` e `build` passam; página funciona em mobile e desktop.
- Erro esperado: erro TypeScript, import quebrado, classe inválida, texto estourando container.
- Edge cases: se lint não estiver configurado, registrar isso no handoff final.
- Loading: não aplicável.
- Empty state: não aplicável.

**Database:** Não se aplica.

**Arquivos a Criar / Modificar:**
- Qualquer arquivo afetado por correções finais de lint/build.

**Dependências Externas:** Nenhuma nova.

**Checklist de Execução:**
- [ ] Rodar `npm run lint`, se configurado.
- [ ] Rodar `npm run build`.
- [ ] Revisar mobile, tablet e desktop.
- [ ] Confirmar que textos não estouram cards ou botões.
- [ ] Confirmar que anchors funcionam.
- [ ] Registrar qualquer limitação pendente antes da revisão.

