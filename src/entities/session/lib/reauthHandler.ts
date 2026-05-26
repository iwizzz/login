import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { getRequestUrl } from '@/shared/api'
import { AUTH_PATHS, AUTH_SKIP_PATHS } from '../model/constants'
import type { EnterResponse } from '../model/response'
import { logout, setCredentials } from '../model/sessionSlice'

export function withReauth(
  baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> {
  return async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if (result.error?.status !== 401) {
      return result
    }

    const url = getRequestUrl(args)
    if (AUTH_SKIP_PATHS.some((path) => url.endsWith(path))) {
      return result
    }

    const refreshResult = await baseQuery(
      { url: AUTH_PATHS.refresh, method: 'GET' },
      api,
      extraOptions,
    )

    const accessToken = (refreshResult.data as EnterResponse | undefined)
      ?.access_token

    if (accessToken) {
      api.dispatch(setCredentials({ access_token: accessToken }))
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(logout())
    }

    return result
  }
}
