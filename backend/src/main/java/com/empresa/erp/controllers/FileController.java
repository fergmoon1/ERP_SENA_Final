package com.empresa.erp.controllers;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@RestController
@RequestMapping("/api/files")
@CrossOrigin(origins = "*")
public class FileController {

    private final Path uploadPath = Paths.get("uploads");

    public FileController() {
        try {
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
        } catch (IOException e) {
            throw new RuntimeException("No se pudo crear el directorio de uploads", e);
        }
    }

    @GetMapping("/{filename:.+}")
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        try {
            Path file = uploadPath.resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            
            if (resource.exists() || resource.isReadable()) {
                return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                    .contentType(MediaType.IMAGE_JPEG)
                    .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Archivo vacío");
            }

            String originalFilename = file.getOriginalFilename();
            String extension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            
            String filename = UUID.randomUUID().toString() + extension;
            Path filePath = uploadPath.resolve(filename);
            
            Files.copy(file.getInputStream(), filePath);
            
            return ResponseEntity.ok("/api/files/" + filename);
        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Error al subir el archivo: " + e.getMessage());
        }
    }
} 