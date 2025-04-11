'use client';

import { useRouter } from "next/navigation";
import { LiveSessionList } from "@/types";
import { Button, Card, Divider, Image, Skeleton } from "@heroui/react";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import MiniAudioPlayer from "@/components/audio/MiniAudioPlayer";
import ArtistAvatar from "@/components/ui/ArtistAvatar";
import { formatDateFR } from "@/utils/formatDate";


type SessionCardProps = {
  session: LiveSessionList;
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
      className="group/card w-full relative flex flex-row transition-all bg-gradient-to-br from-zinc-900 to-zinc-950 text-white"
    >
      <div className="p-0 flex-1 grid grid-cols-1 md:grid-cols-2 place-items-center md:place-items-stretch">
        {!isImageLoaded && (
          <>
            <Skeleton className="hidden md:block absolute left-0 top-0 w-[42%] h-full z-0 rounded-none clipped-image" />
            <Skeleton className="block md:hidden w-1/2 mx-auto my-5 h-[310px] z-0" />
          </>
        )}
        <Image
          src={session.thumbnail_url}
          alt=""
          isBlurred
          className={`object-cover md:-translate-x-3 xl:group-hover/card:translate-x-0 h-full w-full md:min-h-[550px] lg:min-h-[430px] max-h-[350px] md:max-h-full lg:max-h-[430px] md:p-0 rounded-lg overflow-hidden md:rounded-none md:clipped-image  ${isImageLoaded ? 'opacity-100 p-5' : 'opacity-0'} transition-opacity duration-300`}
          onLoad={() => setIsImageLoaded(true)}
        />

        <div className="flex flex-col text-start w-full gap-2 p-4">
          <div className="p-2 flex flex-col items-center md:items-end gap-1 text-center md:text-end">
            <h2 className="text-2xl font-semibold !tracking-wide">{session.title}</h2>
            <ArtistAvatar artist={session.artist} isBordered={false} size="sm" className="hidden md:block !text-md text-zinc-400 max-w-sm" />
            <Divider className="mt-3 mb-1 w-1/3" />
            {session.published_at && <p className="font-semibold text-sm text-zinc-500">{formatDateFR(session.published_at)}</p>}
            <p className="font-secondary tracking-xxl text-sm mt-3 px-4 py-1 rounded-xl bg-zinc-500 text-white">{session.genre}</p>
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
