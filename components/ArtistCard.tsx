'use client';

import { Card, CardBody, Image, CardFooter } from '@heroui/react';
import { useRouter } from 'next/navigation';
import type { ArtistList } from '@/types';


type ArtistCardProps = {
  artist: ArtistList;
};

export default function ArtistCard({ artist }: ArtistCardProps) {
  const router = useRouter();

  if (!artist) return

  function navigateToArtist() {
    setTimeout(() => {
      router.push(`/artists/${artist.slug}`);
    }, 300);
  }

  return (
    <Card
      className="group hover:shadow-lg transition-shadow flex flex-col"
      isPressable
      isFooterBlurred
      onPress={navigateToArtist}
    >
      <CardBody className="overflow-hidden p-0">
        <Image
          removeWrapper
          src={artist.profile_image}
          alt={artist.name}
          className="w-full h-full object-cover rounded-none z-0 transition-transform group-hover:scale-105"
        />
      </CardBody>
      <CardFooter className="absolute z-10 bottom-0 bg-transparent flex flex-col gap-2 p-4">
        <h2 className="text-xl font-semibold">{artist.name}</h2>
        {/* <p className="text-sm text-muted-foreground line-clamp-3">{artist.bio}</p> */}
      </CardFooter>
    </Card>
  );
}
