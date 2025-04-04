import HeroSection from '@/components/HeroSection';
import CTA from '@/components/CTA';
import { getLatestLiveSession } from '@/lib/api/liveSessions';
import SessionGridLatest from '@/components/SessionGridLatest';

export default async function Home() {

  const latestLiveSessions = await getLatestLiveSession();

  return (
    <main className="bg-black space-y-24">
      <HeroSection />
      <HeroSection />
      <section className="px-10">
        <SessionGridLatest sessions={latestLiveSessions} />
      </section>
      <CTA />
    </main>
  );
}
