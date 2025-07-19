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
import com.empresa.erp.services.AuditLogService;
import com.empresa.erp.models.AuditLog;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = "*")
public class ClienteController {
    private final ClienteService clienteService;
    @Autowired
    private AuditLogService auditLogService;

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
    public ResponseEntity<?> create(@RequestBody Cliente cliente, HttpServletRequest request) {
        try {
            cliente.setFechaCreacion(java.time.LocalDate.now());
            ResponseEntity<?> response = ResponseEntity.ok(clienteService.save(cliente));
            auditLogService.save(new AuditLog(
                "sistema",
                "CREAR", "Clientes",
                "Cliente creado: " + (cliente.getNombre() != null ? cliente.getNombre() : "cliente") + " desde IP: " + request.getRemoteAddr(),
                "info"
            ));
            return response;
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(org.springframework.http.HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Cliente cliente, HttpServletRequest request) {
        try {
            cliente.setId(id);
            ResponseEntity<?> response = ResponseEntity.ok(clienteService.save(cliente));
            auditLogService.save(new AuditLog(
                "sistema",
                "EDITAR", "Clientes",
                "Cliente editado: " + (cliente.getNombre() != null ? cliente.getNombre() : "cliente") + " desde IP: " + request.getRemoteAddr(),
                "info"
            ));
            return response;
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(org.springframework.http.HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, HttpServletRequest request) {
        Optional<Cliente> clienteOpt = clienteService.findById(id);
        clienteService.deleteById(id);
        String nombre = clienteOpt.map(c -> c.getNombre() != null ? c.getNombre() : "cliente").orElse("cliente");
        auditLogService.save(new AuditLog(
            "sistema",
            "ELIMINAR", "Clientes",
            "Cliente eliminado: " + nombre + " desde IP: " + request.getRemoteAddr(),
            "warning"
        ));
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
