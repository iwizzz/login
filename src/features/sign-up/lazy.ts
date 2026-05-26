import { lazy } from 'react'

export const SignUpFormLazy = lazy(() =>
  import('./ui/SignUpForm').then((module) => ({
    default: module.SignUpForm,
  })),
)
