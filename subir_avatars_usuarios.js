// Script para subir avatares de usuarios
// Ejecuta: node subir_avatars_usuarios.js

const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = require('node-fetch');

const API_BASE = 'http://localhost:8081/api';
const JWT_TOKEN = 'tu_token_jwt_aqui'; // Reemplaza con tu token

// Lista de usuarios y sus imágenes
const usuariosConAvatares = [
  {
    id: 1,
    nombre: 'Admin',
    correo: 'admin@empresa.com',
    rol: 'Admin',
    imagenPath: './imagenes/avatar_admin.jpg' // Ruta a la imagen
  },
  {
    id: 2,
    nombre: 'Supervisor',
    correo: 'supervisor@empresa.com',
    rol: 'Supervisor',
    imagenPath: './imagenes/avatar_supervisor.jpg'
  },
  // Agrega más usuarios según necesites
];

async function subirImagen(rutaImagen) {
  try {
    const formData = new FormData();
    formData.append('file', fs.createReadStream(rutaImagen));

    const response = await fetch(`${API_BASE}/files/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${JWT_TOKEN}`
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Error al subir imagen: ${response.statusText}`);
    }

    const result = await response.json();
    console.log(`✅ Imagen subida: ${result.url}`);
    return result.url;
  } catch (error) {
    console.error(`❌ Error subiendo imagen ${rutaImagen}:`, error.message);
    return null;
  }
}

async function actualizarUsuario(id, datosUsuario) {
  try {
    const response = await fetch(`${API_BASE}/usuarios/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JWT_TOKEN}`
      },
      body: JSON.stringify(datosUsuario)
    });

    if (!response.ok) {
      throw new Error(`Error actualizando usuario: ${response.statusText}`);
    }

    const result = await response.json();
    console.log(`✅ Usuario ${id} actualizado`);
    return result;
  } catch (error) {
    console.error(`❌ Error actualizando usuario ${id}:`, error.message);
    return null;
  }
}

async function procesarUsuarios() {
  console.log('🚀 Iniciando proceso de subida de avatares...\n');

  for (const usuario of usuariosConAvatares) {
    console.log(`📸 Procesando usuario: ${usuario.nombre}`);
    
    // Verificar si existe la imagen
    if (!fs.existsSync(usuario.imagenPath)) {
      console.log(`⚠️  Imagen no encontrada: ${usuario.imagenPath}`);
      continue;
    }

    // Subir imagen
    const avatarUrl = await subirImagen(usuario.imagenPath);
    if (!avatarUrl) {
      console.log(`❌ No se pudo subir imagen para ${usuario.nombre}`);
      continue;
    }

    // Actualizar usuario con el avatar
    const datosActualizados = {
      ...usuario,
      avatar: avatarUrl
    };

    await actualizarUsuario(usuario.id, datosActualizados);
    console.log(`✅ ${usuario.nombre} completado\n`);
  }

  console.log('🎉 Proceso completado!');
}

// Ejecutar el script
if (require.main === module) {
  procesarUsuarios().catch(console.error);
}

module.exports = { subirImagen, actualizarUsuario }; 