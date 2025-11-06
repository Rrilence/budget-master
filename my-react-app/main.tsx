import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {MainPropvider} from './src/app/MainProvider.tsx'
import './src/app/index.css'
import App from './src/app/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainPropvider>
        <App />
    </MainPropvider>
  </StrictMode>
)
