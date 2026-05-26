import { Suspense } from 'react'
import { ResetPasswordFormLazy } from '@/features/reset-password'
import { AuthFormSkeleton } from '@/shared/ui'

export function ResetPasswordPage() {
  return (
    <Suspense fallback={<AuthFormSkeleton variant="resetPassword" />}>
      <ResetPasswordFormLazy />
    </Suspense>
  )
}
