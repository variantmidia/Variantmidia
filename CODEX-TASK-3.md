# TASK 3 — Polish refinements: Credibility, Objections, FAQ, FinalCTA

## Context
This is a Next.js 14 landing page for a law firm marketing agency. The Hero and Operation sections already have rich microinteractions. The remaining sections (Credibility, Objections, FAQ, FinalCTA) feel static in comparison and need subtle polish to match the site's "breathing" visual tone. These are small, targeted CSS/JSX tweaks — not new components.

## Files to modify
1. `components/landing/PrincipleCard.tsx` — Credibility cards hover enhancement
2. `components/landing/DialogueExchange.tsx` — Objections separator + viewport entry
3. `components/landing/FAQItem.tsx` — Accordion animation upgrade
4. `components/landing/sections/FinalCTA.tsx` — CTA pulse glow
5. `app/globals.css` — New keyframes and utility classes

## Files to NOT touch
- Any Hero file or `vm-chevron-*` keyframes
- `components/landing/TriageChatAnimation.tsx`
- `components/landing/sections/Operation.tsx`
- `lib/content.ts`
- The 4 new Viz components from Task 2

---

## 1. Credibility — PrincipleCard hover line

**File**: `components/landing/PrincipleCard.tsx`

**Current state**: The card already has a left cyan border that grows on hover (`group-hover:top-0 group-hover:bottom-0` on a 2px absolute span). This is good but the card body has no other visual response.

**Change**: Add a subtle horizontal cyan line below the `<h3>` that scales from 0 to 100% on hover — matching the pattern used in `BenefitTile.tsx` line 46:

```tsx
<div
  aria-hidden="true"
  className="mt-3 h-px w-10 origin-left scale-x-0 bg-vm-cyan-deep transition-transform duration-slow ease-vm-out group-hover:scale-x-100"
/>
```

Insert this `<div>` right after the `<h3>` tag (before the `<p>` tag) in `PrincipleCard.tsx`.

That's the only change for this component. Do NOT modify the existing left-border behavior.

---

## 2. Objections — Separator line + viewport reveal

**File**: `components/landing/DialogueExchange.tsx`

**Current state**: Each exchange has a `border-b border-[color:var(--vm-line)]` separator and CSS entry animations (one-shot, not scroll-triggered). The animations fire on page load, not on scroll.

**Changes**:

### 2a. Vertical separator between client quote and VM response
Add a thin vertical line between the two dialogue blocks that lights up cyan on hover:

```tsx
{/* Between vm-dialogue-client and vm-dialogue-vm divs */}
<div
  className="mx-auto my-4 h-8 w-px bg-vm-line transition-colors duration-300 ease-vm-out group-hover:bg-vm-cyan-deep"
  aria-hidden="true"
/>
```

For this to work, add `group` to the parent `<article>` className.

### 2b. Viewport-triggered reveal
The current CSS animations fire immediately on load. Instead, they should trigger when the exchange enters the viewport. The project already has `useInView` at `@/lib/hooks/useInView`.

However, since `DialogueExchange` is rendered inside a `.map()` in `Objections.tsx`, the simplest approach is:

**In `components/landing/sections/Objections.tsx`**: wrap the `.map()` container `<div>` with `useInView` and add `in-view` class conditionally (same pattern as Operation.tsx). Then change the dialogue animations from immediate CSS animations to the `data-reveal` / `in-view` pattern.

**In `components/landing/DialogueExchange.tsx`**: Replace the `<style>` block with class-based transitions that respond to `.in-view` ancestor:

```css
/* In globals.css */
.dialogue-client-reveal {
  opacity: 0;
  transform: translateX(-12px);
}

.in-view .dialogue-client-reveal {
  opacity: 1;
  transform: translateX(0);
  transition:
    opacity 500ms var(--vm-ease-out) var(--delay),
    transform 500ms var(--vm-ease-out) var(--delay);
}

.dialogue-vm-reveal {
  opacity: 0;
  transform: translateX(12px);
}

.in-view .dialogue-vm-reveal {
  opacity: 1;
  transform: translateX(0);
  transition:
    opacity 500ms var(--vm-ease-out) var(--delay),
    transform 500ms var(--vm-ease-out) var(--delay);
}
```

Then in `DialogueExchange.tsx`:
- Remove the entire `<style>` block (inline keyframes)
- Replace `vm-dialogue-client` class with `dialogue-client-reveal`
- Replace `vm-dialogue-vm` class with `dialogue-vm-reveal`
- Remove `vm-dialogue-avatar` class (no more separate avatar animation)
- Accept a `delay` prop (number in ms) and apply it as `style={{ "--delay": "${delay}ms" }}` on each animated element (client gets `delay`, vm gets `delay + 200`).

In `Objections.tsx`:
- Import and use `useInView`
- Add `ref` and `cn(inView && "in-view")` to the container div
- Pass `delay={index * 150}` to each `DialogueExchange`

**Add `prefers-reduced-motion` rules** in globals.css:
```css
@media (prefers-reduced-motion: reduce) {
  .dialogue-client-reveal,
  .dialogue-vm-reveal {
    opacity: 1;
    transform: none;
  }

  .in-view .dialogue-client-reveal,
  .in-view .dialogue-vm-reveal {
    transition: none;
  }
}
```

---

## 3. FAQ — Accordion animation upgrade

**File**: `components/landing/FAQItem.tsx`

**Current state**: The icon already rotates 45deg via `group-open:rotate-45`. The panel opens with `max-height: 0 → max-height: 800px` transition. This works but the `max-height` technique causes uneven timing (fast open, slow close for short content).

**Changes**:

### 3a. Icon transition
The icon button already has `transition duration-default ease-vm-ease` and `group-open:rotate-45`. Add explicit transform transition to make it smoother:

On the `<span>` wrapping the Plus icon (the one with `aria-hidden="true"`), ensure the className includes:
```
transition-transform duration-[240ms] ease-vm-out
```
Replace the existing `transition duration-default ease-vm-ease` with this more specific transition. Keep all other classes (`group-open:rotate-45`, `group-open:bg-vm-cyan`, etc.).

### 3b. Panel animation — grid-template-rows technique
Replace the current `max-h-0` / `max-h-[800px]` approach with the modern CSS grid technique:

Change the panel `<div>` from:
```tsx
<div className="grid max-h-0 overflow-hidden transition-[max-height] duration-[350ms] ease-vm-out group-open:max-h-[800px]">
```

To:
```tsx
<div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-[350ms] ease-vm-out group-open:grid-rows-[1fr]">
  <div className="overflow-hidden">
    <p className="...">...</p>
  </div>
</div>
```

Note: the `<p>` content needs to be wrapped in an extra `<div className="overflow-hidden">` for the `grid-rows-[0fr]` technique to work. The outer div transitions `grid-template-rows`, the inner div has `overflow: hidden` to clip content.

---

## 4. FinalCTA — Breathing pulse on primary CTA

**File**: `components/landing/sections/FinalCTA.tsx`

**Current state**: The cyan CTA button has `shadow-vm-cyan` and hover states but no ambient animation. It feels flat compared to the hero.

**Changes**:

### 4a. Add a breathing box-shadow pulse
In `app/globals.css`, add a new keyframe:

```css
@keyframes vm-cta-breathe {
  0%, 100% {
    box-shadow: 0 8px 28px -8px rgba(22,212,232,0.35);
  }
  50% {
    box-shadow: 0 8px 32px -6px rgba(22,212,232,0.55);
  }
}
```

Add a utility class:
```css
.vm-cta-breathe {
  animation: vm-cta-breathe 3.5s ease-in-out infinite;
}
```

In `FinalCTA.tsx`, add `className="vm-cta-breathe"` to the primary `<Link>` wrapper (the one wrapping the cyan Button), or better, to the `<Button>` component via its `className` prop:

```tsx
<Button size="lg" variant="cyan" withArrow className="vm-cta-breathe">
```

### 4b. Reduced motion
```css
@media (prefers-reduced-motion: reduce) {
  .vm-cta-breathe {
    animation: none;
  }
}
```

The breathing should be very subtle — never stronger than the hero's trail animation. The keyframe values above are intentionally close (0.35 → 0.55 opacity on the shadow) to keep it gentle.

---

## Constraints
- Zero new dependencies. No framer-motion, no GSAP.
- Only use existing CSS variables — do NOT invent new color values.
- Only animate `transform`, `opacity`, `box-shadow`, and `filter` in keyframes. Never `width`, `height`, `top`, `left`, `margin` on infinite loops.
- TypeScript strict mode.
- All decorative elements get `aria-hidden="true"`.
- Add `prefers-reduced-motion: reduce` rules for every new animation.
- Do NOT touch Hero files, Operation.tsx, TriageChatAnimation.tsx, or any Viz component.

## Expected result
When viewed in the browser at desktop >= 1280px:
1. **Credibility cards**: on hover, a small cyan line draws under the title (matching Operation card behavior), complementing the existing left-border growth.
2. **Objections**: exchanges fade in from left/right as they enter the viewport (not on page load). A thin vertical separator between quote and response lights up cyan on hover.
3. **FAQ**: the Plus icon rotates smoothly to X on open. The answer panel expands/collapses with consistent, natural timing (no max-height lag). The open/close feels snappy and even.
4. **FinalCTA**: the primary cyan button has a very subtle breathing glow — a slow pulse in box-shadow that draws the eye without feeling aggressive. On reduced-motion, the glow is static.

Overall, the bottom half of the page now has the same level of microinteraction polish as the top half, creating a cohesive, high-end feel throughout.
