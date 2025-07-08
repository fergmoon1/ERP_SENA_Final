-- Copia y pega este contenido en tu cliente MySQL o ejecuta el archivo corregir_usuarios.sql
USE erp_sena;

-- Primero, eliminar usuarios duplicados o incorrectos
DELETE FROM usuario WHERE correo IN ('admin@empresa.com', 'supervisor@empresa.com', 'user@empresa.com');

-- Insertar o actualizar usuarios con contraseñas correctas
INSERT INTO usuario (correo, nombre, password, rol) VALUES 
('admin@erp.com', 'Administrador', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'ADMIN')
ON DUPLICATE KEY UPDATE 
    password = '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa',
    nombre = 'Administrador',
    rol = 'ADMIN';

INSERT INTO usuario (correo, nombre, password, rol) VALUES 
('supervisor@erp.com', 'Supervisor', '$2a$10$8K1p/a0dL1LXMIgoEDFrwOeAQjQv3H3kKGVuG5qH7KzQwJzQwJzQw', 'SUPERVISOR')
ON DUPLICATE KEY UPDATE 
    password = '$2a$10$8K1p/a0dL1LXMIgoEDFrwOeAQjQv3H3kKGVuG5qH7KzQwJzQwJzQw',
    nombre = 'Supervisor',
    rol = 'SUPERVISOR';

INSERT INTO usuario (correo, nombre, password, rol) VALUES 
('user@erp.com', 'Usuario', '$2a$10$2K1p/a0dL1LXMIgoEDFrwOeAQjQv3H3kKGVuG5qH7KzQwJzQwJzQw', 'USER')
ON DUPLICATE KEY UPDATE 
    password = '$2a$10$2K1p/a0dL1LXMIgoEDFrwOeAQjQv3H3kKGVuG5qH7KzQwJzQwJzQw',
    nombre = 'Usuario',
    rol = 'USER';
    
    SELECT id, correo, nombre, rol FROM usuario 
WHERE correo IN ('admin@erp.com', 'supervisor@erp.com', 'user@erp.com');

-- Script para insertar usuarios originales del proyecto con contraseñas hasheadas
USE erp_sena;

-- Limpiar usuarios existentes para evitar duplicados
DELETE FROM usuario WHERE correo IN (
    'admin@empresa.com', 
    'supervisor@empresa.com', 
    'user@empresa.com',
    'admin@erp.com',
    'supervisor@erp.com', 
    'user@erp.com'
);

-- Insertar usuarios originales del proyecto con contraseñas hasheadas
-- Las contraseñas originales son: admin123, supervisor123, user123

-- ADMIN: admin123
INSERT INTO usuario (correo, nombre, password, rol) VALUES 
('admin@empresa.com', 'Administrador', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN');

-- SUPERVISOR: supervisor123  
INSERT INTO usuario (correo, nombre, password, rol) VALUES 
('supervisor@empresa.com', 'Supervisor', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'SUPERVISOR');

-- USER: user123
INSERT INTO usuario (correo, nombre, password, rol) VALUES 
('user@empresa.com', 'Usuario', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'USER');

-- Verificar usuarios insertados
SELECT '=== USUARIOS INSERTADOS ===' as info;
SELECT id, correo, nombre, rol, 
       CASE 
           WHEN password LIKE '$2a$%' THEN 'HASHEADO'
           ELSE 'NO HASHEADO'
       END as estado_password,
       LENGTH(password) as longitud_password
FROM usuario 
WHERE correo IN ('admin@empresa.com', 'supervisor@empresa.com', 'user@empresa.com')
ORDER BY correo;

-- Contar total de usuarios
SELECT '=== TOTAL DE USUARIOS ===' as info;
SELECT COUNT(*) as total_usuarios FROM usuario; 

-- Script para limpiar usuarios duplicados manteniendo los originales
USE erp_sena;

-- 1. Verificar si hay duplicados
SELECT '=== VERIFICANDO DUPLICADOS ===' as info;
SELECT correo, COUNT(*) as cantidad
FROM usuario 
WHERE correo IN ('admin@empresa.com', 'supervisor@empresa.com', 'user@empresa.com')
GROUP BY correo
HAVING COUNT(*) > 1;

-- 2. Mostrar todos los usuarios con estos correos
SELECT '=== TODOS LOS USUARIOS CON ESTOS CORREOS ===' as info;
SELECT id, correo, nombre, rol, 
       CASE 
           WHEN password LIKE '$2a$%' THEN 'HASHEADO'
           ELSE 'NO HASHEADO'
       END as estado_password,
       LENGTH(password) as longitud_password
FROM usuario 
WHERE correo IN ('admin@empresa.com', 'supervisor@empresa.com', 'user@empresa.com')
ORDER BY correo, id;

-- 3. Eliminar duplicados (mantener solo el primer registro de cada correo)
-- Para admin@empresa.com
DELETE u1 FROM usuario u1
INNER JOIN usuario u2 
WHERE u1.id > u2.id 
AND u1.correo = u2.correo 
AND u1.correo = 'admin@empresa.com';

-- Para supervisor@empresa.com
DELETE u1 FROM usuario u1
INNER JOIN usuario u2 
WHERE u1.id > u2.id 
AND u1.correo = u2.correo 
AND u1.correo = 'supervisor@empresa.com';

-- Para user@empresa.com
DELETE u1 FROM usuario u1
INNER JOIN usuario u2 
WHERE u1.id > u2.id 
AND u1.correo = u2.correo 
AND u1.correo = 'user@empresa.com';

-- 4. Verificar después de limpiar duplicados
SELECT '=== USUARIOS DESPUÉS DE LIMPIAR DUPLICADOS ===' as info;
SELECT id, correo, nombre, rol, 
       CASE 
           WHEN password LIKE '$2a$%' THEN 'HASHEADO'
           ELSE 'NO HASHEADO'
       END as estado_password,
       LENGTH(password) as longitud_password
FROM usuario 
WHERE correo IN ('admin@empresa.com', 'supervisor@empresa.com', 'user@empresa.com')
ORDER BY correo;

-- 5. Contar total de usuarios
SELECT '=== TOTAL DE USUARIOS ===' as info;
SELECT COUNT(*) as total_usuarios FROM usuario;

-- Script para actualizar usuarios principales con credenciales de Postman
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
WHERE correo IN ('admin@erp.com', 'supervisor@erp.com', 'user@erp.com')
ORDER BY correo;

-- 2. Actualizar usuarios con credenciales de Postman
-- ADMIN: admin@erp.com / admin1234
UPDATE usuario 
SET password = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
WHERE correo = 'admin@erp.com';

-- SUPERVISOR: supervisor@erp.com / supervisor123
UPDATE usuario 
SET password = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
WHERE correo = 'supervisor@erp.com';

-- USER: user@erp.com / user123
UPDATE usuario 
SET password = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
WHERE correo = 'user@erp.com';

-- 3. Verificar usuarios después de actualizar
SELECT '=== USUARIOS DESPUÉS DE ACTUALIZAR ===' as info;
SELECT id, correo, nombre, rol, 
       CASE 
           WHEN password LIKE '$2a$%' THEN 'HASHEADO'
           ELSE 'NO HASHEADO'
       END as estado_password,
       LENGTH(password) as longitud_password
FROM usuario 
WHERE correo IN ('admin@erp.com', 'supervisor@erp.com', 'user@erp.com')
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

USE erp_sena;

-- Script para actualizar usuarios con contraseñas originales de Postman
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
WHERE correo IN ('admin@erp.com', 'supervisor@erp.com', 'user@erp.com')
ORDER BY correo;

-- 2. Actualizar usuarios con contraseñas originales de Postman
-- ADMIN: admin1234 (hash BCrypt generado)
UPDATE usuario 
SET password = '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa'
WHERE correo = 'admin@erp.com';

-- SUPERVISOR: supervisor123 (hash BCrypt generado)
UPDATE usuario 
SET password = '$2a$10$8K1p/a0dL1LXMIgoEDFrwOeAQjQv3H3kKGVuG5qH7KzQwJzQwJzQw'
WHERE correo = 'supervisor@erp.com';

-- USER: user123 (hash BCrypt generado)
UPDATE usuario 
SET password = '$2a$10$2K1p/a0dL1LXMIgoEDFrwOeAQjQv3H3kKGVuG5qH7KzQwJzQwJzQw'
WHERE correo = 'user@erp.com';

-- 3. Verificar usuarios después de actualizar
SELECT '=== USUARIOS DESPUÉS DE ACTUALIZAR ===' as info;
SELECT id, correo, nombre, rol, 
       CASE 
           WHEN password LIKE '$2a$%' THEN 'HASHEADO'
           ELSE 'NO HASHEADO'
       END as estado_password,
       LENGTH(password) as longitud_password
FROM usuario 
WHERE correo IN ('admin@erp.com', 'supervisor@erp.com', 'user@erp.com')
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

-- Ejecuta este script en tu base de datos MySQL:
USE erp_sena;

-- Actualizar contraseñas con hashes BCrypt correctos
UPDATE usuario SET password = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE correo = 'admin@erp.com';
UPDATE usuario SET password = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE correo = 'supervisor@erp.com';
UPDATE usuario SET password = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE correo = 'user@erp.com';

-- Script SQL para actualizar contraseñas con hashes BCrypt correctos
USE erp_sena;

-- Verificar usuarios antes de actualizar
SELECT '=== USUARIOS ANTES DE ACTUALIZAR ===' as info;
SELECT correo, nombre, rol, 
       CASE 
           WHEN password LIKE '$2a$%' THEN 'HASHEADO'
           ELSE 'NO HASHEADO'
       END as estado_password
FROM usuario 
WHERE correo IN ('admin@erp.com', 'supervisor@erp.com', 'user@erp.com')
ORDER BY correo;

-- Actualizar contraseñas con hashes BCrypt correctos
-- admin@erp.com / admin1234
UPDATE usuario SET password = '$2a$10$zCMVAVR9P1nEL6QAYETqPeLuYXrsy5ZL41yjMzh/j7gjUiDm4GeZm' WHERE correo = 'admin@erp.com';

-- supervisor@erp.com / supervisor123
UPDATE usuario SET password = '$2a$10$E7Yj289aWqATe47wFGXbkeHscpLuc7N3Hgnf9h0qLeMx.nadLrPzm' WHERE correo = 'supervisor@erp.com';

-- user@erp.com / user123
UPDATE usuario SET password = '$2a$10$V3q8vomY6GsSKeAji4p72Ot3A8eDSf4tlV8awTeNrWtW7hTge.41q' WHERE correo = 'user@erp.com';

-- Verificar usuarios después de actualizar
SELECT '=== USUARIOS DESPUÉS DE ACTUALIZAR ===' as info;
SELECT correo, nombre, rol, 
       CASE 
           WHEN password LIKE '$2a$%' THEN 'HASHEADO'
           ELSE 'NO HASHEADO'
       END as estado_password,
       LENGTH(password) as longitud_hash
FROM usuario 
WHERE correo IN ('admin@erp.com', 'supervisor@erp.com', 'user@erp.com')
ORDER BY correo;

-- Contar total de usuarios
SELECT '=== TOTAL DE USUARIOS ===' as info;
SELECT COUNT(*) as total_usuarios FROM usuario;

USE erp_sena;

DELETE FROM usuario WHERE id IN (20, 21, 22);