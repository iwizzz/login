import { AUTH_PATHS } from '@/entities/session'
import { baseApi } from '@/shared/api'
import type { SendResetPasswordRequest } from '../model/types'

export const resetPasswordApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    sendResetPassword: build.query<void, SendResetPasswordRequest>({
      query: ({ email }) => ({
        url: AUTH_PATHS.sendResetPassword,
        params: { email },
      }),
    }),
  }),
})

export const { useLazySendResetPasswordQuery } = resetPasswordApi
