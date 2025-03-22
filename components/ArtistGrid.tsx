'use client';

import ArtistCard from './ArtistCard';

const mockArtists = [
  {
    name: 'SOA',
    photo: '/artists/soa.jpg',
    href: '/artists/soa',
  },
  {
    name: 'Naya',
    photo: '/artists/naya.jpg',
    href: '/artists/naya',
  },
  {
    name: 'JAYE',
    photo: '/artists/jaye.jpg',
    href: '/artists/jaye',
  },
];

export default function ArtistGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {mockArtists.map((artist) => (
        <ArtistCard key={artist.href} {...artist} />
      ))}
    </div>
  );
}
