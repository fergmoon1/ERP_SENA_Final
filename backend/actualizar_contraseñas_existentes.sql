-- Script para actualizar solo las contraseñas de usuarios existentes
USE erp_sena;

-- 1. Verificar usuarios existentes antes de actualizar
SELECT '=== USUARIOS EXISTENTES ANTES DE ACTUALIZAR ===' as info;
SELECT id, correo, nombre, rol, 
       CASE 
           WHEN password LIKE '$2a$%' THEN 'HASHEADO'
           ELSE 'NO HASHEADO'
       END as estado_password,
       LENGTH(password) as longitud_password
FROM usuario 
WHERE correo IN ('admin@empresa.com', 'supervisor@empresa.com', 'user@empresa.com')
ORDER BY correo;

-- 2. Actualizar solo las contraseñas de usuarios existentes
-- ADMIN: admin123
UPDATE usuario 
SET password = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
WHERE correo = 'admin@empresa.com';

-- SUPERVISOR: supervisor123
UPDATE usuario 
SET password = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
WHERE correo = 'supervisor@empresa.com';

-- USER: user123
UPDATE usuario 
SET password = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
WHERE correo = 'user@empresa.com';

-- 3. Verificar usuarios después de actualizar
SELECT '=== USUARIOS DESPUÉS DE ACTUALIZAR ===' as info;
SELECT id, correo, nombre, rol, 
       CASE 
           WHEN password LIKE '$2a$%' THEN 'HASHEADO'
           ELSE 'NO HASHEADO'
       END as estado_password,
       LENGTH(password) as longitud_password
FROM usuario 
WHERE correo IN ('admin@empresa.com', 'supervisor@empresa.com', 'user@empresa.com')
ORDER BY correo;

-- 4. Mostrar todos los usuarios (sin borrar ninguno)
SELECT '=== TODOS LOS USUARIOS EN LA BD ===' as info;
SELECT id, correo, nombre, rol, 
       CASE 
           WHEN password LIKE '$2a$%' THEN 'HASHEADO'
           ELSE 'NO HASHEADO'
       END as estado_password
FROM usuario 
ORDER BY correo;

-- 5. Contar total de usuarios
SELECT '=== TOTAL DE USUARIOS ===' as info;
SELECT COUNT(*) as total_usuarios FROM usuario; 