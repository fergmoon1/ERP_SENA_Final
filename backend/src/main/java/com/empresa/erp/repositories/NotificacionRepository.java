package com.empresa.erp.repositories;

import com.empresa.erp.models.Notificacion;
import com.empresa.erp.models.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificacionRepository extends JpaRepository<Notificacion, Long> {
    List<Notificacion> findByUsuarioOrderByFechaCreacionDesc(Usuario usuario);
    List<Notificacion> findByUsuarioAndLeidaFalse(Usuario usuario);
} 