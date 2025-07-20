@echo off
echo ========================================
echo VERIFICANDO TOKEN JWT Y ROL DE USUARIO
echo ========================================
echo.

echo 1. Verificando si hay un token JWT en localStorage...
echo    (Abre las herramientas de desarrollador del navegador y ejecuta:)
echo    console.log(localStorage.getItem('jwt'))
echo.

echo 2. Verificando el rol del usuario...
echo    (En las herramientas de desarrollador, ejecuta:)
echo    const token = localStorage.getItem('jwt');
echo    if (token) {
echo        const payload = JSON.parse(atob(token.split('.')[1]));
echo        console.log('Rol del usuario:', payload.rol);
echo        console.log('Usuario:', payload.sub);
echo    }
echo.

echo 3. Probando endpoint con token...
echo    (Ejecuta en la consola del navegador:)
echo    fetch('/api/compras', {
echo        headers: {
echo            'Authorization': 'Bearer ' + localStorage.getItem('jwt')
echo        }
echo    }).then(r => r.json()).then(console.log).catch(console.error)
echo.

echo 4. Verificando si el usuario tiene permisos...
echo    El endpoint /api/compras requiere rol ADMIN o SUPERVISOR
echo    Si tu usuario tiene rol USER, no podra acceder
echo.

echo ========================================
echo INSTRUCCIONES COMPLETADAS
echo ========================================
echo.
echo Si el problema persiste:
echo 1. Verifica que el usuario tenga rol ADMIN o SUPERVISOR
echo 2. Verifica que el token JWT sea valido
echo 3. Verifica que el token contenga el rol correcto
echo.
pause 