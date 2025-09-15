@echo off
echo ========================================
echo INSTALANDO SONARQUBE LOCAL CON DOCKER
echo ========================================

echo Verificando si Docker está instalado...
docker --version
if %errorlevel% neq 0 (
    echo Docker no está instalado. Por favor instala Docker Desktop primero.
    pause
    exit /b 1
)

echo Creando directorio para datos de SonarQube...
if not exist "C:\sonarqube-data" mkdir "C:\sonarqube-data"

echo Iniciando SonarQube con Docker...
docker run -d --name sonarqube -p 9000:9000 -p 9092:9092 -v C:\sonarqube-data:/opt/sonarqube/data sonarqube:latest

echo.
echo SonarQube está iniciando...
echo Espera unos minutos y luego ve a: http://localhost:9000
echo.
echo Credenciales por defecto:
echo Usuario: admin
echo Contraseña: admin
echo.
echo Para detener SonarQube: docker stop sonarqube
echo Para iniciar SonarQube: docker start sonarqube
pause
