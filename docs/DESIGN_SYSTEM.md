# MomentTune ArtBox Design System

The ArtBox design system exists to support emotional change through calm, beautiful, accessible interaction.

## Color Token

```css
:root {
  --color-black: #05070a;
  --color-white: #f8fafc;
  --color-surface-0: #05070a;
  --color-surface-1: #0b1018;
  --color-surface-2: #121a26;
  --color-text-primary: #f8fafc;
  --color-text-secondary: #cbd5e1;
  --color-text-muted: #94a3b8;
  --color-border-soft: rgba(255, 255, 255, 0.12);
}
```

## Emotional Colors

```css
:root {
  --emotion-calm: #8ec5ff;
  --emotion-focus: #a7f3d0;
  --emotion-breathing: #b8e0d2;
  --emotion-sleep: #a5b4fc;
  --emotion-creativity: #f9a8d4;
  --emotion-nature: #86efac;
  --emotion-meditation: #c4b5fd;
  --emotion-drawing: #fdba74;
  --emotion-music: #67e8f9;
  --emotion-generative: #fde68a;
  --emotion-energy: #f97316;
  --emotion-comfort: #fbcfe8;
}
```

## Typography

- Display: Pretendard, Inter, sans-serif
- Body: Pretendard, Inter, sans-serif
- Mono: SFMono-Regular, Consolas, monospace

Scale:

- 12px metadata
- 14px labels
- 16px body
- 22px card title
- 28px section title
- 36px content title
- 48px display

## Spacing

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;
}
```

## Motion

```css
:root {
  --ease-calm: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-focus: cubic-bezier(0.4, 0, 0.2, 1);
  --duration-fast: 180ms;
  --duration-normal: 300ms;
  --duration-slow: 600ms;
  --duration-breath: 4000ms;
}
```

## Interaction

- One primary action per screen.
- All interactions should have gentle feedback.
- Hover must never be the only interaction.
- Touch, mouse, and keyboard states must be considered.

## Button

- Minimum touch target: 44px.
- Primary button for the main action.
- Icon buttons for Pause, Sound, Exit.
- Buttons must have visible focus states.

## Card

- Use cards for content entries only.
- Do not nest cards.
- Border radius: 8px.
- Show title, emotional shift, duration, interaction type, and difficulty.

## Artwork Layout

Artwork content should use a full viewport layout:

```txt
ArtworkShell
  Canvas or rendering layer
  Top controls
  Optional metadata panel
  Interaction layer
  Feedback checkout
```

## Gallery Layout

Gallery should be emotion-first:

```txt
Emotional entry
Recommended content
Category sections
Content cards
```

## Dark Theme

Dark theme is default for immersion.

```css
[data-theme="dark"] {
  --background: #05070a;
  --surface: rgba(15, 23, 42, 0.72);
  --text-primary: #f8fafc;
}
```

## Light Theme

Light theme supports daytime, nature, and creativity content.

```css
[data-theme="light"] {
  --background: #f8fafc;
  --surface: rgba(255, 255, 255, 0.84);
  --text-primary: #0f172a;
}
```

## Accessibility

- WCAG AA contrast.
- Reduced motion support.
- Sound optional.
- WebGL fallback.
- Keyboard focus support.
- Color is never the only indicator.

## Glassmorphism

Use glass only for supporting overlays and controls.

```css
:root {
  --glass-bg: rgba(15, 23, 42, 0.52);
  --glass-border: rgba(255, 255, 255, 0.14);
  --glass-blur: 20px;
}
```

## Gradient

Gradients must match emotional purpose.

```css
:root {
  --gradient-calm: linear-gradient(135deg, #8ec5ff 0%, #b8e0d2 100%);
  --gradient-focus: linear-gradient(135deg, #a7f3d0 0%, #67e8f9 100%);
  --gradient-sleep: linear-gradient(135deg, #111827 0%, #312e81 100%);
  --gradient-energy: linear-gradient(135deg, #f97316 0%, #fde68a 100%);
}
```

## Animation Duration

| Use Case | Duration |
| --- | ---: |
| Button hover | 100-180ms |
| Card hover | 180-240ms |
| Modal open | 240-300ms |
| Content entry | 600-900ms |
| Calm loop | 3000-8000ms |
| Breathing loop | 4000-6000ms |
