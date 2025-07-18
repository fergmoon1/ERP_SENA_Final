package com.empresa.erp.controllers;

import com.empresa.erp.models.Cliente;
import com.empresa.erp.services.ClienteService;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {
    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @GetMapping
    public List<Cliente> getAll() {
        return clienteService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Cliente> getById(@PathVariable Long id) {
        return clienteService.findById(id);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Cliente cliente) {
        try {
            cliente.setFechaCreacion(LocalDate.now());
            return ResponseEntity.ok(clienteService.save(cliente));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Cliente cliente) {
        try {
            cliente.setId(id);
            return ResponseEntity.ok(clienteService.save(cliente));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        clienteService.deleteById(id);
        
    }
    
    @PostMapping("/{id}/imagen")
    public ResponseEntity<?> uploadClienteImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            // Validar que el cliente existe
            Optional<Cliente> clienteOpt = clienteService.findById(id);
            if (clienteOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            Cliente cliente = clienteOpt.get();
            
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
            String filename = "cliente_" + id + "_" + System.currentTimeMillis() + extension;
            
            // Guardar archivo
            java.nio.file.Path uploadPath = java.nio.file.Paths.get("uploads/clientes");
            java.nio.file.Path filePath = uploadPath.resolve(filename);
            java.nio.file.Files.copy(file.getInputStream(), filePath, java.nio.file.StandardCopyOption.REPLACE_EXISTING);
            
            // Actualizar cliente con la imagen
            cliente.setImagen(filename);
            clienteService.save(cliente);
            
            return ResponseEntity.ok().body(Map.of(
                "filename", filename,
                "originalName", originalFilename,
                "size", file.getSize(),
                "url", "/api/files/clientes/" + filename,
                "message", "Imagen subida correctamente"
            ));
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error al subir la imagen: " + e.getMessage());
        }
    }
}
