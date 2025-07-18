-- Script para actualizar direcciones de clientes con ejemplos realistas
-- Sistema ERP SENA

USE erp_sena;

-- Actualizar direcciones de clientes existentes
UPDATE cliente SET 
    direccion = 'Calle 72 #10-45, Oficina 302, Bogotá D.C.',
    apellidos = 'González',
    nit = 'NIT123456789'
WHERE id = 1 AND nombre LIKE '%Distribuidora%';

UPDATE cliente SET 
    direccion = 'Carrera 15 #93-47, Local 5, Medellín',
    apellidos = 'Rodríguez',
    nit = 'NIT987654321'
WHERE id = 2 AND nombre LIKE '%Stock-Test%';

UPDATE cliente SET 
    direccion = 'Avenida 4 Norte #6N-67, Cali',
    apellidos = 'Martínez',
    nit = 'NIT456789123'
WHERE id = 3 AND nombre LIKE '%Stock-Test%';

-- Insertar nuevos clientes con direcciones completas
INSERT INTO cliente (nombre, apellidos, correo, telefono, direccion, tipo, nit) VALUES
('María', 'López', 'maria.lopez@empresa.com', '3001234567', 'Calle 80 #12-34, Barranquilla', 'Individual', 'CC123456789'),
('Carlos', 'Hernández', 'carlos.hernandez@tech.com', '3109876543', 'Carrera 7 #45-67, Bogotá D.C.', 'Individual', 'CC987654321'),
('Ana', 'García', 'ana.garcia@consulting.com', '3157894561', 'Avenida 6 #23-45, Medellín', 'Individual', 'CC456789123'),
('Luis', 'Fernández', 'luis.fernandez@logistics.com', '3204567890', 'Calle 15 #8-90, Cali', 'Individual', 'CC789123456'),
('Patricia', 'Moreno', 'patricia.moreno@services.com', '3256789012', 'Carrera 20 #10-30, Bucaramanga', 'Individual', 'CC321654987'),
('Roberto', 'Jiménez', 'roberto.jimenez@imports.com', '3301234567', 'Avenida 5 #67-89, Cartagena', 'Individual', 'CC654321987'),
('Sofía', 'Torres', 'sofia.torres@exports.com', '3359876543', 'Calle 25 #15-67, Pereira', 'Individual', 'CC147258369'),
('Diego', 'Ruiz', 'diego.ruiz@manufacturing.com', '3404567890', 'Carrera 12 #34-56, Manizales', 'Individual', 'CC963852741'),
('Tecnología Avanzada S.A.', '', 'contacto@tecnologiaavanzada.com', '6012345678', 'Calle 100 #15-30, Bogotá D.C.', 'Empresa', 'NIT900123456-7'),
('Importaciones Globales Ltda.', '', 'info@importacionesglobales.com', '6045678901', 'Carrera 50 #25-80, Medellín', 'Empresa', 'NIT800987654-3'),
('Servicios Integrales SAS', '', 'ventas@serviciosintegrales.com', '6054321098', 'Avenida 4 #67-89, Cali', 'Empresa', 'NIT700456789-0'),
('Distribuidora Nacional Express', '', 'contacto@distribuidoranacional.com', '6067890123', 'Calle 30 #45-67, Barranquilla', 'Empresa', 'NIT600678901-2'),
('Comercializadora del Valle S.A.', '', 'info@comercializadoravalle.com', '6078901234', 'Carrera 15 #23-45, Cali', 'Empresa', 'NIT500890123-4'),
('Tecnología y Sistemas Ltda.', '', 'ventas@tecnologiaysistemas.com', '6089012345', 'Avenida 6 #12-34, Medellín', 'Empresa', 'NIT400567890-1'),
('Logística Express Colombia', '', 'contacto@logisticaexpress.com', '6090123456', 'Calle 80 #10-20, Bogotá D.C.', 'Empresa', 'NIT300345678-9'),
('Consultores Asociados SAS', '', 'info@consultoresasociados.com', '6101234567', 'Carrera 7 #45-67, Bogotá D.C.', 'Empresa', 'NIT200234567-8');

-- Verificar los cambios
SELECT id, nombre, apellidos, direccion, tipo, nit FROM cliente ORDER BY id; 