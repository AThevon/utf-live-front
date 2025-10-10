'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function IntroOverlay() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro')

    if (!hasSeenIntro) {
      setVisible(true)
      document.body.classList.add('overflow-hidden')

      const timeout = setTimeout(() => {
        setVisible(false)
        document.body.classList.remove('overflow-hidden')
        sessionStorage.setItem('hasSeenIntro', 'true')
      }, 1000)

      return () => {
        clearTimeout(timeout)
        document.body.classList.remove('overflow-hidden')
      }
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black overflow-hidden flex items-center justify-center"
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

          {/* Logo avec légère pulsation */}
          <motion.div
            className="relative w-48 h-48 md:w-80 md:h-80 z-10 rounded-full overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: [1, 1.01, 1] }}
            transition={{
              duration: 1,
              ease: 'easeInOut',
              repeat: Infinity,
              repeatType: 'mirror',
            }}
          >
            <Image
              src="/utf-logo.png"
              alt="UTF Logo"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}