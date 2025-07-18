@echo off
echo ========================================
echo COPIANDO IMAGENES DE EJEMPLO
echo ========================================
echo.

echo 1. Creando directorios si no existen...
if not exist "backend\uploads\clientes" mkdir "backend\uploads\clientes"
if not exist "backend\uploads\usuarios" mkdir "backend\uploads\usuarios"
if not exist "backend\uploads\productos" mkdir "backend\uploads\productos"
echo.

echo 2. Copiando imágenes de ejemplo para usuarios...
if exist "backend\uploads\admin.png" (
    copy "backend\uploads\admin.png" "backend\uploads\usuarios\admin.png"
    echo Copiado: admin.png
)
if exist "backend\uploads\supervisor.png" (
    copy "backend\uploads\supervisor.png" "backend\uploads\usuarios\supervisor.png"
    echo Copiado: supervisor.png
)
if exist "backend\uploads\usuario.png" (
    copy "backend\uploads\usuario.png" "backend\uploads\usuarios\usuario.png"
    echo Copiado: usuario.png
)
echo.

echo 3. Copiando imágenes de ejemplo para clientes...
if exist "backend\uploads\foto01 mujer.png" (
    copy "backend\uploads\foto01 mujer.png" "backend\uploads\clientes\cliente_ejemplo_1.png"
    echo Copiado: foto01 mujer.png como cliente_ejemplo_1.png
)
echo.

echo 4. Verificando archivos copiados...
echo.
echo Archivos en uploads/usuarios:
dir "backend\uploads\usuarios" /b
echo.
echo Archivos en uploads/clientes:
dir "backend\uploads\clientes" /b
echo.

echo ========================================
echo IMAGENES DE EJEMPLO COPIADAS
echo ========================================
echo.
echo Ahora puedes:
echo 1. Ejecutar el script SQL para actualizar usuarios
echo 2. Reiniciar el backend para cargar las nuevas rutas
echo 3. Probar el sistema de drag & drop en el frontend
echo.
pause 