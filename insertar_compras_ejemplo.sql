-- Script para insertar datos de ejemplo de compras
-- Asegúrate de que las tablas compra y detalle_compra existan

-- Insertar compras de ejemplo
INSERT INTO compra (proveedor_id, fecha, numero_factura, estado, subtotal, descuento_total, iva, total, observaciones, fecha_registro, fecha_actualizacion) VALUES
(1, '2024-01-15', 'FAC-001-2024', 'RECIBIDA', 1500000.00, 75000.00, 285000.00, 1710000.00, 'Compra de productos de tecnología', NOW(), NOW()),
(2, '2024-01-20', 'FAC-002-2024', 'PENDIENTE', 2500000.00, 125000.00, 475000.00, 2850000.00, 'Compra de materia prima', NOW(), NOW()),
(3, '2024-02-01', 'FAC-003-2024', 'RECIBIDA', 800000.00, 40000.00, 152000.00, 912000.00, 'Importación de componentes', NOW(), NOW());

-- Insertar detalles de compra
INSERT INTO detalle_compra (compra_id, producto_id, cantidad, precio_unitario, descuento, subtotal) VALUES
-- Detalles para compra 1
(1, 1, 10, 150000.00, 7500.00, 1425000.00),
(1, 2, 5, 15000.00, 0.00, 75000.00),

-- Detalles para compra 2
(2, 3, 20, 100000.00, 5000.00, 1900000.00),
(2, 4, 15, 40000.00, 2000.00, 570000.00),

-- Detalles para compra 3
(3, 5, 8, 100000.00, 5000.00, 760000.00),
(3, 1, 4, 10000.00, 0.00, 40000.00); 