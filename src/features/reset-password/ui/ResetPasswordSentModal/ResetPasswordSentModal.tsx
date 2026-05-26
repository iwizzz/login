import { useState } from 'react'
import { Button, Countdown, Modal } from '@/shared/ui'
import styles from './ResetPasswordSentModal.module.scss'

const RESEND_SECONDS = 60

export type ResetPasswordSentModalProps = {
  open: boolean
  onClose: () => void
  onResend: () => Promise<void>
}

export function ResetPasswordSentModal({
  open,
  onClose,
  onResend,
}: ResetPasswordSentModalProps) {
  const [countdownKey, setCountdownKey] = useState(0)
  const [isResending, setIsResending] = useState(false)

  const handleResend = async () => {
    setIsResending(true)
    try {
      await onResend()
      setCountdownKey((key) => key + 1)
    } finally {
      setIsResending(false)
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      ariaLabel="Письмо для восстановления пароля отправлено"
      className={styles.modal}
    >
      <div className={styles.content}>
        <span className={styles.icon} aria-hidden />

        <h2 className={styles.title}>Мы отправили письмо с инструкциями</h2>

        <p className={styles.text}>
          Если вы не получили письмо с инструкциями, проверьте, пожалуйста,
          папку «Спам» или попробуйте отправить запрос ещё раз
        </p>

        <Countdown key={countdownKey} seconds={RESEND_SECONDS}>
          {({ secondsLeft, isFinished }) => (
            <div className={styles.resendBlock}>
              {!isFinished && (
                <span className={styles.timer} aria-live="polite">
                  {secondsLeft}
                </span>
              )}
              <Button
                type="button"
                variant="link"
                isLoading={isResending}
                showLoader
                disabled={!isFinished}
                onClick={handleResend}
              >
                Отправить повторно
              </Button>
            </div>
          )}
        </Countdown>
      </div>
    </Modal>
  )
}
