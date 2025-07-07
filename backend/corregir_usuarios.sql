-- ===========================================
-- SCRIPT PARA CORREGIR USUARIOS Y CONTRASEÑAS
-- ===========================================

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

-- Verificar que los usuarios se crearon correctamente
SELECT id, correo, nombre, rol, LENGTH(password) as password_length FROM usuario 
WHERE correo IN ('admin@erp.com', 'supervisor@erp.com', 'user@erp.com');

-- Mostrar todos los usuarios para verificar
SELECT id, correo, nombre, rol FROM usuario ORDER BY id; 