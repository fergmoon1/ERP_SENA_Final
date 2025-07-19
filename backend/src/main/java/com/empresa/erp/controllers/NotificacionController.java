package com.empresa.erp.controllers;

import com.empresa.erp.models.Notificacion;
import com.empresa.erp.services.NotificacionService;
import com.empresa.erp.services.AuditLogService;
import com.empresa.erp.models.AuditLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/notificaciones")
public class NotificacionController {
    @Autowired
    private NotificacionService notificacionService;
    @Autowired
    private AuditLogService auditLogService;

    @GetMapping("/usuario/{usuarioId}")
    public List<Notificacion> getNotificacionesPorUsuario(@PathVariable Long usuarioId) {
        return notificacionService.getNotificacionesPorUsuario(usuarioId);
    }

    @PostMapping("/usuario/{usuarioId}")
    public Notificacion crearNotificacion(@PathVariable Long usuarioId, @RequestBody Notificacion notificacion, HttpServletRequest request) {
        Notificacion n = notificacionService.crearNotificacion(usuarioId, notificacion.getTitulo(), notificacion.getMensaje());
        auditLogService.save(new AuditLog(
            String.valueOf(usuarioId),
            "CREAR", "Notificaciones",
            "Notificación creada para usuario desde IP: " + request.getRemoteAddr(),
            "info"
        ));
        return n;
    }

    @PostMapping("/usuario/{usuarioId}/marcar-todas-leidas")
    public void marcarTodasComoLeidas(@PathVariable Long usuarioId, HttpServletRequest request) {
        notificacionService.marcarTodasComoLeidas(usuarioId);
        auditLogService.save(new AuditLog(
            String.valueOf(usuarioId),
            "MARCAR_LEIDAS", "Notificaciones",
            "Todas las notificaciones marcadas como leídas desde IP: " + request.getRemoteAddr(),
            "info"
        ));
    }

    @PostMapping("/{notificacionId}/marcar-leida")
    public void marcarComoLeida(@PathVariable Long notificacionId, HttpServletRequest request) {
        notificacionService.marcarComoLeida(notificacionId);
        auditLogService.save(new AuditLog(
            String.valueOf(notificacionId),
            "MARCAR_LEIDA", "Notificaciones",
            "Notificación marcada como leída desde IP: " + request.getRemoteAddr(),
            "info"
        ));
    }
} 