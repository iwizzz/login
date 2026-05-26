import { AUTH_PATHS, type EnterResponse } from '@/entities/session'
import { baseApi } from '@/shared/api'
import type { SignupRequest } from '../model/types'

export const signUpApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<EnterResponse, SignupRequest>({
      query: (body) => ({
        url: AUTH_PATHS.signUp,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useSignUpMutation } = signUpApi
