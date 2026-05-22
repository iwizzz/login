import { configureStore } from '@reduxjs/toolkit'
import { sessionSlice } from '@/entities/session'
import { baseApi } from '@/shared/api'

export const store = configureStore({
  reducer: {
    [sessionSlice.name]: sessionSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
