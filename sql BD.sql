-- Borra y crea la base de datos
DROP DATABASE IF EXISTS erp_sena;
CREATE DATABASE erp_sena;
USE erp_sena;

-- =========================
-- TABLA USUARIO
-- =========================
CREATE TABLE usuario (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    correo VARCHAR(255) NOT NULL UNIQUE,
    nombre VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(255) NOT NULL
);

-- =========================
-- TABLA CLIENTE
-- =========================
CREATE TABLE cliente (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    correo VARCHAR(255),
    direccion VARCHAR(255),
    nombre VARCHAR(255),
    telefono VARCHAR(255),
    tipo VARCHAR(255)
);

-- =========================
-- TABLA PROVEEDOR
-- =========================
CREATE TABLE proveedor (
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

-- =========================
-- TABLA PRODUCTO
-- =========================
CREATE TABLE producto (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    descripcion VARCHAR(255),
    precio DOUBLE,
    stock INT
);

-- =========================
-- TABLA PEDIDO
-- =========================
CREATE TABLE pedido (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE,
    total DOUBLE,
    cliente_id BIGINT,
    usuario_id BIGINT,
    FOREIGN KEY (cliente_id) REFERENCES cliente(id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

-- =========================
-- TABLA DETALLE_PEDIDO
-- =========================
CREATE TABLE detalle_pedido (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    pedido_id BIGINT,
    producto_id BIGINT,
    cantidad INT,
    FOREIGN KEY (pedido_id) REFERENCES pedido(id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES producto(id)
);

-- =========================
-- TABLA COMPRA
-- =========================
CREATE TABLE compra (
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

-- =========================
-- TABLA DETALLE_COMPRA
-- =========================
CREATE TABLE detalle_compra (
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

-- =========================
-- TABLA MOVIMIENTO_INVENTARIO
-- =========================
CREATE TABLE movimiento_inventario (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    producto_id BIGINT NOT NULL,
    tipo VARCHAR(20) NOT NULL,
    cantidad INT NOT NULL,
    stock_anterior INT NOT NULL,
    stock_posterior INT NOT NULL,
    fecha DATETIME NOT NULL,
    motivo VARCHAR(500),
    usuario_id BIGINT,
    FOREIGN KEY (producto_id) REFERENCES producto(id),
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

-- =========================
-- TABLA REFRESH_TOKEN (si usas refresh tokens)
-- =========================
CREATE TABLE refresh_token (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    token VARCHAR(255) NOT NULL,
    usuario_id BIGINT,
    expiry_date DATETIME,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

-- =========================
-- DATOS DE EJEMPLO
-- =========================

-- Usuarios (hashes de ejemplo, reemplaza por los tuyos si lo deseas)
INSERT INTO usuario (correo, nombre, password, rol) VALUES
('admin@erp.com', 'Administrador', '$2a$10$HzUnILP.0ib3.rszmAnhWeKUhPt35HB0.0Z65ouFLcFirtwKFLAOq', 'ADMIN'), -- contraseña: 1234
('supervisor@erp.com', 'Supervisor', '$2a$10$HzUnILP.0ib3.rszmAnhWeKUhPt35HB0.0Z65ouFLcFirtwKFLAOq', 'SUPERVISOR'), -- contraseña: 1234
('user@erp.com', 'Usuario', '$2a$10$HzUnILP.0ib3.rszmAnhWeKUhPt35HB0.0Z65ouFLcFirtwKFLAOq', 'USER'); -- contraseña: 1234

-- Clientes
INSERT INTO cliente (correo, direccion, nombre, telefono, tipo) VALUES
('ventas@distribuidoraxyz.com','Calle 80 #12-34, Barranquilla','Distribuidora XYZ Ltda','6012345678','Empresa'),
('stock_client@gmail.com','Calle 20 #13-45, Medellin','Cliente Stock-Test','6644578','Persona');

-- Proveedores
INSERT INTO proveedor (nombre, correo, telefono, telefono_contacto, direccion, tipo, nit, nombre_contacto, activo) VALUES
('Distribuidora Nacional S.A.', 'contacto@distribuidoranacional.com', '6012345678', '3001234567', 'Calle 123 #45-67, Bogotá', 'Distribuidor', '900123456-7', 'María González', true),
('Fabricante Industrial Ltda.', 'ventas@fabricanteindustrial.com', '6045678901', '3109876543', 'Carrera 78 #90-12, Medellín', 'Fabricante', '800987654-3', 'Carlos Rodríguez', true);

-- Productos
INSERT INTO producto (nombre, descripcion, precio, stock) VALUES
('Producto de prueba', 'Descripción de prueba', 100, 0),
('Producto de prueba 2', 'Descripción de prueba 2', 110, 6),
('Producto Stock-Test', 'Producto para probar la gestión de stock', 25, 10);

-- Puedes agregar más datos de ejemplo según lo necesites

-- =========================
-- FIN DEL SCRIPT
-- =========================

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


