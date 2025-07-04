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

  useEffect(() => {
    // Dashboard general
    fetch('/api/reportes/dashboard', {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt') }
    })
      .then(async res => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('jwt');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login?logout=true';
          return;
        }
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then(data => setDashboardData(data))
      .catch(err => alert('Error al obtener datos del dashboard: ' + err.message));
    // Productos más vendidos
    fetch('/api/reportes/ventas/productos-mas-vendidos', {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt') }
    })
      .then(async res => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('jwt');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login?logout=true';
          return;
        }
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then(data => setProductosMasVendidos(data))
      .catch(err => alert('Error al obtener productos más vendidos: ' + err.message));
    // Ingresos por mes
    fetch('/api/reportes/ingresos-por-mes', {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt') }
    })
      .then(async res => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('jwt');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login?logout=true';
          return;
        }
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then(data => setIngresosPorMes(data || []))
      .catch(err => alert('Error al obtener ingresos por mes: ' + err.message));
    // Pedidos por estado
    fetch('/api/reportes/dashboard', {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt') }
    })
      .then(async res => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('jwt');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login?logout=true';
          return;
        }
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then(data => setPedidosPorEstado(data.pedidosPorEstado || []))
      .catch(err => alert('Error al obtener pedidos por estado: ' + err.message));
    // Clientes nuevos por mes
    fetch('/api/reportes/clientes-nuevos-por-mes', {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt') }
    })
      .then(async res => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('jwt');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login?logout=true';
          return;
        }
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then(data => setClientesNuevosPorMes(data || []))
      .catch(err => alert('Error al obtener clientes nuevos por mes: ' + err.message));
    // Alertas de stock bajo
    fetch('/api/reportes/inventario/stock-bajo', {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt') }
    })
      .then(async res => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('jwt');
          localStorage.removeItem('refreshToken');
          window.location.href = '/login?logout=true';
          return;
        }
        if (!res.ok) throw new Error(await res.text());
        return res.json();
      })
      .then(data => setAlertasStock(data))
      .catch(err => alert('Error al obtener alertas de stock: ' + err.message));
  }, []);

  useEffect(() => {
    console.log('Estado alertasStock:', alertasStock);
  }, [alertasStock]);

  const handleFiltrar = () => {
    // Aquí se implementaría la lógica de filtrado
    console.log('Filtrando desde:', fechaInicio, 'hasta:', fechaFin);
  };

  // Colores para PieChart
  const pieColors = ['#1976d2', '#10b981', '#fbc02d', '#e53935', '#ff9800', '#8e24aa'];

  return (
    <Layout title="Dashboard" subtitle="Actualizaciones y Pagos">
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
              <p className="stat-number">{dashboardData?.ventasMes}</p>
              <p>Ventas del Mes</p>
            </div>
          </div>
          
          <div className="stat-card green">
            <div className="stat-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="stat-content">
              <p className="stat-number">{dashboardData?.pedidosPendientes}</p>
              <p>Pedidos Pendientes</p>
            </div>
          </div>
          
          <div className="stat-card yellow">
            <div className="stat-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <div className="stat-content">
              <p className="stat-number">{dashboardData?.alertasStock}</p>
              <p>Alertas de Stock</p>
            </div>
          </div>
          
          <div className="stat-card red">
            <div className="stat-icon">
              <i className="fas fa-user-plus"></i>
            </div>
            <div className="stat-content">
              <p className="stat-number">{dashboardData?.clientesNuevos}</p>
              <p>Clientes Nuevos</p>
            </div>
          </div>
        </div>

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
                {productosMasVendidos.map((producto, index) => (
                  <tr key={index}>
                    <td>{producto.nombre}</td>
                    <td>${producto.precio.toFixed(2)}</td>
                    <td>{producto.cantidadVendida}</td>
                    <td>${producto.ingreso.toFixed(2)}</td>
                  </tr>
                ))}
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
                    <span className={`status-badge ${pedido.color}`}>
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
              </tr>
            </thead>
            <tbody>
              {(ingresosPorMes.length > 0 ? (
                ingresosPorMes.map((ingreso, index) => (
                  <tr key={index}>
                    <td>{ingreso.mes}</td>
                    <td>${ingreso.ingreso.toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="2">No hay datos de ingresos por mes.</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Gráficos */}
        <div className="charts-grid">
          <div className="chart-card">
            <h2>Gráfico de Ingresos por Mes</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={ingresosPorMes} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <XAxis dataKey="mes" stroke="#1976d2"/>
                <YAxis stroke="#1976d2"/>
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ingreso" stroke="#1976d2" name="Ingreso Total" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="chart-card">
            <h2>Gráfico de Pedidos por Estado</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pedidosPorEstado || []} dataKey="cantidad" nameKey="estado" cx="50%" cy="50%" outerRadius={100} label>
                  {(pedidosPorEstado || []).map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card">
          <h2>Gráfico de Productos Más Vendidos</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productosMasVendidos} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="nombre" stroke="#1976d2"/>
              <YAxis stroke="#1976d2"/>
              <Tooltip />
              <Bar dataKey="cantidadVendida" fill="#1976d2" name="Cantidad Vendida" />
            </BarChart>
          </ResponsiveContainer>
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
              <div>No hay datos de clientes nuevos por mes.</div>
            )}
          </div>
        </div>

        <div className="chart-card full-width">
          <h2>Gráfico de Alerta de Stock por Producto</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={alertasStock} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <XAxis dataKey="nombre" stroke="#e53935"/>
              <YAxis stroke="#e53935"/>
              <Tooltip />
              <Bar dataKey="stockActual" fill="#e53935" name="Stock Bajo" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;