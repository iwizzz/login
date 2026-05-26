import type { ReactNode } from 'react'
import { AuthFormSkeleton } from '@/shared/ui'
import { useSessionBootstrap } from './useSessionBootstrap'

type SessionBootstrapProps = {
  children: ReactNode
}

export function SessionBootstrap({ children }: SessionBootstrapProps) {
  const { isBootstrapping } = useSessionBootstrap()

  if (isBootstrapping) {
    return <AuthFormSkeleton variant="login" />
  }

  return children
}
