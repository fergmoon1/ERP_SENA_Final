import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import InventarioPage from "./pages/InventarioPage";
import ProductosPage from "./pages/ProductosPage";
import PedidosPage from "./pages/PedidosPage";
import ClientesPage from "./pages/ClientesPage";
import UsuariosPage from "./pages/UsuariosPage";
import ConfiguracionPage from "./pages/ConfiguracionPage";
import AuditoriaPage from "./pages/AuditoriaPage";
import Layout from "./components/Layout";
import { NotificationProvider } from "./components/NotificationProvider";
import './App.css';
import './styles/theme.css';

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
    <NotificationProvider>
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
              path="/productos"
              element={isAuthenticated() ? <Layout><ProductosPage /></Layout> : <Navigate to="/login" />}
            />
            <Route 
              path="/pedidos"
              element={isAuthenticated() ? <Layout><PedidosPage /></Layout> : <Navigate to="/login" />}
            />
            <Route 
              path="/clientes"
              element={isAuthenticated() ? <Layout title="Clientes" subtitle="Gestión de Clientes"><ClientesPage /></Layout> : <Navigate to="/login" />} 
            />
            <Route 
              path="/usuarios"
              element={isAuthenticated() ? <Layout title="Usuarios" subtitle="Gestión de Usuarios"><UsuariosPage /></Layout> : <Navigate to="/login" />} 
            />
            <Route 
              path="/configuracion"
              element={isAuthenticated() ? <Layout title="Configuración" subtitle="Ajustes del Sistema"><ConfiguracionPage /></Layout> : <Navigate to="/login" />} 
            />
            <Route 
              path="/auditoria"
              element={isAuthenticated() ? <Layout title="Auditoría" subtitle="Logs de Seguridad"><AuditoriaPage /></Layout> : <Navigate to="/login" />} 
            />
            <Route 
              path="/" 
              element={<Navigate to={isAuthenticated() ? "/dashboard" : "/login"} />} 
            />
          </Routes>
        </div>
      </Router>
    </NotificationProvider>
  );
}

export default App;
