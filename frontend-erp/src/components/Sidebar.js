import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [configLang, setConfigLang] = useState('es');
  const [configTheme, setConfigTheme] = useState('claro');
  const [configNotif, setConfigNotif] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { path: '/dashboard', icon: 'fa-chart-line', text: 'Dashboard' },
    { path: '/inventario', icon: 'fa-box', text: 'Inventario' },
    { path: '/productos', icon: 'fa-tag', text: 'Productos' },
    { path: '/pedidos', icon: 'fa-truck', text: 'Pedidos' },
    { path: '/clientes', icon: 'fa-user', text: 'Clientes' },
    { path: '/usuarios', icon: 'fa-users', text: 'Usuarios' },
    { path: '/configuracion', icon: 'fa-cogs', text: 'Configuración' }
  ];

  const notifications = [
    { id: 1, title: 'Stock bajo', message: 'El producto A está por agotarse.' },
    { id: 2, title: 'Nuevo pedido', message: 'Se ha registrado un nuevo pedido.' },
    { id: 3, title: 'Pago recibido', message: 'El cliente Juan Pérez ha realizado un pago.' },
  ];

  const favorites = [
    { id: 1, name: 'Dashboard', icon: 'fa-chart-line', path: '/dashboard' },
    { id: 2, name: 'Inventario', icon: 'fa-box', path: '/inventario' },
    { id: 3, name: 'Productos', icon: 'fa-tag', path: '/productos' },
    { id: 4, name: 'Pedidos', icon: 'fa-truck', path: '/pedidos' },
    { id: 5, name: 'Clientes', icon: 'fa-user', path: '/clientes' },
  ];

  const userProfile = {
    nombre: 'Juana Pérez',
    email: 'juana.perez@email.com',
    rol: 'Administrador',
    foto: '/imagenes/foto01 mujer.png'
  };

  const searchResults = [
    { id: 1, type: 'Producto', name: 'Producto A', extra: 'Stock: 5' },
    { id: 2, type: 'Cliente', name: 'Juan Pérez', extra: 'Pedidos: 3' },
    { id: 3, type: 'Pedido', name: 'Pedido #1234', extra: 'Estado: Pendiente' },
    { id: 4, type: 'Proveedor', name: 'Proveedor XYZ', extra: 'Última compra: 2024-06-01' },
  ];

  return (
    <nav className={`sidebar${collapsed ? ' collapsed' : ''}`}>
      <div className="logo">
        <span className="logo-icon"><i className="fa-solid fa-columns"></i></span>
        <span className="logo-icon"><i className="fa-solid fa-star"></i></span>
        <span className="logo-icon"><i className="fa-solid fa-chevron-left"></i></span>
        <span className="logo-icon"><i className="fa-solid fa-chevron-right"></i></span>
      </div>
      
      <div className="user-circles">
        <span className="user-circle user-photo" onClick={() => setShowProfile(true)} style={{cursor: 'pointer'}}>
          <img src="/imagenes/foto01 mujer.png" alt="Usuario" />
        </span>
        <span className="user-circle" onClick={() => setShowNotifications(true)} style={{cursor: 'pointer'}}>
          <i className="fa-solid fa-bell"></i>
        </span>
        <span className="user-circle" onClick={() => setShowFavorites(true)} style={{cursor: 'pointer'}}>
          <i className="fa-solid fa-star"></i>
        </span>
        <span className="user-circle" onClick={() => setShowSearch(true)} style={{cursor: 'pointer'}}><i className="fa-solid fa-magnifying-glass"></i></span>
        <span className="user-circle" onClick={() => setShowFilters(true)} style={{cursor: 'pointer'}}><i className="fa-solid fa-sliders"></i></span>
      </div>
      
      <ul className="menu">
        {menuItems.map((item) => (
          <li key={item.path} className={location.pathname === item.path ? 'activo' : ''}>
            <Link to={item.path}>
              <i className={`fa-solid ${item.icon}`}></i>
              {!collapsed && <i className="fa-solid fa-chevron-right"></i>}
              {!collapsed && item.text}
            </Link>
          </li>
        ))}
      </ul>
      
      <div className="footer-icons">
        <span className="icon-circle" onClick={() => setCollapsed(!collapsed)} style={{cursor: 'pointer'}}><i className="fa-solid fa-arrow-left"></i></span>
        <span className="icon-circle" onClick={() => setShowHelp(true)} style={{cursor: 'pointer'}}><i className="fa-solid fa-headphones"></i></span>
        <span className="icon-circle" onClick={() => setShowConfig(true)} style={{cursor: 'pointer'}}><i className="fa-solid fa-gear"></i></span>
        <span className="icon-circle" onClick={() => {
          const workArea = document.querySelector('.work-area');
          if (workArea) {
            workArea.scrollTo({top: 0, behavior: 'smooth'});
          }
        }} style={{cursor: 'pointer'}}><i className="fa-solid fa-arrow-up"></i></span>
      </div>

      {showNotifications && (
        <div className="notifications-panel-overlay" onClick={() => setShowNotifications(false)}>
          <div className="notifications-panel" onClick={e => e.stopPropagation()}>
            <div className="notifications-header">
              <span>Notificaciones</span>
              <button className="close-btn" onClick={() => setShowNotifications(false)}>&times;</button>
            </div>
            <div className="notifications-list">
              {notifications.length === 0 ? (
                <div className="notification-empty">No hay notificaciones.</div>
              ) : (
                notifications.map(n => (
                  <div key={n.id} className="notification-item">
                    <strong>{n.title}</strong>
                    <div>{n.message}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {showFavorites && (
        <div className="favorites-panel-overlay" onClick={() => setShowFavorites(false)}>
          <div className="favorites-panel" onClick={e => e.stopPropagation()}>
            <div className="favorites-header">
              <span>Favoritos</span>
              <button className="close-btn" onClick={() => setShowFavorites(false)}>&times;</button>
            </div>
            <div className="favorites-list">
              {favorites.length === 0 ? (
                <div className="favorites-empty">No hay favoritos.</div>
              ) : (
                favorites.map(fav => (
                  <a key={fav.id} href={fav.path} className="favorite-item">
                    <i className={`fa-solid ${fav.icon}`}></i>
                    <span>{fav.name}</span>
                  </a>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {showProfile && (
        <div className="profile-panel-overlay" onClick={() => setShowProfile(false)}>
          <div className="profile-panel" onClick={e => e.stopPropagation()}>
            <div className="profile-header">
              <span>Perfil de Usuario</span>
              <button className="close-btn" onClick={() => setShowProfile(false)}>&times;</button>
            </div>
            <div className="profile-content">
              <div className="profile-avatar">
                <img src={userProfile.foto} alt="Avatar" />
              </div>
              <div className="profile-info">
                <div className="profile-name">{userProfile.nombre}</div>
                <div className="profile-email">{userProfile.email}</div>
                <div className="profile-role">{userProfile.rol}</div>
              </div>
              <button className="profile-edit-btn">Editar perfil</button>
            </div>
          </div>
        </div>
      )}

      {showSearch && (
        <div className="search-panel-overlay" onClick={() => setShowSearch(false)}>
          <div className="search-panel" onClick={e => e.stopPropagation()}>
            <div className="search-header">
              <span>Búsqueda Global</span>
              <button className="close-btn" onClick={() => setShowSearch(false)}>&times;</button>
            </div>
            <div className="search-content">
              <input
                className="search-input"
                type="text"
                placeholder="Buscar en todo el sistema..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                autoFocus
              />
              <div className="search-results">
                {searchTerm.trim() === '' ? (
                  <div className="search-empty">Escribe para buscar...</div>
                ) : (
                  searchResults.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase())).length === 0 ? (
                    <div className="search-empty">Sin resultados.</div>
                  ) : (
                    searchResults.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase())).map(r => (
                      <div key={r.id} className="search-result-item">
                        <span className="search-type">{r.type}</span>
                        <span className="search-name">{r.name}</span>
                        <span className="search-extra">{r.extra}</span>
                      </div>
                    ))
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {showFilters && (
        <div className="filters-panel-overlay" onClick={() => setShowFilters(false)}>
          <div className="filters-panel" onClick={e => e.stopPropagation()}>
            <div className="filters-header">
              <span>Filtros Avanzados</span>
              <button className="close-btn" onClick={() => setShowFilters(false)}>&times;</button>
            </div>
            <div className="filters-content">
              <label className="filters-label">Tipo:
                <select value={filterType} onChange={e => setFilterType(e.target.value)}>
                  <option value="">Todos</option>
                  <option value="producto">Producto</option>
                  <option value="cliente">Cliente</option>
                  <option value="pedido">Pedido</option>
                  <option value="proveedor">Proveedor</option>
                </select>
              </label>
              <label className="filters-label">Estado:
                <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
                  <option value="">Todos</option>
                  <option value="pendiente">Pendiente</option>
                  <option value="completado">Completado</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </label>
              <label className="filters-label">Fecha:
                <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} />
              </label>
              <div className="filters-actions">
                <button className="filters-apply-btn">Aplicar</button>
                <button className="filters-clear-btn" onClick={() => {setFilterType('');setFilterStatus('');setFilterDate('');}}>Limpiar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showHelp && (
        <div className="help-panel-overlay" onClick={() => setShowHelp(false)}>
          <div className="help-panel" onClick={e => e.stopPropagation()}>
            <div className="help-header">
              <span>Ayuda y Soporte</span>
              <button className="close-btn" onClick={() => setShowHelp(false)}>&times;</button>
            </div>
            <div className="help-content">
              <div className="help-section">
                <strong>Contacto:</strong>
                <div>Email: soporte@erpempresa.com</div>
                <div>Teléfono: +57 123 456 7890</div>
              </div>
              <div className="help-section">
                <strong>Preguntas Frecuentes:</strong>
                <ul className="help-faq">
                  <li>¿Cómo restablezco mi contraseña?</li>
                  <li>¿Cómo registro un nuevo producto?</li>
                  <li>¿Dónde veo mis pedidos?</li>
                  <li>¿Cómo contacto al soporte?</li>
                </ul>
              </div>
              <button className="help-send-btn">Enviar mensaje al soporte</button>
            </div>
          </div>
        </div>
      )}

      {showConfig && (
        <div className="config-panel-overlay" onClick={() => setShowConfig(false)}>
          <div className="config-panel" onClick={e => e.stopPropagation()}>
            <div className="config-header">
              <span>Configuración General</span>
              <button className="close-btn" onClick={() => setShowConfig(false)}>&times;</button>
            </div>
            <div className="config-content">
              <label className="config-label">Idioma:
                <select value={configLang} onChange={e => setConfigLang(e.target.value)}>
                  <option value="es">Español</option>
                  <option value="en">Inglés</option>
                </select>
              </label>
              <label className="config-label">Tema:
                <select value={configTheme} onChange={e => setConfigTheme(e.target.value)}>
                  <option value="claro">Claro</option>
                  <option value="oscuro">Oscuro</option>
                </select>
              </label>
              <label className="config-label">
                <input type="checkbox" checked={configNotif} onChange={e => setConfigNotif(e.target.checked)} />
                &nbsp;Recibir notificaciones
              </label>
              <button className="config-save-btn">Guardar cambios</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Sidebar; 