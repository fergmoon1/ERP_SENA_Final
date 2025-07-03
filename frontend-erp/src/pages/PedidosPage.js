import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import '../styles/InventarioPage.css';

const API_URL = 'http://localhost:8081/api';

function ModalMensaje({ show, onClose, titulo, mensaje, children }) {
  if (!show) return null;
  return ReactDOM.createPortal(
    <div className="modal-overlay" style={{zIndex: 3000}}>
      <div className="modal-content modal-center" style={{maxWidth: 400, minWidth: 260, padding: '1.5rem 1.2rem'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}}>
          <h3 style={{margin: 0, fontWeight: 700, fontSize: '1.2rem', color: '#222'}}>{titulo}</h3>
          <button className="modal-close-btn" onClick={onClose} title="Cerrar">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div style={{marginBottom: 18, fontSize: '1.08rem', color: '#222', fontWeight: 500}}>{mensaje}</div>
        {children ? (
          <div style={{textAlign: 'right'}}>{children}</div>
        ) : (
          <div style={{textAlign: 'right'}}>
            <button onClick={onClose} style={{background: '#2563eb', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 22px', fontWeight: 600, cursor: 'pointer'}}>Cerrar</button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

function PedidosPage() {
  const [clientes, setClientes] = useState([]);
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [form, setForm] = useState({ clienteId: '', fecha: '', estado: 'pendiente', productos: [], productoId: '', cantidad: '' });
  const [editId, setEditId] = useState(null);
  const [modal, setModal] = useState({ show: false, titulo: '', mensaje: '', onConfirm: null });
  const [busqueda, setBusqueda] = useState({ clienteId: '', fecha: '', estado: '' });
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const token = localStorage.getItem('jwt');
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};

  useEffect(() => {
    fetchClientes();
    fetchProductos();
    fetchPedidos();
  }, [pagina]);

  const fetchClientes = async () => {
    try {
      const res = await axios.get(`${API_URL}/clientes`, config);
      setClientes(res.data);
    } catch (err) {
      setClientes([]);
    }
  };

  const fetchProductos = async () => {
    try {
      const res = await axios.get(`${API_URL}/productos`, config);
      setProductos(res.data);
    } catch (err) {
      setProductos([]);
    }
  };

  const fetchPedidos = async () => {
    try {
      const params = { ...busqueda, pagina };
      const res = await axios.get(`${API_URL}/pedidos`, { ...config, params });
      setPedidos(res.data.content || res.data);
      setTotalPaginas(res.data.totalPages || 1);
    } catch (err) {
      setPedidos([]);
      setTotalPaginas(1);
    }
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddProducto = () => {
    if (!form.productoId || !form.cantidad || isNaN(form.cantidad) || Number(form.cantidad) <= 0) return;
    const prod = productos.find(p => p.id === Number(form.productoId));
    if (!prod) return;
    setForm({
      ...form,
      productos: [...form.productos, { productoId: prod.id, nombre: prod.nombre, cantidad: Math.max(1, Number(form.cantidad)), precioUnitario: prod.precio }],
      productoId: '',
      cantidad: ''
    });
  };

  const handleRemoveProducto = (idx) => {
    setForm({ ...form, productos: form.productos.filter((_, i) => i !== idx) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.clienteId || !form.fecha || form.productos.length === 0) {
      setModal({ show: true, titulo: 'Error', mensaje: 'Todos los campos y al menos un producto son obligatorios.' });
      return;
    }
    try {
      if (editId) {
        await axios.put(`${API_URL}/pedidos/${editId}`, {
          clienteId: form.clienteId,
          fecha: form.fecha,
          estado: form.estado.toLowerCase(),
          detalles: form.productos
        }, config);
        setModal({ show: true, titulo: 'Éxito', mensaje: '¡Pedido actualizado!' });
      } else {
        await axios.post(`${API_URL}/pedidos`, {
          clienteId: form.clienteId,
          fecha: form.fecha,
          estado: form.estado.toLowerCase(),
          detalles: form.productos
        }, config);
        setModal({ show: true, titulo: 'Éxito', mensaje: '¡Pedido agregado!' });
      }
      setForm({ clienteId: '', fecha: '', estado: 'pendiente', productos: [], productoId: '', cantidad: '' });
      setEditId(null);
      fetchPedidos();
    } catch (err) {
      setModal({ show: true, titulo: 'Error', mensaje: 'Error al guardar el pedido.' });
    }
  };

  const handleEdit = (pedido) => {
    setForm({
      clienteId: pedido.cliente.id,
      fecha: pedido.fecha?.substring(0, 10) || '',
      estado: pedido.estado,
      productos: pedido.detalles.map(d => ({ productoId: d.producto.id, nombre: d.producto.nombre, cantidad: d.cantidad })),
      productoId: '',
      cantidad: ''
    });
    setEditId(pedido.id);
    setModal({ show: false });
  };

  const handleDelete = (id) => {
    setModal({
      show: true,
      titulo: 'Confirmar eliminación',
      mensaje: '¿Seguro que desea eliminar este pedido?',
      onConfirm: () => doDelete(id)
    });
  };

  const doDelete = async (id) => {
    setModal({ show: false });
    try {
      await axios.delete(`${API_URL}/pedidos/${id}`, config);
      setModal({ show: true, titulo: 'Éxito', mensaje: '¡Pedido eliminado!' });
      fetchPedidos();
    } catch (err) {
      setModal({ show: true, titulo: 'Error', mensaje: 'Error al eliminar el pedido.' });
    }
  };

  const handleLimpiar = () => {
    setForm({ clienteId: '', fecha: '', estado: 'pendiente', productos: [], productoId: '', cantidad: '' });
    setEditId(null);
    setModal({ show: false });
  };

  const handleBusquedaChange = (e) => {
    setBusqueda({ ...busqueda, [e.target.name]: e.target.value });
  };

  const handleBuscar = (e) => {
    e.preventDefault();
    setPagina(1);
    fetchPedidos();
  };

  const handleLimpiarBusqueda = () => {
    setBusqueda({ clienteId: '', fecha: '', estado: '' });
    setPagina(1);
    fetchPedidos();
  };

  return (
    <div className="inventario-area-container">
      <div className="inventario-header-area">
        <h1 className="inventario-title">Gestión de Pedidos</h1>
      </div>
      {/* Formulario Agregar/Editar Pedido */}
      <div className="inventario-form-card">
        <h2 className="inventario-form-title">Agregar/Editar Pedido</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{display: 'flex', gap: 16, flexWrap: 'wrap'}}>
            <div style={{flex: 1, minWidth: 180}}>
              <label className="form-label">Cliente</label>
              <select className="form-select" name="clienteId" value={form.clienteId} onChange={handleFormChange}>
                <option value="">Seleccione un cliente</option>
                {clientes.map(c => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </select>
            </div>
            <div style={{flex: 1, minWidth: 140}}>
              <label className="form-label">Fecha</label>
              <input className="form-input" name="fecha" type="date" value={form.fecha} onChange={handleFormChange} />
            </div>
            <div style={{flex: 1, minWidth: 140}}>
              <label className="form-label">Estado</label>
              <select className="form-select" name="estado" value={form.estado} onChange={handleFormChange}>
                <option value="pendiente">Pendiente</option>
                <option value="completado">Completado</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>
          </div>
          <div className="form-group" style={{display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-end'}}>
            <div style={{flex: 1, minWidth: 180}}>
              <label className="form-label">Productos</label>
              <select className="form-select" name="productoId" value={form.productoId} onChange={handleFormChange}>
                <option value="">Seleccione un producto</option>
                {productos.map(p => (
                  <option key={p.id} value={p.id}>{p.nombre}</option>
                ))}
              </select>
            </div>
            <div style={{flex: 1, minWidth: 100}}>
              <label className="form-label">Cantidad</label>
              <input className="form-input" name="cantidad" type="number" min="1" value={form.cantidad} onChange={handleFormChange} />
            </div>
            <div style={{minWidth: 120}}>
              <button type="button" className="btn-guardar" style={{marginTop: 8}} onClick={handleAddProducto}>Agregar Producto</button>
            </div>
          </div>
          {/* Lista de productos agregados al pedido */}
          {form.productos.length > 0 && (
            <div style={{margin: '12px 0'}}>
              <b style={{color: '#2563eb'}}>Productos en el pedido:</b>
              <ul style={{margin: '8px 0 0 0', padding: 0, listStyle: 'none'}}>
                {form.productos.map((p, idx) => (
                  <li key={idx} style={{marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8}}>
                    <span>{p.nombre} (Cantidad: {p.cantidad})</span>
                    <button type="button" className="btn-eliminar" style={{padding: '2px 10px', fontSize: '0.95em'}} onClick={() => handleRemoveProducto(idx)}>Quitar</button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="form-buttons-area">
            <button className="btn-guardar" type="submit">Guardar</button>
            <button className="btn-limpiar" type="button" onClick={handleLimpiar}>Limpiar</button>
          </div>
        </form>
      </div>
      {/* Buscar Pedidos */}
      <div className="inventario-form-card">
        <h2 className="inventario-form-title">Buscar Pedidos</h2>
        <form onSubmit={handleBuscar} style={{marginBottom: 0}}>
          <div className="form-group" style={{display: 'flex', gap: 16, flexWrap: 'wrap'}}>
            <div style={{flex: 1, minWidth: 180}}>
              <label className="form-label">Cliente</label>
              <select className="form-select" name="clienteId" value={busqueda.clienteId} onChange={handleBusquedaChange}>
                <option value="">Todos los clientes</option>
                {clientes.map(c => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </select>
            </div>
            <div style={{flex: 1, minWidth: 140}}>
              <label className="form-label">Fecha</label>
              <input className="form-input" name="fecha" type="date" value={busqueda.fecha} onChange={handleBusquedaChange} />
            </div>
            <div style={{flex: 1, minWidth: 140}}>
              <label className="form-label">Estado</label>
              <select className="form-select" name="estado" value={busqueda.estado} onChange={handleBusquedaChange}>
                <option value="">Todos los estados</option>
                <option value="pendiente">Pendiente</option>
                <option value="completado">Completado</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>
          </div>
          <div className="form-buttons-area">
            <button className="btn-guardar" type="submit">Buscar</button>
            <button className="btn-limpiar" type="button" onClick={handleLimpiarBusqueda}>Limpiar</button>
          </div>
        </form>
      </div>
      {/* Lista de Pedidos */}
      <div className="inventario-table-card">
        <h2 className="inventario-table-title">Lista de Pedidos</h2>
        <table className="inventario-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Productos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.cliente?.nombre || '-'}</td>
                <td>{pedido.fecha?.substring(0, 10) || '-'}</td>
                <td>
                  <span style={{
                    display: 'inline-block',
                    padding: '2px 12px',
                    borderRadius: 8,
                    fontWeight: 700,
                    color: '#fff',
                    background: pedido.estado === 'pendiente' ? '#facc15' : pedido.estado === 'completado' ? '#22c55e' : pedido.estado === 'cancelado' ? '#ef4444' : '#888',
                    border: '1px solid',
                    borderColor: pedido.estado === 'pendiente' ? '#eab308' : pedido.estado === 'completado' ? '#16a34a' : pedido.estado === 'cancelado' ? '#b91c1c' : '#888',
                    fontSize: '0.98em',
                    letterSpacing: 1
                  }}>
                    {pedido.estado ? pedido.estado.toUpperCase() : ''}
                  </span>
                </td>
                <td>
                  <ul style={{margin: 0, padding: 0, listStyle: 'none'}}>
                    {pedido.detalles?.map((d, idx) => (
                      <li key={idx}>{d.producto?.nombre} (Cantidad: {d.cantidad})</li>
                    ))}
                  </ul>
                </td>
                <td className="acciones">
                  <button className="btn-editar" onClick={() => handleEdit(pedido)}>Editar</button>
                  <button className="btn-eliminar" onClick={() => handleDelete(pedido.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{display: 'flex', justifyContent: 'space-between', marginTop: 16}}>
          <button className="btn-limpiar" disabled={pagina <= 1} onClick={() => setPagina(p => Math.max(1, p - 1))}>Anterior</button>
          <span style={{alignSelf: 'center', fontWeight: 500}}>Página {pagina} de {totalPaginas}</span>
          <button className="btn-limpiar" disabled={pagina >= totalPaginas} onClick={() => setPagina(p => Math.min(totalPaginas, p + 1))}>Siguiente</button>
        </div>
      </div>
      <ModalMensaje
        show={modal.show}
        titulo={modal.titulo}
        mensaje={modal.mensaje}
        onClose={() => setModal({ ...modal, show: false })}
      >
        {modal.onConfirm && (
          <>
            <button onClick={() => setModal({ ...modal, show: false })} style={{background: '#aaa', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 22px', fontWeight: 600, cursor: 'pointer', marginRight: 8}}>Cancelar</button>
            <button onClick={modal.onConfirm} style={{background: '#e53935', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 22px', fontWeight: 600, cursor: 'pointer'}}>Eliminar</button>
          </>
        )}
      </ModalMensaje>
    </div>
  );
}

export default PedidosPage; 