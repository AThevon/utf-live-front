'use client';

import { useRouter } from "next/navigation";
import { LiveSessionList } from "@/types";
import { Button, Card, Image, Skeleton } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import MiniAudioPlayer from "@/components/MiniAudioPlayer";
import { formatDateFR } from "@/utils/formatDate";


type SessionCardProps = {
  session: LiveSessionList;
  index: number;
};

export default function SessionCard({ session }: SessionCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const router = useRouter();

  function navigateToSession() {
    setTimeout(() => {
      router.push(`/live-sessions/${session.slug}`);
    }, 300);
  }

  return (
    <Card
      isBlurred
      className="group/card relative flex flex-row transition-all bg-gradient-to-br from-zinc-900 to-zinc-950 text-white"
    >
      <div className="p-0 flex-1 grid grid-cols-1 md:grid-cols-2 place-items-center md:place-items-stretch">
        {!isImageLoaded && (
          <Skeleton className="absolute left-0 top-0 w-[42%] h-full z-0 rounded-none clipped-image" />
        )}
        <Image
          src={session.thumbnail_url}
          alt=""
          isBlurred
          className={`object-cover md:-translate-x-3 xl:group-hover/card:translate-x-0 h-full w-full max-h-[350px] md:max-h-full p-5 md:p-0 rounded-lg overflow-hidden md:rounded-none md:clipped-image  ${isImageLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          onLoad={() => setIsImageLoaded(true)}
        />


        <div className="flex flex-col text-start w-full gap-2 p-4">
          <div className="p-2 text-center md:text-end">
            <h3 className="text-2xl font-semibold">{session.title}</h3>
            <p className="text-md text-zinc-400">{session.artist.name}</p>
            {session.published_at && <p className="text-sm text-zinc-500">{formatDateFR(session.published_at)}</p>}
          </div>

          <div className="mt-auto">
            <MiniAudioPlayer url={session.video_url} />
          </div>

          <Button
            aria-label="Go to session"
            color="default"
            variant="solid"
            className="group/btn flex py-7 items-center text-md"
            onPress={navigateToSession}
            endContent={
              <ArrowRight className="w-5 h-5 mt-[3px] transition-transform group-hover/btn:translate-x-1" />
            }>
            <span>Voir le live</span>
          </Button>

        </div>


      </div>
    </Card>
  );
}
