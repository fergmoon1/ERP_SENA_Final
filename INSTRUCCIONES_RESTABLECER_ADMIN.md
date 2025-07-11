# INSTRUCCIONES PARA RESTABLECER EL USUARIO ADMIN

## Problema Identificado
El usuario admin no puede acceder a la aplicación porque:
1. **Estado inactivo**: El campo `activo` está en `false` por defecto
2. **Contraseña incorrecta**: Posiblemente la contraseña no está hasheada correctamente

## Solución

### Opción 1: Restablecer solo el usuario ADMIN
Ejecuta el archivo `backend/restablecer_admin.sql` en tu base de datos MySQL.

### Opción 2: Restablecer todos los usuarios principales
Ejecuta el archivo `backend/restablecer_todos_usuarios.sql` en tu base de datos MySQL.

## Cómo ejecutar el script:

### Método 1: Desde MySQL Workbench o phpMyAdmin
1. Abre tu cliente MySQL (Workbench, phpMyAdmin, etc.)
2. Conéctate a tu base de datos `erp_sena`
3. Copia y pega el contenido del archivo SQL
4. Ejecuta el script

### Método 2: Desde línea de comandos
```bash
mysql -u tu_usuario -p erp_sena < backend/restablecer_admin.sql
```

## Credenciales después del restablecimiento:

### Para el usuario ADMIN:
- **Email**: admin@erp.com
- **Contraseña**: admin1234
- **Estado**: ACTIVO
- **Rol**: ADMIN

### Para todos los usuarios (si usas el script completo):
- **ADMIN**: admin@erp.com / admin1234
- **SUPERVISOR**: supervisor@erp.com / supervisor123
- **USER**: user@erp.com / user123

## Verificación
Después de ejecutar el script, deberías ver en la salida:
- Estado de contraseña: HASHEADO
- Estado de usuario: ACTIVO
- Longitud de hash: 60 caracteres

## Si el problema persiste:
1. Verifica que la base de datos esté funcionando
2. Asegúrate de que el backend esté ejecutándose
3. Revisa los logs del backend para errores de autenticación
4. Verifica que el frontend esté apuntando al backend correcto

## Archivos creados:
- `backend/restablecer_admin.sql` - Script para restablecer solo el admin
- `backend/restablecer_todos_usuarios.sql` - Script para restablecer todos los usuarios 