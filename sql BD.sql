SHOW CREATE TABLE pedido;
DELETE FROM pedido
WHERE cliente_id IS NULL
   OR producto_id IS NULL
   OR precio_unitario IS NULL
   OR fecha_entrega IS NULL;
   
   TRUNCATE TABLE pedido;
   
   ALTER TABLE pedido AUTO_INCREMENT = 1;

