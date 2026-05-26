import { lazy } from 'react'

export const LoginFormLazy = lazy(() =>
  import('./ui/LoginForm').then((module) => ({
    default: module.LoginForm,
  })),
)
