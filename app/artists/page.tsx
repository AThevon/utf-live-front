import ArtistGrid from "@/components/ArtistGrid";
import { getAllArtists } from "@/lib/api/artists";



export default async function ArtistsPage() {
  const artists = await getAllArtists()

  return (
    <div className="px-8 py-4 max-h-screen-minus-navbar">
      <ArtistGrid artists={artists} />
    </div>
  );
}
