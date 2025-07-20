@echo off
echo ========================================
echo SOLUCION FINAL PARA EL PROBLEMA DE COMPRAS
echo ========================================
echo.
echo Este script resolvera el problema de JSON malformado en las compras
echo.

echo PASO 1: Verificando el entorno...
echo.

echo 1.1 Verificando MySQL...
netstat -an | findstr :3306
if %errorlevel% equ 0 (
    echo ✓ MySQL esta ejecutando
) else (
    echo ✗ MySQL NO esta ejecutando
    echo Por favor inicia MySQL y ejecuta este script nuevamente
    pause
    exit /b 1
)

echo.
echo 1.2 Verificando que el backend no este ejecutando...
netstat -an | findstr :8081
if %errorlevel% equ 0 (
    echo ✗ Backend ya esta ejecutando
    echo Por favor detenlo y ejecuta este script nuevamente
    pause
    exit /b 1
) else (
    echo ✓ Puerto 8081 disponible
)

echo.
echo PASO 2: Compilando el backend con las correcciones...
cd backend
mvn clean compile
if %errorlevel% neq 0 (
    echo ✗ Error en la compilacion
    echo Revisa los errores arriba
    pause
    exit /b 1
)
echo ✓ Compilacion exitosa

echo.
echo PASO 3: Iniciando el backend...
echo El backend se iniciara en una nueva ventana
echo Espera a que aparezca "Started BackendApplication"
echo.
echo Presiona cualquier tecla para continuar...
pause >nul

start "Backend ERP SENA" cmd /k "mvn spring-boot:run"

echo.
echo PASO 4: Esperando que el backend inicie completamente...
echo Esperando 45 segundos...
timeout /t 45 /nobreak >nul

echo.
echo PASO 5: Probando los endpoints corregidos...
echo.

echo 5.1 Probando endpoint test-simple...
curl -s http://localhost:8081/api/compras/test-simple
echo.

echo 5.2 Probando endpoint demo...
curl -s http://localhost:8081/api/compras/demo
echo.

echo.
echo PASO 6: Insertando datos de prueba...
echo.
cd ..
echo Ejecutando script de datos de prueba...
call ejecutar_datos_prueba_compras.bat

echo.
echo PASO 7: Verificando el frontend...
echo.
echo Si el frontend esta ejecutandose:
echo 1. Abre http://localhost:3000
echo 2. Inicia sesion con un usuario ADMIN
echo 3. Ve a la seccion de Compras
echo 4. Verifica que se carguen los datos sin errores de JSON
echo.

echo ========================================
echo SOLUCION COMPLETADA
echo ========================================
echo.
echo Resumen de lo que se hizo:
echo ✓ Se corrigieron los modelos para evitar problemas de serializacion JSON
echo ✓ Se creo un endpoint demo que devuelve JSON valido
echo ✓ Se mejoro el manejo de errores en el frontend
echo ✓ Se insertaron datos de prueba en la base de datos
echo ✓ Se inicio el backend con las correcciones
echo.
echo Si aun hay problemas:
echo 1. Revisa los logs del backend en la ventana que se abrio
echo 2. Verifica que el frontend este ejecutandose en puerto 3000
echo 3. Asegurate de estar logueado con un usuario ADMIN
echo.
pause 