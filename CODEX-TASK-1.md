# TASK 1 — Rewrite TriageChatAnimation with real consultation script

## Context
This is a Next.js 14 landing page for a law firm marketing agency. The Operation section has a bento grid of 5 benefit cards. Card 02 (array index 1) contains a chat animation component (`TriageChatAnimation`) that currently shows a short, generic 6-message dialogue with `white-space: nowrap` and `text-overflow: ellipsis` — messages get cut off and feel fake.

The goal is to replace it with a realistic, scrolling legal consultation chat between "Carlos" (client) and "Dra. Debora" (lawyer), with proper line-wrapping, typing dots, and infinite loop.

## Files to modify
1. `components/landing/TriageChatAnimation.tsx` — full rewrite
2. `app/globals.css` — replace the `.triage-*` block and its `@keyframes` (lines ~448–693), plus add new keyframes. Also update the `prefers-reduced-motion` section for triage (lines ~777–794).

## Files to NOT touch
- `components/landing/sections/Operation.tsx` — no changes needed, it already renders `<TriageChatAnimation />` at index 1
- `components/landing/BenefitTile.tsx` — no changes
- `lib/content.ts` — no changes
- Any Hero file or `vm-chevron-*` keyframes

## New message script
```ts
const messages = [
  { from: "user", text: "Ola, gostaria de falar com um advogado trabalhista" },
  { from: "bot",  text: "Oi! Me chamo Debora Borges, advogada trabalhista. Pra te ajudar melhor, qual seu nome e o que esta enfrentando?" },
  { from: "user", text: "Carlos. Trabalhei 1 ano sem registro e nao depositavam FGTS. Tenho direito?" },
  { from: "bot",  text: "Entendi, Carlos. Pode haver vinculo mesmo sem registro. Voce tinha horario fixo e chefe direto?" },
  { from: "user", text: "Sim, das 8h as 18h, com chefe direto." },
  { from: "bot",  text: "Recebia salario todo mes? Ainda esta na empresa?" },
  { from: "user", text: "Recebia no PIX. Sai faz 2 meses." },
  { from: "bot",  text: "Ha indicios de vinculo: registro retroativo, FGTS, ferias e 13o. Tem provas? WhatsApp, comprovantes, testemunhas?" },
  { from: "user", text: "Tenho conversas no WhatsApp e os PIX." },
  { from: "bot",  text: "Otimo. Pra analisar com precisao, vamos fazer uma reuniao online. Prefere manha ou tarde?" },
  { from: "user", text: "Tarde." },
  { from: "bot",  text: "Tenho terca 14h ou quarta 15h. Qual fica melhor?" },
  { from: "user", text: "Quarta as 15h." },
  { from: "bot",  text: "Marcado, Carlos! Quarta 15h via Google Meet. Vou te enviar o link em seguida." },
] as const;
```

## Behavior spec

### Chat mechanics
- Container: `flex flex-col justify-end overflow-hidden` with `position: absolute; inset: 0; padding: 16px; padding-top: 56px`.
- Messages enter from the bottom with `opacity: 0; translateY(8px)` → `opacity: 1; translateY(0)`.
- As new messages appear, older messages naturally push upward. The top mask gradient (`mask-image: linear-gradient(to bottom, transparent 0%, black 18%, black 100%)`) already exists — keep it so old messages fade out at the top.
- Messages can wrap to multiple lines (up to 3-4 lines per bubble). Remove `white-space: nowrap` and `text-overflow: ellipsis`.

### Typing indicator
- Bot messages show 3 animated dots for ~900ms before the text appears.
- Keep the existing `triage-dots` / `triage-dot` concept but adjust timing per message.
- User messages show text immediately (no dots).

### Timing
- Each message appears ~2.4s after the previous one.
- After the last message, hold for ~2.5s, then fade out the entire stack.
- Reset and loop infinitely.
- Total cycle: 14 messages * 2.4s + 2.5s pause + 1s fade = ~37s.

### Implementation approach (CSS-first, no JS animation libs)
- Use CSS `animation` with `--msg-delay` and `--msg-cycle` custom properties (same pattern as current code).
- Each `.triage-msg` gets `animation-delay: var(--msg-delay)` based on its index.
- The `@keyframes triage-msg-appear` needs recalculation: messages should stay visible much longer (since cycle is ~37s vs current ~13s), appearing at their delay point and fading out only near end of cycle.
- Dots hide and text shows with companion keyframes, timed so dots last ~900ms after the message bubble appears.

### Visual tokens (use ONLY existing CSS variables)
- User bubble: `background: var(--vm-line-cool); color: var(--vm-graphite); align-self: flex-end`
- Bot bubble: `background: var(--vm-cyan-tint); color: var(--vm-ink); border: 1px solid rgba(22,212,232,0.18); align-self: flex-start`
- Bubble: `padding: 8px 11px; border-radius: 10px; font-size: 11.5px; line-height: 1.45; max-width: 82%`
- Margin between messages: `margin-bottom: 6px`

### Accessibility
- Keep `aria-hidden="true"` on the container.
- `pointer-events: none` on the container.
- `@media (prefers-reduced-motion: reduce)`: show only the last 4 messages statically (no animation), hide dots. Match the pattern already in globals.css.

## Constraints
- Zero new dependencies. No framer-motion, no GSAP, no external libs.
- Only animate `transform` and `opacity` in keyframes (never width/height/margin on infinite loops for performance).
- The current dots keyframe animates `width` and `margin-right` — this is acceptable since it runs briefly per message, but if you can achieve the same with `transform: scaleX(0)` + `position: absolute`, prefer that.
- TypeScript strict mode — use `CSSProperties` cast for custom properties.
- Component must remain a named export: `export function TriageChatAnimation()`.

## Expected result
When viewed in the browser at desktop >= 1280px, the card 02 in the Operation bento grid shows a realistic legal consultation chat that:
1. Messages appear one by one from the bottom, with bot messages showing typing dots first.
2. Long messages wrap naturally within the bubble (no truncation).
3. Old messages scroll up and fade out behind the top gradient mask.
4. After the full conversation plays, everything fades out and the loop restarts seamlessly.
5. The animation feels like watching a real WhatsApp conversation in fast-forward.
6. On `prefers-reduced-motion`, shows 4 static messages with no animation.
