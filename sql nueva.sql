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
