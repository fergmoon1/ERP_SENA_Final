-- Actualiza los pedidos para que apunten al cliente con menor id por correo
UPDATE pedido p
JOIN cliente c_duplicado ON p.cliente_id = c_duplicado.id
JOIN (
    SELECT correo, MIN(id) as id_conservar
    FROM cliente
    GROUP BY correo
) c_conservar ON c_duplicado.correo = c_conservar.correo
SET p.cliente_id = c_conservar.id_conservar
WHERE c_duplicado.id != c_conservar.id_conservar;