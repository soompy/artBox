# MomentTune ArtBox Design System

ArtBox 디자인 시스템은 차분하고 아름답고 접근 가능한 상호작용을 통해 감정 변화를 지원하기 위해 존재합니다.

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

- 한 화면에는 하나의 primary action만 둡니다.
- 모든 interaction은 부드러운 feedback을 가져야 합니다.
- hover가 유일한 interaction이면 안 됩니다.
- touch, mouse, keyboard state를 모두 고려합니다.

## Button

- 최소 touch target: 44px
- primary button은 핵심 행동에만 사용합니다.
- Pause, Sound, Exit는 icon button으로 제공합니다.
- 모든 button은 visible focus state를 가져야 합니다.

## Card

- card는 content entry에만 사용합니다.
- card 안에 card를 중첩하지 않습니다.
- border radius는 8px을 기본으로 합니다.
- title, emotional shift, duration, interaction type, difficulty를 표시합니다.

## Artwork Layout

Artwork는 full viewport layout을 기본으로 합니다.

```txt
ArtworkShell
  Canvas or rendering layer
  Top controls
  Optional metadata panel
  Interaction layer
  Feedback checkout
```

## Gallery Layout

Gallery는 emotion-first 탐색 구조를 사용합니다.

```txt
Emotional entry
Recommended content
Category sections
Content cards
```

## Dark Theme

Dark theme은 몰입형 경험의 기본값입니다.

```css
[data-theme="dark"] {
  --background: #05070a;
  --surface: rgba(15, 23, 42, 0.72);
  --text-primary: #f8fafc;
}
```

## Light Theme

Light theme은 daytime, nature, creativity 콘텐츠에 사용합니다.

```css
[data-theme="light"] {
  --background: #f8fafc;
  --surface: rgba(255, 255, 255, 0.84);
  --text-primary: #0f172a;
}
```

## Accessibility

- WCAG AA contrast
- reduced motion 지원
- sound optional
- WebGL fallback
- keyboard focus 지원
- 색상만으로 의미 전달 금지

## Glassmorphism

Glass는 supporting overlay와 control에만 사용합니다.

```css
:root {
  --glass-bg: rgba(15, 23, 42, 0.52);
  --glass-border: rgba(255, 255, 255, 0.14);
  --glass-blur: 20px;
}
```

## Gradient

Gradient는 감정 목적과 일치해야 합니다.

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
