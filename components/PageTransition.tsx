'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <motion.main
      key={pathname}
      className='overflow-x-hidden min-h-screen-minus-navbar'
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{
        duration: 0.35,
        ease: 'easeInOut',
        delay: 0.1,
      }}
    >
      {children}
    </motion.main>
  )
}
