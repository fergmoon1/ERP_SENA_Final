@echo off
echo ========================================
echo INICIANDO BACKEND ERP
echo ========================================
echo.

echo 1. Verificando que estamos en el directorio correcto...
if not exist "backend\pom.xml" (
    echo ERROR: No se encuentra el archivo pom.xml en el directorio backend
    echo Asegurate de estar en el directorio raiz del proyecto
    pause
    exit /b 1
)

echo 2. Compilando el proyecto...
cd backend
mvn clean compile
if %errorlevel% neq 0 (
    echo ERROR: Fallo en la compilacion
    pause
    exit /b 1
)

echo.
echo 3. Iniciando el backend...
echo El backend se iniciara en una nueva ventana
echo Espera unos segundos para que inicie completamente
echo.
echo Presiona cualquier tecla para continuar...
pause >nul

start "Backend ERP SENA" cmd /k "cd /d %CD% && mvn spring-boot:run"

echo.
echo 4. Esperando que el backend inicie...
timeout /t 15 /nobreak >nul

echo.
echo 5. Probando si el backend responde...
cd ..
powershell -Command "try { $response = Invoke-RestMethod -Uri 'http://localhost:8081/api/compras/test' -Method Get; Write-Host '✓ Backend iniciado correctamente:' $response } catch { Write-Host '✗ Backend aun no responde, espera unos segundos mas' }"

echo.
echo ========================================
echo INICIO COMPLETADO
echo ========================================
echo.
echo Si el backend no responde:
echo 1. Revisa la ventana del backend para ver errores
echo 2. Verifica que el puerto 8081 no este en uso
echo 3. Verifica que MySQL este ejecutandose
echo.
echo Si el backend responde correctamente:
echo 1. Ve al frontend en http://localhost:3001
echo 2. Inicia sesion con un usuario ADMIN
echo 3. Navega a la pagina de Compras
echo.
pause 