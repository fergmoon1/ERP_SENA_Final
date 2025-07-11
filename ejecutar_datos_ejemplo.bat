@echo off
echo ========================================
echo EJECUTANDO DATOS DE EJEMPLO PARA GRAFICOS
echo ========================================

echo.
echo 1. Actualizando pedidos existentes con estados...
mysql -u root -p erp_sena < sql/actualizar_pedidos_con_estados.sql

echo.
echo 2. Insertando datos de ejemplo para todos los graficos...
mysql -u root -p erp_sena < sql/datos_ejemplo_graficos.sql

echo.
echo ========================================
echo DATOS DE EJEMPLO INSERTADOS EXITOSAMENTE
echo ========================================
echo.
echo Ahora puedes acceder al dashboard para ver los graficos
echo con datos reales de ejemplo.
echo.
pause 