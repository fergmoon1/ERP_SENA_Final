import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import '../styles/clientes.css';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const API_URL = 'http://localhost:8081/api/clientes';

const tipoOptions = [
  { value: 'Individual', label: 'Individual' },
  { value: 'Empresa', label: 'Empresa' }
];

// Modal de detalles rápidos
function ModalDetalleCliente({ show, cliente, onClose }) {
  if (!show || !cliente) return null;
  return (
    <div style={{position:'fixed', top:0, left:0, width:'100vw', height:'100vh', background:'rgba(30,41,59,0.18)', zIndex:3000, display:'flex', alignItems:'center', justifyContent:'center'}}>
      <div style={{background:'#fff', borderRadius:16, boxShadow:'0 8px 32px rgba(59,130,246,0.18)', minWidth:320, maxWidth:400, padding:'32px 28px 24px 28px', position:'relative'}}>
        <button onClick={onClose} style={{position:'absolute', top:14, right:18, background:'none', border:'none', fontSize:22, color:'#64748b', cursor:'pointer'}} title="Cerrar">&times;</button>
        <h2 style={{fontWeight:700, color:'#2563eb', fontSize:'1.15rem', marginBottom:18, textAlign:'center'}}>Detalle del Cliente</h2>
        <div style={{marginBottom:10, textAlign:'center'}}>
          <span className={`clientes-badge ${cliente.tipo === 'Empresa' ? 'empresa' : 'individual'}`}>{cliente.tipo}</span>
        </div>
        <div style={{marginBottom:10}}><b style={{color:'#64748b'}}>Nombre:</b> <span style={{color:'#222'}}>{cliente.nombre}</span></div>
        <div style={{marginBottom:10}}><b style={{color:'#64748b'}}>Email:</b> <span style={{color:'#222'}}>{cliente.correo}</span></div>
        <div style={{marginBottom:10}}><b style={{color:'#64748b'}}>Teléfono:</b> <span style={{color:'#222'}}>{cliente.telefono}</span></div>
        <div style={{marginBottom:10}}><b style={{color:'#64748b'}}>Dirección:</b> <span style={{color:'#222'}}>{cliente.direccion}</span></div>
        <div style={{marginBottom:10}}><b style={{color:'#64748b'}}>Fecha de Registro:</b> <span style={{color:'#222'}}>{cliente.fechaCreacion}</span></div>
        {cliente.activo !== undefined && (
          <div style={{marginBottom:10}}><b style={{color:'#64748b'}}>Estado:</b> <span style={{color: cliente.activo ? '#10b981' : '#ef4444', fontWeight:600}}>{cliente.activo ? 'Activo' : 'Inactivo'}</span></div>
        )}
      </div>
    </div>
  );
}

// Modal de confirmación y notificación reutilizable
function ModalMensaje({ show, onClose, titulo, mensaje, onConfirm, children, tipo }) {
  if (!show) return null;
  const color = tipo === 'error' ? '#ef4444' : '#2563eb';
  const bg = tipo === 'error' ? '#ffeaea' : '#e0f2fe';
  const border = tipo === 'error' ? '#ef4444' : '#2563eb';
  return ReactDOM.createPortal(
    <div className="modal-overlay" style={{zIndex: 3000, position:'fixed', top:0, left:0, width:'100vw', height:'100vh', background:'rgba(30,41,59,0.18)', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <div className="modal-content modal-center" style={{maxWidth: 400, minWidth: 260, padding: '1.5rem 1.2rem', background:bg, borderRadius:16, boxShadow:'0 8px 32px rgba(59,130,246,0.18)', border: `2.5px solid ${border}`}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}}>
          <h3 style={{margin: 0, fontWeight: 700, fontSize: '1.2rem', color: color}}>{titulo}</h3>
          <button className="modal-close-btn" onClick={onClose} title="Cerrar" style={{background:'none', border:'none', fontSize:22, color:'#64748b', cursor:'pointer'}}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div style={{marginBottom: 18, fontSize: '1.08rem', color: '#222', fontWeight: 500}}>{mensaje}</div>
        {children ? (
          <div style={{textAlign: 'right'}}>{children}</div>
        ) : onConfirm ? (
          <div style={{textAlign: 'right', display:'flex', gap:12, justifyContent:'flex-end'}}>
            <button onClick={onClose} style={{background: '#9ca3af', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 22px', fontWeight: 600, cursor: 'pointer'}}>Cancelar</button>
            <button onClick={onConfirm} style={{background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, padding: '7px 22px', fontWeight: 600, cursor: 'pointer'}}>Eliminar</button>
          </div>
        ) : (
          <div style={{textAlign: 'right'}}>
            <button onClick={onClose} style={{background: color, color:'#fff', border: 'none', borderRadius: 6, padding: '7px 22px', fontWeight: 600, cursor: 'pointer'}}>Cerrar</button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

// Modal para editar cliente
function ModalEditarCliente({ show, form, onChange, onSubmit, onCancel, error }) {
  if (!show) return null;
  return ReactDOM.createPortal(
    <div className="modal-overlay" style={{zIndex: 3000, position:'fixed', top:0, left:0, width:'100vw', height:'100vh', background:'rgba(30,41,59,0.18)', display:'flex', alignItems:'center', justifyContent:'center'}}>
      <div className="modal-content modal-center" style={{maxWidth: 440, minWidth: 320, padding: '2rem 1.5rem', background:'#fff', borderRadius:16, boxShadow:'0 8px 32px rgba(59,130,246,0.18)'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12}}>
          <h3 style={{margin: 0, fontWeight: 700, fontSize: '1.15rem', color: '#2563eb'}}>Editar Cliente</h3>
          <button className="modal-close-btn" onClick={onCancel} title="Cerrar" style={{background:'none', border:'none', fontSize:22, color:'#64748b', cursor:'pointer'}}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form onSubmit={onSubmit} autoComplete="off">
          <div className="form-group">
            <label>Nombre del Cliente</label>
            <input name="nombre" value={form.nombre} onChange={onChange} required placeholder="Ingrese el nombre del cliente" style={{fontSize:16, borderRadius:8, padding:14, border:'1.5px solid #e2e8f0', background:'#f1f5f9'}} />
          </div>
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input name="correo" type="email" value={form.correo} onChange={onChange} required placeholder="Ingrese el correo electrónico" style={{fontSize:16, borderRadius:8, padding:14, border:'1.5px solid #e2e8f0', background:'#f1f5f9'}} />
          </div>
          <div className="form-group">
            <label>Teléfono</label>
            <input name="telefono" value={form.telefono} onChange={onChange} required placeholder="Ingrese el contacto" style={{fontSize:16, borderRadius:8, padding:14, border:'1.5px solid #e2e8f0', background:'#f1f5f9'}} />
          </div>
          <div className="form-group">
            <label>Dirección</label>
            <input name="direccion" value={form.direccion} onChange={onChange} placeholder="Ingrese la dirección" style={{fontSize:16, borderRadius:8, padding:14, border:'1.5px solid #e2e8f0', background:'#f1f5f9'}} />
          </div>
          <div className="form-group">
            <label>Tipo</label>
            <select name="tipo" value={form.tipo} onChange={onChange} style={{fontSize:16, borderRadius:8, padding:14, border:'1.5px solid #e2e8f0', background:'#f1f5f9'}}>
              <option value="Individual">Individual</option>
              <option value="Empresa">Empresa</option>
            </select>
          </div>
          <div className="form-buttons" style={{marginTop:18, gap:16}}>
            <button type="submit" style={{background:'#2563eb', color:'#fff', borderRadius:8, fontWeight:700, fontSize:16, padding:'12px 32px', border:'none', boxShadow:'0 2px 8px rgba(59,130,246,0.08)', transition:'background 0.2s'}}>Actualizar</button>
            <button type="button" style={{background:'#9ca3af', color:'#fff', borderRadius:8, fontWeight:700, fontSize:16, padding:'12px 32px', border:'none'}} onClick={onCancel}>Cancelar</button>
          </div>
        </form>
        {error && <div style={{color:'#ef4444', background:'#fef2f2', border:'1.5px solid #fecaca', borderRadius:8, padding:'10px 18px', marginTop:14, fontWeight:500, fontSize:15}}>{error}</div>}
      </div>
    </div>,
    document.body
  );
}

function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    segundoApellido: '',
    nit: '',
    fechaNacimiento: '',
    cargo: '',
    web: '',
    correo: '',
    telefono: '',
    movil: '',
    telTrabajo: '',
    direccionFiscal: '',
    poblacionFiscal: '',
    provinciaFiscal: '',
    cpFiscal: '',
    paisFiscal: '',
    direccionCorrespondencia: '',
    poblacionCorrespondencia: '',
    provinciaCorrespondencia: '',
    cpCorrespondencia: '',
    paisCorrespondencia: '',
    direccionEntrega: '',
    poblacionEntrega: '',
    provinciaEntrega: '',
    cpEntrega: '',
    paisEntrega: '',
    observaciones: '',
    tipo: 'Individual',
    imagen: null,
    imagenPreview: null
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [search, setSearch] = useState({ nombre: '', correo: '' });
  const [searchActive, setSearchActive] = useState(false);
  const [modalDetalle, setModalDetalle] = useState({ show: false, cliente: null });
  const [modal, setModal] = useState({ show: false, titulo: '', mensaje: '', onConfirm: null });
  const [editModal, setEditModal] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  // Estado para modal de éxito/error
  const [infoModal, setInfoModal] = useState({ show: false, titulo: '', mensaje: '', tipo: 'success' });

  // KPIs simulados y calculados
  const totalClientes = clientes.length;
  const empresas = clientes.filter(c => c.tipo === 'Empresa').length;
  const individuales = clientes.filter(c => c.tipo === 'Individual').length;
  // Simulación: nuevos este mes y activos (puedes conectar a datos reales)
  const nuevosMes = clientes.filter(c => {
    if (!c.fechaCreacion) return false;
    const fecha = new Date(c.fechaCreacion);
    const ahora = new Date();
    return fecha.getMonth() === ahora.getMonth() && fecha.getFullYear() === ahora.getFullYear();
  }).length;
  const activos = clientes.filter(c => c.activo !== false).length;
  const kpis = [
    { label: 'Total Clientes', value: totalClientes, icon: 'fas fa-users', color: 'primary' },
    { label: 'Nuevos este mes', value: nuevosMes, icon: 'fas fa-user-plus', color: 'success' },
    { label: 'Empresas', value: empresas, icon: 'fas fa-building', color: 'info' },
    { label: 'Individuales', value: individuales, icon: 'fas fa-user', color: 'secondary' },
    { label: 'Activos', value: activos, icon: 'fas fa-user-check', color: 'success' },
  ];

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const res = await fetch(API_URL, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });
      if (!res.ok) {
        setError('Error al obtener los clientes: ' + res.status);
        setClientes([]);
        return;
      }
      const text = await res.text();
      if (!text) {
        setError('La respuesta del servidor está vacía.');
        setClientes([]);
        return;
      }
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        setError('La respuesta del servidor no es un JSON válido.');
        setClientes([]);
        return;
      }
      setClientes(data);
    } catch (err) {
      setError('Error de red al obtener los clientes.');
      setClientes([]);
    }
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('jwt');
      const res = await fetch(editId ? `${API_URL}/${editId}` : API_URL, {
        method: editId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(form)
      });
      if (!res.ok) {
        const msg = await res.text();
        setInfoModal({ show: true, titulo: 'Error', mensaje: msg || 'Error al guardar el cliente.', tipo: 'error' });
        setTimeout(() => setInfoModal({ show: false, titulo: '', mensaje: '', tipo: 'success' }), 2500);
        return;
      }
      setForm({ nombre: '', correo: '', telefono: '', direccion: '', tipo: 'Individual' });
      setEditId(null);
      setInfoModal({ show: true, titulo: 'Éxito', mensaje: editId ? '¡Cliente editado correctamente!' : '¡Cliente agregado correctamente!', tipo: 'success' });
      setTimeout(() => setInfoModal({ show: false, titulo: '', mensaje: '', tipo: 'success' }), 2200);
      fetchClientes();
    } catch (err) {
      setInfoModal({ show: true, titulo: 'Error', mensaje: 'Error de red', tipo: 'error' });
      setTimeout(() => setInfoModal({ show: false, titulo: '', mensaje: '', tipo: 'success' }), 2500);
    }
  };

  const handleEdit = cliente => {
    setForm({
      id: cliente.id,
      nombre: cliente.nombre || '',
      correo: cliente.correo || '',
      telefono: cliente.telefono || '',
      direccion: cliente.direccion || '',
      tipo: cliente.tipo || 'Individual',
    });
    setEditId(cliente.id);
    setError('');
    setEditModal(true);
  };

  const handleEditModalClose = () => {
    setEditModal(false);
    setEditId(null);
    setForm({ nombre: '', correo: '', telefono: '', direccion: '', tipo: 'Individual' });
    setError('');
  };

  const handleEditSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const token = localStorage.getItem('jwt');
      const res = await fetch(`${API_URL}/${form.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(form)
      });
      if (!res.ok) {
        const msg = await res.text();
        setInfoModal({ show: true, titulo: 'Error', mensaje: msg || 'Error al editar el cliente.', tipo: 'error' });
        setTimeout(() => setInfoModal({ show: false, titulo: '', mensaje: '', tipo: 'success' }), 2500);
        return;
      }
      setEditModal(false);
      setInfoModal({ show: true, titulo: 'Éxito', mensaje: '¡Cliente editado correctamente!', tipo: 'success' });
      setTimeout(() => setInfoModal({ show: false, titulo: '', mensaje: '', tipo: 'success' }), 2200);
      fetchClientes();
    } catch (err) {
      setInfoModal({ show: true, titulo: 'Error', mensaje: 'Error de red', tipo: 'error' });
      setTimeout(() => setInfoModal({ show: false, titulo: '', mensaje: '', tipo: 'success' }), 2500);
    }
  };

  const handleDelete = id => {
    const cliente = clientes.find(c => c.id === id);
    setModal({
      show: true,
      titulo: 'Confirmar eliminación',
      mensaje: `¿Seguro que deseas eliminar a ${cliente?.nombre || 'este cliente'}?`,
      onConfirm: () => doDelete(id)
    });
  };

  const doDelete = async id => {
    setModal({ show: false });
    try {
      const token = localStorage.getItem('jwt');
      const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });
      if (!res.ok) {
        setModal({ show: true, titulo: 'Error', mensaje: 'No se pudo eliminar el cliente.' });
        return;
      }
      setModal({ show: true, titulo: 'Éxito', mensaje: '¡Cliente eliminado!' });
      fetchClientes();
    } catch (err) {
      setModal({ show: true, titulo: 'Error', mensaje: 'Error de red al eliminar.' });
    }
  };

  const handleCancel = () => {
    setForm({ nombre: '', correo: '', telefono: '', direccion: '', tipo: 'Individual' });
    setEditId(null);
    setError('');
  };

  // Búsqueda funcional
  const handleSearchChange = e => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const handleSearch = e => {
    e.preventDefault();
    setSearchActive(true);
  };

  const handleClearSearch = () => {
    setSearch({ nombre: '', correo: '' });
    setSearchActive(false);
  };

  let filteredClientes = clientes;
  if (searchActive && (search.nombre.trim() !== '' || search.correo.trim() !== '')) {
    filteredClientes = clientes.filter(c =>
      c.nombre.toLowerCase().includes(search.nombre.toLowerCase()) &&
      c.correo.toLowerCase().includes(search.correo.toLowerCase())
    );
  }

  // Exportar a Excel
  const exportarExcel = () => {
    const data = filteredClientes.map(c => ({
      ID: c.id,
      Nombre: c.nombre,
      Email: c.correo,
      Teléfono: c.telefono,
      Dirección: c.direccion,
      Tipo: c.tipo,
      'Fecha de Registro': c.fechaCreacion
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Clientes');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'clientes.xlsx');
  };
  // Exportar a CSV
  const exportarCSV = () => {
    const data = filteredClientes.map(c => ({
      ID: c.id,
      Nombre: c.nombre,
      Email: c.correo,
      Teléfono: c.telefono,
      Dirección: c.direccion,
      Tipo: c.tipo,
      'Fecha de Registro': c.fechaCreacion
    }));
    const ws = XLSX.utils.json_to_sheet(data);
    const csv = XLSX.utils.sheet_to_csv(ws);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'clientes.csv');
  };
  // Exportar a PDF
  const exportarPDF = () => {
    const doc = new jsPDF();
    const columns = [
      { header: 'ID', dataKey: 'id' },
      { header: 'Nombre', dataKey: 'nombre' },
      { header: 'Email', dataKey: 'correo' },
      { header: 'Teléfono', dataKey: 'telefono' },
      { header: 'Dirección', dataKey: 'direccion' },
      { header: 'Tipo', dataKey: 'tipo' },
      { header: 'Fecha de Registro', dataKey: 'fechaCreacion' }
    ];
    const rows = filteredClientes.map(c => ({
      id: c.id,
      nombre: c.nombre,
      correo: c.correo,
      telefono: c.telefono,
      direccion: c.direccion,
      tipo: c.tipo,
      fechaCreacion: c.fechaCreacion
    }));
    doc.autoTable({ columns, body: rows, styles: { fontSize: 9 }, headStyles: { fillColor: [59,130,246] } });
    doc.save('clientes.pdf');
  };

  // Manejar imagen/logo drag & drop y previsualización
  const handleImageChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, imagen: file, imagenPreview: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Definir las etapas y colores
  const etapasKanban = [
    { key: 'nuevo', label: 'Nuevo cliente', color: '#7c3aed' },
    { key: 'espera', label: 'En espera información', color: '#1e40af' },
    { key: 'asignado', label: 'Responsable asignado', color: '#06b6d4' },
    { key: 'progreso', label: 'En progreso', color: '#fde047' },
    { key: 'factura', label: 'Factura final', color: '#22d3ee' },
  ];
  // Simular campo etapa si no existe
  const clientesConEtapa = filteredClientes.map((c, i) => ({ ...c, etapa: c.etapa || etapasKanban[i % etapasKanban.length].key }));
  // Agrupar por etapa
  const clientesPorEtapa = etapasKanban.reduce((acc, etapa) => {
    acc[etapa.key] = clientesConEtapa.filter(c => c.etapa === etapa.key);
    return acc;
  }, {});
  // Renderizar columnas kanban

  return (
    <div className="clientes-container" style={{background:'#f8fafc', minHeight:'100vh', paddingTop:24}}>
      {/* Modales */}
      <ModalDetalleCliente show={modalDetalle.show} cliente={modalDetalle.cliente} onClose={() => setModalDetalle({ show: false, cliente: null })} />
      <ModalMensaje show={modal.show} onClose={() => setModal({ show: false })} titulo={modal.titulo} mensaje={modal.mensaje} onConfirm={modal.onConfirm} />
      <ModalEditarCliente show={editModal} form={form} onChange={handleChange} onSubmit={handleEditSubmit} onCancel={handleEditModalClose} error={error} />
      {infoModal.show && (
        <ModalMensaje 
          show={true} 
          onClose={() => setInfoModal({ show: false, titulo: '', mensaje: '', tipo: 'success' })} 
          titulo={infoModal.titulo} 
          mensaje={infoModal.mensaje} 
          tipo={infoModal.tipo} 
        />
      )}
      {/* 1. Título y KPIs */}
      <h2 className="clientes-kpi-title" style={{margin: '0 0 10px 0', fontWeight: 700, fontSize: '1.18rem', color: '#2563eb'}}>Resumen de Clientes</h2>
      <div className="clientes-kpi-grid">
        {kpis.map((kpi, idx) => (
          <div className={`clientes-kpi-card ${kpi.color}`} key={idx}>
            <div className="clientes-kpi-icon"><i className={kpi.icon}></i></div>
            <div className="clientes-kpi-value">{kpi.value}</div>
            <div className="clientes-kpi-label">{kpi.label}</div>
          </div>
        ))}
      </div>
      {/* 2. Formulario fijo de agregar cliente (ya implementado) */}
      {/* Reemplazar el formulario de agregar cliente por uno expandido, tipo ERP clásico, con barras azules de sección y botones centrados. */}
      {/* Unificar el formulario en un solo panel visual: */}
      <div className="clientes-form-card" style={{margin:'32px 0 24px 0', width:'100%', maxWidth:'none', background:'#fff', borderRadius:16, boxShadow:'0 8px 32px rgba(59,130,246,0.10)', padding:'0 32px 32px 32px'}}>
        {/* Barra azul de título principal */}
        <div style={{background:'#2563eb', color:'#fff', borderRadius:'16px 16px 0 0', padding:'18px 32px', fontWeight:800, fontSize:'1.18rem', letterSpacing:'0.5px', boxShadow:'0 2px 8px rgba(37,99,235,0.10)', display:'flex', alignItems:'center', gap:10, margin:'-1px -32px 0 -32px'}}>
          <i className="fas fa-user-plus" style={{fontSize:'1.3em'}}></i>
          Agregar Cliente
        </div>
        <form onSubmit={handleSubmit} autoComplete="off" style={{width:'100%'}} encType="multipart/form-data">
          {/* Sección: Datos generales */}
          <div style={{height:8}}></div>
          <div style={{background:'#2563eb', height:5, borderRadius:3, margin:'32px 0 18px 0', width:'100%', opacity:0.18}}></div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gap:'18px 24px', margin:'0'}}>
            <div className="form-group"><label>Nombre</label><input name="nombre" value={form.nombre} onChange={handleChange} required /></div>
            <div className="form-group"><label>Apellido</label><input name="apellido" value={form.apellido} onChange={handleChange} /></div>
            <div className="form-group"><label>Segundo Apellido</label><input name="segundoApellido" value={form.segundoApellido} onChange={handleChange} /></div>
            <div className="form-group"><label>NIT <span style={{color:'#ef4444'}}>*</span></label><input name="nit" value={form.nit} onChange={handleChange} required /></div>
            <div className="form-group"><label>Fecha de nacimiento</label><input name="fechaNacimiento" type="date" value={form.fechaNacimiento} onChange={handleChange} /></div>
            <div className="form-group"><label>Cargo</label><input name="cargo" value={form.cargo} onChange={handleChange} /></div>
            <div className="form-group"><label>Web</label><input name="web" value={form.web} onChange={handleChange} /></div>
            <div className="form-group"><label>Email</label><input name="correo" type="email" value={form.correo} onChange={handleChange} /></div>
            <div className="form-group"><label>Teléfono</label><input name="telefono" value={form.telefono} onChange={handleChange} /></div>
            <div className="form-group"><label>Móvil</label><input name="movil" value={form.movil} onChange={handleChange} /></div>
            <div className="form-group"><label>Tel. trabajo</label><input name="telTrabajo" value={form.telTrabajo} onChange={handleChange} /></div>
          </div>
          {/* Sección: Imagen/logo */}
          <div style={{background:'#2563eb', height:5, borderRadius:3, margin:'32px 0 18px 0', width:'100%', opacity:0.18}}></div>
          <div style={{display:'flex', alignItems:'center', gap:32, margin:'0 0 24px 0'}}>
            <div 
              className={`drag-drop-area${dragOver ? ' dragover' : ''}`}
              onDragOver={e => {e.preventDefault(); setDragOver(true);}}
              onDragLeave={e => {e.preventDefault(); setDragOver(false);}}
              onDrop={e => {e.preventDefault(); setDragOver(false); const file = e.dataTransfer.files[0]; if(file) handleImageChange({target:{files:[file]}});}}
              onClick={() => document.getElementById('input-imagen-cliente').click()}
              tabIndex={0}
              style={{userSelect:'none'}}
            >
              {form.imagenPreview ? (
                <img src={form.imagenPreview} alt="Previsualización" />
              ) : (
                <div className="drag-label">
                  Arrastra una imagen aquí o haz clic para seleccionar
                </div>
              )}
              <input type="file" accept="image/*" style={{display:'none'}} onChange={handleImageChange} id="input-imagen-cliente" />
              <button type="button" className="select-file-btn" onClick={e => {e.stopPropagation(); document.getElementById('input-imagen-cliente').click();}}>Seleccionar archivo</button>
            </div>
            <div style={{flex:1, color:'#64748b', fontSize:14}}>
              Puedes subir una foto o logo cuadrado del cliente. Formatos permitidos: JPG, PNG, GIF. Tamaño máximo recomendado: 2MB.
            </div>
          </div>
          {/* Sección: Direcciones */}
          <div style={{background:'#2563eb', height:5, borderRadius:3, margin:'32px 0 18px 0', width:'100%', opacity:0.18}}></div>
          <div style={{fontWeight:600, color:'#2563eb', margin:'0 0 8px 0'}}>Dirección fiscal</div>
          <div style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr', gap:'12px 18px', margin:'0'}}>
            <div className="form-group"><label>Dirección</label><input name="direccionFiscal" value={form.direccionFiscal} onChange={handleChange} /></div>
            <div className="form-group"><label>Población</label><input name="poblacionFiscal" value={form.poblacionFiscal} onChange={handleChange} /></div>
            <div className="form-group"><label>Provincia</label><input name="provinciaFiscal" value={form.provinciaFiscal} onChange={handleChange} /></div>
            <div className="form-group"><label>CP</label><input name="cpFiscal" value={form.cpFiscal} onChange={handleChange} /></div>
            <div className="form-group"><label>País</label><input name="paisFiscal" value={form.paisFiscal} onChange={handleChange} /></div>
          </div>
          <div style={{fontWeight:600, color:'#2563eb', margin:'32px 0 8px 0'}}>Dirección correspondencia</div>
          <div style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr', gap:'12px 18px', margin:'0'}}>
            <div className="form-group"><label>Dirección</label><input name="direccionCorrespondencia" value={form.direccionCorrespondencia} onChange={handleChange} /></div>
            <div className="form-group"><label>Población</label><input name="poblacionCorrespondencia" value={form.poblacionCorrespondencia} onChange={handleChange} /></div>
            <div className="form-group"><label>Provincia</label><input name="provinciaCorrespondencia" value={form.provinciaCorrespondencia} onChange={handleChange} /></div>
            <div className="form-group"><label>CP</label><input name="cpCorrespondencia" value={form.cpCorrespondencia} onChange={handleChange} /></div>
            <div className="form-group"><label>País</label><input name="paisCorrespondencia" value={form.paisCorrespondencia} onChange={handleChange} /></div>
          </div>
          <div style={{fontWeight:600, color:'#2563eb', margin:'32px 0 8px 0'}}>Dirección entrega</div>
          <div style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr', gap:'12px 18px', margin:'0'}}>
            <div className="form-group"><label>Dirección</label><input name="direccionEntrega" value={form.direccionEntrega} onChange={handleChange} /></div>
            <div className="form-group"><label>Población</label><input name="poblacionEntrega" value={form.poblacionEntrega} onChange={handleChange} /></div>
            <div className="form-group"><label>Provincia</label><input name="provinciaEntrega" value={form.provinciaEntrega} onChange={handleChange} /></div>
            <div className="form-group"><label>CP</label><input name="cpEntrega" value={form.cpEntrega} onChange={handleChange} /></div>
            <div className="form-group"><label>País</label><input name="paisEntrega" value={form.paisEntrega} onChange={handleChange} /></div>
          </div>
          {/* Sección: Observaciones */}
          <div style={{background:'#2563eb', height:5, borderRadius:3, margin:'32px 0 18px 0', width:'100%', opacity:0.18}}></div>
          <div className="form-group" style={{margin:'0'}}>
            <label>Observaciones</label>
            <textarea name="observaciones" value={form.observaciones} onChange={handleChange} rows={3} style={{width:'100%', borderRadius:8, border:'1.5px solid #e2e8f0', padding:14, fontSize:15, background:'#f1f5f9', resize:'vertical'}} />
          </div>
          {/* Botones centrados */}
          <div className="form-buttons" style={{marginTop:32, gap:16, justifyContent:'center', display:'flex'}}>
            <button type="submit" style={{background:'#2563eb', color:'#fff', borderRadius:8, fontWeight:700, fontSize:16, padding:'12px 32px', border:'none', boxShadow:'0 2px 8px rgba(59,130,246,0.08)', transition:'background 0.2s'}}>Guardar</button>
            <button type="button" style={{background:'#9ca3af', color:'#fff', borderRadius:8, fontWeight:700, fontSize:16, padding:'12px 32px', border:'none'}} onClick={handleCancel}>Limpiar</button>
          </div>
          {error && !editModal && <div style={{color:'#ef4444', background:'#fef2f2', border:'1.5px solid #fecaca', borderRadius:8, padding:'10px 18px', marginTop:14, fontWeight:500, fontSize:15}}>{error}</div>}
        </form>
      </div>
      {/* 3. Búsqueda/filtros y tabla (ya implementados) */}
      <div className="clientes-search-section">
        <h2>Búsqueda y Filtros Avanzados</h2>
        <p>Busca clientes por nombre, email, tipo, teléfono o NIT. Puedes combinar varios filtros para una búsqueda precisa.</p>
        {/* Chips de filtros activos */}
        <div style={{marginBottom: 8}}>
          {Object.entries(search).filter(([k,v]) => v && k!=='tipo').map(([key, value]) => (
            <span className="filtro-chip" key={key} title={`Quitar filtro de ${key}`}
              onClick={() => setSearch({...search, [key]: ''})}>
              {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
              <span className="chip-close">&times;</span>
            </span>
          ))}
          {search.tipo && (
            <span className="filtro-chip" key="tipo" title="Quitar filtro de tipo"
              onClick={() => setSearch({...search, tipo: ''})}>
              Tipo: {search.tipo}
              <span className="chip-close">&times;</span>
            </span>
          )}
        </div>
        <form onSubmit={handleSearch} autoComplete="off">
          <div className="search-grid">
            <div className="form-group" style={{marginBottom:0}}>
              <label>Nombre</label>
              <input name="nombre" value={search.nombre} onChange={handleSearchChange} placeholder="Buscar cliente..." autoComplete="off" />
            </div>
            <div className="form-group" style={{marginBottom:0}}>
              <label>Email</label>
              <input name="correo" value={search.correo} onChange={handleSearchChange} placeholder="Buscar email..." autoComplete="off" />
            </div>
            <div className="form-group" style={{marginBottom:0}}>
              <label>Teléfono</label>
              <input name="telefono" value={search.telefono || ''} onChange={handleSearchChange} placeholder="Buscar teléfono..." autoComplete="off" />
            </div>
            <div className="form-group" style={{marginBottom:0}}>
              <label>NIT</label>
              <input name="nit" value={search.nit || ''} onChange={handleSearchChange} placeholder="Buscar NIT..." autoComplete="off" />
            </div>
            <div className="form-group" style={{marginBottom:0}}>
              <label>Tipo</label>
              <select name="tipo" value={search.tipo || ''} onChange={e => setSearch({...search, tipo: e.target.value})}>
                <option value="">Todos</option>
                <option value="Individual">Individual</option>
                <option value="Empresa">Empresa</option>
              </select>
            </div>
          </div>
          <div className="form-buttons">
            <button type="submit">Buscar</button>
            <button type="button" onClick={handleClearSearch}>Limpiar filtros</button>
          </div>
        </form>
      </div>
      {/* Tabla de clientes */}
      {/* Reemplazo la tabla de clientes por tarjetas tipo kanban */}
      <div className="clientes-table-section" style={{background:'#fff', borderRadius:16, boxShadow:'0 8px 32px rgba(59,130,246,0.10)', padding:'24px 12px 18px 12px', marginBottom:32, overflowX:'auto'}}>
        <h2 style={{fontWeight:700, color:'#2563eb', fontSize:'1.08rem', marginBottom:10}}>Clientes (Kanban)</h2>
        <div className="clientes-kanban-grid" style={{display:'flex', gap:'22px', alignItems:'flex-start', overflowX:'auto', padding:'10px 0'}}>
          {etapasKanban.map(etapa => (
            <div key={etapa.key} style={{minWidth:320, maxWidth:360, flex:'1 1 320px', background:'#f8fafc', borderRadius:12, border:'2.5px solid #e0e7ef', boxShadow:'0 2px 12px rgba(59,130,246,0.06)', display:'flex', flexDirection:'column', height:'100%'}}>
              <div style={{background:etapa.color, color:'#fff', fontWeight:700, fontSize:'1.08em', borderRadius:'12px 12px 0 0', padding:'14px 18px', marginBottom:6, letterSpacing:0.2}}>{etapa.label} <span style={{fontWeight:400, fontSize:'0.95em'}}>({clientesPorEtapa[etapa.key].length})</span></div>
              <div style={{display:'flex', flexDirection:'column', gap:'16px', padding:'8px 6px 12px 6px'}}>
                {clientesPorEtapa[etapa.key].length === 0 ? (
                  <div style={{textAlign: 'center', color: '#888', width:'100%'}}>Sin clientes</div>
                ) : (
                  clientesPorEtapa[etapa.key].map(cliente => (
                    <div key={cliente.id} className="cliente-card-grid" style={{
                      background:'#fff',
                      borderRadius:'10px',
                      boxShadow:'0 2px 8px rgba(59,130,246,0.07)',
                      border:'1.5px solid #e0e7ef',
                      display:'grid',
                      gridTemplateColumns:'64px 1fr',
                      gap:'12px',
                      alignItems:'center',
                      padding:'10px 12px',
                      minHeight:'100px',
                      position:'relative',
                    }}>
                      {/* Foto/logo */}
                      <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                        {cliente.imagenPreview || cliente.imagen ? (
                          <img src={cliente.imagenPreview || cliente.imagen} alt="Logo" style={{width:48, height:48, objectFit:'cover', borderRadius:8, border:'2px solid #2563eb', background:'#f1f5fa'}} />
                        ) : (
                          <div style={{width:48, height:48, borderRadius:8, background:'#e0e7ef', display:'flex', alignItems:'center', justifyContent:'center', color:'#2563eb', fontWeight:700, fontSize:22, border:'2px solid #e0e7ef'}}>
                            <i className="fas fa-user"></i>
                          </div>
                        )}
                      </div>
                      {/* Info principal */}
                      <div style={{display:'flex', flexDirection:'column', gap:2}}>
                        <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:2}}>
                          <span className={`clientes-badge ${cliente.tipo === 'Empresa' ? 'empresa' : 'individual'}`}>{cliente.tipo}</span>
                          <span style={{fontWeight:700, color:'#2563eb', fontSize:'1.05em'}}>{cliente.nombre}</span>
                        </div>
                        <div style={{color:'#64748b', fontSize:13}}><b>Email:</b> {cliente.correo}</div>
                        <div style={{color:'#64748b', fontSize:13}}><b>Teléfono:</b> {cliente.telefono}</div>
                        <div style={{color:'#64748b', fontSize:13}}><b>Dirección:</b> {cliente.direccion || cliente.direccionFiscal || '-'}</div>
                        <div style={{color:'#64748b', fontSize:12, marginTop:2}}><b>Fecha registro:</b> {cliente.fechaCreacion}</div>
                        <div style={{display:'flex', gap:6, marginTop:6}}>
                          <button className="edit-btn" title="Editar cliente" onClick={() => handleEdit(cliente)} style={{display:'flex', alignItems:'center', gap:5}}><i className="fa fa-edit"></i> Editar</button>
                          <button className="delete-btn" title="Eliminar cliente" onClick={() => setModal({ show: true, titulo: 'Eliminar cliente', mensaje: '¿Seguro que deseas eliminar este cliente?', onConfirm: () => handleDelete(cliente.id) })}><i className="fa fa-trash"></i></button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ClientesPage; 