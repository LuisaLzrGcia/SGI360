import React,{ useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './View/Login/Login';
import LayoutMain from './Layout/LayoutMain/LayoutMain';
import useAuth from './Hooks/useAuth';
import LayoutMainManager from './Manager/LayoutMainManager';

function App() {
  const isLogin = sessionStorage.getItem("id_user_pk");
  const isAdmin = sessionStorage.getItem("type") == "Admin"

  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={!isLogin ? <Login /> : <Navigate to="/" />} />
          <Route path="/admin" element={isLogin && isAdmin ? <LayoutMain /> : <Navigate to="/login" />} />
          <Route path="/manager" element={isLogin && !isAdmin ? <LayoutMainManager /> : <Navigate to="/login" />} />
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
