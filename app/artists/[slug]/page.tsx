import BackButton from "@/components/BackButton"
import ImageSwiper from "@/components/ImageSwiper"
import MusicContainer from "@/components/MusicContainer"
import SocialCard from "@/components/SocialCard"
import { getArtist } from "@/lib/api/artists"
import { Divider } from "@heroui/react"

type ArtistProps = {
  params: Promise<{ slug: string }>
}

export default async function Artist({ params }: ArtistProps) {
  const { slug } = await params
  const artist = await getArtist(slug)

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[60%_40%] min-h-screen-minus-navbar max-w-[2000px] mx-auto w-full px-4 sm:px-8 md:px-12 xl:px-32">
      <BackButton className="hidden xl:block" />
      {/* Texte à gauche */}
      <div className="text-center sm:text-start flex flex-col justify-center pt-4 pb-10 xl:pr-20">
        <h1 className="text-4xl md:text-6xl xl:text-8xl text-center sm:text-start max-w-2xl -ml-3 font-bold tracking-widest">{artist.name}</h1>
        <Divider className="my-2 w-[40%] mx-auto sm:mx-0" />
        <p className="text-zinc-400 whitespace-pre-line mt-2">{artist.bio}</p>

        <div className="flex flex-col gap-2 mt-auto">
          <h3 className="text-lg font-semibold mt-6">
            Son dernier projet
          </h3>
          <div className="">
            <MusicContainer musicServices={artist.platforms.music} />
          </div>
          <Divider className="w-[70%] my-4 mx-auto sm:mx-0" />
          <h3 className="text-lg font-semibold">
            Retrouve {artist.name} ici
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 text-start">
            {artist.platforms.social.map((social) => (
              <SocialCard key={social.slug} social={social} />
            ))}
          </div>
        </div>
      </div>

      {/* Image swiper vertical avec thumbs */}
      <ImageSwiper images={artist.images} />
    </div>
  )
}
