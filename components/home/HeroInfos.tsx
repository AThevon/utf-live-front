"use client"

import { Button } from '@heroui/react'
import { Typewriter } from 'react-simple-typewriter'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HeroInfos() {
  return (
    <div className="z-10 w-screen flex flex-col items-center md:items-start justify-center md:px-20 xl:px-40 py-10 md:py-0 h-full space-y-6">
      <div>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight glitch-text relative text-center md:text-start">
          Under The Flow
          <span className="glitch-layer" aria-hidden="true">Under The Flow</span>
        </h1>
        <div className="text-zinc-400 text-lg md:text-3xl font-medium text-center md:text-start w-full">
          <Typewriter
            words={[
              "Des artistes. Une vibe. Une scène.",
              "Bienvenue dans l’underground de demain.",
              "Une expérience immersive, sonore et visuelle.",
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

      <p className="italic w-full text-zinc-400 text-sm md:text-base max-w-md text-center md:text-start">
        &quot;Là où le silence résonne, la musique prend la parole.&quot;
      </p>
      <div className="flex flex-col md:flex-row items-center gap-3">
        <Button
          as={Link}
          className='btn group/btn w-full md:w-auto py-6 bg-white text-black border-white'
          href="/live-sessions"
          variant="solid"
          size="lg"
          endContent={<ArrowRight className="h-5 group-hover/btn:translate-x-1 transition-all" />}
        >
          Voir les sessions
        </Button>
        <Button
          as={Link}
          className='btn group/btn w-full md:w-auto py-6'
          href="/artists"
          variant="solid"
          size="lg"
          endContent={<ArrowRight className="h-5 group-hover/btn:translate-x-1 transition-all" />}
        >
          Voir les artistes
        </Button>
      </div>
    </div>
  )
}
