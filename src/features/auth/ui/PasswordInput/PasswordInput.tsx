import { useState, type ChangeEvent } from 'react'
import { cn } from '@/shared/lib'
import { Input, type InputProps } from '@/shared/ui'
import {
  PASSWORD_TOGGLE_LABEL,
  validatePassword,
  type PasswordValidationVariant,
} from '../../lib'
import styles from './PasswordInput.module.scss'

export type PasswordInputProps = Omit<
  InputProps,
  'type' | 'error' | 'value' | 'onChange'
> & {
  value: string
  onChange: (value: string) => void
  variant?: PasswordValidationVariant
}

export function PasswordInput({
  value,
  onChange,
  variant = 'login',
  name = 'password',
  label = 'Пароль',
  className,
  disabled,
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState<string | undefined>()

  const runValidation = (nextValue: string) => {
    const message = validatePassword(nextValue, variant)
    setError(message)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value
    onChange(nextValue)
    runValidation(nextValue)
  }

  return (
    <div className={cn(styles.root, error && styles.rootWithError, className)}>
      <Input
        {...props}
        name={name}
        label={label}
        value={value}
        onChange={handleChange}
        error={error}
        disabled={disabled}
        type={visible ? 'text' : 'password'}
        controlClassName={styles.control}
        autoComplete={variant === 'signup' ? 'new-password' : 'current-password'}
      />
      <button
        type="button"
        className={styles.toggle}
        onClick={() => setVisible((v) => !v)}
        aria-label={
          visible ? PASSWORD_TOGGLE_LABEL.hide : PASSWORD_TOGGLE_LABEL.show
        }
        tabIndex={-1}
      >
        <span className={styles.toggleIcon} aria-hidden />
      </button>
    </div>
  )
}

