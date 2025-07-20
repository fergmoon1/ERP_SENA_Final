@echo off
echo ========================================
echo PROBANDO ENDPOINT DE DIAGNOSTICO
echo ========================================
echo.

echo Probando endpoint de diagnostico...
powershell -Command "try { $response = Invoke-RestMethod -Uri 'http://localhost:8081/api/compras/diagnostico' -Method Get; Write-Host 'Respuesta:' ($response | ConvertTo-Json -Depth 3) } catch { Write-Host 'Error:' $_.Exception.Message }"

echo.
echo ========================================
echo PRUEBA COMPLETADA
echo ========================================
echo.
pause 