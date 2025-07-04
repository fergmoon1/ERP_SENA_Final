import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import '../styles/DashboardPage.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts';

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
    console.log('DashboardPage - Token en localStorage:', !!token);
    
    if (!token) {
      console.log('DashboardPage - No hay token, redirigiendo a login');
      navigate('/login');
    }
  }, [navigate]);

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
      }

      // Productos más vendidos
      const productosRes = await fetch('http://localhost:8081/api/reportes/ventas/productos-mas-vendidos', { headers });
      if (productosRes.ok) {
        const data = await productosRes.json();
        setProductosMasVendidos(data || []);
      }

      // Ingresos por mes
      const ingresosRes = await fetch('http://localhost:8081/api/reportes/ingresos-por-mes', { headers });
      if (ingresosRes.ok) {
        const data = await ingresosRes.json();
        setIngresosPorMes(data || []);
      }

      // Pedidos por estado
      const pedidosRes = await fetch('http://localhost:8081/api/reportes/pedidos-por-estado', { headers });
      if (pedidosRes.ok) {
        const data = await pedidosRes.json();
        setPedidosPorEstado(data || []);
      }

      // Clientes nuevos por mes
      const clientesRes = await fetch('http://localhost:8081/api/reportes/clientes-nuevos-por-mes', { headers });
      if (clientesRes.ok) {
        const data = await clientesRes.json();
        setClientesNuevosPorMes(data || []);
      }

      // Alertas de stock bajo
      const stockRes = await fetch('http://localhost:8081/api/reportes/inventario/stock-bajo', { headers });
      if (stockRes.ok) {
        const data = await stockRes.json();
        setAlertasStock(data || []);
      }

    } catch (err) {
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

        {/* Tarjetas de estadísticas */}
        <div className="stats-grid">
          <div className="stat-card blue">
            <div className="stat-icon">
              <i className="fas fa-shopping-cart"></i>
            </div>
            <div className="stat-content">
              <p className="stat-number">{dashboardData?.ventasMes || 0}</p>
              <p>Ventas del Mes</p>
            </div>
          </div>
          
          <div className="stat-card green">
            <div className="stat-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="stat-content">
              <p className="stat-number">{dashboardData?.pedidosPendientes || 0}</p>
              <p>Pedidos Pendientes</p>
            </div>
          </div>
          
          <div className="stat-card yellow">
            <div className="stat-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <div className="stat-content">
              <p className="stat-number">{alertasStock.length}</p>
              <p>Alertas de Stock</p>
            </div>
          </div>
          
          <div className="stat-card red">
            <div className="stat-icon">
              <i className="fas fa-user-plus"></i>
            </div>
            <div className="stat-content">
              <p className="stat-number">{dashboardData?.clientesNuevos || 0}</p>
              <p>Clientes Nuevos</p>
            </div>
          </div>
        </div>

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

        {/* Tablas de información */}
        <div className="tables-grid">
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
          
          <div className="table-card">
            <h2>Pedidos por Estado</h2>
            <ul className="status-list">
              {pedidosPorEstado.length > 0 ? (
                pedidosPorEstado.map((pedido, index) => (
                  <li key={index} className="status-item">
                    <span>{pedido.estado}</span>
                    <span className={`status-badge ${pedido.color || 'default'}`}>
                      {pedido.cantidad}
                    </span>
                  </li>
                ))
              ) : (
                <li>No hay datos de pedidos por estado.</li>
              )}
            </ul>
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

        {/* Gráficos */}
        <div className="charts-grid">
          <div className="chart-card">
            <h2>Gráfico de Ingresos por Mes</h2>
            {ingresosPorMes.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={ingresosPorMes} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <XAxis dataKey="mes" stroke="#1976d2"/>
                  <YAxis stroke="#1976d2"/>
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="ingreso" stroke="#1976d2" name="Ingreso Total" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="no-data">No hay datos para mostrar</div>
            )}
          </div>
          
          <div className="chart-card">
            <h2>Gráfico de Pedidos por Estado</h2>
            {pedidosPorEstado.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pedidosPorEstado} dataKey="cantidad" nameKey="estado" cx="50%" cy="50%" outerRadius={100} label>
                    {pedidosPorEstado.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="no-data">No hay datos para mostrar</div>
            )}
          </div>
        </div>

        <div className="chart-card">
          <h2>Gráfico de Productos Más Vendidos</h2>
          {productosMasVendidos.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productosMasVendidos} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="nombre" stroke="#1976d2"/>
                <YAxis stroke="#1976d2"/>
                <Tooltip />
                <Bar dataKey="cantidadVendida" fill="#1976d2" name="Cantidad Vendida" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="no-data">No hay datos para mostrar</div>
          )}
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <h2>Gráfico de Clientes Nuevos por Mes</h2>
            {clientesNuevosPorMes.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={clientesNuevosPorMes} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <XAxis dataKey="mes" stroke="#1976d2"/>
                  <YAxis stroke="#1976d2"/>
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="cantidad" stroke="#1976d2" name="Clientes Nuevos" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="no-data">No hay datos para mostrar</div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;