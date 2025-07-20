@echo off
echo ========================================
echo REINICIANDO TODO EL SISTEMA ERP SENA
echo ========================================
echo.

echo PASO 1: Deteniendo procesos existentes...
echo.

echo 1.1 Verificando si el backend esta ejecutando...
netstat -an | findstr :8081
if %errorlevel% equ 0 (
    echo ✓ Backend detectado en puerto 8081
    echo Por favor cierra la ventana del backend manualmente
    echo y presiona cualquier tecla para continuar...
    pause >nul
) else (
    echo ✓ Puerto 8081 libre
)

echo.
echo 1.2 Verificando si el frontend esta ejecutando...
netstat -an | findstr :3000
if %errorlevel% equ 0 (
    echo ✓ Frontend detectado en puerto 3000
    echo Por favor cierra la ventana del frontend manualmente
    echo y presiona cualquier tecla para continuar...
    pause >nul
) else (
    echo ✓ Puerto 3000 libre
)

echo.
echo PASO 2: Verificando MySQL...
netstat -an | findstr :3306
if %errorlevel% equ 0 (
    echo ✓ MySQL esta ejecutando
) else (
    echo ✗ MySQL NO esta ejecutando
    echo Por favor inicia MySQL antes de continuar
    pause
    exit /b 1
)

echo.
echo PASO 3: Compilando el backend...
cd backend
mvn clean compile
if %errorlevel% neq 0 (
    echo ✗ Error en la compilacion
    pause
    exit /b 1
)
echo ✓ Compilacion exitosa

echo.
echo PASO 4: Iniciando el backend...
echo El backend se iniciara en una nueva ventana
echo Espera a que aparezca "Started BackendApplication"
echo.
echo Presiona cualquier tecla para continuar...
pause >nul

start "Backend ERP SENA" cmd /k "mvn spring-boot:run"

echo.
echo PASO 5: Esperando que el backend inicie...
echo Esperando 45 segundos...
timeout /t 45 /nobreak >nul

echo.
echo PASO 6: Verificando que el backend este funcionando...
netstat -an | findstr :8081
if %errorlevel% equ 0 (
    echo ✓ Backend ejecutando correctamente
) else (
    echo ✗ Backend no esta ejecutando
    echo Revisa la ventana del backend para errores
    pause
    exit /b 1
)

echo.
echo PASO 7: Probando endpoints...
echo.
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:8081/api/compras/test-simple' -Method GET; Write-Host '✓ Endpoint test-simple funcionando' } catch { Write-Host '✗ Error en endpoint test-simple' }"

echo.
echo PASO 8: Iniciando el frontend...
echo.
cd ..
echo El frontend se iniciara en una nueva ventana
echo.
echo Presiona cualquier tecla para continuar...
pause >nul

start "Frontend ERP SENA" cmd /k "cd frontend-erp && npm start"

echo.
echo PASO 9: Esperando que el frontend inicie...
echo Esperando 30 segundos...
timeout /t 30 /nobreak >nul

echo.
echo ========================================
echo REINICIO COMPLETADO
echo ========================================
echo.
echo Resumen:
echo ✓ Backend ejecutando en puerto 8081
echo ✓ Frontend ejecutando en puerto 3000
echo ✓ MySQL ejecutando en puerto 3306
echo.
echo Ahora puedes:
echo 1. Abrir http://localhost:3000
echo 2. Iniciar sesion con un usuario ADMIN
echo 3. Ir a la seccion de Compras
echo 4. Verificar que se carguen los datos sin errores
echo.
pause 