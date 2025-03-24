'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardBody, CardFooter } from '@heroui/react';


type ArtistCardProps = {
  artist: {
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
};

export default function ArtistCard({ artist }: ArtistCardProps) {
  if (!artist) return
  return (
    <Card className="hover:shadow-lg transition-shadow h-full flex flex-col">
      <Link key={artist.id} href={`/artists/${artist.slug}`} className="group">
        <CardHeader className="p-0 overflow-hidden rounded-t-xl">
          {artist.images[0]?.url && (
            <Image
              src={artist.images[0].url}
              alt={artist.images[0].alt}
              width={400}
              height={400}
              className="w-full h-64 object-cover transition-transform group-hover:scale-105"
            />
          )}
        </CardHeader>

        <CardBody className="flex flex-col gap-2 flex-1">
          <h2 className="text-lg font-semibold">{artist.name}</h2>
          <p className="text-sm text-muted-foreground line-clamp-3">{artist.bio}</p>
        </CardBody>
      </Link>

      <CardFooter className="mt-auto">
        <div className="flex gap-3">
          {artist.socials.map((social) => (
            <Link
              key={social.slug}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              title={social.name}
            >
              <Image
                src={social.icon_url}
                alt={social.name}
                width={24}
                height={24}
                className="w-6 h-6"
              />
            </Link>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
