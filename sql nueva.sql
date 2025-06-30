-- DATOS DE EJEMPLO ADICIONALES PARA ERP SENA

-- USUARIOS (agrega 2 más)
INSERT INTO usuario (correo, nombre, password, rol) VALUES
('ventas@erp.com', 'Vendedor', '$2a$10$HzUnILP.0ib3.rszmAnhWeKUhPt35HB0.0Z65ouFLcFirtwKFLAOq', 'VENDEDOR'),
('inventario@erp.com', 'Inventario', '$2a$10$HzUnILP.0ib3.rszmAnhWeKUhPt35HB0.0Z65ouFLcFirtwKFLAOq', 'INVENTARIO');

-- CLIENTES (agrega 2 más)
INSERT INTO cliente (correo, direccion, nombre, telefono, tipo) VALUES
('cliente1@correo.com','Calle 50 #10-20, Bogotá','Cliente Ejemplo 1','3001112233','Persona'),
('empresa2@correo.com','Carrera 7 #45-67, Cali','Empresa Ejemplo 2','3202223344','Empresa');

-- PROVEEDORES (agrega 2 más)
INSERT INTO proveedor (nombre, correo, telefono, telefono_contacto, direccion, tipo, nit, nombre_contacto, activo) VALUES
('Importadora Global S.A.S.', 'info@importadoraglobal.com', '6054321098', '3204567890', 'Avenida 5 #23-45, Cali', 'Internacional', '700456789-0', 'Ana Martínez', true),
('Proveedor Local Express', 'ventas@proveedorexpress.com', '6067890123', '3156789012', 'Calle 10 #15-20, Barranquilla', 'Nacional', '600678901-2', 'Luis Pérez', true);

-- PRODUCTOS (agrega 2 más)
INSERT INTO producto (nombre, descripcion, precio, stock) VALUES
('Teclado USB', 'Teclado estándar para PC', 40, 15),
('Impresora HP', 'Impresora multifuncional', 600, 5);

-- PEDIDOS (ejemplo, usando clientes y usuarios existentes)
INSERT INTO pedido (fecha, total, cliente_id, usuario_id) VALUES
('2024-07-30', 250, 1, 1),
('2024-07-30', 500, 2, 2),
('2024-07-30', 120, 3, 3);

-- DETALLE_PEDIDO (ejemplo, usando pedidos y productos existentes)
INSERT INTO detalle_pedido (pedido_id, producto_id, cantidad) VALUES
(1, 1, 2),
(1, 2, 1),
(2, 3, 4),
(2, 4, 1),
(3, 5, 2);

-- COMPRAS (ejemplo, usando proveedores existentes)
INSERT INTO compra (proveedor_id, fecha, numero_factura, estado, subtotal, descuento_total, iva, total, observaciones) VALUES
(1, '2024-07-01', 'FAC-006-2024', 'RECIBIDA', 1000, 50, 190, 1140, 'Compra de teclados'),
(3, '2024-07-02', 'FAC-007-2024', 'PENDIENTE', 2000, 100, 380, 2280, 'Compra de impresoras');

-- DETALLE_COMPRA (ejemplo, usando compras y productos existentes)
INSERT INTO detalle_compra (compra_id, producto_id, cantidad, precio_unitario, descuento, subtotal) VALUES
(1, 4, 10, 40, 0, 400),
(2, 5, 3, 600, 0, 1800);

-- MOVIMIENTO_INVENTARIO (ejemplo, usando productos y usuarios existentes)
INSERT INTO movimiento_inventario (producto_id, tipo, cantidad, stock_anterior, stock_posterior, fecha, motivo, usuario_id) VALUES
(1, 'ENTRADA', 10, 0, 10, '2024-07-01 09:00:00', 'Compra inicial', 1),
(2, 'SALIDA', 2, 6, 4, '2024-07-02 10:00:00', 'Venta a cliente', 2),
(4, 'ENTRADA', 5, 10, 15, '2024-07-03 11:00:00', 'Compra teclados', 3);

-- REFRESH_TOKEN (ejemplo, usando usuarios existentes)
INSERT INTO refresh_token (token, usuario_id, expiry_date) VALUES
('token_ejemplo_1', 1, '2025-12-31 23:59:59'),
('token_ejemplo_2', 2, '2025-12-31 23:59:59'),
('token_ejemplo_3', 3, '2025-12-31 23:59:59'); 