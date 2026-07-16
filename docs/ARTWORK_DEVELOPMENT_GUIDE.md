# ArtBox Artwork Development Guide

모든 새로운 Artwork는 shared interface를 구현하고 release checklist를 통과해야 합니다.

## New Content Self Check

새로운 콘텐츠를 만들 때마다 구현자는 먼저 아래 세 가지 질문에 답해야 합니다.

- [ ] 이 콘텐츠는 어떤 감정 상태를 위한 것인가?
- [ ] 사용자가 어떤 행동을 하게 되는가?
- [ ] MomentTune 추천 엔진이 언제 이 콘텐츠를 추천해야 하는가?

이 세 질문에 명확히 답하지 못하면 Artwork 구현을 시작하지 않습니다.

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

- [ ] `init()`을 구현했습니다.
- [ ] `destroy()`를 구현했습니다.
- [ ] `update(deltaTime)`을 구현했습니다.
- [ ] `pause()`를 구현했습니다.
- [ ] `resume()`을 구현했습니다.
- [ ] `resize(width, height)`를 구현했습니다.
- [ ] `dispose()`를 구현했습니다.
- [ ] 각 method는 여러 번 호출되어도 안전합니다.

## Recommendation Metadata Checklist

- [ ] MomentTune 추천 엔진이 이 콘텐츠를 추천해야 하는 상황을 설명했습니다.
- [ ] `baseWeight`
- [ ] `emotionMatchWeight`
- [ ] `contextWeight`
- [ ] `personalizationWeight`
- [ ] `freshnessWeight`
- [ ] `recommendedFor`
- [ ] 필요 시 `notRecommendedFor`
- [ ] `bestTimeOfDay`
- [ ] 관련 있는 경우 `weatherFit`
- [ ] `repeatCooldownHours`

## Emotional Metadata Checklist

- [ ] 이 콘텐츠가 대상으로 하는 감정 상태를 설명했습니다.
- [ ] source emotion
- [ ] target emotion
- [ ] emotional goal
- [ ] expected feeling after
- [ ] stress fit
- [ ] focus fit
- [ ] sleep fit
- [ ] 관련 있는 경우 energy fit

## Preview Checklist

- [ ] 사용자가 콘텐츠 안에서 하게 되는 주요 행동이 preview에서도 암시됩니다.
- [ ] thumbnail이 있습니다.
- [ ] cover가 있습니다.
- [ ] preview component가 있습니다.
- [ ] preview가 실제 감정 톤을 반영합니다.
- [ ] preview는 본편보다 가볍게 렌더링됩니다.
- [ ] preview는 큰 소리를 autoplay하지 않습니다.

## Mobile Checklist

- [ ] 320px 너비에서 작동합니다.
- [ ] touch를 지원합니다.
- [ ] hover에 의존하지 않습니다.
- [ ] orientation change를 처리합니다.
- [ ] control은 safe area 안에 있습니다.
- [ ] mobile에서 최소 30fps를 유지합니다.

## Accessibility Checklist

- [ ] sound optional
- [ ] reduced motion 지원
- [ ] 빠른 flashing 없음
- [ ] keyboard 또는 대체 control 지원
- [ ] pause 가능
- [ ] exit 가능
- [ ] WebGL fallback 가능

## Performance Score

최소 점수: 80 / 100

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

- [ ] New Content Self Check 3개 질문에 답했습니다.
- [ ] Interface 구현
- [ ] Recommendation metadata 존재
- [ ] Emotional metadata 존재
- [ ] Preview 존재
- [ ] Mobile support 확인
- [ ] Accessibility support 확인
- [ ] Performance score 80 이상
- [ ] `npm run build` 통과
- [ ] 기존 콘텐츠 정상 작동
