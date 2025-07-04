package com.empresa.erp.services;

import com.empresa.erp.models.VisualConfig;
import com.empresa.erp.repositories.VisualConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VisualConfigService {
    @Autowired
    private VisualConfigRepository repo;

    public VisualConfig getConfig() {
        List<VisualConfig> all = repo.findAll();
        return all.isEmpty() ? null : all.get(0);
    }

    public VisualConfig saveConfig(VisualConfig config) {
        List<VisualConfig> all = repo.findAll();
        if (!all.isEmpty()) {
            config.setId(all.get(0).getId());
        }
        return repo.save(config);
    }
} 