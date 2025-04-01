'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button, Card, Divider, Image } from '@heroui/react'
import { ArrowRight, BookOpenText, Hourglass, UsersRound } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.15
    }
  })
}

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
}

const description = `Under The Flow, c’est une vision. Celle d’un son brut. D’un regard sincère. D’un moment qui compte.

Pas juste une captation. Pas juste un live. Ici, chaque session est une expérience. Un shoot d’émotion, capté avec exigence.

On bosse comme un crew : réal, ingé son, photo — tout est calé pour servir le vrai. Le son est propre, l’image est soignée, la vibe est intacte.

Chaque artiste vient poser son énergie. On la capte en audio, en vidéo, et en photo. C’est une trace. Un instant figé dans le temps. Une manière de dire : "j’étais là, à ce moment précis."

Under The Flow, c’est une scène alternative, stylée, libre. Un terrain de jeu pour les artistes qui veulent montrer qui ils sont, sans détour.`

const founders = [
  {
    name: 'Nitro Vision',
    img: '/nitro.png',
    role: 'Réalisateur / Directeur photo',
    text: `Fondateur d’UTF et œil derrière la caméra, Nitro capte l’essence de chaque session avec une esthétique précise et organique.\n\nSon approche minimaliste sublime l’instant sans jamais le trahir.\nMontage, cadrage, lumière : sa signature est dans la discrétion.`
  },
  {
    name: 'Oniji',
    img: '/oniji.png',
    role: 'Ingénieur son / Mix / Mastering',
    text: `Architecte sonore d’Under The Flow, Oniji conçoit chaque prise comme une photographie du son vivant.\n\nEntre précision technique et écoute émotionnelle, il signe une patte brute mais maîtrisée. Un son sans artifice, calibré au millimètre.`
  }
]

const timeline = [
  {
    year: 'Début 2024',
    title: 'Naissance du projet',
    description: 'UTF voit le jour à Tours. 1ère session, 2 micros, une passion. Le format est né.'
  },
  {
    year: 'Mi-2024',
    title: 'Création de la chaîne Officiel sur YouTube et Instagram',
    description: 'Les premières sessions sont diffusées. L’esthétique séduit, les artistes suivent.'
  },
  {
    year: 'Fin 2024',
    title: 'Multiplication des formats',
    description: 'Plus de lives, plus d’artistes. La DA s’affine, l’identité se renforce.'
  },
  {
    year: '2025+',
    title: 'Vers l’extérieur',
    description: 'Des collabs. Des shootings photos. Des scènes. Du réel. Et toujours : la vibe brute.'
  }
]

export default function About() {
  return (
    <div className="max-w-[2000px] w-full mx-auto flex-1 px-6 py-10 space-y-10">
      {/* LOGO + HEADER */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex flex-col md:flex-row text-center md:text-start justify-center md:justify-start gap-6 items-center max-w-7xl mx-auto"
      >
        <motion.div variants={fadeUp} custom={0}>
          <Image
            src="/utf-logo.png"
            alt="Logo UTF"
            width={160}
            height={160}
            className="rounded-full object-contain"
          />
        </motion.div>

        <motion.div variants={fadeUp} custom={1}>
          <h1 className="text-4xl md:text-5xl font-bold">Under The Flow</h1>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg mt-1">
            Sessions live. Authentiques. Ancrées dans l’instant.
          </p>
          <p className="text-zinc-500 italic mt-2">
            Un projet né à Tours, au cœur de la scène indépendante.
          </p>
        </motion.div>
      </motion.div>

      <div className="w-full max-w-6xl mx-auto space-y-10 flex flex-col">
        {/* MANIFESTE */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={container}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto w-full"
        >
          <motion.h3 variants={fadeUp} className="text-2xl font-bold mb-3">
            <BookOpenText className="inline mr-3" size={24} />
            Manifeste
          </motion.h3>
          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-zinc-400 leading-relaxed whitespace-pre-wrap break-keep"
          >
            {description}
          </motion.p>
          <motion.p
            variants={fadeUp}
            className="text-zinc-500 italic mt-6"
          >
            {`“La musique est un instant. Une vibration. Un souffle.”`}
          </motion.p>
        </motion.div>

        {/* FONDATEURS */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={container}
          viewport={{ once: true }}
        >
          <Divider className='mb-10'/>
          <h3 className="text-2xl mb-4">
            <UsersRound className="inline mr-3" size={24} />
            L’équipe derrière Under The Flow
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {founders.map((founder, i) => (
              <motion.div key={founder.name} variants={fadeUp} custom={i}>
                <Card className="flex bg-zinc-900/70 border border-zinc-800/40 p-4 gap-4">
                  <div className="flex gap-3 items-end">
                    <Image
                      src={founder.img}
                      alt={founder.name}
                      width={80}
                      height={80}
                      className="rounded-xl object-cover"
                    />
                    <div>
                      <h2 className="text-xl font-semibold">{founder.name}</h2>
                      <p className="text-zinc-500 text-sm italic">{founder.role}</p>
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm pl-4 leading-relaxed whitespace-pre-wrap break-keep">
                    {founder.text}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
          <Divider className='mt-10' />
        </motion.div>

        {/* TIMELINE */}
        <div className="mx-auto">
          <h3 className="text-2xl text-center mb-8">
            <Hourglass className="inline mr-3" size={24} />
            Timeline
          </h3>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative border-l border-zinc-700/50 pl-6 space-y-12"
          >
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index  * 0.1 }}
                className="relative px-4"
              >
                <ArrowRight
                  className="absolute left-[-14px] top-0.5 text-zinc-500"
                  size={20}
                />
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-zinc-500 text-sm italic mb-1">{item.year}</p>
                <p className="text-zinc-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
          }}
          className="flex justify-center"
        >
          <Link href="/contact">
            <Button 
            variant="bordered" 
            size="lg" 
            className="group text-white/90 hover:text-white border-zinc-600" 
            endContent={<ArrowRight 
            className=" h-5 w-5 transition-transform group-hover:translate-x-1" />}
            >
              Une question ? Un projet ?
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
