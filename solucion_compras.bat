@echo off
echo ========================================
echo SOLUCIONANDO PROBLEMA DE COMPRAS
echo ========================================
echo.

echo 1. Verificando si el backend esta ejecutandose...
powershell -Command "try { $response = Invoke-RestMethod -Uri 'http://localhost:8081/api/compras/test' -Method Get; Write-Host '✓ Backend funcionando correctamente' } catch { Write-Host '✗ Backend no responde o necesita reinicio' }"

echo.
echo 2. Si el backend no responde, necesitas reiniciarlo:
echo    a) Ve a la ventana del backend (si esta abierta)
echo    b) Presiona Ctrl+C para detenerlo
echo    c) Ejecuta: cd backend && mvn spring-boot:run
echo.

echo 3. Verificando token JWT del usuario:
echo    Abre las herramientas de desarrollador del navegador (F12)
echo    Ve a la pestaña Console y ejecuta:
echo    console.log('Token JWT:', localStorage.getItem('jwt'))
echo.

echo 4. Verificando rol del usuario:
echo    En la consola del navegador, ejecuta:
echo    const token = localStorage.getItem('jwt');
echo    if (token) {
echo        const payload = JSON.parse(atob(token.split('.')[1]));
echo        console.log('Rol:', payload.rol);
echo        console.log('Usuario:', payload.sub);
echo    }
echo.

echo 5. Si el usuario no tiene rol ADMIN o SUPERVISOR:
echo    - Inicia sesion con un usuario que tenga rol ADMIN
echo    - O modifica el rol del usuario actual en la base de datos
echo.

echo 6. Para insertar datos de compras de ejemplo:
echo    Ejecuta: .\insertar_compras_directo.bat
echo.

echo ========================================
echo INSTRUCCIONES COMPLETADAS
echo ========================================
echo.
echo Pasos recomendados:
echo 1. Reinicia el backend si es necesario
echo 2. Verifica el rol del usuario actual
echo 3. Inicia sesion con un usuario ADMIN si es necesario
echo 4. Inserta datos de compras de ejemplo
echo 5. Prueba la pagina de compras
echo.
pause 