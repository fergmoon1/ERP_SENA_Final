@echo off
echo Instalando SonarScanner para Windows...

REM Crear directorio para SonarScanner
if not exist "C:\sonar-scanner" mkdir "C:\sonar-scanner"

REM Descargar SonarScanner (versión más reciente)
echo Descargando SonarScanner...
powershell -Command "Invoke-WebRequest -Uri 'https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.8.0.2856-windows.zip' -OutFile 'C:\sonar-scanner\sonar-scanner.zip'"

REM Extraer el archivo
echo Extrayendo SonarScanner...
powershell -Command "Expand-Archive -Path 'C:\sonar-scanner\sonar-scanner.zip' -DestinationPath 'C:\sonar-scanner' -Force"

REM Agregar al PATH del sistema
echo Agregando SonarScanner al PATH...
setx PATH "%PATH%;C:\sonar-scanner\sonar-scanner-4.8.0.2856-windows\bin" /M

echo.
echo SonarScanner instalado correctamente!
echo Reinicia la terminal para que los cambios en el PATH surtan efecto.
echo.
echo Para verificar la instalación, ejecuta: sonar-scanner --version
pause
