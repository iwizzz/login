import { createBrowserRouter } from 'react-router-dom'
import { AuthLayout } from '@/app/layouts'
import type { AuthFormCardVariant } from '@/widgets/auth-form-card'
import { ProtectedRoute } from './ProtectedRoute'
import { PublicRoute } from './PublicRoute'
import { HomePage } from '@/pages/home'
import { LoginPage } from '@/pages/login'
import { SignUpPage } from '@/pages/signup'
import { ResetPasswordPage } from '@/pages/reset-password'
import { NotFoundPage } from '@/pages/not-found'
import { ROUTES } from '@/shared/config'

const authRoute = (variant: AuthFormCardVariant) => ({ authFormVariant: variant })

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        path: ROUTES.home,
        element: <HomePage />,
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: ROUTES.login,
            element: <LoginPage />,
            handle: authRoute('login'),
          },
          {
            path: ROUTES.signup,
            element: <SignUpPage />,
            handle: authRoute('signup'),
          },
          {
            path: ROUTES.resetPassword,
            element: <ResetPasswordPage />,
            handle: authRoute('resetPassword'),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
