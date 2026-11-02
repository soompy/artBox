# ArtBox Artwork Schema

Artwork 는 «모티가 한 공간을 즐기는 2분짜리 장면» 입니다.

메타데이터는 장면을 열고 · 공유하고 · 앱으로 잇는 데 필요한 값만 담습니다. **감정 점수 · 목표 감정 · 기분 목표 값 · 추천 가중치 · 분석 설정을 넣지 않습니다**(브리프 §2-4 · §5-3).

## TypeScript Schema

```ts
/** «쉴 곳 지도» 의 장소 종류 — 끝 화면이 이 종류로 이어진다 */
export type Space =
  | "cafe"
  | "exhibition"
  | "walk"
  | "bookstore"
  | "park"
  | "market";

export type Tap = "window" | "mug" | "moti" | "outside" | string;

export type AnimationEngine = "canvas_2d" | "webgl" | "hybrid";

export interface ArtworkSchema {
  id: string;
  slug: string; // 주소 `/moti/<slug>` — 예: "cafe"
  space: Space;
  title: string; // «모티의 쉬는 날 · 창가 자리»
  description: string; // 한 일만 말한다 — 효능 문구 ✗
  status: "draft" | "active" | "paused" | "archived";
  version: string;

  scene: {
    summary: string; // 화면 읽기용 한 문장
    layers: string[]; // 그림 레이어 파일 — 예: "cafe-bg.webp"
    taps: Tap[]; // 두드리면 반응하는 곳
  };

  duration: {
    seconds: 120;
  };

  animation_engine: AnimationEngine;
  componentPath: string;
  fallbackComponentPath?: string;

  audio: {
    enabled: boolean;
    defaultOn: false; // 소리는 기본 꺼짐
    label?: string; // «빗소리»
    source?: string; // 라이선스·출처를 함께 기록
  };

  ending: {
    message: string; // «잠깐 같이 앉아 있었네요»
    suggestion: string; // «이번 주말, 이런 카페 하나 어때요?»
    ctaLabel: string; // «쉴 곳 지도에서 카페 보기»
    appStoreCampaign: string; // ct 값 — 예: "artbox_cafe"
  };

  share: {
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
  };

  accessibility: {
    reducedMotionSupported: boolean;
    soundOptional: true;
    keyboardSupported: boolean;
    screenReaderSummary: boolean;
    mobileOptimized: boolean;
    webglFallback: boolean;
  };

  performance: {
    targetFirstLoadKB: number; // gzip 기준 — «점심의 틈» 은 156kB
    requiresWebGL: boolean;
    targetFPS: 30 | 60;
  };

  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}
```

## Required MVP Fields

- slug
- space
- title
- description
- scene
- duration
- animation_engine
- audio
- ending
- share
- accessibility
- createdAt
- updatedAt

## 넣지 않는 것

- 감정 태그 · source/target emotion · emotional goal · expected feeling
- stress · focus · sleep · energy 점수
- 추천 가중치(recommendation weight 등)
- 분석 설정(`trackMoodBeforeAfter` 등)

이전 스키마는 [`parked/ARTWORK_SCHEMA_v1.md`](parked/ARTWORK_SCHEMA_v1.md) 에 보류했습니다.
