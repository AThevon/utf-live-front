import { getArtist } from "@/lib/api/artists";
import Image from "next/image";

type ArtistProps = {
  params: Promise<{ slug: string }>;
};

export default async function Artist({ params }: ArtistProps) {
  const { slug } = await params;
  const artist = await getArtist(slug);
  return (
    <div>
      <h1 className="text-2xl font-bold">Artist</h1>
      <p>{artist.name}</p>
      <p>{artist.bio}</p>
        <Image
          src={artist.images[0].url}
          alt={artist.name}
          width={1000}
          height={1000}
          className="relative inset-0 w-1/2 h-screen object-cover"
        />
    </div>
  );
}