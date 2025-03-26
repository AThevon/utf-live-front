import ArtistGrid from "@/components/ArtistGrid";
import { getAllArtists } from "@/lib/api/artists";



export default async function ArtistsPage() {
  const artists = await getAllArtists()

  return (
    <div className="px-8">
      {/* <h1 className="text-3xl font-bold mb-6">Artistes</h1> */}
      <ArtistGrid artists={artists} />
    </div>
  );
}
