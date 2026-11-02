# ArtBox Engineering Harness

## Goal

새로운 콘텐츠를 추가해도 기존 플랫폼은 절대 깨지지 않아야 합니다.

콘텐츠는 실험적이어도 됩니다. 시스템은 예측 가능해야 합니다.

## Content Gate

새 콘텐츠는 구현 전에 반드시 아래 질문에 답해야 합니다.

- 어떤 공간에서 모티가 무엇을 즐기는 장면인가?
- 사용자는 어떤 손짓을 할 수 있는가?
- 끝 화면은 «쉴 곳 지도» 의 어떤 장소 종류로 이어지는가?

이 답변은 config, 문서, PR 설명 중 최소 한 곳에 명시되어야 합니다.

## Folder Structure

```txt
src/
  app/
    cafe/page.tsx              # basePath '/moti' → /moti/cafe
  components/
    content/
      ContentViewer.tsx
      ContentShell.tsx
      ContentControls.tsx
      ContentFallback.tsx
    artworks/
      {slug}/
        Artwork.tsx
        Artwork.preview.tsx
        Artwork.config.ts
        Artwork.test.tsx
  data/
    artworks.ts
  types/
    artwork.ts
  engines/
    canvas/
    webgl/
    three/
    p5/
    audio/
```

## Coding Rule

- TypeScript를 사용합니다.
- `any`는 피합니다.
- artwork rendering과 공통 틀(진행선 · 나가기 · 끝 화면 · 소리 버튼)을 분리합니다.
- registry 밖에서 slug를 하드코딩하지 않습니다.
- browser API는 guard 후 사용합니다.
- 모든 artwork는 resource cleanup을 수행합니다.

## Component Rule

Artwork component는 rendering과 local interaction만 담당합니다.

금지:

- 라우팅 처리
- 공통 컨트롤 소유
- 글로벌 오디오 정책 변경(소리는 기본 꺼짐 · 누른 뒤에만 재생)
- 분석 스크립트 · 쿠키 · localStorage 기록 · 외부 폰트 호출

## Animation Rule

- `requestAnimationFrame`을 사용합니다.
- pause와 resume을 지원합니다.
- reduced motion을 지원합니다.
- 빠른 깜빡임 · 번쩍임 · 화면 진동을 쓰지 않습니다.
- 매 프레임 React state 업데이트를 피합니다.

## Performance Rule

- 무거운 engine은 lazy load합니다.
- initial load는 3초 이하를 목표로 합니다.
- desktop 60fps, mobile 30fps를 목표로 합니다.
- WebGL, audio, timer, listener를 정리합니다.
- 미지원 engine에는 fallback을 제공합니다.

## Accessibility Rule

- sound는 optional이어야 합니다.
- reduced motion을 지원해야 합니다.
- Exit와 Pause는 항상 가능해야 합니다.
- WebGL 필요 시 fallback이 있어야 합니다.
- 색상만으로 상태를 전달하지 않습니다.

## Naming Rule

- Slug: `cafe` (주소 `/moti/cafe`)
- Component: `MotiCafe`
- Config: `motiCafeConfig`

## Testing Rule

필수 확인:

- config schema validation
- component render
- cleanup
- fallback render
- accessibility smoke test
- build

## Git Rule

Branch naming:

- `codex/content-{slug}`
- `codex/engine-{feature}`
- `codex/fix-{issue}`
- `codex/docs-{topic}`

Commit naming:

- `feat: add moti cafe scene`
- `fix: cleanup webgl resources`
- `docs: add design system`

## PR Rule

모든 PR은 아래를 포함합니다.

- Summary
- 공간과 모티의 장면
- 사용자 손짓
- 끝 화면이 이어지는 장소 종류
- MomentTune 원칙(브리프 §2) 확인
- Content 또는 engine changes
- Interaction type
- Rendering engine
- Accessibility notes
- Performance notes
- Test result
- Visual 변경 시 preview screenshot 또는 recording

## Review Rule

아래 항목은 merge를 막습니다.

- build 실패
- 장면 · 손짓 · 끝 화면 연결이 불명확함
- metadata 누락
- 효능·감정 전환 문구
- 점수 · 횟수 · 보상
- 분석 스크립트 · 쿠키 · 외부 폰트 호출
- 빠른 깜빡임 · 번쩍임 · 화면 진동
- cleanup 누락
- mobile broken
- reduced motion 미지원
- sound 강제
- 기존 콘텐츠 파손

## Documentation Rule

모든 콘텐츠는 아래를 문서화합니다.

- 공간과 장면
- 손짓과 반응
- 끝 화면 연결
- interaction type
- duration
- difficulty
- rendering engine
- accessibility
- performance notes
