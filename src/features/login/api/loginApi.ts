import { AUTH_PATHS, type EnterResponse } from '@/entities/session'
import { baseApi } from '@/shared/api'
import type { LoginRequest } from '../model/types'

export const loginApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<EnterResponse, LoginRequest>({
      query: (body) => ({
        url: AUTH_PATHS.login,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useLoginMutation } = loginApi
