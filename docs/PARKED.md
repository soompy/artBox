# 보류(PARK) — 2026-11-02 문서 정리에서 뗀 것

> 2026-11-02 결정(`DECISION_LOG.md` 같은 날짜 항목)으로 artBox 는 **MomentTune 의 설치 없는 웹 입구**가 되었고, 작품은 **모티가 주인공인 공간**으로 만든다.
> 아래는 그 전 문서(2026-07-16 기획)에 있던 내용 중 MomentTune 원칙(`MOTI_CAFE_BRIEF.md` §2 — 비의료 · 효능 약속 금지 · 기분 전후 비교 금지 · 심박/HRV 연동 금지 · AI 개인화 보류)과 충돌해 **지금은 쓰지 않는 것**이다.
>
> - 여기 있다고 «나중에 할 일» 이 아니다. 다시 꺼내려면 창업자 결정과 `DECISION_LOG.md` 새 항목이 먼저 있어야 한다
> - 원래 문장을 그대로 옮기지 않고 **무엇이었는지만** 적는다(효과 약속 문구가 다시 퍼지지 않게). 원문은 git 기록에 있다(이 정리 직전 커밋 `master`)

## P-1. «감정 상태를 옮기는 경험» 이라는 제품 정의

| 무엇이었나 | 있던 곳 | 왜 보류 |
|---|---|---|
| artBox 의 핵심 산출물을 «감정의 변화·전환» 으로 정의하고, 모든 콘텐츠가 시작 감정 → 목표 감정을 가져야 한다는 원칙(Emotion First · North Star «더 나은 감정 상태로 나가게») | `MISSION.md` · `SERVICE_DEFINITION.md` · `PRODUCT_BOOK.md` · `EXPERIENCE_PRINCIPLES.md` · `README.md` | 효과를 약속하는 말이다 — 브리프 §2-1 비의료 |
| 콘텐츠를 «감정 기능» 별로 나눈 분류(Calm · Focus · Breathing · Sleep · Creativity · Nature · Meditation · Interactive Drawing · Music Reactive · Generative Art)와 카테고리마다 붙은 «목적 · 효과» 문장 | `CONTENT_STRATEGY.md` | 카테고리 이름과 «효과» 문장이 그대로 효능 약속이 된다. 지금 작품 분류는 **공간**(카페 · 전시 · 산책 · 서점 · 공원 · 마켓) |
| «현재 상태 → 원하는 변화 → 추천 카테고리» 매핑표 | `CONTENT_STRATEGY.md` · `PRODUCT_BOOK.md`(Emotional Experience) | 같은 이유 |
| 특정 심리 상태(잠들기 전 걱정 등)를 겪는 사용자를 대상으로 한 사용자 스토리 · JTBD | `SERVICE_DEFINITION.md` | 증상을 가진 사람을 겨냥하는 글이 된다 |
| 브랜드 키워드 «Wellness» · 핵심 가치 «Interactive Healing» | `PRODUCT_BOOK.md` | 밖으로 나가는 글자에 쓰지 않는 말 |

## P-2. 기분 전후 비교 · 성과 지표

| 무엇이었나 | 있던 곳 | 왜 보류 |
|---|---|---|
| 세션 전 감정 체크인 → 세션 후 감정 확인(before/after) | `EXPERIENCE_PRINCIPLES.md`(Mindfulness) | 브리프 §2-4 · §7 — 기분 전후 비교 ✗ |
| 성공 지표 «감정 개선률» · «before/after mood improvement» · «mood change 측정» | `SERVICE_DEFINITION.md` · `PRODUCT_BOOK.md` · `EXPERIENCE_PRINCIPLES.md` · `DECISION_LOG.md` D-4 | 같은 이유. 지금 재는 것은 브리프 §6(서버 요청 수 · 끝 화면 요청 수 · App Store 캠페인) |
| 스키마 `analytics.trackMoodBeforeAfter` 와 클라이언트 분석 묶음(`trackCompletion` · `trackInteraction` · `trackAudioUsage` · `trackDuration`) | `ARTWORK_SCHEMA.md` | 기분 전후 비교 ✗ · 분석 스크립트 ✗(브리프 §2-4) |
| 로드맵 «completion 과 before/after mood 추적» | `ROADMAP.md` Phase 3 | 같은 이유 |

## P-3. 생체 신호 연동

| 무엇이었나 | 있던 곳 | 왜 보류 |
|---|---|---|
| HR · HRV · Sleep · Stress 입력으로 추천 · 개인화 | `PRODUCT_BOOK.md` Year 2 · `ROADMAP.md` Phase 4 · `SERVICE_DEFINITION.md` Future Expansion · `RECOMMENDATION_ENGINE.md` Data Flow · `DECISION_LOG.md` D-1 | 브리프 §2-4 — 심박·HRV 연동 ✗ |
| 피드백 신호 «available physiological change» | `RECOMMENDATION_ENGINE.md` | 같은 이유 |

## P-4. artBox 자체 추천 엔진 · 감정 메타데이터

| 무엇이었나 | 있던 곳 | 왜 보류 |
|---|---|---|
| 감정 입력 → 추천 → 세션 → 피드백 루프와 점수 공식(emotionMatch · contextFit · personalizationFit …) | `RECOMMENDATION_ENGINE.md` · `SERVICE_DEFINITION.md` · `ROADMAP.md` | 브리프 §7 — artBox 자체 추천 엔진 ✗. 끝 화면은 고정 링크 하나(«쉴 곳 지도에서 카페 보기») |
| 작품 메타데이터의 감정·상태 값: `emotion` · `sourceEmotion` · `targetEmotion` · `emotionalGoal` · `expectedFeelingAfter` · `stress_level` · `focus_level` · `sleep_level` · `energy_level` · `recommendation.*` | `ARTWORK_SCHEMA.md` · `MISSION.md`(Recommendation Ready) · `DECISION_LOG.md` Metadata-Driven Content | 브리프 §5-3 — 메타데이터에 감정 점수·기분 목표 값을 넣지 않는다 |
| 새 콘텐츠 Self Check 3문항(«어떤 감정 상태를 위한 것인가» · «추천 엔진이 언제 추천하는가») | `DECISION_LOG.md` · `ENGINEERING_HARNESS.md` · `ARTWORK_DEVELOPMENT_GUIDE.md` | 위 두 줄과 같은 이유. 지금 기준은 `EXPERIENCE_PRINCIPLES.md` 의 «내보내기 전 확인» |
| 그림 `docs/assets/momenttune-artbox-connection.png`(연결 구조) · `docs/assets/content-engine-architecture.png`(옛 스키마 ERD) | `RECOMMENDATION_ENGINE.md` · `ARTWORK_SCHEMA.md` | 옛 구조를 그린 그림이라 문서에서 참조만 뺐다. 파일은 지우지 않고 남겨 둔다 |

## P-5. AI 개인화

| 무엇이었나 | 있던 곳 | 왜 보류 |
|---|---|---|
| AI Personalization Ready — 사용자 선호 신호로 motion · sound · palette · duration 을 조정 | `MISSION.md` · `PRODUCT_BOOK.md` · `SERVICE_DEFINITION.md` P2 · `ROADMAP.md` Phase 5 | 브리프 §7 — AI 개인화 ✗(보류) |

## P-6. 플랫폼 확장

| 무엇이었나 | 있던 곳 | 왜 보류 |
|---|---|---|
| creator 생태계 · 브랜드/B2B/교육 프로그램 · «감정 프로그램» | `PRODUCT_BOOK.md` · `SERVICE_DEFINITION.md` · `ROADMAP.md` Phase 6 | artBox 는 독립 제품이 아니다(2026-11-02). 외부 제휴는 창업자 승인 사항(브리프 §7·§8) |
| «작품이 매일 바뀐다» 류의 약속 | — | 브리프 §7(1인 제작 부담) |
