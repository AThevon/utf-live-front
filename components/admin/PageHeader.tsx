'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@heroui/react'
import { ChevronLeft } from 'lucide-react'

interface PageHeaderProps {
  title: string
  description?: string
  backHref?: string
  actions?: React.ReactNode
}

export default function PageHeader({
  title,
  description,
  backHref,
  actions,
}: PageHeaderProps) {
  const router = useRouter()

  const handleBack = () => {
    if (backHref) {
      router.push(backHref)
    } else {
      router.back()
    }
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-4">
        {backHref !== undefined && (
          <Button
            isIconOnly
            variant="flat"
            className="bg-zinc-800/50 hover:bg-zinc-800"
            onPress={handleBack}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
        )}
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-white mt-4 sm:mt-8">{title}</h1>
          {description && (
            <p className="text-zinc-400 mt-1">{description}</p>
          )}
        </div>
      </div>
      {actions && <div className="flex gap-3">{actions}</div>}
    </div>
  )
}
