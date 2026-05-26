import { useEffect, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/shared/lib'
import styles from './Modal.module.scss'

export type ModalProps = {
  open: boolean
  onClose: () => void
  children: ReactNode
  ariaLabel: string
  className?: string
}

export function Modal({
  open,
  onClose,
  children,
  ariaLabel,
  className,
}: ModalProps) {
  useEffect(() => {
    if (!open) {
      return
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open) {
    return null
  }

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={cn(styles.dialog, className)}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}
