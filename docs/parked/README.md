# 보류(PARK) 목록

2026-11-02 artBox 의 자리가 «MomentTune 의 웹 입구» 로 바뀌면서([`../DECISION_LOG.md`](../DECISION_LOG.md) 2026-11-02 항목 · [`../MOTI_CAFE_BRIEF.md`](../MOTI_CAFE_BRIEF.md) §2), 기존 문서에서 MomentTune 원칙과 충돌하는 부분을 여기로 뗐다.

- 지운 것이 아니라 **지금 쓰지 않는 것**이다. 원문은 git 기록 `9565052` 에 그대로 있다
- 다시 꺼내려면 **창업자 결정(DECISION_LOG 새 항목)** 이 먼저다. 이 목록만 보고 되살리지 않는다

## 문서째 뗀 것

| 문서 | 왜 |
|---|---|
| [`RECOMMENDATION_ENGINE.md`](RECOMMENDATION_ENGINE.md) | artBox 자체 추천 엔진을 만들지 않는다(브리프 §7). 입력에 HR·HRV·Sleep·Stress, 피드백에 before/after mood 가 있다(§2-4) |
| [`ARTWORK_SCHEMA_v1.md`](ARTWORK_SCHEMA_v1.md) | 감정 점수·목표 감정·추천 가중치·`trackMoodBeforeAfter` 를 담았다. 작품 메타데이터에 감정 점수·기분 목표 값을 넣지 않는다(§5-3). 새 스키마는 [`../ARTWORK_SCHEMA.md`](../ARTWORK_SCHEMA.md) |

## 문서 안에서 뗀 것

| 원래 자리 | 뗀 내용 | 왜(브리프) |
|---|---|---|
| `MISSION.md` | «감정 변화를 유도» · «감정 전환을 최적화» · «더 안정되고, 집중하고, 위로받고…» · North Star «더 나은 감정 상태로 나가도록» | 효능·감정 전환 문구 ✗(§2-1) |
| `MISSION.md` | Emotion First(시작·목표 감정 정의) · Recommendation Ready(emotion·stress·focus·sleep fit) · AI Personalization Ready | 자체 추천 엔진 · AI 개인화 ✗(§7) |
| `README.md` | «인터랙티브 웰니스 콘텐츠 플랫폼» · «더 나은 상태로 이동하도록 돕습니다» · «어두운 톤의 갤러리 분위기» | 효능 문구 ✗(§2-1) · 종이톤(§3-1) |
| `docs/SERVICE_DEFINITION.md` | «핵심 산출물은 감정 전환» · 감정 입력 → 추천 → 피드백 루프 · «잠들기 전 불안을 느끼는 사용자» 스토리 · MVP 지표 «감정 개선률» · HR·HRV 기반 추천 | 비의료(§2-1) · 기분 전후 비교 · 생체 연동 ✗(§2-4) |
| `docs/PRODUCT_BOOK.md` | «Interactive Healing» · «감정 조율·회복» · Emotional Experience 표(«불안에서 안정으로» 등) · Year 2 의 HR·HRV 개인화 · before/after mood improvement 지표 | §2-1 · §2-4 |
| `docs/CONTENT_STRATEGY.md` | 감정 기능 10개 카테고리(Calm·Breathing 등)와 각 «목적·효과»(«불안을 안정시킵니다» · «긴장 완화» · «신경계 안정») · Recommendation Map(«불안→안정») | 효능 문구 ✗(§2-1). 작품은 이제 «모티가 즐기는 공간» 으로 나눈다(§1) |
| `docs/EXPERIENCE_PRINCIPLES.md` | Mindfulness 의 «짧은 감정 체크인» · «before/after 감정 확인» · Emotion First «조회수보다 mood change 측정» | 기분 전후 비교 ✗(§2-4) |
| `docs/ROADMAP.md` | Phase 3~6(mood input · before/after mood 추적 · HR·HRV 연동 · recommendation scoring · AI 개인화 · wellness program) | §2-4 · §7 |
| `docs/ARTWORK_DEVELOPMENT_GUIDE.md` · `docs/ENGINEERING_HARNESS.md` | 구현 전 질문 «어떤 감정 상태를 위한 것인가» · «추천 엔진이 언제 추천해야 하는가» · Recommendation·Emotional Metadata 체크리스트 | 자체 추천 엔진 ✗(§7) · 감정 점수 메타데이터 ✗(§5-3) |
| `docs/DESIGN_SYSTEM.md` | «Dark theme 은 몰입형 경험의 기본값» · 카드에 «emotional shift» 표시 · emotion-first 갤러리 · Emotional Colors 토큰(문서에 «보류» 표시만) | 종이톤(§3-1) · 효능 문구 ✗ |
| `docs/DECISION_LOG.md` | 2026-07-16 Product Repositioning 의 mood shift 지표 · Metadata-Driven Content(일부) · New Content Self Check · D-1 · D-2 · D-3 · D-4 | 각 항목에 «상태: 보류» 를 달았다(기록은 고치지 않는다) |
| `src/data/artworks.ts` | «점심의 틈» 설명의 «평온한 순간» · «평온함을 선사합니다» · 키워드 «평온·tranquility» | 효능 문구 ✗(§2-1) — 장면만 설명하도록 고쳤다 |
