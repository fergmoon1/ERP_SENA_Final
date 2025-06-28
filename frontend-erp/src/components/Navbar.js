import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const Navbar = ({ title = "Dashboard", subtitle = "Actualizaciones y Pagos" }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="topbar">
      <div className="hamburger" onClick={toggleMenu}>
        <i className="fa-solid fa-bars"></i>
      </div>

      <div className={`topbar-content ${isMenuOpen ? 'active' : ''}`}>
        <div className="dashboard-texto">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        
        <div className="perfil">
          <div className="perfil-texto">
            <div className="avatar-circle">
              <img src="/imagenes/foto01 mujer.png" alt="Usuario" />
            </div>
            <strong>Juana Pérez</strong>
            <span>Administrador</span>
          </div>
        </div>
        
        <div className="busqueda">
          <input type="text" placeholder="Buscar..." />
          <i className="fa-solid fa-moon"></i>
          <i className="fa-solid fa-magnifying-glass-plus"></i>
          <i className="fa-solid fa-magnifying-glass-minus"></i>
        </div>
        
        <div className="hora">
          <div>{formatTime(currentTime)}</div>
          <div>{formatDate(currentTime)}</div>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 