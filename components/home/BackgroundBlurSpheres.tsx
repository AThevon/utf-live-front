"use client";

import { motion } from "framer-motion";

export default function BackgroundBlurSpheres() {
  return (
    <motion.div
      className="fixed inset-0 -z-10 bg-black overflow-hidden flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, ease: 'easeInOut' } }}
    >
      {/* Blobs morphiques */}
      <motion.div
        className="absolute w-[60vw] h-[60vw] bg-[#ffffff08] rounded-full blur-3xl"
        initial={{ scale: 1, x: '-20%', y: '-20%' }}
        animate={{ scale: 1.2, x: '10%', y: '10%' }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[40vw] h-[40vw] bg-[#ffffff0a] rounded-full blur-2xl"
        initial={{ scale: 1, x: '30%', y: '40%' }}
        animate={{ scale: 1.1, x: '10%', y: '20%' }}
        transition={{ duration: 7, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-[30vw] h-[30vw] bg-[#ffffff10] rounded-full blur-2xl"
        initial={{ scale: 0.8, x: '-30%', y: '20%' }}
        animate={{ scale: 1.3, x: '5%', y: '10%' }}
        transition={{ duration: 6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      />
    </motion.div>
  )
}