import { useState, type ChangeEvent } from 'react'
import {
  validateEmail,
  type EmailErrorType,
  type EmailValidationVariant,
} from '@/shared/lib'
import { Input, type InputProps } from '../Input'

export type EmailInputProps = Omit<
  InputProps,
  'type' | 'value' | 'onChange' | 'error'
> & {
  value: string
  onChange: (value: string) => void
  variant?: EmailValidationVariant
  errorType?: EmailErrorType
  error?: string
}

export function EmailInput({
  value,
  onChange,
  variant = 'login',
  name = 'email',
  label = 'Email',
  errorType,
  error: externalError,
  className,
  disabled,
  ...props
}: EmailInputProps) {
  const [validationError, setValidationError] = useState<string | undefined>()

  const resolveError = (nextValue: string) =>
    validateEmail(nextValue, variant, errorType)

  const displayError =
    errorType !== undefined
      ? resolveError(value)
      : (externalError ?? validationError)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.value
    onChange(nextValue)

    if (errorType === undefined) {
      setValidationError(resolveError(nextValue))
    }
  }

  return (
    <Input
      {...props}
      name={name}
      label={label}
      value={value}
      onChange={handleChange}
      error={displayError}
      disabled={disabled}
      type="email"
      autoComplete="email"
      inputMode="email"
      className={className}
    />
  )
}
