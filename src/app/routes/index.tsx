import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { PublicRoute } from './PublicRoute'
import { HomePage } from '@/pages/home'
import { LoginPage } from '@/pages/login'
import { NotFoundPage } from '@/pages/not-found'
import { ROUTES } from '@/shared/config'

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
        path: ROUTES.login,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
