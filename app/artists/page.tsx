// app/artists/page.tsx

import ArtistCard from "@/components/ArtistCard";


type Artist = {
  id: number;
  name: string;
  slug: string;
  bio: string;
  images: {
    url: string;
    alt: string;
  }[];
  socials: {
    name: string;
    slug: string;
    icon_url: string;
    url: string;
  }[];
};

export default async function ArtistsPage() {
  const res = await fetch('http://localhost/api/artists', {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error('Failed to fetch artists');

  const data = await res.json();
  const artists: Artist[] = data.data;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Artistes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
}
