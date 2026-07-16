# ArtBox Decision Log

This file records product and technical decisions for MomentTune ArtBox.

## 2026-07-16: Product Repositioning

Decision:

ArtBox is no longer defined as an Interactive Art Gallery. It is the interactive content platform for MomentTune emotional experiences.

Rationale:

The core user value is emotional change, not artwork display.

Impact:

- Product language changes from artwork exhibition to content engine.
- All future content must include emotional intent and recommendation metadata.
- Success metrics prioritize mood shift and completion over passive views.

## 2026-07-16: Metadata-Driven Content

Decision:

All future content must be registered through metadata.

Rationale:

MomentTune Recommendation Engine requires structured fields for emotion, stress, focus, sleep, duration, difficulty, interaction type, and recommendation weight.

Impact:

- New content cannot ship without schema-compliant metadata.
- Recommendation readiness becomes a release requirement.

## 2026-07-16: Mobile and Accessibility as Requirements

Decision:

Mobile support and accessibility are required for all ArtBox content.

Rationale:

Emotional support moments often happen on mobile and must remain available to users with different sensory and interaction needs.

Impact:

- Sound must be optional.
- Reduced motion must be supported.
- Exit and Pause controls must always be available.
- Unsupported rendering environments need fallbacks.

## Template

Use this format for future decisions:

```md
## YYYY-MM-DD: Decision Title

Decision:

Rationale:

Alternatives Considered:

Impact:

Owner:
```
