import { Artwork } from '@/types/artwork';

export const artworks: Artwork[] = [
  {
    id: '1',
    slug: 'rhythm-of-the-commute',
    title: '출근의 리듬',
    titleEn: 'Rhythm of the Commute',
    year: 2025,
    description: '도시 속 출근길의 풍경과 리듬을 그린 인터랙티브 작품입니다. 스크롤하면 출근길의 장면이 차례로 바뀝니다.',
    descriptionEn: 'An interactive piece about the scenery and rhythm of an urban commute. Scroll to move through the scenes of the morning journey.',
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
    description: '따뜻한 낮빛 속 점심시간의 짧은 틈을 WebGL로 그린 인터랙티브 작품입니다. 마우스를 움직이면 태양의 위치가 바뀌고, 부드러운 광선과 구름이 천천히 흘러갑니다.',
    descriptionEn: 'An interactive WebGL piece about a short lunchtime pause in warm daylight. Move the mouse to shift the sun, and watch soft rays and clouds drift slowly by.',
    keywords: ['낮빛', '태양', '구름', '점심', 'daylight', 'sun', 'clouds', 'lunch'],
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