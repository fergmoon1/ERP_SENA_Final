import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import '../styles/DashboardPage.css';

const DashboardPage = () => {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
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

  // Datos de ejemplo - estos vendrían del backend
  const dashboardData = {
    ventasMes: 0.0,
    pedidosPendientes: 1,
    alertasStock: 1,
    clientesNuevos: 2,
    productosMasVendidos: [
      { nombre: 'Producto A', precio: 10.00, cantidad: 1, ingreso: 10.00 }
    ],
    pedidosPorEstado: [
      { estado: 'Pendiente', cantidad: 1, color: 'yellow' },
      { estado: 'Completado', cantidad: 0, color: 'green' },
      { estado: 'Cancelado', cantidad: 0, color: 'red' }
    ],
    ingresosPorMes: [
      { mes: 'April 2025', ingreso: 0.00 }
    ]
  };

  const handleFiltrar = () => {
    // Aquí se implementaría la lógica de filtrado
    console.log('Filtrando desde:', fechaInicio, 'hasta:', fechaFin);
  };

  return (
    <Layout>
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
              <p className="stat-number">{dashboardData.ventasMes}</p>
              <p>Ventas del Mes</p>
            </div>
          </div>
          
          <div className="stat-card green">
            <div className="stat-icon">
              <i className="fas fa-chart-line"></i>
            </div>
            <div className="stat-content">
              <p className="stat-number">{dashboardData.pedidosPendientes}</p>
              <p>Pedidos Pendientes</p>
            </div>
          </div>
          
          <div className="stat-card yellow">
            <div className="stat-icon">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <div className="stat-content">
              <p className="stat-number">{dashboardData.alertasStock}</p>
              <p>Alertas de Stock</p>
            </div>
          </div>
          
          <div className="stat-card red">
            <div className="stat-icon">
              <i className="fas fa-user-plus"></i>
            </div>
            <div className="stat-content">
              <p className="stat-number">{dashboardData.clientesNuevos}</p>
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
                {dashboardData.productosMasVendidos.map((producto, index) => (
                  <tr key={index}>
                    <td>{producto.nombre}</td>
                    <td>${producto.precio.toFixed(2)}</td>
                    <td>{producto.cantidad}</td>
                    <td>${producto.ingreso.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="table-card">
            <h2>Pedidos por Estado</h2>
            <ul className="status-list">
              {dashboardData.pedidosPorEstado.map((pedido, index) => (
                <li key={index} className="status-item">
                  <span>{pedido.estado}</span>
                  <span className={`status-badge ${pedido.color}`}>
                    {pedido.cantidad}
                  </span>
                </li>
              ))}
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
              {dashboardData.ingresosPorMes.map((ingreso, index) => (
                <tr key={index}>
                  <td>{ingreso.mes}</td>
                  <td>${ingreso.ingreso.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Gráficos */}
        <div className="charts-grid">
          <div className="chart-card">
            <h2>Gráfico de Ingresos por Mes</h2>
            <img 
              src="https://storage.googleapis.com/a1aa/image/B5ftJ8BWW2DTq91CbNUBxsLfhMmNtbLf386g2LVRDIw.jpg" 
              alt="Gráfico de Ingresos por Mes"
              className="chart-image"
            />
          </div>
          
          <div className="chart-card">
            <h2>Gráfico de Pedidos por Estado</h2>
            <img 
              src="https://storage.googleapis.com/a1aa/image/SDcnQFYEhXbZc8YZAS0yfXTw16wYEQQPz-IoqH3yjpw.jpg" 
              alt="Gráfico de Pedidos por Estado"
              className="chart-image"
            />
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <h2>Gráfico de Productos Más Vendidos</h2>
            <img 
              src="https://storage.googleapis.com/a1aa/image/M1SAJ3z6g4bOWaYynQvld6D-BYurq1CMj-9kHl-qBok.jpg" 
              alt="Gráfico de Productos Más Vendidos"
              className="chart-image"
            />
          </div>
          
          <div className="chart-card">
            <h2>Gráfico de Clientes Nuevos por Mes</h2>
            <img 
              src="https://storage.googleapis.com/a1aa/image/yFNjrcFBfZd7iwiW04fL5w5Zx3wxsiR5WlUTt9nbV9s.jpg" 
              alt="Gráfico de Clientes Nuevos por Mes"
              className="chart-image"
            />
          </div>
        </div>

        <div className="chart-card full-width">
          <h2>Gráfico de Alerta de Stock por Producto</h2>
          <img 
            src="https://storage.googleapis.com/a1aa/image/R6p-dHT0sxoyBcjz_MxZFeBlXQXDIvNCUJycTrwJC7k.jpg" 
            alt="Gráfico de Alerta de Stock por Producto"
            className="chart-image"
          />
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;