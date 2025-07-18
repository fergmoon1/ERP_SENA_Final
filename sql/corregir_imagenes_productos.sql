-- Script para corregir las imágenes de productos
-- ERP SENA - Sistema de Gestión

USE erp_sena;

-- 1. Verificar si la columna imagen_url existe
SELECT '=== VERIFICANDO ESTRUCTURA DE LA TABLA PRODUCTO ===' as info;
DESCRIBE producto;

-- 2. Agregar la columna imagen_url si no existe
ALTER TABLE producto ADD COLUMN IF NOT EXISTS imagen_url VARCHAR(255);

-- 3. Verificar productos existentes
SELECT '=== PRODUCTOS EXISTENTES ===' as info;
SELECT id, nombre, descripcion, precio, stock, imagen_url FROM producto;

-- 4. Actualizar productos con imagen de ejemplo (corregir extensión de .jpg a .png)
UPDATE producto 
SET imagen_url = '/api/files/productos/ejemplo.png'
WHERE imagen_url IS NULL OR imagen_url = '' OR imagen_url LIKE '%ejemplo.jpg%';

-- 5. Verificar productos después de actualizar
SELECT '=== PRODUCTOS DESPUÉS DE ACTUALIZAR ===' as info;
SELECT id, nombre, descripcion, precio, stock, imagen_url FROM producto;

-- 6. Verificar que el archivo ejemplo.png existe en el servidor
SELECT '=== VERIFICACIÓN FINAL ===' as info;
SELECT 
    'El archivo ejemplo.png debe estar en: backend/uploads/productos/ejemplo.png' as ubicacion_archivo,
    'La URL en la BD debe ser: /api/files/productos/ejemplo.png' as url_correcta; 