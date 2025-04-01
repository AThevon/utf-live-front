"use client";

import { ArtistList } from "@/types";
import { Avatar } from "@heroui/react";
import Link from "next/link";

type ArtistAvatarProps = {
  artist: ArtistList;
  size?: "sm" | "lg";
  className?: string;
  isBordered?: boolean;
  isRounded?: boolean;
};

export default function ArtistAvatar({ artist, size, isRounded = true, isBordered = true, className }: ArtistAvatarProps) {
  if (!artist) return;
  return (
    <Link href={`/artists/${artist.slug}`} className={`${className} group !flex items-center ${size === "sm" ? "gap-2" : "gap-4"} w-fit transition-colors duration-300 hover:text-zinc-300`}>
      <Avatar
        isBordered={isBordered}
        radius={isRounded ? "lg" : "none"}
        src={artist.profile_image}
        alt={artist.name}
        className={`transition-transform duration-300  object-contain ${size === "sm" ? "w-6 h-6" : size === "lg" ? "w-16 h-16 group-hover:scale-105" : "w-10 h-10 group-hover:scale-105"}`}
      />
      <h3 className={`${size === "sm" ? "text-md max-w-[130px]" : "text-lg"} font-semibold leading-none`}>{artist.name}</h3>
    </Link>
  );
}