import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SGIContextProvider } from './Context/SGIContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SGIContextProvider>
      <App/>
    </SGIContextProvider>
  </React.StrictMode>
)
