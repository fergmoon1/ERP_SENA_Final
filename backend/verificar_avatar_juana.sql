-- Script para verificar y corregir el avatar de Juana Pérez
USE erp_sena;

-- Verificar el estado actual de Juana Pérez
SELECT '=== ESTADO ACTUAL DE JUANA PÉREZ ===' as info;
SELECT id, correo, nombre, rol, avatar, activo FROM usuario WHERE nombre LIKE '%Juana%' OR correo LIKE '%juana%';

-- Corregir la URL del avatar para que use el endpoint correcto
UPDATE usuario 
SET avatar = '/api/files/foto01 mujer.png'
WHERE (nombre LIKE '%Juana%' OR correo LIKE '%juana%') 
AND (avatar IS NULL OR avatar NOT LIKE '/api/files/%');

-- Verificar el estado después de la corrección
SELECT '=== ESTADO DESPUÉS DE CORREGIR ===' as info;
SELECT id, correo, nombre, rol, avatar, activo FROM usuario WHERE nombre LIKE '%Juana%' OR correo LIKE '%juana%';

-- Mostrar todos los usuarios con avatares para verificar
SELECT '=== TODOS LOS USUARIOS CON AVATAR ===' as info;
SELECT id, correo, nombre, rol, avatar, activo FROM usuario WHERE avatar IS NOT NULL AND avatar != '' ORDER BY id; 