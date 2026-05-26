import type { UnknownAction, ThunkDispatch } from '@reduxjs/toolkit'
import { API_REDUCER_PATH, type AppBaseApi } from '@/shared/api'
import { SESSION_SLICE_KEY, sessionReducer } from '@/entities/session'

type BaseApiState = ReturnType<AppBaseApi['reducer']>
type SessionState = ReturnType<typeof sessionReducer>

export type RootState = {
  [SESSION_SLICE_KEY]: SessionState
  [API_REDUCER_PATH]: BaseApiState
}

export type AppDispatch = ThunkDispatch<RootState, unknown, UnknownAction>
