package com.empresa.erp.controllers;

import com.empresa.erp.models.EmpresaConfig;
import com.empresa.erp.services.EmpresaConfigService;
import com.empresa.erp.services.AuditLogService;
import com.empresa.erp.models.AuditLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/empresa-config")
@CrossOrigin(origins = "*")
public class EmpresaConfigController {
    @Autowired
    private EmpresaConfigService service;
    @Autowired
    private AuditLogService auditLogService;

    @GetMapping
    public EmpresaConfig getConfig() {
        return service.getConfig();
    }

    @PutMapping
    public EmpresaConfig saveConfig(@RequestBody EmpresaConfig config, HttpServletRequest request) {
        EmpresaConfig updated = service.saveConfig(config);
        auditLogService.save(new AuditLog(
            "sistema",
            "EDITAR", "ConfiguraciónEmpresa",
            "Configuración de empresa editada desde IP: " + request.getRemoteAddr(),
            "info"
        ));
        return updated;
    }

    @DeleteMapping
    public void deleteConfig(HttpServletRequest request) {
        service.deleteConfig();
        auditLogService.save(new AuditLog(
            "sistema",
            "ELIMINAR", "ConfiguraciónEmpresa",
            "Configuración de empresa eliminada desde IP: " + request.getRemoteAddr(),
            "warning"
        ));
    }
} 