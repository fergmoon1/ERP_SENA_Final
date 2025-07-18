-- Script para actualizar todos los productos y ponerles una imagen de ejemplo si no tienen imagen

UPDATE producto
SET imagen_url = '/api/files/productos/ejemplo.png'
WHERE imagen_url IS NULL OR imagen_url = '';

-- Asegúrate de que el archivo 'ejemplo.png' exista en la carpeta backend/uploads/productos/ 