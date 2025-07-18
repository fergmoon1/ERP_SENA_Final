-- Script para verificar la estructura actual de la tabla cliente
-- Sistema ERP SENA

USE erp_sena;

-- Verificar la estructura actual de la tabla cliente
DESCRIBE cliente;

-- Mostrar los datos actuales
SELECT * FROM cliente LIMIT 5;

-- Verificar si existen campos específicos
SELECT 
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE,
    COLUMN_DEFAULT
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_SCHEMA = 'erp_sena' 
AND TABLE_NAME = 'cliente'
ORDER BY ORDINAL_POSITION; 