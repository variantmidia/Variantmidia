---
title: "PRD: Landing Page Variant Media"
type: prd
status: ready-for-implementation
created: "2026-04-30"
updated: "2026-04-30"
project: "variant-media"
brand: "Variant Media"
scope: "single-page landing institucional/comercial"
primary_cta: "Agendar diagnostico"
source_priority:
  - "docs/DESIGN-SYSTEM.md"
  - "docs/HANDOFF.md"
  - "_bmad-output/planning-artifacts/homepage-copy-variant-media-2026-04-30.md"
  - "_bmad-output/planning-artifacts/calibracao-gpt55-variant-media-2026-04-30.md"
  - "_bmad-output/planning-artifacts/product-brief-variant-media.md"
inputDocuments:
  - "docs/DESIGN-SYSTEM.md"
  - "docs/HANDOFF.md"
  - "_bmad-output/planning-artifacts/homepage-copy-variant-media-2026-04-30.md"
  - "_bmad-output/planning-artifacts/calibracao-gpt55-variant-media-2026-04-30.md"
  - "_bmad-output/planning-artifacts/product-brief-variant-media.md"
  - "_bmad-output/planning-artifacts/direcao-pos-logo-variant-media-2026-04-29.md"
  - "index.md"
---

# PRD: Landing Page Variant Media

## 1. Resumo

Criar uma landing page institucional/comercial para a Variant Media, com foco em gerar agendamentos de diagnostico com escritorios de advocacia.

A pagina deve posicionar a Variant Media como uma assessoria pratica de performance juridica, nao como agencia de trafego, SaaS, legaltech enterprise ou consultoria corporativa fria.

O objetivo da primeira versao nao e criar um site completo. E entregar uma pagina unica, bem acabada, responsiva, com copy oficial, design system implementado e estrutura clara para executar secao por secao.

## 2. Decisao Estrategica

### Posicionamento

A Variant Media e uma assessoria de performance juridica que ajuda escritorios de advocacia a identificar onde estao perdendo receita: na oferta, na geracao de demanda ou na conversao. A partir desse diagnostico, estrutura acoes praticas de marketing, atendimento e tecnologia para transformar mais oportunidades em contratos.

### Hierarquia de mensagem

1. Performance juridica
2. Diagnostico de gargalos
3. `Oferta -> Demanda -> Conversao`
4. Atendimento, comercial e tecnologia
5. IA como recurso, nao como protagonista

### Hero base

Headline:

`Mais marketing nao resolve quando o gargalo esta na oferta, no atendimento ou na conversao.`

Subheadline:

`A Variant Media diagnostica onde seu escritorio esta perdendo receita e estrutura um processo mais claro para atrair, qualificar e converter melhores oportunidades.`

CTA principal:

`Agendar diagnostico`

CTA secundario:

`Entender o metodo`

## 3. Objetivos

### Objetivo primario

Levar visitantes qualificados a solicitar ou iniciar um diagnostico com a Variant Media.

### Objetivos secundarios

- Explicar rapidamente que a Variant Media e especializada em escritorios de advocacia.
- Diferenciar a empresa de agencias genericas, freelancers, ferramentas isoladas e promessas de trafego.
- Tornar memoravel o metodo `Oferta -> Demanda -> Conversao`.
- Reduzir ceticismo sobre marketing juridico, IA, nicho juridico e promessas de resultado.
- Criar uma base tecnica e visual consistente para futuras paginas, casos e conteudos.

## 4. Publico

### Publico principal

Socio, dono ou fundador de escritorio de advocacia que quer crescer, mas ainda depende de indicacao, atendimento reativo, demanda pouco qualificada ou processo comercial informal.

### Publico secundario

Responsavel por operacao, comercial, atendimento ou marketing em escritorios mais estruturados.

### Estado mental esperado

- Ja tentou marketing e ficou cético.
- Quer previsibilidade de faturamento.
- Nao quer atrair curiosos.
- Nao quer parecer antiético ou agressivo.
- Quer clareza sobre o que gera cliente de verdade.
- Desconfia de relatorios de clique, seguidores e metricas de vaidade.

## 5. Escopo

### Dentro do escopo

- Bootstrap de app Next.js com App Router, TypeScript e Tailwind CSS, caso ainda nao exista.
- Implementacao dos tokens do `docs/DESIGN-SYSTEM.md`.
- Implementacao de componentes base da landing.
- Implementacao da landing single page com 10 secoes principais, header e footer.
- Centralizacao da copy em `lib/content.ts`.
- SEO basico e metadados.
- Acessibilidade AA.
- Responsividade mobile, tablet e desktop.
- Motion leve via CSS, respeitando `prefers-reduced-motion`.

### Fora do escopo da primeira versao

- Blog.
- CMS.
- Area administrativa.
- Formulario com backend.
- Integracao real com CRM, agenda, WhatsApp ou email.
- Analytics, pixels e eventos.
- Criacao de cases reais ou validacao de claims.
- Novas paginas de servico.
- Painel SaaS real.

## 6. Fonte de Verdade

### UI e implementacao visual

`docs/DESIGN-SYSTEM.md` prevalece para tokens, componentes, estrutura de arquivos, acessibilidade, performance e composicao visual.

### Estrategia e guardrails

`docs/HANDOFF.md` e `calibracao-gpt55-variant-media-2026-04-30.md` prevalecem para posicionamento, tom e limites de linguagem.

### Copy

`homepage-copy-variant-media-2026-04-30.md` e a secao `11. Copy oficial` do `docs/DESIGN-SYSTEM.md` prevalecem para textos publicos.

### Se houver conflito

1. `docs/DESIGN-SYSTEM.md` decide UI.
2. Este PRD decide escopo e ordem de execucao.
3. `docs/HANDOFF.md` decide estrategia.
4. `homepage-copy-variant-media-2026-04-30.md` decide copy.

## 7. Requisitos Funcionais

### RF-01: Landing single page

A pagina deve ser implementada como uma unica pagina em `app/page.tsx`.

Aceite:

- Renderiza todas as secoes na ordem definida.
- Nao depende de JS para exibir conteudo principal.
- Navegacao interna por anchors funciona.
- Header e footer aparecem em todas as larguras.

### RF-02: Navegacao

A pagina deve ter header com logo, links internos e CTA principal.

Links:

- Metodo: `#metodo`
- Gargalos: `#gargalos`
- Tecnologia: `#tecnologia`
- Diferenciais: `#diferenciais`
- FAQ: `#faq`
- CTA: `#cta-final`

Aceite:

- Header e legivel sobre fundo claro.
- CTA principal fica acessivel no desktop.
- Mobile nao quebra layout; se menu mobile for implementado, deve ser simples.

### RF-03: CTAs

Todos os CTAs devem usar copy oficial.

Aceite:

- CTA principal: `Agendar diagnostico`.
- CTA secundario no hero: `Entender o metodo`.
- CTA secundario final: `Falar com a equipe`.
- Enquanto nao houver URL real de agenda, os CTAs devem apontar para `#cta-final` ou usar valor centralizado em `lib/content.ts`.
- Nao criar formulario falso.

### RF-04: Conteudo centralizado

Toda a copy publica da landing deve ficar em `lib/content.ts`.

Aceite:

- As secoes importam conteudo do arquivo central.
- Nao ha copy duplicada solta dentro das secoes, exceto labels estruturais muito pequenos.
- Alterar um texto em `lib/content.ts` reflete na pagina.

### RF-05: Metodo `Oferta -> Demanda -> Conversao`

O metodo deve ser uma secao central da landing e aparecer tambem como linguagem visual no hero ou no modulo `DiagnosticFlow`.

Aceite:

- Os tres pontos aparecem explicitamente: Oferta, Demanda, Conversao.
- A secao comunica diagnostico antes de execucao.
- O componente visual nao parece dashboard SaaS dominante.

### RF-06: IA como apoio operacional

A secao de IA deve mostrar tecnologia como bastidor de atendimento, triagem e follow-up.

Aceite:

- A IA nao aparece antes do metodo.
- A IA nao vira protagonista do hero.
- A secao pode ser a unica dark section da landing.
- Copy usa `Tecnologia com criterio` e evita hype.

### RF-07: Objeções e FAQ

A landing deve tratar objeções centrais antes do CTA final.

Aceite:

- Inclui 3 objeções principais.
- Inclui FAQ com 5 perguntas.
- FAQ deve funcionar sem dependencia de JS complexa, preferencialmente com `<details>` e `<summary>`.

## 8. Requisitos Nao Funcionais

### RNF-01: Stack

Usar:

- Next.js App Router
- TypeScript
- Tailwind CSS
- React Server Components por padrao
- Client Components apenas quando houver interacao real

Dependencias permitidas:

- `lucide-react`
- `clsx`
- `tailwind-merge`

Nao usar sem aprovacao:

- shadcn/ui
- headlessui
- framer-motion
- bibliotecas pesadas de animacao
- bibliotecas de UI completas

### RNF-02: Performance

Aceite:

- Hero renderiza sem depender de imagem externa ou JS pesado.
- Fontes via `next/font`.
- SVGs inline para logo e chevron.
- Sem imagens grandes na primeira versao, exceto `og.png` futura.
- Motion via CSS.

### RNF-03: Acessibilidade

Aceite:

- Contraste AA.
- H1 unico no hero.
- H2 em secoes.
- H3 em cards/listas.
- Foco visivel.
- `prefers-reduced-motion` respeitado.
- Elementos decorativos com `aria-hidden`.
- Navegacao com `aria-label`.

### RNF-04: Responsividade

Aceite:

- Mobile-first.
- Layout desktop inicia a partir de `lg: 1024px`.
- Container maximo de `1240px`.
- Texto nao estoura cards ou botoes.
- Hero continua legivel em telas pequenas.

### RNF-05: SEO basico

Aceite:

- Metadata configurada.
- Title recomendado: `Variant Media | Assessoria de performance juridica`.
- Description recomendada: `A Variant Media ajuda escritorios de advocacia a diagnosticar gargalos de oferta, demanda e conversao para atrair, qualificar e converter melhores oportunidades.`
- `lang="pt-BR"` no HTML.

## 9. Design System Obrigatorio

### Direcao visual

`70% Precisao Modular + 20% Autoridade Editorial + 10% Sinal de Performance`

### Regra principal

Clareza vence efeito.

### Tokens obrigatorios

Implementar os tokens do `docs/DESIGN-SYSTEM.md`, incluindo:

- cores `vm`
- fontes Inter, JetBrains Mono e Fraunces via `next/font`
- radius de 4px, 8px, 12px, 16px e pill
- shadows `vm`
- easing `vm-ease` e `vm-out`
- grid background `vm-grid`
- z-index discreto

### Componentes base obrigatorios

- `Container`
- `Section`
- `Button`
- `Header`
- `Footer`
- `BrandMark`
- `Card`
- `PainCard`
- `BenefitCard`
- `DifferentialItem`
- `ObjectionCard`
- `ProofPlaceholder`
- `DiagnosticFlow`
- `TechPanel`
- `FAQItem`
- `Eyebrow`
- `MonoLabel`
- `Chevron`

## 10. Estrutura da Pagina

Ordem final:

1. Header
2. Hero
3. Credibilidade inicial
4. Dor principal
5. Metodo `Oferta -> Demanda -> Conversao`
6. O que muda na operacao
7. IA humanizada e atendimento
8. Diferenciais
9. Prova e objeções
10. FAQ
11. CTA final
12. Footer

## 11. Requisitos Por Secao

### 11.1 Header

Objetivo:

Dar navegação simples, reforçar a marca e manter o CTA acessível.

Conteudo:

- Logo/wordmark `variantmidia` conforme design system.
- Links internos: Metodo, Gargalos, Tecnologia, Diferenciais, FAQ.
- CTA: `Agendar diagnostico`.

Componentes:

- `Header`
- `BrandMark`
- `Button`

Aceite:

- Sticky com transicao de borda ao scroll.
- Mobile nao quebra.
- A logo tem texto visivel junto do simbolo.

### 11.2 Hero

Objetivo:

Comunicar em ate 5 segundos que a Variant Media resolve gargalos de receita para escritorios de advocacia.

Copy:

- Eyebrow: `Performance juridica`
- Rule: `Diagnostico · Oferta · Demanda · Conversao`
- H1 baseado em: `Mais marketing nao resolve. Resolve diagnosticar o gargalo certo.`
- Subheadline conforme copy oficial.
- CTAs: `Agendar diagnostico`, `Entender o metodo`.

Componentes:

- `Hero`
- `Chevron`
- `Button`
- `MonoLabel`

Aceite:

- Fundo claro.
- H1 grande e memoravel.
- Chevron decorativo nao compete com texto.
- Nenhum dashboard falso pesado no hero.

### 11.3 Credibilidade Inicial

Objetivo:

Explicar que a empresa nao vende pacote antes de diagnosticar.

Conteudo:

- Titulo: `Nao vendemos marketing por pacote. Primeiro entendemos o que esta impedindo seu escritorio de crescer.`
- Cards: Diagnostico antes da prescricao, Especializacao em advocacia, Foco em faturamento.

Componentes:

- `Credibility`
- `Card`
- `Eyebrow` ou `MonoLabel`

Aceite:

- 3 cards claros.
- Texto curto.
- Sem claims numericos.

### 11.4 Dor Principal

Objetivo:

Fazer o visitante reconhecer a perda de receita no improviso comercial.

ID:

`gargalos`

Conteudo:

- Titulo: `Quando o escritorio cresce no improviso, a receita fica instavel.`
- Cards: Dependencia de indicacao, Lead que chega e se perde, Curioso demais, Comercial sem metodo.
- Fechamento: `Enquanto isso nao fica visivel, qualquer investimento parece tentativa e erro.`

Componentes:

- `Pain`
- `PainCard`

Aceite:

- Fundo `alt`.
- 4 cards responsivos.
- Tom direto, sem exagero.

### 11.5 Metodo

Objetivo:

Tornar `Oferta -> Demanda -> Conversao` a espinha dorsal da pagina.

Conteudo:

- Titulo: `Toda perda de receita passa por tres pontos: oferta, demanda ou conversao.`
- Nodes: Oferta, Demanda, Conversao.

Componentes:

- `Method`
- `DiagnosticFlow`
- `MethodNode` interno

Aceite:

- Deve ser uma das secoes mais fortes visualmente.
- Usa modulo conectado/diagnostico.
- Nao parece diagrama escolar.
- Nao parece produto SaaS.

### 11.6 Operacao

Objetivo:

Mostrar o que muda na pratica para o escritorio.

Conteudo:

- Titulo: `Nao e sobre parecer maior. E sobre vender com mais clareza.`
- Beneficios: Mais previsibilidade, Mais qualificacao, Mais velocidade, Mais controle, Mais escala.

Componentes:

- `Operation`
- `BenefitCard`

Aceite:

- 5 beneficios com numeracao.
- Layout escaneavel.
- Sem prometer resultado garantido.

### 11.7 IA Humanizada e Atendimento

Objetivo:

Apresentar tecnologia como apoio operacional.

Conteudo:

- Eyebrow: `Tecnologia com criterio`
- Titulo: `Tecnologia entra para apoiar o atendimento, nao para virar protagonista da marca.`
- Funcoes: Triagem inicial, Follow-up, Resumo e contexto.

Componentes:

- `AISection`
- `TechPanel`

Aceite:

- Unica secao dark da landing, alem do footer.
- Painel escuro pontual.
- IA aparece depois do metodo.
- Nao parece produto de chatbot.

### 11.8 Diferenciais

Objetivo:

Diferenciar a Variant Media de agencia generica, freelancer ou ferramenta isolada.

Conteudo:

- Titulo: `Por que isso e diferente de contratar uma agencia generica.`
- 6 itens: Especializacao juridica, Diagnostico antes de executar, Visao de ponta a ponta, Acompanhamento proximo, Tecnologia com criterio, Conversa de negocio.

Componentes:

- `Differentials`
- `DifferentialItem`

Aceite:

- Lista editorial, nao grid decorativo pesado.
- Cada item tem uma frase curta.
- Reforça acompanhamento proximo.

### 11.9 Prova e Objeções

Objetivo:

Reduzir ceticismo antes do CTA final.

Conteudo:

- Titulo: `Antes de contratar, todo escritorio precisa confiar em tres coisas.`
- Objeções: marketing anterior falhou, nicho juridico, IA robotica.
- Bloco de prova deve ser reservado apenas para provas validadas.

Componentes:

- `Objections`
- `ObjectionCard`
- `ProofPlaceholder`

Aceite:

- 3 objeções com respostas.
- Sem numeros sem prova.
- Se nao houver prova real, usar `ProofPlaceholder` discreto, nao inventar case.
- `ProofPlaceholder` deve deixar claro que provas reais entram depois de validacao.

### 11.10 FAQ

Objetivo:

Responder perguntas previsiveis de forma curta.

Conteudo:

- 5 perguntas da copy oficial.

Componentes:

- `FAQ`
- `FAQItem`

Aceite:

- `<details>` e `<summary>`.
- Funciona sem JS.
- Ordem e textos conforme copy oficial.

### 11.11 CTA Final

Objetivo:

Fechar a pagina retomando diagnostico e acao.

Conteudo:

- Titulo: `O proximo passo nao e aumentar o ruido. E diagnosticar o gargalo certo.`
- CTA principal: `Agendar diagnostico`
- CTA secundario: `Falar com a equipe`
- Microcopy: `Conversa objetiva. Sem pacote empurrado. Sem promessa facil.`

Componentes:

- `FinalCTA`
- `Button`

Aceite:

- ID `cta-final`.
- CTA claro e sem friccao.
- Sem formulario fake.

### 11.12 Footer

Objetivo:

Encerrar com marca, posicionamento curto e links basicos.

Conteudo:

- Logo/wordmark.
- Frase: `Assessoria de performance juridica. Diagnostico, metodo e tecnologia aplicada a conversao.`
- Copyright 2026.

Componentes:

- `Footer`
- `BrandMark`

Aceite:

- Fundo dark.
- Contraste AA.
- Links e texto legiveis.

## 12. Arquitetura Tecnica

Estrutura esperada:

```txt
app/
  layout.tsx
  page.tsx
  globals.css
components/
  landing/
    Header.tsx
    Footer.tsx
    Container.tsx
    Section.tsx
    Button.tsx
    BrandMark.tsx
    Chevron.tsx
    Card.tsx
    PainCard.tsx
    BenefitCard.tsx
    ObjectionCard.tsx
    ProofPlaceholder.tsx
    DifferentialItem.tsx
    DiagnosticFlow.tsx
    TechPanel.tsx
    FAQItem.tsx
    Eyebrow.tsx
    MonoLabel.tsx
    sections/
      Hero.tsx
      Credibility.tsx
      Pain.tsx
      Method.tsx
      Operation.tsx
      AISection.tsx
      Differentials.tsx
      Objections.tsx
      FAQ.tsx
      FinalCTA.tsx
lib/
  cn.ts
  content.ts
public/
  og.png
tailwind.config.ts
```

## 13. Execucao Secao por Secao

### Fase 0: Bootstrap e fundacao

Comandos recomendados:

```bash
npx create-next-app@latest variant-media --typescript --tailwind --app --no-src-dir --import-alias "@/*"
cd variant-media
npm i clsx tailwind-merge lucide-react
npm run dev
```

Depois do bootstrap:

1. Substituir `tailwind.config.ts` pelos tokens do `docs/DESIGN-SYSTEM.md`.
2. Substituir `app/globals.css` pela base do `docs/DESIGN-SYSTEM.md`.
3. Configurar fontes em `app/layout.tsx`.
4. Criar `lib/cn.ts`.
5. Criar `lib/content.ts`.
6. Criar componentes base antes das secoes visuais.

Entregaveis:

- Next.js App Router + TypeScript + Tailwind.
- `next/font` com Inter, JetBrains Mono e Fraunces.
- `tailwind.config.ts` com tokens.
- `app/globals.css` com base, componentes tipograficos e reduced motion.
- `lib/cn.ts`.
- `lib/content.ts`.

Aceite:

- App roda localmente.
- Sem erro de TypeScript.
- Tokens `vm` disponiveis no Tailwind.
- Pagina inicial renderiza placeholder simples.

### Fase 1: Shell e componentes base

Entregaveis:

- `Container`, `Section`, `Button`, `BrandMark`, `Eyebrow`, `MonoLabel`.
- `Header` e `Footer`.

Aceite:

- Header e footer renderizam.
- CTAs usam componente `Button`.
- Logo aparece com texto.

### Fase 2: Hero

Entregaveis:

- `Hero`.
- `Chevron`.
- Primeira dobra finalizada.

Aceite:

- H1 forte e responsivo.
- CTAs funcionam.
- Mobile mantem leitura.

### Fase 3: Credibilidade + Dor

Entregaveis:

- `Credibility`.
- `Pain`.
- `Card` e `PainCard`.

Aceite:

- Conteudo curto e escaneavel.
- Cards responsivos.
- Alternancia de fundo coerente.

### Fase 4: Metodo

Entregaveis:

- `Method`.
- `DiagnosticFlow`.

Aceite:

- `Oferta -> Demanda -> Conversao` e o bloco mais memoravel depois do hero.
- Modulo nao parece SaaS generico.

### Fase 5: Operacao + IA

Entregaveis:

- `Operation`.
- `BenefitCard`.
- `AISection`.
- `TechPanel`.

Aceite:

- Beneficios claros.
- IA dark section unica.
- Tecnologia aparece como apoio.

### Fase 6: Diferenciais + Objeções

Entregaveis:

- `Differentials`.
- `DifferentialItem`.
- `Objections`.
- `ObjectionCard`.
- `ProofPlaceholder`.

Aceite:

- Argumento comercial fecha lacunas de confiança.
- Sem claims nao validados.
- Bloco de prova nao inventa dados e indica validacao pendente quando necessario.

### Fase 7: FAQ + CTA Final

Entregaveis:

- `FAQ`.
- `FAQItem`.
- `FinalCTA`.

Aceite:

- FAQ sem JS custom.
- CTA final com `id="cta-final"`.
- Microcopy presente.

### Fase 8: QA, SEO e refinamento

Entregaveis:

- Metadata.
- Responsividade revisada.
- Acessibilidade revisada.
- Build validado.

Aceite:

- `npm run lint` passa, se configurado.
- `npm run build` passa.
- Nenhum texto estoura container.
- Contraste e foco visivel revisados.

## 13.1 QA Visual Obrigatorio

Antes de considerar a landing pronta para revisao visual:

- [ ] Hero usa tipografia gigante com classe equivalente a `vm-display`.
- [ ] Hero usa tratamento `strike` em `Mais marketing`.
- [ ] Chevron ciano aparece no canto direito do hero sem competir com o texto.
- [ ] CTA primario do hero usa `pill={true}`.
- [ ] Eyebrow usa marcador quadrado ciano, nao bullet redondo.
- [ ] `DiagnosticFlow` aparece no metodo, nao como dashboard dominante no hero.
- [ ] Existe apenas uma secao dark alem do footer: IA humanizada e atendimento.
- [ ] Ciano nao preenche fundo grande.
- [ ] Nao ha roxo/rosa como paleta estrutural.
- [ ] Nao ha 3D decorativo, neon de borda ou glassmorphism em fundo claro.
- [ ] FAQ usa `<details>` nativo.
- [ ] Mobile reduz ou esconde o chevron se ele quebrar layout.
- [ ] Container nao passa de `1240px`.
- [ ] Wordmark usa `variant` em bold e `midia` em extralight, quando renderizado em texto.
- [ ] Logo e SVG inline ou asset oficial exportado, sem PNG improvisado.
- [ ] Nenhum claim sem prova aparece na pagina.

## 14. Guardrails

### Nao fazer

- Nao transformar a landing em dashboard SaaS.
- Nao usar Palantir como tom dominante.
- Nao usar `forense` como linguagem publica.
- Nao exagerar em paineis escuros.
- Nao exagerar em 3D, neon, blur ou glassmorphism.
- Nao fazer a IA parecer produto principal.
- Nao usar balanca, martelo, brasao ou simbolos juridicos classicos.
- Nao publicar `ROI em 45 dias` ou `mais de 300 escritorios atendidos` sem prova validada.
- Nao criar formulario fake.

### Fazer

- Priorizar clareza.
- Usar grid e cards com funcao narrativa.
- Manter ciano como assinatura, nao como fundo.
- Fazer o metodo aparecer cedo.
- Usar copy oficial.
- Centralizar conteudo.
- Construir por secoes revisaveis.

## 15. Metricas de Sucesso

### Para a primeira entrega

- A pagina comunica o posicionamento em ate 5 segundos.
- O metodo `Oferta -> Demanda -> Conversao` fica claro sem explicacao externa.
- O CTA principal aparece no hero e no final.
- A pagina nao parece agencia generica, SaaS ou infoproduto.
- A pagina funciona bem no mobile.
- O design system foi respeitado.

### Futuras metricas de negocio

Estas dependem de analytics futuro e nao entram na primeira implementacao:

- clique no CTA principal
- clique no CTA secundario
- envio de formulario/agendamento
- scroll ate metodo
- scroll ate CTA final
- conversao por origem de trafego

## 16. Riscos

### Risco 1: Visual inflar demais

Mitigacao:

Usar `docs/DESIGN-SYSTEM.md` como limite. D4 claro domina. D3 escuro apenas em IA e footer.

### Risco 2: Copy voltar para linguagem enterprise

Mitigacao:

Usar `lib/content.ts` com a copy oficial e revisar contra os guardrails.

### Risco 3: Claims sem prova

Mitigacao:

Manter claims fortes fora da primeira versao. Bloco de prova deve aceitar placeholder.

### Risco 4: Comecar pelas secoes antes da fundacao

Mitigacao:

Executar Fase 0 e Fase 1 antes de qualquer secao visual.

## 17. Perguntas Em Aberto

Estas perguntas nao bloqueiam a primeira implementacao, mas precisam ser resolvidas antes da publicacao final:

- Qual sera a URL real do CTA `Agendar diagnostico`?
- A grafia publica final sera `Variant Media`, `Variantmidia` ou wordmark misto?
- Havera prova real para o bloco de cases/depoimentos?
- O logo oficial sera exportado do Figma ou a recriacao SVG do design system sera usada no MVP?
- Havera formulario, WhatsApp, Calendly ou rota interna para diagnostico?

## 18. Definition of Done

A landing sera considerada pronta para primeira revisao quando:

- App Next/Tailwind estiver rodando.
- Todas as secoes estiverem implementadas na ordem do PRD.
- Copy estiver centralizada e fiel aos documentos.
- Design system estiver aplicado.
- Mobile e desktop estiverem revisados.
- Build estiver passando.
- A pagina nao tiver claims nao validados.
- O CTA estiver centralizado e facil de trocar.
