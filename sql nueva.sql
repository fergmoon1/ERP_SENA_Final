UPDATE usuario
SET password = '$2a$12$sUSjklKzjNW1Bkq349lCjOXlIAO9UCKupl8u5lnUwpX7mxOT5swBO'
WHERE correo = 'admin@erp.com';

UPDATE usuario
SET password = '$2a$12$U7M/ChnpihGlZLj4e8GX4eev3COWxUxy4WmMyyLJQqJl6xzF7w6cy'
WHERE correo = 'supervisor@erp.com';

UPDATE usuario
SET password = '$2a$12$mGhgeYeMPc11W53UyVO6PuAFluy9nl6Uk8rE0AMoi5QneJ/3J.xGu'
WHERE correo = 'user@erp.com';

UPDATE usuario SET password = 'HASH_ADMIN' WHERE correo = 'admin@erp.com';
UPDATE usuario SET password = 'HASH_SUPERVISOR' WHERE correo = 'supervisor@erp.com';
UPDATE usuario SET password = 'HASH_USER' WHERE correo = 'user@erp.com';

SELECT * FROM usuario WHERE correo = 'admin@erp.com';
SELECT * FROM usuario WHERE correo = 'supervisor@erp.com';
SELECT * FROM usuario WHERE correo = 'user@erp.com';

SELECT id, correo, nombre, password, rol FROM usuario;

describe table usuario;
UPDATE usuario SET rol = 'ADMIN' WHERE correo = 'dim.dei@gmail.com';

ALTER TABLE cliente
ADD COLUMN fecha_creacion DATE;

UPDATE cliente
SET fecha_creacion = '2024-06-01'
WHERE fecha_creacion IS NULL;

INSERT INTO pedido (fecha, total, estado, cliente_id)
VALUES
  ('2024-06-01', 10000, 'Pendiente', 1),
  ('2024-06-02', 15000, 'Enviado', 1),
  ('2024-06-03', 20000, 'Entregado', 2),
  ('2024-06-04', 5000, 'Cancelado', 2),
  ('2024-06-05', 12000, 'Pendiente', 3);

ALTER TABLE pedido ADD COLUMN motivo_estado VARCHAR(255);

-- Actualiza los totales que están en 0 a valores positivos aleatorios
UPDATE pedido SET total = 12000 WHERE total = 0 AND id = 17;
UPDATE pedido SET total = 13500 WHERE total = 0 AND id = 18;
UPDATE pedido SET total = 9800  WHERE total = 0 AND id = 19;
UPDATE pedido SET total = 15000 WHERE total = 0 AND id = 20;
UPDATE pedido SET total = 11000 WHERE total = 0 AND id = 21;
UPDATE pedido SET total = 14500 WHERE total = 0 AND id = 22;
UPDATE pedido SET total = 16000 WHERE total = 0 AND id = 23;
UPDATE pedido SET total = 10500 WHERE total = 0 AND id = 24;

-- Asigna cliente_id y usuario_id válidos (ajusta los IDs según tus tablas reales)
UPDATE pedido SET cliente_id = 1 WHERE cliente_id IS NULL OR cliente_id = 0;
UPDATE pedido SET usuario_id = 10 WHERE usuario_id IS NULL OR usuario_id = 0;

-- Asigna motivos de estado a los pedidos que no lo tienen
UPDATE pedido SET motivo_estado = 'Pendiente por pago' WHERE motivo_estado IS NULL AND estado = 'Pendiente';
UPDATE pedido SET motivo_estado = 'Listo para envío' WHERE motivo_estado IS NULL AND estado = 'Enviado';
UPDATE pedido SET motivo_estado = 'Entregado al cliente' WHERE motivo_estado IS NULL AND estado = 'Entregado';
UPDATE pedido SET motivo_estado = 'Cancelado por cliente' WHERE motivo_estado IS NULL AND estado = 'Cancelado';
UPDATE pedido SET motivo_estado = 'Pedido completado y facturado' WHERE motivo_estado IS NULL AND estado = 'completado';

INSERT INTO pedido (fecha, total, estado, cliente_id, usuario_id, motivo_estado) VALUES
('2024-08-01', 18000, 'Pendiente', 2, 10, 'Pendiente por confirmación de pago'),
('2024-08-02', 21000, 'Enviado', 3, 10, 'Enviado por mensajería interna'),
('2024-08-03', 25000, 'Entregado', 1, 10, 'Entregado en oficina principal'),
('2024-08-04', 9000,  'Cancelado', 2, 10, 'Cancelado por falta de stock'),
('2024-08-05', 19500, 'completado', 4, 10, 'Pedido completado y entregado'),
('2024-08-06', 17500, 'Pendiente', 3, 10, 'Pendiente por aprobación de crédito'),
('2024-08-07', 22000, 'Enviado', 1, 10, 'Enviado a sucursal norte'),
('2024-08-08', 16000, 'Entregado', 2, 10, 'Entregado al cliente final'),
('2024-08-09', 8000,  'Cancelado', 4, 10, 'Cancelado por error en dirección'),
('2024-08-10', 14000, 'Pendiente', 1, 10, 'Pendiente por validación de inventario');

-- Actualiza los registros con valores NULL en cliente_id y usuario_id
UPDATE pedido SET cliente_id = 1 WHERE id = 1 AND cliente_id IS NULL;
UPDATE pedido SET usuario_id = 1 WHERE id = 1 AND usuario_id IS NULL;

UPDATE pedido SET cliente_id = 2 WHERE id = 2 AND cliente_id IS NULL;
UPDATE pedido SET usuario_id = 2 WHERE id = 2 AND usuario_id IS NULL;

UPDATE pedido SET cliente_id = 3 WHERE id = 3 AND cliente_id IS NULL;
UPDATE pedido SET usuario_id = 3 WHERE id = 3 AND usuario_id IS NULL;

-- Actualiza los registros con valores NULL en estado y motivo_estado
UPDATE pedido SET estado = 'PENDIENTE' WHERE id = 1 AND estado IS NULL;
UPDATE pedido SET motivo_estado = 'Pendiente por pago' WHERE id = 1 AND motivo_estado IS NULL;

UPDATE pedido SET estado = 'PENDIENTE' WHERE id = 2 AND estado IS NULL;
UPDATE pedido SET motivo_estado = 'Pendiente por confirmación' WHERE id = 2 AND motivo_estado IS NULL;

UPDATE pedido SET estado = 'PENDIENTE' WHERE id = 3 AND estado IS NULL;
UPDATE pedido SET motivo_estado = 'Pendiente por validación de inventario' WHERE id = 3 AND motivo_estado IS NULL;

-- Actualiza los totales en 0 a valores positivos
UPDATE pedido SET total = 1200 WHERE id = 4 AND total = 0;
UPDATE pedido SET total = 1500 WHERE id = 5 AND total = 0;

INSERT INTO pedido (
    fecha, total, cliente_id, usuario_id, estado, motivo_estado
) VALUES (
    '2024-07-01',
    15000,
    3,
    10,
    'PENDIENTE',
    'Pedido de prueba insertado por script SQL'
);