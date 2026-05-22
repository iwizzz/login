import { PASSWORD_MIN_LENGTH, PASSWORD_VALIDATION_ERRORS } from './constants'

export type PasswordValidationVariant = 'login' | 'signup'

export function validatePassword(
  value: string,
  variant: PasswordValidationVariant = 'login',
): string | undefined {
  const trimmed = value.trim()

  if (!trimmed) {
    return PASSWORD_VALIDATION_ERRORS.required
  }

  if (variant === 'login') {
    return undefined
  }

  if (trimmed.length < PASSWORD_MIN_LENGTH) {
    return PASSWORD_VALIDATION_ERRORS.minLength
  }

  return undefined
}
