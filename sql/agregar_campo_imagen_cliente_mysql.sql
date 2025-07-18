-- Script para agregar campo imagen a la tabla cliente (MySQL - Versión Simple)
-- Ejecutar este script para agregar el campo imagen a la tabla cliente

-- Verificar si el campo imagen ya existe
SELECT COLUMN_NAME 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'cliente' AND COLUMN_NAME = 'imagen';

-- Agregar el campo imagen (si ya existe, MySQL mostrará un error que puedes ignorar)
ALTER TABLE cliente ADD COLUMN imagen VARCHAR(255);

-- Verificar la estructura actualizada
SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'cliente'
ORDER BY ORDINAL_POSITION; 