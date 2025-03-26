import type { ArtistList } from '@/types';
import ArtistCard from './ArtistCard';

type ArtistGridProps = {
  artists: ArtistList[];
};

export default function ArtistGrid({ artists }: ArtistGridProps) {
  if (!artists) return;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {artists.map((artist) => (
        <ArtistCard key={artist.id} artist={artist} />
      ))}
    </div>
  );
}
