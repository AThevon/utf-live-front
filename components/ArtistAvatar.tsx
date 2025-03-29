"use client";

import { Artist } from "@/types";
import { Avatar } from "@heroui/react";
import Link from "next/link";

type ArtistAvatarProps = {
  artist: Artist;
  className?: string;
};

export default function ArtistAvatar({ artist, className }: ArtistAvatarProps) {
  if (!artist) return;
  return (
    <Link href={`/artists/${artist.slug}`} className={`${className} flex items-center gap-4 w-fit transition-colors duration-300 hover:text-zinc-300`}>
      <Avatar
        isBordered
        radius="lg"
        src={artist.profile_image}
        alt={artist.name}
        className="transition-transform duration-300 hover:scale-105"
      />
      <h3 className="text-lg font-semibold">{artist.name}</h3>
    </Link>
  );
}