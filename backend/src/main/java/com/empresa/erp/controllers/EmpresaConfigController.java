package com.empresa.erp.controllers;

import com.empresa.erp.models.EmpresaConfig;
import com.empresa.erp.services.EmpresaConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/empresa-config")
@CrossOrigin(origins = "*")
public class EmpresaConfigController {
    @Autowired
    private EmpresaConfigService service;

    @GetMapping
    public EmpresaConfig getConfig() {
        return service.getConfig();
    }

    @PutMapping
    public EmpresaConfig saveConfig(@RequestBody EmpresaConfig config) {
        return service.saveConfig(config);
    }

    @DeleteMapping
    public void deleteConfig() {
        service.deleteConfig();
    }
} 