import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app.jsx'
import './index.css'

// Import Bootstrap CSS e JS
// import 'bootstrap/dist/css/bootstrap.min.css';
import './bootstrap-cerulean.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

//  Import Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
