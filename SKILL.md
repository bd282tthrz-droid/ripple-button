---
name: animated-ripple
description: Use when adding a Material Design 3 style press ripple to a Button, Card, ListItem, or any other interactive element in a React project. Triggers: "Ripple", "加波纹/涟漪效果", "button press animation", "Material ripple", "wave ripple on click", "reuse the ripple component". Also use when the user references the animated-ripple component, asks to copy it into another project, or to give a button/keyboard-accessible press feedback. Do NOT use for full-page transitions, route animations, or drag/gesture physics — those are animation domains, not press feedback.
version: 0.1.0
---

# AnimatedRipple

A self-contained, keyboard-accessible Material Design 3 ripple layer for React, built on `framer-motion`. Drop it inside any interactive element to get press feedback on both click and Enter/Space keyboard activation.

## When to use

- Adding press/click feedback to a Button, Card, list row, table row, sidebar item.
- Replacing a static `:active` state with a real animated ripple.
- The user asks to bring this component into another project.

## When NOT to use

- Full-page or route transitions, drag/gesture physics (use an animation skill).
- Native HTML elements that already render their own ripple (e.g. `<button>` inside HeroUI/MUI).

## Install & copy

The component ships as **two files in one folder** (`components/`), importing each other by relative path. No path aliases, no internal imports beyond that. One external dependency:

```
npm i framer-motion
```

Copy the `components/` folder (both `animated-ripple.tsx` and `use-ripple.ts`) into the target project's `src/components/`. That is the whole install.

## Usage

`<AnimatedRipple />` must be a **direct child** of the element you want the feedback on, and that parent MUST be `position: relative` with `overflow: hidden`:

```tsx
import AnimatedRipple from "@/components/animated-ripple";

const Button = () => (
  <button
    type="button"
    className="relative overflow-hidden rounded-lg bg-blue-600 px-6 py-3 text-white"
  >
    Confirm
    <AnimatedRipple />
  </button>
);
```

Constraints (non-negotiable):
- Parent needs `relative` — the ripple layer is `absolute inset-0`.
- Parent needs `overflow-hidden` — otherwise the ripple bleeds past the rounded corners. The layer inherits the parent's radius via `rounded-[inherit]`.
- Keyboard ripple needs the parent to be focusable (a real `button`, `a`, or `tabindex`).

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| disabled | `boolean` | `false` | Turn off ripple interaction entirely |
| duration | `number` | `800` | Animation duration in ms |
| pressedOpacity | `number` | `0.35` | Peak opacity of a fresh ripple |
| color | `string` | `"currentColor"` | Ripple fill; inherits text color by default |

## Customization example

```tsx
<AnimatedRipple duration={500} pressedOpacity={0.25} color="#ffffff" />
```

## Notes

- Ripple expansion uses the Material 3 standard easing `cubic-bezier(0.4, 0, 0.2, 1)`.
- Each ripple is keyed by a unique id and auto-removed on animation completion — no manual cleanup.
- Pointer events are filtered to the primary button (`event.button !== 0` is ignored) to avoid right-click ripples.