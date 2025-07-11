import React, { useEffect, useState } from 'react';
import '../styles/clientes.css';
import FileUpload from '../components/FileUpload';

const API_URL = 'http://localhost:8081/api/usuarios';

const rolOptions = [
  { value: 'Admin', label: 'Admin' },
  { value: 'Usuario', label: 'Usuario' },
  { value: 'Supervisor', label: 'Supervisor' }
];

function UsuariosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    password: '',
    rol: 'Usuario',
    avatar: '',
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const res = await fetch(API_URL, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });
      if (!res.ok) {
        setError('Error al obtener los usuarios: ' + res.status);
        setUsuarios([]);
        return;
      }
      const text = await res.text();
      if (!text) {
        setError('La respuesta del servidor está vacía.');
        setUsuarios([]);
        return;
      }
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        setError('La respuesta del servidor no es un JSON válido.');
        setUsuarios([]);
        return;
      }
      setUsuarios(data);
    } catch (err) {
      setError('Error de red al obtener los usuarios.');
      setUsuarios([]);
    }
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarUpload = (avatarUrl) => {
    setForm({ ...form, avatar: avatarUrl });
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
      setForm({ nombre: '', correo: '', password: '', rol: 'Usuario', avatar: '' });
      setEditId(null);
      setShowPassword(false);
      fetchUsuarios();
    } catch (err) {
      setError('Error de red');
    }
  };

  const handleEdit = usuario => {
    setForm({
      nombre: usuario.nombre || '',
      correo: usuario.correo || '',
      password: '',
      rol: usuario.rol || 'Usuario',
      avatar: usuario.avatar || '',
    });
    setEditId(usuario.id);
    setError('');
  };

  const handleDelete = async id => {
    if (!window.confirm('¿Seguro que deseas eliminar este usuario?')) return;
    const token = localStorage.getItem('jwt');
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': token ? `Bearer ${token}` : ''
      }
    });
    fetchUsuarios();
  };

  const handleCancel = () => {
    setForm({ nombre: '', correo: '', password: '', rol: 'Usuario', avatar: '' });
    setEditId(null);
    setError('');
    setShowPassword(false);
  };

  return (
    <div className="clientes-container">
      <div className="clientes-header">
        {/* <h1>Usuarios</h1> */}
      </div>

      {/* Formulario Agregar/Editar */}
      <div className="clientes-form-section">
        <h2>Agregar/Editar Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre del Usuario</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Ingrese el nombre del usuario" />
          </div>
          <div className="form-group">
            <label>Correo Electrónico</label>
            <input name="correo" type="email" value={form.correo} onChange={handleChange} required placeholder="Ingrese el correo electrónico" />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <div style={{ position: 'relative' }}>
              <input 
                name="password" 
                type={showPassword ? 'text' : 'password'} 
                value={form.password} 
                onChange={handleChange} 
                placeholder="Ingrese una nueva contraseña"
                style={{ paddingRight: '50px' }}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  fontSize: '16px',
                  cursor: 'pointer',
                  color: '#6b7280',
                  padding: '4px',
                  borderRadius: '4px',
                  transition: 'color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.color = '#2563eb'}
                onMouseLeave={(e) => e.target.style.color = '#6b7280'}
                title={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>
          <div className="form-group">
            <label>Rol</label>
            <select name="rol" value={form.rol} onChange={handleChange}>
              {rolOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Avatar</label>
            <FileUpload 
              onFileUpload={handleAvatarUpload}
              currentAvatar={form.avatar}
            />
          </div>
          <div className="form-buttons">
            <button type="submit">{editId ? 'Actualizar' : 'Guardar'}</button>
            {editId && <button type="button" onClick={handleCancel}>Cancelar</button>}
          </div>
        </form>
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>

      {/* Tabla de usuarios */}
      <div className="clientes-table-section">
        <h2>Lista de Usuarios</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length === 0 ? (
              <tr>
                <td colSpan="5" style={{textAlign: 'center', color: '#888'}}>No hay usuarios para mostrar.</td>
              </tr>
            ) : (
              usuarios.map(usuario => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.correo}</td>
                  <td>{usuario.rol}</td>
                  <td className="acciones">
                    <button className="edit-btn" onClick={() => handleEdit(usuario)}>
                      <i className="fa fa-edit"></i> Editar
                    </button>
                    <button className="delete-btn" onClick={() => handleDelete(usuario.id)}>
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

export default UsuariosPage; 