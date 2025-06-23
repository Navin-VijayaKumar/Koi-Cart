import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ShopcontextProvider from './Context/ShopContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShopcontextProvider>

    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ShopcontextProvider>
  </StrictMode>,
)
