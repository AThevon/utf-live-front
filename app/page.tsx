import ArtistGallery from '@/components/home/ArtistGallery'
import CTA from '@/components/home/CTA'
import { getLatestLiveSession } from '@/lib/api/liveSessions'
import { getRandomArtistImages } from '@/lib/api/artists'
import LatestSessionsGrid from '@/components/home/LatestSessionsGrid'
import HeroInfos from '@/components/home/HeroInfos'
import BackgroundBlurSpheres from '@/components/home/BackgroundBlurSpheres'
import LatestSession from '@/components/home/LatestSession'
import HeroImage from '@/components/home/HeroImage'

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Under The Flow',
  description: 'Under The Flow est une plateforme dédiée aux live sessions musicales et à la culture urbaine émergente. Découvrez des performances uniques et des artistes authentiques.',
};

export default async function Home() {
  const latestLiveSessions = await getLatestLiveSession()
  const randomArtists = await getRandomArtistImages(12)

  return (
    <>
      <BackgroundBlurSpheres />
      <div className="relative h-[150vh]">
        <HeroImage />
        <div className="absolute top-0 left-0 w-full">
          <HeroInfos />
        </div>
      </div>
      <ArtistGallery artists={randomArtists} />
      <LatestSession session={latestLiveSessions[0]} />
      <LatestSessionsGrid sessions={latestLiveSessions} />
      <CTA />
    </>
  )
}

