@echo off
echo ========================================
echo DEBUGGEANDO ERROR DE JSON
echo ========================================
echo.

echo 1. Verificando si el backend esta ejecutandose...
powershell -Command "try { $response = Invoke-RestMethod -Uri 'http://localhost:8081/api/compras/test' -Method Get; Write-Host '✓ Backend funcionando' } catch { Write-Host '✗ Backend no responde' }"

echo.
echo 2. Probando endpoint de compras con respuesta completa...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:8081/api/compras/public' -Method Get; Write-Host 'Status:' $response.StatusCode; Write-Host 'Content Length:' $response.Content.Length; Write-Host 'Primeros 500 caracteres:' $response.Content.Substring(0, [Math]::Min(500, $response.Content.Length)) } catch { Write-Host 'Error:' $_.Exception.Message }"

echo.
echo 3. Verificando si hay caracteres especiales en la respuesta...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:8081/api/compras/public' -Method Get; $bytes = [System.Text.Encoding]::UTF8.GetBytes($response.Content); Write-Host 'Bytes totales:' $bytes.Length; Write-Host 'Primeros 100 bytes:' ($bytes[0..99] -join ' '); } catch { Write-Host 'Error:' $_.Exception.Message }"

echo.
echo ========================================
echo DIAGNOSTICO COMPLETADO
echo ========================================
echo.
pause 