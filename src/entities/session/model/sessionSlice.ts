import { createSlice } from '@reduxjs/toolkit'
import type { AuthToken } from './types'

type SessionState = {
  accessToken: string | null
}

const initialState: SessionState = {
  accessToken: null,
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setCredentials: (state, action: { payload: AuthToken }) => {
      state.accessToken = action.payload.access_token
    },
    logout: (state) => {
      state.accessToken = null
    },
  },
})

export const { setCredentials, logout } = sessionSlice.actions
