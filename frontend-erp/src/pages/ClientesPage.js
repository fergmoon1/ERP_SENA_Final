import React, { useEffect, useState } from 'react';
import '../styles/clientes.css';

const API_URL = 'http://localhost:8081/api/clientes';

const tipoOptions = [
  { value: 'Individual', label: 'Individual' },
  { value: 'Empresa', label: 'Empresa' }
];

function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    direccion: '',
    tipo: 'Individual',
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [search, setSearch] = useState({ nombre: '', correo: '' });
  const [searchActive, setSearchActive] = useState(false);

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
        setError(msg);
        return;
      }
      setForm({ nombre: '', correo: '', telefono: '', direccion: '', tipo: 'Individual' });
      setEditId(null);
      fetchClientes();
    } catch (err) {
      setError('Error de red');
    }
  };

  const handleEdit = cliente => {
    setForm({
      nombre: cliente.nombre || '',
      correo: cliente.correo || '',
      telefono: cliente.telefono || '',
      direccion: cliente.direccion || '',
      tipo: cliente.tipo || 'Individual',
    });
    setEditId(cliente.id);
    setError('');
  };

  const handleDelete = async id => {
    if (!window.confirm('¿Seguro que deseas eliminar este cliente?')) return;
    const token = localStorage.getItem('jwt');
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': token ? `Bearer ${token}` : ''
      }
    });
    fetchClientes();
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

  return (
    <div className="clientes-container">
      <div className="clientes-header">
        <h1>Clientes</h1>
        <nav>
          <a href="#">Home</a> / <span>Clientes</span>
        </nav>
      </div>

      {/* Formulario Agregar/Editar */}
      <div className="clientes-form-section">
        <h2>Agregar/Editar Cliente</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre del Cliente</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Ingrese el nombre del cliente" />
          </div>
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input name="correo" type="email" value={form.correo} onChange={handleChange} required placeholder="Ingrese el correo electrónico" />
          </div>
          <div className="form-group">
            <label>Teléfono</label>
            <input name="telefono" value={form.telefono} onChange={handleChange} required placeholder="Ingrese el contacto" />
          </div>
          <div className="form-group">
            <label>Dirección</label>
            <input name="direccion" value={form.direccion} onChange={handleChange} placeholder="Ingrese la dirección" />
          </div>
          <div className="form-group">
            <label>Tipo</label>
            <select name="tipo" value={form.tipo} onChange={handleChange}>
              {tipoOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="form-buttons">
            <button type="submit">{editId ? 'Actualizar' : 'Guardar'}</button>
            {editId && <button type="button" onClick={handleCancel}>Cancelar</button>}
          </div>
        </form>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>

      {/* Sección de búsqueda */}
      <div className="clientes-search-section">
        <h2>Buscar Clientes</h2>
        <form onSubmit={handleSearch}>
          <div className="search-grid">
            <div className="form-group">
              <label>Nombre</label>
              <input name="nombre" value={search.nombre} onChange={handleSearchChange} placeholder="Ingrese el nombre a buscar" />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input name="correo" value={search.correo} onChange={handleSearchChange} placeholder="Ingrese el email a buscar" />
            </div>
          </div>
          <div className="form-buttons" style={{marginTop: '12px'}}>
            <button type="submit">Buscar</button>
            <button type="button" style={{background: '#9ca3af', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '4px', fontWeight: 500, cursor: 'pointer'}} onClick={handleClearSearch}>Limpiar filtros</button>
          </div>
        </form>
      </div>

      {/* Tabla de clientes */}
      <div className="clientes-table-section">
        <h2>Lista de Clientes</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Dirección</th>
              <th>Tipo</th>
              <th>Fecha de Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredClientes.length === 0 ? (
              <tr>
                <td colSpan="8" style={{textAlign: 'center', color: '#888'}}>No hay clientes para mostrar.</td>
              </tr>
            ) : (
              filteredClientes.map(cliente => (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.correo}</td>
                  <td>{cliente.telefono}</td>
                  <td>{cliente.direccion}</td>
                  <td>{cliente.tipo}</td>
                  <td>{cliente.fechaCreacion}</td>
                  <td className="acciones">
                    <button className="edit-btn" onClick={() => handleEdit(cliente)}>
                      <i className="fa fa-edit"></i> Editar
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(cliente.id)}>
                      <i className="fa fa-trash"></i> Eliminar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientesPage; 