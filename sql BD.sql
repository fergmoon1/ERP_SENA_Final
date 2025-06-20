-- Eliminar la tabla si existe
DROP TABLE IF EXISTS pedido;

-- Crear la tabla con todos los campos correctamente definidos
CREATE TABLE pedido (
  id BIGINT NOT NULL AUTO_INCREMENT,
  cantidad INT NOT NULL,
  cliente_id BIGINT NOT NULL,
  estado VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  fecha_creacion DATETIME(6) NOT NULL,
  fecha_entrega DATETIME(6) NOT NULL,
  precio_unitario DOUBLE NOT NULL,
  producto_id BIGINT NOT NULL,
  total DOUBLE NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB 
  DEFAULT CHARSET=utf8mb4 
  COLLATE=utf8mb4_unicode_ci 
  AUTO_INCREMENT=1;


