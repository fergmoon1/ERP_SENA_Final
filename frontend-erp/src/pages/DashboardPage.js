import React, { useEffect, useState } from "react";
import "../styles/DashboardPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const DashboardPage = () => {
  const [user, setUser] = useState(null);
  const location = window.location;
  const navigate = (path) => { window.location.href = path; };

  useEffect(() => {
    // Capturar token y refreshToken de la URL si existen
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const refreshToken = params.get("refreshToken");
    let tokenToUse = localStorage.getItem("token");
    if (token) {
      localStorage.setItem("token", token);
      tokenToUse = token;
    }
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
    // Limpiar la URL (quitar los parámetros)
    if (token || refreshToken) {
      window.history.replaceState({}, document.title, "/dashboard");
    }
    // Verificar si el usuario está autenticado
    if (!tokenToUse) {
      window.location.href = "/login";
      return;
    }
    // Aquí puedes hacer una petición al backend para obtener información del usuario
    axios.get("http://localhost:8081/api/auth/me", {
      headers: {
        Authorization: `Bearer ${tokenToUse}`,
      },
    })
      .then(res => setUser(res.data))
      .catch(() => setUser({ name: "Usuario OAuth" }));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard ERP</h1>
        <button onClick={handleLogout} className="logout-btn">
          Cerrar Sesión
        </button>
      </header>
      
      <main className="dashboard-content">
        <h2>¡Bienvenido, {user.nombre || user.name}!</h2>
        <p>Has iniciado sesión exitosamente con OAuth.</p>
        
        <div className="dashboard-modules">
          <div className="module-card">
            <h3>Productos</h3>
            <p>Gestionar inventario</p>
          </div>
          <div className="module-card">
            <h3>Pedidos</h3>
            <p>Gestionar pedidos</p>
          </div>
          <div className="module-card">
            <h3>Clientes</h3>
            <p>Gestionar clientes</p>
          </div>
          <div className="module-card">
            <h3>Reportes</h3>
            <p>Ver reportes</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;