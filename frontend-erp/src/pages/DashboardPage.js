import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import '../styles/DashboardPage.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import IndicadoresWidget from '../components/IndicadoresWidget';

const DashboardPage = () => {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [dashboardData, setDashboardData] = useState(null);
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);
  const [ingresosPorMes, setIngresosPorMes] = useState([]);
  const [pedidosPorEstado, setPedidosPorEstado] = useState([]);
  const [clientesNuevosPorMes, setClientesNuevosPorMes] = useState([]);
  const [alertasStock, setAlertasStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  // Capturar tokens de la URL si vienen de OAuth
  useEffect(() => {
    console.log('DashboardPage - URL actual:', location.search);
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get('token');
    const refreshToken = urlParams.get('refreshToken');

    console.log('DashboardPage - Token encontrado:', !!token);
    console.log('DashboardPage - RefreshToken encontrado:', !!refreshToken);

    if (token && refreshToken) {
      console.log('DashboardPage - Guardando tokens en localStorage');
      // Guardar tokens en localStorage
      localStorage.setItem('jwt', token);
      localStorage.setItem('refreshToken', refreshToken);
      
      // Limpiar la URL
      navigate('/dashboard', { replace: true });
    } else {
      console.log('DashboardPage - No se encontraron tokens en la URL');
    }
  }, [location, navigate]);

  // Verificar si el usuario está autenticado
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    // Solo redirigir si no hay token y no estamos ya en /login
    if (!token && location.pathname !== '/login') {
      navigate('/login', { replace: true });
    }
  }, [navigate, location.pathname]);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('jwt');
      const headers = { 'Authorization': `Bearer ${token}` };

      // Dashboard general
      const dashboardRes = await fetch('http://localhost:8081/api/reportes/dashboard', { headers });
      if (dashboardRes.ok) {
        const data = await dashboardRes.json();
        setDashboardData(data);
        console.log('Dashboard data:', data);
      } else {
        console.error('Error fetching dashboard:', dashboardRes.status);
      }

      // Productos más vendidos
      const productosRes = await fetch('http://localhost:8081/api/reportes/ventas/productos-mas-vendidos', { headers });
      if (productosRes.ok) {
        const data = await productosRes.json();
        setProductosMasVendidos(data || []);
        console.log('Productos más vendidos:', data);
      } else {
        console.error('Error fetching productos:', productosRes.status);
      }

      // Ingresos por mes
      const ingresosRes = await fetch('http://localhost:8081/api/reportes/ingresos-por-mes', { headers });
      if (ingresosRes.ok) {
        const data = await ingresosRes.json();
        setIngresosPorMes(data || []);
        console.log('Ingresos por mes:', data);
      } else {
        console.error('Error fetching ingresos:', ingresosRes.status);
      }

      // Pedidos por estado
      const pedidosRes = await fetch('http://localhost:8081/api/reportes/pedidos-por-estado', { headers });
      if (pedidosRes.ok) {
        const data = await pedidosRes.json();
        setPedidosPorEstado(data || []);
        console.log('Pedidos por estado:', data);
      } else {
        console.error('Error fetching pedidos por estado:', pedidosRes.status);
      }

      // Clientes nuevos por mes
      const clientesRes = await fetch('http://localhost:8081/api/reportes/clientes-nuevos-por-mes', { headers });
      if (clientesRes.ok) {
        const data = await clientesRes.json();
        setClientesNuevosPorMes(data || []);
        console.log('Clientes nuevos por mes:', data);
      } else {
        console.error('Error fetching clientes:', clientesRes.status);
      }

      // Alertas de stock bajo
      const stockRes = await fetch('http://localhost:8081/api/reportes/inventario/stock-bajo', { headers });
      if (stockRes.ok) {
        const data = await stockRes.json();
        setAlertasStock(data || []);
        console.log('Alertas de stock:', data);
      } else {
        console.error('Error fetching stock bajo:', stockRes.status);
      }

    } catch (err) {
      console.error('Error en fetchDashboardData:', err);
      setError('Error al cargar los datos del dashboard: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleFiltrar = () => {
    // Aquí se implementaría la lógica de filtrado
    console.log('Filtrando desde:', fechaInicio, 'hasta:', fechaFin);
    fetchDashboardData(); // Recargar datos con filtros
  };

  // Colores para PieChart
  const pieColors = ['#1976d2', '#10b981', '#fbc02d', '#e53935', '#ff9800', '#8e24aa'];

  // Utilidad para iconos y colores por estado
  const estadoConfig = {
    'Pendiente': { icon: '🕒', color: '#fbc02d' },
    'PENDIENTE': { icon: '🕒', color: '#fbc02d' },
    'Enviado': { icon: '🚚', color: '#1976d2' },
    'ENVIADO': { icon: '🚚', color: '#1976d2' },
    'Entregado': { icon: '✅', color: '#10b981' },
    'ENTREGADO': { icon: '✅', color: '#10b981' },
    'Cancelado': { icon: '❌', color: '#e53935' },
    'CANCELADO': { icon: '❌', color: '#e53935' },
    'Completado': { icon: '✔️', color: '#43a047' },
    'completado': { icon: '✔️', color: '#43a047' },
    'pendiente': { icon: '🕒', color: '#fbc02d' },
    // Otros estados...
  };

  // Calcular total de pedidos
  const totalPedidos = pedidosPorEstado.reduce((acc, p) => acc + (p.cantidad || 0), 0);

  // Agrupar estados ignorando mayúsculas/minúsculas
  const groupedEstados = pedidosPorEstado.reduce((acc, curr) => {
    const key = curr.estado.trim().toLowerCase();
    if (!acc[key]) {
      acc[key] = { ...curr, estado: curr.estado.charAt(0).toUpperCase() + curr.estado.slice(1).toLowerCase(), cantidad: 0 };
    }
    acc[key].cantidad += curr.cantidad;
    return acc;
  }, {});
  const estadosUnicos = Object.values(groupedEstados);

  // Simulación de últimos pedidos por estado (en producción, consumir endpoint real)
  const ultimosPedidosPorEstado = {
    pendiente: [
      { numero: 'PED-001', cliente: 'Juan Pérez', fecha: '2024-06-01' },
      { numero: 'PED-002', cliente: 'Ana Gómez', fecha: '2024-06-02' },
      { numero: 'PED-003', cliente: 'Carlos Ruiz', fecha: '2024-06-03' },
    ],
    enviado: [
      { numero: 'PED-004', cliente: 'Luis Torres', fecha: '2024-06-01' },
      { numero: 'PED-005', cliente: 'Marta Díaz', fecha: '2024-06-02' },
    ],
    entregado: [
      { numero: 'PED-006', cliente: 'Pedro López', fecha: '2024-06-01' },
    ],
    // ...otros estados
  };

  if (loading) {
    return (
      <Layout title="Dashboard" subtitle="Cargando datos...">
        <div className="dashboard-container">
          <div className="loading-spinner">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Cargando dashboard...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Dashboard" subtitle="Error">
        <div className="dashboard-container">
          <div className="error-message">
            <i className="fas fa-exclamation-triangle"></i>
            <p>{error}</p>
            <button onClick={fetchDashboardData}>Reintentar</button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Dashboard" subtitle="Métricas y Reportes del Sistema">
      <div className="dashboard-container">
        <IndicadoresWidget />
        {/* Filtro de fechas */}
        <div className="filter-section">
          <h2>Filtrar por Fechas</h2>
          <div className="filter-grid">
            <div>
              <label htmlFor="fecha-inicio">Fecha Inicio:</label>
              <input
                type="date"
                id="fecha-inicio"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="fecha-fin">Fecha Fin:</label>
              <input
                type="date"
                id="fecha-fin"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
              />
            </div>
            <div className="filter-button">
              <button onClick={handleFiltrar}>Filtrar</button>
            </div>
          </div>
        </div>

        {/* Tarjetas de estadísticas mejoradas */}
        <div className="stats-grid enhanced">
          <div className="stat-card blue kpi-card">
            <div className="stat-icon kpi-icon">
              <i className="fas fa-dollar-sign"></i>
            </div>
            <div className="stat-content">
              <p className="stat-number kpi-number">{dashboardData?.ventasMes || 0}</p>
              <p className="kpi-label">Ventas del Mes</p>
            </div>
          </div>
          <div className="stat-card green kpi-card">
            <div className="stat-icon kpi-icon">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <div className="stat-content">
              <p className="stat-number kpi-number">{dashboardData?.pedidosPendientes || 0}</p>
              <p className="kpi-label">Pedidos Pendientes</p>
            </div>
          </div>
          <div className="stat-card yellow kpi-card">
            <div className="stat-icon kpi-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <div className="stat-content">
              <p className="stat-number kpi-number">{alertasStock.length}</p>
              <p className="kpi-label">Alertas de Stock</p>
            </div>
          </div>
          <div className="stat-card red kpi-card">
            <div className="stat-icon kpi-icon">
              <i className="fas fa-user-plus"></i>
            </div>
            <div className="stat-content">
              <p className="stat-number kpi-number">{dashboardData?.clientesNuevos || 0}</p>
              <p className="kpi-label">Clientes Nuevos</p>
            </div>
          </div>
        </div>
        {/* Separador visual */}
        <hr className="dashboard-separator" />

        {/* Alertas de Stock Bajo */}
        {alertasStock.length > 0 && (
          <div className="alert-section">
            <h2><i className="fas fa-exclamation-triangle"></i> Alertas de Stock Bajo</h2>
            <div className="alert-grid">
              {alertasStock.map((producto, index) => (
                <div key={index} className="alert-card">
                  <div className="alert-header">
                    <h3>{producto.nombre}</h3>
                    <span className="stock-badge critical">Stock Crítico</span>
                  </div>
                  <div className="alert-content">
                    <p><strong>Stock Actual:</strong> {producto.stockActual} unidades</p>
                    <p><strong>Stock Mínimo:</strong> {producto.stockMinimo} unidades</p>
                    <p><strong>Proveedor:</strong> {producto.proveedor || 'No especificado'}</p>
                  </div>
                  <div className="alert-actions">
                    <button className="btn-primary" onClick={() => navigate('/inventario')}>
                      <i className="fas fa-plus"></i> Reponer Stock
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tablas de información mejoradas */}
        <div className="tables-grid enhanced">
          <div className="table-card">
            <h2>Productos Más Vendidos</h2>
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Cantidad Vendida</th>
                  <th>Ingreso Total</th>
                </tr>
              </thead>
              <tbody>
                {productosMasVendidos.length > 0 ? (
                  productosMasVendidos.map((producto, index) => (
                    <tr key={index}>
                      <td>{producto.nombre}</td>
                      <td>${producto.precio?.toFixed(2) || '0.00'}</td>
                      <td>{producto.cantidadVendida}</td>
                      <td>${producto.ingreso?.toFixed(2) || '0.00'}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="4">No hay datos de productos vendidos.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="table-card enhanced">
            <h2>Pedidos por Estado</h2>
            <table className="pedidos-estado-table">
              <thead>
                <tr>
                  <th>Estado</th>
                  <th>Cantidad</th>
                  <th>% del total</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {estadosUnicos.length > 0 ? (
                  estadosUnicos.map((pedido, index) => {
                    const config = estadoConfig[pedido.estado] || { icon: '📦', color: '#bdbdbd' };
                    const porcentaje = totalPedidos > 0 ? ((pedido.cantidad / totalPedidos) * 100).toFixed(1) : 0;
                    const key = pedido.estado.trim().toLowerCase();
                    const ultimos = ultimosPedidosPorEstado[key] || [];
                    return (
                      <tr key={index} data-tip data-for={`tooltip-${key}`} style={{ cursor: ultimos.length ? 'pointer' : 'default' }}>
                        <td style={{ color: config.color, fontWeight: 600 }}>
                          <span style={{ fontSize: '1.3rem', marginRight: 8 }}>{config.icon}</span>
                          {pedido.estado}
                        </td>
                        <td style={{ fontWeight: 600 }}>{pedido.cantidad}</td>
                        <td>
                          <div className="progress-bar-bg">
                            <div className="progress-bar-fill" style={{ width: `${porcentaje}%`, background: config.color }}></div>
                          </div>
                          <span style={{ fontSize: '0.95rem', color: '#555' }}>{porcentaje}%</span>
                        </td>
                        <td>
                          <button className="btn-filter" onClick={() => navigate(`/pedidos?estado=${encodeURIComponent(pedido.estado)}`)}>
                            Ver pedidos
                          </button>
                        </td>
                        <td></td>
                        {ultimos.length > 0 && (
                          <ReactTooltip id={`tooltip-${key}`} effect="solid" place="top">
                            <div style={{ minWidth: 180 }}>
                              <strong>Últimos pedidos:</strong>
                              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                                {ultimos.slice(0, 3).map((p, i) => (
                                  <li key={i} style={{ fontSize: '0.97rem', margin: '0.2rem 0' }}>
                                    <span style={{ fontWeight: 600 }}>{p.numero}</span> - {p.cliente} <br /> <span style={{ color: '#888' }}>{p.fecha}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </ReactTooltip>
                        )}
                      </tr>
                    );
                  })
                ) : (
                  <tr><td colSpan="5">No hay datos de pedidos por estado.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tabla de ingresos por mes */}
        <div className="table-card full-width">
          <h2>Ingresos por Mes</h2>
          <table>
            <thead>
              <tr>
                <th>Mes</th>
                <th>Ingreso Total</th>
                <th>Número de Pedidos</th>
                <th>Promedio por Pedido</th>
              </tr>
            </thead>
            <tbody>
              {ingresosPorMes.length > 0 ? (
                ingresosPorMes.map((ingreso, index) => (
                  <tr key={index}>
                    <td>{ingreso.mes}</td>
                    <td>${ingreso.ingreso?.toFixed(2) || '0.00'}</td>
                    <td>{ingreso.numeroPedidos || 0}</td>
                    <td>${((ingreso.ingreso || 0) / (ingreso.numeroPedidos || 1)).toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4">No hay datos de ingresos por mes.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Gráficos mejorados y organizados */}
        <div className="charts-grid enhanced">
          <div className="chart-card">
            <h2>Ingresos por Mes</h2>
            {ingresosPorMes && ingresosPorMes.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={ingresosPorMes} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <XAxis dataKey="mes" stroke="#1976d2"/>
                  <YAxis stroke="#1976d2"/>
                  <Tooltip formatter={(value) => [`$${value?.toFixed(2) || '0.00'}`, 'Ingreso']} />
                  <Legend />
                  <Line type="monotone" dataKey="ingreso" stroke="#1976d2" name="Ingreso Total" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="no-data">No hay datos de ingresos para mostrar</div>
            )}
          </div>
          <div className="chart-card">
            <h2>Pedidos por Estado</h2>
            {pedidosPorEstado && pedidosPorEstado.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie 
                    data={pedidosPorEstado} 
                    dataKey="cantidad" 
                    nameKey="estado" 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={100} 
                    label={({estado, cantidad}) => `${estado}: ${cantidad}`}
                  >
                    {pedidosPorEstado.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [value, name]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="no-data">No hay datos de pedidos por estado para mostrar</div>
            )}
          </div>
          <div className="chart-card">
            <h2>Productos Más Vendidos</h2>
            {productosMasVendidos && productosMasVendidos.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={productosMasVendidos} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <XAxis dataKey="nombre" stroke="#1976d2" angle={-45} textAnchor="end" height={80}/>
                  <YAxis stroke="#1976d2"/>
                  <Tooltip formatter={(value, name) => [value, 'Cantidad Vendida']} />
                  <Bar dataKey="cantidadVendida" fill="#1976d2" name="Cantidad Vendida" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="no-data">No hay datos de productos vendidos para mostrar</div>
            )}
          </div>
          <div className="chart-card">
            <h2>Clientes Nuevos por Mes</h2>
            {clientesNuevosPorMes && clientesNuevosPorMes.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={clientesNuevosPorMes} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <XAxis dataKey="mes" stroke="#1976d2"/>
                  <YAxis stroke="#1976d2"/>
                  <Tooltip formatter={(value, name) => [value, 'Clientes Nuevos']} />
                  <Legend />
                  <Line type="monotone" dataKey="cantidad" stroke="#10b981" name="Clientes Nuevos" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="no-data">No hay datos de clientes nuevos para mostrar</div>
            )}
          </div>
        </div>
        {/* Separador visual */}
        <hr className="dashboard-separator" />
      </div>
    </Layout>
  );
};

export default DashboardPage;