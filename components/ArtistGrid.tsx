'use client';

import type { ArtistList } from '@/types';
import ArtistCard from './ArtistCard';
import useEmblaCarousel from 'embla-carousel-react';
import Autoscroll from 'embla-carousel-auto-scroll';

type ArtistGridProps = {
  artists: ArtistList[];
};

export default function ArtistGrid({ artists }: ArtistGridProps) {
  const [emblaRef] = useEmblaCarousel(
    {
      align: 'start',
      containScroll: 'trimSnaps',
      dragThreshold: 5,
    },
    [Autoscroll({ 
      speed: 0.4,
      startDelay: 4000,
      stopOnInteraction: true,
     })]
  );

  if (!artists) return null;

  return (
    <div ref={emblaRef} className="overflow-hidden rounded-lg">
      <div className="h-[calc(100vh-6rem)] flex ">
        {artists.map((artist) => (
          <div
            key={artist.id}
            className="flex-shrink-0 px-2 w-full hidden md:block md:w-1/2 xl:w-1/3 2xl:w-1/4"
          >
            <ArtistCard artist={artist} />
          </div>
        ))}
      </div>
    </div>
  );
}
