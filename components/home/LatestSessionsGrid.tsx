'use client';

import { motion, type Variants } from 'framer-motion';
import SessionCard from '@/components/live-sessions/SessionCard';
import type { LiveSessionList } from '@/types';

type LatestSessionsGridProps = {
  sessions: LiveSessionList[];
};

// Animation config
const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerDirection: -1,
      staggerChildren: 0.2,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0 },
};

export default function LatestSessionsGrid({ sessions }: LatestSessionsGridProps) {
  return (
    <section className="max-w-[2000px] mx-auto z-10 md:px-10 mt-4 mb-12">
      <motion.h2
        initial={{ opacity: 0, x: -20, filter: 'blur(12px)' }}
        whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
        className="text-center md:text-start text-3xl font-bold mb-4"
      >
        Derniers lives
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 px-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {sessions.map((session, index) => (
          <motion.div
            key={index}
            variants={item}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <SessionCard session={session} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
