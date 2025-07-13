@echo off
echo ========================================
echo AGREGANDO JUANA PEREZ A LA BASE DE DATOS
echo ========================================
echo.

echo Ejecutando script SQL...
mysql -u root -p erp_sena < backend\agregar_juana_perez.sql

echo.
echo ========================================
echo SCRIPT EJECUTADO
echo ========================================
echo.
echo Ahora recarga la pagina de usuarios para ver a Juana Perez con su avatar.
echo.
pause 