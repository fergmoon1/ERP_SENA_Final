-- Script para agregar campo imagen a la tabla cliente (MySQL)
-- Ejecutar este script para agregar el campo imagen a la tabla cliente

-- Verificar si el campo imagen ya existe
SELECT COLUMN_NAME 
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'cliente' AND COLUMN_NAME = 'imagen';

-- Agregar el campo imagen si no existe
SET @sql = (
    SELECT IF(
        COUNT(*) = 0,
        'ALTER TABLE cliente ADD imagen VARCHAR(255)',
        'SELECT "El campo imagen ya existe en la tabla cliente" as mensaje'
    )
    FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'cliente' AND COLUMN_NAME = 'imagen'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Verificar la estructura actualizada
SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'cliente'
ORDER BY ORDINAL_POSITION; 