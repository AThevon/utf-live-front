'use client'

import { Button, ButtonProps } from '@heroui/react'
import { forwardRef } from 'react'

interface GradientButtonProps extends Omit<ButtonProps, 'color' | 'variant'> {
  variant?: 'solid' | 'outline' | 'ghost'
}

const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ variant = 'solid', className = '', children, ...props }, ref) => {
    const variants = {
      solid: 'bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:opacity-90',
      outline: 'bg-transparent border-2 border-violet-500 text-violet-400 hover:bg-violet-500/10',
      ghost: 'bg-violet-500/10 text-violet-400 hover:bg-violet-500/20',
    }

    return (
      <Button
        ref={ref}
        className={`${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </Button>
    )
  }
)

GradientButton.displayName = 'GradientButton'

export default GradientButton
