ALTER TABLE pedido
  ADD CONSTRAINT pedido_ibfk_1 FOREIGN KEY (cliente_id) REFERENCES cliente(id);
  
  SELECT DISTINCT cliente_id FROM pedido WHERE cliente_id IS NOT NULL
  AND cliente_id NOT IN (SELECT id FROM cliente);
  
  DELETE FROM pedido
WHERE cliente_id IS NOT NULL
  AND cliente_id NOT IN (SELECT id FROM cliente);
  
  UPDATE pedido
SET cliente_id = 1
WHERE cliente_id IS NOT NULL
  AND cliente_id NOT IN (SELECT id FROM cliente);
  
  ALTER TABLE pedido
  ADD CONSTRAINT pedido_ibfk_1 FOREIGN KEY (cliente_id) REFERENCES cliente(id);
  
  SHOW CREATE TABLE pedido;
  
     ALTER TABLE pedido DROP FOREIGN KEY pedido_ibfk_1;
  
  ALTER TABLE pedido DROP FOREIGN KEY pedido_ibfk_1;
  
    
  ALTER TABLE pedido
  ADD CONSTRAINT pedido_ibfk_1 FOREIGN KEY (cliente_id) REFERENCES cliente(id);
  
     ALTER TABLE pedido
     ADD CONSTRAINT pedido_ibfk_1 FOREIGN KEY (cliente_id) REFERENCES cliente(id);
     
     -- ==================poblar tabla===========
     
INSERT INTO pedido (fecha, total, cliente_id, usuario_id, estado, motivo_estado) VALUES
('2024-07-20', 150000, 1, 1, 'Pendiente', 'Esperando confirmación de pago'),
('2024-07-21', 250000, 2, 2, 'Enviado', 'Enviado a dirección de entrega'),
('2024-07-22', 180000, 3, 3, 'Entregado', 'Entregado al cliente'),
('2024-07-23', 95000, 4, 4, 'Cancelado', 'Cancelado por el cliente'),
('2024-07-24', 120000, 5, 5, 'Pendiente', 'Pendiente por validación de inventario'),
('2024-07-25', 210000, 6, 6, 'Pendiente', 'Esperando pago'),
('2024-07-26', 175000, 7, 7, 'Enviado', 'Enviado a sucursal'),
('2024-07-27', 99000, 8, 10, 'Entregado', 'Entregado correctamente'),
('2024-07-28', 135000, 9, 27, 'Pendiente', 'Pendiente por inventario'),
('2024-07-29', 110000, 10, 1, 'Cancelado', 'Cancelado por cliente'),
('2024-07-30', 160000, 11, 2, 'Pendiente', 'Esperando confirmación'),
('2024-07-31', 185000, 12, 3, 'Entregado', 'Entregado sin novedades'),
('2024-08-01', 142000, 13, 4, 'Pendiente', 'Pendiente por pago'),
('2024-08-02', 198000, 14, 5, 'Enviado', 'Enviado a dirección alterna'),
('2024-08-03', 120500, 15, 6, 'Entregado', 'Entregado al cliente'),
('2024-08-04', 99000, 16, 7, 'Cancelado', 'Cancelado por falta de stock'),
('2024-08-05', 210000, 17, 10, 'Pendiente', 'Pendiente por aprobación'),
('2024-08-06', 175000, 18, 27, 'Enviado', 'Enviado a sucursal sur'),
('2024-08-07', 99000, 19, 1, 'Entregado', 'Entregado correctamente'),
('2024-08-08', 135000, 20, 2, 'Pendiente', 'Pendiente por inventario');