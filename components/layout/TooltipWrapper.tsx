// components/ui/TooltipWrapper.tsx
'use client'

import { Tooltip } from '@heroui/react'

type TooltipWrapperProps = {
  content: string
  children: React.ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right'
  offset?: number
}

export default function TooltipWrapper({
  content,
  children,
  placement = 'top',
  offset = 7,
}: TooltipWrapperProps) {
  return (
    <Tooltip
      delay={1500}
      closeDelay={1}
      className="z-50"
      content={content}
      placement={placement}
      offset={offset}
    >
      {children}
    </Tooltip>
  )
}
