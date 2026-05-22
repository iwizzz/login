import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import {
  logout,
  selectAccessToken,
  setCredentials,
  type StateWithSession,
} from '@/entities/session'
import type { EnterResponse } from '@/features/auth/model/types'

const AUTH_SKIP_PATHS = ['/auth/login', '/auth/refresh'] as const

function getRequestUrl(args: string | FetchArgs): string {
  return typeof args === 'string' ? args : args.url
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = selectAccessToken(getState() as StateWithSession)
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  },
})

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions)

  if (result.error?.status !== 401) {
    return result
  }

  const url = getRequestUrl(args)
  if (AUTH_SKIP_PATHS.some((path) => url.endsWith(path))) {
    return result
  }
  
  const refreshResult = await rawBaseQuery('/auth/refresh', api, extraOptions)
  const accessToken = (refreshResult.data as EnterResponse | undefined)
    ?.access_token

  if (accessToken) {
    api.dispatch(
      setCredentials({ access_token: accessToken }),
    )
    result = await rawBaseQuery(args, api, extraOptions)
  } else {
    api.dispatch(logout())
  }

  return result
}
