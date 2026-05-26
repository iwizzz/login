import { useState, type ChangeEvent } from 'react'
import { cn, PASSWORD_TOGGLE_LABEL, validatePassword, type PasswordValidationVariant } from '@/shared/lib'
import { Input, type InputProps } from '../Input'
import styles from './PasswordInput.module.scss'

export type PasswordInputProps = Omit<
  InputProps,
  'type' | 'error' | 'value' | 'onChange'
> & {
  value: string
  onChange: (value: string) => void
  variant?: PasswordValidationVariant
  compareWith?: string
  error?: string
}

export function PasswordInput({
  value,
  onChange,
  variant = 'login',
  compareWith,
  error: externalError,
  name = 'password',
  label = 'Пароль',
  className,
  disabled,
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false)
  const [validationError, setValidationError] = useState<string | undefined>()

  const runValidation = (nextValue: string) => {
    const isSame =
      variant === 'repeat' &&
      nextValue.trim() !== '' &&
      nextValue === compareWith
    return validatePassword(nextValue, variant, isSame)
  }

  const repeatError =
    variant === 'repeat' && value.trim() !== '' ? runValidation(value) : undefined

  const displayError = externalError ?? repeatError ?? validationError

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value
    onChange(nextValue)

    if (variant !== 'repeat') {
      setValidationError(runValidation(nextValue))
    }
  }

  return (
    <div className={cn(styles.root, displayError && styles.rootWithError, className)}>
      <Input
        {...props}
        name={name}
        label={label}
        value={value}
        onChange={handleChange}
        error={displayError}
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
