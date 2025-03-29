import ArtistGrid from "@/components/ArtistGrid";
import { getAllArtists } from "@/lib/api/artists";



export default async function ArtistsPage() {
  const artists = await getAllArtists()

  return (
    <div className="px-2 md:px-8 max-w-[2000px] mx-auto flex flex-col min-h-screen-minus-navbar max-h-screen-minus-navbar">
      <ArtistGrid artists={artists} />
    </div>
  );
}
