import HeroSection from '@/components/HeroSection';
import CTA from '@/components/CTA';
import { getLatestLiveSession } from '@/lib/api/liveSessions';
import SessionGridLatest from '@/components/SessionGridLatest';

export default async function Home() {

  const latestLiveSessions = await getLatestLiveSession();

  return (
    <main className="bg-black space-y-24">
      <HeroSection />
      <section className="px-6">
        <h2 className="text-3xl font-bold mb-4">Nouvelles sessions</h2>
        <SessionGridLatest sessions={latestLiveSessions} />
      </section>
      <section className="px-6">
        <h2 className="text-3xl font-bold mb-4">Artistes à découvrir</h2>
      </section>
      <CTA />
    </main>
  );
}
