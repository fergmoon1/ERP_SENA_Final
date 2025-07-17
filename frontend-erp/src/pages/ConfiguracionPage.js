import React, { useState, useEffect } from 'react';

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
    formatoHora: '24h',
    // Nuevas opciones de personalización
    fuente: 'Inter',
    tamanoFuente: '14px',
    espaciado: 'normal',
    bordesRedondeados: '8px',
    sombras: true,
    animaciones: true,
    densidad: 'normal', // compact, normal, spacious
    // Configuración de componentes
    estiloBotones: 'moderno', // moderno, clasico, minimalista
    estiloTablas: 'moderno',
    estiloFormularios: 'moderno',
    // Configuración de notificaciones visuales
    notificacionesPosicion: 'top-right',
    notificacionesDuracion: 5000,
    notificacionesSonido: true,
    // Configuración de empresa
    nombreEmpresa: '',
    direccionEmpresa: '',
    telefonoEmpresa: '',
    emailEmpresa: '',
    sitioWeb: '',
    horarioLaboral: '8:00-18:00',
    zonaHoraria: 'America/Bogota',
    // Configuración de seguridad
    tiempoSesion: 30, // minutos
    maxIntentosLogin: 5,
    bloqueoTemporal: 15, // minutos
    requiereCaptcha: true,
    // Configuración de notificaciones
    notificacionesEmail: true,
    notificacionesPush: true,
    notificacionesSMS: false,
    // Configuración de reportes
    formatoReporte: 'PDF',
    frecuenciaReportes: 'semanal',
    incluirGraficos: true,
    // Configuración de backup
    backupAutomatico: true,
    frecuenciaBackup: 'diario',
    retenerBackups: 30 // días
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

  const applyVisualConfig = (config) => {
    // Aplicar colores principales
    document.documentElement.style.setProperty('--primary-color', config.colorPrimario);
    document.documentElement.style.setProperty('--secondary-color', config.colorSecundario);
    
    // Aplicar tema
    if (config.tema === 'oscuro') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    
    // Aplicar fuente
    document.documentElement.style.setProperty('--font-family', config.fuente);
    document.documentElement.style.setProperty('--font-size', config.tamanoFuente);
    
    // Aplicar espaciado y densidad
    document.documentElement.style.setProperty('--spacing', config.espaciado);
    document.documentElement.style.setProperty('--border-radius', config.bordesRedondeados);
    
    // Aplicar sombras y animaciones
    if (config.sombras) {
      document.body.classList.add('shadows-enabled');
    } else {
      document.body.classList.remove('shadows-enabled');
    }
    
    if (config.animaciones) {
      document.body.classList.add('animations-enabled');
    } else {
      document.body.classList.remove('animations-enabled');
    }
  };

  // Temas predefinidos
  const temasPredefinidos = {
    claro: {
      colorPrimario: '#2563eb',
      colorSecundario: '#374151',
      tema: 'claro',
      fuente: 'Inter',
      sombras: true,
      animaciones: true
    },
    oscuro: {
      colorPrimario: '#3b82f6',
      colorSecundario: '#1f2937',
      tema: 'oscuro',
      fuente: 'Inter',
      sombras: true,
      animaciones: true
    },
    azulCorporativo: {
      colorPrimario: '#1e40af',
      colorSecundario: '#1e293b',
      tema: 'claro',
      fuente: 'Roboto',
      sombras: true,
      animaciones: false
    },
    verde: {
      colorPrimario: '#059669',
      colorSecundario: '#064e3b',
      tema: 'claro',
      fuente: 'Inter',
      sombras: true,
      animaciones: true
    },
    minimalista: {
      colorPrimario: '#000000',
      colorSecundario: '#6b7280',
      tema: 'claro',
      fuente: 'Inter',
      sombras: false,
      animaciones: false,
      bordesRedondeados: '0px'
    }
  };

  const aplicarTemaPredefinido = (nombreTema) => {
    const tema = temasPredefinidos[nombreTema];
    if (tema) {
      setVisualConfig(prev => ({ ...prev, ...tema }));
      applyVisualConfig({ ...visualConfig, ...tema });
    }
  };

  const handleVisualChange = e => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      setVisualConfig(prev => ({ ...prev, logo: file }));
      const reader = new FileReader();
      reader.onload = ev => setVisualConfig(prev => ({ ...prev, logoPreview: ev.target.result }));
      reader.readAsDataURL(file);
    } else {
      const newValue = type === 'checkbox' ? e.target.checked : value;
      setVisualConfig(prev => ({ ...prev, [name]: newValue }));
      
      // Aplicar cambios en tiempo real para ciertos campos
      if (['colorPrimario', 'colorSecundario', 'tema', 'fuente', 'tamanoFuente', 'bordesRedondeados', 'sombras', 'animaciones'].includes(name)) {
        applyVisualConfig({ ...visualConfig, [name]: newValue });
      }
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
        
        {/* Vista previa en tiempo real */}
        <div style={{ padding: '20px 24px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
          <h4 style={{ margin: '0 0 16px 0', color: '#374151', fontSize: '16px', fontWeight: '600' }}>
            <i className="fas fa-eye" style={{ marginRight: '8px', color: '#2563eb' }}></i>
            Vista Previa
          </h4>
          <div style={{ 
            padding: '16px', 
            border: '2px solid #e2e8f0', 
            borderRadius: '8px', 
            background: 'white',
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}>
            <div style={{ 
              padding: '8px 16px', 
              background: visualConfig.colorPrimario, 
              color: 'white', 
              borderRadius: visualConfig.bordesRedondeados,
              fontSize: visualConfig.tamanoFuente,
              fontFamily: visualConfig.fuente,
              boxShadow: visualConfig.sombras ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'
            }}>
              Botón Primario
            </div>
            <div style={{ 
              padding: '8px 16px', 
              background: visualConfig.colorSecundario, 
              color: 'white', 
              borderRadius: visualConfig.bordesRedondeados,
              fontSize: visualConfig.tamanoFuente,
              fontFamily: visualConfig.fuente,
              boxShadow: visualConfig.sombras ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'
            }}>
              Botón Secundario
            </div>
            <div style={{ 
              padding: '8px 16px', 
              border: `2px solid ${visualConfig.colorPrimario}`, 
              color: visualConfig.colorPrimario, 
              borderRadius: visualConfig.bordesRedondeados,
              fontSize: visualConfig.tamanoFuente,
              fontFamily: visualConfig.fuente,
              background: 'transparent'
            }}>
              Botón Outline
            </div>
          </div>
        </div>

        <form onSubmit={handleGuardarVisual} style={{ padding: '24px' }}>
          {/* Temas predefinidos */}
          <div style={{ marginBottom: '32px' }}>
            <h4 style={{ margin: '0 0 16px 0', color: '#374151', fontSize: '16px', fontWeight: '600' }}>
              <i className="fas fa-palette" style={{ marginRight: '8px', color: '#2563eb' }}></i>
              Temas Predefinidos
            </h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {Object.entries(temasPredefinidos).map(([nombre, tema]) => (
                <button
                  key={nombre}
                  type="button"
                  onClick={() => aplicarTemaPredefinido(nombre)}
                  style={{
                    padding: '12px 16px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '8px',
                    background: 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px',
                    minWidth: '120px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = tema.colorPrimario;
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = '#e2e8f0';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '8px',
                    background: `linear-gradient(135deg, ${tema.colorPrimario}, ${tema.colorSecundario})`,
                    border: '2px solid #e2e8f0'
                  }}></div>
                  <span style={{ fontSize: '12px', fontWeight: '500', textTransform: 'capitalize' }}>
                    {nombre.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Logo y colores */}
            <div className="form-group">
              <label>Logo de la empresa</label>
              <input type="file" name="logo" accept="image/*" onChange={handleVisualChange} />
              {visualConfig.logoPreview && (
                <div style={{ marginTop: '10px' }}>
                  <img src={visualConfig.logoPreview} alt="Logo preview" style={{ maxWidth: '120px', borderRadius: '8px', border: '1px solid #ccc' }} />
                </div>
              )}
            </div>
            
            <div className="form-group">
              <label>Color primario</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input 
                  type="color" 
                  name="colorPrimario" 
                  value={visualConfig.colorPrimario} 
                  onChange={handleVisualChange} 
                  style={{ width: '48px', height: '48px', border: 'none', background: 'none', cursor: 'pointer' }} 
                />
                <span style={{ fontSize: '14px', color: '#6b7280' }}>{visualConfig.colorPrimario}</span>
              </div>
            </div>
            
            <div className="form-group">
              <label>Color secundario</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input 
                  type="color" 
                  name="colorSecundario" 
                  value={visualConfig.colorSecundario} 
                  onChange={handleVisualChange} 
                  style={{ width: '48px', height: '48px', border: 'none', background: 'none', cursor: 'pointer' }} 
                />
                <span style={{ fontSize: '14px', color: '#6b7280' }}>{visualConfig.colorSecundario}</span>
              </div>
            </div>

            {/* Tipografía */}
            <div className="form-group">
              <label>Fuente principal</label>
              <select name="fuente" value={visualConfig.fuente} onChange={handleVisualChange}>
                <option value="Inter">Inter (Moderno)</option>
                <option value="Roboto">Roboto (Clásico)</option>
                <option value="Open Sans">Open Sans (Legible)</option>
                <option value="Poppins">Poppins (Elegante)</option>
                <option value="Montserrat">Montserrat (Profesional)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Tamaño de fuente base</label>
              <select name="tamanoFuente" value={visualConfig.tamanoFuente} onChange={handleVisualChange}>
                <option value="12px">Pequeño (12px)</option>
                <option value="14px">Normal (14px)</option>
                <option value="16px">Grande (16px)</option>
                <option value="18px">Extra grande (18px)</option>
              </select>
            </div>

            {/* Efectos visuales */}
            <div className="form-group">
              <label>Bordes redondeados</label>
              <select name="bordesRedondeados" value={visualConfig.bordesRedondeados} onChange={handleVisualChange}>
                <option value="0px">Sin bordes</option>
                <option value="4px">Suave (4px)</option>
                <option value="8px">Normal (8px)</option>
                <option value="12px">Redondeado (12px)</option>
                <option value="20px">Muy redondeado (20px)</option>
              </select>
            </div>

            <div className="form-group">
              <label>Densidad de la interfaz</label>
              <select name="densidad" value={visualConfig.densidad} onChange={handleVisualChange}>
                <option value="compact">Compacta</option>
                <option value="normal">Normal</option>
                <option value="spacious">Espaciosa</option>
              </select>
            </div>

            {/* Opciones de efectos */}
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input 
                  type="checkbox" 
                  name="sombras" 
                  checked={visualConfig.sombras} 
                  onChange={handleVisualChange} 
                />
                Habilitar sombras
              </label>
            </div>

            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input 
                  type="checkbox" 
                  name="animaciones" 
                  checked={visualConfig.animaciones} 
                  onChange={handleVisualChange} 
                />
                Habilitar animaciones
              </label>
            </div>

            {/* Configuración de fecha y hora */}
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

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px', gap: '12px' }}>
            <button 
              type="button" 
              onClick={() => aplicarTemaPredefinido('claro')}
              style={{ 
                padding: '10px 20px', 
                border: '1px solid #d1d5db', 
                borderRadius: '8px', 
                background: 'white', 
                color: '#374151', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <i className="fas fa-undo"></i>
              Restaurar
            </button>
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
              fontWeight: '500',
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

      {/* Configuración de Empresa */}
      <div className="clientes-form-section">
        <div style={{ background: '#059669', color: 'white', fontWeight: 600, padding: '16px', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center', fontSize: '18px', marginTop: '32px' }}>
          <i className="fas fa-building" style={{ marginRight: '10px' }}></i>
          Configuración de Empresa
        </div>
        <form style={{ padding: '24px' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label>Nombre de la empresa</label>
              <input 
                type="text" 
                name="nombreEmpresa" 
                value={visualConfig.nombreEmpresa} 
                onChange={handleVisualChange} 
                placeholder="Ingrese el nombre de la empresa"
              />
            </div>
            <div className="form-group">
              <label>Dirección</label>
              <input 
                type="text" 
                name="direccionEmpresa" 
                value={visualConfig.direccionEmpresa} 
                onChange={handleVisualChange} 
                placeholder="Ingrese la dirección"
              />
            </div>
            <div className="form-group">
              <label>Teléfono</label>
              <input 
                type="tel" 
                name="telefonoEmpresa" 
                value={visualConfig.telefonoEmpresa} 
                onChange={handleVisualChange} 
                placeholder="Ingrese el teléfono"
              />
            </div>
            <div className="form-group">
              <label>Email corporativo</label>
              <input 
                type="email" 
                name="emailEmpresa" 
                value={visualConfig.emailEmpresa} 
                onChange={handleVisualChange} 
                placeholder="Ingrese el email corporativo"
              />
            </div>
            <div className="form-group">
              <label>Sitio web</label>
              <input 
                type="url" 
                name="sitioWeb" 
                value={visualConfig.sitioWeb} 
                onChange={handleVisualChange} 
                placeholder="https://www.empresa.com"
              />
            </div>
            <div className="form-group">
              <label>Horario laboral</label>
              <input 
                type="text" 
                name="horarioLaboral" 
                value={visualConfig.horarioLaboral} 
                onChange={handleVisualChange} 
                placeholder="8:00-18:00"
              />
            </div>
            <div className="form-group">
              <label>Zona horaria</label>
              <select name="zonaHoraria" value={visualConfig.zonaHoraria} onChange={handleVisualChange}>
                <option value="America/Bogota">Colombia (Bogotá)</option>
                <option value="America/Mexico_City">México (Ciudad de México)</option>
                <option value="America/New_York">Estados Unidos (Nueva York)</option>
                <option value="America/Lima">Perú (Lima)</option>
                <option value="America/Santiago">Chile (Santiago)</option>
                <option value="America/Argentina/Buenos_Aires">Argentina (Buenos Aires)</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button type="button" className="bg-green-600 text-white px-4 py-2 rounded" style={{ display: 'flex', alignItems: 'center' }}>
              <i className="fas fa-save" style={{ marginRight: '8px' }}></i>Guardar configuración
            </button>
          </div>
        </form>
      </div>

      {/* Configuración de Seguridad */}
      <div className="clientes-form-section">
        <div style={{ background: '#dc2626', color: 'white', fontWeight: 600, padding: '16px', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center', fontSize: '18px', marginTop: '32px' }}>
          <i className="fas fa-shield-alt" style={{ marginRight: '10px' }}></i>
          Configuración de Seguridad
        </div>
        <form style={{ padding: '24px' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label>Tiempo de sesión (minutos)</label>
              <input 
                type="number" 
                name="tiempoSesion" 
                value={visualConfig.tiempoSesion} 
                onChange={handleVisualChange} 
                min="5" 
                max="480"
                placeholder="30"
              />
              <p className="text-gray-500 text-sm mt-1">Tiempo antes de que expire la sesión por inactividad</p>
            </div>
            <div className="form-group">
              <label>Máximo intentos de login</label>
              <input 
                type="number" 
                name="maxIntentosLogin" 
                value={visualConfig.maxIntentosLogin} 
                onChange={handleVisualChange} 
                min="3" 
                max="10"
                placeholder="5"
              />
              <p className="text-gray-500 text-sm mt-1">Número de intentos antes del bloqueo temporal</p>
            </div>
            <div className="form-group">
              <label>Tiempo de bloqueo (minutos)</label>
              <input 
                type="number" 
                name="bloqueoTemporal" 
                value={visualConfig.bloqueoTemporal} 
                onChange={handleVisualChange} 
                min="5" 
                max="60"
                placeholder="15"
              />
              <p className="text-gray-500 text-sm mt-1">Tiempo de bloqueo después de exceder intentos</p>
            </div>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input 
                  type="checkbox" 
                  name="requiereCaptcha" 
                  checked={visualConfig.requiereCaptcha} 
                  onChange={handleVisualChange} 
                />
                Requerir reCAPTCHA en login
              </label>
              <p className="text-gray-500 text-sm mt-1">Activar verificación reCAPTCHA para mayor seguridad</p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button type="button" className="bg-red-600 text-white px-4 py-2 rounded" style={{ display: 'flex', alignItems: 'center' }}>
              <i className="fas fa-save" style={{ marginRight: '8px' }}></i>Guardar configuración
            </button>
          </div>
        </form>
      </div>

      {/* Configuración de Notificaciones */}
      <div className="clientes-form-section">
        <div style={{ background: '#7c3aed', color: 'white', fontWeight: 600, padding: '16px', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center', fontSize: '18px', marginTop: '32px' }}>
          <i className="fas fa-bell" style={{ marginRight: '10px' }}></i>
          Configuración de Notificaciones
        </div>
        <form style={{ padding: '24px' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label>Posición de notificaciones</label>
              <select name="notificacionesPosicion" value={visualConfig.notificacionesPosicion} onChange={handleVisualChange}>
                <option value="top-right">Superior derecha</option>
                <option value="top-left">Superior izquierda</option>
                <option value="bottom-right">Inferior derecha</option>
                <option value="bottom-left">Inferior izquierda</option>
                <option value="top-center">Superior centro</option>
                <option value="bottom-center">Inferior centro</option>
              </select>
            </div>
            <div className="form-group">
              <label>Duración de notificaciones (ms)</label>
              <input 
                type="number" 
                name="notificacionesDuracion" 
                value={visualConfig.notificacionesDuracion} 
                onChange={handleVisualChange} 
                min="2000" 
                max="10000"
                step="500"
                placeholder="5000"
              />
            </div>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input 
                  type="checkbox" 
                  name="notificacionesSonido" 
                  checked={visualConfig.notificacionesSonido} 
                  onChange={handleVisualChange} 
                />
                Activar sonido en notificaciones
              </label>
            </div>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input 
                  type="checkbox" 
                  name="notificacionesEmail" 
                  checked={visualConfig.notificacionesEmail} 
                  onChange={handleVisualChange} 
                />
                Notificaciones por email
              </label>
            </div>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input 
                  type="checkbox" 
                  name="notificacionesPush" 
                  checked={visualConfig.notificacionesPush} 
                  onChange={handleVisualChange} 
                />
                Notificaciones push
              </label>
            </div>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input 
                  type="checkbox" 
                  name="notificacionesSMS" 
                  checked={visualConfig.notificacionesSMS} 
                  onChange={handleVisualChange} 
                />
                Notificaciones por SMS
              </label>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button type="button" className="bg-purple-600 text-white px-4 py-2 rounded" style={{ display: 'flex', alignItems: 'center' }}>
              <i className="fas fa-save" style={{ marginRight: '8px' }}></i>Guardar configuración
            </button>
          </div>
        </form>
      </div>

      {/* Configuración de Reportes */}
      <div className="clientes-form-section">
        <div style={{ background: '#ea580c', color: 'white', fontWeight: 600, padding: '16px', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center', fontSize: '18px', marginTop: '32px' }}>
          <i className="fas fa-chart-bar" style={{ marginRight: '10px' }}></i>
          Configuración de Reportes
        </div>
        <form style={{ padding: '24px' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label>Formato de reporte predeterminado</label>
              <select name="formatoReporte" value={visualConfig.formatoReporte} onChange={handleVisualChange}>
                <option value="PDF">PDF</option>
                <option value="Excel">Excel (XLSX)</option>
                <option value="CSV">CSV</option>
                <option value="HTML">HTML</option>
              </select>
            </div>
            <div className="form-group">
              <label>Frecuencia de reportes automáticos</label>
              <select name="frecuenciaReportes" value={visualConfig.frecuenciaReportes} onChange={handleVisualChange}>
                <option value="diario">Diario</option>
                <option value="semanal">Semanal</option>
                <option value="mensual">Mensual</option>
                <option value="trimestral">Trimestral</option>
                <option value="anual">Anual</option>
              </select>
            </div>
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input 
                  type="checkbox" 
                  name="incluirGraficos" 
                  checked={visualConfig.incluirGraficos} 
                  onChange={handleVisualChange} 
                />
                Incluir gráficos en reportes
              </label>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
            <button type="button" className="bg-orange-600 text-white px-4 py-2 rounded" style={{ display: 'flex', alignItems: 'center' }}>
              <i className="fas fa-save" style={{ marginRight: '8px' }}></i>Guardar configuración
            </button>
          </div>
        </form>
      </div>

      {/* Configuración de Backup */}
      <div className="clientes-form-section">
        <div style={{ background: '#0891b2', color: 'white', fontWeight: 600, padding: '16px', borderRadius: '8px 8px 0 0', display: 'flex', alignItems: 'center', fontSize: '18px', marginTop: '32px' }}>
          <i className="fas fa-database" style={{ marginRight: '10px' }}></i>
          Configuración de Backup
        </div>
        <form style={{ padding: '24px' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input 
                  type="checkbox" 
                  name="backupAutomatico" 
                  checked={visualConfig.backupAutomatico} 
                  onChange={handleVisualChange} 
                />
                Habilitar backup automático
              </label>
            </div>
            <div className="form-group">
              <label>Frecuencia de backup</label>
              <select name="frecuenciaBackup" value={visualConfig.frecuenciaBackup} onChange={handleVisualChange}>
                <option value="diario">Diario</option>
                <option value="semanal">Semanal</option>
                <option value="mensual">Mensual</option>
              </select>
            </div>
            <div className="form-group">
              <label>Retener backups por (días)</label>
              <input 
                type="number" 
                name="retenerBackups" 
                value={visualConfig.retenerBackups} 
                onChange={handleVisualChange} 
                min="7" 
                max="365"
                placeholder="30"
              />
              <p className="text-gray-500 text-sm mt-1">Número de días antes de eliminar backups antiguos</p>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px', gap: '12px' }}>
            <button type="button" className="bg-blue-600 text-white px-4 py-2 rounded" style={{ display: 'flex', alignItems: 'center' }}>
              <i className="fas fa-download" style={{ marginRight: '8px' }}></i>Crear backup manual
            </button>
            <button type="button" className="bg-cyan-600 text-white px-4 py-2 rounded" style={{ display: 'flex', alignItems: 'center' }}>
              <i className="fas fa-save" style={{ marginRight: '8px' }}></i>Guardar configuración
            </button>
          </div>
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