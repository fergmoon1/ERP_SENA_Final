package com.empresa.erp.services;

import com.empresa.erp.models.Notificacion;
import com.empresa.erp.models.Usuario;
import com.empresa.erp.repositories.NotificacionRepository;
import com.empresa.erp.repositories.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificacionService {
    @Autowired
    private NotificacionRepository notificacionRepository;
    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Notificacion> getNotificacionesPorUsuario(Long usuarioId) {
        Optional<Usuario> usuario = usuarioRepository.findById(usuarioId);
        return usuario.map(u -> notificacionRepository.findByUsuarioOrderByFechaCreacionDesc(u)).orElse(List.of());
    }

    public List<Notificacion> getNoLeidasPorUsuario(Long usuarioId) {
        Optional<Usuario> usuario = usuarioRepository.findById(usuarioId);
        return usuario.map(u -> notificacionRepository.findByUsuarioAndLeidaFalse(u)).orElse(List.of());
    }

    public Notificacion crearNotificacion(Long usuarioId, String titulo, String mensaje) {
        Usuario usuario = usuarioRepository.findById(usuarioId).orElseThrow();
        Notificacion n = new Notificacion(usuario, titulo, mensaje);
        return notificacionRepository.save(n);
    }

    public void marcarTodasComoLeidas(Long usuarioId) {
        Optional<Usuario> usuario = usuarioRepository.findById(usuarioId);
        usuario.ifPresent(u -> {
            List<Notificacion> notifs = notificacionRepository.findByUsuarioAndLeidaFalse(u);
            for (Notificacion n : notifs) {
                n.setLeida(true);
            }
            notificacionRepository.saveAll(notifs);
        });
    }

    public void marcarComoLeida(Long notificacionId) {
        notificacionRepository.findById(notificacionId).ifPresent(n -> {
            n.setLeida(true);
            notificacionRepository.save(n);
        });
    }
} 