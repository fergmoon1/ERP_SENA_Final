image.png-- Script para agregar Juana Pérez a la base de datos con avatar
USE erp_sena;

-- Verificar si Juana Pérez ya existe
SELECT '=== VERIFICANDO SI JUANA PÉREZ EXISTE ===' as info;
SELECT id, correo, nombre, rol, avatar FROM usuario WHERE nombre LIKE '%Juana%' OR correo LIKE '%juana%';

-- Agregar Juana Pérez si no existe
INSERT INTO usuario (correo, nombre, password, rol, avatar, activo) VALUES 
('juana.perez@email.com', 'Juana Pérez', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN', '/api/files/foto01 mujer.png', true)
ON DUPLICATE KEY UPDATE 
    nombre = 'Juana Pérez',
    rol = 'ADMIN',
    avatar = '/api/files/foto01 mujer.png',
    activo = true;

-- Verificar que se agregó correctamente
SELECT '=== JUANA PÉREZ DESPUÉS DE AGREGAR ===' as info;
SELECT id, correo, nombre, rol, avatar, activo FROM usuario WHERE nombre LIKE '%Juana%' OR correo LIKE '%juana%';

-- Mostrar todos los usuarios para verificar
SELECT '=== TODOS LOS USUARIOS ===' as info;
SELECT id, correo, nombre, rol, avatar, activo FROM usuario ORDER BY id; 