@echo off
cd /d %~dp0

echo ========================================
echo ANALIZANDO BACKEND CON SONARQUBE
echo ========================================

cd backend

echo Compilando y ejecutando pruebas...
mvn clean compile test

echo Generando reporte de cobertura...
mvn jacoco:report

echo Ejecutando análisis de SonarQube...
echo Ingresa tu token de SonarQube cuando se solicite:
mvn sonar:sonar -Dsonar.host.url=http://localhost:9000 -Dsonar.login=

echo.
echo Análisis completado! Revisa los resultados en SonarCloud.
pause
