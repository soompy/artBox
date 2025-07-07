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