# Plano de Refino: Hero Image + Operation Animations

## Contexto

A landing da Variant Media está funcional mas precisa de dois refinamentos visuais:
1. **Hero** precisa de fotografia — duas abordagens para testar com imagem real
2. **Seção 05 (Operação)** precisa de animações distintas por card + chat de triagem no card 02

O usuário vai gerar imagens via GPT Image 2 e executar as mudanças via Codex. Este plano precisa ser completo e autossuficiente.

---

## 1. Hero Abordagem A — Chevron como Máscara CSS sobre Imagem

**Ideia**: A imagem só aparece dentro da forma do chevron. O SVG vira `mask-image` CSS. Um overlay ciano mantém a cor da marca.

### Arquivo novo: `components/landing/HeroChevronMask.tsx`

```tsx
import { cn } from "@/lib/cn";

export function HeroChevronMask({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  // Chevron path extraído de Chevron.tsx
  const maskSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'%3E%3Cpath d='M 60 80 L 300 320 L 540 80 L 540 200 L 300 440 L 60 200 Z' fill='white'/%3E%3C/svg%3E")`;

  return (
    <div
      className={cn("pointer-events-none absolute", className)}
      aria-hidden="true"
    >
      <div
        className="relative h-full w-full vm-hero-mask-reveal"
        style={{
          maskImage: maskSvg,
          WebkitMaskImage: maskSvg,
          maskSize: "contain",
          WebkitMaskSize: "contain",
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
        }}
      >
        <img
          src={src}
          alt=""
          className="h-full w-full object-cover"
          loading="eager"
        />
        {/* Overlay ciano para manter tint da marca */}
        <div className="absolute inset-0 bg-vm-cyan/20 mix-blend-overlay" />
      </div>
    </div>
  );
}
```

### Modificar: `components/landing/sections/Hero.tsx`

Adicionar prop `mode` para alternar entre abordagens:

```tsx
import { HeroChevronMask } from "@/components/landing/HeroChevronMask";

type HeroMode = "default" | "mask" | "background";

export function Hero({ mode = "default" }: { mode?: HeroMode }) {
  // ... existing code ...

  return (
    <Section ...>
      {/* Approach B: bg image atrás de tudo */}
      {mode === "background" && (
        <div className="absolute inset-0 vm-hero-bg-reveal" aria-hidden="true">
          <img src="/images/hero-bg.jpg" alt="" className="h-full w-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-vm-bg-alt/95 via-vm-bg-alt/80 to-vm-bg-alt/40" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-vm-bg-alt to-transparent" />
        </div>
      )}

      {/* Approach A: imagem mascarada pelo chevron */}
      {mode === "mask" ? (
        <>
          <HeroChevronMask
            src="/images/hero-bg.jpg"
            className="right-[-80vw] top-[-22vw] block h-[160vw] w-[160vw] origin-center rotate-[10deg] opacity-[0.85] sm:right-[-68vw] sm:top-[-18vw] sm:h-[150vw] sm:w-[150vw] lg:hidden"
          />
          <HeroChevronMask
            src="/images/hero-bg.jpg"
            className="right-[-28vw] top-[-34vw] hidden h-[105vw] w-[105vw] origin-center rotate-[10deg] opacity-[0.9] lg:block xl:right-[-25vw]"
          />
        </>
      ) : (
        <>
          <Chevron animated className="pointer-events-none absolute right-[-80vw] top-[-22vw] block h-[160vw] w-[160vw] origin-center rotate-[10deg] opacity-[0.14] sm:right-[-68vw] sm:top-[-18vw] sm:h-[150vw] sm:w-[150vw] lg:hidden" />
          <Chevron animated tone="strong" className="pointer-events-none absolute right-[-28vw] top-[-34vw] hidden h-[105vw] w-[105vw] origin-center rotate-[10deg] opacity-[0.78] lg:block xl:right-[-25vw]" />
        </>
      )}

      <Container ...>
        {/* texto existente, sem alteração */}
      </Container>
    </Section>
  );
}
```

### Usar em `app/page.tsx`

Para testar: `<Hero mode="mask" />` ou `<Hero mode="background" />`

### CSS em `globals.css` (adicionar após bloco de chevron animations)

```css
/* Hero mask reveal */
@keyframes vm-hero-mask-reveal {
  from { opacity: 0; mask-size: 90%; -webkit-mask-size: 90%; }
  to { opacity: 1; mask-size: contain; -webkit-mask-size: contain; }
}

.vm-hero-mask-reveal {
  animation: vm-hero-mask-reveal 1.6s var(--vm-ease-out) 0.3s both;
}

/* Hero background reveal */
@keyframes vm-hero-bg-reveal {
  from { opacity: 0; transform: scale(1.03); }
  to { opacity: 1; transform: scale(1); }
}

.vm-hero-bg-reveal {
  animation: vm-hero-bg-reveal 1.8s var(--vm-ease-out) both;
}

@media (prefers-reduced-motion: reduce) {
  .vm-hero-mask-reveal,
  .vm-hero-bg-reveal {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
```

### Imagem: colocar em `public/images/hero-bg.jpg`

---

## 2. Prompts para GPT Image 2

### Prompt Hero — "Escritório Silencioso" (recomendado para mask e bg)

```
Professional photograph of a modern law firm environment. A dark walnut desk with neatly stacked legal documents, a brass-accented pen, and a closed leather portfolio. Warm side lighting from a window creates dramatic shadows. No people, no screens. Cool blue-grey color palette with warm amber highlights from the desk lamp. Shallow depth of field, 50mm lens. The atmosphere conveys quiet authority, discipline, and professional excellence. Editorial commercial photography, high resolution, 2400x1600px. No text, no logos.
```

### Prompt Hero — "Mãos que Decidem" (alternativo)

```
Black and white photograph of mature professional hands reviewing stacked legal documents on a dark desk. Tight crop at chest level, no face visible. One hand holds a premium pen poised over paper. Very high contrast, deep blacks, soft window light from the left. One subtle cyan-blue accent light reflects on the pen barrel and paper edge. Premium editorial photography, 85mm lens, shallow depth of field. Conveys deliberation, expertise, and precision. No text, no logos.
```

### Prompt Hero — "O Martelo" (alternativo dramático)

```
Cinematic close-up of a wooden judge's gavel resting on a dark mahogany surface. The gavel head is sharp in focus, background completely blurred. Cool color grading with subtle teal-cyan tint in the highlights and deep warm shadows. Dramatic side lighting creates strong chiaroscuro. No text, no people. Minimal, premium, editorial photography. 35mm lens, f/1.8 depth of field. The image conveys authority, finality, and restrained power. High resolution 2400x1600.
```

---

## 3. Seção 05 — Animações distintas por BenefitTile

### Modificar: `components/landing/BenefitTile.tsx`

Adicionar props `animation` e `children`:

```tsx
type BenefitTileProps = {
  index: string;
  title: string;
  body: string;
  Glyph: GlyphComponent;
  featured: boolean;
  className?: string;
  animation?: string;   // NOVO
  children?: React.ReactNode;  // NOVO
};

export function BenefitTile({
  index, title, body, Glyph, featured, className, animation, children
}: BenefitTileProps) {
  const delay = Math.max(Number.parseInt(index, 10) - 1, 0) * 80;

  return (
    <article
      className={cn(
        animation ?? "data-reveal",  // usa animação específica ou fallback
        "group relative overflow-hidden rounded-sm border p-6 shadow-vm-sm transition-colors duration-300 ease-vm-out sm:p-7",
        featured
          ? "min-h-[300px] border-vm-panel-line bg-vm-panel text-vm-panel-text hover:border-vm-cyan/40 lg:min-h-0 lg:p-8"
          : "min-h-[220px] border-vm-line bg-vm-surface hover:border-vm-cyan/50",
        className
      )}
      style={{ "--delay": `${delay}ms` } as CSSProperties}
    >
      <div className="relative z-10 flex h-full min-h-[inherit] flex-col">
        {/* ... conteúdo existente sem alteração ... */}
      </div>
      <Glyph ... />
      {children}
    </article>
  );
}
```

### Modificar: `components/landing/sections/Operation.tsx`

```tsx
import { TriageChatAnimation } from "@/components/landing/TriageChatAnimation";

const tileConfig = [
  { Glyph: GlyphPredictability, featured: true,  className: "lg:col-span-2 lg:row-span-2", animation: "tile-scale-up" },
  { Glyph: GlyphQualification, featured: false, className: "lg:col-span-1 lg:row-span-2", animation: "tile-slide-right" },
  { Glyph: GlyphSpeed,         featured: false, className: "lg:col-span-1 lg:row-span-1", animation: "tile-flip-in" },
  { Glyph: GlyphControl,       featured: false, className: "lg:col-span-1 lg:row-span-1", animation: "tile-slide-up" },
  { Glyph: GlyphScale,         featured: false, className: "lg:col-span-1 lg:row-span-1", animation: "tile-blur-in" },
] as const;

// No .map():
<BenefitTile
  key={benefit.index}
  index={benefit.index}
  title={benefit.title}
  body={benefit.body}
  Glyph={config.Glyph}
  featured={config.featured}
  animation={config.animation}
  className={config.className}
>
  {index === 1 && <TriageChatAnimation />}
</BenefitTile>
```

### CSS das 5 animações (adicionar em `globals.css` dentro de `@layer components`)

```css
/* ── Tile entrance animations (seção Operação) ── */

/* 01 Previsibilidade: scale up do centro */
.tile-scale-up {
  opacity: 0;
  transform: scale(0.88);
  transform-origin: center;
}
.in-view .tile-scale-up {
  opacity: 1;
  transform: scale(1);
  transition: opacity 600ms var(--vm-ease-out) var(--delay),
              transform 600ms var(--vm-ease-out) var(--delay);
}

/* 02 Qualificação: slide da direita */
.tile-slide-right {
  opacity: 0;
  transform: translateX(30px);
}
.in-view .tile-slide-right {
  opacity: 1;
  transform: translateX(0);
  transition: opacity 550ms var(--vm-ease-out) var(--delay),
              transform 550ms var(--vm-ease-out) var(--delay);
}

/* 03 Velocidade: flip perspectiva */
.tile-flip-in {
  opacity: 0;
  transform: perspective(600px) rotateX(-8deg) translateY(10px);
  transform-origin: bottom center;
}
.in-view .tile-flip-in {
  opacity: 1;
  transform: perspective(600px) rotateX(0deg) translateY(0);
  transition: opacity 500ms var(--vm-ease-out) var(--delay),
              transform 500ms var(--vm-ease-out) var(--delay);
}

/* 04 Controle: slide de baixo */
.tile-slide-up {
  opacity: 0;
  transform: translateY(20px);
}
.in-view .tile-slide-up {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 500ms var(--vm-ease-out) var(--delay),
              transform 500ms var(--vm-ease-out) var(--delay);
}

/* 05 Escala: blur in */
.tile-blur-in {
  opacity: 0;
  transform: scale(0.95);
  filter: blur(6px);
}
.in-view .tile-blur-in {
  opacity: 1;
  transform: scale(1);
  filter: blur(0px);
  transition: opacity 550ms var(--vm-ease-out) var(--delay),
              transform 550ms var(--vm-ease-out) var(--delay),
              filter 550ms var(--vm-ease-out) var(--delay);
}

@media (prefers-reduced-motion: reduce) {
  .tile-scale-up, .tile-slide-right, .tile-flip-in,
  .tile-slide-up, .tile-blur-in {
    opacity: 1; transform: none; filter: none;
  }
  .in-view .tile-scale-up, .in-view .tile-slide-right,
  .in-view .tile-flip-in, .in-view .tile-slide-up,
  .in-view .tile-blur-in {
    transition: none;
  }
}
```

---

## 4. Card 02 — Chat de Triagem Animado

### Arquivo novo: `components/landing/TriageChatAnimation.tsx`

```tsx
"use client";

import type { CSSProperties } from "react";

const messages = [
  { from: "user", text: "Preciso de orientação sobre rescisão" },
  { from: "bot",  text: "Entendi. É rescisão direta ou indireta?" },
  { from: "user", text: "Indireta, por falta de pagamento" },
  { from: "bot",  text: "Há quanto tempo o salário está atrasado?" },
  { from: "user", text: "3 meses" },
  { from: "bot",  text: "Caso qualificado · Encaminhando →" },
] as const;

const MSG_DELAY = 1.8;  // segundos entre cada mensagem
const CYCLE = messages.length * MSG_DELAY + 2;  // duração total do loop

export function TriageChatAnimation() {
  return (
    <div
      className="triage-chat pointer-events-none absolute inset-0 flex flex-col justify-end overflow-hidden p-4 pt-14"
      aria-hidden="true"
    >
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`triage-msg ${msg.from === "user" ? "triage-msg--user" : "triage-msg--bot"}`}
          style={{
            "--msg-delay": `${i * MSG_DELAY}s`,
            "--msg-cycle": `${CYCLE}s`,
          } as CSSProperties}
        >
          <span className="triage-dots">
            <span className="triage-dot" />
            <span className="triage-dot" />
            <span className="triage-dot" />
          </span>
          <span className="triage-text">{msg.text}</span>
        </div>
      ))}
    </div>
  );
}
```

### CSS do chat (adicionar em `globals.css`)

```css
/* ── Triage Chat Animation (card 02 Operação) ── */

.triage-chat {
  mask-image: linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 18%, black 82%, transparent 100%);
}

.triage-msg {
  display: flex;
  align-items: center;
  max-width: 88%;
  margin-bottom: 6px;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 11px;
  line-height: 1.4;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0;
  transform: translateY(8px);
  animation: triage-msg-appear var(--msg-cycle) ease-out infinite;
  animation-delay: var(--msg-delay);
}

.triage-msg--user {
  align-self: flex-end;
  background: var(--vm-line-cool);
  color: var(--vm-graphite);
}

.triage-msg--bot {
  align-self: flex-start;
  background: var(--vm-cyan-tint);
  color: var(--vm-ink);
  border: 1px solid rgba(22,212,232,0.15);
}

.triage-dots {
  display: inline-flex;
  gap: 3px;
  margin-right: 6px;
}

.triage-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--vm-muted-3);
  animation: triage-dot-bounce 1.2s ease-in-out infinite;
}

.triage-dot:nth-child(2) { animation-delay: 0.15s; }
.triage-dot:nth-child(3) { animation-delay: 0.3s; }

@keyframes triage-msg-appear {
  0%   { opacity: 0; transform: translateY(8px); }
  3%   { opacity: 0.7; transform: translateY(0); }
  10%  { opacity: 1; transform: translateY(0); }
  75%  { opacity: 1; transform: translateY(0); }
  88%  { opacity: 0; transform: translateY(-4px); }
  100% { opacity: 0; transform: translateY(-4px); }
}

@keyframes triage-dot-bounce {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-3px); }
}

.triage-msg .triage-dots {
  animation: triage-dots-hide var(--msg-cycle) ease-out infinite;
  animation-delay: var(--msg-delay);
}

@keyframes triage-dots-hide {
  0%   { opacity: 1; width: auto; margin-right: 6px; }
  8%   { opacity: 1; width: auto; margin-right: 6px; }
  10%  { opacity: 0; width: 0; margin-right: 0; }
  100% { opacity: 0; width: 0; margin-right: 0; }
}

.triage-msg .triage-text {
  animation: triage-text-show var(--msg-cycle) ease-out infinite;
  animation-delay: var(--msg-delay);
}

@keyframes triage-text-show {
  0%   { opacity: 0; }
  8%   { opacity: 0; }
  12%  { opacity: 1; }
  75%  { opacity: 1; }
  88%  { opacity: 0; }
  100% { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .triage-msg {
    animation: none;
    opacity: 1;
    transform: none;
  }
  .triage-dots { display: none; }
  .triage-msg .triage-text { animation: none; opacity: 1; }
  .triage-msg:nth-child(n+4) { display: none; }
}
```

---

## Arquivos a modificar (resumo)

| Arquivo | Ação |
|---------|------|
| `components/landing/HeroChevronMask.tsx` | CRIAR |
| `components/landing/TriageChatAnimation.tsx` | CRIAR |
| `components/landing/sections/Hero.tsx` | MODIFICAR — adicionar prop `mode`, renderização condicional |
| `components/landing/BenefitTile.tsx` | MODIFICAR — adicionar props `animation` e `children` |
| `components/landing/sections/Operation.tsx` | MODIFICAR — passar animation por tile, render TriageChat no card index 1 |
| `app/globals.css` | MODIFICAR — adicionar 4 blocos CSS (hero mask, hero bg, tile anims, triage chat) |
| `app/page.tsx` | MODIFICAR — passar `mode` prop ao `<Hero>` para testar |
| `public/images/hero-bg.jpg` | ADICIONAR — imagem gerada pelo GPT Image 2 |

## Ordem de execução

1. Gerar imagem no GPT Image 2, salvar em `public/images/hero-bg.jpg`
2. Criar `HeroChevronMask.tsx`
3. Modificar `Hero.tsx` (prop mode + renderização condicional)
4. Adicionar CSS hero (mask + bg) em `globals.css`
5. Modificar `BenefitTile.tsx` (props animation + children)
6. Adicionar CSS tile animations em `globals.css`
7. Criar `TriageChatAnimation.tsx`
8. Adicionar CSS triage chat em `globals.css`
9. Modificar `Operation.tsx` (animation por tile + TriageChat no card 02)
10. Testar `<Hero mode="mask" />`, `<Hero mode="background" />`, scroll até seção 05

## Verificação

- `npx next build` deve compilar sem erros
- `node tests/smoke.mjs` deve passar
- Testar os 3 modos de hero visualmente (default, mask, background)
- Scroll até seção 05 e verificar que cada tile anima diferente
- Card 02 deve mostrar chat loop contínuo
- Testar com `prefers-reduced-motion: reduce` (DevTools > Rendering)
