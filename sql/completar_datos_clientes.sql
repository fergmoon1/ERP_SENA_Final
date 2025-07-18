-- Script para completar todos los datos faltantes de clientes
-- Sistema ERP SENA - COMPLETAR DATOS

USE erp_sena;

-- Actualizar clientes existentes con datos completos
-- Cliente 1: Teresa García
UPDATE cliente SET 
    direccion = 'Calle 72 #10-45, Oficina 302, Bogotá D.C.',
    direccion_fiscal = 'Calle 72 #10-45, Oficina 302',
    ciudad_fiscal = 'Bogotá',
    provincia_fiscal = 'Cundinamarca',
    pais_fiscal = 'Colombia',
    direccion_correspondencia = 'Calle 72 #10-45, Oficina 302',
    ciudad_correspondencia = 'Bogotá',
    provincia_correspondencia = 'Cundinamarca',
    pais_correspondencia = 'Colombia',
    direccion_entrega = 'Calle 72 #10-45, Oficina 302',
    ciudad_entrega = 'Bogotá',
    provincia_entrega = 'Cundinamarca',
    pais_entrega = 'Colombia',
    observaciones = 'Cliente importante, requiere seguimiento mensual. Solicita facturación electrónica.',
    cargo = 'Gerente de Compras',
    web = 'www.teresagarcia.com',
    movil = '3101112222',
    tel_trabajo = '6011112222'
WHERE id = 1;

-- Cliente 2: Juan Moreno
UPDATE cliente SET 
    direccion = 'Carrera 15 #93-47, Local 5, Medellín',
    direccion_fiscal = 'Carrera 15 #93-47, Local 5',
    ciudad_fiscal = 'Medellín',
    provincia_fiscal = 'Antioquia',
    pais_fiscal = 'Colombia',
    direccion_correspondencia = 'Carrera 15 #93-47, Local 5',
    ciudad_correspondencia = 'Medellín',
    provincia_correspondencia = 'Antioquia',
    pais_correspondencia = 'Colombia',
    direccion_entrega = 'Carrera 15 #93-47, Local 5',
    ciudad_entrega = 'Medellín',
    provincia_entrega = 'Antioquia',
    pais_entrega = 'Colombia',
    observaciones = 'Pendiente de enviar documentos fiscales. Empresa de tecnología con alto volumen de compras.',
    cargo = 'Director Comercial',
    web = 'www.juanmoreno.com',
    movil = '3102223333',
    tel_trabajo = '6012223333'
WHERE id = 2;

-- Cliente 3: Andres López
UPDATE cliente SET 
    direccion = 'Avenida 4 Norte #6N-67, Cali',
    direccion_fiscal = 'Avenida 4 Norte #6N-67',
    ciudad_fiscal = 'Cali',
    provincia_fiscal = 'Valle del Cauca',
    pais_fiscal = 'Colombia',
    direccion_correspondencia = 'Avenida 4 Norte #6N-67',
    ciudad_correspondencia = 'Cali',
    provincia_correspondencia = 'Valle del Cauca',
    pais_correspondencia = 'Colombia',
    direccion_entrega = 'Avenida 4 Norte #6N-67',
    ciudad_entrega = 'Cali',
    provincia_entrega = 'Valle del Cauca',
    pais_entrega = 'Colombia',
    observaciones = 'Solicita cotización personalizada. Cliente frecuente con descuentos especiales.',
    cargo = 'Jefe de Compras',
    web = 'www.andressanchez.com',
    movil = '3103334444',
    tel_trabajo = '6013334444'
WHERE id = 3;

-- Cliente 4: Camila García
UPDATE cliente SET 
    direccion = 'Carrera 7 #45-67, Cali',
    direccion_fiscal = 'Carrera 7 #45-67',
    ciudad_fiscal = 'Cali',
    provincia_fiscal = 'Valle del Cauca',
    pais_fiscal = 'Colombia',
    direccion_correspondencia = 'Carrera 7 #45-67',
    ciudad_correspondencia = 'Cali',
    provincia_correspondencia = 'Valle del Cauca',
    pais_correspondencia = 'Colombia',
    direccion_entrega = 'Carrera 7 #45-67',
    ciudad_entrega = 'Cali',
    provincia_entrega = 'Valle del Cauca',
    pais_entrega = 'Colombia',
    observaciones = 'Cliente frecuente, solicita reportes trimestrales. Empresa de consultoría.',
    cargo = 'Analista de Compras',
    web = 'www.camilarios.com',
    movil = '3101002001',
    tel_trabajo = '6011002001'
WHERE id = 4;

-- Cliente 5: Santiago Hernández
UPDATE cliente SET 
    direccion = 'Avenida 6 #23-45, Medellín',
    direccion_fiscal = 'Avenida 6 #23-45',
    ciudad_fiscal = 'Medellín',
    provincia_fiscal = 'Antioquia',
    pais_fiscal = 'Colombia',
    direccion_correspondencia = 'Avenida 6 #23-45',
    ciudad_correspondencia = 'Medellín',
    provincia_correspondencia = 'Antioquia',
    pais_correspondencia = 'Colombia',
    direccion_entrega = 'Avenida 6 #23-45',
    ciudad_entrega = 'Medellín',
    provincia_entrega = 'Antioquia',
    pais_entrega = 'Colombia',
    observaciones = 'Solicita cotización anual. Cliente con historial de pagos puntuales.',
    cargo = 'Supervisor de Compras',
    web = 'www.santiagomejia.com',
    movil = '3102003002',
    tel_trabajo = '6012003002'
WHERE id = 5;

-- Cliente 6: Valentina Fernández
UPDATE cliente SET 
    direccion = 'Calle 15 #8-90, Bucaramanga',
    direccion_fiscal = 'Calle 15 #8-90',
    ciudad_fiscal = 'Bucaramanga',
    provincia_fiscal = 'Santander',
    pais_fiscal = 'Colombia',
    direccion_correspondencia = 'Calle 15 #8-90',
    ciudad_correspondencia = 'Bucaramanga',
    provincia_correspondencia = 'Santander',
    pais_correspondencia = 'Colombia',
    direccion_entrega = 'Calle 15 #8-90',
    ciudad_entrega = 'Bucaramanga',
    provincia_entrega = 'Santander',
    pais_entrega = 'Colombia',
    observaciones = 'Pendiente de enviar documentos. Cliente nuevo con potencial de crecimiento.',
    cargo = 'Gerente de Compras',
    web = 'www.valentinagomez.com',
    movil = '3103004003',
    tel_trabajo = '6013004003'
WHERE id = 6;

-- Cliente 7: Empresa Alfa
UPDATE cliente SET 
    direccion = 'Calle 19 #29-39, Barranquilla',
    direccion_fiscal = 'Calle 19 #29-39',
    ciudad_fiscal = 'Barranquilla',
    provincia_fiscal = 'Atlántico',
    pais_fiscal = 'Colombia',
    direccion_correspondencia = 'Calle 19 #29-39',
    ciudad_correspondencia = 'Barranquilla',
    provincia_correspondencia = 'Atlántico',
    pais_correspondencia = 'Colombia',
    direccion_entrega = 'Calle 19 #29-39',
    ciudad_entrega = 'Barranquilla',
    provincia_entrega = 'Atlántico',
    pais_entrega = 'Colombia',
    observaciones = 'Empresa de tecnología. Cliente VIP con descuentos especiales.',
    cargo = 'Director de Compras',
    web = 'www.empresa-alfa.com',
    movil = '3104005004',
    tel_trabajo = '6014005004'
WHERE id = 7;

-- Cliente 8: Empresa Beta
UPDATE cliente SET 
    direccion = 'Calle 22 #32-42, Cartagena',
    direccion_fiscal = 'Calle 22 #32-42',
    ciudad_fiscal = 'Cartagena',
    provincia_fiscal = 'Bolívar',
    pais_fiscal = 'Colombia',
    direccion_correspondencia = 'Calle 22 #32-42',
    ciudad_correspondencia = 'Cartagena',
    provincia_correspondencia = 'Bolívar',
    pais_correspondencia = 'Colombia',
    direccion_entrega = 'Calle 22 #32-42',
    ciudad_entrega = 'Cartagena',
    provincia_entrega = 'Bolívar',
    pais_entrega = 'Colombia',
    observaciones = 'Pendiente de validación fiscal. Empresa de manufactura con alto volumen.',
    cargo = 'Jefe de Compras',
    web = 'www.empresa-beta.com',
    movil = '3105006005',
    tel_trabajo = '6015006005'
WHERE id = 8;

-- Cliente 9: Laura Martínez
UPDATE cliente SET 
    direccion = 'Calle 25 #35-45, Pereira',
    direccion_fiscal = 'Calle 25 #35-45',
    ciudad_fiscal = 'Pereira',
    provincia_fiscal = 'Risaralda',
    pais_fiscal = 'Colombia',
    direccion_correspondencia = 'Calle 25 #35-45',
    ciudad_correspondencia = 'Pereira',
    provincia_correspondencia = 'Risaralda',
    pais_correspondencia = 'Colombia',
    direccion_entrega = 'Calle 25 #35-45',
    ciudad_entrega = 'Pereira',
    provincia_entrega = 'Risaralda',
    pais_entrega = 'Colombia',
    observaciones = 'Cliente nuevo, requiere capacitación. Empresa de servicios.',
    cargo = 'Asistente de Compras',
    web = 'www.lauramartinez.com',
    movil = '3106007006',
    tel_trabajo = '6016007006'
WHERE id = 9;

-- Cliente 10: Carlos Torres
UPDATE cliente SET 
    direccion = 'Calle 28 #38-48, Bucaramanga',
    direccion_fiscal = 'Calle 28 #38-48',
    ciudad_fiscal = 'Bucaramanga',
    provincia_fiscal = 'Santander',
    pais_fiscal = 'Colombia',
    direccion_correspondencia = 'Calle 28 #38-48',
    ciudad_correspondencia = 'Bucaramanga',
    provincia_correspondencia = 'Santander',
    pais_correspondencia = 'Colombia',
    direccion_entrega = 'Calle 28 #38-48',
    ciudad_entrega = 'Bucaramanga',
    provincia_entrega = 'Santander',
    pais_entrega = 'Colombia',
    observaciones = 'Solicita factura electrónica. Cliente con historial de compras alto.',
    cargo = 'Contador',
    web = 'www.carlostorres.com',
    movil = '3107008007',
    tel_trabajo = '6017008007'
WHERE id = 10;

-- Cliente 11: Empresa Gamma
UPDATE cliente SET 
    direccion = 'Calle 31 #41-51, Manizales',
    direccion_fiscal = 'Calle 31 #41-51',
    ciudad_fiscal = 'Manizales',
    provincia_fiscal = 'Caldas',
    pais_fiscal = 'Colombia',
    direccion_correspondencia = 'Calle 31 #41-51',
    ciudad_correspondencia = 'Manizales',
    provincia_correspondencia = 'Caldas',
    pais_correspondencia = 'Colombia',
    direccion_entrega = 'Calle 31 #41-51',
    ciudad_entrega = 'Manizales',
    provincia_entrega = 'Caldas',
    pais_entrega = 'Colombia',
    observaciones = 'Empresa de manufactura. Cliente con descuentos por volumen.',
    cargo = 'Gerente de Compras',
    web = 'www.empresa-gamma.com',
    movil = '3108009008',
    tel_trabajo = '6018009008'
WHERE id = 11;

-- Cliente 12: Diana Ramírez
UPDATE cliente SET 
    direccion = 'Calle 34 #44-54, Santa Marta',
    direccion_fiscal = 'Calle 34 #44-54',
    ciudad_fiscal = 'Santa Marta',
    provincia_fiscal = 'Magdalena',
    pais_fiscal = 'Colombia',
    direccion_correspondencia = 'Calle 34 #44-54',
    ciudad_correspondencia = 'Santa Marta',
    provincia_correspondencia = 'Magdalena',
    pais_correspondencia = 'Colombia',
    direccion_entrega = 'Calle 34 #44-54',
    ciudad_entrega = 'Santa Marta',
    provincia_entrega = 'Magdalena',
    pais_entrega = 'Colombia',
    observaciones = 'Cliente con historial de compras alto. Solicita soporte técnico.',
    cargo = 'Analista de Compras',
    web = 'www.dianaramirez.com',
    movil = '3109001009',
    tel_trabajo = '6019001009'
WHERE id = 12;

-- Cliente 13: Empresa Delta
UPDATE cliente SET 
    direccion = 'Calle 37 #47-57, Cúcuta',
    direccion_fiscal = 'Calle 37 #47-57',
    ciudad_fiscal = 'Cúcuta',
    provincia_fiscal = 'Norte de Santander',
    pais_fiscal = 'Colombia',
    direccion_correspondencia = 'Calle 37 #47-57',
    ciudad_correspondencia = 'Cúcuta',
    provincia_correspondencia = 'Norte de Santander',
    pais_correspondencia = 'Colombia',
    direccion_entrega = 'Calle 37 #47-57',
    ciudad_entrega = 'Cúcuta',
    provincia_entrega = 'Norte de Santander',
    pais_entrega = 'Colombia',
    observaciones = 'Empresa de logística. Cliente con necesidades de transporte especial.',
    cargo = 'Director de Compras',
    web = 'www.empresa-delta.com',
    movil = '3120001010',
    tel_trabajo = '6020001010'
WHERE id = 13;

-- Cliente 14: Felipe García
UPDATE cliente SET 
    direccion = 'Calle 40 #50-60, Ibagué',
    direccion_fiscal = 'Calle 40 #50-60',
    ciudad_fiscal = 'Ibagué',
    provincia_fiscal = 'Tolima',
    pais_fiscal = 'Colombia',
    direccion_correspondencia = 'Calle 40 #50-60',
    ciudad_correspondencia = 'Ibagué',
    provincia_correspondencia = 'Tolima',
    pais_correspondencia = 'Colombia',
    direccion_entrega = 'Calle 40 #50-60',
    ciudad_entrega = 'Ibagué',
    provincia_entrega = 'Tolima',
    pais_entrega = 'Colombia',
    observaciones = 'Solicita soporte técnico. Cliente con necesidades especiales.',
    cargo = 'Supervisor de Compras',
    web = 'www.felipegarcia.com',
    movil = '3110002011',
    tel_trabajo = '6010002011'
WHERE id = 14;

-- Cliente 15: Empresa Epsilon
UPDATE cliente SET 
    direccion = 'Calle 43 #53-63, Villavicencio',
    direccion_fiscal = 'Calle 43 #53-63',
    ciudad_fiscal = 'Villavicencio',
    provincia_fiscal = 'Meta',
    pais_fiscal = 'Colombia',
    direccion_correspondencia = 'Calle 43 #53-63',
    ciudad_correspondencia = 'Villavicencio',
    provincia_correspondencia = 'Meta',
    pais_correspondencia = 'Colombia',
    direccion_entrega = 'Calle 43 #53-63',
    ciudad_entrega = 'Villavicencio',
    provincia_entrega = 'Meta',
    pais_entrega = 'Colombia',
    observaciones = 'Pendiente de visita comercial. Empresa de servicios con potencial.',
    cargo = 'Jefe de Compras',
    web = 'www.empresa-epsilon.com',
    movil = '3121003012',
    tel_trabajo = '6021003012'
WHERE id = 15;

-- Cliente 16: Natalia Vargas
UPDATE cliente SET 
    direccion = 'Calle 46 #56-66, Neiva',
    direccion_fiscal = 'Calle 46 #56-66',
    ciudad_fiscal = 'Neiva',
    provincia_fiscal = 'Huila',
    pais_fiscal = 'Colombia',
    direccion_correspondencia = 'Calle 46 #56-66',
    ciudad_correspondencia = 'Neiva',
    provincia_correspondencia = 'Huila',
    pais_correspondencia = 'Colombia',
    direccion_entrega = 'Calle 46 #56-66',
    ciudad_entrega = 'Neiva',
    provincia_entrega = 'Huila',
    pais_entrega = 'Colombia',
    observaciones = 'Cliente potencial para nuevos productos. Empresa en crecimiento.',
    cargo = 'Asistente de Compras',
    web = 'www.nataliavargas.com',
    movil = '3112003013',
    tel_trabajo = '6012003013'
WHERE id = 16;

-- Cliente 17: Empresa Zeta
UPDATE cliente SET 
    direccion = 'Calle 49 #59-69, Pasto',
    direccion_fiscal = 'Calle 49 #59-69',
    ciudad_fiscal = 'Pasto',
    provincia_fiscal = 'Nariño',
    pais_fiscal = 'Colombia',
    direccion_correspondencia = 'Calle 49 #59-69',
    ciudad_correspondencia = 'Pasto',
    provincia_correspondencia = 'Nariño',
    pais_correspondencia = 'Colombia',
    direccion_entrega = 'Calle 49 #59-69',
    ciudad_entrega = 'Pasto',
    provincia_entrega = 'Nariño',
    pais_entrega = 'Colombia',
    observaciones = 'Empresa de servicios. Cliente con necesidades de consultoría.',
    cargo = 'Gerente de Compras',
    web = 'www.empresa-zeta.com',
    movil = '3122004014',
    tel_trabajo = '6022004014'
WHERE id = 17;

-- Cliente 18: Andrés Pérez
UPDATE cliente SET 
    direccion = 'Calle 52 #62-72, Montería',
    direccion_fiscal = 'Calle 52 #62-72',
    ciudad_fiscal = 'Montería',
    provincia_fiscal = 'Córdoba',
    pais_fiscal = 'Colombia',
    direccion_correspondencia = 'Calle 52 #62-72',
    ciudad_correspondencia = 'Montería',
    provincia_correspondencia = 'Córdoba',
    pais_correspondencia = 'Colombia',
    direccion_entrega = 'Calle 52 #62-72',
    ciudad_entrega = 'Montería',
    provincia_entrega = 'Córdoba',
    pais_entrega = 'Colombia',
    observaciones = 'Solicita información de productos. Cliente con interés en nuevas tecnologías.',
    cargo = 'Analista de Compras',
    web = 'www.andresperez.com',
    movil = '3113004015',
    tel_trabajo = '6013004015'
WHERE id = 18;

-- Cliente 19: Empresa Omega
UPDATE cliente SET 
    direccion = 'Calle 55 #65-75, Sincelejo',
    direccion_fiscal = 'Calle 55 #65-75',
    ciudad_fiscal = 'Sincelejo',
    provincia_fiscal = 'Sucre',
    pais_fiscal = 'Colombia',
    direccion_correspondencia = 'Calle 55 #65-75',
    ciudad_correspondencia = 'Sincelejo',
    provincia_correspondencia = 'Sucre',
    pais_correspondencia = 'Colombia',
    direccion_entrega = 'Calle 55 #65-75',
    ciudad_entrega = 'Sincelejo',
    provincia_entrega = 'Sucre',
    pais_entrega = 'Colombia',
    observaciones = 'Empresa de alimentos. Cliente con necesidades de refrigeración especial.',
    cargo = 'Director de Compras',
    web = 'www.empresa-omega.com',
    movil = '3123005016',
    tel_trabajo = '6023005016'
WHERE id = 19;

-- Cliente 20: Juliana Suárez
UPDATE cliente SET 
    direccion = 'Calle 58 #68-78, Tunja',
    direccion_fiscal = 'Calle 58 #68-78',
    ciudad_fiscal = 'Tunja',
    provincia_fiscal = 'Boyacá',
    pais_fiscal = 'Colombia',
    direccion_correspondencia = 'Calle 58 #68-78',
    ciudad_correspondencia = 'Tunja',
    provincia_correspondencia = 'Boyacá',
    pais_correspondencia = 'Colombia',
    direccion_entrega = 'Calle 58 #68-78',
    ciudad_entrega = 'Tunja',
    provincia_entrega = 'Boyacá',
    pais_entrega = 'Colombia',
    observaciones = 'Cliente nuevo, requiere asesoría. Empresa de servicios educativos.',
    cargo = 'Jefe de Compras',
    web = 'www.julianasuarez.com',
    movil = '3114005017',
    tel_trabajo = '6014005017'
WHERE id = 20;

-- Cliente 21: Empresa Sigma
UPDATE cliente SET 
    direccion = 'Calle 61 #71-81, Armenia',
    direccion_fiscal = 'Calle 61 #71-81',
    ciudad_fiscal = 'Armenia',
    provincia_fiscal = 'Quindío',
    pais_fiscal = 'Colombia',
    direccion_correspondencia = 'Calle 61 #71-81',
    ciudad_correspondencia = 'Armenia',
    provincia_correspondencia = 'Quindío',
    pais_correspondencia = 'Colombia',
    direccion_entrega = 'Calle 61 #71-81',
    ciudad_entrega = 'Armenia',
    provincia_entrega = 'Quindío',
    pais_entrega = 'Colombia',
    observaciones = 'Empresa de consultoría. Cliente con necesidades de software especializado.',
    cargo = 'Gerente de Compras',
    web = 'www.empresa-sigma.com',
    movil = '3124006018',
    tel_trabajo = '6024006018'
WHERE id = 21;

-- Cliente 22: Sebastián Morales
UPDATE cliente SET 
    direccion = 'Calle 64 #74-84, Popayán',
    direccion_fiscal = 'Calle 64 #74-84',
    ciudad_fiscal = 'Popayán',
    provincia_fiscal = 'Cauca',
    pais_fiscal = 'Colombia',
    direccion_correspondencia = 'Calle 64 #74-84',
    ciudad_correspondencia = 'Popayán',
    provincia_correspondencia = 'Cauca',
    pais_correspondencia = 'Colombia',
    direccion_entrega = 'Calle 64 #74-84',
    ciudad_entrega = 'Popayán',
    provincia_entrega = 'Cauca',
    pais_entrega = 'Colombia',
    observaciones = 'Solicita visita técnica. Cliente con necesidades de instalación especial.',
    cargo = 'Supervisor de Compras',
    web = 'www.sebastianmorales.com',
    movil = '3115006019',
    tel_trabajo = '6015006019'
WHERE id = 22;

-- Cliente 23: Empresa Theta
UPDATE cliente SET 
    direccion = 'Calle 67 #77-87, Florencia',
    direccion_fiscal = 'Calle 67 #77-87',
    ciudad_fiscal = 'Florencia',
    provincia_fiscal = 'Caquetá',
    pais_fiscal = 'Colombia',
    direccion_correspondencia = 'Calle 67 #77-87',
    ciudad_correspondencia = 'Florencia',
    provincia_correspondencia = 'Caquetá',
    pais_correspondencia = 'Colombia',
    direccion_entrega = 'Calle 67 #77-87',
    ciudad_entrega = 'Florencia',
    provincia_entrega = 'Caquetá',
    pais_entrega = 'Colombia',
    observaciones = 'Empresa de transporte. Cliente con necesidades de logística especial.',
    cargo = 'Director de Compras',
    web = 'www.empresa-theta.com',
    movil = '3125007020',
    tel_trabajo = '6025007020'
WHERE id = 23;

-- Completar datos para clientes duplicados (24-55)
-- Actualizar observaciones y datos faltantes para clientes 24-55
UPDATE cliente SET 
    observaciones = 'Cliente individual con necesidades básicas. Solicita facturación simple.',
    cargo = 'Comprador',
    web = 'www.marialopez.com',
    movil = '3001234567',
    tel_trabajo = '6011234567',
    direccion_fiscal = direccion,
    ciudad_fiscal = 'Bogotá',
    provincia_fiscal = 'Cundinamarca',
    pais_fiscal = 'Colombia',
    direccion_correspondencia = direccion,
    ciudad_correspondencia = 'Bogotá',
    provincia_correspondencia = 'Cundinamarca',
    pais_correspondencia = 'Colombia',
    direccion_entrega = direccion,
    ciudad_entrega = 'Bogotá',
    provincia_entrega = 'Cundinamarca',
    pais_entrega = 'Colombia'
WHERE id BETWEEN 24 AND 31 AND tipo = 'Individual';

UPDATE cliente SET 
    observaciones = 'Empresa con necesidades corporativas. Solicita facturación empresarial.',
    cargo = 'Gerente de Compras',
    web = 'www.empresa-tecnologia.com',
    movil = '6012345678',
    tel_trabajo = '6012345678',
    direccion_fiscal = direccion,
    ciudad_fiscal = 'Bogotá',
    provincia_fiscal = 'Cundinamarca',
    pais_fiscal = 'Colombia',
    direccion_correspondencia = direccion,
    ciudad_correspondencia = 'Bogotá',
    provincia_correspondencia = 'Cundinamarca',
    pais_correspondencia = 'Colombia',
    direccion_entrega = direccion,
    ciudad_entrega = 'Bogotá',
    provincia_entrega = 'Cundinamarca',
    pais_entrega = 'Colombia'
WHERE id BETWEEN 32 AND 39 AND tipo = 'Empresa';

-- Eliminar clientes duplicados (40-55)
DELETE FROM cliente WHERE id BETWEEN 40 AND 55;

-- Verificar los cambios
SELECT '=== CLIENTES CON DATOS COMPLETOS ===' as info;
SELECT id, nombre, apellidos, direccion, tipo, nit, observaciones FROM cliente ORDER BY id;

-- Contar total de clientes
SELECT '=== TOTAL DE CLIENTES ===' as info;
SELECT COUNT(*) as total_clientes FROM cliente;

-- Contar por tipo
SELECT '=== CLIENTES POR TIPO ===' as info;
SELECT tipo, COUNT(*) as cantidad FROM cliente GROUP BY tipo;

-- Verificar campos completos
SELECT '=== VERIFICACIÓN DE CAMPOS COMPLETOS ===' as info;
SELECT 
    COUNT(*) as total_clientes,
    SUM(CASE WHEN direccion IS NOT NULL THEN 1 ELSE 0 END) as con_direccion,
    SUM(CASE WHEN apellidos IS NOT NULL THEN 1 ELSE 0 END) as con_apellidos,
    SUM(CASE WHEN observaciones IS NOT NULL THEN 1 ELSE 0 END) as con_observaciones,
    SUM(CASE WHEN nit IS NOT NULL THEN 1 ELSE 0 END) as con_nit
FROM cliente; 