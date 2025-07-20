@echo off
echo ========================================
echo DIAGNOSTICO COMPLETO DEL PROBLEMA
echo ========================================
echo.

echo 1. Verificando si el backend esta ejecutandose...
netstat -an | findstr :8081
if %errorlevel% equ 0 (
    echo ✓ Backend esta ejecutando en puerto 8081
) else (
    echo ✗ Backend NO esta ejecutando en puerto 8081
)

echo.
echo 2. Probando conexion HTTP basica...
curl -v http://localhost:8081/api/compras/test-simple 2>&1 | findstr "HTTP"

echo.
echo 3. Verificando logs del backend...
echo Si el backend esta ejecutandose, revisa la ventana del backend para ver errores
echo.

echo 4. Verificando base de datos...
echo Asegurate de que MySQL este ejecutandose y la base de datos erp_sena exista
echo.

echo 5. Verificando configuracion de aplicacion...
echo Revisa el archivo application.properties en backend/src/main/resources/
echo.

echo ========================================
echo DIAGNOSTICO COMPLETADO
echo ========================================
echo.
echo Posibles problemas identificados:
echo 1. Backend no esta ejecutandose
echo 2. Base de datos no esta disponible
echo 3. Error en la configuracion de Spring Boot
echo 4. Error en la serializacion JSON
echo.
pause 