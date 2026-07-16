# ArtBox Decision Log

이 문서는 MomentTune ArtBox의 제품 및 기술 의사결정을 기록합니다.

## 2026-07-16: Product Repositioning

Decision:

ArtBox는 더 이상 Interactive Art Gallery로 정의하지 않습니다. ArtBox는 MomentTune 감정 경험을 위한 interactive content platform입니다.

Rationale:

핵심 사용자 가치는 작품 전시가 아니라 감정 변화입니다.

Impact:

- product language가 artwork exhibition에서 content engine으로 전환됩니다.
- 모든 미래 콘텐츠는 emotional intent와 recommendation metadata를 포함해야 합니다.
- success metric은 passive view보다 mood shift와 completion을 우선합니다.

## 2026-07-16: Metadata-Driven Content

Decision:

모든 미래 콘텐츠는 metadata를 통해 등록합니다.

Rationale:

MomentTune Recommendation Engine은 emotion, stress, focus, sleep, duration, difficulty, interaction type, recommendation weight 같은 구조화된 필드를 필요로 합니다.

Impact:

- schema-compliant metadata가 없는 콘텐츠는 출시할 수 없습니다.
- recommendation readiness가 release requirement가 됩니다.

## 2026-07-16: Mobile and Accessibility as Requirements

Decision:

모든 ArtBox 콘텐츠는 mobile support와 accessibility를 필수로 가집니다.

Rationale:

감정 지원은 모바일의 짧은 순간에 자주 필요하며, 다양한 감각 및 상호작용 조건을 가진 사용자에게 열려 있어야 합니다.

Impact:

- sound는 optional이어야 합니다.
- reduced motion을 지원해야 합니다.
- Exit와 Pause control은 항상 가능해야 합니다.
- unsupported rendering environment에는 fallback이 필요합니다.

## 2026-07-16: New Content Self Check

Decision:

모든 새로운 ArtBox 콘텐츠는 구현 전에 세 가지 질문에 답해야 합니다.

1. 이 콘텐츠는 어떤 감정 상태를 위한 것인가?
2. 사용자가 어떤 행동을 하게 되는가?
3. MomentTune 추천 엔진이 언제 이 콘텐츠를 추천해야 하는가?

Rationale:

ArtBox는 작품을 개별적으로 전시하는 서비스가 아니라 감정 경험을 생성하는 콘텐츠 엔진입니다. 따라서 모든 콘텐츠는 감정 목적, 사용자 행동, 추천 조건을 명확히 가져야 합니다.

Impact:

- 콘텐츠 구현 전 self check가 필수 gate가 됩니다.
- PR에는 대상 감정 상태, 사용자 핵심 행동, 추천 조건을 포함해야 합니다.
- 세 질문에 답하지 못하는 콘텐츠는 merge할 수 없습니다.

## Template

향후 결정은 아래 형식으로 기록합니다.

```md
## YYYY-MM-DD: Decision Title

Decision:

Rationale:

Alternatives Considered:

Impact:

Owner:
```
