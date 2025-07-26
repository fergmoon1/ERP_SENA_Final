ALTER TABLE producto ADD COLUMN imagen_url VARCHAR(255);

-- Script para actualizar todos los productos y ponerles una imagen de ejemplo si no tienen imagen

UPDATE producto
SET imagen_url = '/api/files/productos/ejemplo.png'
WHERE imagen_url IS NULL OR imagen_url = '';

-- =========corregir la url===================

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

-- ===========Precios productos===================

-- Script para actualizar precios de productos
-- ERP SENA - Sistema de Gestión

USE erp_sena;

-- 1. Verificar productos actuales y sus precios
SELECT '=== PRODUCTOS ACTUALES ===' as info;
SELECT 
    id,
    nombre,
    descripcion,
    precio,
    stock,
    imagen_url
FROM producto
ORDER BY id;

-- 2. Actualizar precios con valores más realistas
UPDATE producto 
SET precio = CASE 
    WHEN id = 1 THEN 150000.00  -- Producto de prueba
    WHEN id = 2 THEN 180000.00  -- Producto de prueba 2
    WHEN id = 3 THEN 45000.00   -- Producto Stock-Test
    WHEN id = 4 THEN 85000.00   -- Teclado USB
    WHEN id = 5 THEN 1200000.00 -- Impresora HP
    ELSE precio
END
WHERE id IN (1, 2, 3, 4, 5);

-- 3. Verificar productos después de actualizar precios
SELECT '=== PRODUCTOS DESPUÉS DE ACTUALIZAR PRECIOS ===' as info;
SELECT 
    id,
    nombre,
    descripcion,
    CONCAT('$', FORMAT(precio, 0, 'es_CO')) as precio_formateado,
    stock,
    imagen_url
FROM producto
ORDER BY id;

-- 4. Resumen de cambios
SELECT '=== RESUMEN DE CAMBIOS ===' as info;
SELECT 
    COUNT(*) as total_productos,
    SUM(CASE WHEN precio > 0 THEN 1 ELSE 0 END) as productos_con_precio,
    SUM(CASE WHEN precio = 0 OR precio IS NULL THEN 1 ELSE 0 END) as productos_sin_precio,
    AVG(precio) as precio_promedio,
    MIN(precio) as precio_minimo,
    MAX(precio) as precio_maximo
FROM producto;

