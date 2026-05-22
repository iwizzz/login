import type { ComponentType } from 'react'
import { StoreProvider } from './StoreProvider'

export function withProviders<P extends object>(Component: ComponentType<P>) {
  return function WithProviders(props: P) {
    return (
      <StoreProvider>
        <Component {...props} />
      </StoreProvider>
    )
  }
}
