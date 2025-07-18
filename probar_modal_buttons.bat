@echo off
echo ========================================
echo    PRUEBA DE BOTONES DEL MODAL
echo ========================================
echo.

echo [1/4] Verificando archivos CSS...
if exist "frontend-erp\src\styles\ClientesPage.css" (
    echo ✓ Archivo ClientesPage.css encontrado
) else (
    echo ✗ ERROR: No se encontró ClientesPage.css
    pause
    exit /b 1
)

echo.
echo [2/4] Verificando estilos de modal-buttons...
findstr /C:"modal-buttons" "frontend-erp\src\styles\ClientesPage.css" >nul
if %errorlevel% equ 0 (
    echo ✓ Estilos modal-buttons encontrados
) else (
    echo ✗ ERROR: No se encontraron estilos modal-buttons
    pause
    exit /b 1
)

echo.
echo [3/4] Verificando archivo de prueba...
if exist "test_modal_buttons.html" (
    echo ✓ Archivo de prueba encontrado
    echo.
    echo Abriendo archivo de prueba en el navegador...
    start "" "test_modal_buttons.html"
) else (
    echo ✗ ERROR: No se encontró test_modal_buttons.html
    pause
    exit /b 1
)

echo.
echo [4/4] Iniciando servidor de desarrollo...
echo.
echo Para probar el sistema completo:
echo 1. Abre una nueva terminal
echo 2. Navega a: cd frontend-erp
echo 3. Ejecuta: npm start
echo 4. Ve a la página de Clientes
echo 5. Haz clic en el botón eliminar de cualquier cliente
echo 6. Verifica que los botones "Cancelar" y "Eliminar" aparezcan uno al lado del otro
echo.

echo ========================================
echo    INSTRUCCIONES DE PRUEBA
echo ========================================
echo.
echo 1. Abre test_modal_buttons.html en tu navegador
echo 2. Haz clic en "Mostrar Modal de Eliminación"
echo 3. Verifica que los botones aparezcan uno al lado del otro
echo 4. Prueba en diferentes tamaños de pantalla
echo.

echo ¿Deseas iniciar el servidor de desarrollo ahora? (s/n)
set /p choice=
if /i "%choice%"=="s" (
    echo.
    echo Iniciando servidor de desarrollo...
    cd frontend-erp
    npm start
) else (
    echo.
    echo Para iniciar manualmente:
    echo cd frontend-erp
    echo npm start
)

echo.
echo ========================================
echo    PRUEBA COMPLETADA
echo ========================================
pause 