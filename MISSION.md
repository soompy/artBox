# MomentTune ArtBox Mission

artBox is not an interactive art gallery.

artBox is a content platform for creating MomentTune's emotional experiences.

Every implementation must follow these principles:

- Emotion First
- Experience over Feature
- Calm before Complexity
- Beautiful Interaction
- Performance Matters
- Accessibility Matters
- Mobile First
- Reusable Content Engine
- Recommendation Ready
- AI Personalization Ready

Every artwork must be more than a visual effect. It must be an experience designed to guide a user's emotional shift.

All future content must be metadata-driven so it can connect to the MomentTune Recommendation Engine.

## Product Definition

ArtBox is the interactive content engine of MomentTune.

It turns emotional context into sensory experiences: visuals, sound, motion, touch, rhythm, and feedback. The platform does not optimize for passive viewing. It optimizes for emotional transition.

The core question for every content decision is:

> What emotional state does this experience help the user move from, and what state does it help them move toward?

## Implementation Principles

### Emotion First

Start with the user's emotional state before selecting technology, visuals, or features.

Every content item must define source emotion, target emotion, emotional goal, and expected feeling after the session.

### Experience over Feature

Features exist only when they improve the emotional experience.

Do not add controls, effects, settings, or animations unless they help the user feel more grounded, focused, comforted, energized, creative, or aware.

### Calm before Complexity

Default to calm and understandable interactions.

Complex interactions are allowed only when the user's target state benefits from them, such as creativity, release, or energy.

### Beautiful Interaction

Interaction should feel responsive, gentle, and intentional.

The user should feel that the content is listening to them, not demanding performance from them.

### Performance Matters

Emotional experiences collapse when the interface stutters, lags, or leaks memory.

Every artwork must clean up animation frames, event listeners, audio nodes, WebGL resources, and timers.

### Accessibility Matters

ArtBox must work across sensory preferences, motion sensitivity, device constraints, and input methods.

Every experience must support sound-off usage, reduced motion, clear exit controls, and mobile-friendly interaction.

### Mobile First

Most emotional check-ins happen in short everyday moments.

Every artwork must work on mobile before it is optimized for desktop.

### Reusable Content Engine

ArtBox content must be registered through a shared schema and rendered through a reusable shell.

Avoid one-off routing, one-off controls, and one-off metadata structures.

### Recommendation Ready

Every artwork must include recommendation metadata.

At minimum:

- Emotion tags
- Stress fit
- Focus fit
- Sleep fit
- Duration
- Difficulty
- Interaction type
- Recommendation weight
- Best time of day when relevant

### AI Personalization Ready

Future AI personalization should be able to adjust content selection and runtime parameters.

Artwork metadata and runtime config should make room for motion intensity, sound intensity, color palette, session duration, interaction mode, accessibility mode, and user preference signals.

## Non-Negotiables

- No artwork ships without emotional intent.
- No artwork ships without metadata.
- No artwork ships without mobile support.
- No artwork ships without accessibility support.
- No artwork ships without cleanup.
- No artwork ships if it breaks existing content.
- No artwork ships only because it looks impressive.

## North Star

ArtBox should help the user leave in a better emotional state than when they entered.

The desired user response is simple:

> I feel a little better.
