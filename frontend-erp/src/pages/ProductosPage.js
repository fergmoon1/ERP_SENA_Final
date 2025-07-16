import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/InventarioPage.css';
import ReactDOM from 'react-dom';

const API_URL = 'http://localhost:8081/api';

// Función helper para manejar URLs de imágenes
const getImageUrl = (imageUrl) => {
  if (!imageUrl) return null;
  
  // Si ya es una URL completa
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  // Si empieza con /api/, construir URL completa
  if (imageUrl.startsWith('/api/')) {
    return `http://localhost:8081${imageUrl}`;
  }
  
  // Si es una ruta relativa, agregar API_URL
  return `${API_URL}${imageUrl}`;
};

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
                <td>
                  <div
                    className="product-image-dropzone"
                    style={{ 
                      width: 60, 
                      height: 60, 
                      border: '2px dashed #ccc', 
                      borderRadius: 8, 
                      overflow: 'hidden', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      background: '#fafafa', 
                      position: 'relative',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    title="Click para subir imagen"
                  >
                    {prod.imagenUrl ? (
                      <img
                        src={getImageUrl(prod.imagenUrl)}
                        alt={prod.nombre}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: 8,
                          transition: 'transform 0.2s ease'
                        }}
                        onError={e => {
                          // Silenciar el error y mostrar el overlay de cámara
                          e.target.style.display = 'none';
                          const overlay = e.target.parentNode.querySelector('.camera-overlay');
                          if (overlay) overlay.style.display = 'flex';
                        }}
                        onLoad={e => {
                          // Ocultar el overlay cuando la imagen carga correctamente
                          const overlay = e.target.parentNode.querySelector('.camera-overlay');
                          if (overlay) overlay.style.display = 'none';
                        }}
                      />
                    ) : null}
                    <div 
                      className="camera-overlay"
                      style={{ 
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        right: 0, 
                        bottom: 0, 
                        background: prod.imagenUrl ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.05)', 
                        display: prod.imagenUrl ? 'none' : 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'opacity 0.2s ease'
                      }}
                      onMouseEnter={e => e.target.style.opacity = 1}
                      onMouseLeave={e => e.target.style.opacity = 0}
                    >
                      <i className="fas fa-camera" style={{ color: '#000', fontSize: 16 }}></i>
                    </div>
                  </div>
                </td>
                <td style={{ fontSize: '13px', maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', padding: '8px 4px' }}>{prod.nombre}</td>
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
      {/* Tabla visual de productos con acciones */}
      <div className="inventario-tabla-area">
        <h2 className="inventario-tabla-title"><i className="fas fa-table"></i> Catálogo de Productos</h2>
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
                    <td><img src={getImageUrl(p.imagenUrl) || '/imagenes/foto01 mujer.png'} alt={p.nombre} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} /></td>
                    <td>{p.nombre}</td>
                    <td><b>{stock}</b></td>
                    <td>${p.precio?.toLocaleString('es-CO', {minimumFractionDigits: 0}) ?? '-'}</td>
                    <td>${((stock) * (p.precio ?? 0)).toLocaleString('es-CO', {minimumFractionDigits: 0})}</td>
                    <td><span style={{ color, fontWeight: 600 }}>{estado}</span></td>
                    <td>
                      <button className="btn-restock">Reponer</button>
                      <button className="btn-history">Historial</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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

export default ProductosPage; 