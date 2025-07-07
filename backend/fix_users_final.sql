-- ===========================================
-- SCRIPT DEFINITIVO PARA CORREGIR USUARIOS
-- ===========================================

USE erp_sena;

-- Limpiar usuarios existentes
DELETE FROM usuario WHERE correo IN ('admin@erp.com', 'supervisor@erp.com', 'user@erp.com', 'admin@empresa.com', 'supervisor@empresa.com', 'user@empresa.com');

-- Insertar usuarios con contraseñas BCrypt válidas
INSERT INTO usuario (correo, nombre, password, rol) VALUES 
('admin@erp.com', 'Administrador', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'ADMIN'),
('supervisor@erp.com', 'Supervisor', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'SUPERVISOR'),
('user@erp.com', 'Usuario', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi.', 'USER');

-- Verificar que se insertaron correctamente
SELECT id, correo, nombre, rol, LENGTH(password) as password_length FROM usuario ORDER BY id; 