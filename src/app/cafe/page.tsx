import type { Metadata } from 'next';
import { MotiCafe } from '@/components/moti/cafe/MotiCafe';
import { getArtworkBySlug } from '@/data/artworks';

const artwork = getArtworkBySlug('cafe')!;

export const metadata: Metadata = {
  title: artwork.title,
  description: artwork.description,
  openGraph: {
    url: '/moti/cafe',
    title: artwork.title,
    description: artwork.description,
  },
  twitter: {
    title: artwork.title,
    description: artwork.description,
  },
};

export default function CafePage() {
  return (
    <main>
      <MotiCafe />
    </main>
  );
}
