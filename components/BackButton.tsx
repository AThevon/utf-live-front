'use client'

import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@heroui/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type Props = {
  className?: string
}

export default function BackButton({ className }: Props) {
  const router = useRouter()
  const [referrer, setReferrer] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const previous = sessionStorage.getItem("previous-path")
      if (previous && previous !== window.location.pathname) {
        setReferrer(previous)
      }
    }
  }, [])

  const handleBack = () => {
    if (referrer) {
      router.push(referrer)
    } else {
      router.push('/')
    }
  }

  return (
    <motion.div
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.4, ease: 'easeOut' }}
      className={`absolute top-28 left-10 z-10 ${className}`}
    >
      <Button
        isIconOnly
        onPress={handleBack}
        title="Retour"
        variant="ghost"
        className=""
      >
        <ArrowLeft className="w-4 h-4" />
      </Button>
    </motion.div>
  )
}
