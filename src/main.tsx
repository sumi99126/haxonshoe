import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@wizztech/protection/style.css'
import { WizzTechProtectionProvider } from '@wizztech/protection'
import './index.css'
import App from './App.tsx'

const platformUrl = import.meta.env.VITE_WIZZTECH_PLATFORM_URL || 'https://wizztech-demo-website-platform.netlify.app'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WizzTechProtectionProvider platformUrl={platformUrl}>
      <App />
    </WizzTechProtectionProvider>
  </StrictMode>,
)

