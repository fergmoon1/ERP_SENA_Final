@echo off
echo ========================================
echo SOLUCION COMPLETA PARA COMPRAS
echo ========================================
echo.

echo PASO 1: Verificando el entorno...
echo.

echo 1.1 Verificando que MySQL este ejecutandose...
netstat -an | findstr :3306
if %errorlevel% equ 0 (
    echo ✓ MySQL esta ejecutando en puerto 3306
) else (
    echo ✗ MySQL NO esta ejecutando
    echo Por favor inicia MySQL antes de continuar
    pause
    exit /b 1
)

echo.
echo 1.2 Verificando que el backend no este ejecutando...
netstat -an | findstr :8081
if %errorlevel% equ 0 (
    echo ✗ Backend ya esta ejecutando en puerto 8081
    echo Por favor detenlo antes de continuar
    pause
    exit /b 1
) else (
    echo ✓ Puerto 8081 disponible
)

echo.
echo PASO 2: Compilando el backend...
cd backend
mvn clean compile
if %errorlevel% neq 0 (
    echo ✗ Error en la compilacion
    pause
    exit /b 1
)
echo ✓ Compilacion exitosa

echo.
echo PASO 3: Iniciando el backend...
echo El backend se iniciara en una nueva ventana
echo Espera a que aparezca "Started BackendApplication"
echo.
echo Presiona cualquier tecla para continuar...
pause >nul

start "Backend ERP SENA" cmd /k "mvn spring-boot:run"

echo.
echo PASO 4: Esperando que el backend inicie...
echo Esperando 30 segundos para que el backend inicie completamente...
timeout /t 30 /nobreak >nul

echo.
echo PASO 5: Probando los endpoints...
echo.

echo 5.1 Probando endpoint test-simple...
curl -s http://localhost:8081/api/compras/test-simple
echo.

echo 5.2 Probando endpoint demo...
curl -s http://localhost:8081/api/compras/demo
echo.

echo.
echo PASO 6: Verificando el frontend...
echo.
echo Si el frontend esta ejecutandose, abre http://localhost:3000
echo Ve a la seccion de Compras y verifica que se carguen los datos
echo.

echo ========================================
echo SOLUCION COMPLETADA
echo ========================================
echo.
echo Si hay problemas:
echo 1. Revisa los logs del backend en la ventana que se abrio
echo 2. Verifica que la base de datos erp_sena exista
echo 3. Asegurate de que el frontend este ejecutandose en puerto 3000
echo.
pause 