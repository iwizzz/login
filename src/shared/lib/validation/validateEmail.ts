import { EMAIL_REGEX, EMAIL_VALIDATION_ERRORS } from './constants'

export type EmailValidationVariant = 'login' | 'signup'
export type EmailErrorType = 'exists'

export function validateEmail(
  value: string,
  variant: EmailValidationVariant = 'login',
  errorType?: EmailErrorType,
): string | undefined {
  if (errorType) {
    return EMAIL_VALIDATION_ERRORS[errorType]
  }

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
