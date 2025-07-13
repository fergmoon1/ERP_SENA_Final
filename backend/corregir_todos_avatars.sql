-- Script para corregir todas las URLs de avatares
USE erp_sena;

-- Verificar estado antes de corregir
SELECT '=== ESTADO ANTES DE CORREGIR ===' as info;
SELECT id, correo, nombre, rol, avatar, activo FROM usuario WHERE avatar IS NOT NULL AND avatar != '';

-- Corregir URLs que usan localhost:3001 (frontend) en lugar de localhost:8081 (backend)
UPDATE usuario 
SET avatar = REPLACE(avatar, 'http://localhost:3001/api/files/', '/api/files/')
WHERE avatar LIKE '%localhost:3001%';

-- Corregir URLs que no tienen el prefijo /api/files/
UPDATE usuario 
SET avatar = CONCAT('/api/files/', SUBSTRING_INDEX(avatar, '/', -1))
WHERE avatar IS NOT NULL 
AND avatar != '' 
AND avatar NOT LIKE '/api/files/%'
AND avatar NOT LIKE 'http://%'
AND avatar LIKE '%foto%';

-- Corregir específicamente el avatar de Juana Pérez
UPDATE usuario 
SET avatar = '/api/files/foto01 mujer.png'
WHERE (nombre LIKE '%Juana%' OR correo LIKE '%juana%')
AND (avatar IS NULL OR avatar != '/api/files/foto01 mujer.png');

-- Verificar estado después de corregir
SELECT '=== ESTADO DESPUÉS DE CORREGIR ===' as info;
SELECT id, correo, nombre, rol, avatar, activo FROM usuario WHERE avatar IS NOT NULL AND avatar != '';

-- Mostrar usuarios con avatares corregidos
SELECT '=== USUARIOS CON AVATARES CORREGIDOS ===' as info;
SELECT id, correo, nombre, rol, avatar, activo 
FROM usuario 
WHERE avatar IS NOT NULL 
AND avatar != '' 
AND avatar LIKE '/api/files/%'
ORDER BY id; 