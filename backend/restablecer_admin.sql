-- ===========================================
-- SCRIPT PARA RESTABLECER USUARIO ADMIN
-- ===========================================

USE erp_sena;

-- 1. Verificar estado actual del usuario admin
SELECT '=== ESTADO ACTUAL DEL USUARIO ADMIN ===' as info;
SELECT id, correo, nombre, rol, 
       CASE 
           WHEN password LIKE '$2a$%' THEN 'HASHEADO'
           ELSE 'NO HASHEADO'
       END as estado_password,
       LENGTH(password) as longitud_password,
       CASE 
           WHEN activo = 1 THEN 'ACTIVO'
           ELSE 'INACTIVO'
       END as estado_usuario
FROM usuario 
WHERE correo = 'admin@erp.com';

-- 2. Actualizar usuario admin con credenciales correctas y activarlo
UPDATE usuario 
SET password = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    nombre = 'Administrador',
    rol = 'ADMIN',
    activo = true
WHERE correo = 'admin@erp.com';

-- 3. Si el usuario admin no existe, crearlo
INSERT INTO usuario (correo, nombre, password, rol, activo) 
SELECT 'admin@erp.com', 'Administrador', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN', true
WHERE NOT EXISTS (SELECT 1 FROM usuario WHERE correo = 'admin@erp.com');

-- 4. Verificar usuario admin después de la actualización
SELECT '=== USUARIO ADMIN DESPUÉS DE ACTUALIZAR ===' as info;
SELECT id, correo, nombre, rol, 
       CASE 
           WHEN password LIKE '$2a$%' THEN 'HASHEADO'
           ELSE 'NO HASHEADO'
       END as estado_password,
       LENGTH(password) as longitud_password,
       CASE 
           WHEN activo = 1 THEN 'ACTIVO'
           ELSE 'INACTIVO'
       END as estado_usuario
FROM usuario 
WHERE correo = 'admin@erp.com';

-- 5. Mostrar todos los usuarios para verificar
SELECT '=== TODOS LOS USUARIOS EN LA BD ===' as info;
SELECT id, correo, nombre, rol, 
       CASE 
           WHEN password LIKE '$2a$%' THEN 'HASHEADO'
           ELSE 'NO HASHEADO'
       END as estado_password,
       CASE 
           WHEN activo = 1 THEN 'ACTIVO'
           ELSE 'INACTIVO'
       END as estado_usuario
FROM usuario 
ORDER BY correo;

-- 6. Contar total de usuarios
SELECT '=== TOTAL DE USUARIOS ===' as info;
SELECT COUNT(*) as total_usuarios FROM usuario;

-- ===========================================
-- CREDENCIALES PARA ACCEDER:
-- ===========================================
-- Email: admin@erp.com
-- Contraseña: admin1234
-- Estado: ACTIVO
-- =========================================== 