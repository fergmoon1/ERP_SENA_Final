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
    <div className="auditoria-container" style={{padding:'32px 0 32px 0',maxWidth:1200,margin:'0 auto'}}>
      {/* Estadísticas */}
      <div className="stats-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:24,marginBottom:32}}>
        <div className="stat-card" style={{background:'#fff',borderRadius:14,boxShadow:'0 4px 18px rgba(37,99,235,0.08)',padding:'24px 18px',display:'flex',alignItems:'center',gap:18}}>
          <div className="stat-icon" style={{fontSize:32,color:'#2563eb',background:'#e0e7ff',borderRadius:10,padding:12}}>
            <i className="fas fa-list"></i>
          </div>
          <div className="stat-content">
            <h3 style={{margin:0,fontSize:28,fontWeight:700}}>{stats.totalLogs}</h3>
            <p style={{margin:0,color:'#64748b',fontSize:15}}>Total de Logs</p>
          </div>
        </div>
        <div className="stat-card" style={{background:'#fff',borderRadius:14,boxShadow:'0 4px 18px rgba(37,99,235,0.08)',padding:'24px 18px',display:'flex',alignItems:'center',gap:18}}>
          <div className="stat-icon" style={{fontSize:32,color:'#059669',background:'#d1fae5',borderRadius:10,padding:12}}>
            <i className="fas fa-calendar-day"></i>
          </div>
          <div className="stat-content">
            <h3 style={{margin:0,fontSize:28,fontWeight:700}}>{stats.logsHoy}</h3>
            <p style={{margin:0,color:'#64748b',fontSize:15}}>Logs Hoy</p>
          </div>
        </div>
        <div className="stat-card" style={{background:'#fff',borderRadius:14,boxShadow:'0 4px 18px rgba(37,99,235,0.08)',padding:'24px 18px',display:'flex',alignItems:'center',gap:18}}>
          <div className="stat-icon" style={{fontSize:32,color:'#f59e42',background:'#fef3c7',borderRadius:10,padding:12}}>
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <h3 style={{margin:0,fontSize:28,fontWeight:700}}>{stats.usuariosActivos}</h3>
            <p style={{margin:0,color:'#64748b',fontSize:15}}>Usuarios Activos</p>
          </div>
        </div>
        <div className="stat-card" style={{background:'#fff',borderRadius:14,boxShadow:'0 4px 18px rgba(37,99,235,0.08)',padding:'24px 18px',display:'flex',alignItems:'center',gap:18}}>
          <div className="stat-icon" style={{fontSize:32,color:'#e11d48',background:'#fee2e2',borderRadius:10,padding:12}}>
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <div className="stat-content">
            <h3 style={{margin:0,fontSize:28,fontWeight:700}}>{stats.accionesCriticas}</h3>
            <p style={{margin:0,color:'#64748b',fontSize:15}}>Acciones Críticas</p>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="filters-section" style={{background:'#fff',borderRadius:14,boxShadow:'0 2px 8px rgba(37,99,235,0.06)',padding:'28px 24px',marginBottom:32}}>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:18}}>
          <h2 style={{margin:0,fontSize:22,fontWeight:700,color:'#2563eb',letterSpacing:0.2}}>Filtros de Búsqueda</h2>
          <button type="button" onClick={exportLogs} style={{background:'linear-gradient(90deg,#2563eb 0%,#059669 100%)',color:'#fff',border:'none',borderRadius:8,padding:'10px 24px',fontWeight:700,fontSize:15,cursor:'pointer',boxShadow:'0 2px 8px rgba(37,99,235,0.10)',display:'flex',alignItems:'center',gap:8}}>
            <i className="fas fa-download"></i> Exportar CSV
          </button>
        </div>
        <form onSubmit={handleFilterSubmit} className="filters-form" style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:18,alignItems:'end'}}>
          <div className="filter-group" style={{display:'flex',flexDirection:'column',gap:6}}>
            <label style={{fontWeight:600,color:'#374151',fontSize:14}}>Fecha Inicio:</label>
            <input type="date" name="fechaInicio" value={filters.fechaInicio} onChange={handleFilterChange} style={{padding:8,borderRadius:6,border:'1.5px solid #d1d5db',fontSize:14}} />
          </div>
          <div className="filter-group" style={{display:'flex',flexDirection:'column',gap:6}}>
            <label style={{fontWeight:600,color:'#374151',fontSize:14}}>Fecha Fin:</label>
            <input type="date" name="fechaFin" value={filters.fechaFin} onChange={handleFilterChange} style={{padding:8,borderRadius:6,border:'1.5px solid #d1d5db',fontSize:14}} />
          </div>
          <div className="filter-group" style={{display:'flex',flexDirection:'column',gap:6}}>
            <label style={{fontWeight:600,color:'#374151',fontSize:14}}>Usuario:</label>
            <input type="text" name="usuario" value={filters.usuario} onChange={handleFilterChange} placeholder="Buscar por usuario..." style={{padding:8,borderRadius:6,border:'1.5px solid #d1d5db',fontSize:14}} />
          </div>
          <div className="filter-group" style={{display:'flex',flexDirection:'column',gap:6}}>
            <label style={{fontWeight:600,color:'#374151',fontSize:14}}>Acción:</label>
            <select name="accion" value={filters.accion} onChange={handleFilterChange} style={{padding:8,borderRadius:6,border:'1.5px solid #d1d5db',fontSize:14}}>
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
          <div className="filter-group" style={{display:'flex',flexDirection:'column',gap:6}}>
            <label style={{fontWeight:600,color:'#374151',fontSize:14}}>Módulo:</label>
            <select name="modulo" value={filters.modulo} onChange={handleFilterChange} style={{padding:8,borderRadius:6,border:'1.5px solid #d1d5db',fontSize:14}}>
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
          <div style={{display:'flex',gap:10,marginTop:8}}>
            <button type="submit" style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:8,padding:'10px 24px',fontWeight:700,fontSize:15,cursor:'pointer',boxShadow:'0 2px 8px rgba(37,99,235,0.10)',display:'flex',alignItems:'center',gap:8}}>
              <i className="fas fa-search"></i> Buscar
            </button>
            <button type="button" onClick={clearFilters} style={{background:'#e5e7eb',color:'#222',border:'none',borderRadius:8,padding:'10px 24px',fontWeight:700,fontSize:15,cursor:'pointer',boxShadow:'0 2px 8px rgba(100,116,139,0.10)',display:'flex',alignItems:'center',gap:8}}>
              <i className="fas fa-eraser"></i> Limpiar
            </button>
          </div>
        </form>
      </div>

      {/* Tabla de logs */}
      <div className="logs-section" style={{background:'#fff',borderRadius:14,boxShadow:'0 2px 8px rgba(37,99,235,0.06)',padding:'18px 0 0 0',marginBottom:32,overflowX:'auto'}}>
        <h2 style={{margin:'0 0 18px 24px',fontSize:20,fontWeight:700,color:'#2563eb'}}>Registros de Auditoría</h2>
        {loading ? (
          <div style={{textAlign:'center',padding:'48px 0',color:'#64748b',fontSize:18}}>
            <i className="fas fa-spinner fa-spin" style={{fontSize:28,marginBottom:12}}></i>
            <div>Cargando registros...</div>
          </div>
        ) : logs.length === 0 ? (
          <div style={{textAlign:'center',padding:'48px 0',color:'#64748b',fontSize:18}}>
            <i className="fas fa-info-circle" style={{fontSize:28,marginBottom:12}}></i>
            <div>No hay registros para mostrar.</div>
          </div>
        ) : (
          <table className="logs-table" style={{width:'100%',borderCollapse:'separate',borderSpacing:0,minWidth:900}}>
            <thead style={{position:'sticky',top:0,zIndex:2,background:'#f1f5f9'}}>
              <tr>
                <th style={{padding:'12px 8px',fontWeight:700,fontSize:15,color:'#374151',borderBottom:'2px solid #e5e7eb'}}>Fecha</th>
                <th style={{padding:'12px 8px',fontWeight:700,fontSize:15,color:'#374151',borderBottom:'2px solid #e5e7eb'}}>Usuario</th>
                <th style={{padding:'12px 8px',fontWeight:700,fontSize:15,color:'#374151',borderBottom:'2px solid #e5e7eb'}}>Acción</th>
                <th style={{padding:'12px 8px',fontWeight:700,fontSize:15,color:'#374151',borderBottom:'2px solid #e5e7eb'}}>Módulo</th>
                <th style={{padding:'12px 8px',fontWeight:700,fontSize:15,color:'#374151',borderBottom:'2px solid #e5e7eb'}}>Detalle</th>
                <th style={{padding:'12px 8px',fontWeight:700,fontSize:15,color:'#374151',borderBottom:'2px solid #e5e7eb'}}>Severidad</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, idx) => (
                <tr key={log.id || idx} style={{background:idx%2===0?'#f8fafc':'#fff',transition:'background 0.2s'}}>
                  <td style={{padding:'10px 8px',fontSize:15,color:'#222'}}>{log.fecha}</td>
                  <td style={{padding:'10px 8px',fontSize:15,color:'#2563eb',fontWeight:600}}>{log.usuario}</td>
                  <td style={{padding:'10px 8px',fontSize:15}}><i className={getActionIcon(log.accion)} style={{marginRight:7}}></i>{log.accion}</td>
                  <td style={{padding:'10px 8px',fontSize:15}}>{log.modulo}</td>
                  <td style={{padding:'10px 8px',fontSize:15,maxWidth:320,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}} title={log.detalle}>{log.detalle}</td>
                  <td style={{padding:'10px 8px',fontSize:15}}>
                    <span className={`severity-badge ${getSeverityClass(log.severidad)}`} style={{padding:'4px 12px',borderRadius:8,fontWeight:700,fontSize:14,background:getSeverityClass(log.severidad)==='critical'?'#fee2e2':getSeverityClass(log.severidad)==='high'?'#fef3c7':getSeverityClass(log.severidad)==='medium'?'#e0e7ff':'#e0f2fe',color:getSeverityClass(log.severidad)==='critical'?'#e11d48':getSeverityClass(log.severidad)==='high'?'#f59e42':getSeverityClass(log.severidad)==='medium'?'#2563eb':'#0891b2'}}>
                      {log.severidad}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AuditoriaPage; 