@echo off
echo ========================================
echo EJECUTANDO DATOS DE COMPRAS
echo ========================================
echo.

echo Verificando conexion a MySQL...
mysql -u root -e "SELECT 1;" >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: No se puede conectar a MySQL
    echo Asegurate de que MySQL este ejecutandose
    pause
    exit /b 1
)

echo.
echo Ejecutando script de compras...
mysql -u root erp_sena < "sql/erp_sena_compra.sql"

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo DATOS DE COMPRAS INSERTADOS EXITOSAMENTE
    echo ========================================
    echo.
    echo Verificando datos insertados...
    mysql -u root -e "USE erp_sena; SELECT COUNT(*) as total_compras FROM compra;"
    echo.
    echo Verificando detalles de compras...
    mysql -u root -e "USE erp_sena; SELECT COUNT(*) as total_detalles FROM detalle_compra;"
) else (
    echo.
    echo ERROR: No se pudieron insertar los datos de compras
    echo Revisa los logs de MySQL para mas detalles
)

echo.
pause 