'use client';

import ContactButton from '@/components/ContactButton';

export default function CTA() {
  return (
    <section className="text-center py-20 px-6 bg-zinc-900">
      <h2 className="text-4xl font-bold mb-4 text-white">Tu veux proposer une session ?</h2>
      <p className="text-zinc-400">
        Nous sommes toujours à la recherche de talents à mettre en lumière.
      </p>
      <ContactButton size="lg" activeMatch={false} className="mt-8 w-[20rem]" />
    </section>
  );
}