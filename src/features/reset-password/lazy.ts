import { lazy } from 'react'

export const ResetPasswordFormLazy = lazy(() =>
  import('./ui/ResetPasswordForm').then((module) => ({
    default: module.ResetPasswordForm,
  })),
)
