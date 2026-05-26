import { useEffect } from 'react'
import {
  selectIsAuthenticated,
  selectIsSessionBootstrapped,
  setBootstrapped,
  setCredentials,
  useLazyRefreshQuery,
} from '@/entities/session'
import { useAppDispatch, useAppSelector } from '@/app/store'

export function useSessionBootstrap(): { isBootstrapping: boolean } {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const isBootstrapped = useAppSelector(selectIsSessionBootstrapped)
  const [refresh] = useLazyRefreshQuery()

  useEffect(() => {
    if (isBootstrapped) {
      return
    }

    if (isAuthenticated) {
      dispatch(setBootstrapped())
      return
    }

    let cancelled = false

    refresh()
      .unwrap()
      .then((data) => {
        if (!cancelled) {
          dispatch(setCredentials(data))
        }
      })
      .catch(() => {
        if (!cancelled) {
          dispatch(setBootstrapped())
        }
      })

    return () => {
      cancelled = true
    }
  }, [dispatch, isAuthenticated, isBootstrapped, refresh])

  return { isBootstrapping: !isBootstrapped }
}
