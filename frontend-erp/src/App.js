import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import './App.css';

function App() {
  // Verificar si el usuario está autenticado
  const isAuthenticated = () => {
    const token = localStorage.getItem('jwt');
    return !!token;
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
            path="/" 
            element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
