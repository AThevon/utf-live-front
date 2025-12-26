"use client";

import type { Platform } from "@/types";
import { Button, Image } from "@heroui/react";
import Link from "next/link";
import TooltipWrapper from "@/components/layout/TooltipWrapper";

type SocialCardProps = {
  platform: Platform;
};


export default function SocialCard({ platform }: SocialCardProps) {
  if (!platform || !platform.icon_url) return null;

  return (
    <TooltipWrapper content={platform.name}>
      <Button
        as={Link}
        href={platform.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 bg-zinc-800/50 hover:bg-zinc-700/60 transition border border-zinc-700/40 px-4 py-7 text-white/90 hover:text-white group"
      >
        <Image
          src={platform.icon_url!}
          alt={platform.name}
          className="w-6 h-6 opacity-90 rounded-none"
        />
        <div className="flex-1">
          <p className="font-semibold capitalize">{platform.name}</p>
        </div>
        <span className="opacity-0 group-hover:opacity-100 transition">↗</span>
      </Button>
    </TooltipWrapper>
  );
}