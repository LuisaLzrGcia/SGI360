import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Login from './View/Login/Login.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Sidebar from './Layout/Sidebar/Sidebar.jsx'
import LayoutMain from './Layout/LayoutMain/LayoutMain.jsx'
import Example from './Layout/Sidebar/prueba.jsx'
import { SGIContextProvider } from "./Context/ContextGlobal.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SGIContextProvider>
      <App/>
    </SGIContextProvider>
  </React.StrictMode>
)
