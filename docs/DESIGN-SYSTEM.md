# Variant Media — Design System

**Versão:** 1.0
**Data:** 2026-04-30
**Direção visual:** Bold Operacional (D4 dominante + D3 pontual)
**Stack alvo:** Next.js (App Router) + Tailwind CSS + TypeScript
**Escopo:** landing page institucional/comercial (single page)

---

## 0. Como ler este documento

Este é o handoff de implementação. Ele compila tokens, componentes, regras de uso e copy oficial. O CLI deve seguir este doc como fonte de verdade. Quando houver conflito entre este doc e o `HANDOFF.md` original, este doc prevalece **apenas para questões de UI**; estratégia e copy continuam ancoradas no handoff original.

**Para o agente de código:**

- Não improvise tokens. Use exatamente os valores definidos.
- Não substitua componentes por libs externas (shadcn, headlessui, etc.) sem avisar.
- Antes de criar um componente novo, confira se já existe na seção `4. Componentes`.
- Antes de criar uma utility nova, confira a seção `7. Mapeamento Tailwind`.
- Os componentes têm marcação semântica obrigatória — respeite as tags HTML indicadas.
- Acessibilidade não é opcional. Veja seção `9. A11y`.

---

## 1. Direção visual

### Fórmula

```
70% Precisão Modular  +  20% Autoridade Editorial  +  10% Sinal de Performance
```

### Mistura D3 + D4 (resumo da decisão)

A landing pende para D4 (claro dominante). D3 entra apenas em **seções pontuais** quando o conteúdo justifica painel escuro:

- **Hero:** D4 (claro, tipografia bold, chevron decorativo eco da logo)
- **Credibilidade / Dor / Método / Operação / Diferenciais / FAQ / CTA final:** claro com variações de fundo
- **IA humanizada e atendimento:** **D3 (escuro pontual)** — única seção dark, justificada por mostrar "bastidor operacional"
- **Footer:** escuro

### Princípios

1. **Clareza vence efeito.** Se uma decoração não comunica, sai.
2. **Tipografia carrega o peso.** Headlines grandes, secas, sem ornamento.
3. **Ciano é assinatura, não fundo.** Aparece em acentos, sublinhados, riscos, glows pontuais.
4. **Modularidade sem virar dashboard.** Cards e painéis existem para mostrar diagnóstico, não para fingir produto SaaS.
5. **Motion explica, não enfeita.** Tudo abaixo de 400ms. Respeitar `prefers-reduced-motion`.

### Inspiração e antípodas

**Capturar:** estrutura modular tipo Stripe, peso editorial tipo Harvey, sobriedade tipo Palantir (sem dominância), ritmo tipo Filevine, painéis pontuais tipo Amplitude.

**Evitar:** dashboard SaaS como linguagem dominante, agência de tráfego, infoproduto, balança/martelo/brasão jurídico, neon como base, 3D decorativo, roxo/rosa como paleta estrutural.

---

## 2. Tokens de design

### 2.1 Cores

```css
/* base clara — dominante */
--vm-bg:           #F2F4F1;  /* fundo principal levemente quente */
--vm-bg-alt:       #F7FAFA;  /* alternativa fria, para hero e seções com painel */
--vm-surface:      #FFFFFF;  /* superfícies elevadas, cards, módulos */
--vm-line:         #E2E2D6;  /* linhas, divisores, bordas — versão quente */
--vm-line-cool:    #E6EEF2;  /* linhas em fundo frio (bg-alt) */
--vm-line-soft:    #EFF4F6;  /* grid background, divisores muito sutis */

/* texto e estrutura */
--vm-ink:          #1A1A1A;  /* preto da marca, headlines */
--vm-ink-2:        #101820;  /* alternativa fria para painéis dark */
--vm-graphite:     #2B2B2B;  /* corpo de texto */
--vm-muted:        #5A5A52;  /* texto secundário em fundo claro */
--vm-muted-2:      #6A6A60;  /* legenda, microcopy */
--vm-muted-3:      #9A9A90;  /* ainda mais sutil — strikethrough, placeholders */

/* marca e ação */
--vm-cyan:         #16D4E8;  /* ciano da logo — assinatura e acento */
--vm-cyan-deep:    #0FB8CC;  /* ciano mais escuro — texto sobre claro */
--vm-cyan-tint:    rgba(22,212,232,.12);  /* fundo de pill */
--vm-cyan-tint-2:  rgba(22,212,232,.35);  /* sublinhado, marcador */

/* azul de apoio (CTA secundário, links) */
--vm-blue:         #0B6EFF;
--vm-blue-deep:    #0850BF;

/* painéis escuros pontuais (seção IA, footer) */
--vm-panel:        #0E1620;
--vm-panel-2:      #131C27;
--vm-panel-line:   rgba(255,255,255,.08);
--vm-panel-line-2: rgba(255,255,255,.04);
--vm-panel-text:   #D5DEE6;
--vm-panel-muted:  rgba(213,222,230,.6);

/* status (uso restrito — só em painéis de diagnóstico) */
--vm-ok:           #1F9D6F;
--vm-warn:         #C97A1B;
--vm-crit:         #C03B3B;
--vm-live:         #34D399;  /* "ao vivo" em painel dark */
```

**Regras de uso de cor:**

- `--vm-bg` (quente) é o fundo padrão da página.
- `--vm-bg-alt` (frio) entra em seções específicas para criar ritmo (hero alternativo, módulo método).
- `--vm-cyan` nunca preenche grandes áreas. Só:
  - sublinhado de palavras-chave em headlines
  - acento de eyebrow (`::before`)
  - status "live" em painel
  - hover state em links de menu (opcional, sutil)
  - risco no headline do hero ("Mais marketing")
- `--vm-cyan-deep` é a versão usada como cor de texto sobre fundo claro (acentos em headlines, "ler mais", finding tags).
- `--vm-blue` é raro — só em links de texto corrido e CTA secundário se necessário. Não compete com ciano.
- Status (`--vm-ok`, `--vm-warn`, `--vm-crit`) só aparecem em painéis de diagnóstico, nunca em copy.

### 2.2 Tipografia

**Famílias:**

```css
--vm-font-sans:    'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
--vm-font-serif:   'Fraunces', Georgia, 'Times New Roman', serif;  /* opcional, só se usar variação editorial */
--vm-font-mono:    'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace;
```

**Carregamento (Next.js `next/font`):**

```ts
// app/layout.tsx
import { Inter, JetBrains_Mono, Fraunces } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--vm-font-sans-loaded",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--vm-font-mono-loaded",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--vm-font-serif-loaded",
  display: "swap",
});
```

Aplicar `${inter.variable} ${mono.variable} ${fraunces.variable}` no `<html>`.

**Escala (mobile-first; valores `clamp` para fluido):**

```css
/* display — só hero */
--vm-text-display: clamp(44px, 9.5vw, 132px);  /* h1 hero */
--vm-text-display-lh: 0.92;
--vm-text-display-tracking: -0.045em;
--vm-text-display-weight: 700;

/* h1 padrão (outras páginas, se houver) */
--vm-text-h1: clamp(34px, 5.6vw, 64px);
--vm-text-h1-lh: 1.04;
--vm-text-h1-tracking: -0.03em;
--vm-text-h1-weight: 600;

/* h2 — títulos de seção */
--vm-text-h2: clamp(28px, 4vw, 46px);
--vm-text-h2-lh: 1.08;
--vm-text-h2-tracking: -0.025em;
--vm-text-h2-weight: 600;

/* h3 — títulos de cards */
--vm-text-h3: clamp(18px, 1.6vw, 22px);
--vm-text-h3-lh: 1.25;
--vm-text-h3-tracking: -0.01em;
--vm-text-h3-weight: 600;

/* lead — subheadline / deck */
--vm-text-lead: clamp(16px, 1.45vw, 19px);
--vm-text-lead-lh: 1.55;

/* body */
--vm-text-body: 16px;
--vm-text-body-lh: 1.55;

/* small — microcopy, captions */
--vm-text-small: 13.5px;
--vm-text-small-lh: 1.5;

/* mono labels */
--vm-text-mono: 11px;
--vm-text-mono-lh: 1.4;
--vm-text-mono-tracking: 0.14em;
```

**Regras tipográficas:**

- Headlines em `Inter 600/700` com tracking negativo (`-0.025em` a `-0.045em`).
- Body em `Inter 400`, line-height `1.55`.
- Mono labels sempre em **caixa alta**, tracking `0.14em`, peso 500.
- Italic só com Fraunces e em moderação — somente para acentos editoriais (ex.: "o gargalo certo").
- **Nunca** caixa alta em corpo de texto.
- **Nunca** condensed.
- **Nunca** light em body — só em wordmark, headline (palavras secundárias) e numerais grandes.

### 2.3 Espaçamento

Sistema de 4px:

```css
--vm-space-1:  4px;
--vm-space-2:  8px;
--vm-space-3:  12px;
--vm-space-4:  16px;
--vm-space-5:  20px;
--vm-space-6:  24px;
--vm-space-8:  32px;
--vm-space-10: 40px;
--vm-space-12: 48px;
--vm-space-16: 64px;
--vm-space-20: 80px;
--vm-space-24: 96px;
--vm-space-32: 128px;

/* padding vertical de seção (fluido) */
--vm-section-y: clamp(72px, 10vw, 128px);
--vm-section-y-tight: clamp(56px, 8vw, 96px);

/* gutter horizontal */
--vm-gutter: clamp(20px, 4vw, 48px);
--vm-container: 1240px;
```

### 2.4 Radius

```css
--vm-radius-xs: 4px;   /* badges, pills pequenas */
--vm-radius-sm: 8px;   /* inputs, cards menores */
--vm-radius:    12px;  /* cards padrão, botões */
--vm-radius-lg: 16px;  /* módulos grandes, painéis */
--vm-radius-pill: 999px;  /* CTA do hero (D4), pills */
```

**Regra:** sem border-radius em layout (containers de seção). Cards e botões usam radius. Sem radius enormes (>16px) — fofa demais quebra a marca.

### 2.5 Bordas

```css
--vm-border:        1px solid var(--vm-line);
--vm-border-cool:   1px solid var(--vm-line-cool);
--vm-border-soft:   1px solid var(--vm-line-soft);
--vm-border-dark:   1px solid var(--vm-panel-line);
--vm-border-strong: 1px solid var(--vm-ink);  /* usado em régua editorial e finding rules */
```

### 2.6 Shadows

Usadas com parcimônia. Nunca shadow "dramática". Sempre direcional para baixo, com cor da marca.

```css
--vm-shadow-sm:    0 1px 0 rgba(255,255,255,.06) inset, 0 4px 12px -6px rgba(16,24,32,.08);
--vm-shadow:       0 1px 0 rgba(255,255,255,.06) inset, 0 8px 24px -10px rgba(16,24,32,.18);
--vm-shadow-lg:    0 1px 0 rgba(255,255,255,.06) inset, 0 30px 60px -40px rgba(11,24,38,.18);
--vm-shadow-cta:   0 8px 24px -10px rgba(16,24,32,.35);
--vm-shadow-cta-h: 0 12px 28px -10px rgba(16,24,32,.5);
--vm-shadow-cyan:  0 8px 28px -8px rgba(22,212,232,.45);
```

### 2.7 Motion

```css
--vm-ease:         cubic-bezier(0.2, 0.7, 0.2, 1);
--vm-ease-out:     cubic-bezier(0.16, 1, 0.3, 1);

--vm-dur-fast:     150ms;
--vm-dur:          250ms;
--vm-dur-slow:     400ms;
```

**Regras:**

- Microinterações (hover, focus): `150–250ms`.
- Reveal de seção: `300–400ms`, com stagger de `60–80ms` entre filhos.
- Nunca animar `width`/`height`. Usar `transform` e `opacity`.
- Sempre verificar `@media (prefers-reduced-motion: reduce)` e substituir transições por `0ms`.

### 2.8 Z-index

Escala discreta (não use valores arbitrários):

```css
--vm-z-base:    1;
--vm-z-raise:   10;
--vm-z-sticky:  50;
--vm-z-overlay: 80;
--vm-z-modal:   100;
--vm-z-toast:   200;
```

### 2.9 Breakpoints

Mobile-first, alinhado ao Tailwind padrão:

```
sm:  640px
md:  768px
lg:  1024px   ← layout desktop começa aqui
xl:  1280px
2xl: 1440px   ← max do container
```

---

## 3. Mapeamento Tailwind

### 3.1 `tailwind.config.ts`

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "20px",
        sm: "24px",
        lg: "32px",
        xl: "48px",
      },
      screens: {
        "2xl": "1240px",
      },
    },
    extend: {
      colors: {
        vm: {
          bg: "#F2F4F1",
          "bg-alt": "#F7FAFA",
          surface: "#FFFFFF",
          line: "#E2E2D6",
          "line-cool": "#E6EEF2",
          "line-soft": "#EFF4F6",
          ink: "#1A1A1A",
          "ink-2": "#101820",
          graphite: "#2B2B2B",
          muted: "#5A5A52",
          "muted-2": "#6A6A60",
          "muted-3": "#9A9A90",
          cyan: "#16D4E8",
          "cyan-deep": "#0FB8CC",
          blue: "#0B6EFF",
          "blue-deep": "#0850BF",
          panel: "#0E1620",
          "panel-2": "#131C27",
          "panel-text": "#D5DEE6",
          ok: "#1F9D6F",
          warn: "#C97A1B",
          crit: "#C03B3B",
          live: "#34D399",
        },
      },
      fontFamily: {
        sans: ["var(--vm-font-sans-loaded)", "system-ui", "sans-serif"],
        serif: ["var(--vm-font-serif-loaded)", "Georgia", "serif"],
        mono: ["var(--vm-font-mono-loaded)", "ui-monospace", "monospace"],
      },
      fontSize: {
        // os display/h1/h2 usam classes customizadas no globals (ver 7.3)
        // aqui só ajustes pontuais
        mono: ["11px", { lineHeight: "1.4", letterSpacing: "0.14em" }],
        small: ["13.5px", { lineHeight: "1.5" }],
      },
      borderRadius: {
        DEFAULT: "12px",
        sm: "8px",
        lg: "16px",
        pill: "999px",
      },
      boxShadow: {
        "vm-sm": "0 1px 0 rgba(255,255,255,.06) inset, 0 4px 12px -6px rgba(16,24,32,.08)",
        vm: "0 1px 0 rgba(255,255,255,.06) inset, 0 8px 24px -10px rgba(16,24,32,.18)",
        "vm-lg": "0 1px 0 rgba(255,255,255,.06) inset, 0 30px 60px -40px rgba(11,24,38,.18)",
        "vm-cta": "0 8px 24px -10px rgba(16,24,32,.35)",
        "vm-cta-h": "0 12px 28px -10px rgba(16,24,32,.5)",
        "vm-cyan": "0 8px 28px -8px rgba(22,212,232,.45)",
      },
      transitionTimingFunction: {
        "vm-ease": "cubic-bezier(0.2, 0.7, 0.2, 1)",
        "vm-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        fast: "150ms",
        DEFAULT: "250ms",
        slow: "400ms",
      },
      backgroundImage: {
        "vm-grid": `
          linear-gradient(to right, #EFF4F6 1px, transparent 1px),
          linear-gradient(to bottom, #EFF4F6 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        "vm-grid": "64px 64px",
      },
      maxWidth: {
        prose: "60ch",
        "prose-narrow": "48ch",
        "prose-sub": "54ch",
      },
      keyframes: {
        "vm-pulse": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: ".6", transform: "scale(1.15)" },
        },
        "vm-fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "vm-pulse": "vm-pulse 2.4s ease-in-out infinite",
        "vm-fade-up": "vm-fade-up 400ms cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
```

### 3.2 `globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* tokens (espelhar valores do Tailwind config para acesso via CSS) */
    --vm-bg: #F2F4F1;
    --vm-bg-alt: #F7FAFA;
    /* ... (copiar todos da seção 2.1) */
  }

  html {
    -webkit-text-size-adjust: 100%;
    scroll-behavior: smooth;
  }

  body {
    background: var(--vm-bg);
    color: var(--vm-graphite);
    font-family: var(--vm-font-sans-loaded), system-ui, sans-serif;
    font-feature-settings: "ss01", "cv11";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    background: var(--vm-cyan-tint-2, rgba(22,212,232,.35));
    color: var(--vm-ink);
  }

  *:focus-visible {
    outline: 2px solid var(--vm-cyan);
    outline-offset: 2px;
    border-radius: 4px;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}

@layer components {
  /* tipografia display (hero) */
  .vm-display {
    font-size: clamp(44px, 9.5vw, 132px);
    font-weight: 700;
    line-height: 0.92;
    letter-spacing: -0.045em;
    color: var(--vm-ink);
  }
  .vm-display .light { font-weight: 200; }
  .vm-display .accent {
    color: var(--vm-cyan-deep);
    font-style: italic;
    font-weight: 400;
    font-family: var(--vm-font-serif-loaded), Georgia, serif;
  }
  .vm-display .strike {
    position: relative;
    color: var(--vm-muted-3);
    font-weight: 300;
    display: inline-block;
  }
  .vm-display .strike::after {
    content: "";
    position: absolute;
    inset: 52% -2% auto -2%;
    height: max(3px, 0.07em);
    background: var(--vm-cyan-deep);
    transform: rotate(-2deg);
    pointer-events: none;
  }

  .vm-h1 {
    font-size: clamp(34px, 5.6vw, 64px);
    font-weight: 600;
    line-height: 1.04;
    letter-spacing: -0.03em;
    color: var(--vm-ink);
  }

  .vm-h2 {
    font-size: clamp(28px, 4vw, 46px);
    font-weight: 600;
    line-height: 1.08;
    letter-spacing: -0.025em;
    color: var(--vm-ink);
  }

  .vm-h3 {
    font-size: clamp(18px, 1.6vw, 22px);
    font-weight: 600;
    line-height: 1.25;
    letter-spacing: -0.01em;
    color: var(--vm-ink);
  }

  .vm-lead {
    font-size: clamp(16px, 1.45vw, 19px);
    line-height: 1.55;
    color: var(--vm-muted);
    max-width: 54ch;
  }

  .vm-mono-label {
    font-family: var(--vm-font-mono-loaded), monospace;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--vm-muted-2);
  }

  .vm-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: var(--vm-font-mono-loaded), monospace;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--vm-muted-2);
  }
  .vm-eyebrow::before {
    content: "";
    width: 6px;
    height: 6px;
    background: var(--vm-cyan);
    border-radius: 1px;
    box-shadow: 0 0 0 3px rgba(22,212,232,.18);
    flex-shrink: 0;
  }

  /* underline com marca ciano (hero, finds, CTAs textuais) */
  .vm-underline {
    background-image: linear-gradient(
      transparent 64%,
      rgba(22,212,232,.4) 64%,
      rgba(22,212,232,.4) 92%,
      transparent 92%
    );
    padding: 0 2px;
  }

  /* container de seção */
  .vm-section {
    padding-top: clamp(72px, 10vw, 128px);
    padding-bottom: clamp(72px, 10vw, 128px);
    position: relative;
  }
  .vm-section--tight {
    padding-top: clamp(56px, 8vw, 96px);
    padding-bottom: clamp(56px, 8vw, 96px);
  }

  /* divisor editorial (regra com label) */
  .vm-rule {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 24px;
    padding-bottom: 18px;
    border-bottom: 1px solid var(--vm-ink);
    font-family: var(--vm-font-mono-loaded), monospace;
    font-size: 11px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--vm-ink);
  }
}
```

---

## 4. Componentes

Todos os componentes ficam em `components/landing/`. Cada um tem nome semântico, props mínimas e segue o padrão React Server Component (sem estado por padrão). Componentes interativos (toggle, tabs, modal) são marcados com `"use client"`.

### 4.1 `<Container>`

Wrapper padrão de largura.

```tsx
// components/landing/Container.tsx
import { cn } from "@/lib/cn";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1240px] px-5 sm:px-6 lg:px-8 xl:px-12", className)}>
      {children}
    </div>
  );
}
```

### 4.2 `<Section>`

Wrapper de seção com padding vertical e variantes de fundo.

```tsx
// components/landing/Section.tsx
import { cn } from "@/lib/cn";

type Variant = "default" | "alt" | "dark";
type Padding = "default" | "tight";

export function Section({
  variant = "default",
  padding = "default",
  className,
  children,
  id,
}: {
  variant?: Variant;
  padding?: Padding;
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  const bg = {
    default: "bg-vm-bg text-vm-graphite",
    alt: "bg-vm-bg-alt text-vm-graphite",
    dark: "bg-vm-panel text-vm-panel-text",
  }[variant];

  const py = {
    default: "py-[clamp(72px,10vw,128px)]",
    tight: "py-[clamp(56px,8vw,96px)]",
  }[padding];

  return (
    <section id={id} className={cn("relative", bg, py, className)}>
      {children}
    </section>
  );
}
```

**Regras de uso:**

- Hero, Credibilidade, Diferenciais, FAQ, CTA final → `variant="default"`
- Dor principal, Método, O que muda, Objeções → `variant="alt"` (fundo frio para criar ritmo)
- IA humanizada, Footer → `variant="dark"`

### 4.3 `<Eyebrow>`

Mini-label técnico com marcador ciano.

```tsx
// components/landing/Eyebrow.tsx
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="vm-eyebrow">{children}</span>;
}
```

Renderiza com bullet ciano à esquerda, mono uppercase tracking 0.14em.

### 4.4 `<MonoLabel>`

Label técnico sem o bullet.

```tsx
// components/landing/MonoLabel.tsx
import { cn } from "@/lib/cn";

export function MonoLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={cn("vm-mono-label", className)}>{children}</span>;
}
```

### 4.5 `<Button>`

Três variantes. Sem libs.

```tsx
// components/landing/Button.tsx
import { cn } from "@/lib/cn";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "ghost" | "cyan";
type Size = "default" | "sm";

export function Button({
  variant = "primary",
  size = "default",
  withArrow = false,
  pill = false,
  className,
  children,
  ...props
}: {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
  pill?: boolean;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const base =
    "inline-flex items-center gap-2.5 font-medium transition duration-fast ease-vm-ease border";

  const sizes = {
    default: "h-[52px] px-6 text-[15px]",
    sm: "h-10 px-[18px] text-sm",
  }[size];

  const radius = pill ? "rounded-pill" : "rounded-xl";

  const variants = {
    primary:
      "bg-vm-ink text-white border-vm-ink shadow-vm-cta hover:bg-black hover:-translate-y-px hover:shadow-vm-cta-h",
    ghost:
      "bg-transparent text-vm-ink border-vm-ink hover:bg-vm-ink hover:text-white hover:-translate-y-px",
    cyan:
      "bg-vm-cyan text-vm-ink border-vm-cyan font-semibold shadow-vm-cyan hover:-translate-y-px",
  }[variant];

  return (
    <button className={cn(base, sizes, radius, variants, className)} {...props}>
      {children}
      {withArrow && (
        <ArrowRight
          size={16}
          className="transition-transform duration-fast ease-vm-ease group-hover:translate-x-0.5"
          aria-hidden
        />
      )}
    </button>
  );
}
```

**Regras de uso:**

- `primary` (preto sólido) é o CTA principal em todos os blocos.
- `ghost` (outline preto) é o secundário ("Entender o método", "Falar com a equipe").
- `cyan` (preenchido ciano) só no hero quando o CTA é o protagonista absoluto. Usar uma vez por página, no máximo.
- `pill={true}` ativa border-radius full — usar apenas no hero (D4) e no CTA final.
- Para links em Next.js, envolver com `<Link>`:

```tsx
<Link href="/agendar"><Button variant="primary" withArrow>Agendar diagnóstico</Button></Link>
```

### 4.6 `<Header>`

Sticky, transparente, ganha border ao rolar.

```tsx
// components/landing/Header.tsx
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { BrandMark } from "./BrandMark";

const NAV = [
  { label: "Método", href: "#metodo" },
  { label: "Diagnóstico", href: "#diagnostico" },
  { label: "Tecnologia", href: "#tecnologia" },
  { label: "Diferenciais", href: "#diferenciais" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-default ease-vm-ease",
        "bg-vm-bg/75 backdrop-blur-md backdrop-saturate-150",
        scrolled ? "border-b border-vm-line" : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-[68px] w-full max-w-[1240px] items-center justify-between px-5 sm:px-6 lg:px-8 xl:px-12">
        <Link href="/" aria-label="Variant Media — início" className="flex items-center gap-3">
          <BrandMark className="h-7 w-7" />
          <span className="text-lg text-vm-ink">
            <strong className="font-bold tracking-[-0.01em]">variant</strong>
            <span className="font-extralight">midia</span>
          </span>
        </Link>

        <nav aria-label="Principal" className="hidden gap-8 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-vm-muted transition-colors duration-fast hover:text-vm-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href="#cta-final">
          <Button size="sm" variant="primary" withArrow>Agendar diagnóstico</Button>
        </Link>
      </div>
    </header>
  );
}
```

### 4.7 `<BrandMark>`

SVG inline da logo (recriação fiel).

```tsx
// components/landing/BrandMark.tsx
export function BrandMark({
  className,
  variant = "ink",
}: {
  className?: string;
  variant?: "ink" | "white";
}) {
  const fill = variant === "white" ? "#FFFFFF" : "#1A1A1A";
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
    >
      <polygon points="32,8 4,8 4,56 14,56 14,30 32,46" fill={fill} />
      <polygon points="32,8 60,8 60,56 50,56 50,30 32,46" fill={fill} />
      <polygon points="32,8 14,30 32,46 50,30" fill="#16D4E8" />
    </svg>
  );
}
```

### 4.8 `<Card>`

Card padrão com borda fina sobre fundo claro.

```tsx
// components/landing/Card.tsx
import { cn } from "@/lib/cn";

type Tone = "default" | "alt" | "dark";

export function Card({
  tone = "default",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  const tones = {
    default:
      "bg-vm-surface border-vm-line",
    alt:
      "bg-vm-surface border-vm-line-cool",
    dark:
      "bg-vm-panel-2 border-vm-panel-line text-vm-panel-text",
  }[tone];

  return (
    <div
      className={cn(
        "rounded-lg border p-6 transition-all duration-default ease-vm-ease",
        "hover:-translate-y-px",
        tone === "dark"
          ? "hover:border-[rgba(22,212,232,0.3)]"
          : "hover:border-vm-cyan/50",
        tones,
        className
      )}
    >
      {children}
    </div>
  );
}
```

### 4.9 `<PainCard>`, `<BenefitCard>`, `<DifferentialItem>`

Variações temáticas do `<Card>` ou itens de lista.

```tsx
// components/landing/PainCard.tsx
import { Card } from "./Card";

export function PainCard({ title, body }: { title: string; body: string }) {
  return (
    <Card tone="default">
      <h3 className="vm-h3 mb-3">{title}</h3>
      <p className="text-[15px] leading-[1.55] text-vm-muted">{body}</p>
    </Card>
  );
}
```

```tsx
// components/landing/BenefitCard.tsx
import { Card } from "./Card";
import { MonoLabel } from "./MonoLabel";

export function BenefitCard({
  index,
  title,
  body,
}: {
  index: string;  // "01" .. "05"
  title: string;
  body: string;
}) {
  return (
    <Card tone="alt">
      <div className="flex items-center gap-3 mb-4">
        <MonoLabel className="text-vm-cyan-deep">{index}</MonoLabel>
        <span className="h-px flex-1 bg-vm-line-cool" />
      </div>
      <h3 className="vm-h3 mb-2">{title}</h3>
      <p className="text-[15px] leading-[1.55] text-vm-muted">{body}</p>
    </Card>
  );
}
```

```tsx
// components/landing/DifferentialItem.tsx
export function DifferentialItem({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <li className="border-t border-vm-line py-7">
      <h3 className="vm-h3 mb-2">{title}</h3>
      <p className="text-[15px] leading-[1.55] text-vm-muted max-w-prose">{body}</p>
    </li>
  );
}
```

(Lista usa `<ul className="list-none">`, sem bullet visual. Linha superior do item faz o trabalho de divisor — last item ganha `border-b`.)

### 4.10 `<DiagnosticFlow>`

Módulo central — usado no hero **e** na seção do método. Visual signature da marca.

```tsx
// components/landing/DiagnosticFlow.tsx
import { MonoLabel } from "./MonoLabel";
import { cn } from "@/lib/cn";

type Status = "ok" | "warn" | "crit";

const NODES: Array<{
  num: string;
  title: string;
  body: string;
  status: Status;
  statusLabel: string;
}> = [
  { num: "01", title: "Oferta",     body: "Posicionamento e proposta de valor",        status: "ok",   statusLabel: "OK" },
  { num: "02", title: "Demanda",    body: "Origem, qualificação e volume de leads",    status: "warn", statusLabel: "Atenção" },
  { num: "03", title: "Conversão",  body: "Atendimento, follow-up e fechamento",       status: "crit", statusLabel: "Gargalo" },
];

const statusColor: Record<Status, string> = {
  ok:   "text-vm-ok",
  warn: "text-vm-warn",
  crit: "text-vm-crit",
};

export function DiagnosticFlow({
  showFooter = true,
  className,
}: {
  showFooter?: boolean;
  className?: string;
}) {
  return (
    <aside
      aria-label="Diagnóstico — Oferta, Demanda, Conversão"
      className={cn(
        "rounded-lg border border-vm-line bg-vm-surface p-6 lg:p-7",
        "shadow-vm-lg",
        className
      )}
    >
      <header className="flex items-center justify-between border-b border-vm-line pb-4 mb-5">
        <MonoLabel>Diagnóstico · Escritório jurídico</MonoLabel>
        <span className="inline-flex items-center gap-1.5 rounded-pill bg-vm-cyan/10 px-2.5 py-1 vm-mono-label text-vm-ink">
          <span className="size-1.5 rounded-full bg-vm-cyan animate-vm-pulse shadow-[0_0_0_3px_rgba(22,212,232,0.25)]" />
          Em análise
        </span>
      </header>

      <ol className="grid gap-3" role="list">
        {NODES.map((n, idx) => (
          <li key={n.num}>
            <div className="grid grid-cols-[36px_1fr_auto] items-center gap-3.5 rounded border border-vm-line bg-white p-4 transition-all duration-default ease-vm-ease hover:border-vm-cyan/50 hover:-translate-y-px">
              <span className="grid size-9 place-items-center rounded border border-vm-line bg-gradient-to-b from-[#F2F7F8] to-[#E9F0F2] font-mono text-xs font-medium text-vm-ink">
                {n.num}
              </span>
              <div>
                <strong className="block text-[14px] font-semibold text-vm-ink">{n.title}</strong>
                <span className="block text-[12.5px] text-vm-muted mt-0.5">{n.body}</span>
              </div>
              <span className={cn("font-mono text-[10.5px] tracking-[0.1em] uppercase", statusColor[n.status])}>
                {n.statusLabel}
              </span>
            </div>
            {idx < NODES.length - 1 && (
              <div className="my-1 mx-4 h-px bg-gradient-to-r from-transparent via-vm-line to-transparent" aria-hidden />
            )}
          </li>
        ))}
      </ol>

      {showFooter && (
        <footer className="mt-5 flex items-center justify-between border-t border-vm-line pt-4 text-[12px] text-vm-muted">
          <span>Tempo médio de resposta</span>
          <strong className="font-semibold text-vm-ink">4h 12min</strong>
        </footer>
      )}
    </aside>
  );
}
```

### 4.11 `<TechPanel>` (D3 — escuro, único na página)

Painel escuro pontual usado **apenas** na seção "IA humanizada e atendimento".

```tsx
// components/landing/TechPanel.tsx
import { MonoLabel } from "./MonoLabel";
import { cn } from "@/lib/cn";

const STAGES = [
  { id: "01", title: "Triagem inicial",   body: "Identifica contexto, urgência e aderência",  bar: 82 },
  { id: "02", title: "Follow-up",         body: "Mantém o lead aquecido até a decisão",       bar: 64 },
  { id: "03", title: "Resumo e contexto", body: "Conversa organizada para a próxima etapa",   bar: 48 },
];

export function TechPanel({ className }: { className?: string }) {
  return (
    <aside
      aria-label="Painel de operação"
      className={cn(
        "relative rounded-lg border border-vm-panel-line bg-gradient-to-b from-vm-panel-2/90 to-vm-panel/90 p-6 backdrop-blur-md",
        "shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]",
        className
      )}
    >
      <header className="flex items-center justify-between border-b border-vm-panel-line pb-4 mb-5">
        <span className="vm-mono-label text-vm-panel-muted">
          Operação · <strong className="text-white font-semibold">IA humanizada</strong>
        </span>
        <span className="inline-flex items-center gap-1.5 vm-mono-label text-vm-live">
          <span className="size-1.5 rounded-full bg-vm-live animate-vm-pulse shadow-[0_0_0_3px_rgba(52,211,153,0.18)]" />
          Ao vivo
        </span>
      </header>

      <ol className="grid gap-2.5" role="list">
        {STAGES.map((s) => (
          <li
            key={s.id}
            className="grid grid-cols-[auto_1fr_auto] items-center gap-3.5 rounded border border-vm-panel-line bg-white/[0.02] p-3.5 transition-all duration-default ease-vm-ease hover:border-vm-cyan/30 hover:bg-vm-cyan/[0.04]"
          >
            <span className="font-mono text-[10.5px] tracking-[0.14em] text-white/40 w-8">{s.id}</span>
            <div>
              <strong className="block text-[13.5px] font-medium text-white mb-0.5">{s.title}</strong>
              <span className="block text-xs text-white/55 leading-[1.5]">{s.body}</span>
            </div>
            <div className="hidden w-20 sm:block">
              <div className="h-1 rounded-pill bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-pill bg-gradient-to-r from-vm-cyan to-vm-cyan-deep"
                  style={{ width: `${s.bar}%` }}
                />
              </div>
            </div>
          </li>
        ))}
      </ol>

      <footer className="mt-4 grid grid-cols-3 gap-2 border-t border-vm-panel-line pt-4">
        <Mini label="Resposta média" value="4h" suffix="12m" />
        <Mini label="Lead qualificado" value="38" suffix="%" />
        <Mini label="Conversão" value="12" suffix="%" />
      </footer>
    </aside>
  );
}

function Mini({ label, value, suffix }: { label: string; value: string; suffix?: string }) {
  return (
    <div>
      <span className="block vm-mono-label text-white/40 mb-1">{label}</span>
      <span className="block font-mono text-lg font-medium text-white tracking-tight">
        {value}
        {suffix && <small className="text-[11px] text-white/50 font-normal ml-0.5">{suffix}</small>}
      </span>
    </div>
  );
}
```

### 4.12 `<Chevron>` — ornamento decorativo do hero

Eco da logo, aparece ao fundo do hero apenas.

```tsx
// components/landing/Chevron.tsx
export function Chevron({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 600 600" className="h-full w-full">
        <defs>
          <linearGradient id="vm-chev-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#16D4E8" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#16D4E8" stopOpacity="0.03" />
          </linearGradient>
        </defs>
        <path d="M 60 80 L 300 320 L 540 80 L 540 200 L 300 440 L 60 200 Z" fill="url(#vm-chev-grad)" />
        <path d="M 60 80 L 300 320 L 540 80" stroke="rgba(22,212,232,0.35)" strokeWidth="1.5" fill="none" />
        <path d="M 60 200 L 300 440 L 540 200" stroke="rgba(22,212,232,0.18)" strokeWidth="1" fill="none" />
      </svg>
    </div>
  );
}
```

Posicionamento (no hero):

```tsx
<Chevron className="pointer-events-none absolute right-[-100px] top-1/2 w-[min(70vw,720px)] aspect-square -translate-y-1/2 opacity-90 z-0" />
```

### 4.13 `<FAQItem>`

Acordeão com `<details>`/`<summary>` nativo (sem JS).

```tsx
// components/landing/FAQItem.tsx
export function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border-t border-vm-line py-6 last:border-b">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
        <span className="vm-h3 pr-4">{q}</span>
        <span
          className="mt-1.5 grid size-7 shrink-0 place-items-center rounded-full border border-vm-line text-vm-ink transition-all duration-default ease-vm-ease group-open:rotate-45 group-open:border-vm-ink"
          aria-hidden
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </span>
      </summary>
      <div className="pt-4 pr-12 text-[15px] leading-[1.55] text-vm-muted">{a}</div>
    </details>
  );
}
```

### 4.14 `<ObjectionCard>`

```tsx
// components/landing/ObjectionCard.tsx
export function ObjectionCard({
  objection,
  response,
}: {
  objection: string;
  response: string;
}) {
  return (
    <article className="rounded-lg border border-vm-line bg-vm-surface p-7">
      <p className="font-serif italic text-vm-ink text-[20px] leading-[1.3] mb-4">
        &ldquo;{objection}&rdquo;
      </p>
      <div className="h-px bg-vm-line my-4" />
      <p className="text-[15px] leading-[1.55] text-vm-muted">{response}</p>
    </article>
  );
}
```

### 4.15 `<Footer>` (escuro)

```tsx
// components/landing/Footer.tsx
import Link from "next/link";
import { BrandMark } from "./BrandMark";

export function Footer() {
  return (
    <footer className="bg-vm-panel text-vm-panel-text">
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-6 lg:px-8 xl:px-12 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <BrandMark className="h-7 w-7" variant="white" />
              <span className="text-lg text-white">
                <strong className="font-bold">variant</strong>
                <span className="font-extralight">midia</span>
              </span>
            </Link>
            <p className="max-w-prose-narrow text-[14px] leading-[1.55] text-vm-panel-muted">
              Assessoria de performance jurídica. Diagnóstico, método e tecnologia aplicada à conversão.
            </p>
          </div>
          {/* colunas de links: ver doc completo */}
        </div>
        <div className="mt-12 border-t border-vm-panel-line pt-6 flex flex-wrap items-center justify-between gap-4 text-[12px] text-vm-panel-muted">
          <span>© 2026 Variant Media</span>
          <span>Especializada em escritórios de advocacia</span>
        </div>
      </div>
    </footer>
  );
}
```

### 4.16 Helper `cn`

```ts
// lib/cn.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Dependências: `clsx`, `tailwind-merge`, `lucide-react` (apenas para ícones).

---

## 5. Composição da landing — seção a seção

A landing é uma única página em `app/page.tsx`. Cada seção é um componente próprio em `components/landing/sections/`.

### 5.1 Ordem das seções

1. `<Hero />` — claro, tipo gigante, chevron decorativo
2. `<Credibility />` — claro, 3 cards
3. `<Pain />` — claro alt (frio), 4 cards de dor
4. `<Method />` — claro alt, `<DiagnosticFlow>` central + texto
5. `<Operation />` — claro, 5 benefícios
6. `<AISection />` — **dark** (única dark da landing), `<TechPanel>` à direita
7. `<Differentials />` — claro, lista de 6 itens
8. `<Objections />` — claro alt, 3 objeções
9. `<FAQ />` — claro, lista de `<FAQItem>`
10. `<FinalCTA />` — claro, CTA pill duplo
11. `<Footer />` — dark

### 5.2 `<Hero />` — implementação completa

```tsx
// components/landing/sections/Hero.tsx
import { Container } from "../Container";
import { Section } from "../Section";
import { Button } from "../Button";
import { MonoLabel } from "../MonoLabel";
import { Chevron } from "../Chevron";
import Link from "next/link";

export function Hero() {
  return (
    <Section id="hero" padding="tight" className="overflow-hidden">
      <Chevron className="pointer-events-none absolute right-[-100px] top-1/2 z-0 aspect-square w-[min(70vw,720px)] -translate-y-1/2 opacity-90" />

      <Container className="relative z-10">
        <div className="mb-8 flex flex-wrap items-center gap-3.5">
          <MonoLabel className="text-vm-ink"><strong className="font-medium">Performance jurídica</strong></MonoLabel>
          <span className="h-3 w-px bg-vm-line" aria-hidden />
          <MonoLabel>Diagnóstico · Oferta · Demanda · Conversão</MonoLabel>
        </div>

        <h1 className="vm-display max-w-[14ch]">
          <span className="strike">Mais marketing</span><br />
          não resolve.<br />
          <span className="light">Resolve diagnosticar</span><br />
          <span className="accent">o gargalo certo.</span>
        </h1>

        <div className="mt-12 grid grid-cols-1 items-end gap-8 md:grid-cols-[1fr_auto] md:gap-14">
          <p className="vm-lead max-w-prose-narrow">
            A Variant Media identifica onde seu escritório está perdendo receita — na oferta, demanda ou conversão — e estrutura um processo claro para transformar oportunidades em contratos.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="#cta-final">
              <Button variant="primary" pill withArrow>Agendar diagnóstico</Button>
            </Link>
            <Link href="#metodo">
              <Button variant="ghost" pill>Entender o método</Button>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
```

### 5.3 `<Method />` — implementação

```tsx
// components/landing/sections/Method.tsx
import { Container } from "../Container";
import { Section } from "../Section";
import { Eyebrow } from "../Eyebrow";
import { DiagnosticFlow } from "../DiagnosticFlow";

export function Method() {
  return (
    <Section id="metodo" variant="alt">
      <Container>
        <div className="mb-12 max-w-prose">
          <Eyebrow>Método</Eyebrow>
          <h2 className="vm-h2 mt-4">
            Toda perda de receita passa por três pontos:{" "}
            <span className="vm-underline">oferta, demanda ou conversão.</span>
          </h2>
          <p className="vm-lead mt-6">
            Antes de aumentar investimento, o escritório precisa descobrir onde está vazando receita. O diagnóstico mostra onde está o gargalo. A estratégia vem depois.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div className="order-2 lg:order-1 grid gap-8">
            <MethodNode num="01" title="Oferta" body="Sua proposta está clara, valorizada e alinhada ao tipo de cliente que você quer atrair?" />
            <MethodNode num="02" title="Demanda" body="O escritório está atraindo as pessoas certas, no momento certo, pelos canais certos?" />
            <MethodNode num="03" title="Conversão" body="Os contatos estão sendo atendidos, qualificados e conduzidos com velocidade e método?" />
          </div>
          <div className="order-1 lg:order-2">
            <DiagnosticFlow />
          </div>
        </div>
      </Container>
    </Section>
  );
}

function MethodNode({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-5 border-t border-vm-line-cool pt-6">
      <span className="font-mono text-[11px] tracking-[0.14em] text-vm-cyan-deep">{num}</span>
      <div>
        <h3 className="vm-h3 mb-2">{title}</h3>
        <p className="text-[15px] leading-[1.55] text-vm-muted max-w-prose">{body}</p>
      </div>
    </div>
  );
}
```

### 5.4 `<AISection />` — única dark

```tsx
// components/landing/sections/AISection.tsx
import { Container } from "../Container";
import { Section } from "../Section";
import { Eyebrow } from "../Eyebrow";
import { TechPanel } from "../TechPanel";

export function AISection() {
  return (
    <Section id="tecnologia" variant="dark">
      <Container>
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
            <span className="vm-eyebrow text-white/60 [&::before]:bg-vm-cyan">Tecnologia com critério</span>
            <h2 className="vm-h2 mt-4 text-white">
              Tecnologia entra para apoiar o atendimento, não para virar protagonista da marca.
            </h2>
            <p className="mt-6 text-[16px] leading-[1.6] text-white/70 max-w-prose">
              A IA faz sentido quando melhora triagem, follow-up, velocidade de resposta e organização do atendimento — sem parecer robótica nem quebrar a experiência do potencial cliente.
            </p>
            <p className="mt-6 text-[14px] leading-[1.55] text-white/55 max-w-prose-narrow">
              IA humanizada não é efeito especial. É operação melhor desenhada.
            </p>
          </div>
          <TechPanel />
        </div>
      </Container>
    </Section>
  );
}
```

(Demais seções seguem o padrão. Ver seção `11. Copy oficial` para o conteúdo a inserir e `12. Esqueleto completo` para o page.tsx final.)

---

## 6. Ritmo de cores por seção

Para garantir alternância visual e ritmo:

| # | Seção           | `variant`   | Componente principal      |
|---|-----------------|-------------|---------------------------|
| 1 | Hero            | `default`   | tipo gigante + chevron    |
| 2 | Credibility     | `default`   | 3 cards default           |
| 3 | Pain            | `alt` (frio)| 4 cards default + frase   |
| 4 | Method          | `alt` (frio)| `DiagnosticFlow` + nodes  |
| 5 | Operation       | `default`   | 5 cards `BenefitCard`     |
| 6 | AI              | **`dark`**  | `TechPanel` + texto       |
| 7 | Differentials   | `default`   | lista enxuta              |
| 8 | Objections      | `alt` (frio)| 3 cards `ObjectionCard`   |
| 9 | FAQ             | `default`   | `<details>` lista         |
| 10| FinalCTA        | `default`   | CTA pill duplo            |
| 11| Footer          | **`dark`**  | links + copyright         |

**Padrão:** sequência claro → claro-frio → claro → claro-frio → escuro → claro... evita cansaço visual e dá ritmo editorial.

---

## 7. Acessibilidade

- Contraste mínimo AA em todos os textos (verificado nos pares: `--vm-graphite` em `--vm-bg` ≈ 11:1; `--vm-muted` em `--vm-bg` ≈ 5.4:1; `--vm-panel-text` em `--vm-panel` ≈ 11.7:1).
- `*:focus-visible` com outline ciano de 2px (definido em globals).
- Hierarquia de headings em ordem (H1 só no hero; H2 nos títulos de seção; H3 nos cards e itens).
- `<button>` para ações; `<a href="...">` para navegação.
- `aria-label` em botões com ícone-only.
- `<details>`/`<summary>` no FAQ — funciona sem JS, suporta keyboard nativo.
- `prefers-reduced-motion: reduce` zera todas as transições e animações.
- Imagens decorativas (`<Chevron>`) marcadas com `aria-hidden`.
- Logo sempre acompanhada de texto ("variantmidia") para leitores de tela.

---

## 8. Performance

- `next/font` para Inter, JetBrains Mono e Fraunces — zero CLS, sem FOUT.
- `display: "swap"` em todas as fontes.
- SVGs inline para logo e chevron (não baixar imagem).
- Sem libs pesadas. Motion via CSS + `tailwindcss-animate` opcional. Framer Motion só se reveal precisar de orquestração complexa (não é o caso desta landing).
- Lazy-loading não necessário — landing é uma página só, sem imagens grandes.
- LCP-friendly: hero não depende de imagem nem JS para renderizar.
- Fonte mono e serif só carregam se realmente forem usadas no viewport (Next.js cuida disso).

---

## 9. SEO e metadados

```ts
// app/page.tsx (exportado do page.tsx ou layout.tsx)
export const metadata = {
  title: "Variant Media | Performance jurídica com diagnóstico",
  description:
    "A Variant Media ajuda escritórios de advocacia a diagnosticar gargalos de oferta, demanda e conversão para crescer com mais previsibilidade, resposta mais rápida e foco em faturamento.",
  openGraph: {
    title: "Variant Media | Performance jurídica com diagnóstico",
    description:
      "Diagnóstico, método e tecnologia aplicada à conversão para escritórios de advocacia.",
    type: "website",
    locale: "pt_BR",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Variant Media",
    description: "Performance jurídica com diagnóstico.",
  },
};
```

---

## 10. Estrutura de arquivos

```
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
  content.ts        # copy centralizada
public/
  og.png
tailwind.config.ts
```

---

## 11. Copy oficial

Toda a copy da landing está consolidada em `lib/content.ts` para fácil edição. **Não inventar copy nova** — usar exatamente o que está abaixo (extraído do `homepage-copy-variant-media-2026-04-30.md` e reorganizado).

```ts
// lib/content.ts
export const content = {
  hero: {
    eyebrow: "Performance jurídica",
    rule: "Diagnóstico · Oferta · Demanda · Conversão",
    title: {
      strike: "Mais marketing",
      line2: "não resolve.",
      line3: "Resolve diagnosticar",
      accent: "o gargalo certo.",
    },
    sub: "A Variant Media identifica onde seu escritório está perdendo receita — na oferta, demanda ou conversão — e estrutura um processo claro para transformar oportunidades em contratos.",
    cta: { primary: "Agendar diagnóstico", secondary: "Entender o método" },
  },
  credibility: {
    title: "Não vendemos marketing por pacote. Primeiro entendemos o que está impedindo seu escritório de crescer.",
    body: "Muitos escritórios não têm falta de ação. Têm demanda ruim, atendimento lento, processo comercial informal e pouca clareza sobre o que realmente gera receita.",
    cards: [
      { title: "Diagnóstico antes da prescrição", body: "Antes de propor qualquer ação, identificamos se o problema está na oferta, na demanda ou na conversão." },
      { title: "Especialização em advocacia", body: "Entendemos as restrições do mercado jurídico, o perfil do cliente e o peso da confiança na decisão de contratar." },
      { title: "Foco em faturamento", body: "Nossa conversa não gira em torno de métrica de vaidade. Gira em torno de previsibilidade, qualificação e receita." },
    ],
  },
  pain: {
    title: "Quando o escritório cresce no improviso, a receita fica instável.",
    body: "O problema quase nunca é apenas \"falta de marketing\". O problema é não saber de onde o cliente vem, quanto tempo o lead espera, onde a conversa trava e por que alguns meses funcionam e outros não.",
    cards: [
      { title: "Dependência de indicação", body: "Se uma ou duas fontes param de indicar, o faturamento sente na hora." },
      { title: "Lead que chega e se perde", body: "A pessoa entra em contato, espera, esfria e fecha com quem respondeu primeiro." },
      { title: "Curioso demais, cliente de menos", body: "O escritório perde tempo com quem não tem fit jurídico ou não está pronto para contratar." },
      { title: "Comercial sem método", body: "Cada sócio vende de um jeito, ninguém sabe o que funciona e o resultado depende de talento individual." },
    ],
    closing: "Enquanto isso não fica visível, qualquer investimento parece tentativa e erro.",
  },
  method: {
    eyebrow: "Método",
    title: "Toda perda de receita passa por três pontos: oferta, demanda ou conversão.",
    body: "Antes de aumentar investimento, o escritório precisa descobrir onde está vazando receita. O diagnóstico mostra onde está o gargalo. A estratégia vem depois.",
    nodes: [
      { num: "01", title: "Oferta", body: "Sua proposta está clara, valorizada e alinhada ao tipo de cliente que você quer atrair?" },
      { num: "02", title: "Demanda", body: "O escritório está atraindo as pessoas certas, no momento certo, pelos canais certos?" },
      { num: "03", title: "Conversão", body: "Os contatos estão sendo atendidos, qualificados e conduzidos com velocidade e método?" },
    ],
  },
  operation: {
    title: "Não é sobre parecer maior. É sobre vender com mais clareza.",
    body: "Quando oferta, demanda e conversão deixam de ser tratadas no improviso, o escritório passa a enxergar onde deve agir primeiro.",
    benefits: [
      { index: "01", title: "Mais previsibilidade", body: "Você para de começar todo mês do zero." },
      { index: "02", title: "Mais qualificação", body: "Chega menos curioso e mais oportunidade real." },
      { index: "03", title: "Mais velocidade", body: "O lead recebe resposta no timing em que ainda existe intenção de contratar." },
      { index: "04", title: "Mais controle", body: "Fica mais claro o que está funcionando, o que está travando e onde agir." },
      { index: "05", title: "Mais escala", body: "O crescimento deixa de depender só do sócio estar pessoalmente em tudo." },
    ],
  },
  ai: {
    eyebrow: "Tecnologia com critério",
    title: "Tecnologia entra para apoiar o atendimento, não para virar protagonista da marca.",
    body: "A IA faz sentido quando melhora triagem, follow-up, velocidade de resposta e organização do atendimento — sem parecer robótica nem quebrar a experiência do potencial cliente.",
    closing: "IA humanizada não é efeito especial. É operação melhor desenhada.",
  },
  differentials: {
    title: "Por que isso é diferente de contratar uma agência genérica.",
    items: [
      { title: "Especialização jurídica", body: "A estratégia parte da realidade de escritórios de advocacia. Isso muda linguagem, qualificação, atendimento e processo comercial." },
      { title: "Diagnóstico antes de executar", body: "Não empurramos serviço. Primeiro entendemos onde está o problema." },
      { title: "Visão de ponta a ponta", body: "Não olhamos só para anúncios ou para atendimento. Olhamos para a jornada inteira." },
      { title: "Acompanhamento próximo", body: "O projeto precisa ter leitura real da operação, conversa direta e decisão rápida. Não apenas relatório bonito." },
      { title: "Tecnologia com critério", body: "Automação e IA entram para corrigir gargalo real, não para vender modernidade." },
      { title: "Conversa de negócio", body: "Nosso parâmetro é faturamento, previsibilidade e conversão. Não vaidade digital." },
    ],
  },
  objections: {
    title: "Antes de contratar, todo escritório precisa confiar em três coisas.",
    items: [
      { objection: "Já tentei marketing antes e não funcionou.", response: "Faz sentido. Em muitos casos, o problema não era falta de ação. Era falta de diagnóstico. Quando ninguém sabe por que algo falhou, a tendência é repetir o mesmo erro com outro fornecedor." },
      { objection: "Não sei se isso funciona para o meu nicho jurídico.", response: "Não existe estratégia jurídica de copiar e colar. A jornada de compra muda conforme a área, o ticket, a urgência e o tipo de cliente que o escritório quer atrair." },
      { objection: "Não quero uma IA que pareça robô para os meus clientes.", response: "A tecnologia precisa proteger a experiência, não empobrecer a relação. O objetivo é responder melhor, qualificar melhor e organizar melhor o atendimento." },
    ],
  },
  faq: {
    title: "Perguntas frequentes",
    items: [
      { q: "Vocês trabalham com qualquer área do Direito?", a: "Não necessariamente da mesma forma. A estratégia precisa respeitar o tipo de demanda, o perfil do cliente e a forma como a decisão de contratar acontece em cada contexto." },
      { q: "O que acontece no diagnóstico?", a: "O diagnóstico identifica onde o escritório está perdendo receita hoje e qual parte da operação precisa ser corrigida primeiro." },
      { q: "Isso substitui o marketing que já fazemos?", a: "Nem sempre. Em muitos casos, o problema não é substituir tudo, e sim corrigir o elo que está vazando resultado." },
      { q: "Em quanto tempo começa a dar resultado?", a: "Depende do ponto de partida, da velocidade de implementação e da qualidade da operação comercial. Evitamos promessa fechada sem contexto." },
      { q: "Quem acompanha o projeto?", a: "O ideal é que a relação seja próxima, com leitura real de operação e não apenas envio de relatório." },
    ],
  },
  finalCTA: {
    title: "O próximo passo não é aumentar o ruído. É diagnosticar o gargalo certo.",
    body: "Se hoje você sente que a receita depende demais de indicação, que o atendimento perde lead, ou que o comercial ainda funciona mais no improviso do que no método, vale começar pelo diagnóstico.",
    cta: { primary: "Agendar diagnóstico", secondary: "Falar com a equipe" },
    micro: "Conversa objetiva. Sem pacote empurrado. Sem promessa fácil.",
  },
};
```

---

## 12. Esqueleto da `page.tsx`

```tsx
// app/page.tsx
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/sections/Hero";
import { Credibility } from "@/components/landing/sections/Credibility";
import { Pain } from "@/components/landing/sections/Pain";
import { Method } from "@/components/landing/sections/Method";
import { Operation } from "@/components/landing/sections/Operation";
import { AISection } from "@/components/landing/sections/AISection";
import { Differentials } from "@/components/landing/sections/Differentials";
import { Objections } from "@/components/landing/sections/Objections";
import { FAQ } from "@/components/landing/sections/FAQ";
import { FinalCTA } from "@/components/landing/sections/FinalCTA";
import { Footer } from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Credibility />
        <Pain />
        <Method />
        <Operation />
        <AISection />
        <Differentials />
        <Objections />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
```

---

## 13. Guardrails finais — checklist de QA visual

Antes de marcar a landing como pronta, verificar:

- [ ] Hero usa tipografia gigante (clamp até 132px) com `<span class="strike">` no "Mais marketing"
- [ ] Chevron ciano aparece no canto direito do hero, sem competir com texto no mobile
- [ ] CTA primário do hero é **pill** (`pill={true}`) — único lugar onde pill é usado em CTA grande
- [ ] Eyebrow tem o quadrado ciano à esquerda (não bullet redondo)
- [ ] `<DiagnosticFlow>` aparece no método, não no hero
- [ ] Há **apenas uma seção dark** (AI), além do footer
- [ ] Ciano nunca preenche fundo grande
- [ ] Sem roxo/rosa em lugar algum
- [ ] Sem 3D, sem neon de borda, sem glassmorphism em fundo claro
- [ ] FAQ usa `<details>` nativo, abre/fecha sem JS
- [ ] Mobile: chevron com `opacity` reduzida ou escondido se quebrar layout
- [ ] Container nunca passa de 1240px
- [ ] Headlines em pt-BR sem hyphen automático ruim — quebras manuais com `<br />` no hero
- [ ] `prefers-reduced-motion` zera animações do `vm-pulse` e do hover translateY
- [ ] Wordmark "variant" sempre bold (700), "midia" sempre extralight (200)
- [ ] Logo SVG inline — não baixar PNG
- [ ] Nenhum claim sem prova (sem "ROI em 45 dias", sem "+300 escritórios")

---

## 14. Comandos de bootstrap (Next.js)

```bash
# instalar
npx create-next-app@latest variant-media --typescript --tailwind --app --no-src-dir --import-alias "@/*"
cd variant-media

# deps
npm i clsx tailwind-merge lucide-react

# fontes — já vêm via next/font, sem npm install adicional

# rodar
npm run dev
```

Após bootstrap:

1. Substituir `tailwind.config.ts` pelo conteúdo da seção `3.1`.
2. Substituir `app/globals.css` pelo conteúdo da seção `3.2`.
3. Configurar fontes em `app/layout.tsx` (seção `2.2`).
4. Criar arquivos da seção `10` na ordem listada.
5. Colar copy de `lib/content.ts` (seção `11`).
6. Implementar seções na ordem do `5.1` — começar por `Hero`, `Method` e `AISection` (os três que têm visuais signature).
7. Validar com checklist `13`.

---

## 15. Notas finais para o agente

- Quando em dúvida entre dois caminhos, escolher o **mais sóbrio**. Esta marca falha por excesso, não por falta.
- Não criar variações de cores além das listadas.
- Não criar tamanhos de fonte além das classes `vm-display`, `vm-h1`, `vm-h2`, `vm-h3`, `vm-lead`, `vm-mono-label`. Texto corrido usa Tailwind padrão (`text-[15px]`, `text-base`, etc.).
- Não usar Framer Motion para esta landing. CSS resolve.
- Não adicionar bibliotecas além de `clsx`, `tailwind-merge`, `lucide-react`.
- Comentar no código apenas o necessário. Código limpo é a documentação.
- O HTML de referência visual (`design-system-reference.html`) é apoio — não é o código a copiar. O código a copiar está neste markdown.

---

**Fim do documento.**
