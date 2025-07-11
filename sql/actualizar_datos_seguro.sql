-- Script seguro para actualizar datos existentes y agregar datos de ejemplo
-- Este script evita errores de duplicados y claves foráneas

-- ===== 1. ACTUALIZAR PEDIDOS EXISTENTES CON ESTADOS =====
-- Solo actualizar pedidos que no tengan estado asignado
UPDATE pedido SET estado = 'Entregado' WHERE id = 1 AND estado IS NULL;
UPDATE pedido SET estado = 'Pendiente' WHERE id = 2 AND estado IS NULL;
UPDATE pedido SET estado = 'Enviado' WHERE id = 3 AND estado IS NULL;
UPDATE pedido SET estado = 'Cancelado' WHERE id = 4 AND estado IS NULL;
UPDATE pedido SET estado = 'Entregado' WHERE id = 5 AND estado IS NULL;

-- ===== 2. AGREGAR NUEVOS PEDIDOS DE EJEMPLO =====
-- Verificar si ya existen pedidos con estas fechas antes de insertar
INSERT INTO pedido (fecha, total, cliente_id, estado) 
SELECT * FROM (
    SELECT '2024-12-01' as fecha, 150.00 as total, 1 as cliente_id, 'Pendiente' as estado
) AS temp
WHERE NOT EXISTS (
    SELECT 1 FROM pedido WHERE fecha = '2024-12-01' AND total = 150.00
);

INSERT INTO pedido (fecha, total, cliente_id, estado) 
SELECT * FROM (
    SELECT '2024-12-02' as fecha, 320.50 as total, 1 as cliente_id, 'Enviado' as estado
) AS temp
WHERE NOT EXISTS (
    SELECT 1 FROM pedido WHERE fecha = '2024-12-02' AND total = 320.50
);

INSERT INTO pedido (fecha, total, cliente_id, estado) 
SELECT * FROM (
    SELECT '2024-12-03' as fecha, 450.75 as total, 1 as cliente_id, 'Entregado' as estado
) AS temp
WHERE NOT EXISTS (
    SELECT 1 FROM pedido WHERE fecha = '2024-12-03' AND total = 450.75
);

INSERT INTO pedido (fecha, total, cliente_id, estado) 
SELECT * FROM (
    SELECT '2024-12-04' as fecha, 180.25 as total, 1 as cliente_id, 'Pendiente' as estado
) AS temp
WHERE NOT EXISTS (
    SELECT 1 FROM pedido WHERE fecha = '2024-12-04' AND total = 180.25
);

INSERT INTO pedido (fecha, total, cliente_id, estado) 
SELECT * FROM (
    SELECT '2024-12-05' as fecha, 275.00 as total, 1 as cliente_id, 'Enviado' as estado
) AS temp
WHERE NOT EXISTS (
    SELECT 1 FROM pedido WHERE fecha = '2024-12-05' AND total = 275.00
);

-- ===== 3. AGREGAR PRODUCTOS DE EJEMPLO (solo si no existen) =====
INSERT INTO producto (nombre, descripcion, precio, stock, proveedor_id)
SELECT * FROM (
    SELECT 'Laptop HP Pavilion' as nombre, 'Laptop de 15 pulgadas, 8GB RAM, 256GB SSD' as descripcion, 899.99 as precio, 15 as stock, 1 as proveedor_id
) AS temp
WHERE NOT EXISTS (
    SELECT 1 FROM producto WHERE nombre = 'Laptop HP Pavilion'
);

INSERT INTO producto (nombre, descripcion, precio, stock, proveedor_id)
SELECT * FROM (
    SELECT 'Mouse Inalámbrico Logitech' as nombre, 'Mouse inalámbrico con sensor óptico' as descripcion, 25.50 as precio, 50 as stock, 1 as proveedor_id
) AS temp
WHERE NOT EXISTS (
    SELECT 1 FROM producto WHERE nombre = 'Mouse Inalámbrico Logitech'
);

INSERT INTO producto (nombre, descripcion, precio, stock, proveedor_id)
SELECT * FROM (
    SELECT 'Teclado Mecánico RGB' as nombre, 'Teclado mecánico con iluminación RGB' as descripcion, 89.99 as precio, 30 as stock, 1 as proveedor_id
) AS temp
WHERE NOT EXISTS (
    SELECT 1 FROM producto WHERE nombre = 'Teclado Mecánico RGB'
);

-- ===== 4. AGREGAR CLIENTES DE EJEMPLO (solo si no existen) =====
INSERT INTO cliente (nombre, email, telefono, direccion, fecha_creacion)
SELECT * FROM (
    SELECT 'María González' as nombre, 'maria.gonzalez@email.com' as email, '300-123-4567' as telefono, 'Calle 123 #45-67, Bogotá' as direccion, '2024-01-15' as fecha_creacion
) AS temp
WHERE NOT EXISTS (
    SELECT 1 FROM cliente WHERE email = 'maria.gonzalez@email.com'
);

INSERT INTO cliente (nombre, email, telefono, direccion, fecha_creacion)
SELECT * FROM (
    SELECT 'Carlos Rodríguez' as nombre, 'carlos.rodriguez@email.com' as email, '300-234-5678' as telefono, 'Carrera 78 #90-12, Medellín' as direccion, '2024-02-20' as fecha_creacion
) AS temp
WHERE NOT EXISTS (
    SELECT 1 FROM cliente WHERE email = 'carlos.rodriguez@email.com'
);

INSERT INTO cliente (nombre, email, telefono, direccion, fecha_creacion)
SELECT * FROM (
    SELECT 'Ana Martínez' as nombre, 'ana.martinez@email.com' as email, '300-345-6789' as telefono, 'Avenida 5 #23-45, Cali' as direccion, '2024-03-10' as fecha_creacion
) AS temp
WHERE NOT EXISTS (
    SELECT 1 FROM cliente WHERE email = 'ana.martinez@email.com'
);

-- ===== 5. VERIFICAR RESULTADOS =====
-- Mostrar pedidos por estado
SELECT 'PEDIDOS POR ESTADO:' as info;
SELECT estado, COUNT(*) as cantidad 
FROM pedido 
WHERE estado IS NOT NULL 
GROUP BY estado 
ORDER BY cantidad DESC;

-- Mostrar total de pedidos
SELECT 'TOTAL PEDIDOS:' as info, COUNT(*) as cantidad FROM pedido;

-- Mostrar productos
SELECT 'TOTAL PRODUCTOS:' as info, COUNT(*) as cantidad FROM producto;

-- Mostrar clientes
SELECT 'TOTAL CLIENTES:' as info, COUNT(*) as cantidad FROM cliente; 