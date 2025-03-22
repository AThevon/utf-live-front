'use client';
import Image from 'next/image';
import { Card } from '@heroui/react';

type ArtistCardProps = {
  name: string;
  photo: string;
  href: string;
};

export default function ArtistCard({ name, photo, href }: ArtistCardProps) {
  return (
    <Card as="a" href={href} className="hover:opacity-90 transition">
      <Image
        src={photo}
        alt={name}
        width={300}
        height={300}
        className="rounded-full object-cover"
      />
      <p className="mt-3 text-white text-center text-lg font-medium">{name}</p>
    </Card>
  );
}
