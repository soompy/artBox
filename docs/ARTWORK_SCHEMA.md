# ArtBox Artwork Schema

> 2026-11-02 고쳐 씀 — 정본은 [`MOTI_CAFE_BRIEF.md`](MOTI_CAFE_BRIEF.md). 그 전 스키마의 감정·상태 필드(`emotion` · `sourceEmotion` · `targetEmotion` · `emotionalGoal` · `expectedFeelingAfter` · `stress_level` · `focus_level` · `sleep_level` · `energy_level`) · `recommendation` 묶음 · `analytics` 묶음(`trackMoodBeforeAfter` 포함)은 [`PARKED.md`](PARKED.md) P-2 · P-4 로 뗐다.
> 이 문서는 **설계 문서**다. 실제 코드의 타입(`src/types/artwork.ts`)은 이번 정리에서 바꾸지 않았다(브리프 §5-3 카페 작품 틀에서 맞춘다).

Artwork 는 **모티가 한 공간을 즐기는 장면 한 점**입니다. 메타데이터에는 장면 · 주소 · 실행 · 접근성 · 성능 정보만 넣고, **감정 점수나 기분 목표 값은 넣지 않습니다**(브리프 §5-3).

## TypeScript Schema

```ts
/** MomentTune «쉴 곳 지도» 의 장소 종류와 같다 */
export type Place =
  | "cafe"
  | "exhibition"
  | "walk"
  | "bookstore"
  | "park"
  | "market";

export type InteractionType =
  | "passive"
  | "tap"
  | "time_based";

export type AnimationEngine =
  | "canvas_2d"
  | "webgl"
  | "hybrid";

export interface ArtworkSchema {
  id: string;
  /** 작품 주소 `momenttune.com/moti/<slug>` — 예: "cafe" */
  slug: string;
  /** 예: "모티의 쉬는 날 · 창가 자리" */
  title: string;
  /** 장면과 한 일만 적는다 — 효과를 약속하는 말 ✗(브리프 §2-1) */
  description: string;
  /** 화면 읽기용 장면 한 문장 */
  sceneAlt: string;
  place: Place;
  status: "draft" | "active" | "paused" | "archived";
  version: string;

  duration: {
    /** 카페 = 120 */
    defaultSeconds: number;
  };

  interaction_type: InteractionType[];
  /** 두드릴 수 있는 곳 — 예: ["window", "mug", "moti", "outside"] */
  tapTargets: string[];

  animation_engine: AnimationEngine;
  componentPath: string;
  fallbackComponentPath?: string;

  audio: {
    enabled: boolean;
    /** 항상 false — 소리는 선택 */
    required: false;
    /** 항상 false — 기본 꺼짐 */
    defaultOn: false;
    type?: "ambient";
    source?: string;
    /** 소리 파일 라이선스 · 출처 */
    license?: string;
  };

  endScreen: {
    /** 예: "잠깐 같이 앉아 있었네요" */
    message: string;
    /** 예: "이번 주말, 이런 카페 하나 어때요?" */
    invite: string;
    /** App Store 캠페인 링크 */
    ctaUrl: string;
    ctaLabel: string;
  };

  thumbnail: string;
  ogImage: string;

  accessibility: {
    reducedMotionSupported: boolean;
    soundOptional: boolean;
    keyboardSupported: boolean;
    mobileOptimized: boolean;
    webglFallback: boolean;
    /** 빠른 깜빡임 · 번쩍임 · 화면 진동 없음 */
    noFlashOrShake: boolean;
  };

  performance: {
    estimatedLoadWeight: "low" | "medium" | "high";
    requiresWebGL: boolean;
    targetFPS: 30 | 60;
  };

  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}
```

## 넣지 않는 것

- 감정 · 기분 · 스트레스 · 수면 · 집중 등 상태 값과 목표 값
- 추천 가중치 · 개인화 값
- 분석 · 추적 설정(재는 것은 서버 로그와 App Store 캠페인뿐 — 브리프 §6)

## Required MVP Fields

- slug
- title
- description
- sceneAlt
- place
- duration
- interaction_type
- tapTargets
- animation_engine
- audio
- endScreen
- thumbnail
- ogImage
- accessibility
- createdAt
- updatedAt
