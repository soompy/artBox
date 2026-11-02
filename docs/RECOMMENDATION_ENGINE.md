# MomentTune ArtBox Recommendation Engine — 보류(PARK)

> **2026-11-02 보류(PARK): 브리프 §2 · §7 과 충돌.** artBox 는 자체 추천 엔진을 갖지 않는다.
> 이 문서에 있던 데이터 흐름(HR · HRV · Sleep · Stress 입력) · 점수 공식 · 피드백 신호(기분 전후 · 생체 변화) · 추천 계약은 [`PARKED.md`](PARKED.md) P-3 · P-4 로 뗐다. 원문은 git 기록에 있다.

## 지금 artBox 가 하는 일

artBox 작품의 끝 화면은 **고정 링크 하나**로 MomentTune 앱에 이어진다.

- 카페: «이번 주말, 이런 카페 하나 어때요?» → [쉴 곳 지도에서 카페 보기] = App Store 캠페인 링크(`ct=artbox_cafe`)
- 앱에서 들어온 경우(`?from=momenttune`)만 «모먼트튠으로 돌아가기»

어떤 장소를 보여 줄지는 MomentTune 앱(쉴 곳 지도)이 정한다. artBox 는 방문자의 상태를 묻지도, 기록하지도, 점수 매기지도 않는다.
