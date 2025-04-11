'use client';

import SessionCard from '@/components/live-sessions/SessionCard';
import type { LiveSessionList } from '@/types';
import { motion } from 'framer-motion';

type SessionGridProps = {
  sessions: LiveSessionList[];
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } }
};

export default function SessionGrid({ sessions }: SessionGridProps) {
  return (
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {sessions.map((session, index) => (
        <motion.div key={index} variants={itemVariants}>
          <SessionCard session={session} />
        </motion.div>
      ))}
    </motion.div>
  );
}