package com.empresa.erp.services;

import com.empresa.erp.models.AuditLog;
import com.empresa.erp.repositories.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AuditLogService {
    @Autowired
    private AuditLogRepository auditLogRepository;

    public AuditLog save(AuditLog log) {
        log.setFecha(LocalDateTime.now());
        return auditLogRepository.save(log);
    }

    public List<AuditLog> findAll() {
        return auditLogRepository.findAll();
    }

    public List<AuditLog> findByUsuario(String usuario) {
        return auditLogRepository.findByUsuarioContainingIgnoreCase(usuario);
    }

    public List<AuditLog> findByAccion(String accion) {
        return auditLogRepository.findByAccion(accion);
    }

    public List<AuditLog> findByModulo(String modulo) {
        return auditLogRepository.findByModulo(modulo);
    }

    public List<AuditLog> findBySeveridad(String severidad) {
        return auditLogRepository.findBySeveridad(severidad);
    }

    public List<AuditLog> findByFechaBetween(LocalDateTime desde, LocalDateTime hasta) {
        return auditLogRepository.findByFechaBetween(desde, hasta);
    }
} 