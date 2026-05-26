import { createSlice } from '@reduxjs/toolkit'
import {
  clearStoredAccessToken,
  getStoredAccessToken,
  setStoredAccessToken,
} from '../lib/persist'
import type { AuthToken } from './response'

export const SESSION_SLICE_KEY = 'session' as const

type SessionState = {
  accessToken: string | null
  isBootstrapped: boolean
}

const initialState: SessionState = {
  accessToken: getStoredAccessToken(),
  isBootstrapped: Boolean(getStoredAccessToken()),
}

const sessionSlice = createSlice({
  name: SESSION_SLICE_KEY,
  initialState,
  reducers: {
    setCredentials: (state, action: { payload: AuthToken }) => {
      state.accessToken = action.payload.access_token
      state.isBootstrapped = true
      setStoredAccessToken(action.payload.access_token)
    },
    logout: (state) => {
      state.accessToken = null
      state.isBootstrapped = true
      clearStoredAccessToken()
    },
    setBootstrapped: (state) => {
      state.isBootstrapped = true
    },
  },
})

export const sessionReducer = sessionSlice.reducer
export const { setCredentials, logout, setBootstrapped } = sessionSlice.actions
