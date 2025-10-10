import TextReveal from '@/components/home/TextReveal'
import CTA from '@/components/home/CTA'
import { getLatestLiveSession } from '@/lib/api/liveSessions'
import LatestSessionsGrid from '@/components/home/LatestSessionsGrid'
import HeroInfos from '@/components/home/HeroInfos'
import BackgroundBlurSpheres from '@/components/home/BackgroundBlurSpheres'
import LatestSession from '@/components/home/LatestSession'

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Under The Flow',
  description: 'Under The Flow est une plateforme dédiée aux live sessions musicales et à la culture urbaine émergente. Découvrez des performances uniques et des artistes authentiques.',
};

export default async function Home() {
  const latestLiveSessions = await getLatestLiveSession()

  return (
    <>
      <BackgroundBlurSpheres />
      <section className="relative z-10 h-screen-minus-navbar grid grid-cols-1 md:grid-cols-2">
        <HeroInfos />
      </section>
      <TextReveal />
      <LatestSession session={latestLiveSessions[0]} />
      <LatestSessionsGrid sessions={latestLiveSessions} />
      <CTA />
    </>
  )
}

