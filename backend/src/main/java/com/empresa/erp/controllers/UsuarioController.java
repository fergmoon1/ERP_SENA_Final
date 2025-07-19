package com.empresa.erp.controllers;

import com.empresa.erp.models.Usuario;
import com.empresa.erp.services.UsuarioService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import java.io.IOException;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import com.empresa.erp.services.AuditLogService;
import com.empresa.erp.models.AuditLog;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {
    private final UsuarioService usuarioService;
    @Autowired
    private AuditLogService auditLogService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @GetMapping
    public List<Usuario> getAll() {
        return usuarioService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Usuario> getById(@PathVariable Long id) {
        return usuarioService.findById(id);
    }

    @PostMapping
    public Usuario create(@RequestBody Usuario usuario, HttpServletRequest request) {
        Usuario nuevo = usuarioService.save(usuario);
        auditLogService.save(new AuditLog(
            nuevo.getCorreo() != null ? nuevo.getCorreo() : (nuevo.getNombre() != null ? nuevo.getNombre() : "usuario"),
            "CREAR", "Usuarios",
            "Usuario creado desde IP: " + request.getRemoteAddr(),
            "info"
        ));
        return nuevo;
    }

    @PutMapping("/{id}")
    public Usuario update(@PathVariable Long id, @RequestBody Usuario usuario, HttpServletRequest request) {
        usuario.setId(id);
        Usuario actualizado = usuarioService.save(usuario);
        auditLogService.save(new AuditLog(
            actualizado.getCorreo() != null ? actualizado.getCorreo() : (actualizado.getNombre() != null ? actualizado.getNombre() : "usuario"),
            "EDITAR", "Usuarios",
            "Usuario editado desde IP: " + request.getRemoteAddr(),
            "info"
        ));
        return actualizado;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, HttpServletRequest request) {
        Optional<Usuario> usuarioOpt = usuarioService.findById(id);
        usuarioService.deleteById(id);
        String usuarioStr = usuarioOpt.map(u -> u.getCorreo() != null ? u.getCorreo() : (u.getNombre() != null ? u.getNombre() : "usuario")).orElse("usuario");
        auditLogService.save(new AuditLog(
            usuarioStr,
            "ELIMINAR", "Usuarios",
            "Usuario eliminado desde IP: " + request.getRemoteAddr(),
            "warning"
        ));
    }

    @PutMapping("/{id}/password")
    public void updatePassword(@PathVariable Long id, @RequestBody Map<String, String> body, HttpServletRequest request) {
        String newPassword = body.get("password");
        usuarioService.updatePassword(id, newPassword);
        Optional<Usuario> usuarioOpt = usuarioService.findById(id);
        String usuarioStr = usuarioOpt.map(u -> u.getCorreo() != null ? u.getCorreo() : (u.getNombre() != null ? u.getNombre() : "usuario")).orElse("usuario");
        auditLogService.save(new AuditLog(
            usuarioStr,
            "CAMBIAR_PASSWORD", "Usuarios",
            "Cambio de contraseña desde IP: " + request.getRemoteAddr(),
            "info"
        ));
    }

    @PostMapping("/{id}/avatar")
    public ResponseEntity<?> uploadAvatar(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            String url = usuarioService.saveAvatar(id, file);
            return ResponseEntity.ok(Map.of("url", url));
        } catch (IOException e) {
            return ResponseEntity.status(500).body(Map.of("error", "Error al guardar el avatar"));
        }
    }
}
