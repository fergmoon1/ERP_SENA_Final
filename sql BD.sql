-- Eliminar la tabla si ya existe
DROP TABLE IF EXISTS ejemplo;

-- Crear la tabla con utf8mb4 y utf8mb4_unicode_ci
CREATE TABLE ejemplo (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
) 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;
