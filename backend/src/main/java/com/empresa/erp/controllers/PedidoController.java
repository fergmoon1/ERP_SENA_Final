package com.empresa.erp.controllers;

import com.empresa.erp.models.Pedido;
import com.empresa.erp.models.CrearPedidoDTO;
import com.empresa.erp.services.PedidoService;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.access.AccessDeniedException;
import com.empresa.erp.models.Usuario;
import com.empresa.erp.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.empresa.erp.services.AuditLogService;
import com.empresa.erp.models.AuditLog;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.Optional;
import java.util.Map;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {
    private final PedidoService pedidoService;
    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    private AuditLogService auditLogService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @GetMapping
    public Map<String, Object> getAll(
            @RequestParam(required = false) String clienteId,
            @RequestParam(required = false) String fecha,
            @RequestParam(required = false) String estado,
            @RequestParam(defaultValue = "1") int pagina) {
        return pedidoService.findAllWithFilters(clienteId, fecha, estado, pagina);
    }

    @GetMapping("/{id}")
    public Optional<Pedido> getById(@PathVariable Long id) {
        return pedidoService.findById(id);
    }

    @PostMapping
    public Pedido create(@RequestBody CrearPedidoDTO crearPedidoDTO, HttpServletRequest request) {
        Authentication auth = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        String correoUsuario = auth != null ? auth.getName() : "sistema";
        Usuario usuario = usuarioRepository.findByCorreo(correoUsuario)
            .orElse(null);
        Pedido pedido = pedidoService.saveFromDTO(crearPedidoDTO, usuario);
        auditLogService.save(new AuditLog(
            correoUsuario,
            "CREAR", "Pedidos",
            "Pedido creado (ID: " + pedido.getId() + ") desde IP: " + request.getRemoteAddr(),
            "info"
        ));
        return pedido;
    }

    @PutMapping("/{id}")
    public Pedido update(@PathVariable Long id, @RequestBody Pedido pedido, HttpServletRequest request) {
        pedido.setId(id);
        Authentication auth = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        String correoUsuario = auth != null ? auth.getName() : "sistema";
        Pedido pedidoActualizado = pedidoService.save(pedido);
        auditLogService.save(new AuditLog(
            correoUsuario,
            "EDITAR", "Pedidos",
            "Pedido editado (ID: " + pedidoActualizado.getId() + ") desde IP: " + request.getRemoteAddr(),
            "info"
        ));
        return pedidoActualizado;
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id, HttpServletRequest request) {
        Authentication auth = org.springframework.security.core.context.SecurityContextHolder.getContext().getAuthentication();
        String correoUsuario = auth != null ? auth.getName() : "sistema";
        pedidoService.deleteById(id);
        auditLogService.save(new AuditLog(
            correoUsuario,
            "ELIMINAR", "Pedidos",
            "Pedido eliminado (ID: " + id + ") desde IP: " + request.getRemoteAddr(),
            "warning"
        ));
    }
}
