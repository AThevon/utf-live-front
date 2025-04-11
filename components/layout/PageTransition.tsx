'use client'

import { motion } from 'framer-motion'
import { ReactNode, useEffect } from 'react'
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const current = sessionStorage.getItem('current-path')
    if (current && current !== pathname) {
      sessionStorage.setItem('previous-path', current)
    }
    sessionStorage.setItem('current-path', pathname)
  }, [pathname])

  return (
    <motion.main
      key={pathname}
      className='overflow-x-hidden min-h-screen-minus-navbar flex flex-col'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
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
