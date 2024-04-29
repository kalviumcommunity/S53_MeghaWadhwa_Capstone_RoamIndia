// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import ParentContext from './Context/ParentContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ParentContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ParentContext>,
)
