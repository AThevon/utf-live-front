'use client';

import { Button } from '@heroui/react';

export default function CTA() {
  return (
    <section className="text-center py-20 px-6 bg-zinc-900">
      <h2 className="text-4xl font-bold mb-4 text-white">Tu veux proposer une session ?</h2>
      <p className="text-zinc-400 mb-6">
        Nous sommes toujours à la recherche de nouveaux talents à mettre en lumière.
      </p>
      <Button variant="solid" color="primary" size="lg" as="a" href="/contact">
        Nous contacter
      </Button>
    </section>
  );
}