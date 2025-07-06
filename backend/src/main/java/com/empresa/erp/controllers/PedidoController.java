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
    public Pedido create(@RequestBody CrearPedidoDTO crearPedidoDTO) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String correoUsuario = auth.getName();
        Usuario usuario = usuarioRepository.findByCorreo(correoUsuario)
            .orElseThrow(() -> new RuntimeException("Usuario autenticado no encontrado"));
        
        return pedidoService.saveFromDTO(crearPedidoDTO, usuario);
    }

    @PutMapping("/{id}")
    public Pedido update(@PathVariable Long id, @RequestBody Pedido pedido) {
        pedido.setId(id);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String correoUsuario = auth.getName();
        Usuario usuario = usuarioRepository.findByCorreo(correoUsuario)
            .orElseThrow(() -> new RuntimeException("Usuario autenticado no encontrado"));
        Pedido pedidoOriginal = pedidoService.findById(id)
            .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
        // Permitir a ADMIN o SUPERVISOR modificar cualquier pedido
        if (!"ADMIN".equalsIgnoreCase(usuario.getRol()) && !"SUPERVISOR".equalsIgnoreCase(usuario.getRol())) {
            if (pedidoOriginal.getUsuario() == null || !pedidoOriginal.getUsuario().getCorreo().equals(correoUsuario)) {
                throw new AccessDeniedException("No tienes permiso para modificar este pedido");
            }
        }
        if (pedido.getMotivoEstado() != null) {
            pedidoOriginal.setMotivoEstado(pedido.getMotivoEstado());
        }
        pedidoOriginal.setEstado(pedido.getEstado());
        pedidoOriginal.setFecha(pedido.getFecha());
        pedidoOriginal.setDetalles(pedido.getDetalles());
        pedidoOriginal.setTotal(pedido.getTotal());
        return pedidoService.save(pedidoOriginal);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String correoUsuario = auth.getName();
        Usuario usuario = usuarioRepository.findByCorreo(correoUsuario)
            .orElseThrow(() -> new RuntimeException("Usuario autenticado no encontrado"));
        Pedido pedidoOriginal = pedidoService.findById(id)
            .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
        // Permitir a ADMIN o SUPERVISOR eliminar cualquier pedido
        if (!"ADMIN".equalsIgnoreCase(usuario.getRol()) && !"SUPERVISOR".equalsIgnoreCase(usuario.getRol())) {
            if (pedidoOriginal.getUsuario() == null || !pedidoOriginal.getUsuario().getCorreo().equals(correoUsuario)) {
                throw new AccessDeniedException("No tienes permiso para eliminar este pedido");
            }
        }
        pedidoService.deleteById(id);
    }
}
