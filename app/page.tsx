import HeroSection from '@/components/HeroSection';
import SessionGrid from '@/components/SessionGrid';
import CTA from '@/components/CTA';
import { getLatestLiveSession } from '@/lib/api/liveSessions';

export default async function Home() {

  const latestLiveSessions = await getLatestLiveSession();

  return (
    <main className="bg-black space-y-24">
      <HeroSection />
      <section className="px-6">
        <h2 className="text-3xl font-bold mb-4">Nouvelles sessions</h2>
        <SessionGrid sessions={latestLiveSessions} />
      </section>
      <section className="px-6">
        <h2 className="text-3xl font-bold mb-4">Artistes à découvrir</h2>
      </section>
      <CTA />
    </main>
  );
}
