import HeroSection from '@/components/HeroSection';
import CTA from '@/components/CTA';
import { getLatestLiveSession } from '@/lib/api/liveSessions';
import SessionGridLatest from '@/components/SessionGridLatest';

export default async function Home() {

  const latestLiveSessions = await getLatestLiveSession();

  return (
    <main className="bg-black space-y-24">
      <HeroSection />
      <section className="px-10">
        <h2 className="text-3xl font-bold mb-4">Derniers lives</h2>
        <SessionGridLatest sessions={latestLiveSessions} />
      </section>
      <CTA />
    </main>
  );
}
