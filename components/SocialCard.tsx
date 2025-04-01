"use client";

import { Button, Image } from "@heroui/react";
import Link from "next/link";

type SocialCardProps = {
  social: {
    slug: string;
    name: string;
    url: string;
    icon_url: string;
  };
};


export default function SocialCard({ social }: SocialCardProps) {

  return (
    <Button
      as={Link}
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 bg-zinc-800/50 hover:bg-zinc-700/60 transition border border-zinc-700/40 px-4 py-7 text-white/90 hover:text-white group"
    >
      <Image
        src={social.icon_url}
        alt={social.name}
        className="w-6 h-6 opacity-90 rounded-none"
      />
      <div className="flex-1">
        <p className="font-semibold capitalize">{social.name}</p>
      </div>
      <span className="opacity-0 group-hover:opacity-100 transition">
        ↗
      </span>
    </Button>
  );
}