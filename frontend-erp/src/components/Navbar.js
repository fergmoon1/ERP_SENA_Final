import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const Navbar = ({ title = "Dashboard", subtitle = "Actualizaciones y Pagos" }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLogoutMenuOpen, setIsLogoutMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const zoomDiv = document.querySelector('.work-area-zoom');
    if (zoomDiv) {
      zoomDiv.style.transform = `scale(${zoom})`;
      zoomDiv.style.transformOrigin = 'top left';
      zoomDiv.style.width = `${100 / zoom}%`;
      zoomDiv.style.height = `${100 / zoom}%`;
    }
  }, [zoom]);

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

        <div className="spacer"></div>

        <div className="perfil">
          <div className="perfil-texto">
            <div className="avatar-circle">
              <img src="/imagenes/foto01 mujer.png" alt="Usuario" />
            </div>
            <strong>Juana Pérez</strong>
            <span>Administrador</span>
          </div>
          <div className="hora-modern">
            <div className="fecha-modern">
              <i className="fa-regular fa-calendar"></i> {formatDate(currentTime)}
            </div>
            <div className="tiempo-modern">{formatTime(currentTime)}</div>
          </div>
        </div>

        <div className="navbar-derecha" style={{marginLeft: '8px'}}>
          <div className="busqueda" style={{marginRight: '0'}}>
            <input type="text" placeholder="Buscar..." />
            <i className="fa-solid fa-moon" onClick={() => setDarkMode(dm => !dm)} style={{cursor: 'pointer'}}></i>
            <i className="fa-solid fa-magnifying-glass-plus" onClick={() => setZoom(z => Math.min(z + 0.1, 1.3))} style={{cursor: 'pointer'}}></i>
            <i className="fa-solid fa-magnifying-glass-minus" onClick={() => setZoom(z => Math.max(z - 0.1, 0.8))} style={{cursor: 'pointer'}}></i>
          </div>
          <div
            className="logout-icon-menu"
            style={{marginRight: '12px'}}
            onMouseEnter={() => setIsLogoutMenuOpen(true)}
            onMouseLeave={() => setIsLogoutMenuOpen(false)}
            tabIndex={0}
          >
            <i className="fa-solid fa-right-from-bracket logout-icon"></i>
            {isLogoutMenuOpen && (
              <div className="logout-menu">
                <button
                  className="logout-menu-btn"
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = '/login';
                  }}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 