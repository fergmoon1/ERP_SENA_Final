-- Script para agregar la columna imagenUrl a la tabla de productos
-- Ejecutar este script en la base de datos para agregar soporte para imágenes

-- Verificar si la columna ya existe
IF NOT EXISTS (
    SELECT * FROM INFORMATION_SCHEMA.COLUMNS 
    WHERE TABLE_NAME = 'producto' AND COLUMN_NAME = 'imagen_url'
)
BEGIN
    -- Agregar la columna imagen_url
    ALTER TABLE producto ADD COLUMN imagen_url VARCHAR(255);
    
    PRINT 'Columna imagen_url agregada exitosamente a la tabla producto';
END
ELSE
BEGIN
    PRINT 'La columna imagen_url ya existe en la tabla producto';
END

-- Actualizar productos existentes con imagen por defecto (opcional)
-- UPDATE producto SET imagen_url = NULL WHERE imagen_url IS NULL; 