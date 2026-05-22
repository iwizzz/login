import { Navigate, Outlet } from 'react-router-dom'
import { selectIsAuthenticated } from '@/entities/session'
import { useAppSelector } from '@/app/store'
import { ROUTES } from '@/shared/config'

export function ProtectedRoute() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace />
  }

  return <Outlet />
}
