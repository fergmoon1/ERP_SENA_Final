@echo off
echo ========================================
echo CORRECCIONES DE USUARIOS Y AVATARES
echo ========================================
echo.

echo 1. Verificando que el backend esté corriendo...
curl -s http://localhost:8081/api/test/health >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: El backend no está corriendo en puerto 8081
    echo Por favor, inicia el backend primero
    pause
    exit /b 1
)
echo Backend está corriendo correctamente
echo.

echo 2. Verificando archivos en uploads...
if exist "backend\uploads\foto01 mujer.png" (
    echo Archivo encontrado: backend\uploads\foto01 mujer.png
) else (
    echo ERROR: No se encontró el archivo backend\uploads\foto01 mujer.png
    echo Verificando contenido de la carpeta uploads:
    dir backend\uploads
    pause
    exit /b 1
)
echo.

echo 3. Ejecutando script SQL para corregir avatar de Juana Pérez...
echo Ejecutando: verificar_avatar_juana.sql
echo Por favor, ejecuta manualmente el script SQL en tu base de datos
echo o copia y pega el contenido de backend\verificar_avatar_juana.sql
echo.

echo 4. Probando acceso al archivo via API...
curl -s -I "http://localhost:8081/api/files/foto01 mujer.png" >nul 2>&1
if %errorlevel% equ 0 (
    echo SUCCESS: El archivo se puede acceder via API
) else (
    echo ERROR: No se puede acceder al archivo via API
    echo Verificando logs del backend...
)
echo.

echo 5. Reiniciando frontend para aplicar cambios...
echo Por favor, reinicia el frontend si está corriendo
echo npm start en la carpeta frontend-erp
echo.

echo ========================================
echo INSTRUCCIONES PARA COMPLETAR:
echo ========================================
echo 1. Ejecuta el script SQL: backend\verificar_avatar_juana.sql
echo 2. Reinicia el frontend si está corriendo
echo 3. Verifica que Juana Pérez aparezca con su avatar
echo 4. Los botones de edición/eliminación ahora son más grandes
echo.

echo ========================================
echo CORRECCIONES COMPLETADAS
echo ========================================
pause 