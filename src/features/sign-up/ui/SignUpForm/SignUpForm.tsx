import { useState, type FormEvent } from 'react'
import type { EnterResponse } from '@/entities/session'
import { getApiError } from '@/shared/api'
import { hasFieldErrors, type EmailErrorType } from '@/shared/lib'
import { Button, EmailInput, Input, PasswordInput } from '@/shared/ui'
import { authFormStyles } from '@/shared/styles'
import { useSignUpMutation } from '../../api/signUpApi'
import { validateSignUpForm, type SignUpFieldErrors } from '../../lib/validateSignUpForm'

export type SignUpFormProps = {
  onSuccess?: (response: EnterResponse) => void
}

export function SignUpForm({ onSuccess }: SignUpFormProps) {
  const [signUp, { isLoading }] = useSignUpMutation()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [emailErrorType, setEmailErrorType] = useState<EmailErrorType | undefined>()
  const [fieldErrors, setFieldErrors] = useState<SignUpFieldErrors>({})

  const clearFieldError = (field: keyof SignUpFieldErrors) => {
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const errors = validateSignUpForm(
      { username, email, password, repeatPassword },
      emailErrorType,
    )
    setFieldErrors(errors)

    if (hasFieldErrors(errors)) {
      return
    }

    try {
      const response = await signUp({
        username,
        email,
        password,
      }).unwrap()
      setEmailErrorType(undefined)
      setFieldErrors({})
      onSuccess?.(response)
    } catch (error: unknown) {
      const apiError = getApiError(error)
      if (apiError?.statusCode === 409) {
        setEmailErrorType('exists')
      }
    }
  }

  return (
    <form className={authFormStyles.form} onSubmit={handleSubmit} noValidate>
      <Input
        label="Никнейм"
        placeholder="Введите никнейм"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value)
          clearFieldError('username')
        }}
        error={fieldErrors.username}
        autoComplete="username"
      />

      <EmailInput
        value={email}
        onChange={(value) => {
          setEmail(value)
          setEmailErrorType(undefined)
          clearFieldError('email')
        }}
        variant="signup"
        label="Электронная почта"
        placeholder="Введите электронную почту"
        errorType={emailErrorType}
        error={fieldErrors.email}
      />

      <PasswordInput
        value={password}
        onChange={(value) => {
          setPassword(value)
          clearFieldError('password')
        }}
        variant="signup"
        label="Пароль"
        placeholder="Введите пароль"
        error={fieldErrors.password}
      />

      <PasswordInput
        value={repeatPassword}
        onChange={(value) => {
          setRepeatPassword(value)
          clearFieldError('repeatPassword')
        }}
        variant="repeat"
        compareWith={password}
        name="repeatPassword"
        label="Подтвердите пароль"
        placeholder="Введите пароль"
        autoComplete="new-password"
        error={fieldErrors.repeatPassword}
      />

      <Button
        type="submit"
        fullWidth
        isLoading={isLoading}
        showLoader
        className={authFormStyles.submitOffset}
      >
        Зарегистрироваться
      </Button>
    </form>
  )
}
