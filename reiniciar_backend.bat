@echo off
echo ========================================
echo REINICIANDO BACKEND
echo ========================================
echo.

echo 1. Deteniendo procesos en puerto 8081...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :8081') do (
    echo Deteniendo proceso PID: %%a
    taskkill /PID %%a /F >nul 2>&1
)

echo.
echo 2. Compilando backend...
cd backend
mvn clean compile
if %errorlevel% neq 0 (
    echo ERROR: Fallo en la compilacion
    pause
    exit /b 1
)

echo.
echo 3. Iniciando backend...
echo El backend se iniciara en segundo plano
echo Revisa la consola para ver los logs
echo.
echo Presiona cualquier tecla para continuar...
pause >nul

start "Backend ERP" cmd /k "cd backend && mvn spring-boot:run"

echo.
echo 4. Esperando que el backend inicie...
timeout /t 10 /nobreak >nul

echo.
echo 5. Probando endpoints...
cd ..
powershell -Command "try { $response = Invoke-RestMethod -Uri 'http://localhost:8081/api/compras/test' -Method Get; Write-Host '✓ Endpoint de prueba funcionando:' $response } catch { Write-Host '✗ Error:' $_.Exception.Message }"

echo.
echo ========================================
echo REINICIO COMPLETADO
echo ========================================
echo.
echo Si el endpoint de prueba funciona, el backend esta listo
echo Si no funciona, revisa los logs en la ventana del backend
echo.
pause 