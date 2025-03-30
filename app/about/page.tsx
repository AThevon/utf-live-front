'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button, Card, Image } from '@heroui/react'
import { ArrowRight } from 'lucide-react'

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-20 text-white space-y-24">
      {/* LOGO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-center"
      >
        <Image
          src="/utf-logo.png"
          alt="Logo UTF"
          width={160}
          height={160}
          className="rounded-full"
        />
      </motion.div>

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-bold">Under The Flow</h1>
        <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
          Sessions live. Authentiques. Ancrées dans l’instant.
        </p>
        <p className="text-zinc-500 italic">Un projet né à Tours, au cœur de la scène indépendante.</p>
      </motion.div>

      {/* FONDATEURS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {[{
          name: 'Nitro Vision',
          img: '/utf-logo.png',
          role: 'Réalisateur / Directeur photo',
          text: `Fondateur d’UTF et œil derrière la caméra, Nitro capte l’essence de chaque session avec une esthétique précise et organique. 
          Son approche minimaliste sublime l’instant sans jamais le trahir. Montage, cadrage, lumière : sa signature est dans la discrétion.`  
        },
        {
          name: 'Oniji',
          img: '/oniji.jpg',
          role: 'Ingénieur son / Mix / Mastering',
          text: `Architecte sonore d’Under The Flow, Oniji conçoit chaque prise comme une photographie du son vivant. 
          Entre précision technique et écoute émotionnelle, il signe une patte brute mais maîtrisée. Un son sans artifice, calibré au millimètre.`
        }].map((founder, i) => (
          <motion.div
            key={founder.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="flex bg-zinc-900/70 border border-zinc-800/40 p-4 gap-4">
              <Image
                src={founder.img}
                alt={founder.name}
                width={80}
                height={80}
                className="rounded-lg object-cover"
              />
              <div>
                <h2 className="text-xl font-semibold mb-1">{founder.name}</h2>
                <p className="text-zinc-500 text-sm italic mb-2">{founder.role}</p>
                <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-wrap">
                  {founder.text}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* VISION */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="space-y-6 max-w-3xl mx-auto text-center"
      >
        <h2 className="text-2xl font-bold">Manifeste</h2>
        <p className="text-zinc-400 leading-relaxed">
          Under The Flow n’est pas un format. C’est une philosophie.  
          Celle de la vérité dans la prise, dans le geste, dans l’intention.
          Pas de recut, pas de performance corrigée.  
          Juste une performance sincère. Brute. Captée dans le silence du moment.
        </p>
        <p className="text-zinc-500 italic">
          La musique telle qu’elle est. Ou ne sera plus.
        </p>
      </motion.div>

      {/* TIMELINE */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="relative border-l border-zinc-700/50 pl-6 ml-2 space-y-12"
      >
        {[
          {
            year: '2023',
            title: 'Lancement du projet',
            description: 'UTF voit le jour à Tours. 1ère session, 2 micros, une passion. Le format est né.'
          },
          {
            year: '2023',
            title: 'Déploiement YouTube + Insta',
            description: 'Les premières sessions sont diffusées. L’esthétique séduit, les artistes suivent.'
          },
          {
            year: '2024',
            title: 'Multiplication des formats',
            description: 'Plus de lives, plus d’artistes. La DA s’affine, l’identité se renforce.'
          },
          {
            year: '2024+',
            title: 'Vers l’extérieur',
            description: 'Des collabs. Des scènes. Du réel. Et toujours : la vibe brute.'
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -left-3 top-1 w-2 h-2 bg-white rounded-full shadow-md" />
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-zinc-500 text-sm italic mb-1">{item.year}</p>
            <p className="text-zinc-400 text-sm">{item.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex justify-center"
      >
        <Link href="/contact">
          <Button variant="bordered" size="lg" className="group text-white/90 hover:text-white border-zinc-600">
            Une question ? Un projet ?
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
