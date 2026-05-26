import { PASSWORD_MIN_LENGTH, PASSWORD_VALIDATION_ERRORS } from './constants'

export type PasswordValidationVariant = 'login' | 'signup' | 'repeat'

export function validatePassword(
  value: string,
  variant: PasswordValidationVariant = 'login',
  isSame?: boolean,
): string | undefined {
  const trimmed = value.trim()

  if (!trimmed) {
    return PASSWORD_VALIDATION_ERRORS.required
  }

  if (variant === 'login') {
    return undefined
  }

  if (variant === 'repeat') {
    return isSame ? undefined : PASSWORD_VALIDATION_ERRORS.notSame
  }

  if (trimmed.length < PASSWORD_MIN_LENGTH) {
    return PASSWORD_VALIDATION_ERRORS.minLength
  }

  return undefined
}
