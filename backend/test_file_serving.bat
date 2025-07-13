@echo off
echo ========================================
echo PRUEBA DE SERVIR ARCHIVOS DEL BACKEND
echo ========================================
echo.

echo 1. Verificando que el backend esté corriendo...
curl -s http://localhost:8081/api/test/health
if %errorlevel% neq 0 (
    echo ERROR: El backend no está corriendo en puerto 8081
    echo Por favor, inicia el backend primero
    pause
    exit /b 1
)
echo Backend está corriendo correctamente
echo.

echo 2. Verificando que el archivo existe en uploads...
if exist "uploads\foto01 mujer.png" (
    echo Archivo encontrado: uploads\foto01 mujer.png
    dir "uploads\foto01 mujer.png"
) else (
    echo ERROR: No se encontró el archivo uploads\foto01 mujer.png
    echo Verificando contenido de la carpeta uploads:
    dir uploads
)
echo.

echo 3. Probando acceso al archivo via API...
curl -s -I "http://localhost:8081/api/files/foto01 mujer.png"
if %errorlevel% equ 0 (
    echo SUCCESS: El archivo se puede acceder via API
) else (
    echo ERROR: No se puede acceder al archivo via API
)
echo.

echo 4. Probando descarga del archivo...
curl -s -o test_download.png "http://localhost:8081/api/files/foto01 mujer.png"
if exist "test_download.png" (
    echo SUCCESS: Archivo descargado correctamente
    del test_download.png
) else (
    echo ERROR: No se pudo descargar el archivo
)
echo.

echo ========================================
echo PRUEBA COMPLETADA
echo ========================================
pause 