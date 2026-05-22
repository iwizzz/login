import { sessionSlice } from './sessionSlice'

export type StateWithSession = {
  [sessionSlice.name]: ReturnType<typeof sessionSlice.reducer>
}

export const selectAccessToken = (state: StateWithSession) =>
  state.session.accessToken

export const selectIsAuthenticated = (state: StateWithSession) =>
  Boolean(state.session.accessToken)
