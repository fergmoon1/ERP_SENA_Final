@echo off
echo ========================================
echo    COPIANDO IMÁGENES DE EJEMPLO
echo ========================================
echo.

echo [1/3] Copiando imágenes de ejemplo para clientes...
if exist "imagenes\foto01 mujer.png" (
    copy "imagenes\foto01 mujer.png" "backend\uploads\clientes\cliente_ejemplo_1.png"
    echo ✓ Imagen de cliente copiada
) else (
    echo ⚠ No se encontró imagen de ejemplo para clientes
)

echo.
echo [2/3] Copiando imágenes de ejemplo para usuarios...
if exist "imagenes\foto01 mujer.png" (
    copy "imagenes\foto01 mujer.png" "backend\uploads\usuarios\usuario_ejemplo_1.png"
    echo ✓ Imagen de usuario copiada
) else (
    echo ⚠ No se encontró imagen de ejemplo para usuarios
)

echo.
echo [3/3] Copiando imágenes de ejemplo para productos...
if exist "imagenes\foto01 mujer.png" (
    copy "imagenes\foto01 mujer.png" "backend\uploads\productos\producto_ejemplo_1.png"
    echo ✓ Imagen de producto copiada
) else (
    echo ⚠ No se encontró imagen de ejemplo para productos
)

echo.
echo ========================================
echo    IMÁGENES DE EJEMPLO COPIADAS
echo ========================================
echo.
echo Imágenes disponibles para pruebas:
echo - backend\uploads\clientes\cliente_ejemplo_1.png
echo - backend\uploads\usuarios\usuario_ejemplo_1.png  
echo - backend\uploads\productos\producto_ejemplo_1.png
echo.
echo URLs de prueba:
echo - http://localhost:8081/api/files/clientes/cliente_ejemplo_1.png
echo - http://localhost:8081/api/files/usuarios/usuario_ejemplo_1.png
echo - http://localhost:8081/api/files/productos/producto_ejemplo_1.png
echo.
pause 