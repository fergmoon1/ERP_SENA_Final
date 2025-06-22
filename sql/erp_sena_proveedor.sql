-- Script para crear la tabla PROVEEDOR
-- Sistema ERP SENA

CREATE TABLE IF NOT EXISTS proveedor (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100),
    telefono VARCHAR(15),
    telefono_contacto VARCHAR(15),
    direccion TEXT,
    tipo VARCHAR(20),
    nit VARCHAR(20),
    nombre_contacto VARCHAR(100),
    activo BOOLEAN DEFAULT TRUE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Índices para mejorar el rendimiento de las consultas
CREATE INDEX idx_proveedor_nombre ON proveedor(nombre);
CREATE INDEX idx_proveedor_correo ON proveedor(correo);
CREATE INDEX idx_proveedor_nit ON proveedor(nit);
CREATE INDEX idx_proveedor_tipo ON proveedor(tipo);
CREATE INDEX idx_proveedor_activo ON proveedor(activo);

-- Datos de ejemplo para la tabla proveedor
INSERT INTO proveedor (nombre, correo, telefono, telefono_contacto, direccion, tipo, nit, nombre_contacto, activo) VALUES
('Distribuidora Nacional S.A.', 'contacto@distribuidoranacional.com', '6012345678', '3001234567', 'Calle 123 #45-67, Bogotá', 'Distribuidor', '900123456-7', 'María González', true),
('Fabricante Industrial Ltda.', 'ventas@fabricanteindustrial.com', '6045678901', '3109876543', 'Carrera 78 #90-12, Medellín', 'Fabricante', '800987654-3', 'Carlos Rodríguez', true),
('Importadora Global S.A.S.', 'info@importadoraglobal.com', '6054321098', '3204567890', 'Avenida 5 #23-45, Cali', 'Internacional', '700456789-0', 'Ana Martínez', true),
('Proveedor Local Express', 'ventas@proveedorexpress.com', '6067890123', '3156789012', 'Calle 10 #15-20, Barranquilla', 'Nacional', '600678901-2', 'Luis Pérez', true),
('Distribuidora de Tecnología', 'contacto@distecnologia.com', '6078901234', '3258901234', 'Carrera 15 #30-40, Bucaramanga', 'Distribuidor', '500890123-4', 'Patricia López', true);

-- Comentarios sobre la estructura
-- La tabla proveedor almacena información de todos los proveedores del sistema
-- Campos principales:
-- - id: Identificador único autoincremental
-- - nombre: Nombre o razón social del proveedor
-- - correo: Correo electrónico de contacto
-- - telefono: Teléfono principal del proveedor
-- - telefono_contacto: Teléfono de contacto específico
-- - direccion: Dirección física del proveedor
-- - tipo: Tipo de proveedor (Nacional, Internacional, Distribuidor, Fabricante)
-- - nit: Número de identificación tributaria
-- - nombre_contacto: Nombre de la persona de contacto
-- - activo: Indica si el proveedor está activo en el sistema
-- - fecha_registro: Fecha de registro en el sistema
-- - fecha_actualizacion: Fecha de última actualización 