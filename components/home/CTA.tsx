'use client';

import ContactButton from '@/components/ui/ContactButton';

export default function CTA() {
  return (
    <section className="relative z-10 text-center">
      <div className="mx-auto backdrop-blur-md bg-black/40 py-10 px-4 md:p-10 sm:p-16">
        <h2 className="text-4xl font-bold mb-4 text-white">
          Tu veux participer ?
        </h2>
        <p className="text-zinc-300">
          Nous sommes toujours à la recherche de talents à mettre en lumière.
        </p>
        <ContactButton
          size="lg"
          activeMatch={false}
          className="mt-8 w-full md:w-fit md:px-20 mx-auto bg-white text-black hover:bg-zinc-100"
        />
      </div>
    </section>
  );
}
