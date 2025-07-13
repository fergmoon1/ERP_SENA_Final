-- Script para verificar el estado actual de usuarios y avatares
USE erp_sena;

-- Verificar todos los usuarios con sus avatares
SELECT '=== TODOS LOS USUARIOS CON AVATAR ===' as info;
SELECT id, correo, nombre, rol, avatar, activo FROM usuario ORDER BY id;

-- Verificar específicamente Juana Pérez
SELECT '=== JUANA PÉREZ ESPECÍFICAMENTE ===' as info;
SELECT id, correo, nombre, rol, avatar, activo FROM usuario WHERE nombre LIKE '%Juana%' OR correo LIKE '%juana%';

-- Mostrar usuarios con avatares que no usan el endpoint correcto
SELECT '=== USUARIOS CON AVATARES INCORRECTOS ===' as info;
SELECT id, correo, nombre, rol, avatar, activo 
FROM usuario 
WHERE avatar IS NOT NULL 
AND avatar != '' 
AND avatar NOT LIKE '/api/files/%'
AND avatar NOT LIKE 'http://localhost:8081/api/files/%';

-- Mostrar usuarios sin avatar
SELECT '=== USUARIOS SIN AVATAR ===' as info;
SELECT id, correo, nombre, rol, avatar, activo 
FROM usuario 
WHERE avatar IS NULL OR avatar = ''; 