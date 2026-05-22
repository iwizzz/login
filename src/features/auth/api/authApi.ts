import { baseApi } from '@/shared/api'
import type { EnterResponse, LoginRequest, LogoutResponse, SignupRequest } from '../model/types'


export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<EnterResponse, LoginRequest>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    signUp: build.mutation<EnterResponse, SignupRequest>({
      query: (body) => ({
        url: '/auth/signUp',
        method: 'POST',
        body,
      }),
    }),
    refresh: build.query<EnterResponse, void>({
      query: () => '/auth/refresh',
    }),
    logout: build.query<LogoutResponse, void>({
      query: () => '/auth/logout',
    }),
  }),
})

export const { 
  useLoginMutation, 
  useSignUpMutation, 
  useRefreshQuery, 
  useLogoutQuery,
} = authApi
