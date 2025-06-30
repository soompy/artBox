export interface Artwork {
  id: string;
  slug: string;
  title: string;
  titleEn?: string;
  year: number;
  description: string;
  descriptionEn?: string;
  keywords: string[];
  technologies: string[];
  thumbnail: string;
  featured?: boolean;
  status: 'active' | 'development' | 'archived';
  metadata?: {
    duration?: number;
    interactive?: boolean;
    soundEnabled?: boolean;
    mobileOptimized?: boolean;
  };
}

export interface ArtworkConfig {
  artworks: Artwork[];
}