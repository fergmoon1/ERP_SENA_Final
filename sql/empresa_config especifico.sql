DELETE FROM empresa_config WHERE id = 3;

-- ==0=====Borrado y reinicio==========

DELETE FROM empresa_config;
ALTER TABLE empresa_config AUTO_INCREMENT = 1;