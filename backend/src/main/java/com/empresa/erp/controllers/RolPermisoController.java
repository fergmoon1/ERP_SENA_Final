package com.empresa.erp.controllers;

import com.empresa.erp.models.RolPermiso;
import com.empresa.erp.services.RolPermisoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles-permisos")
@CrossOrigin(origins = "*")
public class RolPermisoController {
    @Autowired
    private RolPermisoService rolPermisoService;

    @GetMapping
    public List<RolPermiso> getAll() {
        return rolPermisoService.getAll();
    }

    @PutMapping
    public List<RolPermiso> saveAll(@RequestBody List<RolPermiso> rolesPermisos) {
        return rolPermisoService.saveAll(rolesPermisos);
    }
} 