-- ===========================================
-- SCRIPT PARA RESTABLECER TODOS LOS USUARIOS PRINCIPALES
-- ===========================================

USE erp_sena;

-- 1. Verificar estado actual de todos los usuarios
SELECT '=== ESTADO ACTUAL DE TODOS LOS USUARIOS ===' as info;
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
WHERE correo IN ('admin@erp.com', 'supervisor@erp.com', 'user@erp.com')
ORDER BY correo;

-- 2. Actualizar todos los usuarios con credenciales correctas y activarlos
-- ADMIN: admin@erp.com / admin1234
UPDATE usuario 
SET password = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    nombre = 'Administrador',
    rol = 'ADMIN',
    activo = true
WHERE correo = 'admin@erp.com';

-- SUPERVISOR: supervisor@erp.com / supervisor123
UPDATE usuario 
SET password = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    nombre = 'Supervisor',
    rol = 'SUPERVISOR',
    activo = true
WHERE correo = 'supervisor@erp.com';

-- USER: user@erp.com / user123
UPDATE usuario 
SET password = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    nombre = 'Usuario',
    rol = 'USER',
    activo = true
WHERE correo = 'user@erp.com';

-- 3. Si algún usuario no existe, crearlo
INSERT INTO usuario (correo, nombre, password, rol, activo) 
SELECT 'admin@erp.com', 'Administrador', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN', true
WHERE NOT EXISTS (SELECT 1 FROM usuario WHERE correo = 'admin@erp.com');

INSERT INTO usuario (correo, nombre, password, rol, activo) 
SELECT 'supervisor@erp.com', 'Supervisor', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'SUPERVISOR', true
WHERE NOT EXISTS (SELECT 1 FROM usuario WHERE correo = 'supervisor@erp.com');

INSERT INTO usuario (correo, nombre, password, rol, activo) 
SELECT 'user@erp.com', 'Usuario', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'USER', true
WHERE NOT EXISTS (SELECT 1 FROM usuario WHERE correo = 'user@erp.com');

-- 4. Verificar usuarios después de la actualización
SELECT '=== USUARIOS DESPUÉS DE ACTUALIZAR ===' as info;
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
WHERE correo IN ('admin@erp.com', 'supervisor@erp.com', 'user@erp.com')
ORDER BY correo;

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
-- ADMIN: admin@erp.com / admin1234
-- SUPERVISOR: supervisor@erp.com / supervisor123  
-- USER: user@erp.com / user123
-- Todos los usuarios están ACTIVOS
-- ===========================================

-- =============================Juana Pérez Admin

INSERT INTO usuario (correo, nombre, password, rol, activo)
VALUES (
  'juana.perez@erp.com',
  'Juana Pérez',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', -- Contraseña: juana1234
  'ADMIN',
  true
);

ALTER TABLE usuario ADD COLUMN avatar VARCHAR(255) DEFAULT NULL;

-- ========Contraseñas Seguras Modif==================================

USE erp_sena;

UPDATE usuario SET password = '$2a$12$UOUtsiSzhqfoawIkAgEVnO/19JcxLwiBgcso4hsfKjyz/vUjp0y8O' WHERE correo = 'admin@erp.com';
UPDATE usuario SET password = '$$2a$12$acw1pyH7wtSI6zWI1BueSe1Yecr7nDmWxzPnLvrI4GHAqDlhmqIxW' WHERE correo = 'supervisor@erp.com';
UPDATE usuario SET password = '$$2a$12$KtyGf1oIe.PZLzkbpURc3ebkU.Aj4ja6qldl3lNLoZF8QQDXcEsnW' WHERE correo = 'user@erp.com';

SELECT id, correo, nombre, password FROM usuario WHERE correo = 'admin@erp.com';


-- ============================Juana Perez ejemplo para avatar

  UPDATE usuario
  SET avatar = '/api/files/avatar_27_1752363512183_foto01_mujer.png'
  WHERE correo = 'juana.perez@erp.com';
  
  -- ==============================
  
  -- Script para verificar y corregir el avatar de Juana Pérez
USE erp_sena;

-- Verificar el estado actual de Juana Pérez
SELECT '=== ESTADO ACTUAL DE JUANA PÉREZ ===' as info;
SELECT id, correo, nombre, rol, avatar, activo FROM usuario WHERE nombre LIKE '%Juana%' OR correo LIKE '%juana%';

-- Corregir la URL del avatar para que use el endpoint correcto
UPDATE usuario 
SET avatar = '/api/files/foto01 mujer.png'
WHERE (nombre LIKE '%Juana%' OR correo LIKE '%juana%') 
AND (avatar IS NULL OR avatar NOT LIKE '/api/files/%');

-- Verificar el estado después de la corrección
SELECT '=== ESTADO DESPUÉS DE CORREGIR ===' as info;
SELECT id, correo, nombre, rol, avatar, activo FROM usuario WHERE nombre LIKE '%Juana%' OR correo LIKE '%juana%';

-- Mostrar todos los usuarios con avatares para verificar
SELECT '=== TODOS LOS USUARIOS CON AVATAR ===' as info;
SELECT id, correo, nombre, rol, avatar, activo FROM usuario WHERE avatar IS NOT NULL AND avatar != '' ORDER BY id;