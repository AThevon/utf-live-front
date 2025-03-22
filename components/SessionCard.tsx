'use client';
import { Card, CardHeader, CardBody, Image } from "@heroui/react";

type SessionCardProps = {
  title: string;
  artist: string;
  thumbnail: string;
  href: string;
};

export default function SessionCard({ title, artist, thumbnail, href }: SessionCardProps) {
  return (
    <Card as="a" href={href} className="group transition-all hover:scale-[1.02]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <Image
          src={thumbnail}
          alt={title}
          width={600}
          height={340}
          className="rounded-xl object-cover"
        />
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-zinc-400">{artist}</p>
      </CardBody>
    </Card>
  );
}
