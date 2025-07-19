package com.empresa.erp.controllers;

import com.empresa.erp.models.VisualConfig;
import com.empresa.erp.services.VisualConfigService;
import com.empresa.erp.services.AuditLogService;
import com.empresa.erp.models.AuditLog;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/visual-config")
@CrossOrigin(origins = "*")
public class VisualConfigController {
    @Autowired
    private VisualConfigService service;
    @Autowired
    private AuditLogService auditLogService;

    @GetMapping
    public VisualConfig getConfig() {
        return service.getConfig();
    }

    @PutMapping
    public VisualConfig saveConfig(@RequestBody VisualConfig config, HttpServletRequest request) {
        VisualConfig updated = service.saveConfig(config);
        auditLogService.save(new AuditLog(
            "sistema",
            "EDITAR", "VisualConfig",
            "Configuración visual editada desde IP: " + request.getRemoteAddr(),
            "info"
        ));
        return updated;
    }
} 