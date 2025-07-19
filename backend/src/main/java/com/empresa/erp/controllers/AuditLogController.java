package com.empresa.erp.controllers;

import com.empresa.erp.models.AuditLog;
import com.empresa.erp.services.AuditLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/auditoria")
@CrossOrigin(origins = "*")
public class AuditLogController {
    @Autowired
    private AuditLogService auditLogService;

    @GetMapping
    public List<AuditLog> getAll() {
        return auditLogService.findAll();
    }

    @GetMapping("/usuario/{usuario}")
    public List<AuditLog> getByUsuario(@PathVariable String usuario) {
        return auditLogService.findByUsuario(usuario);
    }

    @GetMapping("/accion/{accion}")
    public List<AuditLog> getByAccion(@PathVariable String accion) {
        return auditLogService.findByAccion(accion);
    }

    @GetMapping("/modulo/{modulo}")
    public List<AuditLog> getByModulo(@PathVariable String modulo) {
        return auditLogService.findByModulo(modulo);
    }

    @GetMapping("/severidad/{severidad}")
    public List<AuditLog> getBySeveridad(@PathVariable String severidad) {
        return auditLogService.findBySeveridad(severidad);
    }

    @GetMapping("/fecha")
    public List<AuditLog> getByFecha(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime desde,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime hasta) {
        return auditLogService.findByFechaBetween(desde, hasta);
    }

    @PostMapping
    public AuditLog create(@RequestBody AuditLog log) {
        return auditLogService.save(log);
    }
} 