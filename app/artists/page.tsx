import ArtistGrid from "@/components/artists/ArtistGrid";
import { getAllArtists } from "@/lib/api/artists";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Artistes – Under The Flow',
  description: 'Explorez les artistes qui façonnent l’identité sonore d’Under The Flow à travers des sessions live uniques.',
  openGraph: {
    images: ['/artists/opengraph-image'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/artists/opengraph-image'],
  },
};

export default async function ArtistsPage() {
  const artists = await getAllArtists()

  return (
    <div className="px-2 md:px-8 max-w-[2000px] w-full mx-auto flex flex-col min-h-screen-minus-navbar max-h-screen-minus-navbar">
      <ArtistGrid artists={artists} />
    </div>
  );
}
