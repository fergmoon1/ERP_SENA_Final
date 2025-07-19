package com.empresa.erp.repositories;

import com.empresa.erp.models.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
    List<AuditLog> findByUsuarioContainingIgnoreCase(String usuario);
    List<AuditLog> findByAccion(String accion);
    List<AuditLog> findByModulo(String modulo);
    List<AuditLog> findBySeveridad(String severidad);
    List<AuditLog> findByFechaBetween(LocalDateTime desde, LocalDateTime hasta);
} 