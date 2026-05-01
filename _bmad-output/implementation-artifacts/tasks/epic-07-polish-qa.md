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
- [x] Title: `Variant Media | Assessoria de performance jurídica`.
- [x] Description alinhada ao PRD.
- [x] `lang="pt-BR"` configurado.
- [x] OG não quebra caso imagem ainda não exista.

**Notas de Validação:**
- `app/layout.tsx` define `metadata.title` com acento em `jurídica`.
- `metadata.description` foi alinhada ao texto de meta description da copy calibrada.
- `openGraph` foi configurado com title, description, siteName, locale `pt_BR` e type `website`.
- Nenhuma imagem `og.png` foi referenciada, para não depender de um asset ainda inexistente.
- `lang="pt-BR"` já estava configurado e foi preservado.
- Cobertura smoke ampliada para validar metadata e evitar referência prematura a `og.png`.

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
- [x] H1 único no hero.
- [x] H2 em seções.
- [x] H3 em cards/listas.
- [x] Foco visível.
- [x] Contraste AA.
- [x] FAQ funciona por teclado.
- [x] Elementos decorativos usam `aria-hidden`.

**Notas de Validação:**
- A landing tem um único `<h1>`, localizado em `Hero`.
- As seções principais expõem `<h2>` e os cards/listas mantêm `<h3>`.
- `app/globals.css` mantém `*:focus-visible` com outline ciano visível.
- `FAQItem` usa `<details>` e `<summary>` nativos, sem JS custom, preservando teclado nativo.
- `BrandMark` e `Chevron` estão como decorativos com `aria-hidden`.
- `Header` mantém labels em nav/botão mobile e o menu mobile fechado agora usa `hidden={!menuOpen}`, evitando links invisíveis no fluxo de foco.
- O contraste da seção dark segue reforçado pelo token `--vm-panel-muted: rgba(213,222,230,.72)`.

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
- [x] Hero usa `vm-display`.
- [x] Hero usa `strike` em `Mais marketing`.
- [x] CTA primário do hero usa pill.
- [x] Eyebrow usa marcador quadrado ciano.
- [x] `DiagnosticFlow` aparece no método.
- [x] Existe apenas uma seção dark além do footer.
- [x] Ciano não preenche fundo grande.
- [x] Não há roxo/rosa estrutural.
- [x] Não há 3D decorativo, neon de borda ou glassmorphism.
- [x] Wordmark segue bold/extralight.
- [x] Nenhum claim sem prova aparece.

**Notas de Validação:**
- `Hero.tsx` e `Header.tsx` foram preservados sem alteração visual nesta US, conforme decisão do usuário.
- O smoke valida `vm-display`, `strike`, CTA primário com `pill`, marcador ciano do eyebrow e `DiagnosticFlow` no método.
- A landing mantém exatamente uma seção `variant="dark"` nas seções (`AISection`), além do footer.
- O QA automatizado bloqueia roxo/rosa estrutural, padrões 3D/neon e claims sem prova no conteúdo publicado.
- `DiagnosticFlow` teve `backdrop-blur-sm` removido para evitar leitura de glassmorphism em painel de conteúdo.
- Wordmark oficial permanece via SVG horizontal em `Header` e `Footer`, sem texto improvisado.

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
- [x] Rodar `npm run lint`, se configurado.
- [x] Rodar `npm run build`.
- [x] Revisar mobile, tablet e desktop.
- [x] Confirmar que textos não estouram cards ou botões.
- [x] Confirmar que anchors funcionam.
- [x] Registrar qualquer limitação pendente antes da revisão.

**Notas de Validação:**
- `package.json` não possui script `lint`; foi executado `npm run lint --if-present`, sem falha por ausência de script.
- `npm test` valida estrutura, anchors `#metodo`, `#gargalos`, `#tecnologia`, `#diferenciais`, `#faq`, `#cta-final`, CTAs curtos, logos oficiais, metadata, acessibilidade básica e critérios visuais.
- Revisão responsiva foi coberta por checks estáticos de layout usados nos componentes: `min-w-0`, `max-w-*`, grids responsivos, CTAs em `w-full` no mobile e containers limitados.
- `npm run build` valida TypeScript, imports e geração estática da rota `/`.
- Limitação pendente: não há script de lint dedicado nem automação Playwright/screenshot configurada neste pacote.
