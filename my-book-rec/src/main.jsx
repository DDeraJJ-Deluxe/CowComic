// original template code given when making react vite app:
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )


// code from portfolio proj as ref
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom'
import './css/main.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter >
      <App />
    </HashRouter>
  </React.StrictMode>,
)