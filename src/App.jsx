import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './View/Login/Login';
import LayoutMain from './Layout/LayoutMain/LayoutMain';
import useAuth from './Hooks/useAuth';

function App() {
  const isLogin = sessionStorage.getItem("id_user");
  const isAdmin = sessionStorage.getItem("type_user") == "admin"

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={!isLogin ? <Login /> : <Navigate to="/" />} />
          <Route path="/admin" element={isLogin && isAdmin ? <LayoutMain /> : <Navigate to="/login" />} />
          <Route
            path="/*"
            element={!isLogin ? <Navigate to="/login" /> : <Navigate to="/admin" />}
          />
        </Routes>
      </Router>
    </>
  )
}

export default App
