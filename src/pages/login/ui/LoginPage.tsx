import { Suspense } from 'react'
import { LoginFormLazy } from '@/features/login'
import { setCredentials } from '@/entities/session'
import { useAppDispatch } from '@/app/store'
import { AuthFormSkeleton } from '@/shared/ui'

export function LoginPage() {
  const dispatch = useAppDispatch()

  return (
    <Suspense fallback={<AuthFormSkeleton variant="login" />}>
      <LoginFormLazy
        onSuccess={(response) => dispatch(setCredentials(response))}
      />
    </Suspense>
  )
}
