import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '@/app'
import { SessionBootstrap, StoreProvider } from '@/app/providers'
import './shared/styles/index.scss'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StoreProvider>
      <SessionBootstrap>
        <App />
      </SessionBootstrap>
    </StoreProvider>
  </StrictMode>,
)
