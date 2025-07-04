package com.empresa.erp.controllers;

import com.empresa.erp.models.VisualConfig;
import com.empresa.erp.services.VisualConfigService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/visual-config")
@CrossOrigin(origins = "*")
public class VisualConfigController {
    @Autowired
    private VisualConfigService service;

    @GetMapping
    public VisualConfig getConfig() {
        return service.getConfig();
    }

    @PutMapping
    public VisualConfig saveConfig(@RequestBody VisualConfig config) {
        return service.saveConfig(config);
    }
} 