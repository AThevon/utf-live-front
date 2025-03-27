'use client';

import { Card, CardBody, Image, CardFooter, Skeleton } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { ArtistList } from '@/types';


type ArtistCardProps = {
  artist: ArtistList;
};

export default function ArtistCard({ artist }: ArtistCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const router = useRouter();

  if (!artist) return null;


  function navigateToArtist() {
    setTimeout(() => {
      router.push(`/artists/${artist.slug}`);
    }, 300);
  }

  return (
    <Card
      className="group/card w-full h-full hover:shadow-lg transition-shadow flex flex-col relative"
      isPressable
      isFooterBlurred
      onPress={navigateToArtist}
    >
      <CardBody className="overflow-hidden p-0">
        {!isImageLoaded && (
          <Skeleton className="absolute top-0 left-0 w-full h-full z-0 rounded-none" />
        )}
        <Image
          removeWrapper
          src={artist.profile_image}
          alt={artist.name}
          className={`w-full h-full object-cover rounded-none z-0 transition-transform group-hover/card:scale-105 ${isImageLoaded ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-300`}
          onLoad={() => setIsImageLoaded(true)}
        />
      </CardBody>
      <CardFooter className="absolute z-10 bottom-0 bg-transparent flex justify-center items-center w-full p-4">
        <h2 className="text-xl font-semibold">{artist.name}</h2>
        <ArrowRight
          className="w-5 h-5 text-white absolute right-4 opacity-0 translate-x-2 transition-all duration-300 group-hover/card:opacity-100 group-hover/card:translate-x-0"
        />

      </CardFooter>
    </Card>
  );
}
