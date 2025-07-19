-- Tabla de compras
CREATE TABLE IF NOT EXISTS compra (
  id BIGINT NOT NULL AUTO_INCREMENT,
  proveedor_id BIGINT NOT NULL,
  fecha DATE NOT NULL,
  total DOUBLE,
  usuario VARCHAR(100),
  PRIMARY KEY (id),
  KEY proveedor_id (proveedor_id),
  CONSTRAINT fk_compra_proveedor FOREIGN KEY (proveedor_id) REFERENCES proveedor(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tabla de detalles de compra
CREATE TABLE IF NOT EXISTS detalle_compra (
  id BIGINT NOT NULL AUTO_INCREMENT,
  compra_id BIGINT NOT NULL,
  producto_id BIGINT NOT NULL,
  cantidad INT NOT NULL,
  precio_unitario DOUBLE NOT NULL,
  subtotal DOUBLE,
  PRIMARY KEY (id),
  KEY compra_id (compra_id),
  KEY producto_id (producto_id),
  CONSTRAINT fk_detalle_compra_compra FOREIGN KEY (compra_id) REFERENCES compra(id) ON DELETE CASCADE,
  CONSTRAINT fk_detalle_compra_producto FOREIGN KEY (producto_id) REFERENCES producto(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;