import ArtistGrid from "@/components/ArtistGrid";
import { getAllArtists } from "@/lib/api/artists";



export default async function ArtistsPage() {
  const artists = await getAllArtists()

  return (
    <div className="px-8 pt-4 pb-10">
      <ArtistGrid artists={artists} />
    </div>
  );
}
