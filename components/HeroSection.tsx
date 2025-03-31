'use client'
import Image from 'next/image';
import ContactButton from './ContactButton';

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
        <h1 className="text-5xl font-bold">Under The Flow</h1>
        <p className="text-zinc-300">Un live vibrant dans un décor brut & coloré</p>
        <ContactButton className="mt-4 px-20 w-fit mx-auto" size='lg' />
      </div>
    </section>
  );
}
