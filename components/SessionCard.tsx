'use client';

import { LiveSessionList } from "@/types";
import { Card, CardBody, Image } from "@heroui/react";
import { useRouter } from "next/navigation";

type SessionCardProps = {
  session: LiveSessionList;
};

export default function SessionCard({ session }: SessionCardProps) {
  const router = useRouter();

  if (!session) return;

  function navigateToSession() {
    setTimeout(() => {
      router.push(`/live-sessions/${session.slug}`);
    }, 300);
  }

  return (
    <Card isPressable onPress={navigateToSession} className="group transition-all hover:scale-[1.02]">
      <CardBody className="overflow-visible py-2 grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="">
          <h3 className="text-lg font-semibold">{session.title}</h3>
          <p className="text-sm text-zinc-400">{session.artist.name}</p>
        </div>
        <Image
          src={session.thumbnail_url}
          alt=""
          className="rounded-xl object-cover h-full"
        />
      </CardBody>
    </Card>
  );
}
