import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PaisProvider } from './contexts/PaisContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <PaisProvider>
        <App />
      </PaisProvider>
    </BrowserRouter>
  </StrictMode>,
)
