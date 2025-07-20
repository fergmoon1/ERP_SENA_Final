@echo off
echo ========================================
echo VERIFICANDO ESTADO DE COMPRAS
echo ========================================
echo.

echo 1. Verificando si el backend esta ejecutandose...
curl -s http://localhost:8081/api/compras >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Backend esta ejecutandose en puerto 8081
) else (
    echo ✗ Backend NO esta ejecutandose en puerto 8081
    echo   Ejecuta: cd backend && mvn spring-boot:run
    echo.
    pause
    exit /b 1
)

echo.
echo 2. Verificando endpoint de compras...
curl -s http://localhost:8081/api/compras
if %errorlevel% equ 0 (
    echo ✓ Endpoint de compras responde correctamente
) else (
    echo ✗ Error al acceder al endpoint de compras
)

echo.
echo 3. Verificando endpoint de proveedores...
curl -s http://localhost:8081/api/proveedores
if %errorlevel% equ 0 (
    echo ✓ Endpoint de proveedores responde correctamente
) else (
    echo ✗ Error al acceder al endpoint de proveedores
)

echo.
echo 4. Verificando endpoint de productos...
curl -s http://localhost:8081/api/productos
if %errorlevel% equ 0 (
    echo ✓ Endpoint de productos responde correctamente
) else (
    echo ✗ Error al acceder al endpoint de productos
)

echo.
echo ========================================
echo VERIFICACION COMPLETADA
echo ========================================
echo.
pause 