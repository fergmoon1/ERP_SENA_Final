import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/InventarioPage.css';
import ReactDOM from 'react-dom';

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

function ProductosPage() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ nombre: '', descripcion: '', precio: '', stock: '' });
  const [editId, setEditId] = useState(null);
  const [feedback, setFeedback] = useState('');
  const token = localStorage.getItem('jwt');
  const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  const [modal, setModal] = useState({ show: false, titulo: '', mensaje: '', onConfirm: null });

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      const res = await axios.get(`${API_URL}/productos`, config);
      setProductos(res.data);
    } catch (err) {
      setProductos([]);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.precio || !form.stock) {
      setModal({ show: true, titulo: 'Error', mensaje: 'Todos los campos son obligatorios.' });
      return;
    }
    try {
      if (editId) {
        await axios.put(`${API_URL}/productos/${editId}`, {
          nombre: form.nombre,
          descripcion: form.descripcion,
          precio: parseFloat(form.precio),
          stock: parseInt(form.stock, 10)
        }, config);
        setModal({ show: true, titulo: 'Éxito', mensaje: '¡Producto actualizado!' });
      } else {
        await axios.post(`${API_URL}/productos`, {
          nombre: form.nombre,
          descripcion: form.descripcion,
          precio: parseFloat(form.precio),
          stock: parseInt(form.stock, 10)
        }, config);
        setModal({ show: true, titulo: 'Éxito', mensaje: '¡Producto agregado!' });
      }
      setForm({ nombre: '', descripcion: '', precio: '', stock: '' });
      setEditId(null);
      fetchProductos();
    } catch (err) {
      setModal({ show: true, titulo: 'Error', mensaje: 'Error al guardar el producto.' });
    }
  };

  const handleEdit = (prod) => {
    setForm({
      nombre: prod.nombre,
      descripcion: prod.descripcion,
      precio: prod.precio,
      stock: prod.stock
    });
    setEditId(prod.id);
    setFeedback('');
  };

  const handleDelete = (id) => {
    setModal({
      show: true,
      titulo: 'Confirmar eliminación',
      mensaje: '¿Seguro que desea eliminar este producto?',
      onConfirm: () => doDelete(id)
    });
  };

  const doDelete = async (id) => {
    setModal({ show: false });
    try {
      await axios.delete(`${API_URL}/productos/${id}`, config);
      setModal({ show: true, titulo: 'Éxito', mensaje: '¡Producto eliminado!' });
      fetchProductos();
    } catch (err) {
      setModal({ show: true, titulo: 'Error', mensaje: 'Error al eliminar el producto.' });
    }
  };

  const handleLimpiar = () => {
    setForm({ nombre: '', descripcion: '', precio: '', stock: '' });
    setEditId(null);
    setFeedback('');
  };

  return (
    <div className="inventario-area-container">
      <div className="inventario-header-area">
        <h1 className="inventario-title">Productos</h1>
      </div>
      <div className="inventario-form-card">
        <h2 className="inventario-form-title">Agregar/Editar Producto</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Nombre del Producto</label>
            <input className="form-input" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ingrese el nombre del producto" />
          </div>
          <div className="form-group">
            <label className="form-label">Descripción</label>
            <textarea className="form-input" name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Ingrese la descripción del producto" />
          </div>
          <div className="form-group">
            <label className="form-label">Precio</label>
            <input className="form-input" name="precio" type="number" step="0.01" value={form.precio} onChange={handleChange} placeholder="Ingrese el precio del producto" />
          </div>
          <div className="form-group">
            <label className="form-label">Stock</label>
            <input className="form-input" name="stock" type="number" value={form.stock} onChange={handleChange} placeholder="Ingrese el stock del producto" />
          </div>
          <div className="form-buttons-area">
            <button className="btn-guardar" type="submit">Guardar</button>
            <button className="btn-limpiar" type="button" onClick={handleLimpiar}>Limpiar</button>
          </div>
        </form>
      </div>
      <div className="inventario-table-card">
        <h2 className="inventario-table-title">Lista de Productos</h2>
        <table className="inventario-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.nombre}</td>
                <td>{prod.descripcion}</td>
                <td>{prod.precio}</td>
                <td>{prod.stock}</td>
                <td className="acciones">
                  <button className="btn-editar" onClick={() => handleEdit(prod)}>Editar</button>
                  <button className="btn-eliminar" onClick={() => handleDelete(prod.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default ProductosPage; 