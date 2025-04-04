"use client"

import { Button } from '@heroui/react'
import { Typewriter } from 'react-simple-typewriter'
import Link from 'next/link'

export default function HeroInfos() {
  return (
    <div className="z-10 flex flex-col items-start justify-center px-10 py-10 md:py-0 h-full space-y-8">
      <div>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tight glitch-text relative">
          Under The Flow
          <span className="glitch-layer" aria-hidden="true">Under The Flow</span>
        </h1>
        <div className="mt-3 text-zinc-400 text-lg md:text-3xl font-medium">
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
            deleteSpeed={35}
            delaySpeed={4000}
          />
        </div>
      </div>

      <p className="italic text-zinc-400 text-sm md:text-base max-w-md">
        &quot;Là où le silence résonne, la musique prend la parole.&quot;
      </p>

      <Button
        as={Link}
        href="/live-sessions"
        variant="flat"
      >
        Explorer les sessions →
      </Button>
    </div>
  )
}
