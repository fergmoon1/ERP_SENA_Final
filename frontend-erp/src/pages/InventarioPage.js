import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../styles/InventarioPage.css';
import ReactDOM from 'react-dom';
import { Treemap, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList } from 'recharts';

const API_URL = 'http://localhost:8081/api';

function InventarioPage() {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);
  const [showRegistrarModal, setShowRegistrarModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [historialProducto, setHistorialProducto] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({
    id: '', productoId: '', cantidad: '', tipo: '', motivo: '', fecha: '', usuario: '', stockAnterior: '', stockPosterior: ''
  });
  const [form, setForm] = useState({
    productoId: '',
    cantidad: '',
    tipo: 'ENTRADA',
    motivo: ''
  });
  const [productos, setProductos] = useState([]);
  const [movimientos, setMovimientos] = useState([]);
  const [alertaStock, setAlertaStock] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [stockThreshold, setStockThreshold] = useState(10);
  const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0, useCenter: false });
  const popoverRef = useRef(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuccessPopover, setShowSuccessPopover] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [editFeedback, setEditFeedback] = useState('');
  const [deleteFeedback, setDeleteFeedback] = useState('');

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

  const addNotification = React.useCallback((notification) => {
    const newNotification = {
      ...notification,
      id: Date.now(),
      timestamp: new Date()
    };
    setNotifications(prev => [newNotification, ...prev.slice(0, 4)]); // Mantener solo las últimas 5
  }, []);

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const fetchProductos = React.useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/productos`, config);
      console.log('=== DEBUG PRODUCTOS ===');
      console.log('Productos recibidos del backend:', res.data);
      console.log('Primer producto:', res.data[0]);
      
      // Filtrar productos que tengan un id válido
      const productosValidos = res.data.filter(producto => 
        producto && producto.id && !isNaN(producto.id) && producto.id !== undefined && producto.id !== null
      );
      
      console.log('Productos válidos después del filtro:', productosValidos);
      console.log('Primer producto válido:', productosValidos[0]);
      
      if (productosValidos.length !== res.data.length) {
        console.warn(`Se filtraron ${res.data.length - productosValidos.length} productos sin ID válido`);
      }
      
      setProductos(productosValidos);
    } catch (err) {
      console.error('Error al obtener productos:', err);
      setProductos([]);
    }
  }, [config]);

  const fetchMovimientos = React.useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/movimientos-inventario`, config);
      setMovimientos(res.data);
    } catch (err) {
      setMovimientos([]);
    }
    setLoading(false);
  }, [config]);

  const fetchAlertaStock = React.useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/reportes/stock-bajo`, config);
      setAlertaStock(res.data);
    } catch (err) {
      setAlertaStock([]);
    }
  }, [config]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = React.useCallback(async (e) => {
    e.preventDefault();
    
    // Mostrar indicador de carga
    const submitButton = e.target.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
    submitButton.disabled = true;
    
    try {
      // Obtener los valores del formulario directamente del evento
      const formData = new FormData(e.target);
      const productoId = formData.get('productoId');
      const cantidad = parseInt(formData.get('cantidad'));
      const tipo = formData.get('tipo');
      const motivo = formData.get('motivo');
      
      // Validar que todos los campos estén presentes
      if (!productoId || !cantidad || !tipo || !motivo) {
        throw new Error('Todos los campos son obligatorios');
      }
      
      // Buscar el producto en la lista para obtener el objeto completo
      const producto = productos.find(p => p.id == productoId);
      if (!producto) {
        throw new Error('Producto no encontrado');
      }
      
      // Crear el objeto de movimiento con la estructura que espera el backend
      const movimientoData = {
        producto: {
          id: producto.id
        },
        tipo: tipo,
        cantidad: cantidad,
        motivo: motivo
      };

      console.log('Enviando datos al backend:', movimientoData);

      if (editId) {
        await axios.put(`${API_URL}/movimientos-inventario/${editId}`, movimientoData, config);
        setEditId(null);
        setShowRegistrarModal(false);
        setTimeout(() => {
          addNotification({
            type: 'success',
            title: 'Éxito',
            message: 'Movimiento actualizado correctamente'
          });
        }, 300);
      } else {
        await axios.post(`${API_URL}/movimientos-inventario`, movimientoData, config);
        setShowRegistrarModal(false);
        setTimeout(() => {
          addNotification({
            type: 'success',
            title: 'Éxito',
            message: 'Movimiento registrado correctamente'
          });
        }, 300);
      }

      // Recargar datos
      await fetchMovimientos();
      await fetchProductos();
      await fetchAlertaStock();
      
    } catch (error) {
      console.error('Error al registrar movimiento:', error);
      console.error('Error completo:', error.response?.data || error.message);
      addNotification({
        type: 'error',
        title: 'Error',
        message: error.response?.data?.message || error.message || 'Error al registrar movimiento'
      });
      
      // Restaurar botón en caso de error
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }
  }, [editId, config, addNotification, setShowRegistrarModal, fetchMovimientos, fetchProductos, fetchAlertaStock, productos]);

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
    console.log('=== DEBUG HISTORIAL ===');
    console.log('Producto recibido:', producto);
    console.log('Tipo de producto:', typeof producto);
    console.log('Producto.id:', producto?.id);
    console.log('Tipo de producto.id:', typeof producto?.id);
    
    // Validación simplificada
    if (!producto) {
      console.error('Producto es null o undefined');
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Producto no válido para mostrar historial'
      });
      return;
    }

    // Verificar si el producto tiene un id válido
    const productoId = producto.id || producto.productoId;
    if (!productoId) {
      console.error('Producto no tiene ID válido:', producto);
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Producto no válido para mostrar historial'
      });
      return;
    }

    console.log('ID del producto a usar:', productoId);

    try {
      const res = await axios.get(`${API_URL}/movimientos-inventario/producto/${productoId}/historial`, config);
      console.log('Historial obtenido exitosamente:', res.data);
      setHistorial(res.data);
      setHistorialProducto(producto);
      setShowModal(true);
    } catch (error) {
      console.error('Error al obtener historial:', error);
      console.error('Response:', error.response);
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Error al obtener historial: ' + (error.response?.data || error.message)
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

    // Validar que selectedProduct existe y tiene id
    if (!selectedProduct || !selectedProduct.productoId) {
      console.error('selectedProduct:', selectedProduct);
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Producto no seleccionado correctamente'
      });
      return;
    }

    try {
      const productoId = parseInt(selectedProduct.productoId, 10);
      if (isNaN(productoId)) {
        console.error('ID del producto no es válido:', selectedProduct.productoId);
        addNotification({
          type: 'error',
          title: 'Error',
          message: 'ID del producto no es válido'
        });
        return;
      }

      const dataToSend = {
        producto: { id: productoId }, // Corregido: objeto con id
        cantidad: Number(cantidad),
        tipo: 'ENTRADA',
        motivo: `Reposición rápida: ${motivo}`
      };
      console.log('Enviando a backend:', dataToSend);
      await axios.post(`${API_URL}/movimientos-inventario`, dataToSend, config);

      setShowStockModal(false);
      setSelectedProduct(null);

      // Mostrar popover de éxito
      setSuccessMessage(`Stock repuesto para ${selectedProduct.nombre}`);
      setShowSuccessPopover(true);
      setTimeout(() => setShowSuccessPopover(false), 1800);

      fetchMovimientos();
      fetchProductos();
      fetchAlertaStock();
    } catch (err) {
      console.error('Error completo:', err);
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Error al reponer stock: ' + (err.response?.data || err.message)
      });
    }
  };

  // Cálculos para tarjetas enriquecidas
  const totalStock = productos.reduce((acc, p) => acc + (p.stock ?? p.stockActual ?? 0), 0);
  const agotados = productos.filter(p => (p.stock ?? p.stockActual ?? 0) === 0);
  const productoMasStock = productos.reduce((max, p) => ((p.stock ?? p.stockActual ?? 0) > (max.stock ?? max.stockActual ?? 0) ? p : max), productos[0] || {});
  const productoMenosStock = productos.reduce((min, p) => ((p.stock ?? p.stockActual ?? 0) < (min.stock ?? min.stockActual ?? 0) ? p : min), productos[0] || {});
  const valorTotalInventario = productos.reduce((acc, p) => acc + ((p.stock ?? p.stockActual ?? 0) * (p.precio ?? 0)), 0);

  // Para gráfica de barras: top 5 productos
  const sortedProductos = [...productos].sort((a, b) => (b.stock ?? b.stockActual ?? 0) - (a.stock ?? a.stockActual ?? 0));
  const top5 = sortedProductos.slice(0, 5);
  const barData = top5.map(p => ({ nombre: p.nombre, stock: p.stock ?? p.stockActual ?? 0, precio: p.precio ?? 0 }));
  const barColors = ['#1976d2', '#10b981', '#fbc02d', '#e53935', '#8e24aa'];

  // Modal de Reposición Rápida como componente
  function ModalReposicion({ show, producto, onClose, onSubmit }) {
    const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    React.useEffect(() => {
      if (show) {
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
          document.body.style.overflow = 'unset';
        };
      }
    }, [show]);

    if (!show || !producto) return null;

    return ReactDOM.createPortal(
      <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="modal-content">
          <div className="modal-header">
            <h3>Reponer Stock - {producto.nombre}</h3>
            <button className="modal-close" onClick={onClose} aria-label="Cerrar modal">×</button>
          </div>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="cantidad-modal">Cantidad a agregar:</label>
              <input
                type="number"
                id="cantidad-modal"
                name="cantidad"
                min="1"
                required
                className="form-input"
                autoFocus
              />
            </div>
            <div className="form-group">
              <label htmlFor="motivo-modal">Motivo:</label>
              <textarea
                id="motivo-modal"
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
              <button type="button" className="btn-secondary" onClick={onClose}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>,
      document.body
    );
  }

  // Modal de Historial como componente
  function ModalHistorial({ show, producto, historial, onClose }) {
    const handleOverlayClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    React.useEffect(() => {
      if (show) {
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
          document.body.style.overflow = 'unset';
        };
      }
    }, [show]);

    if (!show || !producto) return null;

    return ReactDOM.createPortal(
      <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="modal-content historial-modal">
          <div className="modal-header">
            <h3>Historial de Movimientos - {producto.nombre}</h3>
            <button className="modal-close" onClick={onClose} aria-label="Cerrar modal">×</button>
          </div>
          <div className="modal-body">
            {historial && historial.length > 0 ? (
              <div className="historial-table-area">
                <table className="historial-table">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Tipo</th>
                      <th>Cantidad</th>
                      <th>Stock Anterior</th>
                      <th>Stock Posterior</th>
                      <th>Motivo</th>
                      <th>Usuario</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historial.map((movimiento) => (
                      <tr key={movimiento.id}>
                        <td>{new Date(movimiento.fecha).toLocaleString('es-ES')}</td>
                        <td>
                          <span className={`estado-${movimiento.tipo.toLowerCase()}`}>
                            {movimiento.tipo}
                          </span>
                        </td>
                        <td>{movimiento.cantidad}</td>
                        <td>{movimiento.stockAnterior}</td>
                        <td>{movimiento.stockPosterior}</td>
                        <td>{movimiento.motivo}</td>
                        <td>{movimiento.usuario?.nombre || 'Sistema'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                <i className="fas fa-info-circle" style={{ fontSize: '3rem', marginBottom: '1rem' }}></i>
                <p>No hay movimientos registrados para este producto.</p>
              </div>
            )}
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>,
      document.body
    );
  }

  // Modal de Registrar Movimiento como componente
  function ModalRegistrarMovimiento({ show, onClose, onSubmit, editId, productos }) {
    // Estado interno del modal para evitar re-renderizados
    const [formData, setFormData] = React.useState({
      productoId: '',
      cantidad: '',
      tipo: 'ENTRADA',
      motivo: ''
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    // Resetear formulario cuando se abre el modal
    React.useEffect(() => {
      if (show) {
        setFormData({
          productoId: '',
          cantidad: '',
          tipo: 'ENTRADA',
          motivo: ''
        });
        setIsSubmitting(false);
      }
    }, [show]);

    const handleOverlayClick = React.useCallback((e) => {
      if (e.target === e.currentTarget && !isSubmitting) {
        onClose();
      }
    }, [onClose, isSubmitting]);

    const handleKeyDown = React.useCallback((e) => {
      if (e.key === 'Escape' && !isSubmitting) {
        onClose();
      }
    }, [onClose, isSubmitting]);

    const handleChange = React.useCallback((e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const handleSubmit = React.useCallback(async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      
      try {
        await onSubmit(e);
        // El modal se cerrará automáticamente después del éxito
      } catch (error) {
        // En caso de error, el modal permanecerá abierto
        setIsSubmitting(false);
      }
    }, [onSubmit]);

    const handleClose = React.useCallback(() => {
      if (!isSubmitting) {
        onClose();
      }
    }, [onClose, isSubmitting]);

    React.useEffect(() => {
      if (show) {
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
          document.removeEventListener('keydown', handleKeyDown);
          document.body.style.overflow = 'unset';
        };
      }
    }, [show, handleKeyDown]);

    // Memoizar el contenido del modal para evitar re-renderizados
    const modalContent = React.useMemo(() => {
      if (!show) return null;

      return ReactDOM.createPortal(
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-content registrar-movimiento-modal">
            <div className="modal-header">
              <h3>{editId ? 'Actualizar Movimiento' : 'Registrar Movimiento de Inventario'}</h3>
              <button 
                className="modal-close" 
                onClick={handleClose} 
                aria-label="Cerrar modal"
                disabled={isSubmitting}
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="producto-modal" className="form-label">Producto *</label>
                  <select
                    id="producto-modal"
                    name="productoId"
                    value={formData.productoId}
                    onChange={handleChange}
                    className="form-select"
                    required
                    disabled={isSubmitting}
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
                  <label htmlFor="tipo-modal" className="form-label">Tipo de Movimiento *</label>
                  <select
                    id="tipo-modal"
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    className="form-select"
                    required
                    disabled={isSubmitting}
                  >
                    <option value="ENTRADA">Entrada</option>
                    <option value="SALIDA">Salida</option>
                    <option value="AJUSTE">Ajuste</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="cantidad-modal" className="form-label">Cantidad *</label>
                  <input
                    type="number"
                    id="cantidad-modal"
                    name="cantidad"
                    value={formData.cantidad}
                    onChange={handleChange}
                    className="form-input"
                    min="1"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="motivo-modal" className="form-label">Motivo *</label>
                <textarea
                  id="motivo-modal"
                  name="motivo"
                  value={formData.motivo}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Describa el motivo del movimiento..."
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="modal-actions">
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i>
                      Procesando...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save"></i>
                      {editId ? 'Actualizar Movimiento' : 'Registrar Movimiento'}
                    </>
                  )}
                </button>
                <button 
                  type="button" 
                  className="btn-secondary" 
                  onClick={handleClose}
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      );
    }, [show, formData, editId, productos, isSubmitting, handleOverlayClick, handleChange, handleSubmit, handleClose]);

    return modalContent;
  }

  function SuccessPopover({ show, message, onClose }) {
    if (!show) return null;
    return ReactDOM.createPortal(
      <div className="success-popover-overlay">
        <div className="success-popover">
          <div className="success-popover-content">
            <span className="success-popover-icon">✔️</span>
            <span>{message}</span>
            <button className="success-popover-close" onClick={onClose} aria-label="Cerrar notificación">×</button>
          </div>
        </div>
      </div>,
      document.body
    );
  }

  // Agregar función para manejar el drop de imagen
  function handleImageDrop(e, producto) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith('image/')) {
      addNotification({ type: 'error', title: 'Archivo inválido', message: 'Solo se permiten imágenes.' });
      return;
    }
    // Aquí puedes implementar la lógica para subir la imagen al backend
    // Por ahora, solo mostramos una notificación de éxito
    addNotification({ type: 'info', title: 'Imagen recibida', message: `Imagen para ${producto.nombre} lista para subir.` });
    // TODO: Implementar subida real al backend y refrescar la imagen
  }

  return (
    <div className="inventario-area-container">
      {/* Notificaciones */}
      {/* Eliminar cualquier renderizado de <SuccessPopover ... /> y notification-center-container del JSX principal.
      Solo dejar la notificación-bottom-container al final del JSX. */}

      <div className="inventario-header-area">
        <h1 className="inventario-title">Gestión de Inventario</h1>
        <div className="inventario-actions">
          <button 
            className="btn-refresh"
            onClick={() => {
              fetchProductos();
              fetchMovimientos();
              fetchAlertaStock();
              // Evitar duplicados de notificación 'Actualizado'
              setNotifications(prev => {
                if (prev.some(n => n.title === 'Actualizado' && n.message === 'Datos de inventario actualizados')) {
                  return prev;
                }
                return [{
                  type: 'info',
                  title: 'Actualizado',
                  message: 'Datos de inventario actualizados',
                  id: Date.now(),
                  timestamp: new Date()
                }, ...prev.slice(0, 4)];
              });
            }}
          >
            <i className="fas fa-sync-alt"></i> Actualizar
          </button>
        </div>
      </div>

      {/* Tarjetas Resumen de Inventario - KPIs */}
      <div className="inventario-kpi-cards kpi-modern-grid">
        <div className="kpi-card kpi-total-productos kpi-small" key="kpi-total-productos">
          <div className="kpi-title">Total de productos</div>
          <div className="kpi-value">{productos.length}</div>
          <div className="kpi-extra">{agotados.length} agotados</div>
        </div>
        <div className="kpi-card kpi-stock-bajo kpi-small" key="kpi-stock-bajo">
          <div className="kpi-title">Stock bajo</div>
          <div className="kpi-value">{alertaStock.length}</div>
          <div className="kpi-extra">Mínimo: {productoMenosStock?.nombre || '-'} ({productoMenosStock?.stock ?? productoMenosStock?.stockActual ?? '-'})</div>
        </div>
        <div className="kpi-card kpi-mas-stock kpi-small" key="kpi-mas-stock">
          <div className="kpi-title">Producto con más stock</div>
          <div className="kpi-value">{productoMasStock?.nombre || '-'}</div>
          <div className="kpi-extra">{productoMasStock?.stock ?? productoMasStock?.stockActual ?? '-'}</div>
        </div>
        <div className="kpi-card kpi-stock-total kpi-small" key="kpi-stock-total">
          <div className="kpi-title">Stock total</div>
          <div className="kpi-value">{totalStock}</div>
          <div className="kpi-extra">Valor total: ${valorTotalInventario.toLocaleString('es-CO', {minimumFractionDigits: 0})}</div>
        </div>
        {/* NUEVAS TARJETAS KPI */}
        <div className="kpi-card kpi-agotados kpi-small" key="kpi-agotados">
          <div className="kpi-title">Productos agotados</div>
          <div className="kpi-value">{agotados.length}</div>
          <div className="kpi-extra">{agotados.length > 0 ? agotados.map(p => p.nombre).slice(0,2).join(', ') + (agotados.length > 2 ? '...' : '') : 'Ninguno'}</div>
        </div>
        <div className="kpi-card kpi-prom-stock kpi-small" key="kpi-prom-stock">
          <div className="kpi-title">Promedio de stock</div>
          <div className="kpi-value">{productos.length > 0 ? Math.round(totalStock / productos.length) : 0}</div>
          <div className="kpi-extra">por producto</div>
        </div>
        <div className="kpi-card kpi-critico kpi-small" key="kpi-critico">
          <div className="kpi-title">Stock crítico</div>
          <div className="kpi-value">{productos.filter(p => (p.stock ?? p.stockActual ?? 0) <= 5).length}</div>
          <div className="kpi-extra">≤ 5 unidades</div>
        </div>
        <div className="kpi-card kpi-prom-valor kpi-small" key="kpi-prom-valor">
          <div className="kpi-title">Valor promedio</div>
          <div className="kpi-value">${productos.length > 0 ? Math.round(valorTotalInventario / productos.length).toLocaleString('es-CO', {minimumFractionDigits: 0}) : 0}</div>
          <div className="kpi-extra">por producto</div>
        </div>
      </div>

      {/* Gráfica de barras para Top 5 productos con más stock */}
      <div className="chart-card" style={{ marginBottom: 32 }}>
        <h2 style={{ marginBottom: 16 }}>Top 5 productos con más stock</h2>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={barData} margin={{ top: 20, right: 30, left: 10, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nombre" angle={-20} textAnchor="end" interval={0} style={{ fontSize: 13 }} />
            <YAxis allowDecimals={false} label={{ value: 'Unidades', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle' } }} />
            <Tooltip formatter={(value, name) => [`${value} unidades`, 'Stock']} />
            <Legend />
            <Bar dataKey="stock" fill="#1976d2">
              {barData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
              ))}
              <LabelList dataKey="stock" position="top" style={{ fontWeight: 600, fontSize: 14 }} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabla de productos con colores por estado de stock */}
      <div className="inventario-tabla-area">
        <h2 className="inventario-tabla-title"><i className="fas fa-table"></i> Tabla de Productos</h2>
        <div className="tabla-productos-scroll">
          <table className="tabla-productos">
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Stock</th>
                <th>Precio</th>
                <th>Valor total</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((p) => {
                const stock = p.stock ?? p.stockActual ?? 0;
                let estado = 'Normal';
                let color = '#28a745';
                if (stock === 0) { estado = 'Agotado'; color = '#dc3545'; }
                else if (stock <= (p.stockMinimo || 10)) { estado = 'Bajo'; color = '#ffc107'; }
                return (
                  <tr key={p.id} style={{ background: stock === 0 ? '#ffeaea' : stock <= (p.stockMinimo || 10) ? '#fffbe6' : 'white' }}>
                    <td>
                      <div
                        className="product-image-dropzone"
                        style={{ width: 60, height: 60, border: '2px dashed #ccc', borderRadius: 8, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafafa', position: 'relative' }}
                        onDragOver={e => e.preventDefault()}
                        onDrop={e => handleImageDrop(e, p)}
                        title="Arrastra una imagen aquí para actualizar"
                      >
                        <img
                          src={p.imagenUrl || '/imagenes/foto01 mujer.png'}
                          alt={p.nombre}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
                        />
                        <span style={{ position: 'absolute', bottom: 2, right: 4, fontSize: 12, color: '#888', background: '#fff8', borderRadius: 4, padding: '0 4px' }}>Editar</span>
                      </div>
                    </td>
                    <td>{p.nombre}</td>
                    <td><b>{stock}</b></td>
                    <td>${p.precio?.toLocaleString('es-CO', {minimumFractionDigits: 0}) ?? '-'}</td>
                    <td>${((stock) * (p.precio ?? 0)).toLocaleString('es-CO', {minimumFractionDigits: 0})}</td>
                    <td><span style={{ color, fontWeight: 600 }}>{estado}</span></td>
                    <td>
                      <button className="btn-restock" title="Reponer" onClick={() => handleQuickRestock(p)}>
                        <i className="fas fa-plus"></i> Reponer
                      </button>
                      <button className="btn-history" title="Historial" onClick={(e) => handleShowHistorial(p, e)}>
                        <i className="fas fa-history"></i> Historial
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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

      {/* Botón para Registrar Movimiento */}
      <div className="inventario-form-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 className="inventario-form-title">
            <i className="fas fa-plus-circle"></i>
            Gestión de Movimientos
          </h2>
          <button 
            className="btn-primary"
            onClick={() => setShowRegistrarModal(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <i className="fas fa-plus"></i>
            Registrar Movimiento
          </button>
        </div>
        {notifications.length > 0 && (
          <div className="notification-bottom-container">
            <div className={`notification notification-bottom ${notifications[0].type}`} style={{ position: 'fixed', left: '50%', bottom: '120px', transform: 'translateX(-50%)', zIndex: 9999, minWidth: 320, maxWidth: '90vw', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}>
              <div className="notification-header">
                <div className="notification-title">{notifications[0].title}</div>
                <button 
                  className="notification-close" 
                  onClick={() => removeNotification(notifications[0].id)}
                  aria-label="Cerrar notificación"
                >
                  ×
                </button>
              </div>
              <div className="notification-message">{notifications[0].message}</div>
              {notifications[0].products && (
                <div className="notification-products">
                  {notifications[0].products.map((product, index) => (
                    <span key={index} className="product-tag">
                      {product.nombre}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Modal de Reposición Rápida */}
      <ModalReposicion
        show={showStockModal}
        producto={selectedProduct}
        onClose={() => { setShowStockModal(false); setSelectedProduct(null); }}
        onSubmit={handleRestockSubmit}
      />

      {/* Modal de Historial */}
      <ModalHistorial
        show={showModal}
        producto={historialProducto}
        historial={historial}
        onClose={() => { setShowModal(false); setHistorialProducto(null); }}
      />

      {/* Modal de Registrar Movimiento */}
      <ModalRegistrarMovimiento
        show={showRegistrarModal}
        onClose={() => setShowRegistrarModal(false)}
        onSubmit={handleSubmit}
        editId={editId}
        productos={productos}
      />

    </div>
  );
}

export default InventarioPage; 