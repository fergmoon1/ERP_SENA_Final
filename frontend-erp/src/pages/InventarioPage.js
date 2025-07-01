import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../styles/InventarioPage.css';
import ReactDOM from 'react-dom';

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
  const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0, useCenter: false });
  const popoverRef = useRef(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    id: '', productoId: '', cantidad: '', tipo: '', motivo: '', fecha: '', usuario: '', stockAnterior: '', stockPosterior: ''
  });
  const [editFeedback, setEditFeedback] = useState('');
  const [deleteFeedback, setDeleteFeedback] = useState('');

  const token = localStorage.getItem('jwt');
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

  useEffect(() => {
    fetchProductos();
    fetchMovimientos();
    fetchAlertaStock();
  }, []);

  // Depuración: mostrar movimientos en consola
  console.log('Movimientos:', movimientos);

  const fetchProductos = async () => {
    try {
      const res = await axios.get(`${API_URL}/productos`, config);
      setProductos(res.data);
    } catch (err) {
      setProductos([]);
    }
  };

  const fetchMovimientos = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/movimientos-inventario`, config);
      setMovimientos(res.data);
    } catch (err) {
      setMovimientos([]);
    }
    setLoading(false);
  };

  const fetchAlertaStock = async () => {
    try {
      const res = await axios.get(`${API_URL}/reportes/stock-bajo`, config);
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
        }, config);
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
    setEditForm({
      id: mov.id,
      productoId: mov.producto.id,
      cantidad: mov.cantidad,
      tipo: mov.tipo,
      motivo: mov.motivo,
      fecha: mov.fecha?.replace('T', ' ').substring(0, 19) || '',
      usuario: mov.usuario?.nombre || '-',
      stockAnterior: mov.stockAnterior,
      stockPosterior: mov.stockPosterior
    });
    setEditFeedback('');
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    // Validación básica
    if (!editForm.cantidad || isNaN(editForm.cantidad) || Number(editForm.cantidad) <= 0) {
      setEditFeedback('La cantidad debe ser mayor a 0.');
      return;
    }
    if (!editForm.motivo.trim()) {
      setEditFeedback('El motivo es obligatorio.');
      return;
    }
    try {
      await axios.put(`${API_URL}/movimientos-inventario/${editForm.id}`, {
        productoId: editForm.productoId,
        cantidad: editForm.cantidad,
        tipo: editForm.tipo,
        motivo: editForm.motivo
      }, config);
      setEditFeedback('¡Actualizado correctamente!');
      setTimeout(() => {
        setShowEditModal(false);
        fetchMovimientos();
      }, 1000);
    } catch (err) {
      setEditFeedback('Error al actualizar el movimiento.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que desea eliminar este movimiento?')) return;
    try {
      await axios.delete(`${API_URL}/movimientos-inventario/${id}`, config);
      setDeleteFeedback('¡Eliminado correctamente!');
      fetchMovimientos();
      fetchProductos();
      fetchAlertaStock();
      setTimeout(() => setDeleteFeedback(''), 2000);
    } catch (err) {
      setDeleteFeedback('Error al eliminar el movimiento.');
      setTimeout(() => setDeleteFeedback(''), 2000);
    }
  };

  const handleShowHistorial = async (producto, event) => {
    try {
      const res = await axios.get(`${API_URL}/movimientos-inventario/producto/${producto.id}/historial`, config);
      setHistorial(res.data);
      setHistorialProducto(producto);
      setShowModal(true);
    } catch (error) {
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
        {deleteFeedback && (
          <div style={{ margin: '8px 0', color: deleteFeedback.startsWith('¡') ? '#0f0' : '#ef4444', fontWeight: 600, fontSize: '1.1em' }}>{deleteFeedback}</div>
        )}
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
                  <td className="acciones">
                    <button className="btn-editar" onClick={() => handleEdit(mov)}>Editar</button>
                    <button className="btn-eliminar" onClick={() => handleDelete(mov.id)}>Eliminar</button>
                    <button className="btn-historial" onClick={(e) => handleShowHistorial(mov.producto, e)}>Historial</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {ReactDOM.createPortal(
        <div className={`css-modal-overlay${showModal ? ' open' : ''}`} onClick={() => setShowModal(false)}>
          <div
            className={`css-modal${showModal ? ' open' : ''}`}
            onClick={e => e.stopPropagation()}
          >
            <button className="css-modal-close" onClick={() => setShowModal(false)} title="Cerrar">
              <span aria-hidden="true">&times;</span>
            </button>
            <div className={`css-modal-content${showModal ? ' open' : ''}`}>
              <h2>Historial de Movimientos</h2>
              <p style={{marginBottom: '1rem', color: '#fff', fontSize: '1.05rem'}}>
                Producto: <strong>{historialProducto?.nombre}</strong>
              </p>
              <div className="css-modal-table-area">
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
                    {historial.map((mov) => (
                      <tr key={mov.id}>
                        <td>{mov.id}</td>
                        <td>{mov.tipo}</td>
                        <td>{mov.cantidad}</td>
                        <td>{mov.stockAnterior}</td>
                        <td>{mov.stockPosterior}</td>
                        <td>{mov.fecha?.replace('T', ' ').substring(0, 19)}</td>
                        <td>{mov.motivo}</td>
                        <td>{mov.usuario?.nombre || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {ReactDOM.createPortal(
        <div className={`css-modal-overlay${showEditModal ? ' open' : ''}`} onClick={() => setShowEditModal(false)}>
          <div
            className={`css-modal${showEditModal ? ' open' : ''}`}
            onClick={e => e.stopPropagation()}
          >
            <button className="css-modal-close" onClick={() => setShowEditModal(false)} title="Cerrar">
              <span aria-hidden="true">&times;</span>
            </button>
            <div className={`css-modal-content${showEditModal ? ' open' : ''}`}>
              <h2>Editar Movimiento</h2>
              <form onSubmit={handleEditSave} style={{ color: '#fff', textAlign: 'left', margin: '0 auto', maxWidth: 520 }}>
                <div style={{ marginBottom: 8 }}><b>ID:</b> {editForm.id}</div>
                <div style={{ marginBottom: 8 }}><b>Fecha:</b> {editForm.fecha}</div>
                <div style={{ marginBottom: 8 }}><b>Usuario:</b> {editForm.usuario}</div>
                <div style={{ marginBottom: 8 }}><b>Stock anterior:</b> {editForm.stockAnterior}</div>
                <div style={{ marginBottom: 8 }}><b>Stock posterior:</b> {editForm.stockPosterior}</div>
                <div style={{ marginBottom: 8 }}>
                  <label>Producto:</label>
                  <select name="productoId" value={editForm.productoId} onChange={handleEditChange} style={{ width: '100%', padding: 4 }}>
                    {productos.map(p => (
                      <option key={p.id} value={p.id}>{p.nombre}</option>
                    ))}
                  </select>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <label>Cantidad:</label>
                  <input name="cantidad" type="number" value={editForm.cantidad} onChange={handleEditChange} style={{ width: '100%', padding: 4 }} />
                </div>
                <div style={{ marginBottom: 8 }}>
                  <label>Tipo:</label>
                  <select name="tipo" value={editForm.tipo} onChange={handleEditChange} style={{ width: '100%', padding: 4 }}>
                    <option value="ENTRADA">ENTRADA</option>
                    <option value="SALIDA">SALIDA</option>
                  </select>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <label>Motivo:</label>
                  <input name="motivo" value={editForm.motivo} onChange={handleEditChange} style={{ width: '100%', padding: 4 }} />
                </div>
                {editFeedback && <div style={{ margin: '8px 0', color: editFeedback.startsWith('¡') ? '#0f0' : '#ffbaba' }}>{editFeedback}</div>}
                <button type="submit" style={{ background: '#fff', color: 'dodgerblue', fontWeight: 700, border: 'none', borderRadius: 6, padding: '8px 24px', cursor: 'pointer', marginTop: 8 }}>Guardar</button>
              </form>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

export default InventarioPage; 