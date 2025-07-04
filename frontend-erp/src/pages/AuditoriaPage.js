import React, { useState, useEffect } from 'react';
import '../styles/AuditoriaPage.css';

const AuditoriaPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    fechaInicio: '',
    fechaFin: '',
    usuario: '',
    accion: '',
    modulo: ''
  });
  const [stats, setStats] = useState({
    totalLogs: 0,
    logsHoy: 0,
    usuariosActivos: 0,
    accionesCriticas: 0
  });

  useEffect(() => {
    fetchLogs();
    fetchStats();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('jwt');
      const queryParams = new URLSearchParams();
      
      if (filters.fechaInicio) queryParams.append('fechaInicio', filters.fechaInicio);
      if (filters.fechaFin) queryParams.append('fechaFin', filters.fechaFin);
      if (filters.usuario) queryParams.append('usuario', filters.usuario);
      if (filters.accion) queryParams.append('accion', filters.accion);
      if (filters.modulo) queryParams.append('modulo', filters.modulo);

      const response = await fetch(`http://localhost:8081/api/auditoria/logs?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setLogs(data);
      } else {
        console.error('Error fetching logs');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch('http://localhost:8081/api/auditoria/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchLogs();
  };

  const clearFilters = () => {
    setFilters({
      fechaInicio: '',
      fechaFin: '',
      usuario: '',
      accion: '',
      modulo: ''
    });
  };

  const exportLogs = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const response = await fetch('http://localhost:8081/api/auditoria/export', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error exporting logs:', error);
    }
  };

  const getSeverityClass = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return 'critical';
      case 'high': return 'high';
      case 'medium': return 'medium';
      case 'low': return 'low';
      default: return 'info';
    }
  };

  const getActionIcon = (accion) => {
    switch (accion?.toLowerCase()) {
      case 'login': return 'fas fa-sign-in-alt';
      case 'logout': return 'fas fa-sign-out-alt';
      case 'create': return 'fas fa-plus';
      case 'update': return 'fas fa-edit';
      case 'delete': return 'fas fa-trash';
      case 'export': return 'fas fa-download';
      case 'import': return 'fas fa-upload';
      default: return 'fas fa-info-circle';
    }
  };

  return (
    <div className="auditoria-container">
      {/* Estadísticas */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-list"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.totalLogs}</h3>
            <p>Total de Logs</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-calendar-day"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.logsHoy}</h3>
            <p>Logs Hoy</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.usuariosActivos}</h3>
            <p>Usuarios Activos</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <div className="stat-content">
            <h3>{stats.accionesCriticas}</h3>
            <p>Acciones Críticas</p>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="filters-section">
        <h2>Filtros de Búsqueda</h2>
        <form onSubmit={handleFilterSubmit} className="filters-form">
          <div className="filters-grid">
            <div className="filter-group">
              <label>Fecha Inicio:</label>
              <input
                type="date"
                name="fechaInicio"
                value={filters.fechaInicio}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="filter-group">
              <label>Fecha Fin:</label>
              <input
                type="date"
                name="fechaFin"
                value={filters.fechaFin}
                onChange={handleFilterChange}
              />
            </div>
            
            <div className="filter-group">
              <label>Usuario:</label>
              <input
                type="text"
                name="usuario"
                value={filters.usuario}
                onChange={handleFilterChange}
                placeholder="Buscar por usuario..."
              />
            </div>
            
            <div className="filter-group">
              <label>Acción:</label>
              <select name="accion" value={filters.accion} onChange={handleFilterChange}>
                <option value="">Todas las acciones</option>
                <option value="LOGIN">Login</option>
                <option value="LOGOUT">Logout</option>
                <option value="CREATE">Crear</option>
                <option value="UPDATE">Actualizar</option>
                <option value="DELETE">Eliminar</option>
                <option value="EXPORT">Exportar</option>
                <option value="IMPORT">Importar</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Módulo:</label>
              <select name="modulo" value={filters.modulo} onChange={handleFilterChange}>
                <option value="">Todos los módulos</option>
                <option value="AUTH">Autenticación</option>
                <option value="USUARIOS">Usuarios</option>
                <option value="PRODUCTOS">Productos</option>
                <option value="INVENTARIO">Inventario</option>
                <option value="PEDIDOS">Pedidos</option>
                <option value="CLIENTES">Clientes</option>
                <option value="CONFIGURACION">Configuración</option>
              </select>
            </div>
          </div>
          
          <div className="filter-actions">
            <button type="submit" className="btn-primary">
              <i className="fas fa-search"></i> Buscar
            </button>
            <button type="button" onClick={clearFilters} className="btn-secondary">
              <i className="fas fa-times"></i> Limpiar
            </button>
            <button type="button" onClick={exportLogs} className="btn-export">
              <i className="fas fa-download"></i> Exportar
            </button>
          </div>
        </form>
      </div>

      {/* Tabla de Logs */}
      <div className="logs-section">
        <div className="logs-header">
          <h2>Logs de Auditoría</h2>
          <div className="logs-info">
            <span>{logs.length} registros encontrados</span>
          </div>
        </div>

        {loading ? (
          <div className="loading-spinner">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Cargando logs...</p>
          </div>
        ) : (
          <div className="logs-table-container">
            <table className="logs-table">
              <thead>
                <tr>
                  <th>Fecha/Hora</th>
                  <th>Usuario</th>
                  <th>Acción</th>
                  <th>Módulo</th>
                  <th>Descripción</th>
                  <th>IP</th>
                  <th>Severidad</th>
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="no-data">
                      <i className="fas fa-info-circle"></i>
                      No se encontraron logs con los filtros aplicados
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id} className={`log-row ${getSeverityClass(log.severidad)}`}>
                      <td>
                        <div className="log-timestamp">
                          <div className="log-date">
                            {new Date(log.timestamp).toLocaleDateString()}
                          </div>
                          <div className="log-time">
                            {new Date(log.timestamp).toLocaleTimeString()}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="log-user">
                          <i className="fas fa-user"></i>
                          {log.usuario}
                        </div>
                      </td>
                      <td>
                        <div className="log-action">
                          <i className={getActionIcon(log.accion)}></i>
                          {log.accion}
                        </div>
                      </td>
                      <td>
                        <span className="log-module">{log.modulo}</span>
                      </td>
                      <td>
                        <div className="log-description">
                          {log.descripcion}
                          {log.detalles && (
                            <button 
                              className="btn-details"
                              onClick={() => alert(log.detalles)}
                              title="Ver detalles"
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className="log-ip">{log.ipAddress}</span>
                      </td>
                      <td>
                        <span className={`severity-badge ${getSeverityClass(log.severidad)}`}>
                          {log.severidad}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuditoriaPage; 