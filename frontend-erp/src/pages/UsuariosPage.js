import React, { useEffect, useState } from 'react';
import '../styles/clientes.css';
import FileUpload from '../components/FileUpload';
import { useNotifications } from '../components/NotificationProvider';
import CustomModal from '../components/CustomModal';

const API_URL = 'http://localhost:8081/api/usuarios';

const rolOptions = [
  { value: 'Admin', label: 'Admin' },
  { value: 'Usuario', label: 'Usuario' },
  { value: 'Supervisor', label: 'Supervisor' }
];

function UsuariosPage() {
  const { addNotification } = useNotifications();
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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [passwordPolicy, setPasswordPolicy] = useState({
    minLength: 8,
    requireUpper: true,
    requireLower: true,
    requireNumber: true,
    requireSymbol: true
  });
  const [showForm, setShowForm] = useState(false); // Nuevo estado para controlar la visibilidad del formulario

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
    if (avatarUrl) {
      addNotification({
        type: 'success',
        title: 'Avatar',
        message: 'Imagen de avatar subida con éxito.'
      });
    }
  };

  // Función para validar contraseña según la política
  const validatePassword = (password) => {
    const errors = [];
    const validations = [];
    
    if (password.length < passwordPolicy.minLength) {
      errors.push(`Mínimo ${passwordPolicy.minLength} caracteres`);
      validations.push({ rule: 'length', valid: false });
    } else {
      validations.push({ rule: 'length', valid: true });
    }
    
    if (passwordPolicy.requireUpper && !password.match(/[A-Z]/)) {
      errors.push('Al menos una mayúscula');
      validations.push({ rule: 'upper', valid: false });
    } else if (passwordPolicy.requireUpper) {
      validations.push({ rule: 'upper', valid: true });
    }
    
    if (passwordPolicy.requireLower && !password.match(/[a-z]/)) {
      errors.push('Al menos una minúscula');
      validations.push({ rule: 'lower', valid: false });
    } else if (passwordPolicy.requireLower) {
      validations.push({ rule: 'lower', valid: true });
    }
    
    if (passwordPolicy.requireNumber && !password.match(/[0-9]/)) {
      errors.push('Al menos un número');
      validations.push({ rule: 'number', valid: false });
    } else if (passwordPolicy.requireNumber) {
      validations.push({ rule: 'number', valid: true });
    }
    
    if (passwordPolicy.requireSymbol && !password.match(/[^a-zA-Z0-9]/)) {
      errors.push('Al menos un símbolo especial');
      validations.push({ rule: 'symbol', valid: false });
    } else if (passwordPolicy.requireSymbol) {
      validations.push({ rule: 'symbol', valid: true });
    }
    
    setPasswordErrors(errors);
    return errors.length === 0;
  };

  // Función para manejar cambios en el campo de contraseña
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setForm({ ...form, password });
    
    if (password) {
      validatePassword(password);
    } else {
      setPasswordErrors([]);
    }
  };

  // Función para obtener la clase CSS del campo de contraseña
  const getPasswordFieldClass = () => {
    if (!form.password) return '';
    const isValid = passwordErrors.length === 0;
    return isValid ? 'valid' : 'error';
  };

  // Función para verificar si un requisito específico se cumple
  const isRequirementMet = (requirement) => {
    if (!form.password) return false;
    
    switch (requirement) {
      case 'length':
        return form.password.length >= passwordPolicy.minLength;
      case 'upper':
        return passwordPolicy.requireUpper && form.password.match(/[A-Z]/);
      case 'lower':
        return passwordPolicy.requireLower && form.password.match(/[a-z]/);
      case 'number':
        return passwordPolicy.requireNumber && form.password.match(/[0-9]/);
      case 'symbol':
        return passwordPolicy.requireSymbol && form.password.match(/[^a-zA-Z0-9]/);
      default:
        return false;
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    
    // Validar contraseña antes de enviar
    if (form.password && !validatePassword(form.password)) {
      setError('La contraseña no cumple con los requisitos de seguridad.');
      return;
    }
    
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

      if (res.ok) {
        const data = await res.json();
        setForm({
          nombre: '',
          correo: '',
          password: '',
          rol: 'Usuario',
          avatar: '',
        });
        setEditId(null);
        setShowPassword(false);
        fetchUsuarios();
        
        // Mostrar modal de éxito
        setSuccessMessage(editId ? 'Usuario actualizado con éxito.' : 'Usuario creado con éxito.');
        setShowSuccessModal(true);
        
        // Mostrar notificación
        addNotification({
          type: 'success',
          title: 'Éxito',
          message: editId ? 'Usuario actualizado correctamente.' : 'Usuario creado correctamente.'
        });
        
        // Actualizar lista
        fetchUsuarios();
      } else {
        const errorData = await res.text();
        let errorMessage = 'Error al guardar el usuario.';
        
        try {
          const errorJson = JSON.parse(errorData);
          errorMessage = errorJson.message || errorJson.error || errorMessage;
        } catch {
          // Si no es JSON, usar el texto directo
          if (errorData.includes('política de seguridad')) {
            errorMessage = 'La contraseña no cumple con la política de seguridad establecida.';
          } else if (errorData.includes('correo')) {
            errorMessage = 'El correo electrónico ya está en uso.';
          } else {
            errorMessage = errorData || errorMessage;
          }
        }
        
        setError(errorMessage);
        addNotification({
          type: 'error',
          title: 'Error',
          message: errorMessage
        });
      }
    } catch (err) {
      setError('Error de conexión. Inténtalo de nuevo.');
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Error de conexión. Inténtalo de nuevo.'
      });
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

  const handleLimpiar = () => {
    setForm({ nombre: '', correo: '', password: '', rol: 'Usuario', avatar: '' });
    setEditId(null);
    setError('');
    setShowPassword(false);
  };

  // Determinar modo edición o creación
  const isEditMode = editId !== null;

  return (
    <div className="usuarios-page">
      <div className="clientes-header">
        {/* <h1>Usuarios</h1> */}
      </div>

      {/* Formulario Agregar/Editar */}
      {showForm && (
        <div className="form-overlay">
          <div className="form-container">
            <h2>{isEditMode ? 'Editar Usuario' : 'Crear Usuario'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={e => setForm({...form, nombre: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Correo:</label>
                <input
                  type="email"
                  value={form.correo}
                  onChange={e => setForm({...form, correo: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contraseña:</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handlePasswordChange}
                  placeholder={isEditMode ? "(Opcional) Cambiar contraseña" : "Ingrese una contraseña"}
                  className={getPasswordFieldClass()}
                  style={{ paddingRight: '50px' }}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {form.password && (
                <div className="password-errors">
                  <small>Requisitos de Seguridad</small>
                  <ul>
                    <li className={`error-item ${isRequirementMet('length') ? 'valid' : ''}`}>
                      Mínimo {passwordPolicy.minLength} caracteres de longitud
                    </li>
                    <li className={`error-item ${isRequirementMet('upper') ? 'valid' : ''}`}>
                      Al menos una letra mayúscula (A-Z)
                    </li>
                    <li className={`error-item ${isRequirementMet('lower') ? 'valid' : ''}`}>
                      Al menos una letra minúscula (a-z)
                    </li>
                    <li className={`error-item ${isRequirementMet('number') ? 'valid' : ''}`}>
                      Al menos un número (0-9)
                    </li>
                    <li className={`error-item ${isRequirementMet('symbol') ? 'valid' : ''}`}>
                      Al menos un carácter especial (!@#$%^&*)
                    </li>
                  </ul>
                  <div style={{ 
                    marginTop: '8px', 
                    fontSize: '11px', 
                    color: '#6c757d',
                    textAlign: 'center',
                    paddingTop: '8px',
                    borderTop: '1px solid #dee2e6'
                  }}>
                    {passwordErrors.length === 0 ? 
                      '✅ Contraseña segura' : 
                      `${passwordErrors.length} requisito${passwordErrors.length !== 1 ? 's' : ''} pendiente${passwordErrors.length !== 1 ? 's' : ''}`
                    }
                  </div>
                </div>
              )}
              <div className="form-group">
                <label>Rol:</label>
                <select
                  value={form.rol}
                  onChange={e => setForm({...form, rol: e.target.value})}
                >
                  <option value="USER">Usuario</option>
                  <option value="SUPERVISOR">Supervisor</option>
                  <option value="ADMIN">Administrador</option>
                </select>
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    checked={form.activo}
                    onChange={e => setForm({...form, activo: e.target.checked})}
                  />
                  Activo
                </label>
              </div>
              <div className="form-group">
                <label>Avatar:</label>
                <FileUpload onUpload={handleAvatarUpload} />
              </div>
              {error && <div className="error-message">{error}</div>}
              <div className="form-buttons">
                <button type="submit" className="btn btn-primary">
                  {isEditMode ? 'Actualizar' : 'Crear'}
                </button>
                <button type="button" className="btn btn-secondary" onClick={handleLimpiar}>
                  Limpiar
                </button>
                <button type="button" className="btn btn-cancel" onClick={() => setShowForm(false)}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
      <CustomModal
        show={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="¡Éxito!"
      >
        <div style={{textAlign: 'center', fontSize: '1.15em', color: '#2563eb', fontWeight: 600, padding: '10px 0'}}>
          {successMessage}
        </div>
      </CustomModal>
    </div>
  );
}

export default UsuariosPage; 