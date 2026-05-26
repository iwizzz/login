import { baseApi } from '@/shared/api'
import { AUTH_PATHS } from '../model/constants'
import type { EnterResponse, LogoutResponse } from '../model/response'

export function injectSessionApi() {
  if (!baseApi) {
    throw new Error(
      'baseApi не инициализирован: сначала вызовите initSessionTransport() в app/store/initAppStore.',
    )
  }

  return baseApi.injectEndpoints({
    endpoints: (build) => ({
      refresh: build.query<EnterResponse, void>({
        query: () => ({
          url: AUTH_PATHS.refresh,
          method: 'GET',
        }),
      }),
      logout: build.query<LogoutResponse, void>({
        query: () => ({
          url: AUTH_PATHS.logout,
          method: 'GET',
        }),
      }),
    }),
  })
}
