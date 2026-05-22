import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '@/app'
import { withProviders } from '@/app/providers'
import '@/shared/styles/index.scss'

const AppWithProviders = withProviders(App)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppWithProviders />
  </StrictMode>,
)
