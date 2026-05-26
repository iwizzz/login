import { USERNAME_MIN_LENGTH, USERNAME_VALIDATION_ERRORS } from '../model/constants'

export function validateUsername(value: string): string | undefined {
  const trimmed = value.trim()

  if (!trimmed) {
    return USERNAME_VALIDATION_ERRORS.required
  }

  if (trimmed.length < USERNAME_MIN_LENGTH) {
    return USERNAME_VALIDATION_ERRORS.minLength
  }

  return undefined
}
