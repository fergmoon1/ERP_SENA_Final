-- Script para verificar datos existentes en la base de datos

-- Verificar pedidos existentes
SELECT 'PEDIDOS' as tabla, COUNT(*) as cantidad FROM pedido;

-- Verificar productos existentes
SELECT 'PRODUCTOS' as tabla, COUNT(*) as cantidad FROM producto;

-- Verificar clientes existentes
SELECT 'CLIENTES' as tabla, COUNT(*) as cantidad FROM cliente;

-- Verificar proveedores existentes
SELECT 'PROVEEDORES' as tabla, COUNT(*) as cantidad FROM proveedor;

-- Verificar estados de pedidos existentes
SELECT estado, COUNT(*) as cantidad 
FROM pedido 
WHERE estado IS NOT NULL 
GROUP BY estado 
ORDER BY cantidad DESC;

-- Verificar pedidos sin estado
SELECT COUNT(*) as pedidos_sin_estado 
FROM pedido 
WHERE estado IS NULL;

-- Verificar estructura de tablas
DESCRIBE pedido;
DESCRIBE producto;
DESCRIBE cliente;
DESCRIBE proveedor; 