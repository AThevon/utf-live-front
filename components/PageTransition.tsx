'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.main
    className='overflow-x-hidden min-h-[calc(100vh-6rem)]'
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.main>
  )
}
