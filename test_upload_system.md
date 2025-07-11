# Sistema de Subida de Imágenes - ERP SENA

## Funcionalidades Implementadas

### Backend
- ✅ **FileUploadController**: Maneja la subida, descarga y eliminación de archivos
- ✅ **Validación**: Solo acepta imágenes (máximo 5MB)
- ✅ **Almacenamiento**: Archivos guardados en carpeta `uploads/`
- ✅ **URLs únicas**: Genera nombres únicos para evitar conflictos
- ✅ **Servir archivos**: Endpoint para descargar imágenes subidas

### Frontend
- ✅ **FileUpload Component**: Componente reutilizable con drag & drop
- ✅ **Previsualización**: Muestra la imagen antes de subir
- ✅ **Validación**: Verifica tipo y tamaño de archivo
- ✅ **Estados**: Loading, error, éxito
- ✅ **Integración**: Conectado con la página de usuarios

## Endpoints Disponibles

### Subir archivo
```
POST /api/files/upload
Content-Type: multipart/form-data
Authorization: Bearer <token>

Body: file (imagen)
```

### Descargar archivo
```
GET /api/files/{filename}
```

### Eliminar archivo
```
DELETE /api/files/{filename}
Authorization: Bearer <token>
```

## Cómo Usar

1. **Iniciar el backend**:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

2. **Iniciar el frontend**:
   ```bash
   cd frontend-erp
   npm start
   ```

3. **Probar la subida**:
   - Ir a la página de Usuarios
   - En el formulario, usar el componente de subida de avatar
   - Arrastrar una imagen o hacer clic para seleccionar
   - La imagen se subirá automáticamente

## Características del Componente

- **Drag & Drop**: Arrastra imágenes directamente
- **Click to Upload**: Haz clic para seleccionar archivo
- **Previsualización**: Ve la imagen antes de subir
- **Validación**: Solo imágenes, máximo 5MB
- **Estados visuales**: Loading, error, éxito
- **Responsive**: Se adapta a diferentes tamaños

## Estructura de Archivos

```
backend/
├── src/main/java/com/empresa/erp/controllers/
│   └── FileUploadController.java
└── uploads/ (se crea automáticamente)

frontend-erp/
├── src/components/
│   └── FileUpload.js
├── src/styles/
│   └── FileUpload.css
└── src/pages/
    └── UsuariosPage.js (actualizado)
```

## Notas Importantes

- Los archivos se guardan en `backend/uploads/`
- Los nombres son únicos (UUID + extensión)
- Las URLs son `/api/files/{filename}`
- El componente maneja errores automáticamente
- Compatible con avatares existentes (URLs y archivos locales) 