import { useState, type FormEvent } from 'react'
import { hasFieldErrors } from '@/shared/lib'
import { Button, EmailInput } from '@/shared/ui'
import { authFormStyles } from '@/shared/styles'
import { useLazySendResetPasswordQuery } from '../../api/resetPasswordApi'
import { RESET_PASSWORD_ERRORS } from '../../model/constants'
import {
  validateResetPasswordForm,
  type ResetPasswordFieldErrors,
} from '../../lib/validateResetPasswordForm'
import { ResetPasswordSentModal } from '../ResetPasswordSentModal'

export function ResetPasswordForm() {
  const [sendResetPassword, { isFetching }] = useLazySendResetPasswordQuery()
  const [email, setEmail] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<ResetPasswordFieldErrors>({})
  const [submitError, setSubmitError] = useState<string | undefined>()

  const sendLetter = () => sendResetPassword({ email }).unwrap()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const errors = validateResetPasswordForm({ email })
    setFieldErrors(errors)

    if (hasFieldErrors(errors)) {
      return
    }

    try {
      setSubmitError(undefined)
      await sendLetter()
      setIsModalOpen(true)
    } catch {
      setSubmitError(RESET_PASSWORD_ERRORS.sendFailed)
    }
  }

  return (
    <>
      <form className={authFormStyles.form} onSubmit={handleSubmit} noValidate>
        <EmailInput
          value={email}
          onChange={(value) => {
            setEmail(value)
            setFieldErrors((prev) => ({ ...prev, email: undefined }))
            setSubmitError(undefined)
          }}
          variant="signup"
          label="Электронная почта"
          placeholder="Введите электронную почту"
          error={fieldErrors.email}
        />
        {submitError && (
          <p className={authFormStyles.formError} role="alert">
            {submitError}
          </p>
        )}
        <Button
          type="submit"
          fullWidth
          isLoading={isFetching}
          showLoader
          className={authFormStyles.submitOffset}
        >
          Отправить
        </Button>
      </form>

      <ResetPasswordSentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onResend={sendLetter}
      />
    </>
  )
}
