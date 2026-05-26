import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import type { EnterResponse } from '@/entities/session'
import { getApiError } from '@/shared/api'
import { ROUTES } from '@/shared/config'
import { hasFieldErrors } from '@/shared/lib'
import { Button, EmailInput, PasswordInput } from '@/shared/ui'
import { authFormStyles } from '@/shared/styles'
import { useLoginMutation } from '../../api/loginApi'
import { LOGIN_ERRORS } from '../../model/constants'
import { validateLoginForm, type LoginFieldErrors } from '../../lib/validateLoginForm'

export type LoginFormProps = {
  onSuccess?: (response: EnterResponse) => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [login, { isLoading }] = useLoginMutation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState<string | undefined>()
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({})

  const clearAuthError = () => setAuthError(undefined)

  const clearFieldError = (field: keyof LoginFieldErrors) => {
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const errors = validateLoginForm({ email, password })
    setFieldErrors(errors)

    if (hasFieldErrors(errors)) {
      return
    }

    try {
      clearAuthError()
      const token = await login({
        login: email,
        password,
      }).unwrap()
      onSuccess?.(token)
    } catch (error: unknown) {
      const apiError = getApiError(error)
      const status = (error as { status?: number }).status

      if (apiError?.statusCode === 401 || status === 401) {
        setAuthError(LOGIN_ERRORS.invalidCredentials)
      }
    }
  }

  return (
    <form className={authFormStyles.form} onSubmit={handleSubmit} noValidate>
      <EmailInput
        value={email}
        onChange={(value) => {
          setEmail(value)
          clearAuthError()
          clearFieldError('email')
        }}
        label="Электронная почта"
        placeholder="Введите электронную почту"
        error={fieldErrors.email}
      />
      <PasswordInput
        value={password}
        onChange={(value) => {
          setPassword(value)
          clearAuthError()
          clearFieldError('password')
        }}
        label="Пароль"
        placeholder="Введите пароль"
        error={fieldErrors.password}
      />
      <div className={authFormStyles.forgotRow}>
        <Link className={authFormStyles.link} to={ROUTES.resetPassword}>
          Забыли пароль?
        </Link>
      </div>
      {authError && (
        <p className={authFormStyles.formError} role="alert">
          {authError}
        </p>
      )}
      <Button
        type="submit"
        fullWidth
        isLoading={isLoading}
        showLoader
        className={authFormStyles.submitOffset}
      >
        Вход
      </Button>
    </form>
  )
}
