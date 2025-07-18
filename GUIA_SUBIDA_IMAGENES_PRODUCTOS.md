# Guía de Subida de Imágenes de Productos

## 📋 Descripción
Se ha implementado una funcionalidad completa para subir imágenes de productos en el sistema ERP. Los usuarios pueden arrastrar y soltar imágenes o hacer clic para seleccionar archivos.

## 🚀 Funcionalidades Implementadas

### Frontend (React)
- **Drag & Drop**: Arrastrar imágenes directamente sobre el área de imagen del producto
- **Click to Upload**: Hacer clic en el área de imagen para abrir el selector de archivos
- **Validaciones**: 
  - Solo archivos de imagen (JPG, PNG, GIF, etc.)
  - Tamaño máximo 5MB
  - Feedback visual durante la subida
- **Feedback Visual**:
  - Indicador de carga durante la subida
  - Notificaciones de éxito/error
  - Efectos hover en el área de imagen
  - Imagen por defecto si no hay imagen subida

### Backend (Spring Boot)
- **Endpoint**: `POST /api/productos/{id}/upload-image`
- **Servidor de archivos**: `GET /api/files/productos/{filename}`
- **Validaciones**:
  - Tipo de archivo (solo imágenes)
  - Tamaño máximo 5MB
  - Generación de nombres únicos
- **Almacenamiento**: Carpeta `backend/uploads/productos/`

## 📁 Estructura de Archivos

```
backend/
├── uploads/
│   └── productos/          # Carpeta para imágenes de productos
├── src/main/java/com/empresa/erp/
│   ├── models/
│   │   └── Producto.java   # Modelo con campo imagenUrl
│   ├── controllers/
│   │   ├── ProductoController.java    # Endpoint de subida
│   │   └── FileUploadController.java  # Servidor de archivos
│   └── services/
│       └── ProductoService.java       # Lógica de negocio

frontend-erp/
└── src/pages/
    └── InventarioPage.js   # Interfaz de drag & drop
```

## 🛠️ Configuración Requerida

### 1. Base de Datos
Ejecutar el script SQL para agregar la columna imagenUrl:

```sql
-- Ejecutar en la base de datos
ALTER TABLE producto ADD COLUMN imagen_url VARCHAR(255);
```

### 2. Carpetas
La carpeta `backend/uploads/productos/` se crea automáticamente al iniciar el backend.

### 3. Permisos
Asegurarse de que el backend tenga permisos de escritura en la carpeta `uploads/`.

## 📖 Cómo Usar

### Para Usuarios
1. **Ir a la página de Inventario**
2. **Encontrar el producto** en la tabla
3. **Hacer clic en el área de imagen** o **arrastrar una imagen** sobre ella
4. **Seleccionar la imagen** (máximo 5MB)
5. **Esperar la confirmación** de subida exitosa

### Para Desarrolladores

#### Subir imagen programáticamente:
```javascript
const formData = new FormData();
formData.append('file', imageFile);

const response = await axios.post(
  `${API_URL}/productos/${productId}/upload-image`,
  formData,
  {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': `Bearer ${token}`
    }
  }
);
```

#### Obtener URL de imagen:
```javascript
const imageUrl = `${API_URL}/files/productos/${filename}`;
```

## 🔧 Endpoints Disponibles

### Subir imagen de producto
```
POST /api/productos/{id}/upload-image
Content-Type: multipart/form-data
Body: file (imagen)
```

### Obtener imagen
```
GET /api/files/productos/{filename}
```

### Eliminar imagen
```
DELETE /api/files/{filename}
```

## ⚠️ Consideraciones

### Seguridad
- Validación de tipos de archivo en frontend y backend
- Límite de tamaño de archivo (5MB)
- Nombres de archivo únicos para evitar conflictos
- Sanitización de nombres de archivo

### Rendimiento
- Las imágenes se almacenan localmente
- Considerar implementar compresión de imágenes
- Evaluar uso de CDN para producción

### Mantenimiento
- Monitorear espacio en disco
- Implementar limpieza de archivos huérfanos
- Backup regular de la carpeta uploads

## 🐛 Solución de Problemas

### Error: "No se puede escribir en la carpeta de uploads"
- Verificar permisos de escritura en `backend/uploads/`
- Crear la carpeta manualmente si es necesario

### Error: "Archivo no encontrado"
- Verificar que el archivo existe en `backend/uploads/productos/`
- Revisar logs del backend para más detalles

### Imagen no se muestra
- Verificar que la URL de la imagen es correcta
- Comprobar que el servidor de archivos está funcionando
- Revisar la consola del navegador para errores

## 📝 Notas de Desarrollo

### Próximas Mejoras Sugeridas
1. **Compresión automática** de imágenes grandes
2. **Miniaturas** generadas automáticamente
3. **Múltiples formatos** de imagen (WebP, AVIF)
4. **Integración con CDN** para mejor rendimiento
5. **Editor de imágenes** básico (recortar, rotar)
6. **Galería de imágenes** por producto

### Archivos Modificados
- `backend/src/main/java/com/empresa/erp/models/Producto.java`
- `backend/src/main/java/com/empresa/erp/controllers/ProductoController.java`
- `backend/src/main/java/com/empresa/erp/controllers/FileUploadController.java`
- `frontend-erp/src/pages/InventarioPage.js`
- `sql/agregar_imagen_productos.sql`

## ✅ Estado Actual
- ✅ Drag & Drop funcional
- ✅ Click to upload
- ✅ Validaciones de archivo
- ✅ Feedback visual
- ✅ Almacenamiento en servidor
- ✅ Servidor de archivos
- ✅ Integración con base de datos
- ✅ Manejo de errores
- ✅ Notificaciones de usuario 