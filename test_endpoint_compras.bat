@echo off
echo ========================================
echo PROBANDO ENDPOINT DE COMPRAS
echo ========================================
echo.

echo 1. Probando endpoint de prueba...
curl -s http://localhost:8081/api/compras/test
echo.
echo.

echo 2. Probando endpoint de compras completo...
curl -s http://localhost:8081/api/compras > response_compras.json
if %errorlevel% equ 0 (
    echo ✓ Respuesta guardada en response_compras.json
    echo.
    echo Mostrando primeros 1000 caracteres:
    powershell -Command "Get-Content response_compras.json | Select-Object -First 1 | ForEach-Object { $_.Substring(0, [Math]::Min(1000, $_.Length)) }"
    echo.
    echo.
    echo Mostrando ultimos 1000 caracteres:
    powershell -Command "Get-Content response_compras.json | Select-Object -Last 1 | ForEach-Object { $_.Substring([Math]::Max(0, $_.Length - 1000)) }"
) else (
    echo ✗ Error al obtener respuesta
)

echo.
echo 3. Verificando si la respuesta es JSON valido...
powershell -Command "try { $json = Get-Content response_compras.json -Raw | ConvertFrom-Json; Write-Host '✓ JSON valido' } catch { Write-Host '✗ JSON invalido:' $_.Exception.Message }"

echo.
echo ========================================
echo PRUEBA COMPLETADA
echo ========================================
echo.
pause 