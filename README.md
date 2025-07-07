# Interactive Art Gallery

> 디지털 아트와 기술이 만나는 몰입감 있는 인터랙티브 웹 아트 전시장

## 🎨 프로젝트 소개

Interactive Art Gallery는 현대적인 웹 기술을 활용하여 인터랙티브 아트 작품들을 전시하는 온라인 갤러리입니다. 전통적인 갤러리 관람을 넘어서 관람자가 직접 작품과 상호작용할 수 있는 새로운 예술 경험을 제공합니다.

### ✨ 주요 특징

- **🎭 인터랙티브 아트 작품들**: GSAP, Three.js, p5.js를 활용한 몰입감 있는 작품
- **🎨 모던한 UI/UX**: 어두운 톤의 갤러리 분위기와 부드러운 애니메이션
- **📱 반응형 디자인**: 모든 디바이스에서 최적화된 경험
- **🚀 높은 성능**: Next.js 13+ App Router와 Turbopack 사용
- **♿ 접근성**: 웹 접근성 가이드라인 준수

### 🖼️ 현재 전시 작품

1. **출근의 리듬 (Rhythm of the Commute)**
   - 도시 속 출근길의 감정과 리듬을 시각화
   - GSAP ScrollTrigger, Canvas API 활용
   - 스크롤 기반 인터랙티브 스토리텔링

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
     year: 2025,
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

**Interactive Art Gallery** - 디지털 아트의 새로운 경험을 만들어갑니다. 🎨✨
