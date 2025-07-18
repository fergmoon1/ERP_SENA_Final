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