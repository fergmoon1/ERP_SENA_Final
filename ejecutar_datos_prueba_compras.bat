@echo off
echo ========================================
echo INSERTANDO DATOS DE PRUEBA PARA COMPRAS
echo ========================================
echo.

echo Verificando que MySQL este ejecutando...
netstat -an | findstr :3306
if %errorlevel% neq 0 (
    echo ERROR: MySQL no esta ejecutando
    echo Por favor inicia MySQL antes de continuar
    pause
    exit /b 1
)

echo.
echo Ejecutando script SQL para insertar datos de prueba...
echo.

mysql -u root -p erp_sena < insertar_datos_prueba_compras.sql

if %errorlevel% equ 0 (
    echo.
    echo ✓ Datos de prueba insertados correctamente
    echo.
    echo Verificando datos insertados...
    echo.
    mysql -u root -p erp_sena -e "SELECT COUNT(*) as total_compras FROM compra;"
    mysql -u root -p erp_sena -e "SELECT COUNT(*) as total_proveedores FROM proveedor;"
    mysql -u root -p erp_sena -e "SELECT COUNT(*) as total_productos FROM producto;"
) else (
    echo.
    echo ✗ Error al insertar datos de prueba
    echo Verifica que:
    echo 1. MySQL este ejecutando
    echo 2. La base de datos erp_sena exista
    echo 3. El usuario root tenga permisos
)

echo.
echo ========================================
echo PROCESO COMPLETADO
echo ========================================
echo.
pause 