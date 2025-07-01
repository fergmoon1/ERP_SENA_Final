import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import InventarioPage from "./pages/InventarioPage";
import Layout from "./components/Layout";
import './App.css';

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

function App() {
  // Verificar si el usuario está autenticado
  const isAuthenticated = () => {
    const token = localStorage.getItem('jwt');
    if (!token) return false;
    const payload = parseJwt(token);
    if (!payload || !payload.exp) {
      localStorage.removeItem('jwt');
      localStorage.removeItem('refreshToken');
      return false;
    }
    // exp está en segundos desde epoch
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      localStorage.removeItem('jwt');
      localStorage.removeItem('refreshToken');
      return false;
    }
    return true;
  };

  // Ejemplo típico
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');
  const refreshToken = params.get('refreshToken');
  if (token && refreshToken) {
    localStorage.setItem('jwt', token);
    localStorage.setItem('refreshToken', refreshToken);
    // Limpia la URL
    window.history.replaceState({}, document.title, '/');
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={isAuthenticated() ? <Navigate to="/dashboard" /> : <LoginPage />} 
          />
          <Route 
            path="/dashboard" 
            element={isAuthenticated() ? <DashboardPage /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/inventario"
            element={isAuthenticated() ? <Layout><InventarioPage /></Layout> : <Navigate to="/login" />}
          />
          <Route 
            path="/" 
            element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
