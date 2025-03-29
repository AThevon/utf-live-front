import { getLiveSession } from "@/lib/api/liveSessions";
import Image from "next/image";
import Link from "next/link";
import { formatDateFR } from "@/utils/formatDate";
import type { Participant, Social } from "@/types";
import ArtistAvatar from "@/components/ArtistAvatar";
import LiveSessionDescription from "@/components/LiveSessionDescription";

type LiveSessionProps = {
  params: Promise<{ slug: string }>;
};

export default async function LiveSession({ params }: LiveSessionProps) {
  const { slug } = await params;
  const session = await getLiveSession(slug);


  return (
    <div className="px-6 py-10 max-w-7xl mx-auto text-white">
      {/* Video */}
      <h1 className="text-4xl font-bold mb-5 ml-4">{session.title}</h1>
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
        <div className="flex-1 space-y-4">
          <ArtistAvatar artist={session.artist} className="" />
          <p className="text-sm text-zinc-500">
            Publiée le {formatDateFR(session.published_at)}
          </p>
          <LiveSessionDescription description={session.description} session={session} />


          {/* Socials */}
          <div className="flex flex-wrap gap-3 mt-6">
            {session.artist.socials.map((s: Social) => (
              <Link
                key={s.slug}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-zinc-800/40 hover:bg-zinc-700 transition px-3 py-1.5 rounded-full text-sm font-medium text-white/80 hover:text-white"
              >
                <Image
                  src={s.icon_url}
                  alt={s.name}
                  width={20}
                  height={20}
                  className="opacity-80"
                />
                <span className="capitalize">{s.name}</span>
              </Link>
            ))}
          </div>

        </div>
      </div>

      {/* Participants */}
{session.participants.length > 0 && (
  <div className="mt-12">
    <h2 className="text-xl font-semibold mb-6 border-b border-zinc-700 pb-2">
      Avec la participation de :
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {session.participants.map((p: Participant) => (
        <div key={p.id} className="p-5 rounded-xl bg-zinc-800/40 hover:bg-zinc-800/60 transition border border-zinc-700/40">
          <p className="font-semibold text-lg mb-3">{p.name}</p>
          <div className="flex gap-3">
            {p.socials.map((s) => (
              <Link
                key={s.slug}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded-full bg-zinc-700 hover:bg-zinc-600 transition"
              >
                <Image
                  src={s.icon_url}
                  alt={s.name}
                  width={20}
                  height={20}
                  className="opacity-90"
                />
              </Link>
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
