import { Suspense } from 'react'
import { SignUpFormLazy } from '@/features/sign-up'
import { setCredentials } from '@/entities/session'
import { useAppDispatch } from '@/app/store'
import { AuthFormSkeleton } from '@/shared/ui'

export function SignUpPage() {
  const dispatch = useAppDispatch()

  return (
    <Suspense fallback={<AuthFormSkeleton variant="signup" />}>
      <SignUpFormLazy
        onSuccess={(response) => {
          dispatch(setCredentials(response))
        }}
      />
    </Suspense>
  )
}
