import { SESSION_SLICE_KEY } from './sessionSlice'

type SessionRootState = {
  [SESSION_SLICE_KEY]: {
    accessToken: string | null
    isBootstrapped: boolean
  }
}

export type StateWithSession = SessionRootState

export const selectAccessToken = (state: StateWithSession) =>
  state[SESSION_SLICE_KEY].accessToken

export const selectIsAuthenticated = (state: StateWithSession) =>
  Boolean(state[SESSION_SLICE_KEY].accessToken)

export const selectIsSessionBootstrapped = (state: StateWithSession) =>
  state[SESSION_SLICE_KEY].isBootstrapped
