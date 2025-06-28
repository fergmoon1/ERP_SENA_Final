import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: 'fa-chart-line', text: 'Dashboard' },
    { path: '/inventario', icon: 'fa-box', text: 'Inventario' },
    { path: '/productos', icon: 'fa-tag', text: 'Productos' },
    { path: '/pedidos', icon: 'fa-truck', text: 'Pedidos' },
    { path: '/clientes', icon: 'fa-user', text: 'Clientes' },
    { path: '/usuarios', icon: 'fa-users', text: 'Usuarios' },
    { path: '/configuracion', icon: 'fa-cogs', text: 'Configuración' }
  ];

  return (
    <nav className="sidebar">
      <div className="logo">
        <span className="logo-icon"><i className="fa-solid fa-columns"></i></span>
        <span className="logo-icon"><i className="fa-solid fa-star"></i></span>
        <span className="logo-icon"><i className="fa-solid fa-chevron-left"></i></span>
        <span className="logo-icon"><i className="fa-solid fa-chevron-right"></i></span>
      </div>
      
      <div className="user-circles">
        <span className="user-circle user-photo">
          <img src="/imagenes/foto01 mujer.png" alt="Usuario" />
        </span>
        <span className="user-circle"><i className="fa-solid fa-bell"></i></span>
        <span className="user-circle"><i className="fa-solid fa-star"></i></span>
        <span className="user-circle"><i className="fa-solid fa-magnifying-glass"></i></span>
        <span className="user-circle"><i className="fa-solid fa-sliders"></i></span>
      </div>
      
      <ul className="menu">
        {menuItems.map((item) => (
          <li key={item.path} className={location.pathname === item.path ? 'activo' : ''}>
            <Link to={item.path}>
              <i className={`fa-solid ${item.icon}`}></i>
              <i className="fa-solid fa-chevron-right"></i>
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
      
      <div className="footer-icons">
        <span className="icon-circle"><i className="fa-solid fa-arrow-left"></i></span>
        <span className="icon-circle"><i className="fa-solid fa-headphones"></i></span>
        <span className="icon-circle"><i className="fa-solid fa-gear"></i></span>
        <span className="icon-circle"><i className="fa-solid fa-arrow-up"></i></span>
      </div>
    </nav>
  );
};

export default Sidebar; 