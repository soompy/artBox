# MomentTune ArtBox Design System

ArtBox 디자인 시스템은 모티가 주인공인 장면을 차분하고 아름답고 접근 가능하게 보여 주기 위해 존재합니다.

> 작품 장면은 **따뜻한 종이톤**이 기본입니다(브리프 §3-1). 아래 다크 토큰은 기존 갤러리 화면용이며, 종이톤 토큰은 빌드 손보기(브리프 §5-2) 때 이 문서에 추가합니다.

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

> **보류(PARK)** — 보류한 감정 기능 카테고리([`parked/README.md`](parked/README.md))에 묶인 색입니다. 모티 작품에는 쓰지 않습니다.

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
- title, 공간, duration, 손짓 종류를 표시합니다.

## Artwork Layout

Artwork는 full viewport layout을 기본으로 합니다.

```txt
ArtworkShell
  Canvas or rendering layer
  Top controls
  Optional metadata panel
  Interaction layer
  Ending screen
```

## Gallery Layout

입구(`/moti/…`)에서는 갤러리 홈을 쓰지 않습니다. 링크는 작품 장면으로 바로 열립니다(브리프 §5-2).

## Dark Theme

Dark theme은 기존 갤러리 화면용입니다. 모티 작품 장면의 기본값이 아닙니다.

```css
[data-theme="dark"] {
  --background: #05070a;
  --surface: rgba(15, 23, 42, 0.72);
  --text-primary: #f8fafc;
}
```

## Light Theme

Light theme은 모티 작품의 끝 화면과 컨트롤에 사용합니다(종이톤 장면 위).

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

Gradient는 장면의 톤과 일치해야 합니다.

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
