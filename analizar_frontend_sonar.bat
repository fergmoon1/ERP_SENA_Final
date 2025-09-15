@echo off
cd /d %~dp0

echo ========================================
echo ANALIZANDO FRONTEND CON SONARQUBE
echo ========================================

cd frontend-erp

echo Instalando dependencias...
npm install

echo Ejecutando pruebas y generando cobertura...
npm test -- --coverage --watchAll=false

echo Ejecutando análisis de SonarQube...
echo Ingresa tu token de SonarQube cuando se solicite:
sonar-scanner -Dsonar.host.url=http://localhost:9000 -Dsonar.login=

echo.
echo Análisis completado! Revisa los resultados en SonarCloud.
pause
