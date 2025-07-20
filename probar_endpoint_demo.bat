@echo off
echo ========================================
echo PROBANDO ENDPOINT DEMO
echo ========================================
echo.

echo 1. Probando endpoint demo (sin autenticacion)...
powershell -Command "try { $response = Invoke-RestMethod -Uri 'http://localhost:8081/api/compras/demo' -Method Get; Write-Host '✓ Endpoint demo funcionando:' ($response | ConvertTo-Json -Depth 3) } catch { Write-Host '✗ Error:' $_.Exception.Message }"

echo.
echo 2. Probando endpoint de diagnostico...
powershell -Command "try { $response = Invoke-RestMethod -Uri 'http://localhost:8081/api/compras/diagnostico' -Method Get; Write-Host '✓ Diagnostico:' ($response | ConvertTo-Json -Depth 3) } catch { Write-Host '✗ Error:' $_.Exception.Message }"

echo.
echo ========================================
echo PRUEBA COMPLETADA
echo ========================================
echo.
pause 