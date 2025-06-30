import { notFound } from 'next/navigation';
import { getArtworkBySlug, getAllArtworks } from '@/data/artworks';
import ArtworkViewer from '@/components/artworks/ArtworkViewer';

interface ArtworkPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const artworks = getAllArtworks();
  return artworks.map((artwork) => ({
    slug: artwork.slug,
  }));
}

export async function generateMetadata({ params }: ArtworkPageProps) {
  const { slug } = await params;
  const artwork = getArtworkBySlug(slug);

  if (!artwork) {
    return {
      title: 'Artwork Not Found',
    };
  }

  return {
    title: `${artwork.title} | Interactive Art Gallery`,
    description: artwork.description,
    keywords: artwork.keywords,
    openGraph: {
      title: `${artwork.title} | Interactive Art Gallery`,
      description: artwork.description,
      images: [artwork.thumbnail],
    },
  };
}

export default async function ArtworkPage({ params }: ArtworkPageProps) {
  const { slug } = await params;
  const artwork = getArtworkBySlug(slug);

  if (!artwork) {
    notFound();
  }

  return <ArtworkViewer artwork={artwork} />;
}