'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function IntroOverlay() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    document.body.classList.add('overflow-hidden')
    const timeout = setTimeout(() => {
      setShow(false)
      document.body.classList.remove('overflow-hidden')
    }, 1500)

    return () => {
      clearTimeout(timeout)
      document.body.classList.remove('overflow-hidden')
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white crt-bg"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1 } }}
        >
         <motion.div
  className="relative w-fit text-5xl md:text-7xl font-extrabold tracking-widest uppercase"
  initial={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
  exit={{ opacity: 0, scale: 1.1, filter: 'blur(4px)' }}
  transition={{ duration: 1 }}
>
  <span className="glitch-text block">Under The Flow</span>
  <span
    className="glitch-text absolute inset-0 block"
    aria-hidden="true"
    style={{
      animationDelay: '0.15s',
      color: '#00ffff',
      opacity: 0.4,
    }}
  >
    Under The Flow
  </span>
</motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}
