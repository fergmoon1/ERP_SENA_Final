@echo off
echo ========================================
echo    VERIFICANDO DIRECTORIOS DE UPLOADS
echo ========================================
echo.

echo [1/4] Verificando directorio principal...
if exist "backend\uploads" (
    echo ✓ Directorio backend\uploads existe
) else (
    echo ✗ Creando directorio backend\uploads...
    mkdir "backend\uploads"
    echo ✓ Directorio creado
)

echo.
echo [2/4] Verificando directorio de clientes...
if exist "backend\uploads\clientes" (
    echo ✓ Directorio backend\uploads\clientes existe
) else (
    echo ✗ Creando directorio backend\uploads\clientes...
    mkdir "backend\uploads\clientes"
    echo ✓ Directorio creado
)

echo.
echo [3/4] Verificando directorio de usuarios...
if exist "backend\uploads\usuarios" (
    echo ✓ Directorio backend\uploads\usuarios existe
) else (
    echo ✗ Creando directorio backend\uploads\usuarios...
    mkdir "backend\uploads\usuarios"
    echo ✓ Directorio creado
)

echo.
echo [4/4] Verificando directorio de productos...
if exist "backend\uploads\productos" (
    echo ✓ Directorio backend\uploads\productos existe
) else (
    echo ✗ Creando directorio backend\uploads\productos...
    mkdir "backend\uploads\productos"
    echo ✓ Directorio creado
)

echo.
echo ========================================
echo    ESTRUCTURA DE DIRECTORIOS
echo ========================================
echo.
echo C:\ERP_SENA_Final\backend\uploads\
echo ├── clientes\
echo ├── usuarios\
echo └── productos\
echo.

echo ========================================
echo    VERIFICACIÓN COMPLETADA
echo ========================================
echo.
echo Los directorios están listos para recibir imágenes.
echo El backend ahora usa rutas absolutas:
echo - C:\ERP_SENA_Final\backend\uploads\clientes
echo - C:\ERP_SENA_Final\backend\uploads\usuarios  
echo - C:\ERP_SENA_Final\backend\uploads\productos
echo.
pause 