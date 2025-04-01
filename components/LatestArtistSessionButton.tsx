"use client";

import type { Artist } from "@/types";
import { Button } from "@heroui/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type LatestArtistSessionButtonProps = {
  artist: Artist;
  className?: string;
};

export default function LatestArtistSessionButton({ artist, className }: LatestArtistSessionButtonProps) {
  return (
    <Button
      as={Link}
      href={`/live-sessions/${artist.latest_session_slug}`}
      size="lg"
      className={`${className} group/btn btn text-black bg-white border border-zinc-700/40 w-fit py-2 px-8`}
      endContent={<ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />}
    >
      Voir sa dernière session live
    </Button>
  );
}