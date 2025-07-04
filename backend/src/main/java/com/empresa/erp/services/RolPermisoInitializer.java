package com.empresa.erp.services;

import com.empresa.erp.models.RolPermiso;
import com.empresa.erp.repositories.RolPermisoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;
import java.util.Arrays;
import java.util.List;

@Component
public class RolPermisoInitializer {

    @Autowired
    private RolPermisoRepository repo;

    @PostConstruct
    public void init() {
        if (repo.count() == 0) {
            List<RolPermiso> permisosPorDefecto = Arrays.asList(
                crear("Admin", true, true, true, true, true),
                crear("Usuario", true, true, true, false, false),
                crear("Supervisor", true, false, true, false, true)
            );
            repo.saveAll(permisosPorDefecto);
        }
    }

    private RolPermiso crear(String rol, boolean ver, boolean crear, boolean editar, boolean eliminar, boolean aprobar) {
        RolPermiso rp = new RolPermiso();
        rp.setRol(rol);
        rp.setVer(ver);
        rp.setCrear(crear);
        rp.setEditar(editar);
        rp.setEliminar(eliminar);
        rp.setAprobar(aprobar);
        return rp;
    }
} 