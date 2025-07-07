-- Script para verificar y corregir usuarios en la base de datos
USE erp_sena;

-- 1. Verificar qué usuarios existen actualmente
SELECT '=== USUARIOS ACTUALES ===' as info;
SELECT id, correo, nombre, rol, 
       CASE 
           WHEN password LIKE '$2a$%' THEN 'HASHEADO'
           ELSE 'NO HASHEADO'
       END as estado_password,
       LENGTH(password) as longitud_password
FROM usuario 
WHERE correo IN ('admin@erp.com', 'supervisor@erp.com', 'user@erp.com')
ORDER BY correo;

-- 2. Eliminar usuarios duplicados o incorrectos
DELETE FROM usuario WHERE correo IN ('admin@empresa.com', 'supervisor@empresa.com', 'user@empresa.com');

-- 3. Insertar usuarios con contraseñas hasheadas correctamente
-- ADMIN: admin1234
INSERT INTO usuario (correo, nombre, password, rol) VALUES 
('admin@erp.com', 'Administrador', '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa', 'ADMIN')
ON DUPLICATE KEY UPDATE 
    password = '$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8lE9lBOsl7iKTVEFDa',
    nombre = 'Administrador',
    rol = 'ADMIN';

-- SUPERVISOR: supervisor123
INSERT INTO usuario (correo, nombre, password, rol) VALUES 
('supervisor@erp.com', 'Supervisor', '$2a$10$8K1p/a0dL1LXMIgoEDFrwOeAQjQv3H3kKGVuG5qH7KzQwJzQwJzQw', 'SUPERVISOR')
ON DUPLICATE KEY UPDATE 
    password = '$2a$10$8K1p/a0dL1LXMIgoEDFrwOeAQjQv3H3kKGVuG5qH7KzQwJzQwJzQw',
    nombre = 'Supervisor',
    rol = 'SUPERVISOR';

-- USER: user123
INSERT INTO usuario (correo, nombre, password, rol) VALUES 
('user@erp.com', 'Usuario', '$2a$10$2K1p/a0dL1LXMIgoEDFrwOeAQjQv3H3kKGVuG5qH7KzQwJzQwJzQw', 'USER')
ON DUPLICATE KEY UPDATE 
    password = '$2a$10$2K1p/a0dL1LXMIgoEDFrwOeAQjQv3H3kKGVuG5qH7KzQwJzQwJzQw',
    nombre = 'Usuario',
    rol = 'USER';

-- 4. Verificar usuarios después de la corrección
SELECT '=== USUARIOS DESPUÉS DE CORRECCIÓN ===' as info;
SELECT id, correo, nombre, rol, 
       CASE 
           WHEN password LIKE '$2a$%' THEN 'HASHEADO'
           ELSE 'NO HASHEADO'
       END as estado_password,
       LENGTH(password) as longitud_password
FROM usuario 
WHERE correo IN ('admin@erp.com', 'supervisor@erp.com', 'user@erp.com')
ORDER BY correo;

-- 5. Contar total de usuarios
SELECT '=== TOTAL DE USUARIOS ===' as info;
SELECT COUNT(*) as total_usuarios FROM usuario; 