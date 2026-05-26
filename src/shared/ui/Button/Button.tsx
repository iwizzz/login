import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/shared/lib'
import styles from './Button.module.scss'

export type ButtonVariant = 'primary' | 'link'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean
  showLoader?: boolean
  variant?: ButtonVariant
  fullWidth?: boolean
  className?: string
  children: ReactNode
}

export function Button({
  isLoading = false,
  showLoader = false,
  variant = 'primary',
  fullWidth = false,
  className,
  children,
  type = 'button',
  disabled = false,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading

  return (
    <button
      {...props}
      type={type}
      className={cn(
        styles.root,
        styles[variant],
        fullWidth && styles.fullWidth,
        className,
      )}
      disabled={isDisabled}
      aria-busy={isLoading || undefined}
    >
      {showLoader && isLoading && (
        <span className={styles.loader} aria-hidden />
      )}
      {children}
    </button>
  )
}
