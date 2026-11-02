import { Artwork } from '@/types/artwork';

export const artworks: Artwork[] = [
  {
    id: '1',
    slug: 'rhythm-of-the-commute',
    title: '출근의 리듬',
    titleEn: 'Rhythm of the Commute',
    year: 2025,
    description: '도시 속 출근길의 감정과 리듬을 시각화한 인터랙티브 작품입니다. 스크롤과 함께 변화하는 씬을 통해 출근길의 다양한 감정 상태를 경험할 수 있습니다.',
    descriptionEn: 'An interactive visualization of emotions and rhythms during urban commutes. Experience various emotional states through evolving scenes triggered by scroll interactions.',
    keywords: ['감정', '리듬', '도시', '출근길', 'emotion', 'rhythm', 'city', 'commute'],
    technologies: ['GSAP', 'ScrollTrigger', 'Three.js', 'p5.js'],
    thumbnail: '/images/artworks/rhythm-of-commute-thumb.jpg',
    featured: true,
    status: 'active',
    metadata: {
      duration: 180,
      interactive: true,
      soundEnabled: true,
      mobileOptimized: true,
    },
  },
  {
    id: '2',
    slug: 'lunch-break',
    title: '점심의 틈',
    titleEn: 'Lunch Break',
    year: 2025,
    description: '따뜻한 낮빛 아래 점심시간의 한 장면을 WebGL로 그린 인터랙티브 작품입니다. 마우스나 손가락을 움직이면 태양의 위치가 바뀌고, 부드러운 광선과 구름이 따라 움직입니다.',
    descriptionEn: 'An interactive WebGL scene of a lunch break in warm daylight. Move your mouse or finger to shift the sun, and soft rays and clouds follow along.',
    keywords: ['점심', '낮빛', '태양', '휴식', 'lunch', 'daylight', 'sun', 'rest'],
    technologies: ['WebGL', 'GLSL', 'Framer Motion', 'Canvas'],
    thumbnail: '/images/artworks/lunch-break-thumb.jpg',
    featured: true,
    status: 'active',
    metadata: {
      duration: 120,
      interactive: true,
      soundEnabled: false,
      mobileOptimized: true,
    },
  },
  // 감정 점수·기분 목표 값을 넣지 않는다(브리프 §5-3) — 주소는 /moti/cafe
  {
    id: '3',
    slug: 'cafe',
    title: '모티의 쉬는 날 · 창가 자리',
    year: 2026,
    description: '비 오는 날, 카페 창가에서 코코아를 마시는 모티 곁에 2분 같이 앉아 있어요.',
    keywords: ['모티', '모먼트튠', '카페', '창가 자리', '비 오는 날', '쉬는 날'],
    technologies: ['Canvas', 'Framer Motion'],
    thumbnail: '/artworks/moti-cafe/cafe-og.webp', // 그림이 오면 만든다(브리프 §3-6)
    featured: false,
    status: 'development',
    metadata: {
      duration: 120,
      interactive: true,
      soundEnabled: false, // 빗소리는 기본 꺼짐 · 파일 미정
      mobileOptimized: true,
    },
  },
];

export const getFeaturedArtworks = (): Artwork[] => {
  return artworks.filter(artwork => artwork.featured && artwork.status === 'active');
};

export const getArtworkBySlug = (slug: string): Artwork | undefined => {
  return artworks.find(artwork => artwork.slug === slug);
};

export const getAllArtworks = (): Artwork[] => {
  return artworks.filter(artwork => artwork.status !== 'archived');
};