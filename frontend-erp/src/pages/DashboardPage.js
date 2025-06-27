import React, { useEffect, useState } from "react";
import "../styles/DashboardPage.css";

const DashboardPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verificar si el usuario está autenticado
    const token = localStorage.getItem("token");
    if (!token) {
      // Si no hay token, redirigir al login
      window.location.href = "/login";
      return;
    }

    // Aquí puedes hacer una petición al backend para obtener información del usuario
    // Por ahora, mostraremos un mensaje de bienvenida
    setUser({ name: "Usuario OAuth" });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
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
        <h2>¡Bienvenido, {user.name}!</h2>
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