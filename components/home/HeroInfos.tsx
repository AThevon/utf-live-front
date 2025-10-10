"use client"

import { Button } from '@heroui/react'
import { Typewriter } from 'react-simple-typewriter'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function HeroInfos() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Le contenu reste visible pendant le scroll de l'image, puis disparaît
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [0, -50, -150])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.8, 1], [1, 1, 0.5, 0])

  return (
    <div ref={containerRef} className="h-[90vh]">
      <motion.div
        className="sticky top-0 z-10 w-full flex flex-col items-center justify-center pt-12 h-[calc(100vh-80px)] space-y-8"
        style={{ y, opacity }}
      >
        <div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight glitch-text relative text-center">
            Under The Flow
            <span className="glitch-layer" aria-hidden="true">Under The Flow</span>
          </h1>
          <div className="text-zinc-400 text-lg md:text-3xl font-medium text-center w-full">
            <Typewriter
              words={[
                "Branche la télé, monte le son.",
                "Raw sessions, real artists.",
                "Tous les styles. Zéro filtre.",
              ]}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={20}
              delaySpeed={4000}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-3">
          <Button
            as={Link}
            className='btn group/btn w-full py-6 bg-white text-black border-white'
            href="/live-sessions"
            variant="solid"
            size="lg"
            endContent={<ArrowRight className="h-5 group-hover/btn:translate-x-1 transition-all" />}
          >
            Voir les sessions
          </Button>
          <Button
            as={Link}
            className='btn group/btn w-full py-6'
            href="/artists"
            variant="solid"
            size="lg"
            endContent={<ArrowRight className="h-5 group-hover/btn:translate-x-1 transition-all" />}
          >
            Voir les artistes
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
