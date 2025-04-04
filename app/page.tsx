// Version avec effet "glitch" sur le h1
// et un "typewriter" (texte qui s'affiche caractère par caractère) sur la catchphrase

import HeroSection from '@/components/HeroSection'
import CTA from '@/components/CTA'
import { getLatestLiveSession } from '@/lib/api/liveSessions'
import SessionGridLatest from '@/components/SessionGridLatest'
import TVScene from '@/components/TVScene'
import HeroInfos from '@/components/HeroInfos'

export default async function Home() {
  const latestLiveSessions = await getLatestLiveSession()

  return (
    <div className="!bg-black">
      <div className="relative h-screen-minus-navbar grid grid-cols-1 md:grid-cols-2">
        {/* LEFT CONTENT */}
        <HeroInfos />

        <div className="absolute inset-0 z-0 w-screen">
          <TVScene />
        </div>
      </div>

      <HeroSection />
      <section id="sessions" className="px-10 my-24">
        <SessionGridLatest sessions={latestLiveSessions} />
      </section>
      <CTA />
    </div>
  )
}

