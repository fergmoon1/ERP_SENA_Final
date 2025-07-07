-- Script para limpiar usuarios duplicados manteniendo los originales
USE erp_sena;

-- 1. Verificar si hay duplicados
SELECT '=== VERIFICANDO DUPLICADOS ===' as info;
SELECT correo, COUNT(*) as cantidad
FROM usuario 
WHERE correo IN ('admin@empresa.com', 'supervisor@empresa.com', 'user@empresa.com')
GROUP BY correo
HAVING COUNT(*) > 1;

-- 2. Mostrar todos los usuarios con estos correos
SELECT '=== TODOS LOS USUARIOS CON ESTOS CORREOS ===' as info;
SELECT id, correo, nombre, rol, 
       CASE 
           WHEN password LIKE '$2a$%' THEN 'HASHEADO'
           ELSE 'NO HASHEADO'
       END as estado_password,
       LENGTH(password) as longitud_password
FROM usuario 
WHERE correo IN ('admin@empresa.com', 'supervisor@empresa.com', 'user@empresa.com')
ORDER BY correo, id;

-- 3. Eliminar duplicados (mantener solo el primer registro de cada correo)
-- Para admin@empresa.com
DELETE u1 FROM usuario u1
INNER JOIN usuario u2 
WHERE u1.id > u2.id 
AND u1.correo = u2.correo 
AND u1.correo = 'admin@empresa.com';

-- Para supervisor@empresa.com
DELETE u1 FROM usuario u1
INNER JOIN usuario u2 
WHERE u1.id > u2.id 
AND u1.correo = u2.correo 
AND u1.correo = 'supervisor@empresa.com';

-- Para user@empresa.com
DELETE u1 FROM usuario u1
INNER JOIN usuario u2 
WHERE u1.id > u2.id 
AND u1.correo = u2.correo 
AND u1.correo = 'user@empresa.com';

-- 4. Verificar después de limpiar duplicados
SELECT '=== USUARIOS DESPUÉS DE LIMPIAR DUPLICADOS ===' as info;
SELECT id, correo, nombre, rol, 
       CASE 
           WHEN password LIKE '$2a$%' THEN 'HASHEADO'
           ELSE 'NO HASHEADO'
       END as estado_password,
       LENGTH(password) as longitud_password
FROM usuario 
WHERE correo IN ('admin@empresa.com', 'supervisor@empresa.com', 'user@empresa.com')
ORDER BY correo;

-- 5. Contar total de usuarios
SELECT '=== TOTAL DE USUARIOS ===' as info;
SELECT COUNT(*) as total_usuarios FROM usuario; 