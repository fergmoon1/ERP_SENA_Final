package com.empresa.erp.controllers;

import com.empresa.erp.models.RolPermiso;
import com.empresa.erp.services.RolPermisoService;
import com.empresa.erp.services.AuditLogService;
import com.empresa.erp.models.AuditLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/roles-permisos")
@CrossOrigin(origins = "*")
public class RolPermisoController {
    @Autowired
    private RolPermisoService rolPermisoService;
    @Autowired
    private AuditLogService auditLogService;

    @GetMapping
    public List<RolPermiso> getAll() {
        return rolPermisoService.getAll();
    }

    @PutMapping
    public List<RolPermiso> saveAll(@RequestBody List<RolPermiso> rolesPermisos, HttpServletRequest request) {
        List<RolPermiso> result = rolPermisoService.saveAll(rolesPermisos);
        auditLogService.save(new AuditLog(
            "sistema",
            "EDITAR", "RolesPermisos",
            "Roles y permisos modificados desde IP: " + request.getRemoteAddr(),
            "info"
        ));
        return result;
    }
} 