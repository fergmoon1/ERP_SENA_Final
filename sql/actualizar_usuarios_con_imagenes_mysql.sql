-- Script para actualizar usuarios con imágenes de ejemplo (MySQL)
-- Este script asigna imágenes de avatar a usuarios existentes

-- Verificar si el campo avatar existe en la tabla usuario
SELECT COLUMN_NAME 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'usuario' AND COLUMN_NAME = 'avatar';

-- Actualizar usuarios con imágenes de avatar
UPDATE usuario 
SET avatar = 'admin.png' 
WHERE correo = 'admin@empresa.com';

UPDATE usuario 
SET avatar = 'supervisor.png' 
WHERE correo = 'supervisor@empresa.com';

UPDATE usuario 
SET avatar = 'usuario.png' 
WHERE correo = 'usuario@empresa.com';

-- Verificar usuarios actualizados
SELECT id, nombre, correo, rol, avatar 
FROM usuario 
ORDER BY id;

-- Mostrar estadísticas
SELECT 
    COUNT(*) as total_usuarios,
    COUNT(avatar) as usuarios_con_avatar,
    COUNT(*) - COUNT(avatar) as usuarios_sin_avatar
FROM usuario; 