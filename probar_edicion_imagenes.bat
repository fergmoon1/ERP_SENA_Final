@echo off
echo ========================================
echo PRUEBA DEL SISTEMA DE EDICION DE IMAGENES
echo ========================================
echo.

echo 1. Verificando que el backend esté ejecutándose...
netstat -an | findstr :8081 >nul
if %errorlevel% == 0 (
    echo ✅ Backend ejecutándose en puerto 8081
) else (
    echo ❌ Backend NO está ejecutándose
    echo Iniciando backend...
    cd backend
    start "Backend ERP" mvn spring-boot:run
    cd ..
    timeout /t 5 /nobreak >nul
)

echo.

echo 2. Verificando que el frontend esté ejecutándose...
netstat -an | findstr :3000 >nul
if %errorlevel% == 0 (
    echo ✅ Frontend ejecutándose en puerto 3000
) else (
    echo ❌ Frontend NO está ejecutándose
    echo Iniciando frontend...
    cd frontend-erp
    start "Frontend ERP" npm start
    cd ..
    timeout /t 10 /nobreak >nul
)

echo.

echo 3. Verificando directorios de imágenes...
if exist "backend\uploads\clientes" (
    echo ✅ Directorio clientes existe
    dir "backend\uploads\clientes" /b
) else (
    echo ❌ Directorio clientes NO existe
    mkdir "backend\uploads\clientes"
    echo ✅ Directorio clientes creado
)

echo.

echo 4. Instrucciones para probar edición de imágenes:
echo.
echo PASO 1: Crear un cliente con imagen
echo - Ir a http://localhost:3000
echo - Ir a la página de Clientes
echo - Llenar el formulario de nuevo cliente
echo - Arrastrar una imagen al componente de foto
echo - Guardar el cliente
echo.

echo PASO 2: Editar la imagen del cliente
echo - En la tabla de clientes, hacer clic en el botón "Editar"
echo - En el modal de edición, verificar que aparece la imagen actual
echo - Arrastrar una nueva imagen o hacer clic para cambiar
echo - Guardar los cambios
echo.

echo PASO 3: Verificar en la tabla
echo - La imagen debe aparecer en la columna "Foto" de la tabla
echo - Al editar nuevamente, debe mostrar la imagen actualizada
echo.

echo 5. URLs de prueba:
echo - Frontend: http://localhost:3000
echo - Backend: http://localhost:8081
echo - Test de imágenes: test_image_upload.html
echo.

echo 6. Troubleshooting:
echo - Si no aparece la imagen: Verificar que el campo 'imagen' existe en la BD
echo - Si no se puede arrastrar: Revisar consola del navegador (F12)
echo - Si no se sube: Verificar que el backend esté ejecutándose
echo - Si no se guarda: Verificar que el token JWT esté válido
echo.

echo ========================================
echo SISTEMA LISTO PARA PRUEBAS
echo ========================================
echo.
pause 