# ArtBox Artwork Schema

An Artwork is an Interactive Wellness Content Unit.

It must include creative metadata, emotional intent, recommendation metadata, runtime configuration, accessibility requirements, and analytics settings.

## TypeScript Schema

```ts
export type Emotion =
  | "calm"
  | "anxious"
  | "tired"
  | "stressed"
  | "sad"
  | "lonely"
  | "focused"
  | "distracted"
  | "energized"
  | "creative"
  | "sleepy";

export type InteractionType =
  | "passive"
  | "touch"
  | "mouse_move"
  | "scroll"
  | "breathing"
  | "drawing"
  | "audio_reactive"
  | "time_based";

export type AnimationEngine =
  | "canvas_2d"
  | "webgl"
  | "three"
  | "p5"
  | "framer_motion"
  | "gsap"
  | "hybrid";

export interface ArtworkSchema {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  status: "draft" | "active" | "paused" | "archived";
  version: string;

  emotion: Emotion[];
  sourceEmotion: Emotion[];
  targetEmotion: Emotion[];
  emotionalGoal: string;
  expectedFeelingAfter: string;

  stress_level: { min: number; max: number; ideal: number };
  focus_level: { min: number; max: number; ideal: number };
  sleep_level: { min: number; max: number; ideal: number };
  energy_level?: { min: number; max: number; ideal: number };

  color_palette: {
    primary: string;
    secondary: string;
    accent?: string;
    background: string;
    text?: string;
  };

  duration: {
    defaultSeconds: number;
    minSeconds?: number;
    maxSeconds?: number;
  };

  interaction_type: InteractionType[];
  primaryInteraction: InteractionType;
  difficulty: 1 | 2 | 3 | 4 | 5;

  animation_engine: AnimationEngine;
  componentPath: string;
  fallbackComponentPath?: string;

  shader?: {
    enabled: boolean;
    fragmentPath?: string;
    vertexPath?: string;
    uniforms?: Record<string, unknown>;
  };

  audio: {
    enabled: boolean;
    required: boolean;
    type?: "ambient" | "music" | "binaural" | "reactive" | "synth";
    source?: string;
    volumeDefault?: number;
  };

  thumbnail: string;
  cover: string;
  tags: string[];

  recommendation: {
    baseWeight: number;
    emotionMatchWeight: number;
    contextWeight: number;
    personalizationWeight: number;
    freshnessWeight: number;
    recommendedFor: string[];
    notRecommendedFor?: string[];
    bestTimeOfDay?: string[];
    weatherFit?: string[];
    repeatCooldownHours?: number;
    priorityBoost?: number;
  };

  accessibility: {
    reducedMotionSupported: boolean;
    soundOptional: boolean;
    keyboardSupported: boolean;
    mobileOptimized: boolean;
    webglFallback: boolean;
  };

  performance: {
    estimatedLoadWeight: "low" | "medium" | "high";
    requiresWebGL: boolean;
    targetFPS: 30 | 60;
    maxParticles?: number;
  };

  analytics: {
    trackCompletion: boolean;
    trackInteraction: boolean;
    trackMoodBeforeAfter: boolean;
    trackAudioUsage: boolean;
    trackDuration: boolean;
  };

  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}
```

## Required MVP Fields

- `title`
- `slug`
- `description`
- `sourceEmotion`
- `targetEmotion`
- `stress_level`
- `focus_level`
- `sleep_level`
- `color_palette`
- `duration`
- `interaction_type`
- `difficulty`
- `animation_engine`
- `audio`
- `thumbnail`
- `cover`
- `tags`
- `recommendation`
- `createdAt`
- `updatedAt`
