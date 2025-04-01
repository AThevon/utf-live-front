'use client'

import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@heroui/react"
import { useRouter } from "next/navigation"

type Props = {
  className?: string
}

export default function BackButton({ className }: Props) {
  const router = useRouter()
  return (
    <motion.div
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.4, ease: 'easeOut' }}
      className={`absolute top-28 left-10 z-10 ${className}`}
    >
      <Button
        isIconOnly
        onPress={() => router.back()}
        title="Retour"
        variant="ghost"
        className=""
      >
        <ArrowLeft className="w-4 h-4" />
      </Button>
    </motion.div>
  )
}
