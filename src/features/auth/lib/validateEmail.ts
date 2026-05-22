import { EMAIL_REGEX, EMAIL_VALIDATION_ERRORS } from './constants'

export type EmailValidationVariant = 'login' | 'signup'

export function validateEmail(
  value: string,
  variant: EmailValidationVariant = 'login',
): string | undefined {
  const trimmed = value.trim()

  if (!trimmed) {
    return EMAIL_VALIDATION_ERRORS.required
  }

  if (variant === 'login') {
    return undefined
  }

  if (!EMAIL_REGEX.test(trimmed)) {
    return EMAIL_VALIDATION_ERRORS.invalid
  }

  return undefined
}
