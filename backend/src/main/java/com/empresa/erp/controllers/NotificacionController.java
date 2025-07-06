package com.empresa.erp.controllers;

import com.empresa.erp.models.Notificacion;
import com.empresa.erp.services.NotificacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notificaciones")
public class NotificacionController {
    @Autowired
    private NotificacionService notificacionService;

    @GetMapping("/usuario/{usuarioId}")
    public List<Notificacion> getNotificacionesPorUsuario(@PathVariable Long usuarioId) {
        return notificacionService.getNotificacionesPorUsuario(usuarioId);
    }

    @PostMapping("/usuario/{usuarioId}")
    public Notificacion crearNotificacion(@PathVariable Long usuarioId, @RequestBody Notificacion notificacion) {
        return notificacionService.crearNotificacion(usuarioId, notificacion.getTitulo(), notificacion.getMensaje());
    }

    @PostMapping("/usuario/{usuarioId}/marcar-todas-leidas")
    public void marcarTodasComoLeidas(@PathVariable Long usuarioId) {
        notificacionService.marcarTodasComoLeidas(usuarioId);
    }

    @PostMapping("/{notificacionId}/marcar-leida")
    public void marcarComoLeida(@PathVariable Long notificacionId) {
        notificacionService.marcarComoLeida(notificacionId);
    }
} 