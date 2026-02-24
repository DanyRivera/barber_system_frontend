import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer,  } from 'react-toastify';

import './index.css'
import Router from './Router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router />
    <ToastContainer />
  </StrictMode>,
)
