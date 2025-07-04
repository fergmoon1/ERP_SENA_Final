package com.empresa.erp.services;

import com.empresa.erp.models.RolPermiso;
import com.empresa.erp.repositories.RolPermisoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolPermisoService {
    @Autowired
    private RolPermisoRepository rolPermisoRepository;

    public List<RolPermiso> getAll() {
        return rolPermisoRepository.findAll();
    }

    public List<RolPermiso> saveAll(List<RolPermiso> rolesPermisos) {
        // Eliminar duplicados existentes por rol antes de guardar
        for (RolPermiso rp : rolesPermisos) {
            RolPermiso existente = rolPermisoRepository.findByRol(rp.getRol());
            if (existente != null) {
                rolPermisoRepository.delete(existente);
            }
        }
        return rolPermisoRepository.saveAll(rolesPermisos);
    }
} 