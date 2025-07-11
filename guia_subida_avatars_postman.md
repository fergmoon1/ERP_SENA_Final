# Guía para Subir Avatares usando Postman

## Paso 1: Subir la imagen

### Request:
```
POST http://localhost:8081/api/files/upload
```

### Headers:
```
Authorization: Bearer tu_token_jwt
Content-Type: multipart/form-data
```

### Body (form-data):
```
file: [selecciona tu archivo de imagen]
```

### Response esperado:
```json
{
  "filename": "uuid_generado.jpg",
  "originalName": "tu_imagen.jpg",
  "size": 123456,
  "url": "/api/files/uuid_generado.jpg"
}
```

## Paso 2: Actualizar el usuario

### Request:
```
PUT http://localhost:8081/api/usuarios/{id_usuario}
```

### Headers:
```
Authorization: Bearer tu_token_jwt
Content-Type: application/json
```

### Body:
```json
{
  "nombre": "Nombre del Usuario",
  "correo": "usuario@email.com",
  "rol": "Admin",
  "avatar": "/api/files/uuid_generado.jpg"
}
```

## Ejemplo Completo:

1. **Subir imagen**:
   - POST `/api/files/upload`
   - Adjunta tu imagen
   - Guarda la URL del response

2. **Actualizar usuario**:
   - PUT `/api/usuarios/1`
   - Usa la URL obtenida en el campo `avatar`

## Notas importantes:
- Las imágenes se guardan en `backend/uploads/`
- Los nombres son únicos (UUID)
- Máximo 5MB por imagen
- Solo formatos de imagen (PNG, JPG, GIF) 