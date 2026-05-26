import type { EmailErrorType } from '@/shared/lib'
import { validateEmail, validatePassword } from '@/shared/lib'
import { validateUsername } from './validateUsername'

export type SignUpFieldErrors = {
  username?: string
  email?: string
  password?: string
  repeatPassword?: string
}

export type SignUpFormValues = {
  username: string
  email: string
  password: string
  repeatPassword: string
}

export function validateSignUpForm(
  values: SignUpFormValues,
  emailErrorType?: EmailErrorType,
): SignUpFieldErrors {
  const isSame =
    values.repeatPassword.trim() !== '' &&
    values.repeatPassword === values.password

  return {
    username: validateUsername(values.username),
    email: validateEmail(values.email, 'signup', emailErrorType),
    password: validatePassword(values.password, 'signup'),
    repeatPassword: validatePassword(values.repeatPassword, 'repeat', isSame),
  }
}
