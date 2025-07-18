# Sistema de Imágenes para ERP SENA

## Características Implementadas

### ✅ Backend
- **Campo imagen en modelo Cliente**: Agregado campo `imagen` para almacenar nombres de archivos
- **FileUploadController actualizado**: Nuevos endpoints para clientes y usuarios
- **Directorios organizados**: 
  - `uploads/clientes/` - Imágenes de clientes
  - `uploads/usuarios/` - Imágenes de usuarios  
  - `uploads/productos/` - Imágenes de productos
- **Validaciones**: Tipo de archivo (solo imágenes) y tamaño máximo (5MB)
- **Endpoints disponibles**:
  - `POST /api/files/upload/cliente` - Subir imagen de cliente
  - `POST /api/files/upload/usuario` - Subir imagen de usuario
  - `GET /api/files/clientes/{filename}` - Obtener imagen de cliente
  - `GET /api/files/usuarios/{filename}` - Obtener imagen de usuario

### ✅ Frontend
- **Componente ImageUpload**: Drag & drop con preview
- **Tabla de clientes actualizada**: Nueva columna "Foto" antes del nombre
- **Formulario de creación**: Componente de imagen integrado
- **Modal de edición**: Componente de imagen para editar clientes existentes
- **Estilos CSS**: Diseño responsive y moderno
- **Manejo de errores**: Fallback para imágenes no encontradas

### ✅ Base de Datos
- **Script SQL**: `agregar_campo_imagen_cliente_mysql.sql` (MySQL)
- **Campo imagen**: VARCHAR(255) en tabla cliente
- **Campo avatar**: Ya existía en tabla usuario

## Instalación y Configuración

### 1. Ejecutar Scripts SQL (MySQL)

#### Opción A: Usando MySQL Workbench
1. Abrir MySQL Workbench
2. Conectar a tu base de datos
3. Ejecutar el script: `sql\agregar_campo_imagen_cliente_mysql.sql`

#### Opción B: Comando directo
```sql
-- Agregar campo imagen a tabla cliente
ALTER TABLE cliente ADD COLUMN imagen VARCHAR(255);

-- Verificar que se agregó correctamente
SELECT COLUMN_NAME, DATA_TYPE, IS_NULLABLE
FROM INFORMATION_SCHEMA.COLUMNS 
WHERE TABLE_NAME = 'cliente'
ORDER BY ORDINAL_POSITION;
```

#### Opción C: Script batch (recomendado)
```batch
-- Ejecutar script automatizado
ejecutar_actualizaciones_imagenes_mysql.bat
```

### 2. Crear Directorios
```batch
-- Ejecutar script de copia de imágenes
copiar_imagenes_ejemplo.bat
```

### 3. Compilar y Ejecutar
```batch
-- Ejecutar actualizaciones completas
ejecutar_actualizaciones_imagenes_mysql.bat
```

## Uso del Sistema

### 🆕 **Crear Cliente con Imagen**
1. Ir a la página de Clientes
2. En el formulario de nuevo cliente, usar el componente de imagen
3. Arrastrar imagen desde `C:\ERP_SENA_Final\backend\uploads` o hacer clic para seleccionar
4. La imagen se sube automáticamente al servidor
5. Se muestra preview y se guarda en la base de datos
6. Hacer clic en "Guardar"

### ✏️ **Editar Imagen de Cliente Existente**
1. En la tabla de clientes, hacer clic en el botón "Editar" (ícono de lápiz)
2. En el modal de edición, aparece la imagen actual del cliente
3. Para cambiar la imagen:
   - **Arrastrar** una nueva imagen al área circular
   - **O hacer clic** en el área para seleccionar archivo
4. La nueva imagen se sube automáticamente
5. Hacer clic en "Actualizar" para guardar los cambios

### 👁️ **Visualizar Imágenes**
- **Tabla de clientes**: Muestra foto circular de cada cliente
- **Modal de edición**: Muestra la imagen actual del cliente
- **Fallback**: Si no hay imagen, muestra icono de usuario
- **Responsive**: Se adapta a diferentes tamaños de pantalla

## Estructura de Archivos

```
backend/
├── uploads/
│   ├── clientes/          # Imágenes de clientes
│   ├── usuarios/          # Imágenes de usuarios
│   └── productos/         # Imágenes de productos
├── src/main/java/com/empresa/erp/
│   ├── models/Cliente.java    # Campo imagen agregado
│   └── controllers/
│       ├── FileUploadController.java  # Endpoints actualizados
│       └── ClienteController.java     # Endpoint de imagen
└── sql/
    ├── agregar_campo_imagen_cliente_mysql.sql
    └── actualizar_usuarios_con_imagenes_mysql.sql

frontend-erp/
├── src/
│   ├── components/
│   │   └── ImageUpload.js     # Componente drag & drop
│   ├── pages/
│   │   └── ClientesPage.js    # Tabla y modales actualizados
│   └── styles/
│       ├── ImageUpload.css    # Estilos del componente
│       └── ClientesPage.css   # Estilos de tabla y modal
```

## URLs de Acceso

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8081
- **API Files**: http://localhost:8081/api/files/

## Rutas de Archivos (Actualizadas)

### Rutas Absolutas Configuradas:
- **Clientes**: `C:\ERP_SENA_Final\backend\uploads\clientes`
- **Usuarios**: `C:\ERP_SENA_Final\backend\uploads\usuarios`
- **Productos**: `C:\ERP_SENA_Final\backend\uploads\productos`

### URLs de Acceso a Imágenes:
- **Clientes**: `http://localhost:8081/api/files/clientes/{filename}`
- **Usuarios**: `http://localhost:8081/api/files/usuarios/{filename}`
- **Productos**: `http://localhost:8081/api/files/productos/{filename}`

## Características Técnicas

### Validaciones
- ✅ Solo archivos de imagen (image/*)
- ✅ Tamaño máximo 5MB
- ✅ Nombres únicos con UUID
- ✅ Manejo de errores

### Seguridad
- ✅ Validación de tipos MIME
- ✅ Sanitización de nombres de archivo
- ✅ Headers CORS configurados
- ✅ Rutas protegidas con JWT

### Performance
- ✅ Compresión automática
- ✅ Cache de imágenes
- ✅ Lazy loading en frontend
- ✅ Fallback para errores

## Flujo Completo de Imágenes

### 1. **Creación de Cliente**
```
Usuario → Formulario → Arrastrar imagen → Subir al servidor → Guardar en BD → Mostrar en tabla
```

### 2. **Edición de Cliente**
```
Usuario → Tabla → Botón Editar → Modal → Cambiar imagen → Subir al servidor → Actualizar BD → Mostrar cambios
```

### 3. **Visualización**
```
BD → Cargar cliente → Obtener imagen → Mostrar en tabla/modal → Fallback si no existe
```

## Troubleshooting

### Error SQL en MySQL
Si obtienes error de sintaxis SQL:
1. Usar el script `agregar_campo_imagen_cliente_mysql.sql`
2. O ejecutar directamente: `ALTER TABLE cliente ADD COLUMN imagen VARCHAR(255);`
3. Verificar que estás conectado a la base de datos correcta

### Imagen no se muestra
1. Verificar que el archivo existe en el directorio correcto
2. Revisar logs del backend para errores
3. Verificar permisos de archivos
4. Comprobar URL en el navegador

### Error al subir imagen
1. Verificar tamaño del archivo (máx 5MB)
2. Comprobar tipo de archivo (solo imágenes)
3. Revisar permisos de escritura en uploads/
4. Verificar conexión con el backend

### Componente no funciona
1. Verificar que ImageUpload.js está importado
2. Comprobar que los estilos CSS están cargados
3. Revisar consola del navegador para errores
4. Verificar que el backend está ejecutándose

### Modal de edición no muestra imagen
1. Verificar que el campo `imagen` existe en la BD
2. Comprobar que el cliente tiene una imagen guardada
3. Revisar la URL de la imagen en el navegador
4. Verificar que el endpoint de imágenes funciona

### Botones del modal no aparecen uno al lado del otro
1. Verificar que los estilos CSS están cargados correctamente
2. Comprobar que la clase `modal-buttons` está aplicada
3. Revisar que no hay conflictos con estilos globales
4. Verificar que los estilos tienen `!important` para mayor prioridad
5. Probar con `test_modal_buttons.html` para verificar independientemente

### Imágenes no se cargan con nuevas rutas
1. Verificar que los directorios existen: `C:\ERP_SENA_Final\backend\uploads\`
2. Ejecutar `verificar_directorios_uploads.bat` para crear directorios
3. Comprobar que el backend está usando rutas absolutas
4. Verificar permisos de escritura en los directorios
5. Revisar logs del backend para errores de acceso a archivos

## Scripts de Prueba

### Verificar Sistema
```batch
verificar_sistema_imagenes.bat
```

### Probar Edición
```batch
probar_edicion_imagenes.bat
```

### Probar Botones del Modal
```batch
probar_modal_buttons.bat
```

### Test Independiente
- Abrir `test_image_upload.html` en el navegador
- Probar drag & drop independientemente
- Verificar conexión con backend
- Abrir `test_modal_buttons.html` para probar botones del modal

### Verificar Directorios
```batch
verificar_directorios_uploads.bat
```

### Copiar Imágenes de Ejemplo
```batch
copiar_imagenes_ejemplo_nuevas_rutas.bat
```

## Próximas Mejoras

- [ ] Compresión automática de imágenes
- [ ] Redimensionamiento automático
- [ ] Galería de imágenes por cliente
- [ ] Filtros por tipo de imagen
- [ ] Backup automático de imágenes
- [ ] Integración con servicios en la nube

## Contacto

Para soporte técnico o reportar problemas:
- Revisar logs del backend
- Verificar configuración de base de datos
- Comprobar permisos de archivos
- Validar URLs y puertos 