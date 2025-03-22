'use client'
import Image from 'next/image';
import { Button } from '@heroui/react';

export default function HeroSection() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center text-center px-6">
      <Image
        src="/hero-session.jpg"
        alt="Session en avant"
        fill
        className="object-cover absolute inset-0 opacity-40"
      />
      <div className="relative z-10 space-y-4">
        <h1 className="text-5xl font-bold">Session exclusive avec SOA</h1>
        <p className="text-zinc-300">Un live vibrant dans un décor brut & coloré</p>
        <Button variant="solid" color="primary" size="lg" as="a" href="/sessions/soa">
          Regarder la session
        </Button>
      </div>
    </section>
  );
}
