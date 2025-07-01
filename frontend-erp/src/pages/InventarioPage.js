import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/InventarioPage.css';

const API_URL = 'http://localhost:8081/api';

function InventarioPage() {
  const [productos, setProductos] = useState([]);
  const [movimientos, setMovimientos] = useState([]);
  const [form, setForm] = useState({ productoId: '', cantidad: '' });
  const [editId, setEditId] = useState(null);
  const [alertaStock, setAlertaStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [historial, setHistorial] = useState([]);
  const [historialProducto, setHistorialProducto] = useState(null);

  useEffect(() => {
    fetchProductos();
    fetchMovimientos();
    fetchAlertaStock();
  }, []);

  // Depuración: mostrar movimientos en consola
  console.log('Movimientos:', movimientos);

  const fetchProductos = async () => {
    try {
      const res = await axios.get(`${API_URL}/productos`);
      setProductos(res.data);
    } catch (err) {
      setProductos([]);
    }
  };

  const fetchMovimientos = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/movimientos-inventario`);
      setMovimientos(res.data);
    } catch (err) {
      setMovimientos([]);
    }
    setLoading(false);
  };

  const fetchAlertaStock = async () => {
    try {
      const res = await axios.get(`${API_URL}/reportes/stock-bajo`);
      setAlertaStock(res.data);
    } catch (err) {
      setAlertaStock([]);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.productoId || !form.cantidad) return;
    try {
      if (editId) {
        // Edición (no implementado en backend por defecto)
        // await axios.put(`${API_URL}/movimientos-inventario/${editId}`, {...});
      } else {
        await axios.post(`${API_URL}/movimientos-inventario`, {
          producto: { id: form.productoId },
          cantidad: parseInt(form.cantidad, 10),
          tipo: 'AJUSTE',
        });
      }
      setForm({ productoId: '', cantidad: '' });
      setEditId(null);
      fetchMovimientos();
      fetchProductos();
      fetchAlertaStock();
    } catch (err) {
      alert('Error al guardar el movimiento');
    }
  };

  const handleEdit = (mov) => {
    setForm({ productoId: mov.producto.id, cantidad: mov.cantidad });
    setEditId(mov.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que desea eliminar este movimiento?')) return;
    try {
      await axios.delete(`${API_URL}/movimientos-inventario/${id}`);
      fetchMovimientos();
      fetchProductos();
      fetchAlertaStock();
    } catch (err) {
      alert('Error al eliminar');
    }
  };

  const handleShowHistorial = async (producto) => {
    try {
      const res = await axios.get(`${API_URL}/movimientos-inventario/producto/${producto.id}/historial`);
      setHistorial(res.data);
      setHistorialProducto(producto);
      setShowModal(true);
    } catch (err) {
      alert('Error al obtener historial');
    }
  };

  return (
    <div className="inventario-area-container">
      <div className="inventario-header-area">
        <h1 className="inventario-title">Inventario</h1>
        {/* <span className="inventario-breadcrumb">Home / Inventario</span> */}
      </div>

      <div className="inventario-alert-area">
        <h2 className="inventario-alert-title">Alerta de Stock Bajo</h2>
        {alertaStock.length === 0 ? (
          <p>No hay productos con stock bajo.</p>
        ) : (
          <>
            <p>Los siguientes productos tienen un stock por debajo del umbral mínimo (10 unidades):</p>
            <ul>
              {alertaStock.map((prod) => (
                <li key={prod.id}>{prod.nombre} (Stock actual: {prod.stockActual})</li>
              ))}
            </ul>
            <p>Por favor, actualice el inventario para evitar problemas de disponibilidad.</p>
          </>
        )}
      </div>

      <div className="inventario-form-card">
        <h2 className="inventario-form-title">Agregar/Editar Registro de Inventario</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="producto" className="form-label">Producto</label>
            <select
              id="producto"
              name="productoId"
              className="form-select"
              value={form.productoId}
              onChange={handleChange}
            >
              <option value="">Seleccione un producto</option>
              {productos.map((prod) => (
                <option key={prod.id} value={prod.id}>
                  {prod.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="cantidad" className="form-label">Cantidad</label>
            <input
              type="number"
              id="cantidad"
              name="cantidad"
              className="form-input"
              placeholder="Ingrese la cantidad"
              value={form.cantidad}
              onChange={handleChange}
            />
          </div>
          <div className="form-buttons-area">
            <button type="submit" className="btn-guardar">Guardar</button>
            <button type="reset" className="btn-limpiar" onClick={() => { setForm({ productoId: '', cantidad: '' }); setEditId(null); }}>Limpiar</button>
          </div>
        </form>
      </div>

      <div className="inventario-table-card">
        <h2 className="inventario-table-title">Lista de Inventario</h2>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <table className="inventario-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Tipo</th>
                <th>Fecha de Actualización</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {movimientos.map((mov) => (
                <tr key={mov.id} className={mov.stockPosterior < 10 ? 'low-stock-row' : ''}>
                  <td>{mov.id}</td>
                  <td>{mov.producto?.nombre}</td>
                  <td>{mov.cantidad}</td>
                  <td>{mov.tipo}</td>
                  <td>{mov.fecha?.replace('T', ' ').substring(0, 19)}</td>
                  <td>
                    <button className="btn-editar" onClick={() => handleEdit(mov)}>Editar</button>
                    <button className="btn-eliminar" onClick={() => handleDelete(mov.id)}>Eliminar</button>
                    <button className="btn-historial" onClick={() => handleShowHistorial(mov.producto)}>Historial</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal de historial */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Historial de Movimientos - {historialProducto?.nombre}</h3>
            <button className="modal-close" onClick={() => setShowModal(false)}>Cerrar</button>
            <table className="historial-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tipo</th>
                  <th>Cantidad</th>
                  <th>Stock Anterior</th>
                  <th>Stock Posterior</th>
                  <th>Fecha</th>
                  <th>Motivo</th>
                  <th>Usuario</th>
                </tr>
              </thead>
              <tbody>
                {historial.map((h) => (
                  <tr key={h.id}>
                    <td>{h.id}</td>
                    <td>{h.tipo}</td>
                    <td>{h.cantidad}</td>
                    <td>{h.stockAnterior}</td>
                    <td>{h.stockPosterior}</td>
                    <td>{h.fecha?.replace('T', ' ').substring(0, 19)}</td>
                    <td>{h.motivo}</td>
                    <td>{h.usuario ? h.usuario.nombre : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default InventarioPage; 