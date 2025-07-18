@echo off
echo ========================================
echo VERIFICACION DEL SISTEMA DE IMAGENES
echo ========================================
echo.

echo 1. Verificando directorios de uploads...
if exist "backend\uploads\clientes" (
    echo ✅ Directorio clientes existe
) else (
    echo ❌ Directorio clientes NO existe
    mkdir "backend\uploads\clientes"
    echo ✅ Directorio clientes creado
)

if exist "backend\uploads\usuarios" (
    echo ✅ Directorio usuarios existe
) else (
    echo ❌ Directorio usuarios NO existe
    mkdir "backend\uploads\usuarios"
    echo ✅ Directorio usuarios creado
)

if exist "backend\uploads\productos" (
    echo ✅ Directorio productos existe
) else (
    echo ❌ Directorio productos NO existe
    mkdir "backend\uploads\productos"
    echo ✅ Directorio productos creado
)
echo.

echo 2. Verificando archivos del frontend...
if exist "frontend-erp\src\components\ImageUpload.js" (
    echo ✅ Componente ImageUpload.js existe
) else (
    echo ❌ Componente ImageUpload.js NO existe
)

if exist "frontend-erp\src\styles\ImageUpload.css" (
    echo ✅ Estilos ImageUpload.css existen
) else (
    echo ❌ Estilos ImageUpload.css NO existen
)
echo.

echo 3. Verificando archivos del backend...
if exist "backend\src\main\java\com\empresa\erp\controllers\FileUploadController.java" (
    echo ✅ FileUploadController.java existe
) else (
    echo ❌ FileUploadController.java NO existe
)

if exist "backend\src\main\java\com\empresa\erp\models\Cliente.java" (
    echo ✅ Modelo Cliente.java existe
) else (
    echo ❌ Modelo Cliente.java NO existe
)
echo.

echo 4. Verificando scripts SQL...
if exist "sql\agregar_campo_imagen_cliente_mysql.sql" (
    echo ✅ Script SQL MySQL existe
) else (
    echo ❌ Script SQL MySQL NO existe
)
echo.

echo 5. Verificando puertos...
netstat -an | findstr :8081 >nul
if %errorlevel% == 0 (
    echo ✅ Puerto 8081 está en uso (Backend probablemente ejecutándose)
) else (
    echo ❌ Puerto 8081 NO está en uso
)

netstat -an | findstr :3000 >nul
if %errorlevel% == 0 (
    echo ✅ Puerto 3000 está en uso (Frontend probablemente ejecutándose)
) else (
    echo ❌ Puerto 3000 NO está en uso
)
echo.

echo 6. Instrucciones para probar:
echo.
echo Para probar el sistema de imágenes:
echo 1. Abrir http://localhost:3000 en el navegador
echo 2. Ir a la página de Clientes
echo 3. Buscar el componente de imagen en el formulario
echo 4. Arrastrar una imagen desde C:\ERP_SENA_Final\backend\uploads
echo 5. O hacer clic en el área para seleccionar archivo
echo.
echo Si no funciona:
echo - Verificar que el backend está ejecutándose en puerto 8081
echo - Verificar que el frontend está ejecutándose en puerto 3000
echo - Revisar la consola del navegador (F12) para errores
echo - Verificar que el campo imagen existe en la tabla cliente
echo.

echo ========================================
echo VERIFICACION COMPLETADA
echo ========================================
echo.
pause 