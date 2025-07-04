package com.empresa.erp.repositories;

import com.empresa.erp.models.RolPermiso;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RolPermisoRepository extends JpaRepository<RolPermiso, Long> {
    RolPermiso findByRol(String rol);
} 