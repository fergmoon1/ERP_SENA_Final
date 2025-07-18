-- =====================================================
-- SCRIPT PARA POBLAR NOTIFICACIONES DE EJEMPLO
-- ERP SENA - Sistema de Notificaciones
-- =====================================================

-- 1. ELIMINAR NOTIFICACIONES EXISTENTES
-- =====================================================
DELETE FROM notificacion;

-- Reiniciar el auto-increment
ALTER TABLE notificacion AUTO_INCREMENT = 1;

-- 2. VERIFICAR USUARIOS DISPONIBLES
-- =====================================================
-- Ejecuta esto primero para ver qué usuarios tienes:
-- SELECT id, nombre, correo FROM usuario;

-- 3. INSERTAR NOTIFICACIONES DE EJEMPLO
-- =====================================================
-- NOTA: Cambia los usuario_id por los IDs reales de tu base de datos
-- Si no tienes usuarios, primero crea algunos usuarios de ejemplo

-- Notificaciones para el usuario con ID 1 (Administrador)
INSERT INTO notificacion (usuario_id, titulo, mensaje, leida, fecha_creacion) VALUES
(1, 'Stock bajo - Producto crítico', 'El producto "Laptop HP Pavilion" tiene solo 3 unidades en stock. Se recomienda hacer un pedido urgente.', false, NOW() - INTERVAL 2 HOUR),
(1, 'Nuevo pedido recibido', 'Se ha registrado un nuevo pedido #PED-2024-001 por $2,500.00 del cliente Juan Pérez.', false, NOW() - INTERVAL 1 HOUR),
(1, 'Pago confirmado', 'El pago del pedido #PED-2023-089 ha sido confirmado. Monto: $1,200.00', true, NOW() - INTERVAL 30 MINUTE),
(1, 'Proveedor actualizado', 'La información del proveedor "Tecnología Avanzada S.A." ha sido actualizada exitosamente.', true, NOW() - INTERVAL 1 DAY),
(1, 'Reporte mensual disponible', 'El reporte de ventas del mes de enero está listo para revisión.', false, NOW() - INTERVAL 6 HOUR),
(1, 'Mantenimiento programado', 'El sistema estará en mantenimiento el próximo domingo de 2:00 AM a 6:00 AM.', true, NOW() - INTERVAL 2 DAY),
(1, 'Nuevo usuario registrado', 'Se ha registrado un nuevo usuario: María González (Vendedor)', false, NOW() - INTERVAL 45 MINUTE),
(1, 'Backup completado', 'El backup automático de la base de datos se ha completado exitosamente.', true, NOW() - INTERVAL 12 HOUR);

-- Notificaciones para el usuario con ID 2 (Vendedor)
INSERT INTO notificacion (usuario_id, titulo, mensaje, leida, fecha_creacion) VALUES
(2, 'Meta de ventas alcanzada', '¡Felicitaciones! Has alcanzado tu meta de ventas del mes. Ventas totales: $15,000', false, NOW() - INTERVAL 1 HOUR),
(2, 'Cliente VIP visitando', 'El cliente VIP Carlos Rodríguez visitará la tienda mañana a las 10:00 AM.', false, NOW() - INTERVAL 3 HOUR),
(2, 'Producto agotado', 'El producto "Mouse Gaming RGB" se ha agotado. Hay 5 clientes en lista de espera.', true, NOW() - INTERVAL 1 DAY),
(2, 'Capacitación programada', 'Nueva capacitación sobre productos tecnológicos el próximo viernes a las 3:00 PM.', false, NOW() - INTERVAL 4 HOUR);

-- Notificaciones para el usuario con ID 3 (Inventario)
INSERT INTO notificacion (usuario_id, titulo, mensaje, leida, fecha_creacion) VALUES
(3, 'Inventario físico completado', 'El inventario físico del almacén principal ha sido completado. Diferencia: 2 productos.', false, NOW() - INTERVAL 30 MINUTE),
(3, 'Producto vencido detectado', 'Se detectaron 3 unidades del producto "Batería Externa" próximas a vencer (15 días).', false, NOW() - INTERVAL 2 HOUR),
(3, 'Nuevo proveedor agregado', 'Se ha agregado el proveedor "Electrónicos del Norte" al sistema.', true, NOW() - INTERVAL 1 DAY),
(3, 'Movimiento de inventario', 'Se registró una salida de 50 unidades del producto "Cable USB-C" para el pedido #PED-2024-002.', true, NOW() - INTERVAL 6 HOUR);

-- 4. VERIFICAR INSERCIÓN
-- =====================================================
-- Ejecuta esto para verificar que se insertaron correctamente:
SELECT 
    n.id,
    n.titulo,
    n.mensaje,
    n.leida,
    n.fecha_creacion,
    u.nombre as usuario
FROM notificacion n
LEFT JOIN usuario u ON n.usuario_id = u.id
ORDER BY n.fecha_creacion DESC;

-- 4. VERIFICAR INSERCIÓN
-- =====================================================
-- Ejecuta esto para verificar que se insertaron correctamente:
SELECT 
    n.id,
    n.titulo,
    n.mensaje,
    n.leida,
    n.fecha_creacion,
    u.nombre as usuario
FROM notificacion n
LEFT JOIN usuario u ON n.usuario_id = u.id
ORDER BY n.fecha_creacion DESC;

-- =====================================================
-- INSTRUCCIONES ADICIONALES
-- =====================================================

-- Si no tienes usuarios en la base de datos, primero ejecuta esto:
/*
INSERT INTO usuario (nombre, correo, rol, password, activo) VALUES
('Administrador', 'admin@empresa.com', 'Administrador', '$2a$10$encrypted_password', true),
('Vendedor', 'vendedor@empresa.com', 'Vendedor', '$2a$10$encrypted_password', true),
('Inventario', 'inventario@empresa.com', 'Inventario', '$2a$10$encrypted_password', true);
*/

-- Para limpiar todo y empezar de nuevo:
/*
DELETE FROM notificacion;
ALTER TABLE notificacion AUTO_INCREMENT = 1;
DELETE FROM usuario;
ALTER TABLE usuario AUTO_INCREMENT = 1;
*/