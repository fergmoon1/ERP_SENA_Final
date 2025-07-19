import React, { useEffect, useState } from 'react';
import '../styles/ComprasPage.css';

function ComprasPage() {
  const [compras, setCompras] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editCompra, setEditCompra] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [filtros, setFiltros] = useState({ proveedorId: '', fecha: '' });
  const [form, setForm] = useState({
    proveedorId: '',
    fecha: '',
    usuario: '',
    detalles: []
  });
  const [detalleForm, setDetalleForm] = useState({ productoId: '', cantidad: '', precioUnitario: '' });

  const token = localStorage.getItem('jwt');
  const config = token ? { headers: { 'Authorization': `Bearer ${token}` } } : {};

  useEffect(() => {
    fetchCompras();
    fetchProveedores();
    fetchProductos();
  }, []);

  const fetchCompras = async () => {
    setLoading(true);
    try {
      let url = '/api/compras';
      if (filtros.proveedorId) url = `/api/compras/proveedor/${filtros.proveedorId}`;
      const res = await fetch(url, config);
      const data = await res.json();
      setCompras(data);
    } catch {
      setCompras([]);
    }
    setLoading(false);
  };

  const fetchProveedores = async () => {
    try {
      const res = await fetch('/api/proveedores', config);
      const data = await res.json();
      setProveedores(data);
    } catch {
      setProveedores([]);
    }
  };

  const fetchProductos = async () => {
    try {
      const res = await fetch('/api/productos', config);
      const data = await res.json();
      setProductos(data);
    } catch {
      setProductos([]);
    }
  };

  const handleFiltroChange = e => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  const handleBuscar = e => {
    e.preventDefault();
    fetchCompras();
  };

  const handleOpenModal = (compra = null) => {
    if (compra) {
      setEditCompra(compra);
      setForm({
        proveedorId: compra.proveedor?.id || '',
        fecha: compra.fecha || '',
        usuario: compra.usuario || '',
        detalles: compra.detalles?.map(d => ({
          productoId: d.producto?.id || '',
          cantidad: d.cantidad,
          precioUnitario: d.precioUnitario
        })) || []
      });
    } else {
      setEditCompra(null);
      setForm({ proveedorId: '', fecha: '', usuario: '', detalles: [] });
    }
    setModalOpen(true);
    setFeedback('');
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditCompra(null);
    setForm({ proveedorId: '', fecha: '', usuario: '', detalles: [] });
    setDetalleForm({ productoId: '', cantidad: '', precioUnitario: '' });
    setFeedback('');
  };

  const handleFormChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDetalleChange = e => {
    setDetalleForm({ ...detalleForm, [e.target.name]: e.target.value });
  };

  const handleAddDetalle = () => {
    if (!detalleForm.productoId || !detalleForm.cantidad || !detalleForm.precioUnitario) return;
    setForm({
      ...form,
      detalles: [
        ...form.detalles,
        {
          productoId: detalleForm.productoId,
          cantidad: Number(detalleForm.cantidad),
          precioUnitario: Number(detalleForm.precioUnitario)
        }
      ]
    });
    setDetalleForm({ productoId: '', cantidad: '', precioUnitario: '' });
  };

  const handleRemoveDetalle = idx => {
    setForm({ ...form, detalles: form.detalles.filter((_, i) => i !== idx) });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setFeedback('');
    if (!form.proveedorId || !form.fecha || form.detalles.length === 0) {
      setFeedback('Todos los campos y al menos un producto son obligatorios.');
      return;
    }
    const compraData = {
      proveedor: { id: form.proveedorId },
      fecha: form.fecha,
      usuario: form.usuario,
      detalles: form.detalles.map(d => ({
        producto: { id: d.productoId },
        cantidad: d.cantidad,
        precioUnitario: d.precioUnitario
      }))
    };
    try {
      const url = editCompra ? `/api/compras/${editCompra.id}` : '/api/compras';
      const method = editCompra ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(compraData)
      });
      if (res.ok) {
        setFeedback('¡Compra guardada correctamente!');
        fetchCompras();
        setTimeout(handleCloseModal, 1000);
      } else {
        setFeedback('Error al guardar la compra.');
      }
    } catch {
      setFeedback('Error de red al guardar la compra.');
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('¿Seguro que deseas eliminar esta compra?')) return;
    try {
      const res = await fetch(`/api/compras/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      if (res.ok) {
        fetchCompras();
      }
    } catch {}
  };

  const exportCompras = () => {
    if (!compras.length) return;
    const csv = [
      'Proveedor,Fecha,Total,Usuario',
      ...compras.map(c => `"${c.proveedor?.nombre}","${c.fecha}","${c.total}","${c.usuario}"`)
    ].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compras-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <div className="compras-container" style={{padding:'32px 0',maxWidth:1200,margin:'0 auto'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
        <h1 style={{fontSize:28,fontWeight:800,color:'#2563eb'}}>Compras</h1>
        <button onClick={() => handleOpenModal()} style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:8,padding:'10px 24px',fontWeight:700,fontSize:15,cursor:'pointer',boxShadow:'0 2px 8px rgba(37,99,235,0.10)'}}>
          <i className="fas fa-plus"></i> Nueva compra
        </button>
        <button onClick={exportCompras} style={{background:'linear-gradient(90deg,#2563eb 0%,#059669 100%)',color:'#fff',border:'none',borderRadius:8,padding:'10px 24px',fontWeight:700,fontSize:15,cursor:'pointer',boxShadow:'0 2px 8px rgba(37,99,235,0.10)',marginLeft:12}}>
          <i className="fas fa-download"></i> Exportar CSV
        </button>
      </div>
      <form onSubmit={handleBuscar} style={{display:'flex',gap:18,flexWrap:'wrap',marginBottom:24,alignItems:'end'}}>
        <div style={{display:'flex',flexDirection:'column',gap:4}}>
          <label>Proveedor</label>
          <select name="proveedorId" value={filtros.proveedorId} onChange={handleFiltroChange} style={{padding:8,borderRadius:6,border:'1.5px solid #d1d5db',fontSize:14}}>
            <option value="">Todos</option>
            {proveedores.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
          </select>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:4}}>
          <label>Fecha</label>
          <input type="date" name="fecha" value={filtros.fecha} onChange={handleFiltroChange} style={{padding:8,borderRadius:6,border:'1.5px solid #d1d5db',fontSize:14}} />
        </div>
        <button type="submit" style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:8,padding:'10px 24px',fontWeight:700,fontSize:15,cursor:'pointer',boxShadow:'0 2px 8px rgba(37,99,235,0.10)',display:'flex',alignItems:'center',gap:8}}>
          <i className="fas fa-search"></i> Buscar
        </button>
        <button type="button" onClick={() => { setFiltros({ proveedorId: '', fecha: '' }); fetchCompras(); }} style={{background:'#e5e7eb',color:'#222',border:'none',borderRadius:8,padding:'10px 24px',fontWeight:700,fontSize:15,cursor:'pointer',boxShadow:'0 2px 8px rgba(100,116,139,0.10)',display:'flex',alignItems:'center',gap:8}}>
          <i className="fas fa-eraser"></i> Limpiar
        </button>
      </form>
      <div className="compras-table-section" style={{background:'#fff',borderRadius:14,boxShadow:'0 2px 8px rgba(37,99,235,0.06)',padding:'18px 0',marginBottom:32,overflowX:'auto'}}>
        <h2 style={{margin:'0 0 18px 24px',fontSize:20,fontWeight:700,color:'#2563eb'}}>Listado de Compras</h2>
        {loading ? (
          <div style={{textAlign:'center',padding:'48px 0',color:'#64748b',fontSize:18}}>
            <i className="fas fa-spinner fa-spin" style={{fontSize:28,marginBottom:12}}></i>
            <div>Cargando compras...</div>
          </div>
        ) : compras.length === 0 ? (
          <div style={{textAlign:'center',padding:'48px 0',color:'#64748b',fontSize:18}}>
            <i className="fas fa-info-circle" style={{fontSize:28,marginBottom:12}}></i>
            <div>No hay compras para mostrar.</div>
          </div>
        ) : (
          <table className="compras-table" style={{width:'100%',borderCollapse:'separate',borderSpacing:0,minWidth:900}}>
            <thead style={{position:'sticky',top:0,zIndex:2,background:'#f1f5f9'}}>
              <tr>
                <th>Proveedor</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Usuario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {compras.map((c, idx) => (
                <tr key={c.id || idx} style={{background:idx%2===0?'#f8fafc':'#fff'}}>
                  <td>{c.proveedor?.nombre || '-'}</td>
                  <td>{c.fecha}</td>
                  <td>${c.total?.toLocaleString('es-CO') || '0'}</td>
                  <td>{c.usuario || '-'}</td>
                  <td>
                    <button className="btn-secondary" style={{marginRight:6}} onClick={() => handleOpenModal(c)}><i className="fas fa-eye"></i> Ver/Editar</button>
                    <button className="btn-danger" onClick={() => handleDelete(c.id)}><i className="fas fa-trash"></i> Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {modalOpen && (
        <div className="modal-backdrop" style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.35)',zIndex:3000,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div className="modal-content" style={{background:'#fff',borderRadius:14,boxShadow:'0 8px 32px rgba(37,99,235,0.13)',padding:'38px 36px 30px 36px',minWidth:340,maxWidth:520,display:'flex',flexDirection:'column',alignItems:'center',gap:18,position:'relative'}}>
            <h2 style={{fontWeight:700,fontSize:22,color:'#2563eb',marginBottom:8}}>{editCompra ? 'Editar compra' : 'Nueva compra'}</h2>
            <form onSubmit={handleSubmit} style={{width:'100%',display:'flex',flexDirection:'column',gap:10}}>
              <label>Proveedor</label>
              <select name="proveedorId" value={form.proveedorId} onChange={handleFormChange} required style={{padding:8,borderRadius:6,border:'1.5px solid #d1d5db'}}>
                <option value="">Seleccione proveedor</option>
                {proveedores.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
              </select>
              <label>Fecha</label>
              <input type="date" name="fecha" value={form.fecha} onChange={handleFormChange} required style={{padding:8,borderRadius:6,border:'1.5px solid #d1d5db'}} />
              <label>Usuario</label>
              <input type="text" name="usuario" value={form.usuario} onChange={handleFormChange} placeholder="Usuario que registra" style={{padding:8,borderRadius:6,border:'1.5px solid #d1d5db'}} />
              <div style={{margin:'12px 0 0 0'}}>
                <b>Productos de la compra</b>
                <table style={{width:'100%',marginTop:8,marginBottom:8}}>
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio Unitario</th>
                      <th>Subtotal</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {form.detalles.map((d, idx) => {
                      const prod = productos.find(p => p.id == d.productoId);
                      return (
                        <tr key={idx}>
                          <td>{prod?.nombre || '-'}</td>
                          <td>{d.cantidad}</td>
                          <td>${d.precioUnitario}</td>
                          <td>${(d.cantidad * d.precioUnitario).toLocaleString('es-CO')}</td>
                          <td><button type="button" onClick={() => handleRemoveDetalle(idx)} style={{background:'none',border:'none',color:'#e11d48',fontWeight:700,cursor:'pointer'}}>Quitar</button></td>
                        </tr>
                      );
                    })}
                    <tr>
                      <td>
                        <select name="productoId" value={detalleForm.productoId} onChange={handleDetalleChange} style={{padding:6,borderRadius:6,border:'1.5px solid #d1d5db'}}>
                          <option value="">Producto</option>
                          {productos.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
                        </select>
                      </td>
                      <td><input type="number" name="cantidad" value={detalleForm.cantidad} onChange={handleDetalleChange} min={1} style={{width:60,padding:6,borderRadius:6,border:'1.5px solid #d1d5db'}} /></td>
                      <td><input type="number" name="precioUnitario" value={detalleForm.precioUnitario} onChange={handleDetalleChange} min={0} style={{width:90,padding:6,borderRadius:6,border:'1.5px solid #d1d5db'}} /></td>
                      <td></td>
                      <td><button type="button" onClick={handleAddDetalle} style={{background:'#059669',color:'#fff',border:'none',borderRadius:6,padding:'6px 14px',fontWeight:700,cursor:'pointer'}}>Agregar</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{display:'flex',justifyContent:'flex-end',gap:12,marginTop:10}}>
                <button type="button" onClick={handleCloseModal} style={{background:'#e5e7eb',color:'#222',border:'none',borderRadius:8,padding:'8px 24px',fontWeight:600,fontSize:15,cursor:'pointer'}}>Cancelar</button>
                <button type="submit" style={{background:'#2563eb',color:'#fff',border:'none',borderRadius:8,padding:'8px 24px',fontWeight:600,fontSize:15,cursor:'pointer'}}>Guardar</button>
              </div>
              {feedback && <div style={{marginTop:8,color:feedback.startsWith('¡')?'#059669':'#e11d48',fontWeight:600}}>{feedback}</div>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ComprasPage; 