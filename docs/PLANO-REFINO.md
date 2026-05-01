# Plano de Refino · Variant Media Landing

**Versão:** 1.0
**Data:** 2026-04-30
**Contexto:** primeira versão da landing implementada pelo Codex está com hero forte mas ritmo perdido nas demais seções
**Estratégia:** refatorar cada seção com layout próprio, signature visual coerente, motion médio (reveals + microinterações)
**Execução:** cada seção tem um prompt cirúrgico pronto para o Codex

---

## 0. Como usar este documento

Você executa **uma seção por vez**. Cada seção tem:

- **Diagnóstico** — o que está errado hoje
- **Aposta visual** — qual é a virada de cada seção
- **Layout** — composição em texto + diagrama ASCII
- **Motion** — entradas e microinterações específicas
- **Componentes novos** — o que precisa criar fora do design system
- **Prompt para o Codex** — bloco pronto para colar

**Ordem de execução recomendada:**

1. Estabelecer signatures globais (seção 1 deste doc — primeiro de tudo)
2. Operação Comercial (pior da página, alto impacto)
3. Diferenciais (segundo pior, alto impacto)
4. Credibilidade
5. Dor / Gargalos
6. Método (refinos pontuais)
7. Tecnologia / IA (refinos pontuais)
8. Objeções
9. FAQ
10. CTA Final + Footer

---

## 1. Signatures globais — fio condutor da página

Antes de mexer em qualquer seção, é preciso instalar **quatro elementos signature** que vão se rearranjar pela página inteira. Cada seção daqui pra frente usa 2 ou 3 deles, nunca todos.

### Signature A — Régua editorial de seção

Toda seção a partir de "Credibilidade" abre com uma régua horizontal que tem o número da seção, label mono e (opcional) progresso.

```
01 / 11   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   CREDIBILIDADE
                                                  Antes da prescrição
```

Não é decoração — é **paginação editorial**. Faz a página inteira parecer publicação numerada, ecoa o "Vol. 01 · 2026" da direção D2 que vimos nos protótipos.

### Signature B — Tipografia escultural

Headlines de seção usam o mesmo vocabulário do hero, em escala menor:

- Inter 600/700 com tracking negativo agressivo (-0.025em a -0.035em)
- Quebras manuais com `<br/>` em palavras-chave
- **Pelo menos uma palavra** em italic Fraunces (acento)
- **Pelo menos uma seção** com strike ciano (eco do hero)

Sem isso, headlines viram cabeçalho de SaaS.

### Signature C — Modular pontual (Painel)

`DiagnosticFlow` (Método) e `TechPanel` (IA) são os dois únicos painéis "live" da página. **Não criar painel novo em outras seções.** Mas o vocabulário visual deles (numeração mono, status colorido, barra de progresso, "ao vivo" pulse) pode aparecer em **micro-doses** em outras seções.

### Signature D — Chevron como leitmotiv

O chevron do hero não pode aparecer só uma vez. Ele precisa **reaparecer** em pelo menos 2 outras seções, mas em escalas e posições diferentes:

- Hero: 720px, à direita, opacidade 90%
- CTA Final: 480px, atrás do título, opacidade 30%
- Footer: 200px, no canto inferior direito, opacidade 15%
- Eventual seção 3: 320px, recortada na borda esquerda, opacidade 20%

Isso amarra a página visualmente sem custo de implementação.

### Implementação das signatures (componente reutilizável)

```tsx
// components/landing/SectionRule.tsx
import { MonoLabel } from "./MonoLabel";

export function SectionRule({
  index,        // "02"
  total,        // "11"
  label,        // "CREDIBILIDADE"
  caption,      // "Antes da prescrição" — opcional
}: {
  index: string;
  total: string;
  label: string;
  caption?: string;
}) {
  return (
    <div className="mb-12 lg:mb-16">
      <div className="flex items-center gap-6 border-b border-vm-ink pb-3">
        <MonoLabel className="text-vm-ink font-semibold">
          {index} <span className="text-vm-muted-2 font-normal">/ {total}</span>
        </MonoLabel>
        <span className="h-px flex-1 bg-vm-ink/20" aria-hidden />
        <MonoLabel className="text-vm-ink font-semibold">{label}</MonoLabel>
        {caption && (
          <>
            <span className="h-3 w-px bg-vm-line hidden sm:block" aria-hidden />
            <MonoLabel className="hidden sm:inline">{caption}</MonoLabel>
          </>
        )}
      </div>
    </div>
  );
}
```

E o chevron já existente vira `<Chevron>` com props de tamanho e posição:

```tsx
// components/landing/Chevron.tsx — atualizado
export function Chevron({
  size = "lg",            // sm | md | lg | xl
  position = "right",     // right | left | center | bottom-right
  opacity = 0.9,
  className,
}: {
  size?: "sm" | "md" | "lg" | "xl";
  position?: "right" | "left" | "center" | "bottom-right";
  opacity?: number;
  className?: string;
}) {
  // ... mantém o SVG, só adiciona positioning
}
```

---

### PROMPT 01 — Codex: Signatures globais

```
Tarefa: instalar dois componentes que vão amarrar a landing visualmente.

1. Crie `components/landing/SectionRule.tsx` com a interface:
   - props: index (string), total (string), label (string), caption (string opcional)
   - render: linha horizontal com border-bottom em var(--vm-ink),
     padding-bottom 12px, margin-bottom clamp(48px, 6vw, 64px)
   - layout: flex items-center gap-24px
     - esquerda: index em mono 11px com "/ total" em muted
     - meio: linha h-px flex-1 background var(--vm-ink) com opacity 0.2
     - direita: label em mono 11px uppercase tracking 0.14em, peso 600
     - opcional caption: separador vertical 1px h-3 + mono label
   - mobile: caption esconde, separador esconde

2. Refatore `components/landing/Chevron.tsx` para aceitar:
   - size: "sm" (240px) | "md" (380px) | "lg" (560px) | "xl" (720px)
   - position: "right" | "left" | "center" | "bottom-right"
   - opacity: number entre 0 e 1, default 0.9
   - mantenha o gradient ciano e os strokes existentes

3. Use o SectionRule no início de TODAS as seções (exceto Hero) com numeração 01-11.

NÃO altere o Hero. NÃO altere outras seções ainda. Apenas crie/refatore esses dois
componentes e adicione SectionRule no topo de cada seção existente substituindo
o Eyebrow atual.

Resultado esperado: cada seção ganha uma régua editorial que numera a página
inteira. Visualmente fica mais coeso, parece publicação.
```

---

## 2. Operação Comercial — refatoração total

### Diagnóstico

Hoje: 5 cards iguais em fileira, alturas idênticas, index ciano discreto, zero hierarquia. **O layout mais batido possível.** Lê-se em 3 segundos e some da memória.

### Aposta visual

Bento grid assimétrico com **um benefício hero** (o primeiro, "Mais previsibilidade") ocupando 2 colunas em altura e largura, e os outros 4 organizados ao redor em tamanhos diferentes. Quebra a expectativa de grid uniforme, dá relevância à mensagem principal. Inspiração: layout de revista, não dashboard.

Adicional: cada card tem um **glyph minimalista** desenhado em SVG (não ícone genérico) que ilustra o benefício. 5 glyphs únicos, traço fino ciano, 64px.

### Layout (ASCII)

```
┌─────────────────────────────────┬──────────────────┐
│                                 │                  │
│  01                             │  02              │
│                                 │                  │
│  Mais previsibilidade           │  Mais            │
│  ━━━━━━━━━━━━━━━                │  qualificação    │
│                                 │                  │
│  Você para de começar todo      │  Chega menos     │
│  mês do zero.                   │  curioso e mais  │
│                                 │  oportunidade    │
│                                 │  real.           │
│                                 │                  │
│  [glyph hero · 96px]            │  [glyph · 48px]  │
│                                 │                  │
├─────────────────────┬───────────┴──────────────────┤
│                     │                              │
│  03                 │  04                          │
│  Mais velocidade    │  Mais controle               │
│  ━━━━━━━━━━━━       │  ━━━━━━━━━━                  │
│                     │                              │
│  O lead recebe      │  Fica mais claro o que       │
│  resposta no...     │  está funcionando...         │
│                     │                              │
│  [glyph · 48px]     │  [glyph · 48px]              │
│                     │                              │
└─────────────────────┴──────────────────────────────┤
                                                    │
                                          05        │
                                          Mais      │
                                          escala    │
                                          ━━━━      │
                                                    │
                                          Crescimento
                                          deixa de
                                          depender...
                                                    │
                                          [glyph]   │
                                                    ┘
```

(Em mobile vira stack vertical, mas em desktop é bento.)

### Motion

- **Entrada:** ao entrar no viewport, os 5 blocos aparecem com stagger de 80ms, fade-up + scale de 0.96 → 1. Use Intersection Observer + CSS transition (sem Framer).
- **Hover por card:**
  - O glyph anima (rotação leve de 6° + escala 1.05) em 300ms ease-out
  - Borda do card vira ciano
  - Linha sublinhando o título (`━━━`) cresce horizontalmente (transform: scaleX 0 → 1) ancorada à esquerda

### Componentes novos

- `components/landing/BenefitBento.tsx` — wrapper do grid bento
- `components/landing/BenefitTile.tsx` — tile individual com prop `featured` (booleano)
- `components/landing/glyphs/` — 5 SVGs:
  - `GlyphPredictability.tsx` (calendário/onda → estabilidade)
  - `GlyphQualification.tsx` (filtro/peneira)
  - `GlyphSpeed.tsx` (vetor/seta de velocidade)
  - `GlyphControl.tsx` (alvo/mira)
  - `GlyphScale.tsx` (degraus/escada)

### PROMPT 02 — Codex: Operação Comercial

```
Tarefa: refatorar a seção "Operação Comercial" (atual `<Operation />`).

CONTEXTO: hoje ela é 5 cards iguais em fileira. Vou trocar por bento grid
assimétrico com 1 card hero (2x2) + 4 cards menores, cada um com glyph SVG
único de 48-96px desenhado em traço fino ciano.

1. Crie `components/landing/glyphs/`:
   - GlyphPredictability.tsx — onda/calendário sugerindo estabilidade
   - GlyphQualification.tsx — filtro/peneira
   - GlyphSpeed.tsx — seta direcional com rastro
   - GlyphControl.tsx — alvo concêntrico
   - GlyphScale.tsx — escada/degraus
   Todos:
   - viewBox 0 0 64 64
   - stroke #16D4E8 stroke-width 1.5
   - fill none
   - props: size (number, default 48), className (string opcional)
   - Sem ícones genéricos do lucide. Desenhe cada um manualmente com path/line/circle.
   - Inspiração: estilo de glyphs do Stripe Press ou Linear, traço fino, geométrico,
     sem preenchimento.

2. Crie `components/landing/BenefitTile.tsx`:
   - props: index (string), title (string), body (string), Glyph (componente),
     featured (boolean), className (string opcional)
   - Layout interno:
     - mono index "01" alinhado top-left
     - h3 title
     - underline (div h-px w-12 bg-vm-cyan-deep com transform: scaleX(0) origem
       transform-origin: left, transition 400ms ease-vm-out)
     - body text-[15px] leading-[1.55] muted
     - Glyph posicionado bottom-right, size 96 se featured else 48
   - Hover (no .group):
     - border-vm-cyan/50
     - underline scale para scaleX(1)
     - glyph animado: transform rotate(6deg) scale(1.05) com transition 300ms

3. Refatore `Operation.tsx`:
   - Remova o card grid atual
   - Implemente bento grid:
     - Desktop (lg:): grid-cols-3 grid-rows-3 com gap-3
       - Tile 1 (Mais previsibilidade): col-span-2 row-span-2 → featured=true
       - Tile 2 (Mais qualificação): col-span-1 row-span-2
       - Tile 3 (Mais velocidade): col-span-1 row-span-1
       - Tile 4 (Mais controle): col-span-1 row-span-1
       - Tile 5 (Mais escala): col-span-1 row-span-1
     - Mobile: grid-cols-1, todos tiles em coluna, featured não muda layout
   - Use `<SectionRule index="05" total="11" label="OPERAÇÃO" caption="O que muda no escritório" />`
   - Headline acima do bento usando classe vm-h2, com palavra "clareza" em italic Fraunces
   - Subhead em vm-lead

4. Adicione motion:
   - Use IntersectionObserver via `useInView` custom hook
   - Cada tile tem inline style com `--delay: ${index * 80}ms`
   - Classe `data-reveal` no tile, com CSS:
     opacity 0, transform: translateY(12px) scale(0.96)
     quando .in-view: opacity 1, transform: none, transition 500ms ease-vm-out var(--delay)
   - Respeitar prefers-reduced-motion

5. Não toque em outras seções. Não altere o design system.
   Crie no máximo 1 novo hook (`useInView`) em `lib/hooks/useInView.ts`.

Use a copy oficial de `lib/content.ts` (operation.benefits).
```

---

## 3. Diferenciais — refatoração total

### Diagnóstico

Hoje: tabela de 6 linhas. Lista de specs. Lê-se como página de produto SaaS, não como manifesto. Zero personalidade.

### Aposta visual

**Manifesto editorial em duas colunas alternadas.** Cada diferencial é uma "página" da seção, com numeração `01.` `02.` em mono enorme, título grande à esquerda, descrição à direita — mas alternando o lado a cada item. Cria ritmo de leitura tipo livro.

Adicional: a numeração `01.` é gigante (clamp 60-120px), em Fraunces Light italic, em ciano deep. Vira o protagonista visual da seção.

Adicional: linha vertical fina ciano que conecta os 6 diferenciais como um trilho central.

### Layout

```
                                        │
   01.            Especialização         │
                  jurídica               │   A estratégia parte da
                                         │   realidade de escritórios...
                                         │
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┼━━━━━━━━━━━━━━━━━━━━━━━━━━
                                         │
   Não empurramos serviço.                02.            Diagnóstico
   Primeiro entendemos                   │              antes de
   onde está o problema.                 │              executar
                                         │
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┼━━━━━━━━━━━━━━━━━━━━━━━━━━
                                         │
   03.            Visão de               │   Não olhamos só para
                  ponta a ponta          │   anúncios ou para...
                                         │
   ...                                   │   ...
```

Em mobile vira coluna única, alternância só visível em desktop.

### Motion

- **Entrada por scroll:** cada bloco aparece sequencialmente. A linha vertical central **se desenha verticalmente** conforme o usuário rola (scrollProgress controla `clipPath` ou `height` da linha).
- O número `01.` aparece com fade + slide horizontal de 20px (vem do lado oposto da próxima seção, criando movimento entre dobras).
- Hover no diferencial: o número fica mais escuro (cyan → cyan-deep) e ganha leve text-shadow ciano.

### PROMPT 03 — Codex: Diferenciais

```
Tarefa: refatorar a seção "Diferenciais" (atual `<Differentials />`).

CONTEXTO: hoje é tabela com 6 linhas. Vou trocar por manifesto editorial em
duas colunas alternadas, com número gigante em italic Fraunces como protagonista
e linha central vertical ciano que conecta os 6 itens.

1. Crie `components/landing/DifferentialEntry.tsx`:
   - props: index (string "01" a "06"), title (string), body (string),
     side ("left" | "right")
   - Desktop (lg+): grid-cols-2 gap-16
     - Se side="left": número+título à esquerda, body à direita
     - Se side="right": body à esquerda, número+título à direita
   - Mobile: grid-cols-1, sempre número+título primeiro, depois body
   - Número: font-serif (Fraunces), italic, weight 300,
     fontSize clamp(60px, 9vw, 120px), letter-spacing -0.04em,
     color var(--vm-cyan-deep), line-height 0.9
   - Título: vm-h2 abaixo do número
   - Body: vm-lead, max-width 40ch
   - Padding vertical: clamp(48px, 7vw, 96px) — gera ritmo de respiração
   - Não usar border-top/bottom — a linha central faz o trabalho

2. Refatore `Differentials.tsx`:
   - SectionRule index="07" total="11" label="DIFERENCIAIS" caption="Por que nos diferenciamos"
   - Headline: "Por que isso é diferente de contratar uma <em>agência genérica</em>."
     usando vm-h2, "agência genérica" em italic Fraunces
   - Subhead vm-lead
   - Container relativo com:
     - Linha vertical absoluta center (left: 50%, transform: translateX(-50%))
     - top: 0, bottom: 0
     - width: 1px, background: linear-gradient(180deg, transparent 0%,
       var(--vm-cyan) 8%, var(--vm-cyan) 92%, transparent 100%)
     - escondida em mobile (lg:block)
     - data-attribute para motion (clip-path animado no scroll, ver passo 4)
   - Lista de 6 DifferentialEntry alternando side:
     01: left, 02: right, 03: left, 04: right, 05: left, 06: right

3. Use copy oficial de `lib/content.ts` (differentials.items).

4. Motion:
   - Linha vertical central tem `--scroll-progress: 0` inicialmente
   - useScrollProgress hook (criar em lib/hooks/useScrollProgress.ts) que mede
     scroll relativo ao container da seção (0 = topo entra na tela,
     1 = fundo sai da tela)
   - clip-path: inset(0 0 calc((1 - var(--scroll-progress)) * 100%) 0)
     → linha "se desenha" de cima pra baixo conforme scroll
   - Cada DifferentialEntry tem reveal individual:
     - opacity 0, translateX(-20px) se side="left", translateX(20px) se "right"
     - quando in-view: opacity 1, translateX(0), transition 600ms ease-vm-out
   - Hover no entry: número muda de cyan-deep para cyan, ganha
     filter: drop-shadow(0 0 12px rgba(22,212,232,0.4))
     transition 250ms

5. NÃO altere outras seções nem o design system.

Resultado: a seção vira o "manifesto" da landing. Cada diferencial é uma
página do livro, com número gigante italic puxando a leitura.
```

---

## 4. Credibilidade Inicial — refatoração

### Diagnóstico

Hoje: headline gigante mata a sequência do hero (não pode ter dois H1s do mesmo peso). Texto lateral solto. 3 cards genéricos.

### Aposta visual

**Layout assimétrico com proof citáveis em forma de cards-quote.** Headline reduzida (vm-h2, não tão grande quanto o hero), à esquerda. Texto introdutório à direita, em coluna estreita. Os 3 "pilares" viram **cards verticais com mini-aspas Fraunces**, cada um com um detalhe diferente: barra ciano vertical, número discreto, ícone-glyph de uma palavra-chave (ex.: "Diagnóstico" → glyph estetoscópio abstrato).

Resultado: a seção parece "primeira página depois da capa" de uma publicação, não bloco de cards de produto.

### Layout

```
01 / 11 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ CREDIBILIDADE · Antes da prescrição

┌──────────────────────────────────┬────────────────────────────────────┐
│                                  │                                    │
│  Não vendemos                    │  Muitos escritórios não            │
│  marketing por pacote.           │  têm falta de ação. Têm            │
│                                  │  demanda ruim, atendimento         │
│  Primeiro entendemos             │  lento, processo comercial         │
│  o que está impedindo            │  informal e pouca clareza          │
│  seu escritório                  │  sobre o que realmente             │
│  de crescer.                     │  gera receita.                     │
│                                  │                                    │
└──────────────────────────────────┴────────────────────────────────────┘

┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│ │            │  │ │            │  │ │            │
│ │  ↳ Princípio│ │ │  ↳ Princípio│ │ │  ↳ Princípio│
│ │            │  │ │            │  │ │            │
│ │  Diagnóstico│ │ │  Especializ.│ │ │  Faturamento│
│ │  antes da   │ │ │  em         │ │ │             │
│ │  prescrição │ │ │  advocacia  │ │ │             │
│ │            │  │ │            │  │ │            │
│ │  Antes de   │ │ │  Entendemos │ │ │  Nossa      │
│ │  propor...  │ │ │  as restr...│ │ │  conversa...│
│ │            │  │ │            │  │ │            │
│ │  [glyph]   │  │ │  [glyph]   │  │ │  [glyph]   │
└──────────────┘  └──────────────┘  └──────────────┘
```

A barra `│` à esquerda dos cards é ciano vertical, marca eles como "princípios", não cards de feature.

### Motion

- Headline vem com fade + slide-up sutil (12px) em 500ms.
- Texto lateral aparece 200ms depois.
- Cards entram com stagger 120ms, mas em vez de fade-up, **escalam** de 0.94 → 1 vindos de cima (origin: top center).
- Hover no card: barra ciano vertical cresce em altura (de 60% pra 100%) em 300ms.

### Componentes novos

- `components/landing/PrincipleCard.tsx` (substitui `<Card>` para esta seção apenas)

### PROMPT 04 — Codex: Credibilidade Inicial

```
Tarefa: refatorar `<Credibility />`.

CONTEXTO: hoje é headline gigantesca + 3 cards genéricos. Quero virar
"primeira página depois da capa": headline em vm-h2 (não vm-display),
duas colunas balanceadas, e 3 PrincipleCard com barra vertical ciano à
esquerda + label "↳ Princípio" + glyph.

1. Crie `components/landing/PrincipleCard.tsx`:
   - props: label (string default "Princípio"), title (string), body (string), Glyph (componente)
   - Layout interno:
     - position relative, padding 28px 28px 28px 32px (extra à esquerda
       pra dar espaço pra barra)
     - border 1px var(--vm-line), border-radius 12px
     - background var(--vm-surface)
     - Barra ciano à esquerda: position absolute, left 0, top 16px, bottom 16px
       (60% de altura inicial), width 2px, background var(--vm-cyan)
       transition height 300ms ease-vm-out
     - No hover do card: barra vira top 0, bottom 0 (100% altura)
     - Conteúdo:
       - Label: mono 10.5px tracking 0.14em uppercase color vm-muted-2
         com prefixo "↳ " antes
       - Title: vm-h3 (não usar text-2xl)
       - Body: text-[14.5px] leading-[1.55] muted, max-width 28ch
       - Glyph: position absolute bottom 24px right 24px, size 32px,
         opacity 0.6, color vm-cyan-deep

2. Crie 3 glyphs em `components/landing/glyphs/`:
   - GlyphDiagnostic.tsx — estetoscópio abstrato (linha em curva)
   - GlyphLegal.tsx — coluna grega minimalista OU livro fechado
     (não use balança/martelo, é cliché jurídico)
   - GlyphRevenue.tsx — gráfico de barras ascendente abstrato
   Todos com mesmas regras dos glyphs anteriores: viewBox 0 0 32 32 ou 64 64,
   stroke fino, fill none, color var(--vm-cyan-deep).

3. Refatore `Credibility.tsx`:
   - SectionRule index="02" total="11" label="CREDIBILIDADE" caption="Antes da prescrição"
   - Grid 12 colunas em desktop:
     - Headline (col-span-7): "Não vendemos marketing por pacote.<br/>
       <em>Primeiro entendemos</em> o que está impedindo seu escritório de crescer."
       Use vm-h2. "Primeiro entendemos" em italic Fraunces font-light.
     - Texto (col-span-5, alinhado pelo bottom): vm-lead com a copy de
       credibility.body
   - Mobile: stack vertical, headline full, texto abaixo
   - Espaçamento: gap-16 entre headline-row e cards
   - Cards (3 PrincipleCards) em grid-cols-3 gap-4 desktop, grid-cols-1 mobile

4. Use copy oficial de `lib/content.ts` (credibility).

5. Motion:
   - Headline: fade + translateY(12px) → 0, 500ms, no entrar in-view
   - Texto lateral: mesmo, com delay 200ms
   - Cards: stagger 120ms cada, opacity 0 + scale(0.94) + translateY(-8px)
     com transform-origin: top center → 1
     Use o useInView hook que já criamos no PROMPT 02.

NÃO altere outras seções.
```

---

## 5. Dor / Gargalos — refatoração

### Diagnóstico

Hoje: 4 cards iguais aos da Credibilidade. Repetição visual. Frase de fechamento numa caixa border-left isolada. Não dialoga com o resto.

### Aposta visual

**Lista numerada vertical com peso editorial.** Cada dor é uma "entrada" da lista, com número grande à esquerda e descrição. Mas o twist: cada entry tem um **mini-marker de status** ao lado do título, ecoando o vocabulário do `DiagnosticFlow` da seção Método (visual link entre dor → método). Status: "Recorrente", "Crítico", "Comum", "Sintoma".

A frase de fechamento vira **destaque tipográfico grande** ao final, ocupando full-width, em italic Fraunces — não caixa.

### Layout

```
03 / 11 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ DOR · Onde a receita vaza

   Quando o escritório cresce no improviso,
   a receita fica instável.

   O problema quase nunca é apenas...

   ─────────────────────────────────────────────────────────────────
   01    Dependência de indicação                       [RECORRENTE]
                                                                 
         Se uma ou duas fontes param de indicar, o faturamento
         sente na hora.
   ─────────────────────────────────────────────────────────────────
   02    Lead que chega e se perde                        [CRÍTICO]
                                                                 
         A pessoa entra em contato, espera, esfria e fecha
         com quem respondeu primeiro.
   ─────────────────────────────────────────────────────────────────
   03    Curioso demais, cliente de menos                  [COMUM]
                                                                 
         O escritório perde tempo com quem não tem fit jurídico
         ou não está pronto para contratar.
   ─────────────────────────────────────────────────────────────────
   04    Comercial sem método                          [SINTOMA]
                                                                 
         Cada sócio vende de um jeito, ninguém sabe o que
         funciona e o resultado depende de talento individual.
   ─────────────────────────────────────────────────────────────────


           ─ Enquanto isso não fica visível,                          
             qualquer investimento parece                        
             tentativa e erro.                                
```

### Motion

- Cada linha aparece com stagger 100ms, mas a animação é diferente: a linha horizontal `─────` se desenha primeiro (de left → right, 400ms), depois o conteúdo aparece (fade + translateY 8px, 300ms, com delay 200ms).
- Hover na linha: status badge pulsa levemente (scale 1 → 1.04 → 1, 600ms).
- Frase de fechamento aparece no final, fade-in lento de 800ms, sem translate.

### PROMPT 05 — Codex: Dor / Gargalos

```
Tarefa: refatorar `<Pain />`.

CONTEXTO: hoje 4 cards iguais. Quero virar lista vertical numerada com
status badges (eco do DiagnosticFlow), divisores que se desenham no scroll,
e frase de fechamento como destaque tipográfico (não caixa).

1. Crie `components/landing/PainEntry.tsx`:
   - props: index (string), title (string), body (string),
     status ("RECORRENTE" | "CRÍTICO" | "COMUM" | "SINTOMA")
   - Layout:
     - Posição relative, padding 32px 0
     - Divisor superior: border-top 1px var(--vm-line)
       (desabilitar no primeiro entry com :first-child)
     - Grid: grid-cols-[80px_1fr_auto] em desktop, gap 24px
       Mobile: grid-cols-[48px_1fr] auto-rows, status quebra para baixo
     - Coluna 1 (number): mono 13px font-medium tracking-[0.14em] color vm-muted-2
       padding-top 4px
     - Coluna 2 (content):
       - Title: vm-h3 mb-2
       - Body: text-[15px] leading-[1.55] vm-muted, max-width 60ch
     - Coluna 3 (status badge):
       - mono 10px tracking-[0.14em] uppercase
       - padding 4px 10px
       - border-radius 4px
       - cores por status:
         RECORRENTE: bg vm-warn/10, color vm-warn, border vm-warn/30
         CRÍTICO: bg vm-crit/10, color vm-crit, border vm-crit/30
         COMUM: bg var(--vm-line), color vm-muted, border var(--vm-line)
         SINTOMA: bg vm-cyan-tint, color vm-cyan-deep, border vm-cyan/30

2. Refatore `Pain.tsx`:
   - SectionRule index="03" total="11" label="DOR" caption="Onde a receita vaza"
   - Headline: "Quando o escritório cresce no <em>improviso</em>,
     a receita fica instável." em vm-h2, "improviso" em italic Fraunces
   - Body em vm-lead, max-width 56ch
   - Lista de 4 PainEntry (use copy de pain.cards):
     01 RECORRENTE — Dependência de indicação
     02 CRÍTICO — Lead que chega e se perde
     03 COMUM — Curioso demais, cliente de menos
     04 SINTOMA — Comercial sem método
   - Closing statement (NÃO usar caixa borderleft):
     - mt-16 mb-0
     - max-width 36ch
     - margin auto OU alinhado à direita (escolha right alignment para
       criar tensão)
     - text-[clamp(20px, 2.6vw, 32px)] leading-[1.3] font-light italic
       font-serif (Fraunces)
     - color vm-graphite
     - prefixo "─ " antes do texto (em mono color vm-cyan)

3. Motion:
   - Cada PainEntry: ao entrar in-view
     - Border-top: largura inicial 0, transition width 500ms ease-vm-out
     - Conteúdo: opacity 0 → 1 + translateY 8px → 0, transition 400ms,
       delay 200ms (depois da linha desenhar)
     - Use stagger 100ms entre entries (delay base + index * 100ms)
   - Status badge pulsa no hover: keyframe scale 1 → 1.04 → 1 em 600ms
   - Closing statement: simples fade in 800ms quando in-view

4. Use copy oficial. NÃO altere outras seções.
```

---

## 6. Método — refinos pontuais

### Diagnóstico

A seção que mais funciona hoje (atrás do hero). Mas os 3 nodes da esquerda estão soltos demais — falta amarração visual entre o stepper e o painel da direita.

### Aposta visual

Manter estrutura, mas:

1. Os 3 nodes da esquerda **conectam-se ao painel** por linhas sutis horizontais (linhas tracejadas que saem do node e cruzam o gap até o painel correspondente). Quando você dá hover num node da esquerda, o nó equivalente no painel da direita acende. **Sincronia visual.**
2. Adicionar SectionRule no topo.
3. O painel atual está bom. Não mexer no DiagnosticFlow.

### Motion

- Linhas conectivas tracejadas se desenham no in-view (stroke-dashoffset animation).
- Hover no node esquerdo: linha conectiva fica sólida (não tracejada), node correspondente no painel ganha border ciano + glow sutil.

### PROMPT 06 — Codex: Método (refinos pontuais)

```
Tarefa: refinar `<Method />` com amarração visual entre stepper esquerdo
e painel direito.

CONTEXTO: a seção já funciona. O problema é que os 3 nodes da esquerda e
os 3 do painel da direita são informações duplicadas sem ligação visível.
Quero criar sincronia hover.

1. Adicione SectionRule no topo: index="04" total="11" label="MÉTODO"
   caption="Diagnóstico antes da prescrição"

2. Refatore Method.tsx para usar React state compartilhado:
   - useState<number | null>(null) para activeNode
   - Os MethodNode da esquerda recebem onHover/onLeave que setam activeNode
   - Os nós dentro do DiagnosticFlow respondem a activeNode (precisa
     refatorar DiagnosticFlow para aceitar prop activeIndex opcional)

3. Refatore `DiagnosticFlow.tsx`:
   - Adicionar prop opcional activeIndex (number | null)
   - Quando activeIndex === idx do node, esse node interno ganha:
     - border var(--vm-cyan)
     - box-shadow 0 0 0 4px rgba(22,212,232,0.12)
     - transition 250ms

4. Adicione linhas conectivas SVG entre stepper e painel (apenas em desktop lg+):
   - Container absoluto cobrindo o gap entre as duas colunas
   - 3 paths SVG, cada um conectando o center-right de um MethodNode ao
     center-left do node correspondente no painel
   - Stroke 1px, dashed (stroke-dasharray 4 4)
   - Color var(--vm-line) por padrão
   - Quando activeIndex matches: stroke vira var(--vm-cyan), dasharray vira "0"
     (sólida), transition 300ms
   - No mount, paths se desenham com stroke-dashoffset animation (de length total para 0)

5. NÃO altere copy. NÃO toque em outras seções.

Detalhe técnico: para posicionar as linhas SVG corretamente, use refs nos
MethodNodes e nos panel nodes, calcule getBoundingClientRect() relativo ao
container, e desenhe as linhas com base nesses rects. Atualize em resize.
```

---

## 7. Tecnologia / IA — refinos pontuais

### Diagnóstico

A lista à esquerda duplica o conteúdo do painel à direita. Informação repetida visualmente.

### Aposta visual

**Substituir a lista de 3 itens por uma narrativa em prosa curta + mini-stats.** O painel à direita continua mostrando "Triagem inicial / Follow-up / Resumo e contexto" como funções operacionais. À esquerda, em vez de listar as mesmas funções, mostra **3 mini-stats sob a copy** que pareçam vindas de um relatório pós-implementação:

```
↑ 3.2x velocidade média de resposta
↑ 47% leads qualificados
↓ 60% tempo gasto em triagem manual
```

(Sem números reais — é placeholder marcado claramente como "ilustrativo".)

### Motion

- Mini-stats aparecem com counter animation (números crescem de 0 até o valor final em 1.5s usando easeOutQuad).
- Setas ↑↓ aparecem antes do número, com bounce sutil.

### PROMPT 07 — Codex: Tecnologia / IA

```
Tarefa: refinar `<AISection />`.

CONTEXTO: a lista de 3 itens à esquerda duplica o painel à direita.
Quero trocar a lista por 3 mini-stats animadas (counter) com label
"ilustrativo".

1. Adicione SectionRule no topo: index="06" total="11" label="TECNOLOGIA"
   caption="Apoio operacional, sem virar protagonista"

2. Em AISection.tsx, na coluna esquerda:
   - Mantenha eyebrow, h2 e o primeiro parágrafo (body)
   - REMOVA a lista atual de 3 itens (Triagem inicial / Follow-up / Resumo)
   - ADICIONE depois do parágrafo:
     - Divisor: h-px w-12 bg-vm-cyan, mt-8 mb-6
     - 3 mini-stats em coluna (gap 16px):
       - Stat 1: ↑ 3.2x · velocidade média de resposta
       - Stat 2: ↑ 47% · leads qualificados em primeira triagem
       - Stat 3: ↓ 60% · tempo gasto em triagem manual
   - DEPOIS dos stats:
     - text-[12px] mono uppercase tracking-[0.14em] color vm-muted-2 (em escuro: rgba white 0.4)
       Texto: "Indicadores ilustrativos · não são dados de cliente"
   - Mantenha o "IA humanizada não é efeito especial..." como closing

3. Crie `components/landing/MiniStat.tsx`:
   - props: arrow ("up" | "down"), value (string ex "3.2x" ou "47%"),
     label (string), accent (boolean default true)
   - Layout horizontal: arrow + value (grande, font-mono) + label
   - Arrow: SVG seta diagonal up ou down, color var(--vm-cyan)
     com small bounce on mount
   - Value: font-mono text-[clamp(28px, 4vw, 44px)] font-medium
     color #fff (estamos em seção dark)
     letter-spacing -0.03em
   - Label: text-[14px] color rgba(255,255,255,0.6) leading-[1.4]
   - Container: flex items-baseline gap-3
   - Border-bottom 1px rgba(255,255,255,0.06) com padding-bottom 14px

4. Counter animation:
   - Crie `lib/hooks/useCountUp.ts`:
     - Recebe targetValue (string), duration (ms), trigger (boolean)
     - Parseia número e sufixo (ex "3.2x" → number 3.2, suffix "x")
     - Anima de 0 → number ao trigger=true, easeOutQuad
   - MiniStat usa useInView para trigger=true, anima value
   - Respeitar prefers-reduced-motion (mostra valor final direto)

5. Mantenha o painel direito (TechPanel) inalterado. NÃO altere outras seções.
```

---

## 8. Objeções — refatoração

### Diagnóstico

Hoje: 3 cards iguais. Quotes não estão em italic Fraunces. Bloco "prova validada" parece caixa de erro.

### Aposta visual

**Trocar grid de 3 cards por sequência empilhada vertical**, cada objeção em formato "diálogo": quote em Fraunces italic enorme à esquerda + resposta curta à direita, separados por **avatar circular vazio** com inicial mono (ex: "C." de "Cliente"). Para a resposta, "VM." (Variant Media). Cria sensação de troca, não de FAQ.

O bloco de "prova validada" vira **placeholder honesto e bonito**: caixa fina com borda tracejada ciano, ícone "+" central, microcopy explicando que entram aqui depoimentos validados.

### Layout

```
08 / 11 ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ OBJEÇÕES · Antes de confiar

           Antes de contratar, todo escritório
           precisa confiar em três coisas.

   ┌────┐
   │ C. │   "Já tentei marketing antes 
   └────┘    e não funcionou."
                                                  ┌────┐
                          Faz sentido. Em muitos │ VM.│
                          casos, o problema...    └────┘

   ┌────┐
   │ C. │   "Não sei se isso funciona
   └────┘    para o meu nicho jurídico."
                                                  ┌────┐
                          Não existe estratégia  │ VM.│
                          jurídica de copiar...   └────┘

   ┌────┐
   │ C. │   "Não quero uma IA que pareça
   └────┘    robô para os meus clientes."
                                                  ┌────┐
                          A tecnologia precisa   │ VM.│
                          proteger a experiência.└────┘


   ┌─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┐
   │                                                              │
   │              [+]                                             │
   │              Espaço para depoimentos validados               │
   │              Cases publicados quando tivermos lastro real    │
   │                                                              │
   └─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─┘
```

### PROMPT 08 — Codex: Objeções

```
Tarefa: refatorar `<Objections />`.

CONTEXTO: hoje 3 cards genéricos com quotes em sans (deveriam ser Fraunces
italic). Vou virar troca em formato diálogo: cliente fala (italic Fraunces
gigante), Variant Media responde (sans normal). Avatares minimalistas com
inicial.

1. Crie `components/landing/DialogueExchange.tsx`:
   - props: quote (string), response (string)
   - Layout vertical com dois "balões":
     - Balão 1 (cliente):
       - Avatar 40x40 redondo, border 1px var(--vm-line),
         font-mono 11px font-medium, color vm-muted-2,
         text "C."
       - Quote ao lado direito: font-serif (Fraunces) italic
         font-light, fontSize clamp(20px, 2.4vw, 30px),
         line-height 1.3, color var(--vm-ink),
         max-width 32ch
       - alignment: items-start, gap 20px
       - margin-bottom 24px
     - Balão 2 (resposta VM):
       - Empurra para a direita: margin-left auto, max-width 65%
       - Avatar 40x40 redondo (à direita): font-mono "VM."
         color vm-cyan-deep, border var(--vm-cyan-deep)
       - Response à esquerda do avatar: text-[15px] leading-[1.55]
         color vm-graphite, max-width 36ch
       - flex-direction: row-reverse, gap 20px
   - Padding: py-12 (48px), border-bottom 1px var(--vm-line)
     (último item sem border)

2. Refatore Objections.tsx:
   - SectionRule index="08" total="11" label="OBJEÇÕES" caption="Antes de confiar"
   - Headline em vm-h2 com "três coisas" em italic Fraunces
   - Container max-width 880px, mx-auto
   - 3 DialogueExchange com copy oficial

3. Crie `components/landing/ProofPlaceholder.tsx`:
   - Container border 1px dashed var(--vm-cyan), border-radius 16px,
     padding clamp(48px, 6vw, 80px), margin-top 64px
   - background: subtle gradient ou nada
   - Conteúdo centralizado:
     - Ícone "+" 40x40 (SVG plus em ciano, stroke-width 1.5)
     - Mt 16: heading "Espaço reservado para depoimentos validados"
       font-medium text-[18px] color var(--vm-ink)
     - Mt 8: text-[14px] color vm-muted, max-width 48ch, mx-auto
       "Cases reais e feedbacks de clientes entram aqui apenas quando
       houver lastro confirmado. Sem inflar números."
   - Ao final do Objections.tsx, depois das 3 dialogues, renderizar
     <ProofPlaceholder />

4. Motion:
   - Cada DialogueExchange: stagger 150ms
     - Balão 1: opacity 0 + translateX(-12px) → 0, 500ms
     - Balão 2: opacity 0 + translateX(12px) → 0, 500ms, delay 200ms
       (depois do balão 1)
   - Avatares têm pequeno bounce no mount (scale 0.8 → 1.05 → 1, 400ms)

5. NÃO altere outras seções.
```

---

## 9. FAQ — refinos

### Diagnóstico

Layout funcional mas sem signature visual. Plus icon padrão. Sem motion notável.

### Aposta visual

Manter `<details>` nativo. Adicionar:

1. Hover na pergunta: pre-fade na resposta (mostra primeiras palavras com opacity 0.3 antes mesmo de abrir).
2. Plus icon vira **glyph signature**: + em ciano deep, com background-circle ciano-tint que escala no hover.
3. Quando aberto: linha lateral ciano vertical aparece à esquerda da resposta (3px de width, height 100% da resposta).

### PROMPT 09 — Codex: FAQ

```
Tarefa: polimento da seção FAQ.

1. Adicione SectionRule no topo: index="09" total="11" label="FAQ"
   caption="Perguntas frequentes"

2. Refatore `FAQItem.tsx`:
   - Mantenha <details>/<summary> base
   - Toggle button:
     - Tamanho 36px, border-radius full
     - background var(--vm-cyan-tint) (NÃO border)
     - Quando hover do <summary>: scale 1.1, transition 250ms
     - Quando details[open]: rotate 45deg, background var(--vm-cyan),
       o ícone "+" vira branco
     - Ícone "+" em SVG, stroke-width 1.6, color vm-cyan-deep (default),
       virando white quando aberto
   - Quando aberto:
     - .answer ganha border-left 3px solid var(--vm-cyan)
     - .answer ganha padding-left 24px
     - .answer aparece com slide-down (max-height 0 → height auto via grid trick
       OU usar transition em max-height com valor estimado generoso ex 800px)
     - transition 350ms ease-vm-out
   - Hover no <summary> (mas não aberto):
     - Toggle scale 1.1 (já feito)
     - h3 ganha color vm-ink-2 (ligeiramente mais escuro)
     - Adicione um "..." em mono cyan abaixo da pergunta com opacity 0 → 0.5
       (pré-visualização sutil de que tem conteúdo)

3. Layout da seção:
   - Mantenha duas colunas em desktop (headline esquerda, lista direita)
   - Headline em vm-h2 grande, "Perguntas <em>frequentes</em>" com
     italic em "frequentes"

4. Use copy oficial.
```

---

## 10. CTA Final + Footer

### Diagnóstico

CTA funcional mas pobre visualmente. Footer raso, sem estrutura, sem as signatures da página.

### Aposta visual CTA

- Adicionar **chevron decorativo** atrás do título (eco do hero, em escala menor, opacidade 30%).
- O título "O próximo passo não é aumentar o ruído. É diagnosticar o **gargalo certo**." ganha "gargalo certo" em italic Fraunces ciano-deep — eco direto do hero.
- CTA principal cyan (a única ocorrência da variante `cyan` da página, conforme design system permitia).
- Background sutilmente diferente (`bg-vm-bg-alt`) para destacar.

### Aposta visual Footer

- Estrutura em 4 colunas: brand (col-span-2), navegação, contato, legal.
- Adicionar **chevron** mini no canto inferior direito (200px, opacity 15%).
- Brand row tem versão **ampliada** da logo (h-10), wordmark em peso normal.
- Microscopy "Conversa objetiva. Sem pacote empurrado. Sem promessa fácil." aparece no rodapé como manifesto.

### PROMPT 10 — Codex: CTA Final + Footer

```
Tarefa: refinar `<FinalCTA />` e `<Footer />`.

== FINAL CTA ==

1. SectionRule index="11" total="11" label="PRÓXIMO PASSO" caption="Diagnóstico antes da estratégia"
2. Section variant="alt" (frio) para destacar do footer dark
3. Container relative com Chevron decorativo atrás:
   <Chevron size="md" position="center" opacity={0.18} />
   posicionado absolute, behind content (z-index 0), centered
4. Conteúdo z-index 1, text-align center:
   - Headline vm-h2: "O próximo passo não é aumentar o ruído.<br/>
     É diagnosticar o <em>gargalo certo</em>."
     "gargalo certo" em italic Fraunces, color var(--vm-cyan-deep)
   - Subhead vm-lead, mx-auto, max-width 56ch, mt-6
   - CTA stack mt-12, gap-3, justify-center:
     - Button variant="cyan" pill withArrow → "Agendar diagnóstico"
       (ÚNICA ocorrência de cyan variant em CTA na página)
     - Button variant="ghost" pill → "Falar com a equipe"
   - Microcopy mt-8 text-[13.5px] color vm-muted: "Conversa objetiva.
     Sem pacote empurrado. Sem promessa fácil."

5. Motion:
   - Chevron entra com escala 0.9 → 1 + opacity 0 → 0.18 em 800ms quando in-view
   - Headline + subhead + CTAs com stagger 100ms

== FOOTER ==

1. Refatore Footer.tsx:
   - bg-vm-panel, color vm-panel-text
   - Container max-w-[1240px]
   - Padding pt-20 pb-10
   - Grid 12 cols desktop, 1 col mobile, gap-12

   Coluna 1 (col-span-5):
   - BrandMark variant="white" h-10 w-10
   - Wordmark à direita, font-size 22px
   - Mt-6: parágrafo manifesto: "Conversa objetiva.<br/>
     Sem pacote empurrado.<br/>Sem promessa fácil."
     Em italic Fraunces, font-light, fontSize 22px, line-height 1.4,
     color rgba white 0.85, max-width 28ch

   Coluna 2 (col-span-2): "Navegação"
   - Heading mono uppercase tracking-0.14em color rgba white 0.5 mb-4
   - Lista vertical: Método / Diagnóstico / Tecnologia / Diferenciais / FAQ
   - Cada link: text-sm color rgba white 0.7, hover white,
     transition 200ms, padding-y 4px

   Coluna 3 (col-span-2): "Contato"
   - Heading mesma classe
   - Email (placeholder), WhatsApp (placeholder), Instagram

   Coluna 4 (col-span-3): "Aviso"
   - Heading
   - Texto small color rgba white 0.5: "Variant Media é especializada
     em performance jurídica para escritórios de advocacia.
     Não realizamos captação irregular conforme regulamentação OAB."

2. Bottom row:
   - Border-top 1px rgba white 0.08
   - Mt-12 pt-6
   - Flex justify-between flex-wrap gap-4
   - Esquerda: copyright "© 2026 Variant Media · Todos os direitos reservados"
   - Direita: "Desenvolvido com diagnóstico, não com pacote." (mono small, opacity 0.5)

3. Chevron decorativo:
   <Chevron size="sm" position="bottom-right" opacity={0.12} />
   posicionado absolute pointer-events-none right-0 bottom-0,
   recortando para fora do container (overflow hidden no Footer)

4. NÃO altere outras seções.
```

---

## 11. Checklist final pós-refino

Depois que todos os 10 prompts forem executados, validar visualmente:

- [ ] SectionRule aparece em todas as seções (exceto Hero), numerada 01-11
- [ ] Pelo menos 4 seções têm uma palavra-chave em italic Fraunces
- [ ] Pelo menos 3 seções têm strike OU underline ciano
- [ ] Chevron aparece em 3+ seções com tamanhos e posições diferentes
- [ ] Cada seção tem layout próprio (nenhum grid de 3 cards repetido)
- [ ] Operação é bento, não fileira
- [ ] Diferenciais é manifesto editorial, não tabela
- [ ] Dor tem badges de status (eco do DiagnosticFlow)
- [ ] Método tem linhas conectivas entre stepper e painel
- [ ] AI tem mini-stats com counter, não lista duplicada
- [ ] Objeções é diálogo, não cards
- [ ] FAQ tem signature plus icon ciano
- [ ] CTA final tem chevron + cyan button (única ocorrência)
- [ ] Footer tem manifesto em italic + chevron decorativo
- [ ] Motion: cada seção tem reveal coreografado, não fade-up genérico
- [ ] Mobile continua legível (chevrons reduzem opacidade ou somem)
- [ ] `prefers-reduced-motion` zera animações de counter, scroll-progress, e reveals

---

## 12. Ordem de execução sugerida (resumo executivo)

| # | Prompt | Tempo estimado | Impacto |
|---|---|---|---|
| 1 | Signatures globais (SectionRule, Chevron props) | 20 min | Alto · base para tudo |
| 2 | Operação Comercial → bento + glyphs | 60 min | Altíssimo · pior seção hoje |
| 3 | Diferenciais → manifesto | 60 min | Altíssimo · pior seção hoje |
| 4 | Credibilidade → assimétrico + princípios | 45 min | Alto |
| 5 | Dor → lista numerada + status | 45 min | Alto |
| 6 | Método → linhas conectivas | 45 min | Médio · refino |
| 7 | AI → mini-stats counter | 30 min | Médio · refino |
| 8 | Objeções → diálogo | 45 min | Alto |
| 9 | FAQ → polimento | 20 min | Baixo · cosmético |
| 10 | CTA + Footer → chevron + manifesto | 30 min | Médio |

**Total estimado:** ~6-7h de implementação no Codex, distribuídas entre validações.

**Recomendação:** execute na ordem listada. Após cada execução, valide visualmente antes de partir pra próxima. Se algo sair muito diferente do planejado, ajuste o prompt antes de continuar.

---

**Fim do plano.**
