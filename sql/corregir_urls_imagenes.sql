-- Script para corregir URLs de imágenes que aún tienen .jpg
-- ERP SENA - Sistema de Gestión

USE erp_sena;

-- 1. Verificar productos con URLs incorrectas antes de corregir
SELECT '=== PRODUCTOS CON URLs INCORRECTAS (ANTES) ===' as info;
SELECT 
    id,
    nombre,
    imagen_url
FROM producto
WHERE imagen_url LIKE '%ejemplo.jpg%';

-- 2. Corregir URLs de .jpg a .png
UPDATE producto 
SET imagen_url = REPLACE(imagen_url, 'ejemplo.jpg', 'ejemplo.png')
WHERE imagen_url LIKE '%ejemplo.jpg%';

-- 3. Verificar productos después de la corrección
SELECT '=== PRODUCTOS DESPUÉS DE LA CORRECCIÓN ===' as info;
SELECT 
    id,
    nombre,
    imagen_url
FROM producto
WHERE imagen_url LIKE '%ejemplo.png%';

-- 4. Verificar que no queden URLs con .jpg
SELECT '=== VERIFICACIÓN FINAL ===' as info;
SELECT 
    COUNT(*) as productos_con_jpg
FROM producto
WHERE imagen_url LIKE '%ejemplo.jpg%';

-- 5. Mostrar todos los productos para verificación final
SELECT '=== TODOS LOS PRODUCTOS ===' as info;
SELECT 
    id,
    nombre,
    imagen_url,
    CASE 
        WHEN imagen_url LIKE '%ejemplo.png%' THEN '✅ CORRECTO'
        WHEN imagen_url LIKE '%ejemplo.jpg%' THEN '❌ INCORRECTO'
        WHEN imagen_url IS NULL OR imagen_url = '' THEN '⚠️ SIN IMAGEN'
        ELSE '📁 OTRO ARCHIVO'
    END as estado
FROM producto
ORDER BY id; 