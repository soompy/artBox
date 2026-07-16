# MomentTune ArtBox Recommendation Engine

ArtBox recommendations connect MomentTune signals to interactive content.

## Data Flow

```mermaid
flowchart TD
    A["Input"] --> A1["HR"]
    A --> A2["HRV"]
    A --> A3["Sleep"]
    A --> A4["Stress"]
    A --> A5["Mood"]
    A --> A6["Weather"]
    A --> A7["Time"]

    A1 --> B["Analysis"]
    A2 --> B
    A3 --> B
    A4 --> B
    A5 --> B
    A6 --> B
    A7 --> B

    B --> C["User State"]
    C --> C1["Current Emotion"]
    C --> C2["Energy"]
    C --> C3["Stress Load"]
    C --> C4["Recovery Need"]
    C --> C5["Context"]

    C --> D["Recommendation"]
    D --> D1["Emotion Match"]
    D --> D2["Context Fit"]
    D --> D3["Difficulty Fit"]
    D --> D4["Duration Fit"]
    D --> D5["Preference Fit"]

    D --> E["Interactive Content"]
    E --> F["Feedback"]
    F --> G["Personalization Loop"]
    G --> D
```

## Scoring Inputs

- Emotion match
- Stress fit
- Focus fit
- Sleep fit
- Energy fit
- Time of day
- Weather context
- User preference
- Completion history
- Freshness

## Score Formula

```ts
recommendationScore =
  emotionMatch * 0.30 +
  contextFit * 0.20 +
  personalizationFit * 0.20 +
  difficultyFit * 0.10 +
  durationFit * 0.10 +
  freshness * 0.10;
```

## Feedback Signals

- Session started
- Session completed
- Session exited early
- Duration
- Interaction count
- Sound usage
- Before mood
- After mood
- User rating
- Physiological change when available

## Recommendation Contract

Every content item must provide:

- Source emotion
- Target emotion
- Category
- Duration
- Difficulty
- Interaction type
- Stress fit
- Focus fit
- Sleep fit
- Recommendation weight
- Accessibility support
