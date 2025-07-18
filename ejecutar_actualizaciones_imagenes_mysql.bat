@echo off
echo ========================================
echo ACTUALIZACIONES PARA SISTEMA DE IMAGENES (MySQL)
echo ========================================
echo.

echo 1. Ejecutando script SQL para agregar campo imagen...
echo Por favor ejecuta manualmente en MySQL Workbench:
echo sql\agregar_campo_imagen_cliente_mysql.sql
echo.
echo O ejecuta directamente:
echo ALTER TABLE cliente ADD COLUMN imagen VARCHAR(255);
echo.

echo 2. Creando directorios de uploads...
if not exist "backend\uploads\clientes" mkdir "backend\uploads\clientes"
if not exist "backend\uploads\usuarios" mkdir "backend\uploads\usuarios"
if not exist "backend\uploads\productos" mkdir "backend\uploads\productos"
echo Directorios creados correctamente.
echo.

echo 3. Compilando backend...
cd backend
call mvn clean compile
echo.

echo 4. Iniciando backend...
start "Backend ERP" mvn spring-boot:run
echo Backend iniciado en puerto 8081
echo.

echo 5. Esperando 10 segundos para que el backend se inicie...
timeout /t 10 /nobreak >nul

echo 6. Iniciando frontend...
cd ..
cd frontend-erp
start "Frontend ERP" npm start
echo Frontend iniciado en puerto 3000
echo.

echo ========================================
echo SISTEMA DE IMAGENES INSTALADO (MySQL)
echo ========================================
echo.
echo Caracteristicas implementadas:
echo - Campo imagen en tabla cliente
echo - Endpoints para subir imagenes de clientes y usuarios
echo - Componente drag & drop para imagenes
echo - Visualizacion de imagenes en tabla de clientes
echo - Directorios organizados: uploads/clientes, uploads/usuarios
echo.
echo URLs disponibles:
echo - http://localhost:3000 (Frontend)
echo - http://localhost:8081 (Backend)
echo.
echo IMPORTANTE: Ejecuta el script SQL en MySQL Workbench antes de continuar
echo.
pause 