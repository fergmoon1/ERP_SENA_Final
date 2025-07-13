@echo off
echo ========================================
echo CORRECCIÓN DEL PROBLEMA DE AVATAR
echo ========================================
echo.

echo PROBLEMA IDENTIFICADO:
echo - La URL del avatar en la base de datos es incorrecta
echo - Está usando localhost:3001 en lugar de localhost:8081
echo - El nombre del archivo tiene espacios que pueden causar problemas
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

echo 2. Verificando archivo en uploads...
if exist "backend\uploads\foto01 mujer.png" (
    echo Archivo encontrado: backend\uploads\foto01 mujer.png
) else (
    echo ERROR: No se encontró el archivo
    dir backend\uploads
    pause
    exit /b 1
)
echo.

echo 3. EJECUTA ESTOS SCRIPTS SQL EN TU BASE DE DATOS:
echo.
echo PRIMERO ejecuta: backend\verificar_estado_actual.sql
echo LUEGO ejecuta: backend\corregir_todos_avatars.sql
echo.

echo 4. Reinicia el backend para aplicar los cambios en FileUploadController
echo.

echo 5. Prueba el acceso directo al archivo:
echo http://localhost:8081/api/files/foto01 mujer.png
echo.

echo 6. Verifica que Juana Pérez aparezca con su avatar en el frontend
echo.

echo ========================================
echo INSTRUCCIONES DETALLADAS:
echo ========================================
echo 1. Ejecuta los scripts SQL mencionados arriba
echo 2. Reinicia el backend (Ctrl+C y vuelve a ejecutar)
echo 3. Reinicia el frontend si es necesario
echo 4. Verifica que Juana Pérez tenga su avatar
echo.

echo ========================================
echo CORRECCIÓN PREPARADA
echo ========================================
pause 