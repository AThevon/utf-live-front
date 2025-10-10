'use client'

import { motion, useTransform, useScroll, MotionValue } from 'framer-motion'
import { Card } from '@heroui/react'
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
    xOffset: number
  }
}

function ArtistCard({ artist, scrollY, offset }: ArtistCardProps) {
  const y = useTransform(scrollY, (value) => value * offset.yMultiplier)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      transition={{
        duration: 0.8,
        delay: offset.delay,
        ease: 'easeOut',
      }}
      viewport={{ once: false, amount: 0.3 }}
      style={{ y, x: offset.xOffset }}
    >
      <Link href={`/artists/${artist.slug}`}>
        <motion.div
          className="aspect-[3/4] group"
          style={{ rotate: offset.rotation }}
          whileHover={{
            scale: 1.08,
            rotate: 0,
            transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
          }}
        >
          <Card
            isPressable
            isHoverable
            className="w-full h-full overflow-hidden p-0 relative"
          >
            <Image
              src={artist.image_url}
              alt={artist.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-bold text-lg">{artist.name}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </Link>
    </motion.div>
  )
}

// Fonction de seed pour générer des valeurs "random" déterministes
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

export default function ArtistGallery({ artists }: ArtistGalleryProps) {
  const { scrollY } = useScroll()

  // Générer des offsets déterministes basés sur l'ID de l'artiste
  const randomOffsets = useMemo(() => {
    return artists.map((artist) => ({
      yMultiplier: (seededRandom(artist.id * 1.1) - 0.5) * 0.3,
      rotation: (seededRandom(artist.id * 2.3) - 0.5) * 6,
      delay: seededRandom(artist.id * 3.7) * 0.3,
      xOffset: (seededRandom(artist.id * 4.9) - 0.5) * 80, // Décalage horizontal aléatoire entre -40px et +40px
    }))
  }, [artists])

  if (artists.length === 0) return null

  return (
    <section className="relative h-[180vh] lg:h-[230vh] w-full px-4 sm:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto mt-32">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 pb-20">
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
