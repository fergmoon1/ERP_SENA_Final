@echo off
echo ========================================
echo PROBANDO ENDPOINT CON AUTENTICACION
echo ========================================
echo.

echo 1. Probando endpoint de prueba (sin auth)...
powershell -Command "try { $response = Invoke-RestMethod -Uri 'http://localhost:8081/api/compras/test' -Method Get; Write-Host 'Respuesta:' $response } catch { Write-Host 'Error:' $_.Exception.Message }"

echo.
echo 2. Probando endpoint de diagnostico (sin auth)...
powershell -Command "try { $response = Invoke-RestMethod -Uri 'http://localhost:8081/api/compras/diagnostico' -Method Get; Write-Host 'Respuesta:' ($response | ConvertTo-Json -Depth 3) } catch { Write-Host 'Error:' $_.Exception.Message }"

echo.
echo 3. Probando endpoint public (sin auth)...
powershell -Command "try { $response = Invoke-RestMethod -Uri 'http://localhost:8081/api/compras/public' -Method Get; Write-Host 'Respuesta:' ($response | ConvertTo-Json -Depth 3) } catch { Write-Host 'Error:' $_.Exception.Message }"

echo.
echo 4. Probando endpoint principal (sin auth)...
powershell -Command "try { $response = Invoke-RestMethod -Uri 'http://localhost:8081/api/compras' -Method Get; Write-Host 'Respuesta:' ($response | ConvertTo-Json -Depth 3) } catch { Write-Host 'Error:' $_.Exception.Message }"

echo.
echo ========================================
echo PRUEBA COMPLETADA
echo ========================================
echo.
echo Si todos los endpoints devuelven 401, significa que:
echo 1. El backend esta ejecutandose correctamente
echo 2. Los endpoints requieren autenticacion
echo 3. El problema esta en el frontend (token JWT)
echo.
pause 