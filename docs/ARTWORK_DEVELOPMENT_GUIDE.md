# ArtBox Artwork Development Guide

모든 새로운 Artwork는 shared interface를 구현하고 release checklist를 통과해야 합니다.

## New Content Self Check

새로운 콘텐츠를 만들 때마다 구현자는 먼저 아래 세 가지 질문에 답해야 합니다.

- [ ] 어떤 공간에서 모티가 무엇을 즐기는 장면인가?
- [ ] 사용자는 어떤 손짓을 할 수 있는가?
- [ ] 끝 화면은 «쉴 곳 지도» 의 어떤 장소 종류로 이어지는가?

이 세 질문에 명확히 답하지 못하면 Artwork 구현을 시작하지 않습니다. 기준은 [`MOTI_CAFE_BRIEF.md`](MOTI_CAFE_BRIEF.md).

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

## Metadata Checklist

[`ARTWORK_SCHEMA.md`](ARTWORK_SCHEMA.md) 의 필수 필드를 채웁니다.

- [ ] `space` · `slug`(주소 `/moti/<slug>`)
- [ ] `scene.summary`(화면 읽기용 한 문장) · `scene.layers` · `scene.taps`
- [ ] `ending`(끝 문구 · 장소 제안 · 버튼 · App Store 캠페인 `ct`)
- [ ] `share`(한국어 OG 제목·설명·이미지)
- [ ] 감정 점수 · 목표 감정 · 추천 가중치 · 분석 설정을 넣지 않았습니다

## MomentTune 원칙 Checklist

브리프 §2 를 지킵니다.

- [ ] 비의료 — 화면·제목·설명·OG 어디에도 효능·감정 전환 문구가 없습니다
- [ ] 게이미피케이션 없음 — 점수 · 횟수 · 연속 · 보상 · 새로 열리는 것이 없습니다
- [ ] 모티는 쉬는 날을 즐기고 있습니다 — 지친 모티를 돌보는 구도 · 힘든 표정이 없습니다
- [ ] 개인정보 — 분석 스크립트 · 쿠키 · localStorage 기록 · 외부 폰트 호출이 없습니다. 링크에 상태·건강 값이 없습니다
- [ ] 안전 — 빠른 깜빡임 · 번쩍임 · 화면 진동이 없습니다

## Preview Checklist

- [ ] 사용자가 콘텐츠 안에서 하게 되는 주요 행동이 preview에서도 암시됩니다.
- [ ] thumbnail이 있습니다.
- [ ] cover가 있습니다.
- [ ] preview component가 있습니다.
- [ ] preview가 실제 장면의 톤을 반영합니다.
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
- [ ] Metadata Checklist 통과
- [ ] MomentTune 원칙 Checklist 통과
- [ ] Preview 존재
- [ ] Mobile support 확인
- [ ] Accessibility support 확인
- [ ] Performance score 80 이상
- [ ] `npm run build` 통과
- [ ] 기존 콘텐츠 정상 작동
