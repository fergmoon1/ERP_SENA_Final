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
    public List<Pedido> getAll() {
        return pedidoService.findAll();
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
        Pedido pedido = pedidoService.saveFromDTO(crearPedidoDTO);
        pedido.setUsuario(usuario);
        return pedidoService.save(pedido);
    }

    @PutMapping("/{id}")
    public Pedido update(@PathVariable Long id, @RequestBody Pedido pedido) {
        pedido.setId(id);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String correoUsuario = auth.getName();
        Pedido pedidoOriginal = pedidoService.findById(id)
            .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
        if (pedidoOriginal.getUsuario() == null || !pedidoOriginal.getUsuario().getCorreo().equals(correoUsuario)) {
            throw new AccessDeniedException("No tienes permiso para modificar este pedido");
        }
        return pedidoService.save(pedido);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String correoUsuario = auth.getName();
        Pedido pedidoOriginal = pedidoService.findById(id)
            .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
        if (pedidoOriginal.getUsuario() == null || !pedidoOriginal.getUsuario().getCorreo().equals(correoUsuario)) {
            throw new AccessDeniedException("No tienes permiso para eliminar este pedido");
        }
        pedidoService.deleteById(id);
    }
}
