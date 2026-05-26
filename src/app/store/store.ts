import './initAppStore'
import './registerApiEndpoints'
import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '@/shared/api'
import { SESSION_SLICE_KEY, sessionReducer } from '@/entities/session'

export const store = configureStore({
  reducer: {
    [SESSION_SLICE_KEY]: sessionReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})
