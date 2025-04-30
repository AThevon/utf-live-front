import { getLiveSession } from "@/lib/api/liveSessions";
import Image from "next/image";
import Link from "next/link";
import { formatDateFR } from "@/utils/formatDate";
import type { Participant, Platform } from "@/types";
import ArtistAvatar from "@/components/ui/ArtistAvatar";
import LiveSessionDescription from "@/components/live-sessions/LiveSessionDescription";
import { Divider } from "@heroui/react";
import TooltipWrapper from "@/components/layout/TooltipWrapper";
import SocialCard from "@/components/ui/SocialCard";
import { CornerRightDown } from "lucide-react";
import BackButton from "@/components/ui/BackButton";

type LiveSessionProps = {
  params: Promise<{ slug: string }>;
};


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await getLiveSession(slug);

  return {
    title: `${session.title} – Live Session | Under The Flow`,
    description:
      session.description?.slice(0, 160) ||
      `Regardez la session live "${session.title}" sur Under The Flow, une performance unique d’un·e artiste de la scène urbaine.`,
  };
}

export default async function LiveSession({ params }: LiveSessionProps) {
  const { slug } = await params;
  const session = await getLiveSession(slug);


  return (
    <div className="px-6 w-full py-10 max-w-7xl mx-auto text-white">
      <BackButton />
      {/* Video */}
      <h1 className="text-2xl lg:text-4xl text-center md:text-start font-bold !tracking-widest mb-5 ml-4">{session.title}</h1>
      <div className="rounded-xl overflow-hidden shadow-xl bg-zinc-900">
        <iframe
          src={session.video_url}
          className="w-full aspect-video"
          allow="autoplay; fullscreen"
        />
      </div>

      {/* Infos */}
      <div className="mt-5 flex flex-col md:flex-row gap-8">
        {/* Text section */}
        <div className="flex-1 ">
          <div className="flex flex-col sm:flex-row gap-3 md:gap-0 justify-between items-center sm:px-4">
            <ArtistAvatar artist={session.artist} className="" />
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <p className="text-sm text-zinc-500">
                Publiée le {formatDateFR(session.published_at)}
              </p>
              <p className="font-secondary tracking-xxl text-sm px-4 py-1 rounded-xl bg-zinc-500 text-white">{session.genre}</p>
            </div>
          </div>
          <Divider className="my-6 mx-auto w-[98%]" />
          <LiveSessionDescription description={session.description} session={session} />
          {/* Socials */}
          <div className="pt-8">
            <h3 className="text-lg font-semibold mb-3 text-white/90">
              Retrouve {session.artist.name} ici <CornerRightDown className="inline-block translate-y-1 w-4 h-4" />
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {session.artist.platforms.social.map((platform: Platform) => (
                <SocialCard key={platform.slug} platform={platform} />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Participants */}
      {session.participants.length > 0 && (
        <div>
          <Divider className="my-8 mb-4 mx-auto w-[98%]" />
          <h2 className="text-lg font-semibold mb-2">
            Avec la participation de :
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {session.participants.map((p: Participant) => (
              <div key={p.id} className="p-5 rounded-xl transition border border-zinc-700/40 flex justify-between items-center">
                <p className="font-semibold text-lg">{p.name}</p>
                <div className="flex gap-2">
                  {p.platforms.map((platform) => (
                    <TooltipWrapper key={platform.slug} content={platform.name}>
                      <Link
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-[5px] rounded-full bg-zinc-800/50 hover:bg-zinc-700/60 border border-zinc-700/40 transition"
                      >
                        <Image
                          src={platform.icon_url}
                          alt={platform.name}
                          width={20}
                          height={20}
                          className="opacity-90 w-5 h-5"
                        />
                      </Link>
                    </TooltipWrapper>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
