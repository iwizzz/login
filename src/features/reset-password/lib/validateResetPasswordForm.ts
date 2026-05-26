import { validateEmail } from '@/shared/lib'

export type ResetPasswordFieldErrors = {
  email?: string
}

export type ResetPasswordFormValues = {
  email: string
}

export function validateResetPasswordForm(
  values: ResetPasswordFormValues,
): ResetPasswordFieldErrors {
  return {
    email: validateEmail(values.email, 'signup'),
  }
}
