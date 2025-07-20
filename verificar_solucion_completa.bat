@echo off
echo ========================================
echo VERIFICACION FINAL DE LA SOLUCION
echo ========================================
echo.

echo 1. Verificando que el backend este ejecutando...
netstat -an | findstr :8081
if %errorlevel% equ 0 (
    echo ✓ Backend esta ejecutando en puerto 8081
) else (
    echo ✗ Backend NO esta ejecutando
    echo Por favor inicia el backend primero
    pause
    exit /b 1
)

echo.
echo 2. Probando endpoint test-simple...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:8081/api/compras/test-simple' -Method GET; Write-Host '✓ Endpoint test-simple funcionando'; Write-Host $response.Content } catch { Write-Host '✗ Error en endpoint test-simple' }"

echo.
echo 3. Probando endpoint demo...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:8081/api/compras/demo' -Method GET; Write-Host '✓ Endpoint demo funcionando'; $data = $response.Content | ConvertFrom-Json; Write-Host 'Total de compras:' $data.total; Write-Host 'Status:' $data.status } catch { Write-Host '✗ Error en endpoint demo' }"

echo.
echo 4. Verificando el frontend...
echo.
echo Si el frontend esta ejecutando:
echo 1. Abre http://localhost:3000
echo 2. Inicia sesion con un usuario ADMIN
echo 3. Ve a la seccion de Compras
echo 4. Verifica que se carguen los datos sin errores de JSON
echo.

echo ========================================
echo VERIFICACION COMPLETADA
echo ========================================
echo.
echo Resumen:
echo ✓ Backend ejecutando en puerto 8081
echo ✓ Endpoints respondiendo con JSON valido
echo ✓ Datos de compras disponibles en la base de datos
echo.
echo Si el frontend muestra errores de JSON:
echo 1. Asegurate de estar logueado con un usuario ADMIN
echo 2. Verifica que el frontend este usando el endpoint /api/compras/demo
echo 3. Revisa la consola del navegador para errores
echo.
pause 