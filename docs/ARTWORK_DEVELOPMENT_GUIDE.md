# ArtBox Artwork Development Guide

Every new Artwork must implement the shared interface and pass the release checklist.

## Artwork Interface

```ts
export interface Artwork {
  init(): void | Promise<void>;
  destroy(): void;
  update(deltaTime: number): void;
  pause(): void;
  resume(): void;
  resize(width: number, height: number): void;
  dispose(): void;
}
```

## Interface Checklist

- [ ] `init()` is implemented.
- [ ] `destroy()` is implemented.
- [ ] `update(deltaTime)` is implemented.
- [ ] `pause()` is implemented.
- [ ] `resume()` is implemented.
- [ ] `resize(width, height)` is implemented.
- [ ] `dispose()` is implemented.
- [ ] Methods are safe when called more than once.

## Recommendation Metadata Checklist

- [ ] `baseWeight`
- [ ] `emotionMatchWeight`
- [ ] `contextWeight`
- [ ] `personalizationWeight`
- [ ] `freshnessWeight`
- [ ] `recommendedFor`
- [ ] `notRecommendedFor` when needed
- [ ] `bestTimeOfDay`
- [ ] `weatherFit` when relevant
- [ ] `repeatCooldownHours`

## Emotional Metadata Checklist

- [ ] Source emotion
- [ ] Target emotion
- [ ] Emotional goal
- [ ] Expected feeling after
- [ ] Stress fit
- [ ] Focus fit
- [ ] Sleep fit
- [ ] Energy fit when relevant

## Preview Checklist

- [ ] Thumbnail exists.
- [ ] Cover exists.
- [ ] Preview component exists.
- [ ] Preview matches the emotional tone.
- [ ] Preview is lighter than the full artwork.
- [ ] Preview does not autoplay loud audio.

## Mobile Checklist

- [ ] Works at 320px width.
- [ ] Supports touch.
- [ ] Does not rely on hover.
- [ ] Handles orientation change.
- [ ] Keeps controls within safe areas.
- [ ] Maintains at least 30fps on mobile.

## Accessibility Checklist

- [ ] Sound optional.
- [ ] Reduced motion supported.
- [ ] No rapid flashing.
- [ ] Keyboard or alternate controls supported.
- [ ] Pause available.
- [ ] Exit available.
- [ ] WebGL fallback available.

## Performance Score

Minimum score: 80 / 100.

| Category | Points |
| --- | ---: |
| Initial load under 3s | 15 |
| Desktop FPS stable | 15 |
| Mobile FPS stable | 15 |
| No memory leak | 20 |
| Cleanup implemented | 15 |
| Lazy loading supported | 10 |
| Fallback supported | 10 |

## Final Merge Checklist

- [ ] Interface implemented.
- [ ] Recommendation metadata exists.
- [ ] Emotional metadata exists.
- [ ] Preview exists.
- [ ] Mobile support verified.
- [ ] Accessibility support verified.
- [ ] Performance score is 80 or higher.
- [ ] `npm run build` passes.
- [ ] Existing content still works.
