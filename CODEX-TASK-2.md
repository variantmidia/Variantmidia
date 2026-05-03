# TASK 2 — Ambient visualizations for the 4 empty Operation benefit cards

## Context
This is a Next.js 14 landing page. The Operation section has a bento grid of 5 benefit cards (`BenefitTile` component). Card 02 (index 1) already has a chat animation. The other 4 cards (01, 03, 04, 05) are visually empty below their text — they need subtle, thematic, CSS-only ambient animations to complete the bento grid's visual promise.

**Important**: Card 01 (index 0) is the **featured** card with `bg-vm-panel` (dark background `#0E1620`) and light text. Its visualization must use light/cyan colors that contrast against dark. Cards 03, 04, 05 have `bg-vm-surface` (white `#FFFFFF`) and dark text.

## Grid layout reference
```
| Card 01 (featured, 2col, 2row) | Card 02 (chat, 1col, 2row) |
|                                | Card 03 (1col, 1row)       |
| Card 04 (1col, 1row)          | Card 05 (1col, 1row)       |
```

Wait — the actual grid is `lg:grid-cols-3 lg:grid-rows-3` with:
- Card 01: `lg:col-span-2 lg:row-span-2` (featured, dark)
- Card 02: `lg:col-span-1 lg:row-span-2` (chat)
- Card 03: `lg:col-span-1 lg:row-span-1`
- Card 04: `lg:col-span-1 lg:row-span-1`
- Card 05: `lg:col-span-1 lg:row-span-1`

## Files to create
1. `components/landing/PredictabilityViz.tsx` (card 01 — "Mais previsibilidade")
2. `components/landing/SpeedViz.tsx` (card 03 — "Mais velocidade")
3. `components/landing/ControlViz.tsx` (card 04 — "Mais controle")
4. `components/landing/ScaleViz.tsx` (card 05 — "Mais escala")

## File to modify
1. `components/landing/sections/Operation.tsx` — import the 4 new components and render them conditionally by index inside the `.map()`, alongside the existing `TriageChatAnimation`:

```tsx
{index === 0 && <PredictabilityViz />}
{index === 1 && <TriageChatAnimation />}
{index === 2 && <SpeedViz />}
{index === 3 && <ControlViz />}
{index === 4 && <ScaleViz />}
```

2. `app/globals.css` — add new `.viz-*` prefixed styles and keyframes at the end of `@layer components` (before the closing `}`), plus `prefers-reduced-motion` rules.

## Files to NOT touch
- `components/landing/TriageChatAnimation.tsx`
- `components/landing/BenefitTile.tsx`
- `lib/content.ts`
- Any Hero files or `vm-chevron-*` keyframes

## Design specs for each visualization

### All visualizations share these rules:
- `position: absolute; bottom: 16px; left: 16px; right: 16px;` (lower portion of card, breathe from text)
- `pointer-events: none; aria-hidden="true"`
- Only animate `transform` and `opacity` (never width/height/top/left/margin)
- Base opacity ~0.85 so they don't compete with card text
- Volume ~60% of the chat animation — these are ambient, the chat is the hero
- Infinite loop, CSS-only, no JS animation libraries
- Use ONLY existing CSS variables: `--vm-cyan`, `--vm-cyan-deep`, `--vm-cyan-tint`, `--vm-line`, `--vm-line-cool`, `--vm-ink`, `--vm-muted`, `--vm-panel-line`, `--vm-panel-text`, `--vm-ease-out`

### Card 01 — PredictabilityViz — "Calendar pulse / recurring revenue"
**Background: DARK** (`bg-vm-panel` = `#0E1620`). Use light colors: `var(--vm-panel-line)` for grid, `var(--vm-cyan)` for fills.

- Grid of 6 columns x 4 rows of small squares (24 "days" representing ~6 months of consistent revenue).
- Each square: ~12px, gap ~4px, `border: 1px solid var(--vm-panel-line)`, `border-radius: 2px`.
- Loop animation: a wave of cyan fills the squares sequentially left-to-right, top-to-bottom using staggered `animation-delay`. Each square transitions from empty to `background: var(--vm-cyan-tint)` with `opacity: 0 → 1`.
- After all 24 fill, they pulse together once (subtle scale 1 → 1.04 → 1), then fade out and reset.
- Cycle: ~6s.
- Visual message: predictable, repeatable rhythm.

### Card 03 — SpeedViz — "Timeline / SLA"
**Background: LIGHT** (white). Use: `var(--vm-line)` for track, `var(--vm-cyan)` for pulse, `var(--vm-ink)` for text.

- Horizontal timeline with a thin line (`var(--vm-line)`, 1px) and 3 labeled nodes along it: "Lead", "Resposta", "Agenda".
- Nodes: small dots (6px) on the line, with mono labels below (font-size: 9px, `var(--vm-muted)`).
- A cyan pulse dot (8px, `var(--vm-cyan)`, with `box-shadow: 0 0 8px var(--vm-cyan)`) travels left-to-right along the line in ~1.2s, lighting each node as it passes (node transitions from `var(--vm-line)` to `var(--vm-cyan)` momentarily).
- Below the line: a mono counter `00:00:42` style that counts down from `01:30` to `00:00` — this can be a CSS animation cycling through a few fixed values (e.g., "01:30" → "00:45" → "00:12" → "00:00") using `content` in a pseudo-element or just showing the final "00:00" with a blink. Keep it simple — a few static steps via keyframes on `opacity` toggling between spans, NOT real JS counting.
- Cycle: ~4s.

### Card 04 — ControlViz — "Mini-dashboard / funnel bars"
**Background: LIGHT** (white). Use: `var(--vm-cyan-deep)` for bars, `var(--vm-line-cool)` for track, `var(--vm-muted)` for labels.

- 3 horizontal bars stacked vertically, representing funnel stages:
  - "Topo" → grows to 100%
  - "Meio" → grows to 62%
  - "Base" → grows to 28%
- Each bar: height 6px, `border-radius: 3px`, on a track of `var(--vm-line-cool)`.
- Mono labels (9px) to the left ("Topo", "Meio", "Base"), numeric values to the right ("100", "62", "28").
- Loop: bars grow from `scaleX(0)` to their target width with staggered delays (200ms apart). After 2.5s, the numeric values subtly flicker (opacity 1 → 0.5 → 1) suggesting live data.
- Cycle: ~5s.

### Card 05 — ScaleViz — "Network multiplication"
**Background: LIGHT** (white). Use: `var(--vm-cyan)` for central node, `var(--vm-line)` for connections, `var(--vm-cyan-deep)` for satellites.

- SVG-based: a central node (dot, 8px, `var(--vm-cyan)`, subtle glow via `filter: drop-shadow`) with 4 connection lines going to 4 satellite nodes at diagonal positions.
- Loop: satellites appear one by one (scale 0 → 1, 300ms each) with their connection line "drawing" from center outward (`stroke-dashoffset` animation on SVG line, or `scaleX` on a pseudo-element from `transform-origin: left`).
- After all 4 appear, everything pulses once together, then fades out and resets.
- Cycle: ~5s.

## Constraints
- Zero new dependencies.
- TypeScript strict mode.
- Each component is a named export (e.g., `export function PredictabilityViz()`).
- CSS classes prefixed with `.viz-` to avoid collisions.
- All decorative elements get `aria-hidden="true"`.
- `@media (prefers-reduced-motion: reduce)`: show the final/filled state statically — don't hide the viz, just remove animation.
- Performance: only `transform` and `opacity` in `@keyframes` for infinite loops.

## Expected result
When viewed at desktop >= 1280px, all 5 Operation benefit cards have visual content in their lower half:
1. Card 01 (dark, featured): a calm grid of squares filling with cyan in a wave pattern.
2. Card 02: the existing chat animation (untouched).
3. Card 03: a fast timeline pulse showing speed/SLA.
4. Card 04: funnel bars growing to show control/metrics.
5. Card 05: a network diagram expanding to show scale.

The visualizations are ambient and subtle (~60% visual weight of the chat). They don't compete with card text above. The grid bento feels alive and balanced — no card looks "empty" anymore. On `prefers-reduced-motion`, all vizs show their final static state.
