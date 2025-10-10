'use client'

import { motion, useTransform, useScroll, MotionValue } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'
import type { RandomArtistImage } from '@/types'

interface ArtistGalleryProps {
  artists: RandomArtistImage[]
}

interface ArtistCardProps {
  artist: RandomArtistImage
  scrollY: MotionValue<number>
  offset: {
    yMultiplier: number
    rotation: number
    delay: number
  }
}

function ArtistCard({ artist, scrollY, offset }: ArtistCardProps) {
  const y = useTransform(scrollY, (value) => value * offset.yMultiplier)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{
        duration: 0.8,
        delay: offset.delay,
        ease: 'easeOut',
      }}
      viewport={{ once: false, amount: 0.3 }}
      style={{ y }}
      className="group"
    >
      <Link href={`/artists/${artist.slug}`}>
        <motion.div
          className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl"
          style={{ rotate: offset.rotation }}
          whileHover={{
            scale: 1.05,
            rotate: 0,
            transition: { duration: 0.3 },
          }}
        >
          <Image
            src={artist.image_url}
            alt={artist.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white font-bold text-lg">{artist.name}</p>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

export default function ArtistGallery({ artists }: ArtistGalleryProps) {
  const { scrollY } = useScroll()

  const randomOffsets = useMemo(() => {
    return Array.from({ length: artists.length }, () => ({
      yMultiplier: (Math.random() - 0.5) * 0.3,
      rotation: (Math.random() - 0.5) * 6,
      delay: Math.random() * 0.3,
    }))
  }, [artists.length])

  if (artists.length === 0) return null

  return (
    <section className="relative w-full py-32 px-4 sm:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          Nos artistes
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {artists.map((artist, index) => (
            <ArtistCard
              key={artist.id}
              artist={artist}
              scrollY={scrollY}
              offset={randomOffsets[index] || randomOffsets[0]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
