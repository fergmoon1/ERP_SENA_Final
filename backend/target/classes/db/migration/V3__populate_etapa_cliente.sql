UPDATE cliente SET etapa = 'nuevo' WHERE id % 5 = 1;
UPDATE cliente SET etapa = 'espera' WHERE id % 5 = 2;
UPDATE cliente SET etapa = 'asignado' WHERE id % 5 = 3;
UPDATE cliente SET etapa = 'progreso' WHERE id % 5 = 4;
UPDATE cliente SET etapa = 'factura' WHERE id % 5 = 0; 