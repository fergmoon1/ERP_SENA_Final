@echo off
echo ========================================
echo DEBUGGEANDO PROBLEMA DE COMPRAS
echo ========================================
echo.

echo 1. Verificando si el backend esta ejecutandose...
curl -s http://localhost:8081/api/compras/test >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Backend esta ejecutandose
) else (
    echo ✗ Backend NO esta ejecutandose
    echo   Ejecuta: cd backend && mvn spring-boot:run
    pause
    exit /b 1
)

echo.
echo 2. Probando endpoint de prueba...
curl -s http://localhost:8081/api/compras/test
echo.

echo.
echo 3. Probando endpoint de compras (primeros 500 caracteres)...
curl -s http://localhost:8081/api/compras | head -c 500
echo.

echo.
echo 4. Verificando si hay datos en la base de datos...
echo   (Esto requiere que MySQL este ejecutandose)
mysql -u root -e "USE erp_sena; SELECT COUNT(*) as total_compras FROM compra;" 2>nul
if %errorlevel% equ 0 (
    echo ✓ Base de datos accesible
) else (
    echo ✗ No se puede acceder a la base de datos
    echo   Asegurate de que MySQL este ejecutandose
)

echo.
echo 5. Verificando estructura de la tabla compra...
mysql -u root -e "USE erp_sena; DESCRIBE compra;" 2>nul

echo.
echo ========================================
echo DIAGNOSTICO COMPLETADO
echo ========================================
echo.
echo Si el problema persiste:
echo 1. Revisa los logs del backend en la consola
echo 2. Verifica que la base de datos tenga datos
echo 3. Comprueba que los modelos coincidan con la BD
echo.
pause 