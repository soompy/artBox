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

## 2026-07-16: MVP Integration Boundary (D-1)

Decision:

MVP는 사용자의 mood 자기입력과 내부 metadata 기반 추천만으로 동작합니다. MomentTune의 웨어러블/생체신호(HR, HRV, Sleep, Stress 등) 실연동은 Phase 4로 유보합니다.

Rationale:

Recommendation Ready 원칙은 "지금 연동"이 아니라 "연동 가능하게 설계"를 뜻합니다. mood 자기입력만으로도 핵심 감정 루프(input -> recommend -> session -> feedback)를 검증할 수 있고, 데이터 계약과 프라이버시 범위를 MVP에서 분리해 범위 폭주를 막습니다. 기존 ROADMAP Phase 3/4, SERVICE_DEFINITION MVP와 일치합니다.

Alternatives Considered:

얇은 목업 API로 추천 진입만 시연 - 통합을 조기에 보여줄 수 있으나 MVP 검증에는 불필요.

Impact:

- MVP는 로그인/웨어러블 연동 없이 동작합니다.
- 모든 콘텐츠 metadata는 Phase 4 실연동을 대비해 RECOMMENDATION_ENGINE contract를 충족합니다.

Owner: 이수민

## 2026-07-16: MVP Primary User (D-2)

Decision:

MVP 1차 사용자군은 기존 SERVICE_DEFINITION대로 MomentTune 사용자(감정 기반 콘텐츠 경험을 원하는 사용자)를 유지합니다. 단 MVP는 mood 자기입력으로 동작하므로 사용자 식별 및 데이터 연동 없이도 검증 가능합니다.

Rationale:

기존 SERVICE_DEFINITION이 Primary user를 MomentTune 사용자로 이미 확정했고 이를 임의로 뒤집지 않습니다. 초기 분석에서 제안했던 "독립 방문자 1차"는 기술적 독립성(D-1)으로 이미 확보되므로 audience 정의까지 바꿀 필요가 없습니다.

Alternatives Considered:

독립 갤러리 방문자를 1차로 설정(초기 권장안) - 콘텐츠 자체 가치를 더 깨끗이 분리 검증할 수 있으나 기존 확정 결정과 충돌하고 D-1로 이미 독립성이 확보되어 미채택.

Impact:

- 테스트 사용자 모집, 카피, 온보딩은 MomentTune 사용자 맥락을 기준으로 합니다.
- 독립 방문자도 secondary로 계속 고려합니다(브리프 7절 유지).

Owner: 이수민

## 2026-07-16: MVP Content Scope (D-3)

Decision:

MVP 콘텐츠는 기존 MVP 카테고리(Calm, Focus, Breathing)를 유지하고, 브리프의 "5~8개" 기준을 충족하기 위해 카테고리당 2개씩 총 6개를 대표 콘텐츠로 확정합니다.

Rationale:

기존 SERVICE_DEFINITION과 ROADMAP이 MVP 범위를 Calm/Focus/Breathing 3개 감정 기능으로 이미 좁혔고, 브리프 10절은 5~8개 콘텐츠를 요구합니다. 3 카테고리 x 2개 = 6개가 두 기준을 동시에 만족하며 범위를 넓히기보다 대표 경험을 깊게 설계하는 원칙에 부합합니다.

Alternatives Considered:

브리프 8절 5개 상태 각 1개 + 불안 1개(총 6개, 초기 권장안) - 상태 커버리지는 넓으나 기존 3-카테고리 MVP 범위와 충돌. 5개(최소)/8개(상태별 편차) 안도 검토했으나 6개로 균형.

Impact:

- MVP 후보(CONTENT_STRATEGY 기준): Calm = Still Water, Soft Light Field / Focus = Focus Pulse, 90 Second Reset / Breathing = Breath Orb, Four Count Light. 구체 선정은 MVP_CONTENT_CATALOG에서 확정합니다.
- Sleep/Creativity/Nature 등 나머지 카테고리는 Phase 2 이후로 둡니다.

Owner: 이수민

## 2026-07-16: MVP Success Metrics (D-4)

Decision:

MVP 1차 성공 지표는 완료율과 전후 기분 개선(감정 개선률)으로, 2차 지표는 재사용률로 정합니다. 모바일 완료율을 필수 병행 지표로 둡니다.

Rationale:

브리프 10절은 단순 방문 수 이상(완료율, 전후 기분, 재사용)을 요구하고 기존 SERVICE_DEFINITION/PRODUCT_BOOK metrics(시작률, 완료율, 감정 개선률, 모바일 완료율, 반복 사용률)와 일치합니다. Mobile First가 필수 요건이므로 모바일 완료율을 분리 관찰합니다.

Alternatives Considered:

재사용/재방문을 1차 지표로 - 반복성이 핵심 가설이나 초기에는 진입, 완료, 기분 전환 검증이 우선이라 2차로 배치.

Impact:

- MEASUREMENT_PLAN은 세션 시작, 완료, before/after mood, 재사용, 모바일 완료를 계측합니다.
- 분석 이벤트는 RECOMMENDATION_ENGINE Feedback Signals와 정렬합니다.

Owner: 이수민

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
