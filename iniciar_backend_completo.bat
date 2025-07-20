@echo off
echo ========================================
echo INICIANDO BACKEND COMPLETO
echo ========================================
echo.

echo 1. Verificando que estamos en el directorio correcto...
if not exist "backend\pom.xml" (
    echo ERROR: No se encuentra el archivo pom.xml en el directorio backend
    echo Asegurate de estar en el directorio raiz del proyecto
    pause
    exit /b 1
)

echo 2. Verificando que MySQL este ejecutandose...
echo    (Si MySQL no esta ejecutandose, inicia el servicio MySQL primero)
echo.

echo 3. Compilando el proyecto...
cd backend
mvn clean compile
if %errorlevel% neq 0 (
    echo ERROR: Fallo en la compilacion
    echo Revisa los errores de compilacion arriba
    pause
    exit /b 1
)

echo.
echo 4. Iniciando el backend...
echo El backend se iniciara en esta ventana
echo Espera a que aparezca "Started BackendApplication"
echo.
echo Si hay errores, revisa:
echo - Que MySQL este ejecutandose
echo - Que la base de datos erp_sena exista
echo - Que el usuario root tenga permisos
echo.
echo Presiona cualquier tecla para continuar...
pause >nul

echo Iniciando Spring Boot...
mvn spring-boot:run

echo.
echo Backend detenido.
pause 