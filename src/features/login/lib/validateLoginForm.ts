import { validateEmail, validatePassword } from '@/shared/lib'

export type LoginFieldErrors = {
  email?: string
  password?: string
}

export type LoginFormValues = {
  email: string
  password: string
}

export function validateLoginForm(values: LoginFormValues): LoginFieldErrors {
  return {
    email: validateEmail(values.email, 'login'),
    password: validatePassword(values.password, 'login'),
  }
}
