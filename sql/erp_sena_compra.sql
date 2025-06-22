-- Script para crear las tablas COMPRA y DETALLE_COMPRA
-- Sistema ERP SENA

-- Tabla COMPRA
CREATE TABLE IF NOT EXISTS compra (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    proveedor_id BIGINT NOT NULL,
    fecha DATE NOT NULL,
    numero_factura VARCHAR(50),
    estado VARCHAR(20) DEFAULT 'PENDIENTE',
    subtotal DECIMAL(10,2) DEFAULT 0.00,
    descuento_total DECIMAL(10,2) DEFAULT 0.00,
    iva DECIMAL(10,2) DEFAULT 0.00,
    total DECIMAL(10,2) DEFAULT 0.00,
    observaciones TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (proveedor_id) REFERENCES proveedor(id)
);

-- Tabla DETALLE_COMPRA
CREATE TABLE IF NOT EXISTS detalle_compra (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    compra_id BIGINT NOT NULL,
    producto_id BIGINT NOT NULL,
    cantidad INT NOT NULL,
    precio_unitario DECIMAL(10,2) NOT NULL,
    descuento DECIMAL(10,2) DEFAULT 0.00,
    subtotal DECIMAL(10,2) DEFAULT 0.00,
    FOREIGN KEY (compra_id) REFERENCES compra(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES producto(id)
);

-- Índices para mejorar el rendimiento de las consultas
-- Índices para la tabla compra
CREATE INDEX idx_compra_proveedor ON compra(proveedor_id);
CREATE INDEX idx_compra_fecha ON compra(fecha);
CREATE INDEX idx_compra_estado ON compra(estado);
CREATE INDEX idx_compra_numero_factura ON compra(numero_factura);

-- Índices para la tabla detalle_compra
CREATE INDEX idx_detalle_compra_compra ON detalle_compra(compra_id);
CREATE INDEX idx_detalle_compra_producto ON detalle_compra(producto_id);

-- Datos de ejemplo para la tabla compra
INSERT INTO compra (proveedor_id, fecha, numero_factura, estado, subtotal, descuento_total, iva, total, observaciones) VALUES
(1, '2024-01-15', 'FAC-001-2024', 'RECIBIDA', 1500000.00, 75000.00, 285000.00, 1710000.00, 'Compra de productos de tecnología'),
(2, '2024-01-20', 'FAC-002-2024', 'PENDIENTE', 2500000.00, 125000.00, 475000.00, 2850000.00, 'Compra de materia prima'),
(3, '2024-02-01', 'FAC-003-2024', 'RECIBIDA', 800000.00, 40000.00, 152000.00, 912000.00, 'Importación de componentes'),
(4, '2024-02-10', 'FAC-004-2024', 'CANCELADA', 1200000.00, 60000.00, 228000.00, 1368000.00, 'Compra cancelada por falta de stock'),
(5, '2024-02-15', 'FAC-005-2024', 'PENDIENTE', 900000.00, 45000.00, 171000.00, 1026000.00, 'Compra de equipos de oficina');

-- Datos de ejemplo para la tabla detalle_compra
INSERT INTO detalle_compra (compra_id, producto_id, cantidad, precio_unitario, descuento, subtotal) VALUES
-- Detalles para compra 1 (FAC-001-2024)
(1, 1, 10, 150000.00, 7500.00, 1425000.00),
(1, 2, 5, 15000.00, 0.00, 75000.00),

-- Detalles para compra 2 (FAC-002-2024)
(2, 3, 20, 100000.00, 5000.00, 1900000.00),
(2, 4, 15, 40000.00, 2000.00, 570000.00),

-- Detalles para compra 3 (FAC-003-2024)
(3, 5, 8, 100000.00, 5000.00, 760000.00),
(3, 1, 4, 10000.00, 0.00, 40000.00),

-- Detalles para compra 4 (FAC-004-2024) - Cancelada
(4, 2, 12, 100000.00, 5000.00, 1140000.00),
(4, 3, 6, 10000.00, 1000.00, 54000.00),

-- Detalles para compra 5 (FAC-005-2024)
(5, 4, 10, 90000.00, 4500.00, 855000.00),
(5, 5, 5, 9000.00, 0.00, 45000.00);

-- Comentarios sobre la estructura
-- La tabla compra almacena las cabeceras de las compras realizadas a proveedores
-- Campos principales:
-- - id: Identificador único autoincremental
-- - proveedor_id: Referencia al proveedor (FK)
-- - fecha: Fecha de la compra
-- - numero_factura: Número de factura del proveedor
-- - estado: Estado de la compra (PENDIENTE, RECIBIDA, CANCELADA)
-- - subtotal: Suma de los subtotales de los detalles
-- - descuento_total: Descuento total aplicado
-- - iva: Impuesto al valor agregado
-- - total: Total final de la compra
-- - observaciones: Notas adicionales sobre la compra

-- La tabla detalle_compra almacena los productos específicos de cada compra
-- Campos principales:
-- - id: Identificador único autoincremental
-- - compra_id: Referencia a la compra (FK)
-- - producto_id: Referencia al producto (FK)
-- - cantidad: Cantidad comprada
-- - precio_unitario: Precio por unidad
-- - descuento: Descuento aplicado al detalle
-- - subtotal: Subtotal del detalle (cantidad * precio_unitario - descuento) 