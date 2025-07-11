-- Script para agregar datos de ejemplo para mostrar todos los gráficos del dashboard

-- ===== DATOS DE PRODUCTOS =====
-- Agregar productos de ejemplo
INSERT INTO producto (nombre, descripcion, precio, stock, proveedor_id) VALUES 
('Laptop HP Pavilion', 'Laptop de 15 pulgadas, 8GB RAM, 256GB SSD', 899.99, 15, 1),
('Mouse Inalámbrico Logitech', 'Mouse inalámbrico con sensor óptico', 25.50, 50, 1),
('Teclado Mecánico RGB', 'Teclado mecánico con iluminación RGB', 89.99, 30, 1),
('Monitor Samsung 24"', 'Monitor LED de 24 pulgadas Full HD', 199.99, 20, 1),
('Auriculares Bluetooth', 'Auriculares inalámbricos con cancelación de ruido', 79.99, 25, 1),
('Disco Duro Externo 1TB', 'Disco duro portátil de 1TB USB 3.0', 59.99, 40, 1),
('Webcam HD', 'Cámara web HD 1080p con micrófono', 45.00, 35, 1),
('Impresora Láser', 'Impresora láser monocromática', 299.99, 10, 1),
('Tablet Samsung Galaxy', 'Tablet de 10 pulgadas, 64GB', 349.99, 18, 1),
('Cable HDMI 2m', 'Cable HDMI de alta velocidad 2 metros', 12.99, 100, 1);

-- ===== DATOS DE CLIENTES =====
-- Agregar clientes de ejemplo con fechas de creación
INSERT INTO cliente (nombre, email, telefono, direccion, fecha_creacion) VALUES 
('María González', 'maria.gonzalez@email.com', '300-123-4567', 'Calle 123 #45-67, Bogotá', '2024-01-15'),
('Carlos Rodríguez', 'carlos.rodriguez@email.com', '300-234-5678', 'Carrera 78 #90-12, Medellín', '2024-02-20'),
('Ana Martínez', 'ana.martinez@email.com', '300-345-6789', 'Avenida 5 #23-45, Cali', '2024-03-10'),
('Luis Pérez', 'luis.perez@email.com', '300-456-7890', 'Calle 45 #67-89, Barranquilla', '2024-04-05'),
('Sofia Herrera', 'sofia.herrera@email.com', '300-567-8901', 'Carrera 12 #34-56, Cartagena', '2024-05-12'),
('Diego Silva', 'diego.silva@email.com', '300-678-9012', 'Avenida 8 #90-12, Bucaramanga', '2024-06-18'),
('Carmen Vargas', 'carmen.vargas@email.com', '300-789-0123', 'Calle 90 #12-34, Pereira', '2024-07-25'),
('Roberto Jiménez', 'roberto.jimenez@email.com', '300-890-1234', 'Carrera 34 #56-78, Manizales', '2024-08-30'),
('Patricia López', 'patricia.lopez@email.com', '300-901-2345', 'Avenida 15 #67-89, Ibagué', '2024-09-14'),
('Fernando Castro', 'fernando.castro@email.com', '300-012-3456', 'Calle 78 #90-12, Villavicencio', '2024-10-22');

-- ===== DATOS DE PEDIDOS CON DETALLES =====
-- Crear pedidos con diferentes fechas para mostrar ingresos por mes
INSERT INTO pedido (fecha, total, cliente_id, estado) VALUES 
-- Diciembre 2024
('2024-12-01', 150.00, 1, 'Pendiente'),
('2024-12-02', 320.50, 2, 'Enviado'),
('2024-12-03', 450.75, 3, 'Entregado'),
('2024-12-04', 180.25, 4, 'Pendiente'),
('2024-12-05', 275.00, 5, 'Enviado'),
('2024-12-06', 390.00, 6, 'Entregado'),
('2024-12-07', 125.50, 7, 'Cancelado'),
('2024-12-08', 500.00, 8, 'Pendiente'),
('2024-12-09', 225.75, 9, 'Enviado'),
('2024-12-10', 350.25, 10, 'Entregado'),
-- Noviembre 2024
('2024-11-15', 280.00, 1, 'Entregado'),
('2024-11-20', 420.50, 2, 'Entregado'),
('2024-11-25', 195.75, 3, 'Entregado'),
-- Octubre 2024
('2024-10-10', 310.00, 4, 'Entregado'),
('2024-10-15', 175.25, 5, 'Entregado'),
('2024-10-20', 445.50, 6, 'Entregado'),
-- Septiembre 2024
('2024-09-05', 290.75, 7, 'Entregado'),
('2024-09-10', 380.00, 8, 'Entregado'),
('2024-09-15', 220.50, 9, 'Entregado'),
-- Agosto 2024
('2024-08-01', 195.00, 10, 'Entregado'),
('2024-08-10', 425.75, 1, 'Entregado'),
('2024-08-20', 315.25, 2, 'Entregado');

-- ===== DATOS DE MOVIMIENTOS DE INVENTARIO =====
-- Agregar movimientos de inventario para mostrar el historial
INSERT INTO movimiento_inventario (producto_id, tipo, cantidad, fecha, motivo) VALUES 
(1, 'ENTRADA', 20, '2024-12-01', 'Compra inicial'),
(1, 'SALIDA', 5, '2024-12-02', 'Venta'),
(2, 'ENTRADA', 50, '2024-12-01', 'Compra inicial'),
(2, 'SALIDA', 10, '2024-12-03', 'Venta'),
(3, 'ENTRADA', 30, '2024-12-01', 'Compra inicial'),
(3, 'SALIDA', 8, '2024-12-04', 'Venta'),
(4, 'ENTRADA', 25, '2024-12-01', 'Compra inicial'),
(4, 'SALIDA', 5, '2024-12-05', 'Venta'),
(5, 'ENTRADA', 30, '2024-12-01', 'Compra inicial'),
(5, 'SALIDA', 12, '2024-12-06', 'Venta');

-- ===== VERIFICAR DATOS =====
-- Consultas para verificar que los datos se insertaron correctamente

-- Verificar pedidos por estado
SELECT estado, COUNT(*) as cantidad FROM pedido GROUP BY estado ORDER BY cantidad DESC;

-- Verificar ingresos por mes
SELECT 
    DATE_FORMAT(fecha, '%Y-%m') as mes,
    SUM(total) as ingreso,
    COUNT(*) as numeroPedidos
FROM pedido 
WHERE estado != 'Cancelado'
GROUP BY DATE_FORMAT(fecha, '%Y-%m')
ORDER BY mes DESC;

-- Verificar clientes nuevos por mes
SELECT 
    DATE_FORMAT(fecha_creacion, '%Y-%m') as mes,
    COUNT(*) as cantidad
FROM cliente 
GROUP BY DATE_FORMAT(fecha_creacion, '%Y-%m')
ORDER BY mes DESC;

-- Verificar productos con stock bajo
SELECT nombre, stock FROM producto WHERE stock <= 5 ORDER BY stock ASC; 