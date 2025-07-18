package com.empresa.erp.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "*")
public class FileUploadController {
    
    private final Path uploadPath = Paths.get("C:/ERP_SENA_Final/backend/uploads");
    private final Path clientesPath = Paths.get("C:/ERP_SENA_Final/backend/uploads/clientes");
    private final Path usuariosPath = Paths.get("C:/ERP_SENA_Final/backend/uploads/usuarios");
    private final Path productosPath = Paths.get("C:/ERP_SENA_Final/backend/uploads/productos");
    
    public FileUploadController() {
        try {
            Files.createDirectories(uploadPath);
            Files.createDirectories(clientesPath);
            Files.createDirectories(usuariosPath);
            Files.createDirectories(productosPath);
        } catch (IOException e) {
            throw new RuntimeException("No se pudo crear el directorio de uploads", e);
        }
    }
    
    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            // Validar tipo de archivo
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                return ResponseEntity.badRequest().body("Solo se permiten archivos de imagen");
            }
            
            // Validar tamaño (máximo 5MB)
            if (file.getSize() > 5 * 1024 * 1024) {
                return ResponseEntity.badRequest().body("El archivo es demasiado grande. Máximo 5MB");
            }
            
            // Generar nombre único
            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String filename = UUID.randomUUID().toString() + extension;
            
            // Guardar archivo
            Path filePath = uploadPath.resolve(filename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            
            return ResponseEntity.ok().body(Map.of(
                "filename", filename,
                "originalName", originalFilename,
                "size", file.getSize(),
                "url", "/api/files/" + filename
            ));
            
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Error al subir el archivo: " + e.getMessage());
        }
    }
    
    @PostMapping("/upload/cliente")
    public ResponseEntity<?> uploadClienteImage(@RequestParam("file") MultipartFile file) {
        try {
            // Validar tipo de archivo
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                return ResponseEntity.badRequest().body("Solo se permiten archivos de imagen");
            }
            
            // Validar tamaño (máximo 5MB)
            if (file.getSize() > 5 * 1024 * 1024) {
                return ResponseEntity.badRequest().body("El archivo es demasiado grande. Máximo 5MB");
            }
            
            // Generar nombre único
            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String filename = "cliente_" + UUID.randomUUID().toString() + extension;
            
            // Guardar archivo en directorio de clientes
            Path filePath = clientesPath.resolve(filename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            
            return ResponseEntity.ok().body(Map.of(
                "filename", filename,
                "originalName", originalFilename,
                "size", file.getSize(),
                "url", "/api/files/clientes/" + filename
            ));
            
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Error al subir la imagen del cliente: " + e.getMessage());
        }
    }
    
    @PostMapping("/upload/usuario")
    public ResponseEntity<?> uploadUsuarioImage(@RequestParam("file") MultipartFile file) {
        try {
            // Validar tipo de archivo
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                return ResponseEntity.badRequest().body("Solo se permiten archivos de imagen");
            }
            
            // Validar tamaño (máximo 5MB)
            if (file.getSize() > 5 * 1024 * 1024) {
                return ResponseEntity.badRequest().body("El archivo es demasiado grande. Máximo 5MB");
            }
            
            // Generar nombre único
            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String filename = "usuario_" + UUID.randomUUID().toString() + extension;
            
            // Guardar archivo en directorio de usuarios
            Path filePath = usuariosPath.resolve(filename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            
            return ResponseEntity.ok().body(Map.of(
                "filename", filename,
                "originalName", originalFilename,
                "size", file.getSize(),
                "url", "/api/files/usuarios/" + filename
            ));
            
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Error al subir la imagen del usuario: " + e.getMessage());
        }
    }
    
    @GetMapping("/clientes/{filename:.+}")
    public ResponseEntity<Resource> getClienteImage(@PathVariable String filename) {
        try {
            // Decodificar el nombre del archivo si viene codificado
            String decodedFilename = java.net.URLDecoder.decode(filename, "UTF-8");
            
            Path filePath = clientesPath.resolve(decodedFilename);
            Resource resource = new UrlResource(filePath.toUri());
            
            if (resource.exists() && resource.isReadable()) {
                // Determinar el tipo MIME basado en la extensión del archivo
                String contentType = determineContentType(decodedFilename);
                
                return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + decodedFilename + "\"")
                    .header("Access-Control-Allow-Origin", "*")
                    .header("Access-Control-Allow-Methods", "GET")
                    .header("Access-Control-Allow-Headers", "*")
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(resource);
            } else {
                // Log para debugging
                System.out.println("Archivo de cliente no encontrado: " + decodedFilename);
                System.out.println("Ruta completa: " + filePath.toAbsolutePath());
                return ResponseEntity.notFound()
                    .header("Access-Control-Allow-Origin", "*")
                    .header("Access-Control-Allow-Methods", "GET")
                    .header("Access-Control-Allow-Headers", "*")
                    .build();
            }
        } catch (IOException e) {
            System.out.println("Error accediendo al archivo de cliente: " + e.getMessage());
            return ResponseEntity.internalServerError()
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET")
                .header("Access-Control-Allow-Headers", "*")
                .build();
        }
    }
    
    @GetMapping("/usuarios/{filename:.+}")
    public ResponseEntity<Resource> getUsuarioImage(@PathVariable String filename) {
        try {
            // Decodificar el nombre del archivo si viene codificado
            String decodedFilename = java.net.URLDecoder.decode(filename, "UTF-8");
            
            Path filePath = usuariosPath.resolve(decodedFilename);
            Resource resource = new UrlResource(filePath.toUri());
            
            if (resource.exists() && resource.isReadable()) {
                // Determinar el tipo MIME basado en la extensión del archivo
                String contentType = determineContentType(decodedFilename);
                
                return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + decodedFilename + "\"")
                    .header("Access-Control-Allow-Origin", "*")
                    .header("Access-Control-Allow-Methods", "GET")
                    .header("Access-Control-Allow-Headers", "*")
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(resource);
            } else {
                // Log para debugging
                System.out.println("Archivo de usuario no encontrado: " + decodedFilename);
                System.out.println("Ruta completa: " + filePath.toAbsolutePath());
                return ResponseEntity.notFound()
                    .header("Access-Control-Allow-Origin", "*")
                    .header("Access-Control-Allow-Methods", "GET")
                    .header("Access-Control-Allow-Headers", "*")
                    .build();
            }
        } catch (IOException e) {
            System.out.println("Error accediendo al archivo de usuario: " + e.getMessage());
            return ResponseEntity.internalServerError()
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET")
                .header("Access-Control-Allow-Headers", "*")
                .build();
        }
    }
    
    @GetMapping("/productos/{filename:.+}")
    public ResponseEntity<Resource> getProductImage(@PathVariable String filename) {
        try {
            // Decodificar el nombre del archivo si viene codificado
            String decodedFilename = java.net.URLDecoder.decode(filename, "UTF-8");
            
            Path filePath = productosPath.resolve(decodedFilename);
            Resource resource = new UrlResource(filePath.toUri());
            
            if (resource.exists() && resource.isReadable()) {
                // Determinar el tipo MIME basado en la extensión del archivo
                String contentType = determineContentType(decodedFilename);
                
                return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + decodedFilename + "\"")
                    .header("Access-Control-Allow-Origin", "*")
                    .header("Access-Control-Allow-Methods", "GET")
                    .header("Access-Control-Allow-Headers", "*")
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(resource);
            } else {
                // Log para debugging
                System.out.println("Archivo no encontrado: " + decodedFilename);
                System.out.println("Ruta completa: " + filePath.toAbsolutePath());
                return ResponseEntity.notFound()
                    .header("Access-Control-Allow-Origin", "*")
                    .header("Access-Control-Allow-Methods", "GET")
                    .header("Access-Control-Allow-Headers", "*")
                    .build();
            }
        } catch (IOException e) {
            System.out.println("Error accediendo al archivo: " + e.getMessage());
            return ResponseEntity.internalServerError()
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET")
                .header("Access-Control-Allow-Headers", "*")
                .build();
        }
    }

    @GetMapping("/{filename:.+}")
    public ResponseEntity<Resource> getFile(@PathVariable String filename) {
        try {
            // Decodificar el nombre del archivo si viene codificado
            String decodedFilename = java.net.URLDecoder.decode(filename, "UTF-8");
            
            Path filePath = uploadPath.resolve(decodedFilename);
            Resource resource = new UrlResource(filePath.toUri());
            
            if (resource.exists() && resource.isReadable()) {
                // Determinar el tipo MIME basado en la extensión del archivo
                String contentType = determineContentType(decodedFilename);
                
                return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + decodedFilename + "\"")
                    .header("Access-Control-Allow-Origin", "*")
                    .header("Access-Control-Allow-Methods", "GET")
                    .header("Access-Control-Allow-Headers", "*")
                    .contentType(MediaType.parseMediaType(contentType))
                    .body(resource);
            } else {
                // Log para debugging
                System.out.println("Archivo no encontrado: " + decodedFilename);
                System.out.println("Ruta completa: " + filePath.toAbsolutePath());
                System.out.println("Archivos en uploads:");
                try {
                    Files.list(uploadPath).forEach(System.out::println);
                } catch (IOException e) {
                    System.out.println("Error listando archivos: " + e.getMessage());
                }
                return ResponseEntity.notFound()
                    .header("Access-Control-Allow-Origin", "*")
                    .header("Access-Control-Allow-Methods", "GET")
                    .header("Access-Control-Allow-Headers", "*")
                    .build();
            }
        } catch (IOException e) {
            System.out.println("Error accediendo al archivo: " + e.getMessage());
            return ResponseEntity.internalServerError()
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "GET")
                .header("Access-Control-Allow-Headers", "*")
                .build();
        }
    }
    
    private String determineContentType(String filename) {
        String extension = "";
        if (filename.contains(".")) {
            extension = filename.substring(filename.lastIndexOf(".")).toLowerCase();
        }
        
        switch (extension) {
            case ".png":
                return "image/png";
            case ".jpg":
            case ".jpeg":
                return "image/jpeg";
            case ".gif":
                return "image/gif";
            case ".webp":
                return "image/webp";
            case ".bmp":
                return "image/bmp";
            default:
                return "image/jpeg"; // Por defecto JPEG
        }
    }
    
    @DeleteMapping("/{filename}")
    public ResponseEntity<?> deleteFile(@PathVariable String filename) {
        try {
            Path filePath = uploadPath.resolve(filename);
            if (Files.exists(filePath)) {
                Files.delete(filePath);
                return ResponseEntity.ok().body("Archivo eliminado correctamente");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Error al eliminar el archivo: " + e.getMessage());
        }
    }
} 