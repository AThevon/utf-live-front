'use client'

import { ArrowLeft } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@heroui/react"
import { useRouter } from "next/navigation"
import { useRef } from "react"
import TooltipWrapper from "@/components/layout/TooltipWrapper"

type Props = {
  className?: string
  fallbackUrl?: string
}

export default function BackButton({ className, fallbackUrl = "/" }: Props) {
  const router = useRouter()
  const hasNavigated = useRef(false)

  const handleBack = () => {
    // On essaye de revenir en arrière
    if (typeof window !== "undefined") {
      if (window.history.length > 2 && !hasNavigated.current) {
        hasNavigated.current = true
        router.back()
      } else {
        router.push(fallbackUrl)
      }
    } else {
      router.push(fallbackUrl)
    }
  }

  return (
    <TooltipWrapper content="Retour" placement="right">
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
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
      </motion.div>
    </TooltipWrapper>
  )
}
