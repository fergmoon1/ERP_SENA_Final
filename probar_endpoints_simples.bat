@echo off
echo ========================================
echo PROBANDO ENDPOINTS SIMPLES
echo ========================================
echo.

echo 1. Probando endpoint test-simple...
curl -s http://localhost:8081/api/compras/test-simple

echo.
echo.
echo 2. Probando endpoint test...
curl -s http://localhost:8081/api/compras/test

echo.
echo.
echo 3. Probando endpoint demo...
curl -s http://localhost:8081/api/compras/demo

echo.
echo ========================================
echo PRUEBA COMPLETADA
echo ========================================
echo.
pause 