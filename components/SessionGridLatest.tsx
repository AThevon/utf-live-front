'use client';

import { motion } from 'framer-motion';
import SessionCard from './SessionCard';
import type { LiveSessionList } from '@/types';

type SessionGridLatestProps = {
  sessions: LiveSessionList[];
};

// Animation config
const container = {
  hidden: {},
  show: {
    transition: {
      staggerDirection: -1,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function SessionGridLatest({ sessions }: SessionGridLatestProps) {
  return (
    <>
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
        className="text-3xl font-bold mb-4"
      >
        Derniers lives
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.7 }}
      >
        {sessions.map((session, index) => (
          <motion.div key={index} variants={item}>
            <SessionCard session={session} />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}
