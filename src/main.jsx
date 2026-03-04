import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// HashRouter works reliably on GitHub Pages (no server config for SPA routes)
const rawBase = import.meta.env.BASE_URL || '/'
const basename = rawBase === './' ? '' : rawBase.replace(/\/$/, '')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter basename={basename}>
      <App />
    </HashRouter>
  </React.StrictMode>
)
