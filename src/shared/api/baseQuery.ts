import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'

export type CreateBaseQueryOptions = {
  getAccessToken?: (state: unknown) => string | null
}

export function createBaseQuery(
  options?: CreateBaseQueryOptions,
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> {
  return fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = options?.getAccessToken?.(getState())
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  })
}

export function getRequestUrl(args: string | FetchArgs): string {
  return typeof args === 'string' ? args : args.url
}
