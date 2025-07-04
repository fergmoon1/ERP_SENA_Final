import React, { useState, useEffect } from 'react';
import '../styles/clientes.css';

function ConfiguracionPage() {
  // Estado para los parámetros del sistema
  const [params, setParams] = useState({
    stockBajo: 10,
    diasRetencion: 30,
    moneda: 'USD',
    iva: 19
  });
  const [historial, setHistorial] = useState([]); // Aquí se cargaría el historial real
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [userError, setUserError] = useState('');
  const [userSuccess, setUserSuccess] = useState('');
  // Estado para roles y permisos (simulado)
  const [rolesPermisos, setRolesPermisos] = useState([]);
  const [rolesMsg, setRolesMsg] = useState('');
  const [rolesMsgType, setRolesMsgType] = useState(''); // 'success' o 'error'
  // Estado para políticas de contraseña
  const [passwordPolicy, setPasswordPolicy] = useState({
    minLength: 8,
    requireUpper: true,
    requireLower: true,
    requireNumber: true,
    requireSymbol: false,
    expireDays: 90
  });
  const [policyMsg, setPolicyMsg] = useState('');
  const [policyMsgType, setPolicyMsgType] = useState('');
  // Estado para personalización visual
  const [visualConfig, setVisualConfig] = useState({
    logo: null,
    logoPreview: null,
    colorPrimario: '#2563eb',
    colorSecundario: '#374151',
    tema: 'claro',
    formatoFecha: 'dd/MM/yyyy',
    formatoHora: '24h'
  });
  const [visualMsg, setVisualMsg] = useState('');
  const [visualMsgType, setVisualMsgType] = useState('');
  // Estado para modal de cambio de contraseña
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    password: '',
    confirmPassword: '',
    userId: null,
    userName: ''
  });
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    symbol: false,
    match: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = e => {
    setParams({ ...params, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSuccess('Cambios guardados correctamente.');
    setError('');
    // Aquí iría la lógica para guardar en backend y actualizar historial
  };

  useEffect(() => {
    fetchUsuarios();
    fetchRolesPermisos();
    fetchPasswordPolicy();
    fetchVisualConfig();
  }, []);

  useEffect(() => {
    if (userError || userSuccess) {
      const timer = setTimeout(() => {
        setUserError('');
        setUserSuccess('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [userError, userSuccess]);

  const fetchUsuarios = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const res = await fetch('http://localhost:8081/api/usuarios', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });
      if (!res.ok) {
        setUserError('Error al obtener los usuarios: ' + res.status);
        setUsuarios([]);
        return;
      }
      const text = await res.text();
      if (!text) {
        setUserError('La respuesta del servidor está vacía.');
        setUsuarios([]);
        return;
      }
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        setUserError('La respuesta del servidor no es un JSON válido.');
        setUsuarios([]);
        return;
      }
      setUsuarios(data);
    } catch (err) {
      setUserError('Error de red al obtener los usuarios.');
      setUsuarios([]);
    }
  };

  const handleRoleChange = async (id, newRol) => {
    setUserError(''); setUserSuccess('');
    try {
      const token = localStorage.getItem('jwt');
      const usuario = usuarios.find(u => u.id === id);
      const res = await fetch(`http://localhost:8081/api/usuarios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({ ...usuario, rol: newRol })
      });
      if (!res.ok) {
        setUserError('Error al cambiar el rol.');
        return;
      }
      setUserSuccess('Rol actualizado.');
      fetchUsuarios();
    } catch {
      setUserError('Error de red al cambiar el rol.');
    }
  };

  const handleToggleActivo = async (id, activo) => {
    setUserError(''); setUserSuccess('');
    // Actualizar estado local inmediatamente
    setUsuarios(prevUsuarios => prevUsuarios.map(u => u.id === id ? { ...u, activo: !activo } : u));
    try {
      const token = localStorage.getItem('jwt');
      const usuario = usuarios.find(u => u.id === id);
      const res = await fetch(`http://localhost:8081/api/usuarios/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({ ...usuario, activo: !activo })
      });
      if (!res.ok) {
        // Revertir el cambio local si hay error
        setUsuarios(prevUsuarios => prevUsuarios.map(u => u.id === id ? { ...u, activo: activo } : u));
        setUserError('Error al cambiar el estado.');
        return;
      }
      setUserSuccess('Estado actualizado.');
      fetchUsuarios();
    } catch {
      // Revertir el cambio local si hay error
      setUsuarios(prevUsuarios => prevUsuarios.map(u => u.id === id ? { ...u, activo: activo } : u));
      setUserError('Error de red al cambiar el estado.');
    }
  };

  const handleForcePassword = (id, activo, userName) => {
    setUserError(''); setUserSuccess('');
    if (!activo) {
      setUserError('Debes activar el usuario antes de cambiar la contraseña.');
      return;
    }
    setPasswordForm({
      password: '',
      confirmPassword: '',
      userId: id,
      userName: userName
    });
    setPasswordValidation({
      length: false,
      upper: false,
      lower: false,
      number: false,
      symbol: false,
      match: false
    });
    setShowPasswordModal(true);
  };

  const validatePassword = (password, confirmPassword) => {
    const validation = {
      length: password.length >= passwordPolicy.minLength,
      upper: passwordPolicy.requireUpper ? /[A-Z]/.test(password) : true,
      lower: passwordPolicy.requireLower ? /[a-z]/.test(password) : true,
      number: passwordPolicy.requireNumber ? /\d/.test(password) : true,
      symbol: passwordPolicy.requireSymbol ? /[!@#$%^&*(),.?":{}|<>]/.test(password) : true,
      match: password === confirmPassword && password !== ''
    };
    setPasswordValidation(validation);
    return Object.values(validation).every(v => v);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
    
    if (name === 'password' || name === 'confirmPassword') {
      validatePassword(
        name === 'password' ? value : passwordForm.password,
        name === 'confirmPassword' ? value : passwordForm.confirmPassword
      );
    }
  };

  const handleSubmitPassword = async () => {
    if (!validatePassword(passwordForm.password, passwordForm.confirmPassword)) {
      setUserError('Por favor, verifica que la contraseña cumpla con todos los requisitos.');
      return;
    }

    try {
      const token = localStorage.getItem('jwt');
      const res = await fetch(`http://localhost:8081/api/usuarios/${passwordForm.userId}/password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify({ password: passwordForm.password })
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        setUserError(errorText || 'Error al cambiar la contraseña.');
        return;
      }
      
      setUserSuccess('Contraseña actualizada correctamente.');
      setShowPasswordModal(false);
      setPasswordForm({
        password: '',
        confirmPassword: '',
        userId: null,
        userName: ''
      });
      setShowPassword(false);
      setShowConfirmPassword(false);
    } catch {
      setUserError('Error de red al cambiar la contraseña.');
    }
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordForm({
      password: '',
      confirmPassword: '',
      userId: null,
      userName: ''
    });
    setPasswordValidation({
      length: false,
      upper: false,
      lower: false,
      number: false,
      symbol: false,
      match: false
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handlePermisoChange = (rolIdx, permiso) => {
    setRolesPermisos(prev => prev.map((r, idx) => idx === rolIdx ? { ...r, [permiso]: !r[permiso] } : r));
  };

  const handleGuardarRoles = async () => {
    setRolesMsg('');
    setRolesMsgType('');
    try {
      const token = localStorage.getItem('jwt');
      const res = await fetch('http://localhost:8081/api/roles-permisos', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(rolesPermisos)
      });
      if (!res.ok) {
        setRolesMsg('Error al guardar los permisos.');
        setRolesMsgType('error');
        return;
      }
      setRolesMsg('Permisos guardados correctamente.');
      setRolesMsgType('success');
    } catch {
      setRolesMsg('Error de red al guardar los permisos.');
      setRolesMsgType('error');
    }
  };

  // Mostrar mensaje temporalmente
  useEffect(() => {
    if (rolesMsg) {
      const timer = setTimeout(() => {
        setRolesMsg('');
        setRolesMsgType('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [rolesMsg]);

  // Nuevo: cargar permisos desde backend al montar
  useEffect(() => {
    fetchRolesPermisos();
  }, []);

  const fetchRolesPermisos = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const res = await fetch('http://localhost:8081/api/roles-permisos', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });
      if (!res.ok) return;
      const data = await res.json();
      setRolesPermisos(data);
    } catch (e) {
      // Puedes mostrar un mensaje de error si quieres
    }
  };

  const handlePolicyChange = e => {
    const { name, type, checked, value } = e.target;
    setPasswordPolicy(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Nuevo: cargar política de contraseña desde backend al montar
  useEffect(() => {
    fetchPasswordPolicy();
  }, []);

  const fetchPasswordPolicy = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const res = await fetch('http://localhost:8081/api/password-policy', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });
      if (!res.ok) return;
      const data = await res.json();
      if (data) setPasswordPolicy(data);
    } catch (e) {}
  };

  const handleGuardarPolicy = async e => {
    e.preventDefault();
    setPolicyMsg('');
    setPolicyMsgType('');
    try {
      const token = localStorage.getItem('jwt');
      const res = await fetch('http://localhost:8081/api/password-policy', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: JSON.stringify(passwordPolicy)
      });
      if (!res.ok) {
        setPolicyMsg('Error al guardar la política.');
        setPolicyMsgType('error');
        return;
      }
      setPolicyMsg('Política guardada correctamente.');
      setPolicyMsgType('success');
    } catch {
      setPolicyMsg('Error de red al guardar la política.');
      setPolicyMsgType('error');
    }
  };

  useEffect(() => {
    if (policyMsg) {
      const timer = setTimeout(() => {
        setPolicyMsg('');
        setPolicyMsgType('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [policyMsg]);

  const handleVisualChange = e => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      setVisualConfig(prev => ({ ...prev, logo: file }));
      const reader = new FileReader();
      reader.onload = ev => setVisualConfig(prev => ({ ...prev, logoPreview: ev.target.result }));
      reader.readAsDataURL(file);
    } else {
      setVisualConfig(prev => ({ ...prev, [name]: value }));
    }
  };

  const fetchVisualConfig = async () => {
    try {
      const token = localStorage.getItem('jwt');
      const res = await fetch('http://localhost:8081/api/visual-config', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token ? `Bearer ${token}` : ''
        }
      });
      if (res.ok) {
        const config = await res.json();
        setVisualConfig(prev => ({
          ...prev,
          ...config,
          logoPreview: config.logoUrl || null
        }));
      }
    } catch (err) {
      console.error('Error al cargar configuración visual:', err);
    }
  };

  const handleGuardarVisual = async e => {
    e.preventDefault();
    setVisualMsg('');
    setVisualMsgType('');
    
    try {
      const token = localStorage.getItem('jwt');
      const formData = new FormData();
      
      // Agregar archivo de logo si existe
      if (visualConfig.logo) {
        formData.append('logo', visualConfig.logo);
      }
      
      // Agregar otros campos como JSON
      const configData = {
        colorPrimario: visualConfig.colorPrimario,
        colorSecundario: visualConfig.colorSecundario,
        tema: visualConfig.tema,
        formatoFecha: visualConfig.formatoFecha,
        formatoHora: visualConfig.formatoHora
      };
      formData.append('config', JSON.stringify(configData));
      
      const res = await fetch('http://localhost:8081/api/visual-config', {
        method: 'PUT',
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: formData
      });
      
      if (res.ok) {
        const savedConfig = await res.json();
        setVisualConfig(prev => ({
          ...prev,
          logoPreview: savedConfig.logoUrl || visualConfig.logoPreview
        }));
        setVisualMsg('Personalización guardada correctamente.');
        setVisualMsgType('success');
        
        // Aplicar cambios inmediatamente
        applyVisualConfig(savedConfig);
      } else {
        const errorText = await res.text();
        setVisualMsg(errorText || 'Error al guardar la personalización.');
        setVisualMsgType('error');
      }
    } catch (err) {
      setVisualMsg('Error de red al guardar la personalización.');
      setVisualMsgType('error');
    }
  };

  const applyVisualConfig = (config) => {
    // Aplicar colores al CSS
    const root = document.documentElement;
    root.style.setProperty('--primary-color', config.colorPrimario);
    root.style.setProperty('--secondary-color', config.colorSecundario);
    
    // Aplicar tema
    if (config.tema === 'oscuro') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    
    // Guardar en localStorage para persistencia
    localStorage.setItem('visualConfig', JSON.stringify(config));
  };

  useEffect(() => {
    if (visualMsg) {
      const timer = setTimeout(() => {
        setVisualMsg('');
        setVisualMsgType('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visualMsg]);

  return (
    <div className="clientes-container">
      {/* Parámetros del sistema */}
      <div className="clientes-form-section">
        <div style={{ background: '#2563eb', color: 'white', fontWeight: 600, padding: '16px', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center', fontSize: '18px' }}>
          <i className="fas fa-cogs" style={{ marginRight: '10px' }}></i>
          Parámetros del Sistema
        </div>
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label>Umbral de Stock Bajo</label>
              <input type="number" name="stockBajo" value={params.stockBajo} onChange={handleChange} className="w-full p-2 border rounded" />
              <p className="text-gray-500 text-sm mt-1">Número mínimo de unidades para alertas de stock bajo.</p>
            </div>
            <div className="form-group">
              <label>Días de Retención de Movimientos</label>
              <input type="number" name="diasRetencion" value={params.diasRetencion} onChange={handleChange} className="w-full p-2 border rounded" />
              <p className="text-gray-500 text-sm mt-1">Días que se guardan los movimientos de inventario.</p>
            </div>
            <div className="form-group">
              <label>Moneda Predeterminada</label>
              <input type="text" name="moneda" value={params.moneda} onChange={handleChange} className="w-full p-2 border rounded" />
              <p className="text-gray-500 text-sm mt-1">Moneda para mostrar precios.</p>
            </div>
            <div className="form-group">
              <label>Tasa de IVA (%)</label>
              <input type="number" name="iva" value={params.iva} onChange={handleChange} className="w-full p-2 border rounded" />
              <p className="text-gray-500 text-sm mt-1">Porcentaje de IVA para aplicar a los pedidos.</p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" style={{ display: 'flex', alignItems: 'center' }}>
              <i className="fas fa-save" style={{ marginRight: '8px' }}></i>Guardar
            </button>
          </div>
          {success && <div style={{ color: 'green', marginTop: '10px' }}>{success}</div>}
          {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
        </form>
      </div>

      {/* Historial de cambios */}
      <div className="clientes-table-section">
        <div style={{ background: '#374151', color: 'white', fontWeight: 600, padding: '16px', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center', fontSize: '18px' }}>
          <i className="fas fa-history" style={{ marginRight: '10px' }}></i>
          Historial de Cambios
        </div>
        <div style={{ padding: '24px' }}>
          <table className="w-full table-auto">
            <thead>
              <tr style={{ background: '#e5e7eb' }}>
                <th className="px-4 py-2">Clave</th>
                <th className="px-4 py-2">Valor Anterior</th>
                <th className="px-4 py-2">Valor Nuevo</th>
                <th className="px-4 py-2">Usuario</th>
                <th className="px-4 py-2">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {historial.length === 0 ? (
                <tr><td colSpan="5" style={{ textAlign: 'center', color: '#888' }}>No hay cambios registrados.</td></tr>
              ) : (
                historial.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2">{item.clave}</td>
                    <td className="px-4 py-2">{item.valorAnterior}</td>
                    <td className="px-4 py-2">{item.valorNuevo}</td>
                    <td className="px-4 py-2">{item.usuario}</td>
                    <td className="px-4 py-2">{item.fecha}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gestión de usuarios y roles */}
      <div className="clientes-table-section">
        <div style={{ background: '#2563eb', color: 'white', fontWeight: 600, padding: '16px', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center', fontSize: '18px' }}>
          <i className="fas fa-users-cog" style={{ marginRight: '10px' }}></i>
          Gestión de Usuarios y Roles
        </div>
        <div style={{ padding: '24px' }}>
          {userError && <div style={{ background: '#ffeaea', color: '#d32f2f', border: '1px solid #f44336', borderRadius: '6px', padding: '10px 18px', marginBottom: '10px', fontWeight: 500, fontSize: '15px', display: 'inline-block' }}>{userError}</div>}
          {userSuccess && !userError && <div style={{ background: '#e7fbe7', color: '#388e3c', border: '1px solid #4caf50', borderRadius: '6px', padding: '10px 18px', marginBottom: '10px', fontWeight: 500, fontSize: '15px', display: 'inline-block' }}>{userSuccess}</div>}
          <table className="w-full table-auto">
            <thead>
              <tr style={{ background: '#e5e7eb' }}>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Rol</th>
                <th className="px-4 py-2">Activo</th>
                <th className="px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length === 0 ? (
                <tr><td colSpan="6" style={{ textAlign: 'center', color: '#888' }}>No hay usuarios para mostrar.</td></tr>
              ) : (
                usuarios.map(usuario => (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.nombre ?? ''}</td>
                    <td>{usuario.correo ?? ''}</td>
                    <td>
                      <select value={usuario.rol ?? ''} onChange={e => handleRoleChange(usuario.id, e.target.value)}>
                        <option value="Admin">Admin</option>
                        <option value="Usuario">Usuario</option>
                        <option value="Supervisor">Supervisor</option>
                      </select>
                    </td>
                    <td>
                      <input type="checkbox" checked={!!usuario.activo} onChange={() => handleToggleActivo(usuario.id, usuario.activo)} />
                    </td>
                    <td className="acciones">
                      <button
                        className="edit-btn"
                        style={{ background: usuario.activo ? '#ffa726' : '#e0e0e0', color: usuario.activo ? 'white' : '#888', cursor: usuario.activo ? 'pointer' : 'not-allowed', fontWeight: 600, border: 'none', borderRadius: '4px', padding: '7px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}
                        onClick={() => handleForcePassword(usuario.id, usuario.activo, usuario.nombre)}
                        disabled={!usuario.activo}
                        title={!usuario.activo ? 'Activa el usuario para cambiar la contraseña' : 'Forzar cambio de contraseña'}
                      >
                        <i className="fa fa-key"></i> Forzar contraseña
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tabla editable de roles y permisos */}
      <div className="clientes-table-section">
        <div style={{ background: '#2563eb', color: 'white', fontWeight: 600, padding: '16px', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center', fontSize: '18px', marginTop: '32px' }}>
          <i className="fas fa-user-shield" style={{ marginRight: '10px' }}></i>
          Gestión de Roles y Permisos
        </div>
        <div style={{ padding: '24px' }}>
          <table className="w-full table-auto">
            <thead>
              <tr style={{ background: '#e5e7eb' }}>
                <th className="px-4 py-2">Rol</th>
                <th className="px-4 py-2">Ver</th>
                <th className="px-4 py-2">Crear</th>
                <th className="px-4 py-2">Editar</th>
                <th className="px-4 py-2">Eliminar</th>
                <th className="px-4 py-2">Aprobar</th>
              </tr>
            </thead>
            <tbody>
              {rolesPermisos.map((rolPerm, idx) => (
                <tr key={rolPerm.rol}>
                  <td className="px-4 py-2 font-semibold">{rolPerm.rol}</td>
                  <td className="px-4 py-2 text-center"><input type="checkbox" checked={rolPerm.ver} onChange={() => handlePermisoChange(idx, 'ver')} /></td>
                  <td className="px-4 py-2 text-center"><input type="checkbox" checked={rolPerm.crear} onChange={() => handlePermisoChange(idx, 'crear')} /></td>
                  <td className="px-4 py-2 text-center"><input type="checkbox" checked={rolPerm.editar} onChange={() => handlePermisoChange(idx, 'editar')} /></td>
                  <td className="px-4 py-2 text-center"><input type="checkbox" checked={rolPerm.eliminar} onChange={() => handlePermisoChange(idx, 'eliminar')} /></td>
                  <td className="px-4 py-2 text-center"><input type="checkbox" checked={rolPerm.aprobar} onChange={() => handlePermisoChange(idx, 'aprobar')} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ padding: '0 24px 24px 24px', display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={handleGuardarRoles} className="bg-blue-600 text-white px-4 py-2 rounded" style={{ display: 'flex', alignItems: 'center' }}>
            <i className="fas fa-save" style={{ marginRight: '8px' }}></i>Guardar cambios
          </button>
        </div>
        {rolesMsg && (
          <div style={{
            background: rolesMsgType === 'success' ? '#e7fbe7' : '#ffeaea',
            color: rolesMsgType === 'success' ? '#388e3c' : '#d32f2f',
            border: `1px solid ${rolesMsgType === 'success' ? '#4caf50' : '#f44336'}`,
            borderRadius: '6px',
            padding: '10px 18px',
            marginBottom: '10px',
            fontWeight: 500,
            fontSize: '15px',
            display: 'inline-block',
            marginLeft: '24px',
            marginTop: '0px'
          }}>
            {rolesMsg}
          </div>
        )}
      </div>

      {/* Políticas de contraseña */}
      <div className="clientes-form-section">
        <div style={{ background: '#2563eb', color: 'white', fontWeight: 600, padding: '16px', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center', fontSize: '18px', marginTop: '32px' }}>
          <i className="fas fa-key" style={{ marginRight: '10px' }}></i>
          Políticas de Contraseña
        </div>
        <form onSubmit={handleGuardarPolicy} style={{ padding: '24px' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label>Longitud mínima</label>
              <input type="number" name="minLength" min="4" max="32" value={passwordPolicy.minLength} onChange={handlePolicyChange} className="w-full p-2 border rounded" />
            </div>
            <div className="form-group">
              <label>Caducidad (días)</label>
              <input type="number" name="expireDays" min="0" max="365" value={passwordPolicy.expireDays} onChange={handlePolicyChange} className="w-full p-2 border rounded" />
              <p className="text-gray-500 text-sm mt-1">0 = nunca caduca</p>
            </div>
            <div className="form-group">
              <label><input type="checkbox" name="requireUpper" checked={passwordPolicy.requireUpper} onChange={handlePolicyChange} /> Requiere mayúsculas</label>
            </div>
            <div className="form-group">
              <label><input type="checkbox" name="requireLower" checked={passwordPolicy.requireLower} onChange={handlePolicyChange} /> Requiere minúsculas</label>
            </div>
            <div className="form-group">
              <label><input type="checkbox" name="requireNumber" checked={passwordPolicy.requireNumber} onChange={handlePolicyChange} /> Requiere números</label>
            </div>
            <div className="form-group">
              <label><input type="checkbox" name="requireSymbol" checked={passwordPolicy.requireSymbol} onChange={handlePolicyChange} /> Requiere símbolos</label>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" style={{ display: 'flex', alignItems: 'center' }}>
              <i className="fas fa-save" style={{ marginRight: '8px' }}></i>Guardar políticas
            </button>
          </div>
          {policyMsg && (
            <div style={{
              background: policyMsgType === 'success' ? '#e7fbe7' : '#ffeaea',
              color: policyMsgType === 'success' ? '#388e3c' : '#d32f2f',
              border: `1px solid ${policyMsgType === 'success' ? '#4caf50' : '#f44336'}`,
              borderRadius: '6px',
              padding: '10px 18px',
              marginBottom: '10px',
              fontWeight: 500,
              fontSize: '15px',
              display: 'inline-block',
              marginLeft: '0px',
              marginTop: '16px'
            }}>
              {policyMsg}
            </div>
          )}
        </form>
      </div>

      {/* Personalización Visual */}
      <div className="clientes-form-section">
        <div style={{ background: '#2563eb', color: 'white', fontWeight: 600, padding: '16px', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center', fontSize: '18px', marginTop: '32px' }}>
          <i className="fas fa-paint-brush" style={{ marginRight: '10px' }}></i>
          Personalización Visual
        </div>
        <form onSubmit={handleGuardarVisual} style={{ padding: '24px' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label>Logo de la empresa</label>
              <input type="file" name="logo" accept="image/*" onChange={handleVisualChange} />
              {visualConfig.logoPreview && <img src={visualConfig.logoPreview} alt="Logo preview" style={{ maxWidth: '120px', marginTop: '10px', borderRadius: '8px', border: '1px solid #ccc' }} />}
            </div>
            <div className="form-group">
              <label>Color primario</label>
              <input type="color" name="colorPrimario" value={visualConfig.colorPrimario} onChange={handleVisualChange} style={{ width: '48px', height: '48px', border: 'none', background: 'none' }} />
            </div>
            <div className="form-group">
              <label>Color secundario</label>
              <input type="color" name="colorSecundario" value={visualConfig.colorSecundario} onChange={handleVisualChange} style={{ width: '48px', height: '48px', border: 'none', background: 'none' }} />
            </div>
            <div className="form-group">
              <label>Tema</label>
              <select name="tema" value={visualConfig.tema} onChange={handleVisualChange}>
                <option value="claro">Claro</option>
                <option value="oscuro">Oscuro</option>
                <option value="auto">Automático</option>
              </select>
            </div>
            <div className="form-group">
              <label>Formato de fecha</label>
              <select name="formatoFecha" value={visualConfig.formatoFecha} onChange={handleVisualChange}>
                <option value="dd/MM/yyyy">dd/MM/yyyy</option>
                <option value="MM/dd/yyyy">MM/dd/yyyy</option>
                <option value="yyyy-MM-dd">yyyy-MM-dd</option>
              </select>
            </div>
            <div className="form-group">
              <label>Formato de hora</label>
              <select name="formatoHora" value={visualConfig.formatoHora} onChange={handleVisualChange}>
                <option value="24h">24 horas</option>
                <option value="12h">12 horas (AM/PM)</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" style={{ display: 'flex', alignItems: 'center' }}>
              <i className="fas fa-save" style={{ marginRight: '8px' }}></i>Guardar personalización
            </button>
          </div>
          {visualMsg && (
            <div style={{
              background: visualMsgType === 'success' ? '#e7fbe7' : '#ffeaea',
              color: visualMsgType === 'success' ? '#388e3c' : '#d32f2f',
              border: `1px solid ${visualMsgType === 'success' ? '#4caf50' : '#f44336'}`,
              borderRadius: '6px',
              padding: '10px 18px',
              marginBottom: '10px',
              fontWeight: 500,
              fontSize: '15px',
              display: 'inline-block',
              marginLeft: '0px',
              marginTop: '16px'
            }}>
              {visualMsg}
            </div>
          )}
        </form>
      </div>

      {/* Modal de cambio de contraseña */}
      {showPasswordModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '32px',
            width: '90%',
            maxWidth: '500px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: '#1f2937',
                margin: 0
              }}>
                <i className="fas fa-key" style={{ marginRight: '8px', color: '#2563eb' }}></i>
                Cambiar Contraseña
              </h3>
              <button
                onClick={closePasswordModal}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: '#6b7280',
                  padding: '4px'
                }}
              >
                ×
              </button>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <p style={{ color: '#6b7280', margin: 0 }}>
                Cambiando contraseña para: <strong>{passwordForm.userName}</strong>
              </p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleSubmitPassword(); }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  Nueva contraseña
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={passwordForm.password}
                    onChange={handlePasswordChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      paddingRight: '50px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Ingresa la nueva contraseña"
                    autoFocus
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

              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '8px',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  Confirmar contraseña
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    style={{
                      width: '100%',
                      padding: '12px',
                      paddingRight: '50px',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      fontSize: '14px',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Confirma la nueva contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                    title={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  >
                    <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
              </div>

              {/* Validación de contraseña */}
              <div style={{
                background: '#f9fafb',
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '24px'
              }}>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  margin: '0 0 12px 0'
                }}>
                  Requisitos de la contraseña:
                </h4>
                <div style={{ fontSize: '13px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '6px',
                    color: passwordValidation.length ? '#059669' : '#6b7280'
                  }}>
                    <i className={`fas ${passwordValidation.length ? 'fa-check' : 'fa-times'}`} style={{ marginRight: '8px', width: '12px' }}></i>
                    Mínimo {passwordPolicy.minLength} caracteres
                  </div>
                  {passwordPolicy.requireUpper && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '6px',
                      color: passwordValidation.upper ? '#059669' : '#6b7280'
                    }}>
                      <i className={`fas ${passwordValidation.upper ? 'fa-check' : 'fa-times'}`} style={{ marginRight: '8px', width: '12px' }}></i>
                      Al menos una mayúscula
                    </div>
                  )}
                  {passwordPolicy.requireLower && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '6px',
                      color: passwordValidation.lower ? '#059669' : '#6b7280'
                    }}>
                      <i className={`fas ${passwordValidation.lower ? 'fa-check' : 'fa-times'}`} style={{ marginRight: '8px', width: '12px' }}></i>
                      Al menos una minúscula
                    </div>
                  )}
                  {passwordPolicy.requireNumber && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '6px',
                      color: passwordValidation.number ? '#059669' : '#6b7280'
                    }}>
                      <i className={`fas ${passwordValidation.number ? 'fa-check' : 'fa-times'}`} style={{ marginRight: '8px', width: '12px' }}></i>
                      Al menos un número
                    </div>
                  )}
                  {passwordPolicy.requireSymbol && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '6px',
                      color: passwordValidation.symbol ? '#059669' : '#6b7280'
                    }}>
                      <i className={`fas ${passwordValidation.symbol ? 'fa-check' : 'fa-times'}`} style={{ marginRight: '8px', width: '12px' }}></i>
                      Al menos un símbolo
                    </div>
                  )}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: passwordValidation.match ? '#059669' : '#6b7280'
                  }}>
                    <i className={`fas ${passwordValidation.match ? 'fa-check' : 'fa-times'}`} style={{ marginRight: '8px', width: '12px' }}></i>
                    Las contraseñas coinciden
                  </div>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '12px'
              }}>
                <button
                  type="button"
                  onClick={closePasswordModal}
                  style={{
                    padding: '10px 20px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    background: 'white',
                    color: '#374151',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={!Object.values(passwordValidation).every(v => v)}
                  style={{
                    padding: '10px 20px',
                    border: 'none',
                    borderRadius: '8px',
                    background: Object.values(passwordValidation).every(v => v) ? '#2563eb' : '#9ca3af',
                    color: 'white',
                    cursor: Object.values(passwordValidation).every(v => v) ? 'pointer' : 'not-allowed',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                >
                  <i className="fas fa-save" style={{ marginRight: '8px' }}></i>
                  Cambiar contraseña
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConfiguracionPage; 