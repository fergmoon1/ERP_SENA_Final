-- Script para actualizar avatares de usuarios existentes
-- Ejecuta estos comandos en tu base de datos

-- 1. Ver usuarios actuales
SELECT id, nombre, correo, avatar FROM usuarios;

-- 2. Actualizar avatar de un usuario específico (reemplaza el ID)
UPDATE usuarios 
SET avatar = '/api/files/tu_archivo_subido.jpg' 
WHERE id = 1;

-- 3. Actualizar múltiples usuarios con diferentes avatares
UPDATE usuarios SET avatar = '/api/files/avatar_admin.jpg' WHERE id = 1;
UPDATE usuarios SET avatar = '/api/files/avatar_supervisor.jpg' WHERE id = 2;
UPDATE usuarios SET avatar = '/api/files/avatar_usuario.jpg' WHERE id = 3;

-- 4. Limpiar avatares (si quieres quitar todos)
-- UPDATE usuarios SET avatar = NULL;

-- 5. Verificar cambios
SELECT id, nombre, correo, avatar FROM usuarios; 