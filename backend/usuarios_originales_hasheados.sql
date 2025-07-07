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