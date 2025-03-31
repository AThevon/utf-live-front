'use client'

import { Card, Button, Image } from '@heroui/react'
import Link from 'next/link'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect } from 'react'

const socialLinks = [
  {
    name: 'Instagram',
    username: '@utf_live',
    href: 'https://instagram.com/utf_live',
    icon: "/icons/instagram.svg",
    color: 'hover:text-pink-400',
  },
  {
    name: 'YouTube',
    username: 'Under The Flow',
    href: 'https://youtube.com/@UnderTheFlow_live',
    icon: "/icons/youtube.svg",
    color: 'hover:text-red-500',
  },
]

export default function ContactSocials() {
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const rotateX = useTransform(y, [0, 1], [15, -15])
  const rotateY = useTransform(x, [0, 1], [-15, 15])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const percentX = e.clientX / innerWidth
      const percentY = e.clientY / innerHeight
      x.set(percentX)
      y.set(percentY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [x, y])

  return (
    <div className="flex flex-col gap-4 lg:gap-10 h-full">
      {/* XL+ only interactive tilt image */}
      <div className="hidden xl:block relative mx-auto w-full aspect-square [perspective:1000px]">
        <motion.div
          style={{ rotateX, rotateY }}
          transition={{ type: 'spring', stiffness: 180, damping: 12 }}
          className="rounded-full overflow-hidden shadow-2xl"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          tabIndex={-1}
        >
          <Image
            isBlurred
            src="/utf-logo.png"
            alt="Logo Under The Flow"
            className="object-contain w-full h-full"
          />
        </motion.div>
        <div className="absolute inset-0 rounded-full pointer-events-none blur-2xl bg-gradient-to-br from-cyan-700/20 via-zinc-500/20 to-cyan-500/20 animate-pulse [animation-duration:4s]" />
      </div>

      {/* Mobile fallback */}
      <div className="flex justify-center items-center xl:hidden">
        <Image
          isBlurred
          src="/utf-logo.png"
          alt="Logo Under The Flow"
          className="rounded-full self-center mx-auto object-contain w-full max-h-[200px] lg:max-h-[500px]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {socialLinks.map((social) => (
          <Card
            key={social.name}
            className="bg-zinc-900/80 border border-zinc-700/40 p-5 flex flex-col justify-between hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center gap-4">
              <Image
                src={social.icon}
                alt={social.name}
                className={`w-8 h-8 ${social.color}`}
                width={32}
                height={32}
                radius="none"
              />
              <div>
                <p className="font-semibold text-white">{social.name}</p>
                <h5 className="text-zinc-400">{social.username}</h5>
              </div>
            </div>
            <Button
              as={Link}
              href={social.href}
              target="_blank"
              variant="bordered"
              className={`btn mt-4 w-full ${social.color} transition`}
            >
              {social.name === 'YouTube' ? 'Voir la chaîne' : 'Voir le profil'}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}
