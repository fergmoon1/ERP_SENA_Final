package com.empresa.erp.controllers;

import com.empresa.erp.models.Producto;
import com.empresa.erp.services.ProductoService;
import com.empresa.erp.services.AuditLogService;
import com.empresa.erp.models.AuditLog;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {
    private final ProductoService productoService;
    @Autowired
    private AuditLogService auditLogService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    @GetMapping
    public List<Producto> getAll() {
        return productoService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Producto> getById(@PathVariable Long id) {
        return productoService.findById(id);
    }

    @PostMapping
    public Producto create(@RequestBody Producto producto, HttpServletRequest request) {
        Producto nuevo = productoService.save(producto);
        auditLogService.save(new AuditLog(
            "sistema",
            "CREAR", "Productos",
            "Producto creado: " + nuevo.getNombre() + " desde IP: " + request.getRemoteAddr(),
            "info"
        ));
        return nuevo;
    }

    @PutMapping("/{id}")
    public Producto update(@PathVariable Long id, @RequestBody Producto producto, HttpServletRequest request) {
        producto.setId(id);
        Producto actualizado = productoService.save(producto);
        auditLogService.save(new AuditLog(
            "sistema",
            "EDITAR", "Productos",
            "Producto editado: " + actualizado.getNombre() + " desde IP: " + request.getRemoteAddr(),
            "info"
        ));
        return actualizado;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, HttpServletRequest request) {
        Optional<Producto> productoOpt = productoService.findById(id);
        productoService.deleteById(id);
        String nombre = productoOpt.map(p -> p.getNombre() != null ? p.getNombre() : "producto").orElse("producto");
        auditLogService.save(new AuditLog(
            "sistema",
            "ELIMINAR", "Productos",
            "Producto eliminado: " + nombre + " desde IP: " + request.getRemoteAddr(),
            "warning"
        ));
    }

    @PostMapping("/{id}/upload-image")
    public ResponseEntity<?> uploadImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            // Buscar el producto
            Optional<Producto> productoOpt = productoService.findById(id);
            if (productoOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            Producto producto = productoOpt.get();
            
            // Validar tipo de archivo
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                return ResponseEntity.badRequest().body("Solo se permiten archivos de imagen");
            }
            
            // Validar tamaño (máximo 5MB)
            if (file.getSize() > 5 * 1024 * 1024) {
                return ResponseEntity.badRequest().body("El archivo es demasiado grande. Máximo 5MB");
            }
            
            // Crear directorio de uploads si no existe
            Path uploadPath = Paths.get("uploads/productos");
            Files.createDirectories(uploadPath);
            
            // Generar nombre único
            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String filename = "producto_" + id + "_" + UUID.randomUUID().toString() + extension;
            
            // Guardar archivo
            Path filePath = uploadPath.resolve(filename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            
            // Actualizar la URL de la imagen en el producto
            String imageUrl = "/api/files/productos/" + filename;
            producto.setImagenUrl(imageUrl);
            productoService.save(producto);
            
            return ResponseEntity.ok().body(Map.of(
                "message", "Imagen subida correctamente",
                "filename", filename,
                "url", imageUrl,
                "productoId", id
            ));
            
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Error al subir la imagen: " + e.getMessage());
        }
    }
}
