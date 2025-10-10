'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

export default function HeroImage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const src = `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/common/hero-tv.png`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Scale: de 1 à 0.7
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);

  // Border radius: de 0 à 200px
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 200]);

  // Translation Y: remonte progressivement hors de l'écran
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Opacity: fade out vers la fin
  const opacity = useTransform(scrollYProgress, [0.7, 1], [1, 0]);

  return (
    <div ref={containerRef} className="h-[170vh]">
      <motion.div
        className="sticky top-0 h-[calc(100vh-80px)] w-full overflow-hidden"
        style={{
          scale,
          borderRadius,
          y: useTransform(y, (value) => `${value}vh`),
          opacity,
        }}
      >
        <Image
          src={src}
          alt="Hero Image"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </motion.div>
    </div>
  );
}
