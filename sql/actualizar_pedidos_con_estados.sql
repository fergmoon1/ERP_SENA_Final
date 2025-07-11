-- Script para actualizar pedidos existentes con estados
-- y agregar nuevos pedidos de ejemplo para mostrar los gráficos

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