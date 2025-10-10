'use client';

import { motion } from 'framer-motion';
import { Music2 } from 'lucide-react';
import { Button } from '@heroui/react';

export default function GrooverWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="flex justify-center"
    >
      <Button
        as="a"
        href="https://groover.co/band/signup/referral/influencer/21362/?utm_source=widget&utm_medium=widget_banner&utm_campaign=0.under-the-flow&widget_id=21362"
        target="_blank"
        rel="noopener noreferrer"
        size="lg"
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold"
        startContent={<Music2 className="w-5 h-5" />}
      >
        Promouvoir ma musique avec Groover
      </Button>
    </motion.div>
  );
}
