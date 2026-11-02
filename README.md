# MomentTune ArtBox

> **지금 작업 중: 첫 작품 «모티의 쉬는 날 · 창가 자리»(카페)** — 시작은 [`docs/MOTI_CAFE_BRIEF.md`](docs/MOTI_CAFE_BRIEF.md). 이 브리프와 다른 문서가 다르면 브리프를 따른다.

> MomentTune 앱으로 들어오는 설치 없는 웹 입구 — 모티가 주인공인 공간에 2분 같이 앉아 있기

## Mission

artBox 는 MomentTune 앱(집)으로 들어오는 **설치 없는 웹 입구**입니다. 독립 제품이 아닙니다.

작품마다 수달 캐릭터 «모티» 가 카페 · 전시 · 산책 · 서점 · 공원 · 마켓 같은 공간을 즐기는 장면을 보여 주고, 끝 화면에서 «이번 주말, 이런 곳 하나» 로 MomentTune «쉴 곳 지도» 에 이어집니다.

자세한 미션과 지키는 원칙(비의료 · 게이미피케이션 없음 · 개인정보 · 안전)은 [MISSION.md](MISSION.md) 를 기준으로 합니다. 보류한 이전 방향(감정 전환 · 추천 엔진 · 생체 연동)은 [`docs/parked/`](docs/parked/README.md) 에 있습니다.

## 🎨 프로젝트 소개

링크 하나로 열리는 2분짜리 장면입니다. 설치 · 가입 · 입력이 없습니다. 사용자는 모티 곁에 앉아 같이 쉬고, 원하면 장면을 두드려 작은 반응을 봅니다.

### ✨ 주요 특징

- **🦦 모티가 주인공인 공간**: 창업자가 그린 레이어를 코드(WebGL · 캔버스)로 움직입니다
- **📄 종이톤 장면**: 색연필 · 크레용 질감의 따뜻한 종이톤(MomentTune 모티 자산과 같은 결)
- **📱 세로 화면 먼저**: 휴대폰에서 먼저 성립하고, 가로·데스크톱은 같은 장면을 가운데에
- **🔈 소리는 기본 꺼짐**: 누른 사람만 듣습니다
- **♿ 접근성**: 움직임 줄이기 · 키보드 · 화면 읽기 · 언제든 나가기
- **🔒 기록 없음**: 분석 스크립트 · 쿠키 · localStorage 를 쓰지 않습니다

### 🖼️ 작품

1. **모티의 쉬는 날 · 창가 자리 (카페)** — 작업 중. `momenttune.com/moti/cafe` 예정(배포는 창업자 승인)
2. **점심의 틈 (Lunch Break)** — 입구로 쓰지 않음(창업자 판단)
3. **출근의 리듬 (Rhythm of the Commute)** — 입구로 쓰지 않음(번개·화면 진동 장면, 브리프 §2-5)

## 🛠️ 기술 스택

### Core
- **Next.js 15** - React 풀스택 프레임워크
- **TypeScript** - 타입 안정성
- **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크

### Animation & Interactive
- **GSAP** - 고성능 애니메이션 라이브러리
- **Framer Motion** - React 애니메이션 라이브러리
- **Three.js** - 3D 그래픽스
- **p5.js** - 창의적 코딩 라이브러리

### Development
- **ESLint** - 코드 품질 도구
- **Turbopack** - 빠른 번들러

## 🚀 시작하기

### 요구 사항

- Node.js 18.0 이상
- npm, yarn, pnpm 또는 bun

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/your-username/interactive-art-gallery.git
cd interactive-art-gallery

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버가 실행되면 [http://localhost:3000](http://localhost:3000)에서 프로젝트를 확인할 수 있습니다.

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js 13+ App Router
│   ├── projects/[slug]/   # 동적 작품 페이지
│   ├── globals.css        # 전역 스타일
│   ├── layout.tsx         # 루트 레이아웃
│   └── page.tsx          # 홈페이지
├── components/
│   ├── artworks/         # 작품별 컴포넌트
│   └── ui/               # 공통 UI 컴포넌트
├── data/
│   └── artworks.ts       # 작품 데이터
├── lib/
│   └── utils.ts          # 유틸리티 함수
└── types/
    └── artwork.ts        # 타입 정의
```

## 🎨 새로운 작품 추가하기

1. **작품 데이터 추가**
   ```typescript
   // src/data/artworks.ts
   {
     id: 'unique-id',
     slug: 'artwork-slug',
     title: '작품 제목',
     year: 
     ,
     description: '작품 설명',
     technologies: ['GSAP', 'Three.js'],
     // ...
   }
   ```

2. **작품 컴포넌트 생성**
   ```typescript
   // src/components/artworks/YourArtwork.tsx
   export function YourArtwork({ artwork }: { artwork: Artwork }) {
     // 작품 로직 구현
   }
   ```

3. **ArtworkViewer에 등록**
   ```typescript
   // src/components/artworks/ArtworkViewer.tsx
   const ArtworkComponents = {
     'your-artwork-slug': YourArtwork,
   };
   ```

## 🎯 추천 라이브러리 및 Best Practices

### 애니메이션
- **GSAP**: 복잡한 타임라인 애니메이션
- **Framer Motion**: React 컴포넌트 애니메이션
- **Lenis**: 부드러운 스크롤 경험

### 3D & Canvas
- **Three.js**: 3D 씬 구축
- **R3F (React Three Fiber)**: React와 Three.js 통합
- **p5.js**: 창의적 코딩과 제너러티브 아트

### 성능 최적화
- **동적 임포트**: 작품 컴포넌트 지연 로딩
- **Intersection Observer**: 뷰포트 기반 애니메이션
- **Canvas 최적화**: requestAnimationFrame 사용

## 📄 라이선스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 연락처

프로젝트 관련 문의나 제안사항이 있으시면 언제든 연락주세요.

---

**MomentTune ArtBox** — 모티의 쉬는 날, 설치 없이 링크 하나로.
