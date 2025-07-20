@echo off
echo ========================================
echo INSERTANDO DATOS DE COMPRAS
echo ========================================
echo.

echo Verificando si MySQL esta disponible...
mysql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: MySQL no esta disponible en el PATH
    echo Asegurate de que MySQL este instalado y configurado
    pause
    exit /b 1
)

echo.
echo Conectando a la base de datos...
mysql -u root -e "USE erp_sena; SELECT COUNT(*) as total_compras FROM compra;" 2>nul
if %errorlevel% neq 0 (
    echo ERROR: No se puede conectar a la base de datos erp_sena
    echo Asegurate de que:
    echo 1. MySQL este ejecutandose
    echo 2. La base de datos erp_sena exista
    echo 3. El usuario root tenga permisos
    pause
    exit /b 1
)

echo.
echo Verificando datos existentes...
mysql -u root -e "USE erp_sena; SELECT COUNT(*) as total_compras FROM compra;"

echo.
echo Insertando datos de compras...
mysql -u root erp_sena < "insertar_compras_ejemplo.sql"

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo DATOS INSERTADOS EXITOSAMENTE
    echo ========================================
    echo.
    echo Verificando datos insertados:
    mysql -u root -e "USE erp_sena; SELECT id, proveedor_id, fecha, numero_factura, estado, total FROM compra;"
    echo.
    echo Total de compras:
    mysql -u root -e "USE erp_sena; SELECT COUNT(*) as total_compras FROM compra;"
    echo.
    echo Total de detalles:
    mysql -u root -e "USE erp_sena; SELECT COUNT(*) as total_detalles FROM detalle_compra;"
) else (
    echo.
    echo ERROR: No se pudieron insertar los datos
    echo Revisa los logs de MySQL para mas detalles
)

echo.
pause 