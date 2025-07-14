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
    description: '따뜻한 낮빛 속에서 찾는 평온한 순간을 WebGL로 구현한 인터랙티브 작품입니다. 마우스 움직임에 따라 태양의 위치가 변하며, 부드러운 광선과 구름이 평온함을 선사합니다.',
    descriptionEn: 'An interactive WebGL artwork that captures peaceful moments in warm daylight. The sun\'s position changes with mouse movement, creating soft rays and clouds that evoke tranquility.',
    keywords: ['평온', '낮빛', '태양', '휴식', 'tranquility', 'daylight', 'sun', 'rest'],
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