import HeroSection from '@/components/HeroSection';
import SessionGrid from '@/components/SessionGrid';
import ArtistGrid from '@/components/ArtistGrid';
import CTA from '@/components/CTA';

export default function Home() {
  return (
    <main className="bg-black space-y-24">
      <HeroSection />
      <section className="px-6">
        <h2 className="text-3xl font-bold mb-4">Nouvelles sessions</h2>
        <SessionGrid />
      </section>
      <section className="px-6">
        <h2 className="text-3xl font-bold mb-4">Artistes à découvrir</h2>
        <ArtistGrid />
      </section>
      <CTA />
    </main>
  );
}
