import { createApi } from '@reduxjs/toolkit/query/react'
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query'
import { API_REDUCER_PATH } from './constants'

function createAppBaseApi(
  baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
) {
  return createApi({
    reducerPath: API_REDUCER_PATH,
    baseQuery,
    endpoints: () => ({}),
  })
}

export type AppBaseApi = ReturnType<typeof createAppBaseApi>

export let baseApi!: AppBaseApi

export function initBaseApi(
  baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>,
): AppBaseApi {
  if (!baseApi) {
    baseApi = createAppBaseApi(baseQuery)
  }
  return baseApi
}
