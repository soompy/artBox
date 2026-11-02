# MomentTune ArtBox

> **지금 작업 중: 첫 작품 «모티의 쉬는 날 · 창가 자리»(카페)** — 시작은 [`docs/MOTI_CAFE_BRIEF.md`](docs/MOTI_CAFE_BRIEF.md). 이 브리프와 이 레포의 다른 문서가 다르면 브리프를 따른다.

> MomentTune 앱으로 들어오는 설치 없는 웹 입구 — 모티의 쉬는 날

## Mission

artBox 는 **MomentTune 앱으로 들어오는 설치 없는 웹 입구**입니다. 독립 제품이 아닙니다.

작품마다 수달 캐릭터 «모티» 가 주인공으로 한 공간(카페 · 전시 · 산책 · 서점 · 공원 · 마켓)을 즐기는 장면을 보여 주고, 방문자는 곁에 잠깐 앉아 같이 쉽니다. 끝 화면은 «이번 주말, 이런 곳 하나» 로 MomentTune «쉴 곳 지도» 에 이어집니다.

자세한 미션은 [MISSION.md](MISSION.md), 2026-11-02 정리에서 보류로 뗀 내용은 [docs/PARKED.md](docs/PARKED.md) 에 있습니다.

## 🎨 프로젝트 소개

링크 하나로 열리는 잠깐 쉬어 가는 짧은 작품입니다. 첫 작품 «모티의 쉬는 날 · 창가 자리» 에서는 비 오는 날 카페 창가에서 코코아를 마시는 모티 곁에 2분 같이 앉아 있다가, «이번 주말, 이런 카페 하나 어때요?» 로 넘어갑니다. 주소는 `momenttune.com/moti/cafe` 입니다.

### ✨ 주요 특징

- **🦦 모티가 주인공인 공간**: 두드리면 무언가 움직이는 작은 손짓 하나
- **🔈 소리는 선택**: 기본 꺼짐, 누른 사람만 듣는다
- **📱 휴대폰 세로 화면 먼저**
- **🔒 개인정보를 남기지 않음**: 분석 스크립트 · 쿠키 · 기분 기록 없음
- **♿ 접근성**: reduced motion · 키보드 · 화면 읽기 지원

### 🖼️ 작품

1. **모티의 쉬는 날 · 창가 자리 (카페)** — 작업 중. [`docs/MOTI_CAFE_BRIEF.md`](docs/MOTI_CAFE_BRIEF.md)

기존 작품 «출근의 리듬» · «점심의 틈» 은 레포에 남아 있지만 입구로 쓰지 않습니다(브리프 §1 · §2-5).

> 아래 기술 스택 · 구조 설명은 아직 옛 갤러리 기준입니다. 빌드는 브리프 §5-2 «빌드 손보기» 에서 고칩니다.

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

**MomentTune ArtBox** — 모티의 쉬는 날. 🦦
