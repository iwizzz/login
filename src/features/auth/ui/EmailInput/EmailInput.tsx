import { useState, type ChangeEvent } from 'react'
import { Input, type InputProps } from '@/shared/ui'
import { validateEmail, type EmailValidationVariant } from '../../lib'

export type EmailInputProps = Omit<
  InputProps,
  'type' | 'error' | 'value' | 'onChange'
> & {
  value: string
  onChange: (value: string) => void
  variant?: EmailValidationVariant
}

export function EmailInput({
  value,
  onChange,
  variant = 'login',
  name = 'email',
  label = 'Email',
  className,
  disabled,
  ...props
}: EmailInputProps) {
  const [error, setError] = useState<string | undefined>()

  const runValidation = (nextValue: string) => {
    const message = validateEmail(nextValue, variant)
    setError(message)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value
    onChange(nextValue)
    runValidation(nextValue)
  }

  return (
    <Input
      {...props}
      name={name}
      label={label}
      value={value}
      onChange={handleChange}
      error={error}
      disabled={disabled}
      type="email"
      autoComplete="email"
      inputMode="email"
      className={className}
    />
  )
}
