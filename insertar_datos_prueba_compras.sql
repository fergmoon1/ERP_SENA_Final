-- Script para insertar datos de prueba de compras
-- Ejecutar en MySQL después de que el backend esté funcionando

USE erp_sena;

-- Insertar proveedores de prueba si no existen
INSERT IGNORE INTO proveedor (nombre, correo, telefono, direccion, tipo, nit, contacto, telefono_contacto, descripcion, activo) VALUES
('Tecnología Avanzada S.A.', 'contacto@tecnologiaavanzada.com', '3001234567', 'Calle 123 #45-67, Bogotá', 'Nacional', '900123456-7', 'Juan Pérez', '3001234567', 'Proveedor de equipos tecnológicos', 1),
('Electrónicos del Norte', 'ventas@electronicosnorte.com', '3002345678', 'Carrera 78 #90-12, Medellín', 'Nacional', '900234567-8', 'María García', '3002345678', 'Distribuidor de productos electrónicos', 1),
('Importaciones Global', 'info@importacionesglobal.com', '3003456789', 'Avenida 5 #23-45, Cali', 'Internacional', '900345678-9', 'Carlos López', '3003456789', 'Importador de productos tecnológicos', 1);

-- Insertar productos de prueba si no existen
INSERT IGNORE INTO producto (nombre, descripcion, precio, stock, imagen_url) VALUES
('Laptop HP Pavilion', 'Laptop HP Pavilion 15.6" Intel Core i5 8GB RAM 256GB SSD', 2500000.00, 50, '/uploads/productos/laptop-hp.jpg'),
('Mouse Inalámbrico Logitech', 'Mouse inalámbrico Logitech M185 con receptor USB', 45000.00, 100, '/uploads/productos/mouse-logitech.jpg'),
('Teclado Mecánico RGB', 'Teclado mecánico gaming con retroiluminación RGB', 180000.00, 30, '/uploads/productos/teclado-mecanico.jpg'),
('Monitor Samsung 24"', 'Monitor Samsung 24" Full HD LED', 350000.00, 25, '/uploads/productos/monitor-samsung.jpg'),
('Disco Duro Externo 1TB', 'Disco duro externo Western Digital 1TB USB 3.0', 120000.00, 40, '/uploads/productos/disco-externo.jpg');

-- Insertar compras de prueba
INSERT INTO compra (proveedor_id, fecha, numero_factura, estado, subtotal, descuento_total, iva, total, observaciones, fecha_registro, fecha_actualizacion, usuario) VALUES
(1, '2024-01-15', 'FAC-001-2024', 'Completada', 5000000.00, 250000.00, 950000.00, 5700000.00, 'Compra de equipos para oficina', NOW(), NOW(), 'admin'),
(2, '2024-01-20', 'FAC-002-2024', 'En Proceso', 1800000.00, 90000.00, 342000.00, 2052000.00, 'Equipos para sala de sistemas', NOW(), NOW(), 'supervisor'),
(3, '2024-01-25', 'FAC-003-2024', 'Completada', 3600000.00, 180000.00, 684000.00, 4104000.00, 'Renovación de equipos', NOW(), NOW(), 'admin');

-- Insertar detalles de compra
INSERT INTO detalle_compra (compra_id, producto_id, cantidad, precio_unitario, descuento, subtotal) VALUES
(1, 1, 2, 2500000.00, 250000.00, 4750000.00),
(2, 2, 20, 45000.00, 90000.00, 810000.00),
(2, 3, 5, 180000.00, 0.00, 900000.00),
(3, 4, 8, 350000.00, 180000.00, 2620000.00),
(3, 5, 10, 120000.00, 0.00, 1200000.00);

-- Verificar los datos insertados
SELECT 
    c.id,
    c.numero_factura,
    c.fecha,
    c.estado,
    c.total,
    p.nombre as proveedor,
    COUNT(dc.id) as total_detalles
FROM compra c
JOIN proveedor p ON c.proveedor_id = p.id
LEFT JOIN detalle_compra dc ON c.id = dc.compra_id
GROUP BY c.id, c.numero_factura, c.fecha, c.estado, c.total, p.nombre
ORDER BY c.fecha DESC; 