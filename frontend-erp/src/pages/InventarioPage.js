import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../styles/InventarioPage.css';
import ReactDOM from 'react-dom';

const API_URL = 'http://localhost:8081/api';

function InventarioPage() {
  const [productos, setProductos] = useState([]);
  const [movimientos, setMovimientos] = useState([]);
  const [form, setForm] = useState({ productoId: '', cantidad: '', tipo: 'ENTRADA', motivo: '' });
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
  const [notifications, setNotifications] = useState([]);
  const [stockThreshold, setStockThreshold] = useState(10);
  const [showStockModal, setShowStockModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const token = localStorage.getItem('jwt');
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

  useEffect(() => {
    fetchProductos();
    fetchMovimientos();
    fetchAlertaStock();
    checkStockAlerts();
  }, []);

  // Verificar alertas de stock cada 5 minutos
  useEffect(() => {
    const interval = setInterval(() => {
      checkStockAlerts();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const checkStockAlerts = async () => {
    try {
      const res = await axios.get(`${API_URL}/reportes/stock-bajo`, config);
      const criticalStock = res.data.filter(p => p.stockActual <= 5);
      
      if (criticalStock.length > 0) {
        addNotification({
          type: 'warning',
          title: 'Stock Crítico',
          message: `${criticalStock.length} producto(s) con stock crítico`,
          products: criticalStock
        });
      }
    } catch (err) {
      console.error('Error checking stock alerts:', err);
    }
  };

  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: Date.now(),
      timestamp: new Date()
    };
    setNotifications(prev => [newNotification, ...prev.slice(0, 4)]); // Mantener solo las últimas 5
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

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
    if (!form.productoId || !form.cantidad || !form.motivo.trim()) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Todos los campos son obligatorios'
      });
      return;
    }

    try {
      if (editId) {
        await axios.put(`${API_URL}/movimientos-inventario/${editId}`, {
          productoId: form.productoId,
          cantidad: parseInt(form.cantidad, 10),
          tipo: form.tipo,
          motivo: form.motivo
        }, config);
        addNotification({
          type: 'success',
          title: 'Éxito',
          message: 'Movimiento actualizado correctamente'
        });
      } else {
        await axios.post(`${API_URL}/movimientos-inventario`, {
          producto: { id: form.productoId },
          cantidad: parseInt(form.cantidad, 10),
          tipo: form.tipo,
          motivo: form.motivo
        }, config);
        addNotification({
          type: 'success',
          title: 'Éxito',
          message: 'Movimiento registrado correctamente'
        });
      }
      
      setForm({ productoId: '', cantidad: '', tipo: 'ENTRADA', motivo: '' });
      setEditId(null);
      fetchMovimientos();
      fetchProductos();
      fetchAlertaStock();
    } catch (err) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Error al guardar el movimiento: ' + (err.response?.data || err.message)
      });
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
      addNotification({
        type: 'success',
        title: 'Éxito',
        message: 'Movimiento actualizado correctamente'
      });
      setTimeout(() => {
        setShowEditModal(false);
        fetchMovimientos();
      }, 1000);
    } catch (err) {
      setEditFeedback('Error al actualizar el movimiento.');
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Error al actualizar el movimiento'
      });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que desea eliminar este movimiento?')) return;
    try {
      await axios.delete(`${API_URL}/movimientos-inventario/${id}`, config);
      setDeleteFeedback('¡Eliminado correctamente!');
      addNotification({
        type: 'success',
        title: 'Éxito',
        message: 'Movimiento eliminado correctamente'
      });
      fetchMovimientos();
      fetchProductos();
      fetchAlertaStock();
      setTimeout(() => setDeleteFeedback(''), 2000);
    } catch (err) {
      setDeleteFeedback('Error al eliminar el movimiento.');
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Error al eliminar el movimiento'
      });
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
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Error al obtener historial'
      });
    }
  };

  const handleQuickRestock = (producto) => {
    setSelectedProduct(producto);
    setShowStockModal(true);
  };

  const handleRestockSubmit = async (e) => {
    e.preventDefault();
    const cantidad = parseInt(e.target.cantidad.value, 10);
    const motivo = e.target.motivo.value;

    if (!cantidad || cantidad <= 0 || !motivo.trim()) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Cantidad y motivo son obligatorios'
      });
      return;
    }

    try {
      await axios.post(`${API_URL}/movimientos-inventario`, {
        producto: { id: selectedProduct.id },
        cantidad: cantidad,
        tipo: 'ENTRADA',
        motivo: `Reposición rápida: ${motivo}`
      }, config);

      addNotification({
        type: 'success',
        title: 'Éxito',
        message: `Stock repuesto para ${selectedProduct.nombre}`
      });

      setShowStockModal(false);
      setSelectedProduct(null);
      fetchMovimientos();
      fetchProductos();
      fetchAlertaStock();
    } catch (err) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Error al reponer stock'
      });
    }
  };

  return (
    <div className="inventario-area-container">
      {/* Notificaciones */}
      <div className="notifications-container">
        {notifications.map(notification => (
          <div key={notification.id} className={`notification ${notification.type}`}>
            <div className="notification-header">
              <span className="notification-title">{notification.title}</span>
              <button 
                className="notification-close"
                onClick={() => removeNotification(notification.id)}
              >
                ×
              </button>
            </div>
            <div className="notification-message">{notification.message}</div>
            {notification.products && (
              <div className="notification-products">
                {notification.products.map(product => (
                  <span key={product.id} className="product-tag">
                    {product.nombre} ({product.stockActual})
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="inventario-header-area">
        <h1 className="inventario-title">Gestión de Inventario</h1>
        <div className="inventario-actions">
          <button 
            className="btn-refresh"
            onClick={() => {
              fetchProductos();
              fetchMovimientos();
              fetchAlertaStock();
              addNotification({
                type: 'info',
                title: 'Actualizado',
                message: 'Datos de inventario actualizados'
              });
            }}
          >
            <i className="fas fa-sync-alt"></i> Actualizar
          </button>
        </div>
      </div>

      {/* Alertas de Stock Mejoradas */}
      <div className="inventario-alert-area">
        <h2 className="inventario-alert-title">
          <i className="fas fa-exclamation-triangle"></i>
          Alertas de Stock
        </h2>
        {alertaStock.length === 0 ? (
          <div className="alert-success">
            <i className="fas fa-check-circle"></i>
            <p>No hay productos con stock bajo. El inventario está en buen estado.</p>
          </div>
        ) : (
          <div className="alert-warning">
            <p><strong>{alertaStock.length}</strong> producto(s) con stock bajo:</p>
            <div className="stock-alerts-grid">
              {alertaStock.map((prod) => (
                <div key={prod.id} className="stock-alert-card">
                  <div className="stock-alert-header">
                    <h3>{prod.nombre}</h3>
                    <span className={`stock-badge ${prod.stockActual <= 5 ? 'critical' : 'warning'}`}>
                      {prod.stockActual <= 5 ? 'Crítico' : 'Bajo'}
                    </span>
                  </div>
                  <div className="stock-alert-content">
                    <p><strong>Stock Actual:</strong> {prod.stockActual} unidades</p>
                    <p><strong>Stock Mínimo:</strong> {prod.stockMinimo || 10} unidades</p>
                    <p><strong>Proveedor:</strong> {prod.proveedor?.nombre || 'No especificado'}</p>
                  </div>
                  <div className="stock-alert-actions">
                    <button 
                      className="btn-restock"
                      onClick={() => handleQuickRestock(prod)}
                    >
                      <i className="fas fa-plus"></i> Reponer
                    </button>
                    <button 
                      className="btn-history"
                      onClick={(e) => handleShowHistorial(prod, e)}
                    >
                      <i className="fas fa-history"></i> Historial
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Formulario de Movimientos */}
      <div className="inventario-form-card">
        <h2 className="inventario-form-title">
          <i className="fas fa-plus-circle"></i>
          Registrar Movimiento de Inventario
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="producto" className="form-label">Producto *</label>
              <select
                id="producto"
                name="productoId"
                value={form.productoId}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Seleccionar producto</option>
                {productos.map(producto => (
                  <option key={producto.id} value={producto.id}>
                    {producto.nombre} (Stock: {producto.stockActual})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="tipo" className="form-label">Tipo de Movimiento *</label>
              <select
                id="tipo"
                name="tipo"
                value={form.tipo}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="ENTRADA">Entrada</option>
                <option value="SALIDA">Salida</option>
                <option value="AJUSTE">Ajuste</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="cantidad" className="form-label">Cantidad *</label>
              <input
                type="number"
                id="cantidad"
                name="cantidad"
                value={form.cantidad}
                onChange={handleChange}
                className="form-input"
                min="1"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="motivo" className="form-label">Motivo *</label>
            <textarea
              id="motivo"
              name="motivo"
              value={form.motivo}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Describa el motivo del movimiento..."
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              <i className="fas fa-save"></i>
              {editId ? 'Actualizar Movimiento' : 'Registrar Movimiento'}
            </button>
            {editId && (
              <button 
                type="button" 
                className="btn-secondary"
                onClick={() => {
                  setEditId(null);
                  setForm({ productoId: '', cantidad: '', tipo: 'ENTRADA', motivo: '' });
                }}
              >
                <i className="fas fa-times"></i> Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Resto del código existente... */}
      
      {/* Modal de Reposición Rápida */}
      {showStockModal && selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Reponer Stock - {selectedProduct.nombre}</h3>
              <button 
                className="modal-close"
                onClick={() => setShowStockModal(false)}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleRestockSubmit}>
              <div className="form-group">
                <label>Cantidad a agregar:</label>
                <input 
                  type="number" 
                  name="cantidad" 
                  min="1" 
                  required 
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Motivo:</label>
                <textarea 
                  name="motivo" 
                  required 
                  className="form-textarea"
                  placeholder="Motivo de la reposición..."
                />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn-primary">
                  <i className="fas fa-plus"></i> Reponer
                </button>
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setShowStockModal(false)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Resto del código existente para modales y tablas... */}
    </div>
  );
}

export default InventarioPage; 