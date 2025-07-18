-- Script para verificar el estado actual de las imágenes de productos
-- ERP SENA - Sistema de Gestión

USE erp_sena;

-- 1. Verificar estructura de la tabla
SELECT '=== ESTRUCTURA DE LA TABLA PRODUCTO ===' as info;
DESCRIBE producto;

-- 2. Verificar todos los productos y sus URLs de imagen
SELECT '=== PRODUCTOS Y SUS URLs DE IMAGEN ===' as info;
SELECT 
    id,
    nombre,
    descripcion,
    precio,
    stock,
    imagen_url,
    CASE 
        WHEN imagen_url LIKE '%ejemplo.jpg%' THEN '❌ INCORRECTO (.jpg)'
        WHEN imagen_url LIKE '%ejemplo.png%' THEN '✅ CORRECTO (.png)'
        WHEN imagen_url IS NULL OR imagen_url = '' THEN '⚠️ SIN IMAGEN'
        ELSE '📁 OTRO ARCHIVO'
    END as estado_imagen
FROM producto
ORDER BY id;

-- 3. Contar productos con URLs incorrectas
SELECT '=== RESUMEN ===' as info;
SELECT 
    COUNT(*) as total_productos,
    SUM(CASE WHEN imagen_url LIKE '%ejemplo.jpg%' THEN 1 ELSE 0 END) as con_jpg_incorrecto,
    SUM(CASE WHEN imagen_url LIKE '%ejemplo.png%' THEN 1 ELSE 0 END) as con_png_correcto,
    SUM(CASE WHEN imagen_url IS NULL OR imagen_url = '' THEN 1 ELSE 0 END) as sin_imagen
FROM producto;

-- 4. Mostrar productos que necesitan corrección
SELECT '=== PRODUCTOS QUE NECESITAN CORRECCIÓN ===' as info;
SELECT 
    id,
    nombre,
    imagen_url
FROM producto
WHERE imagen_url LIKE '%ejemplo.jpg%' OR imagen_url IS NULL OR imagen_url = ''; 