-- Actualizar pedidos existentes con estados
UPDATE pedido SET estado = 'Entregado' WHERE id = 1;
UPDATE pedido SET estado = 'Pendiente' WHERE id = 2;
UPDATE pedido SET estado = 'Enviado' WHERE id = 3;
UPDATE pedido SET estado = 'Cancelado' WHERE id = 4;
UPDATE pedido SET estado = 'Entregado' WHERE id = 5;

-- Agregar nuevos pedidos de ejemplo con diferentes estados
INSERT INTO pedido (fecha, total, cliente_id, estado) VALUES 
('2024-12-01', 150.00, 1, 'Pendiente'),
('2024-12-02', 320.50, 1, 'Enviado'),
('2024-12-03', 450.75, 1, 'Entregado'),
('2024-12-04', 180.25, 1, 'Pendiente'),
('2024-12-05', 275.00, 1, 'Enviado'),
('2024-12-06', 390.00, 1, 'Entregado'),
('2024-12-07', 125.50, 1, 'Cancelado'),
('2024-12-08', 500.00, 1, 'Pendiente'),
('2024-12-09', 225.75, 1, 'Enviado'),
('2024-12-10', 350.25, 1, 'Entregado');

-- Verificar los pedidos con sus estados
SELECT id, fecha, total, estado FROM pedido ORDER BY fecha DESC; 

-- Script simple para solo actualizar estados de pedidos existentes
-- Este script es seguro y no intenta insertar datos duplicados

-- Actualizar pedidos existentes con estados (solo si no tienen estado)(script simple)
UPDATE pedido SET estado = 'Entregado' WHERE id = 1 AND (estado IS NULL OR estado = '');
UPDATE pedido SET estado = 'Pendiente' WHERE id = 2 AND (estado IS NULL OR estado = '');
UPDATE pedido SET estado = 'Enviado' WHERE id = 3 AND (estado IS NULL OR estado = '');
UPDATE pedido SET estado = 'Cancelado' WHERE id = 4 AND (estado IS NULL OR estado = '');
UPDATE pedido SET estado = 'Entregado' WHERE id = 5 AND (estado IS NULL OR estado = '');

-- Verificar el resultado
SELECT 'PEDIDOS ACTUALIZADOS:' as info;
SELECT id, fecha, total, estado FROM pedido ORDER BY id;

-- Mostrar distribución de estados
SELECT 'DISTRIBUCIÓN DE ESTADOS:' as info;
SELECT estado, COUNT(*) as cantidad 
FROM pedido 
WHERE estado IS NOT NULL AND estado != ''
GROUP BY estado 
ORDER BY cantidad DESC; 

-- Verificar datos existentes
SELECT 'PEDIDOS:' as tabla, COUNT(*) as cantidad FROM pedido;
SELECT 'PRODUCTOS:' as tabla, COUNT(*) as cantidad FROM producto;
SELECT 'CLIENTES:' as tabla, COUNT(*) as cantidad FROM cliente;

-- Verificar estados de pedidos  
SELECT estado, COUNT(*) as cantidad 
FROM pedido 
WHERE estado IS NOT NULL 
GROUP BY estado;