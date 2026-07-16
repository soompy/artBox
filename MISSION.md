# MomentTune ArtBox 미션

artBox는 인터랙티브 아트 갤러리가 아닙니다.

artBox는 MomentTune의 감정 경험을 만드는 콘텐츠 플랫폼입니다.

모든 구현은 아래 원칙을 따릅니다.

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

모든 작품은 단순한 시각 효과가 아니라 사용자의 감정 변화를 유도하는 경험이어야 합니다.

향후 모든 콘텐츠는 MomentTune Recommendation Engine과 연결될 수 있도록 Metadata 기반으로 설계합니다.

## 제품 정의

ArtBox는 MomentTune의 인터랙티브 콘텐츠 엔진입니다.

사용자의 감정 맥락을 시각, 소리, 움직임, 터치, 리듬, 피드백으로 번역합니다. ArtBox는 수동 감상을 최적화하지 않습니다. 감정 전환을 최적화합니다.

모든 콘텐츠 의사결정의 핵심 질문은 다음입니다.

> 이 경험은 사용자를 어떤 감정 상태에서 어떤 감정 상태로 이동시키는가?

## 구현 원칙

### Emotion First

기술, 효과, 기능을 정하기 전에 사용자의 감정 상태를 먼저 정의합니다.

모든 콘텐츠는 시작 감정, 목표 감정, 감정 목표, 세션 후 기대 감정을 가져야 합니다.

### Experience over Feature

기능은 감정 경험을 개선할 때만 존재합니다.

사용자가 더 안정되고, 집중하고, 위로받고, 활력을 얻고, 창의적으로 느끼도록 돕지 않는 기능은 추가하지 않습니다.

### Calm before Complexity

기본값은 차분하고 이해하기 쉬운 상호작용입니다.

복잡한 인터랙션은 창의성, 해소, 에너지처럼 목표 감정이 그것을 필요로 할 때만 허용합니다.

### Beautiful Interaction

상호작용은 반응적이고 부드럽고 의도적으로 느껴져야 합니다.

사용자는 콘텐츠가 자신에게 요구하는 것이 아니라, 자신을 듣고 있다고 느껴야 합니다.

### Performance Matters

지연, 끊김, 메모리 누수는 감정 경험을 무너뜨립니다.

모든 콘텐츠는 animation frame, event listener, audio node, WebGL resource, timer를 반드시 정리해야 합니다.

### Accessibility Matters

ArtBox는 다양한 감각 선호, 모션 민감도, 기기 환경, 입력 방식을 가진 사용자가 접근할 수 있어야 합니다.

모든 경험은 sound-off, reduced motion, 명확한 exit, 모바일 친화적 인터랙션을 지원해야 합니다.

### Mobile First

감정 체크인은 짧은 일상 순간에 자주 일어납니다.

모든 콘텐츠는 데스크톱 최적화 이전에 모바일에서 먼저 성립해야 합니다.

### Reusable Content Engine

ArtBox 콘텐츠는 공통 schema에 등록되고 재사용 가능한 shell에서 렌더링되어야 합니다.

일회성 routing, 일회성 control, 일회성 metadata 구조를 만들지 않습니다.

### Recommendation Ready

모든 콘텐츠는 추천 metadata를 포함해야 합니다.

최소 필드:

- emotion tag
- stress fit
- focus fit
- sleep fit
- duration
- difficulty
- interaction type
- recommendation weight
- 필요 시 best time of day

### AI Personalization Ready

향후 AI 개인화는 콘텐츠 선택과 runtime parameter를 조정할 수 있어야 합니다.

Artwork metadata와 runtime config는 motion intensity, sound intensity, color palette, session duration, interaction mode, accessibility mode, user preference signal을 수용해야 합니다.

## 절대 기준

- 감정 의도가 없는 콘텐츠는 출시하지 않습니다.
- metadata가 없는 콘텐츠는 출시하지 않습니다.
- 모바일을 지원하지 않는 콘텐츠는 출시하지 않습니다.
- 접근성을 지원하지 않는 콘텐츠는 출시하지 않습니다.
- cleanup이 없는 콘텐츠는 출시하지 않습니다.
- 기존 콘텐츠를 깨뜨리는 변경은 출시하지 않습니다.
- 보기만 멋진 효과는 ArtBox 콘텐츠가 아닙니다.

## North Star

ArtBox는 사용자가 들어왔을 때보다 더 나은 감정 상태로 나가도록 도와야 합니다.

우리가 원하는 사용자 반응은 단순합니다.

> 조금 나아졌다.
