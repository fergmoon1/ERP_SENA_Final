-- Script simple para solo actualizar estados de pedidos existentes
-- Este script es seguro y no intenta insertar datos duplicados

-- Actualizar pedidos existentes con estados (solo si no tienen estado)
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