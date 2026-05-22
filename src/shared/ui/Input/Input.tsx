import type { InputHTMLAttributes } from 'react'
import { cn } from '@/shared/lib'
import styles from './Input.module.scss'

export type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'className'
> & {
  label?: string
  error?: string
  className?: string
  controlClassName?: string
}

export function Input({
  label,
  error,
  id,
  className,
  controlClassName,
  ...props
}: InputProps) {
  const inputId = id ?? props.name

  return (
    <div className={cn(styles.root, className)}>
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          styles.control,
          error && styles.controlInvalid,
          controlClassName,
        )}
        aria-invalid={Boolean(error)}
        aria-describedby={error && inputId ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && inputId && (
        <span id={`${inputId}-error`} className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  )
}
