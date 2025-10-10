'use client'

import { motion } from 'framer-motion'

const blocks = [
  {
    title: 'Avant le son, le vide',
    subtitle: 'Chaque souffle est tension',
  },
  {
    title: 'Lumières basses',
    subtitle: "L'espace devient matière",
  },
  {
    title: 'Le micro attend',
    subtitle: "L'instant retient son souffle",
  },
  {
    title: 'Under The Flow',
    subtitle: "Rien n'est joué. Tout est vrai.",
  },
]

export default function TextReveal() {
  return (
    <section className="relative w-full text-white font-sans tracking-wide py-20 px-4 sm:px-12">
      <div className="max-w-6xl mx-auto space-y-40">
        {blocks.map((block, index) => {
          const isEven = index % 2 === 0
          const translateClass = isEven
            ? 'text-left'
            : 'text-right'

          return (
              <motion.div
              key={index}
              initial={{ opacity: 0, y: 80, filter: 'blur(12px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
              viewport={{ once: false, amount: 0.9 }}
              className={`${translateClass} backdrop-blur-sm/30 p-6 sm:p-10 rounded-2xl`}
            >
              <h2 className="text-3xl sm:text-5xl font-bold !tracking-normal">{block.title}</h2>
              <p className="text-zinc-400 text-lg sm:text-xl  italic">{block.subtitle}</p>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
